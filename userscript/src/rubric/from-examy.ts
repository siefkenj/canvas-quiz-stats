/**
 * Turn the rubrics examy exports (`<examy-rubric>`, attached to an exam's PDF by gradescope.typ as
 * `examy-rubric.json`) into a rubric JSON file for the Rubric JSON tool.
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

/** examy's export: one per exam. */
export interface ExamyRubrics {
    exam: number;
    questions: { number: string | null; title: string; points: number | null; rubric: ExamyEntry[] }[];
}

/** What a rubrics file attached to an exam's PDF holds: examy's export, or a rubric JSON file. */
export function rubricsKind(text: string): "examy" | "rubric-file" | null {
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch {
        return null;
    }
    if (Array.isArray(data) && data.length > 0 && data.every((x) => x && typeof x === "object" && Array.isArray((x as ExamyRubrics).questions))) {
        return "examy";
    }
    return data && typeof data === "object" && (data as RubricFile).format === RUBRIC_FORMAT ? "rubric-file" : null;
}

/**
 * The rubrics as attached to an exam's PDF: examy's export (by gradescope.typ, as
 * `examy-rubric.json`), or a rubric JSON file, as any `*rubric.json` or `*rubrics.json`.
 */
export const RUBRICS_ATTACHMENT: AttachmentKind = {
    what: "rubrics",
    name: "examy-rubric.json",
    pattern: /rubrics?\.json$/i,
    is: (text) => rubricsKind(text) !== null,
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
 * The rubric JSON file for `assignment` from examy's rubrics (`rubrics`, the first exam's) and,
 * for the numbering, the regions attached beside them (`regions`; without them, examy's numbers
 * are used as they are).
 */
export function rubricFromExamy(rubrics: ExamyRubrics[], regions: RegionsFile | null, assignment: Assignment): ConvertedRubric {
    const warnings = new Set<string>();
    const exam = rubrics[0];
    if (!exam) {
        throw new Error("The PDF's examy-rubric.json holds no exam.");
    }
    if (rubrics.length > 1) {
        warnings.add(`The PDF holds the rubrics of ${rubrics.length} exams; these are the first's.`);
    }

    // Each examy division's Gradescope question, as the Outline JSON tool numbers them.
    const gradescopeNumber = new Map<string, string>();
    const groups = new Set<string>();
    if (regions) {
        for (const q of flatten(planOutline(regions, null).questions)) {
            if (q.children) {
                groups.add(q.covers[0]);
                continue;
            }
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
            title: gs?.title || exam.questions.find((q) => q.number === examy[0])?.title || undefined,
            weight: gs ? parseFloat(gs.weight) : points,
            scoring: gs?.scoring_type ?? ("positive" as const),
            rubric,
        };
    });
    return {
        file: { format: RUBRIC_FORMAT, version: RUBRIC_FORMAT_VERSION, assignment: header.assignment, questions },
        warnings: [...warnings],
    };
}
