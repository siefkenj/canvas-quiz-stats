/**
 * Interpret Gradescope's `rubric/edit.json` payload: questions, their current rubric entries,
 * and conversion to and from the rubric JSON format.
 */
import {
    RUBRIC_FORMAT,
    RUBRIC_FORMAT_VERSION,
    type GsEntry,
    type GsQuestion,
    type GsRubricPayload,
    type RubricEntry,
    type RubricFile,
    type RubricQuestion,
    type Scoring,
} from "./types";

/** Descriptions Gradescope gives the item it creates with every new question. */
export const DEFAULT_ITEM_DESCRIPTIONS = [
    "Correct",
    "Click here to replace this description.",
];

const asArray = <T>(v: T[] | Record<string, T> | null | undefined): T[] =>
    Array.isArray(v) ? v : v && typeof v === "object" ? Object.values(v) : [];

/**
 * Gradescope stores a rubric item's `weight` relative to the question's scoring type: under
 * positive scoring it is added to the score, under negative scoring it is subtracted. The
 * rubric JSON always uses `points` = the change to the score.
 */
export function weightToPoints(weight: string | number, scoring: Scoring) {
    const w = typeof weight === "number" ? weight : parseFloat(weight);
    const points = scoring === "negative" ? -w : w;
    return points === 0 ? 0 : points; // no -0
}

export function pointsToWeight(points: number, scoring: Scoring) {
    const w = scoring === "negative" ? -points : points;
    return String(w === 0 ? 0 : w);
}

export class Assignment {
    readonly payload: GsRubricPayload;
    readonly questions: GsQuestion[];
    private readonly byNumber: Map<string, GsQuestion>;

    constructor(payload: GsRubricPayload) {
        this.payload = payload;
        this.questions = (function flatten(list: GsQuestion[], out: GsQuestion[] = []) {
            for (const q of asArray(list)) {
                out.push(q);
                flatten(asArray(q.children), out);
            }
            return out;
        })(payload.questions);
        this.byNumber = new Map(this.questions.map((q) => [String(q.full_index), q]));
    }

    get courseId() {
        return this.payload.assignment.course_id;
    }
    get assignmentId() {
        return this.payload.assignment.id;
    }
    get title() {
        return this.payload.assignment.title;
    }

    question(number: string) {
        return this.byNumber.get(number);
    }

    isParent(q: GsQuestion) {
        return asArray(q.children).length > 0;
    }

    /** Questions that can carry a rubric (Gradescope ignores rubrics on parent questions). */
    get leafQuestions() {
        return this.questions.filter((q) => !this.isParent(q));
    }

    /**
     * The question's top-level rubric entries (ungrouped items and groups) in order. An item whose
     * group no longer exists counts as ungrouped, so it is shown, compared, and deleted too.
     */
    entries(questionId: number): GsEntry[] {
        const items = asArray(this.payload.rubric_items).filter(
            (i) => i.question_id === questionId
        );
        const groups = asArray(this.payload.rubric_item_groups).filter(
            (g) => g.question_id === questionId
        );
        const groupIds = new Set(groups.map((g) => g.id));
        const byPosition = (a: { position: number }, b: { position: number }) =>
            a.position - b.position;
        const entries: (GsEntry & { position: number })[] = [
            ...items
                .filter((i) => i.group_id == null || !groupIds.has(i.group_id))
                .map((item) => ({ kind: "item" as const, item, position: item.position })),
            ...groups.map((group) => ({
                kind: "group" as const,
                group,
                items: items.filter((i) => i.group_id === group.id).sort(byPosition),
                position: group.position,
            })),
        ];
        return entries.sort(byPosition);
    }

    /** True if the question has no rubric, or only the item Gradescope creates by default. */
    hasOnlyDefaultRubric(questionId: number) {
        const entries = this.entries(questionId);
        if (entries.length === 0) {
            return true;
        }
        if (entries.length > 1 || entries[0].kind !== "item") {
            return false;
        }
        const { item } = entries[0];
        return (
            parseFloat(item.weight) === 0 &&
            DEFAULT_ITEM_DESCRIPTIONS.includes(item.description.trim())
        );
    }

    /** The question's current rubric in the rubric JSON format. */
    toRubricQuestion(q: GsQuestion): RubricQuestion {
        const scoring = q.scoring_type;
        const rubric: RubricEntry[] = this.entries(q.id).map((e) =>
            e.kind === "item"
                ? {
                      type: "item",
                      points: weightToPoints(e.item.weight, scoring),
                      description: e.item.description,
                  }
                : {
                      type: "group",
                      description: e.group.description,
                      mutually_exclusive: !!e.group.mutually_exclusive,
                      items: e.items.map((i) => ({
                          type: "item",
                          points: weightToPoints(i.weight, scoring),
                          description: i.description,
                      })),
                  }
        );
        return {
            number: String(q.full_index),
            title: q.title ?? "",
            weight: parseFloat(q.weight),
            scoring,
            rubric,
        };
    }

    /** The whole assignment's rubric, as shown, copied, and downloaded in the JSON view. */
    toRubricFile(): RubricFile {
        return {
            format: RUBRIC_FORMAT,
            version: RUBRIC_FORMAT_VERSION,
            assignment: {
                course_id: this.courseId,
                assignment_id: this.assignmentId,
                title: this.title,
            },
            questions: this.leafQuestions.map((q) => this.toRubricQuestion(q)),
        };
    }
}

/** Compare two rubrics, ignoring surrounding whitespace and line-ending differences. */
export function sameRubric(a: RubricEntry[], b: RubricEntry[]) {
    const text = (s: string) => s.replace(/\r\n/g, "\n").trim();
    const sameItem = (x: RubricEntry, y: RubricEntry) =>
        x.type === "item" &&
        y.type === "item" &&
        x.points === y.points &&
        text(x.description) === text(y.description);
    return (
        a.length === b.length &&
        a.every((x, n) => {
            const y = b[n];
            if (x.type === "item") {
                return sameItem(x, y);
            }
            return (
                y.type === "group" &&
                text(x.description) === text(y.description) &&
                x.mutually_exclusive === y.mutually_exclusive &&
                x.items.length === y.items.length &&
                x.items.every((i, k) => sameItem(i, y.items[k]))
            );
        })
    );
}
