import { describe, expect, it } from "vitest";
import { Assignment } from "../../src/rubric/assignment";
import { validateRubricText } from "../../src/rubric/validate";
import { SEED } from "../../dev/seed";

const assignment = new Assignment(SEED);

/** A valid file setting Q1 (default item only), Q2.1 (existing rubric) and Q3 (negative). */
function validFile(): any {
    return {
        format: "gradescope-rubric",
        version: 1,
        assignment: { course_id: 1, assignment_id: 1, title: "Sample Problem Set" },
        questions: [
            {
                number: "1",
                weight: 2,
                scoring: "positive",
                rubric: [
                    { type: "item", points: 2, description: "**Correct**: $$x \\in \\mathbb{Z}$$." },
                    { type: "item", points: 0, description: "Incorrect" },
                ],
            },
            {
                number: "2.1",
                title: "",
                weight: 2,
                scoring: "positive",
                rubric: [
                    {
                        type: "group",
                        description: "**Proof**",
                        mutually_exclusive: false,
                        items: [
                            { type: "item", points: 1, description: "Setup: $$\\{x : x > 0\\}$$" },
                            { type: "item", points: 1, description: "Conclusion" },
                        ],
                    },
                    { type: "item", points: -0.5, description: "Missing universe" },
                ],
            },
            {
                number: "3",
                weight: 3,
                scoring: "negative",
                rubric: [
                    { type: "item", points: 0, description: "Correct" },
                    { type: "item", points: -1, description: "Sign error" },
                ],
            },
        ],
    };
}

const check = (file: unknown) => validateRubricText(JSON.stringify(file), assignment);
const messages = (r: ReturnType<typeof check>, kind: "errors" | "warnings" = "errors") =>
    r[kind].map((i) => `${i.path}: ${i.message}`).join("\n");

describe("valid files", () => {
    it("accepts a valid file and plans each question", () => {
        const r = check(validFile());
        expect(messages(r)).toBe("");
        expect(messages(r, "warnings")).toBe("");
        expect(r.file).not.toBeNull();
        expect(r.plans.map((p) => [p.number, p.status])).toEqual([
            ["1", "create"],
            ["2.1", "conflict"],
            ["3", "conflict"],
        ]);
    });

    it("accepts a file with no assignment, for the assignment on the page", () => {
        const file = validFile();
        delete file.assignment;
        const r = check(file);
        expect(messages(r)).toBe("");
        expect(messages(r, "warnings")).toBe("");
        expect(r.plans.map((p) => p.number)).toEqual(["1", "2.1", "3"]);
    });

    it("accepts the downloaded rubric unchanged, with every question unchanged", () => {
        const r = check(assignment.toRubricFile());
        expect(messages(r)).toBe("");
        expect(r.plans.every((p) => p.status === "unchanged")).toBe(true);
    });

    it("accepts an empty rubric only for a question that has no items", () => {
        const file = validFile();
        file.questions = [{ number: "4", weight: 1, scoring: "positive", rubric: [] }];
        const r = check(file);
        expect(messages(r)).toBe("");
        expect(r.plans[0].status).toBe("unchanged");
    });

    it("treats a question with no items as one to fill in", () => {
        const file = validFile();
        file.questions = [
            { number: "4", weight: 1, scoring: "positive", rubric: [{ type: "item", points: 1, description: "Correct" }] },
        ];
        expect(check(file).plans[0].status).toBe("create");
    });

    it("accepts a byte-order mark and Windows line endings", () => {
        const file = validFile();
        file.questions[0].rubric[1].description = "Incorrect.\r\n\r\nSee the solutions.";
        const r = validateRubricText("﻿" + JSON.stringify(file), assignment);
        expect(messages(r)).toBe("");
    });
});

describe("structural errors", () => {
    const cases: [string, (f: any) => void, RegExp][] = [
        ["invalid JSON", () => {}, /./], // replaced below
        ["unknown top-level key", (f) => (f.extra = 1), /Unknown key "extra"/],
        ["wrong format", (f) => (f.format = "rubric"), /format: Must be "gradescope-rubric"/],
        ["string version", (f) => (f.version = "1"), /version: Must be the number 1/],
        ["wrong assignment", (f) => (f.assignment.assignment_id = 2), /this page is assignment 1/],
        ["wrong course", (f) => (f.assignment.course_id = 7), /this page is course 1/],
        ["wrong title", (f) => (f.assignment.title = "Other"), /titled "Other", but this page is "Sample Problem Set"/],
        ["assignment without its id", (f) => delete f.assignment.assignment_id, /Missing required key "assignment_id"/],
        ["assignment without its course", (f) => delete f.assignment.course_id, /Missing required key "course_id"/],
        ["missing questions", (f) => delete f.questions, /Missing required key "questions"/],
        ["empty questions", (f) => (f.questions = []), /at least one question/],
        ["numeric question number", (f) => (f.questions[0].number = 1), /Must be a string such as "3.1"/],
        ["unknown question", (f) => (f.questions[0].number = "9"), /no question "9"/],
        ["parent question", (f) => (f.questions[0].number = "2"), /rubrics belong to the parts/],
        ["duplicate question", (f) => (f.questions[2].number = "1"), /appears twice/],
        ["wrong weight", (f) => (f.questions[0].weight = 3), /worth 2 on Gradescope, not 3/],
        ["string weight", (f) => (f.questions[0].weight = "2"), /weight: Must be a number/],
        ["wrong scoring", (f) => (f.questions[2].scoring = "positive"), /uses negative scoring/],
        ["bad scoring", (f) => (f.questions[0].scoring = "additive"), /Must be "positive" or "negative"/],
        ["empty rubric", (f) => (f.questions[0].rubric = []), /at least one rubric entry/],
        ["empty rubric on a question with items", (f) => (f.questions[2].rubric = []), /at least one rubric entry/],
        ["missing type", (f) => delete f.questions[0].rubric[0].type, /Missing required key "type"/],
        ["bad type", (f) => (f.questions[0].rubric[0].type = "criterion"), /Must be "item" or "group"/],
        ["weight instead of points", (f) => {
            const e = f.questions[0].rubric[0];
            e.weight = e.points;
            delete e.points;
        }, /Unknown key "weight" \(use "points"/],
        ["string points", (f) => (f.questions[0].rubric[0].points = "2"), /points: Must be a number/],
        ["three decimals", (f) => (f.questions[0].rubric[0].points = 0.333), /more than two decimal places/],
        ["exclusive instead of mutually_exclusive", (f) => {
            const g = f.questions[1].rubric[0];
            g.exclusive = false;
            delete g.mutually_exclusive;
        }, /Unknown key "exclusive" \(use "mutually_exclusive"\)/],
        ["string mutually_exclusive", (f) => (f.questions[1].rubric[0].mutually_exclusive = "false"), /Must be true or false/],
        ["empty group", (f) => (f.questions[1].rubric[0].items = []), /at least one item/],
        ["nested group", (f) => f.questions[1].rubric[0].items.push({ type: "group", description: "x", mutually_exclusive: false, items: [] }), /cannot be nested/],
        ["empty description", (f) => (f.questions[0].rubric[1].description = "  "), /Must not be empty/],
        ["placeholder description", (f) => (f.questions[0].rubric[1].description = "Click here to replace this description."), /placeholder/],
        ["single dollar math", (f) => (f.questions[0].rubric[1].description = "If $x>0$ then"), /single "\$"/],
        ["\\( delimiters", (f) => (f.questions[0].rubric[1].description = "If \\(x>0\\)"), /does not render/],
        ["unclosed math", (f) => (f.questions[0].rubric[1].description = "If $$x>0"), /never closed/],
        ["mismatched math", (f) => (f.questions[0].rubric[1].description = "$$x$$$"), /closed with \$\$\$/],
        ["unbalanced braces", (f) => (f.questions[0].rubric[1].description = "$$\\frac{1}{2$$"), /Unbalanced braces/],
        ["empty math", (f) => (f.questions[0].rubric[1].description = "a $$ $$ b"), /empty math/],
        ["raw Gradescope payload", (f) => (f.rubric_items = []), /Gradescope's raw data/],
    ];
    for (const [name, mutate, expected] of cases.slice(1)) {
        it(`rejects ${name}`, () => {
            const file = validFile();
            mutate(file);
            const r = check(file);
            expect(r.file).toBeNull();
            expect(messages(r)).toMatch(expected);
        });
    }

    it("rejects invalid JSON with a location", () => {
        const r = validateRubricText('{\n  "format": "gradescope-rubric",\n}', assignment);
        expect(r.file).toBeNull();
        expect(messages(r)).toMatch(/Not valid JSON.*line 3/);
    });

    it("rejects a non-object file", () => {
        expect(messages(validateRubricText("[]", assignment))).toMatch(/not an array/);
    });

    it("detects LaTeX backslashes lost to JSON escaping", () => {
        // In JSON source, a single backslash makes "\text" a tab and "\frac" a form feed.
        const file = validFile();
        file.questions[0].rubric[1].description = "XXX";
        const json = JSON.stringify(file).replace('"XXX"', () => '"$$\\text{for some } \\frac{1}{2}$$"');
        const r = validateRubricText(json, assignment);
        expect(messages(r)).toMatch(/a tab .*and a form feed.*write every backslash twice/);
        expect(messages(r)).not.toMatch(/single "\$"/);
    });

    it("rejects a carriage return that is not part of a line ending", () => {
        const file = validFile();
        file.questions[0].rubric[1].description = "$$\right)$$"; // "\r" is a carriage return here
        expect(messages(check(file))).toMatch(/carriage return/);
    });

    it("reports every error, not just the first", () => {
        const file = validFile();
        file.questions[0].weight = "2";
        file.questions[1].rubric[0].exclusive = true;
        file.questions[2].rubric[1].points = "-1";
        expect(check(file).errors.length).toBeGreaterThanOrEqual(3);
    });
});

describe("warnings", () => {
    const warns: [string, (f: any) => void, RegExp][] = [
        ["points not adding up", (f) => (f.questions[0].rubric[0].points = 1.5), /add up to at most 1.5 points, but the question is worth 2/],
        ["item worth more than the question", (f) => (f.questions[0].rubric[1].points = -3), /more than the whole question/],
        ["positive points under negative scoring", (f) => (f.questions[2].rubric[1].points = 1), /start with full marks \(3\), so positive items \(up to 1 point\)/],
        ["unescaped set braces", (f) => (f.questions[0].rubric[1].description = "$${x \\in A}$$"), /plain braces are invisible/],
        ["Typst math", (f) => (f.questions[0].rubric[1].description = "$$x in ZZ$$"), /looks like Typst/],
        ["ASCII operators", (f) => (f.questions[0].rubric[1].description = "$$x <= 1$$"), /ASCII operators/],
        ["line break in math", (f) => (f.questions[0].rubric[1].description = "$$x \neq 1$$"), /line break/],
        ["duplicate descriptions", (f) => (f.questions[0].rubric[1].description = f.questions[0].rubric[0].description), /same description/],
    ];
    for (const [name, mutate, expected] of warns) {
        it(`warns about ${name}`, () => {
            const file = validFile();
            mutate(file);
            const r = check(file);
            expect(messages(r)).toBe("");
            expect(messages(r, "warnings")).toMatch(expected);
        });
    }

    it("does not flag braces that open LaTeX arguments", () => {
        const file = validFile();
        file.questions[0].rubric[1].description =
            "$$\\frac{a}{b} + x^{2} + \\sqrt[3]{y} + \\mathbb{R} + \\left\\{ 1 \\right\\} + \\begin{cases} 1 \\end{cases}$$";
        expect(messages(check(file), "warnings")).toBe("");
    });

    it("does not count an exclusive group's items twice", () => {
        const file = validFile();
        file.questions[1].rubric[0].mutually_exclusive = true;
        file.questions[1].rubric[0].items[0].points = 2;
        expect(messages(check(file), "warnings")).toBe("");
    });
});

describe("round trip", () => {
    /** Gradescope data that breaks the content rules: it must still download and re-upload. */
    function messyAssignment() {
        const payload = structuredClone(SEED);
        payload.rubric_items.push(
            { id: 2001, description: "Click here to replace this description.", weight: "0.0", position: 2, group_id: null, question_id: 103 },
            { id: 2002, description: "Costs $5 if $x>0$", weight: "0.333", position: 3, group_id: null, question_id: 103 },
            { id: 2003, description: "", weight: "1.0", position: 4, group_id: null, question_id: 103 },
            { id: 2004, description: "Incorrect", weight: "0.0", position: 5, group_id: null, question_id: 103 },
            { id: 2005, description: "$${x \\in A}$$ and $$x <= 1$$", weight: "5.0", position: 6, group_id: null, question_id: 103 }
        );
        payload.rubric_item_groups.push({ id: 601, description: "Empty group", mutually_exclusive: true, position: 7, question_id: 103 });
        return new Assignment(payload);
    }

    it("accepts a download of any existing rubric, unchanged, with no errors or warnings", () => {
        for (const a of [assignment, messyAssignment()]) {
            const r = validateRubricText(JSON.stringify(a.toRubricFile(), null, 2), a);
            expect(messages(r)).toBe("");
            expect(messages(r, "warnings")).toBe("");
            expect(r.file).not.toBeNull();
            expect(r.plans.map((p) => p.status)).toEqual(r.plans.map(() => "unchanged"));
        }
    });

    it("still checks a downloaded question once it is edited", () => {
        const a = messyAssignment();
        const file = a.toRubricFile();
        const q = file.questions.find((q) => q.number === "2.1")!;
        q.rubric.push({ type: "item", points: 0, description: "Blank" });
        const r = validateRubricText(JSON.stringify(file), a);
        expect(r.file).toBeNull();
        expect(messages(r)).toMatch(/placeholder text/);
        expect(messages(r)).toMatch(/more than two decimal places/);
        expect(messages(r)).toMatch(/Must not be empty/);
        expect(messages(r)).toMatch(/A group must contain at least one item/);
        // Only the edited question is flagged.
        expect(r.errors.every((e) => e.question === "2.1")).toBe(true);
    });
});
