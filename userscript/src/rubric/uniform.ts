/**
 * A uniform rubric: the same items, with the same points, on every chosen question. Points are
 * written as under positive scoring; on a negatively scored question they become deductions.
 */
import type { Assignment } from "./assignment";
import type { RubricEntry, RubricFile, RubricQuestion, Scoring } from "./types";
import { maxPositivePoints } from "./validate";

export interface UniformItem {
    description: string;
    /** The change to the score when the item is applied (negative for a penalty or deduction). */
    points: number;
}

export interface UniformTemplate {
    items: UniformItem[];
    /** Put the items in a group (graders apply at most one item of a mutually exclusive group). */
    group: { description: string; mutually_exclusive: boolean } | null;
}

/** Ready-made items for a question worth `full` points. */
export const UNIFORM_PRESETS: { name: string; title: string; items: (full: number) => UniformItem[] }[] = [
    {
        name: "Correct / Incorrect",
        title: "All or nothing",
        items: (full) => [
            { description: "**Correct**", points: full },
            { description: "Incorrect", points: 0 },
        ],
    },
    {
        name: "Correct / Partial / Incorrect",
        title: "Full, half, or no credit",
        items: (full) => [
            { description: "**Correct**", points: full },
            { description: "**Partially correct**", points: Math.round(full * 50) / 100 },
            { description: "Incorrect", points: 0 },
        ],
    },
];

/**
 * An item's points on a question. Under positive scoring they are used as they are. Under
 * negative scoring (students start with full marks) an item worth p ≥ 0 leaves the student with
 * p, i.e. deducts weight − p, and a penalty (p < 0) stays a deduction.
 */
export function uniformPoints(points: number, weight: number, scoring: Scoring) {
    const p = scoring === "negative" && points >= 0 ? Math.round((points - weight) * 100) / 100 : points;
    return p === 0 ? 0 : p; // no -0
}

/** The template's entries on a question. */
export function uniformEntries(template: UniformTemplate, weight: number, scoring: Scoring): RubricEntry[] {
    const items = template.items.map((i) => ({ type: "item" as const, points: uniformPoints(i.points, weight, scoring), description: i.description }));
    return template.group
        ? [{ type: "group", description: template.group.description, mutually_exclusive: template.group.mutually_exclusive, items }]
        : items;
}

/** A rubric file giving the chosen questions (by number, in assignment order) the template. */
export function uniformRubric(assignment: Assignment, template: UniformTemplate, numbers: Iterable<string>): RubricFile {
    const chosen = new Set(numbers);
    const file = assignment.toRubricFile();
    return {
        ...file,
        questions: file.questions
            .filter((q) => chosen.has(q.number))
            .map((q) => ({ ...q, rubric: uniformEntries(template, q.weight, q.scoring) })),
    };
}

/** The most a student can get from the template's positive items. */
export function maxPoints(template: UniformTemplate) {
    // Under positive scoring the points are used as they are, whatever the weight.
    return maxPositivePoints(uniformEntries(template, 0, "positive"));
}

/**
 * How the template fits a question, or null if it fits: the best a student can get from it should
 * be the question's weight (under either scoring, since points are written as under positive
 * scoring).
 */
export function templateFit(template: UniformTemplate, q: Pick<RubricQuestion, "weight">): string | null {
    const max = maxPoints(template);
    return Math.abs(max - q.weight) < 1e-9 ? null : `The sum of positive points is ${max}, but the question is worth ${q.weight}.`;
}

/** The full marks to use for a preset: the chosen questions' weight if they share one, else 1. */
export function presetFullMarks(questions: Pick<RubricQuestion, "weight">[]) {
    const weights = new Set(questions.map((q) => q.weight));
    return weights.size === 1 ? [...weights][0] : 1;
}

/** Problems that stop the template from being used. */
export function templateProblems(template: UniformTemplate, chosen: number) {
    const problems: string[] = [];
    if (chosen === 0) {
        problems.push("Choose at least one question.");
    }
    if (template.items.length === 0) {
        problems.push("Add at least one item.");
    }
    template.items.forEach((i, k) => {
        if (!i.description.trim()) {
            problems.push(`Item ${k + 1} needs a description.`);
        }
        if (!Number.isFinite(i.points)) {
            problems.push(`Item ${k + 1} needs points.`);
        } else if (Math.abs(i.points * 100 - Math.round(i.points * 100)) > 1e-6) {
            problems.push(`Item ${k + 1}: points can have at most two decimal places.`);
        }
    });
    if (template.group && !template.group.description.trim()) {
        problems.push("The group needs a description.");
    }
    return problems;
}
