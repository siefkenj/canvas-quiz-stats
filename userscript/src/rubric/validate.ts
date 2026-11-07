/**
 * Strict validation of an uploaded rubric JSON file against the assignment on the page.
 *
 * Rubric files are often written by AI agents, which tend to produce JSON that is *almost*
 * right (a renamed key, a number as a string, LaTeX that lost a backslash to JSON escaping).
 * So anything structural is an error that blocks the upload, unknown keys included; checks
 * that are heuristics are warnings, shown to the user but not blocking the upload.
 */
import { Assignment, DEFAULT_ITEM_DESCRIPTIONS, sameRubric } from "./assignment";
import {
    RUBRIC_FORMAT,
    RUBRIC_FORMAT_VERSION,
    type GsQuestion,
    type RubricEntry,
    type RubricFile,
    type RubricItem,
    type RubricQuestion,
} from "./types";

export interface Issue {
    /** Where the problem is, e.g. `questions[2].rubric[0].points`. */
    path: string;
    /** The question number, when the problem is inside a question. */
    question?: string;
    message: string;
}

export type PlanStatus =
    /** The question has no rubric or only Gradescope's default item: it will be replaced. */
    | "create"
    /** The question's rubric already equals the uploaded one: nothing to do. */
    | "unchanged"
    /** The question has other rubric content: uploading replaces it. */
    | "conflict";

export interface QuestionPlan {
    number: string;
    question: GsQuestion;
    current: RubricQuestion;
    next: RubricQuestion;
    status: PlanStatus;
}

export interface ValidationResult {
    file: RubricFile | null;
    errors: Issue[];
    warnings: Issue[];
    /** One plan per question that passed validation, in file order. */
    plans: QuestionPlan[];
}

type Json = null | boolean | number | string | Json[] | { [key: string]: Json };
type JsonObject = { [key: string]: Json };

const isObject = (v: unknown): v is JsonObject =>
    typeof v === "object" && v !== null && !Array.isArray(v);

function typeName(v: unknown) {
    return v === null ? "null" : Array.isArray(v) ? "an array" : `a ${typeof v}`;
}

/** Hints for keys that AI agents commonly use instead of the right ones. */
const KEY_HINTS: Record<string, string> = {
    weight: 'use "points" for rubric items ("weight" is only for questions)',
    score: 'use "points"',
    value: 'use "points"',
    text: 'use "description"',
    title: 'use "description"',
    comment: 'use "description"',
    exclusive: 'use "mutually_exclusive"',
    mutuallyExclusive: 'use "mutually_exclusive"',
    group: 'groups are entries with "type": "group"',
    group_id: 'groups are entries with "type": "group" that contain their "items"',
    rubric_items:
        "this looks like Gradescope's raw data; use the format of the dialog's JSON view",
    rubric_item_groups:
        "this looks like Gradescope's raw data; use the format of the dialog's JSON view",
    full_index: 'use "number"',
    index: 'use "number"',
    id: "ids are not part of the format; questions are matched by \"number\"",
    question: 'questions are matched by "number"',
    scoring_type: 'use "scoring"',
    entries: 'use "rubric"',
    items: '"items" only belongs in an entry with "type": "group"',
};

export function validateRubricText(text: string, assignment: Assignment): ValidationResult {
    const errors: Issue[] = [];
    const warnings: Issue[] = [];
    const plans: QuestionPlan[] = [];
    const result = (file: RubricFile | null): ValidationResult => ({
        file,
        errors,
        warnings,
        plans,
    });

    let data: unknown;
    try {
        data = JSON.parse(text.replace(/^﻿/, ""));
    } catch (e) {
        errors.push({ path: "(file)", message: `Not valid JSON: ${describeJsonError(e, text)}` });
        return result(null);
    }

    const error = (path: string, message: string, question?: string) =>
        errors.push({ path, message, question });
    const warn = (path: string, message: string, question?: string) =>
        warnings.push({ path, message, question });

    // Problems with a question's *content* (descriptions, points, empty lists, heuristics) are
    // collected per question and reported only if the question would change. So a rubric that
    // already exists on Gradescope always round-trips: download it, upload it unchanged, and
    // nothing is flagged, whatever it contains. Structure (keys, types, numbers) is always checked.
    const deferred = new Map<string, { errors: Issue[]; warnings: Issue[] }>();
    const issuesFor = (question: string) => {
        if (!deferred.has(question)) {
            deferred.set(question, { errors: [], warnings: [] });
        }
        return deferred.get(question)!;
    };
    const contentError = (path: string, message: string, question: string) =>
        issuesFor(question).errors.push({ path, message, question });
    const contentWarn = (path: string, message: string, question: string) =>
        issuesFor(question).warnings.push({ path, message, question });

    /** Report missing and unknown keys. Returns false if a required key is missing. */
    function checkKeys(
        obj: JsonObject,
        path: string,
        required: string[],
        optional: string[] = [],
        question?: string
    ) {
        let ok = true;
        for (const key of required) {
            if (!(key in obj)) {
                error(path, `Missing required key "${key}".`, question);
                ok = false;
            }
        }
        for (const key of Object.keys(obj)) {
            if (!required.includes(key) && !optional.includes(key)) {
                const hint = KEY_HINTS[key] ? ` (${KEY_HINTS[key]})` : "";
                error(
                    path,
                    `Unknown key "${key}"${hint}. Allowed keys: ${[...required, ...optional]
                        .map((k) => `"${k}"`)
                        .join(", ")}.`,
                    question
                );
            }
        }
        return ok;
    }

    // ------------------------------------------------------------------------ top level

    if (!isObject(data)) {
        error("(file)", `The file must contain a JSON object, not ${typeName(data)}.`);
        return result(null);
    }
    checkKeys(data, "(file)", ["format", "version", "questions"], ["assignment"]);
    if ("format" in data && data.format !== RUBRIC_FORMAT) {
        error("format", `Must be "${RUBRIC_FORMAT}", not ${JSON.stringify(data.format)}.`);
    }
    if ("version" in data && data.version !== RUBRIC_FORMAT_VERSION) {
        error(
            "version",
            `Must be the number ${RUBRIC_FORMAT_VERSION}, not ${JSON.stringify(data.version)}.`
        );
    }

    // ----------------------------------------------------------------------- assignment

    const a = data.assignment;
    if ("assignment" in data) {
        if (!isObject(a)) {
            error("assignment", `Must be an object, not ${typeName(a)}.`);
        } else {
            checkKeys(a, "assignment", ["course_id", "assignment_id"], ["title"]);
            for (const [key, expected] of [
                ["course_id", assignment.courseId],
                ["assignment_id", assignment.assignmentId],
            ] as const) {
                if (!(key in a)) {
                    continue;
                }
                if (typeof a[key] !== "number" || !Number.isInteger(a[key])) {
                    error(`assignment.${key}`, `Must be an integer, not ${JSON.stringify(a[key])}.`);
                } else if (a[key] !== expected) {
                    error(
                        `assignment.${key}`,
                        `This file is for ${key === "course_id" ? "course" : "assignment"} ${a[key]}, but this page is ${key === "course_id" ? "course" : "assignment"} ${expected}.`
                    );
                }
            }
            if ("title" in a) {
                if (typeof a.title !== "string") {
                    error("assignment.title", `Must be a string, not ${typeName(a.title)}.`);
                } else if (a.title.trim() !== assignment.title.trim()) {
                    error(
                        "assignment.title",
                        `This file is for the assignment titled "${a.title}", but this page is "${assignment.title}".`
                    );
                }
            }
        }
    }

    // ------------------------------------------------------------------------ questions

    const questions = data.questions;
    const validQuestions: RubricQuestion[] = [];
    if ("questions" in data) {
        if (!Array.isArray(questions)) {
            error("questions", `Must be an array, not ${typeName(questions)}.`);
        } else if (questions.length === 0) {
            error("questions", "Must contain at least one question.");
        } else {
            const seen = new Map<string, number>();
            questions.forEach((q, n) => {
                const parsed = checkQuestion(q, `questions[${n}]`, seen, n);
                if (parsed) {
                    validQuestions.push(parsed);
                }
            });
        }
    }

    function checkQuestion(
        q: Json,
        path: string,
        seen: Map<string, number>,
        n: number
    ): RubricQuestion | null {
        if (!isObject(q)) {
            error(path, `Each question must be an object, not ${typeName(q)}.`);
            return null;
        }
        const errorsBefore = errors.length;
        const number = typeof q.number === "string" ? q.number : undefined;
        const label = number ?? `#${n + 1}`;
        checkKeys(q, path, ["number", "weight", "scoring", "rubric"], ["title"], label);

        let gs: GsQuestion | undefined;
        if ("number" in q) {
            if (typeof q.number !== "string") {
                error(
                    `${path}.number`,
                    `Must be a string such as "3.1", not ${JSON.stringify(q.number)}.`,
                    label
                );
            } else if (!(gs = assignment.question(q.number))) {
                error(
                    `${path}.number`,
                    `This assignment has no question "${q.number}". Its questions are: ${assignment.leafQuestions
                        .map((x) => x.full_index)
                        .join(", ")}.`,
                    label
                );
            } else if (assignment.isParent(gs)) {
                error(
                    `${path}.number`,
                    `Question ${q.number} has parts (${(gs.children ?? [])
                        .map((c) => c.full_index)
                        .join(", ")}); rubrics belong to the parts, not to ${q.number}.`,
                    label
                );
                gs = undefined;
            } else if (seen.has(q.number)) {
                error(
                    `${path}.number`,
                    `Question ${q.number} appears twice (also at questions[${seen.get(q.number)}]).`,
                    label
                );
                gs = undefined;
            } else {
                seen.set(q.number, n);
            }
        }

        if ("title" in q && typeof q.title !== "string") {
            error(`${path}.title`, `Must be a string, not ${typeName(q.title)}.`, label);
        }

        if ("weight" in q) {
            if (typeof q.weight !== "number" || !Number.isFinite(q.weight)) {
                error(`${path}.weight`, `Must be a number, not ${JSON.stringify(q.weight)}.`, label);
            } else if (gs && Math.abs(q.weight - parseFloat(gs.weight)) > 1e-9) {
                error(
                    `${path}.weight`,
                    `Question ${gs.full_index} is worth ${parseFloat(gs.weight)} on Gradescope, not ${q.weight}. (Weights are set in Gradescope's assignment outline, not by the rubric.)`,
                    label
                );
            }
        }

        if ("scoring" in q) {
            if (q.scoring !== "positive" && q.scoring !== "negative") {
                error(
                    `${path}.scoring`,
                    `Must be "positive" or "negative", not ${JSON.stringify(q.scoring)}.`,
                    label
                );
            } else if (gs && q.scoring !== gs.scoring_type) {
                error(
                    `${path}.scoring`,
                    `Question ${gs.full_index} uses ${gs.scoring_type} scoring on Gradescope, not ${q.scoring}. (Change the scoring type in Gradescope's rubric settings, or fix the file.)`,
                    label
                );
            }
        }

        const rubric: RubricEntry[] = [];
        if ("rubric" in q) {
            if (!Array.isArray(q.rubric)) {
                error(`${path}.rubric`, `Must be an array, not ${typeName(q.rubric)}.`, label);
            } else if (q.rubric.length === 0) {
                contentError(`${path}.rubric`, "Must contain at least one rubric entry.", label);
            } else {
                q.rubric.forEach((e, k) => {
                    const entry = checkEntry(e, `${path}.rubric[${k}]`, label, false, gs);
                    if (entry) {
                        rubric.push(entry);
                    }
                });
            }
        }

        if (errors.length > errorsBefore || !gs) {
            return null;
        }
        const parsed: RubricQuestion = {
            number: String(gs.full_index),
            title: typeof q.title === "string" ? q.title : undefined,
            weight: q.weight as number,
            scoring: q.scoring as RubricQuestion["scoring"],
            rubric,
        };
        checkQuestionHeuristics(parsed, path);
        return parsed;
    }

    function checkEntry(
        e: Json,
        path: string,
        question: string,
        inGroup: boolean,
        gs: GsQuestion | undefined
    ): RubricEntry | null {
        if (!isObject(e)) {
            error(path, `Each rubric entry must be an object, not ${typeName(e)}.`, question);
            return null;
        }
        const errorsBefore = errors.length;
        if (!("type" in e)) {
            const guess = "items" in e ? ' (it has "items", so probably "group")' : ' (probably "item")';
            error(path, `Missing required key "type"${guess}.`, question);
            return null;
        }
        if (e.type === "item") {
            checkKeys(e, path, ["type", "points", "description"], [], question);
            const points = checkPoints(e.points, `${path}.points`, question, gs);
            const description = checkDescription(e.description, `${path}.description`, question);
            if (errors.length > errorsBefore || points === null || description === null) {
                return null;
            }
            return { type: "item", points, description };
        }
        if (e.type === "group") {
            if (inGroup) {
                error(path, "Groups cannot be nested inside groups.", question);
                return null;
            }
            checkKeys(e, path, ["type", "description", "mutually_exclusive", "items"], [], question);
            const description = checkDescription(e.description, `${path}.description`, question);
            if ("mutually_exclusive" in e && typeof e.mutually_exclusive !== "boolean") {
                error(
                    `${path}.mutually_exclusive`,
                    `Must be true or false, not ${JSON.stringify(e.mutually_exclusive)}.`,
                    question
                );
            }
            const items: RubricItem[] = [];
            if ("items" in e) {
                if (!Array.isArray(e.items)) {
                    error(`${path}.items`, `Must be an array, not ${typeName(e.items)}.`, question);
                } else if (e.items.length === 0) {
                    contentError(`${path}.items`, "A group must contain at least one item.", question);
                } else {
                    e.items.forEach((i, k) => {
                        const item = checkEntry(i, `${path}.items[${k}]`, question, true, gs);
                        if (item?.type === "item") {
                            items.push(item);
                        }
                    });
                }
            }
            if (errors.length > errorsBefore || description === null) {
                return null;
            }
            return {
                type: "group",
                description,
                mutually_exclusive: e.mutually_exclusive as boolean,
                items,
            };
        }
        error(
            `${path}.type`,
            `Must be "item" or "group", not ${JSON.stringify(e.type)}.`,
            question
        );
        return null;
    }

    function checkPoints(
        p: Json | undefined,
        path: string,
        question: string,
        gs: GsQuestion | undefined
    ): number | null {
        if (p === undefined) {
            return null; // reported as a missing key
        }
        if (typeof p !== "number" || !Number.isFinite(p)) {
            error(path, `Must be a number, not ${JSON.stringify(p)}.`, question);
            return null;
        }
        if (Math.abs(p * 100 - Math.round(p * 100)) > 1e-6) {
            contentError(path, `${p} has more than two decimal places.`, question);
        }
        const weight = gs ? parseFloat(gs.weight) : NaN;
        if (weight > 0 && Math.abs(p) > weight) {
            contentWarn(
                path,
                `${p} points is more than the whole question is worth (${weight}).`,
                question
            );
        }
        return p === 0 ? 0 : p;
    }

    function checkDescription(d: Json | undefined, path: string, question: string): string | null {
        if (d === undefined) {
            return null; // reported as a missing key
        }
        if (typeof d !== "string") {
            error(path, `Must be a string, not ${typeName(d)}.`, question);
            return null;
        }
        if (d.trim() === "") {
            contentError(path, "Must not be empty.", question);
            return d;
        }
        const problems = descriptionErrors(d);
        if (DEFAULT_ITEM_DESCRIPTIONS.slice(1).includes(d.trim())) {
            problems.unshift(`"${d.trim()}" is Gradescope's placeholder text.`);
        }
        for (const message of problems) {
            contentError(path, message, question);
        }
        if (problems.length === 0) {
            // (warnings about a broken description would only add noise)
            for (const message of descriptionWarnings(d)) {
                contentWarn(path, message, question);
            }
        }
        return d;
    }

    function checkQuestionHeuristics(q: RubricQuestion, path: string) {
        if (q.scoring === "positive") {
            const max = maxPositivePoints(q.rubric);
            if (Math.abs(max - q.weight) > 1e-9) {
                contentWarn(
                    `${path}.rubric`,
                    `The positive items add up to at most ${max} points, but the question is worth ${q.weight}.`,
                    q.number
                );
            }
        } else {
            const max = maxPositivePoints(q.rubric);
            if (max > 0) {
                contentWarn(
                    `${path}.rubric`,
                    `Under negative scoring students start with full marks (${q.weight}), so positive items (up to ${max} point${max === 1 ? "" : "s"}) would give more than full marks. Deductions are negative points, e.g. -1.`,
                    q.number
                );
            }
        }
        const descriptions = q.rubric.flatMap((e) =>
            e.type === "item" ? [e.description] : e.items.map((i) => i.description)
        );
        const dupes = descriptions.filter((d, k) => descriptions.indexOf(d) !== k);
        for (const d of new Set(dupes)) {
            contentWarn(
                `${path}.rubric`,
                `Two items have the same description: "${d.slice(0, 60)}".`,
                q.number
            );
        }
    }

    // --------------------------------------------------------------------------- plans

    for (const next of validQuestions) {
        const question = assignment.question(next.number)!;
        const current = assignment.toRubricQuestion(question);
        const status: PlanStatus = sameRubric(current.rubric, next.rubric)
            ? "unchanged"
            : assignment.hasOnlyDefaultRubric(question.id)
              ? "create"
              : "conflict";
        plans.push({ number: next.number, question, current, next, status });
    }
    // Report content problems, except for questions that will not change.
    const unchanged = new Set(plans.filter((p) => p.status === "unchanged").map((p) => p.number));
    for (const [question, issues] of deferred) {
        if (!unchanged.has(question)) {
            errors.push(...issues.errors);
            warnings.push(...issues.warnings);
        }
    }
    return result(errors.length === 0 ? (data as unknown as RubricFile) : null);
}

/** The most points obtainable from positive items (an exclusive group counts its best item). */
export function maxPositivePoints(rubric: RubricEntry[]) {
    let total = 0;
    for (const e of rubric) {
        if (e.type === "item") {
            total += Math.max(e.points, 0);
        } else {
            const positive = e.items.map((i) => i.points).filter((p) => p > 0);
            if (positive.length) {
                total += e.mutually_exclusive
                    ? Math.max(...positive)
                    : positive.reduce((x, y) => x + y, 0);
            }
        }
    }
    return Math.round(total * 100) / 100;
}

function describeJsonError(e: unknown, text: string) {
    let message = e instanceof Error ? e.message : String(e);
    const m = message.match(/position (\d+)/);
    if (m && !/line \d+/.test(message)) {
        const before = text.slice(0, +m[1]);
        const line = before.split("\n").length;
        const column = before.length - before.lastIndexOf("\n");
        message += ` (line ${line}, column ${column})`;
    }
    if (/escape/i.test(message)) {
        message +=
            '. In JSON, every LaTeX backslash must be written twice: "\\\\in", "\\\\{", "\\\\frac".';
    }
    return message;
}

// ---------------------------------------------------------------- description checks

export interface MathSegment {
    display: boolean;
    body: string;
}

/**
 * Split a description into its math segments, following Gradescope's markdown:
 * `$$...$$` is inline math and `$$$...$$$` is display math. Returns an error message
 * instead if the delimiters don't pair up.
 */
export function mathSegments(d: string): { segments: MathSegment[]; error?: string } {
    const segments: MathSegment[] = [];
    let open: { len: number; at: number } | null = null;
    const re = /(?<!\\)\$+/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(d))) {
        const len = m[0].length;
        if (len === 1) {
            return {
                segments,
                error: `A single "$" at character ${m.index + 1}. Gradescope writes inline math as $$...$$ and display math as $$$...$$$; a single $ is not math (write \\$ for a literal dollar sign).`,
            };
        }
        if (len > 3) {
            return {
                segments,
                error: `"${m[0]}" at character ${m.index + 1}: use $$...$$ (inline) or $$$...$$$ (display), and put a space between adjacent math.`,
            };
        }
        if (!open) {
            open = { len, at: m.index + len };
        } else if (open.len === len) {
            segments.push({ display: len === 3, body: d.slice(open.at, m.index) });
            open = null;
        } else {
            return {
                segments,
                error: `Math opened with ${"$".repeat(open.len)} is closed with ${m[0]} at character ${m.index + 1}.`,
            };
        }
    }
    if (open) {
        return {
            segments,
            error: `Math opened with ${"$".repeat(open.len)} at character ${open.at - open.len + 1} is never closed.`,
        };
    }
    return { segments };
}

const CONTROL_CHARACTER_HINTS: Record<string, string> = {
    "\t": "a tab (\\t, as in \\text, \\times, \\to, \\theta)",
    "\f": "a form feed (\\f, as in \\frac)",
    "\b": "a backspace (\\b, as in \\beta, \\bar, \\begin)",
    "\r": "a carriage return (\\r, as in \\right, \\rho)",
    "\v": "a vertical tab (\\v, as in \\vec, \\varepsilon)",
};

export function descriptionErrors(d: string): string[] {
    const errors: string[] = [];
    const controls = d.replace(/\r\n/g, "\n").match(/[\u0000-\u0009\u000B-\u001F]/g);
    if (controls) {
        const kinds = [...new Set(controls)].map(
            (c) => CONTROL_CHARACTER_HINTS[c] ?? `the control character U+${c.charCodeAt(0).toString(16).padStart(4, "0")}`
        );
        errors.push(
            `Contains ${kinds.join(" and ")}. A LaTeX command probably lost its backslash to JSON escaping: in JSON, write every backslash twice, e.g. "\\\\frac", "\\\\text".`
        );
    }
    const delimiter = d.match(/(?<!\\)\\[()[\]]/);
    if (delimiter) {
        errors.push(
            `Contains "${delimiter[0]}". Gradescope does not render \\( \\) or \\[ \\]; write inline math as $$...$$ and display math as $$$...$$$.`
        );
    }
    const { segments, error } = mathSegments(d);
    if (error) {
        errors.push(error);
    }
    for (const { body } of segments) {
        if (body.trim() === "") {
            errors.push("Contains empty math ($$ $$).");
            continue;
        }
        const unbalanced = braceBalance(body);
        if (unbalanced) {
            errors.push(`Unbalanced braces in the math "${body.trim().slice(0, 60)}": ${unbalanced}`);
        }
    }
    return errors;
}

export function descriptionWarnings(d: string): string[] {
    const warnings: string[] = [];
    const { segments } = mathSegments(d);
    for (const { body } of segments) {
        const shown = `"${body.trim().slice(0, 60)}"`;
        if (unescapedSetBrace(body)) {
            warnings.push(
                `The math ${shown} contains a "{" that does not start a LaTeX argument. In LaTeX, plain braces are invisible; write set braces as \\{ and \\}.`
            );
        }
        if (/\n/.test(body)) {
            warnings.push(
                `The math ${shown} contains a line break. Did a command like \\neq or \\nabla lose its backslash to JSON escaping ("\\n")?`
            );
        }
        if (/(^|[^\\a-zA-Z])(RR|ZZ|NN|QQ|CC)(?![a-zA-Z])/.test(body)) {
            warnings.push(`The math ${shown} looks like Typst; write \\mathbb{R}, \\mathbb{Z}, etc.`);
        }
        if (/(<=|>=|!=|=>|->)/.test(body)) {
            warnings.push(
                `The math ${shown} uses ASCII operators (<=, >=, !=, =>, ->); use \\le, \\ge, \\neq, \\Rightarrow, \\to.`
            );
        }
    }
    if (/\\n(?![a-zA-Z])/.test(d)) {
        warnings.push(
            'Contains a literal "\\n" (backslash, n). If you meant a line break, the JSON has one backslash too many.'
        );
    }
    return warnings;
}

/** Describe unbalanced `{ }` in LaTeX (ignoring `\{ \}`), or return null if balanced. */
function braceBalance(tex: string): string | null {
    let depth = 0;
    const s = tex.replace(/\\\\/g, "").replace(/\\[{}]/g, "");
    for (const ch of s) {
        if (ch === "{") {
            depth++;
        } else if (ch === "}") {
            if (--depth < 0) {
                return 'a "}" closes nothing.';
            }
        }
    }
    return depth > 0 ? `${depth} "{" never closed.` : null;
}

/** True if some `{` in the LaTeX is not the start of an argument (a likely set brace). */
function unescapedSetBrace(tex: string) {
    const s = tex.replace(/\\\\/g, "  ").replace(/\\[{}]/g, "  ");
    for (let k = 0; k < s.length; k++) {
        if (s[k] !== "{") {
            continue;
        }
        const before = s.slice(0, k);
        if (!/(\\[a-zA-Z]+\*?|[\^_}\]])\s*$/.test(before)) {
            return true;
        }
    }
    return false;
}
