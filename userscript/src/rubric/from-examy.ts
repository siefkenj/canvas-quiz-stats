/**
 * Turn the rubrics examy exports (`<examy-rubric>`, which examy 1.1.0 and later attach to an exam's
 * PDF as `examy-rubric.json`; or the older format of examy 1.0.0, which gradescope.typ attached)
 * into a rubric JSON file for the Rubric JSON tool.
 *
 * Examy numbers its questions, parts, and subparts ("3.1.2"); Gradescope has two levels, so they
 * are numbered as the Outline JSON tool numbers them, from the regions attached beside the rubrics
 * (a part that has the points covers its subparts; one whose points are in its subparts gives way
 * to them). Weights and scoring types are Gradescope's. Math goes from examy's `$..$` (inline) and
 * `$$..$$` (display) to Gradescope's `$$..$$` and `$$$..$$$`.
 */
import type { Assignment } from "./assignment";
import { RUBRIC_FORMAT, RUBRIC_FORMAT_VERSION, type RubricEntry, type RubricFile, type RubricItem } from "./types";
import { flatten, planOutline } from "../outline/outline";
import type { RegionsFile } from "../outline/types";
import type { AttachmentKind } from "../pdf-attachments";

/** examy's export (examy 1.1.0 and later): one exam's. See examy's manual, "Exam metadata". */
export interface ExamyRubric {
    format: "examy-rubric";
    "exam-name": string | null;
    /** Each question, part, or subpart that has a rubric. */
    rubrics: {
        /** Its place among its siblings at each level, from 0: `[0, 2]` is 1 (c). */
        address: number[];
        "display-name": string;
        level: number;
        /** Points given to it directly, not its parts'. */
        points: number | null;
        "bonus-points": number | null;
        rubric: ExamyEntry[];
    }[];
}

/** examy 1.0.0's export: one per exam. */
export interface LegacyExamyRubrics {
    exam: number;
    questions: { number: string | null; title: string; points: number | null; rubric: ExamyEntry[] }[];
}

/** Either of examy's exports, as `JSON.parse` gives it. */
export type ExamyRubrics = ExamyRubric | LegacyExamyRubrics[];

const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const isText = (v: unknown) => typeof v === "string";
const isTextOrNull = (v: unknown) => v === null || typeof v === "string";

/** Whether `es` are rubric entries as examy writes them (checked, so that a damaged file is not taken for one). */
function areEntries(es: unknown): es is ExamyEntry[] {
    return (
        Array.isArray(es) &&
        es.every(
            (e) =>
                isObject(e) &&
                (e.type === "item"
                    ? (e.points === null || Number.isFinite(e.points)) && isText(e.description)
                    : e.type === "group"
                      ? isText(e.title) && isTextOrNull(e.note ?? null) && areEntries(e.items)
                      : e.type === "note" && isText(e.text))
        )
    );
}

const isExamyRubric = (data: unknown): data is ExamyRubric =>
    isObject(data) &&
    data.format === "examy-rubric" &&
    Array.isArray(data.rubrics) &&
    data.rubrics.every(
        (r) =>
            isObject(r) &&
            Array.isArray(r.address) &&
            r.address.length > 0 &&
            r.address.every(Number.isInteger) &&
            isText(r["display-name"]) &&
            (r.points === null || Number.isFinite(r.points)) &&
            areEntries(r.rubric)
    );
const isLegacyExamyRubrics = (data: unknown): data is LegacyExamyRubrics[] =>
    Array.isArray(data) &&
    data.length > 0 &&
    data.every(
        (x) =>
            isObject(x) &&
            Array.isArray(x.questions) &&
            x.questions.every(
                (q) =>
                    isObject(q) &&
                    isTextOrNull(q.number) &&
                    isTextOrNull(q.title ?? null) &&
                    (q.points === null || Number.isFinite(q.points)) &&
                    areEntries(q.rubric)
            )
    );

/** What a rubrics file attached to an exam's PDF holds: examy's export (either format), or a rubric JSON file. */
export function rubricsKind(text: string): "examy" | "rubric-file" | null {
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        return null;
    }
    if (isExamyRubric(data) || isLegacyExamyRubrics(data)) {
        return "examy";
    }
    return data && typeof data === "object" && (data as RubricFile).format === RUBRIC_FORMAT ? "rubric-file" : null;
}

/**
 * The rubrics as attached to an exam's PDF: examy's export (`examy-rubric.json`, by examy's
 * `embed-metadata`, or by gradescope.typ for examy 1.0.0), or a rubric JSON file, as any
 * `*rubric.json` or `*rubrics.json` (`*rubric-2.json` for a document's second exam).
 */
export const RUBRICS_ATTACHMENT: AttachmentKind = {
    what: "rubrics",
    names: ["examy-rubric.json"],
    pattern: /rubrics?(-\d+)?\.json$/i,
    is: (text) => rubricsKind(text) !== null,
    embed: "rubric",
};

export type ExamyEntry =
    | { type: "item"; points: number | null; description: string; annotation: string | null }
    | { type: "group"; title: string; note: string | null; annotation: string | null; items: ExamyEntry[] }
    | { type: "note"; text: string };

/** Examy's math (`$x$`, `$$x$$`) as Gradescope's (`$$x$$`, `$$$x$$$`). */
export function gradescopeMath(text: string) {
    return text.replace(/\$\$([\s\S]+?)\$\$|\$([^$]+?)\$/g, (_, display, inline) =>
        display !== undefined ? `$$$${display}$$$` : `$$${inline}$$`
    );
}

export interface ConvertedRubric {
    file: RubricFile;
    warnings: string[];
}

/**
 * The rubric JSON file for `assignment` from examy's rubrics (`rubrics`, in either of its formats;
 * of an older file with several exams, the first exam's) and, for the numbering, the regions
 * attached beside them (`regions`; without them, examy's numbers are used as they are).
 */
export function rubricFromExamy(rubrics: ExamyRubrics, regions: RegionsFile | null, assignment: Assignment): ConvertedRubric {
    const warnings = new Set<string>();
    let exam: { questions: { number: string | null; title: string | null; points: number | null; rubric: ExamyEntry[] }[] };
    if (isExamyRubric(rubrics)) {
        exam = {
            // Titled as examy 1.0.0 titled them ("Question 2 (a)"), for a Gradescope question without one.
            questions: rubrics.rubrics.map((r) => ({
                number: r.address.map((a) => a + 1).join("."),
                title: `Question ${r["display-name"]}`,
                points: r.points,
                rubric: r.rubric,
            })),
        };
    } else if (isLegacyExamyRubrics(rubrics)) {
        exam = rubrics[0];
        if (rubrics.length > 1) {
            warnings.add(`The PDF holds the rubrics of ${rubrics.length} exams; these are the first's.`);
        }
    } else {
        throw new Error("This is not examy's rubrics: an entry is missing, or of the wrong kind.");
    }

    // Each examy division's Gradescope question, as the Outline JSON tool numbers them.
    const gradescopeNumber = new Map<string, string>();
    /** Each Gradescope question's weight, as the Outline JSON tool gives it. */
    const plannedWeight = new Map<string, number>();
    const groups = new Set<string>();
    if (regions) {
        for (const q of flatten(planOutline(regions, null).questions)) {
            if (q.children) {
                groups.add(q.covers[0]);
                continue;
            }
            plannedWeight.set(q.number, q.weight);
            for (const n of q.covers) {
                gradescopeNumber.set(n, q.number);
            }
        }
    }

    const item = (e: Extract<ExamyEntry, { type: "item" }>): RubricItem => {
        if (e.annotation) {
            warnings.add("Rubric annotations (notes for graders) are not on Gradescope; they are left out.");
        }
        return { type: "item", points: e.points ?? 0, description: gradescopeMath(e.description) };
    };
    /** A group's items: its own, and those of the groups in it (Gradescope's groups hold items only). */
    const items = (es: ExamyEntry[]): RubricItem[] =>
        es.flatMap((e) => {
            if (e.type === "item") {
                return [item(e)];
            }
            if (e.type === "group") {
                warnings.add("A group inside a group is not possible on Gradescope; its items join the outer group.");
                return items(e.items);
            }
            warnings.add("Rubric notes are not on Gradescope; they are left out.");
            return [];
        });
    const entry = (e: ExamyEntry): RubricEntry[] => {
        if (e.type === "item") {
            return [item(e)];
        }
        if (e.type === "group") {
            if (e.annotation) {
                warnings.add("Rubric annotations (notes for graders) are not on Gradescope; they are left out.");
            }
            const description = [e.title, e.note].filter((s) => s && s.trim()).map((s) => gradescopeMath(s!)).join("\n\n") || "Group";
            return [{ type: "group", description, mutually_exclusive: false, items: items(e.items) }];
        }
        warnings.add("Rubric notes are not on Gradescope; they are left out.");
        return [];
    };

    // The entries of each Gradescope question, in order: several examy divisions may make one.
    const byNumber = new Map<string, { examy: string[]; rubric: RubricEntry[] }>();
    for (const q of exam.questions) {
        if (!q.number) {
            warnings.add("A rubric of an unnumbered question is left out.");
            continue;
        }
        if (groups.has(q.number)) {
            warnings.add(`Question ${q.number}'s own rubric is left out: its points are in its parts, which are Gradescope's questions.`);
            continue;
        }
        const number = gradescopeNumber.get(q.number) ?? q.number;
        const at = byNumber.get(number) ?? { examy: [], rubric: [] };
        at.examy.push(q.number);
        at.rubric.push(...q.rubric.flatMap(entry));
        byNumber.set(number, at);
    }

    const header = assignment.toRubricFile();
    const questions = [...byNumber.entries()].map(([number, { examy, rubric }]) => {
        const gs = assignment.question(number);
        if (!gs) {
            warnings.add(`Examy question ${examy.join(", ")} is question ${number}, which is not on Gradescope; set the outline first (Outline JSON).`);
        }
        const points = exam.questions.filter((q) => q.number && examy.includes(q.number)).reduce((a, q) => a + (q.points ?? 0), 0);
        return {
            number,
            title: gs?.title || exam.questions.find((q) => q.number === examy[0])?.title?.replace(/\s+/g, " ") || undefined,
            weight: gs ? parseFloat(gs.weight) : (plannedWeight.get(number) ?? points),
            scoring: gs?.scoring_type ?? ("positive" as const),
            rubric,
        };
    });
    return {
        file: { format: RUBRIC_FORMAT, version: RUBRIC_FORMAT_VERSION, assignment: header.assignment, questions },
        warnings: [...warnings],
    };
}
