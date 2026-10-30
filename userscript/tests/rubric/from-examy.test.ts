import { describe, expect, it } from "vitest";
import { Assignment } from "../../src/rubric/assignment";
import { gradescopeMath, rubricFromExamy, type ExamyRubrics } from "../../src/rubric/from-examy";
import { validateRubricText } from "../../src/rubric/validate";
import { SEED } from "../../dev/seed";
import type { RegionsFile } from "../../src/outline/types";
import rubrics from "../fixtures/examy-rubric-test.rubric.json";
import regions from "../fixtures/examy-rubric-test.regions.json";
import final from "../outline/fixtures/examy-final-exam.json";

const assignment = new Assignment(SEED);

describe("gradescopeMath", () => {
    it("writes examy's inline and display math as Gradescope's", () => {
        expect(gradescopeMath("Let $x in RR$ and $$ x^2 >= 0 $$, so $y$.")).toBe("Let $$x in RR$$ and $$$ x^2 >= 0 $$$, so $$y$$.");
    });
});

describe("rubricFromExamy", () => {
    it("makes a rubric file with Gradescope's numbers, weights, and scoring", () => {
        const { file, warnings } = rubricFromExamy(rubrics as ExamyRubrics[], regions as RegionsFile, assignment);
        expect(file.questions.map((q) => [q.number, q.weight, q.scoring])).toEqual([
            ["1", 2, "positive"],
            ["2.1", 2, "positive"],
            ["2.2", 2, "positive"],
        ]);
        expect(file.questions[2].rubric).toEqual([
            {
                type: "group",
                description: "**Proof**",
                mutually_exclusive: false,
                items: [
                    { type: "item", points: 2, description: "Complete" },
                    { type: "item", points: 1, description: "Gaps" },
                ],
            },
        ]);
        expect(warnings).toEqual(["Rubric annotations (notes for graders) are not on Gradescope; they are left out."]);
        // The tool reads it (2.1's points don't reach its Gradescope weight: a warning, not an error).
        expect(validateRubricText(JSON.stringify(file), assignment).errors).toEqual([]);
    });

    it("numbers subparts as the outline does: a part with the points covers its subparts", () => {
        const sub: ExamyRubrics[] = [
            {
                exam: 1,
                questions: [
                    { number: "3.1.1", title: "", points: 0, rubric: [{ type: "item", points: 1, description: "i", annotation: null }] },
                    { number: "3.1.2", title: "", points: 0, rubric: [{ type: "item", points: 1, description: "ii", annotation: null }] },
                    { number: "3", title: "", points: 5, rubric: [{ type: "note", text: "Read carefully" }] },
                ],
            },
        ];
        const { file, warnings } = rubricFromExamy(sub, final as RegionsFile, assignment);
        expect(file.questions.map((q) => [q.number, q.rubric.map((e) => e.type === "item" && e.description)])).toEqual([["3.1", ["i", "ii"]]]);
        expect(warnings).toContain("Question 3's own rubric is left out: its points are in its parts, which are Gradescope's questions.");
        expect(warnings).toContain("Examy question 3.1.1, 3.1.2 is question 3.1, which is not on Gradescope; set the outline first (Outline JSON).");
    });
});
