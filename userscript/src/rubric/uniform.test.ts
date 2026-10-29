import { describe, expect, it } from "vitest";
import { Assignment } from "./assignment";
import { maxPoints, presetFullMarks, templateFit, templateProblems, uniformPoints, uniformRubric, UNIFORM_PRESETS, type UniformTemplate } from "./uniform";
import { validateRubricText } from "./validate";
import { SEED } from "../../dev/seed";

const assignment = new Assignment(SEED);
const partial: UniformTemplate = { items: UNIFORM_PRESETS[1].items(2), group: null };

describe("uniform rubric", () => {
    it("fills presets for the chosen questions' weight", () => {
        expect(UNIFORM_PRESETS[1].items(3).map((i) => i.points)).toEqual([3, 1.5, 0]);
        expect(UNIFORM_PRESETS[1].items(1.25).map((i) => i.points)).toEqual([1.25, 0.63, 0]);
        expect(presetFullMarks([{ weight: 2 }, { weight: 2 }])).toBe(2);
        expect(presetFullMarks([{ weight: 2 }, { weight: 1 }])).toBe(1);
    });

    it("gives every chosen question the same points, in a file the uploader accepts", () => {
        const template = { ...partial, group: { description: "**Score**", mutually_exclusive: true } };
        const file = uniformRubric(assignment, template, ["2.2", "1", "2.1"]);
        expect(file.questions.map((q) => q.number)).toEqual(["1", "2.1", "2.2"]);
        expect(file.questions.every((q) => JSON.stringify(q.rubric) === JSON.stringify(file.questions[0].rubric))).toBe(true);
        expect(file.questions.map((q) => q.scoring)).toEqual(["positive", "positive", "positive"]);
        expect(file.questions[0].rubric).toEqual([
            {
                type: "group",
                description: "**Score**",
                mutually_exclusive: true,
                items: [
                    { type: "item", points: 2, description: "**Correct**" },
                    { type: "item", points: 1, description: "**Partially correct**" },
                    { type: "item", points: 0, description: "Incorrect" },
                ],
            },
        ]);
        const result = validateRubricText(JSON.stringify(file), assignment);
        expect(result.errors).toEqual([]);
        expect(result.warnings).toEqual([]);
    });

    it("turns points into deductions on negatively scored questions", () => {
        expect([3, 1.5, 0, -0.5].map((p) => uniformPoints(p, 3, "negative"))).toEqual([0, -1.5, -3, -0.5]);
        expect([3, 1.5, 0, -0.5].map((p) => uniformPoints(p, 3, "positive"))).toEqual([3, 1.5, 0, -0.5]);
        const template = { items: UNIFORM_PRESETS[1].items(3), group: { description: "**Score**", mutually_exclusive: true } };
        const file = uniformRubric(assignment, template, ["3"]); // Q3: 3 points, negative scoring
        expect(file.questions[0].rubric[0].type === "group" && file.questions[0].rubric[0].items.map((i) => i.points)).toEqual([0, -1.5, -3]);
        expect(templateFit(template, { weight: 3 })).toBeNull();
        const result = validateRubricText(JSON.stringify(file), assignment);
        expect(result.errors).toEqual([]);
        expect(result.warnings).toEqual([]);
    });

    it("says how the template fits each question", () => {
        const exclusive = { ...partial, group: { description: "g", mutually_exclusive: true } };
        expect(maxPoints(partial)).toBe(3);
        expect(maxPoints(exclusive)).toBe(2);
        expect(templateFit(exclusive, { weight: 2 })).toBeNull();
        expect(templateFit(exclusive, { weight: 1 })).toBe("The sum of positive points is 2, but the question is worth 1.");
    });

    it("reports what keeps a template from being used", () => {
        expect(templateProblems(partial, 2)).toEqual([]);
        expect(
            templateProblems({ items: [{ description: " ", points: NaN }, { description: "x", points: 0.333 }], group: { description: "", mutually_exclusive: true } }, 0)
        ).toEqual([
            "Choose at least one question.",
            "Item 1 needs a description.",
            "Item 1 needs points.",
            "Item 2: points can have at most two decimal places.",
            "The group needs a description.",
        ]);
    });
});
