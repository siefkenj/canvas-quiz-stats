import { describe, expect, it } from "vitest";
import { Assignment } from "../../src/rubric/assignment";
import { gradescopeMath, rubricFromExamy, rubricsKind, type ExamyRubrics } from "../../src/rubric/from-examy";
import { validateRubricText } from "../../src/rubric/validate";
import { SEED } from "../../dev/seed";
import { parseRegions } from "../../src/outline/outline";
// A small exam's rubrics and regions, as examy 1.1.0 attaches them; and as examy 1.0.0 and
// gradescope.typ did.
import rubrics11 from "../fixtures/examy-1.1-test.rubric.json";
import regions11 from "../fixtures/examy-1.1-test.regions.json";
import rubrics from "../fixtures/examy-rubric-test.rubric.json";
import regionsOld from "../fixtures/examy-rubric-test.regions.json";
import finalOld from "../outline/fixtures/examy-final-exam.json";

const assignment = new Assignment(SEED);
const read = (data: unknown) => parseRegions(JSON.stringify(data)).file!;
const regions = read(regionsOld);
const final = read(finalOld);

describe("gradescopeMath", () => {
    it("writes examy's inline and display math as Gradescope's", () => {
        expect(gradescopeMath("Let $x in RR$ and $$ x^2 >= 0 $$, so $y$.")).toBe("Let $$x in RR$$ and $$$ x^2 >= 0 $$$, so $$y$$.");
    });
});

describe("rubricFromExamy", () => {
    it("makes a rubric file with Gradescope's numbers, weights, and scoring", () => {
        const { file, warnings } = rubricFromExamy(rubrics11 as ExamyRubrics, read(regions11), assignment);
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

    it("makes the same rubric file from examy 1.0.0's rubrics and gradescope.typ's regions", () => {
        const now = rubricFromExamy(rubrics11 as ExamyRubrics, read(regions11), assignment);
        const old = rubricFromExamy(rubrics as ExamyRubrics, regions, assignment);
        expect(old).toEqual(now);
    });

    it("numbers parts and subparts as the outline does: side by side in their question's group", () => {
        const sub: ExamyRubrics = {
            format: "examy-rubric",
            "exam-name": null,
            rubrics: [
                { address: [2, 0, 0], "display-name": "3 (a) i", level: 3, points: null, "bonus-points": null, rubric: [{ type: "item", points: 1, description: "i", annotation: null }] },
                { address: [2, 0, 1], "display-name": "3 (a) ii", level: 3, points: null, "bonus-points": null, rubric: [{ type: "item", points: 1, description: "ii", annotation: null }] },
                { address: [2], "display-name": "3", level: 1, points: null, "bonus-points": null, rubric: [{ type: "note", text: "Read carefully" }] },
            ],
        };
        const { file, warnings } = rubricFromExamy(sub, final, assignment);
        // 3 (a) is 3.1, and its subparts 3.2 and 3.3.
        expect(file.questions.map((q) => [q.number, q.rubric.map((e) => e.type === "item" && e.description)])).toEqual([
            ["3.2", ["i"]],
            ["3.3", ["ii"]],
        ]);
        expect(warnings).toContain(
            "Examy 3's own rubric is left out: it has no answer boxes or points of its own, so it is not a Gradescope question (its parts are)."
        );
        // Not on Gradescope: weighted as the outline would have it (the subparts have no points).
        expect(file.questions.map((q) => q.weight)).toEqual([0, 0]);
    });

    it("takes a damaged file for neither kind of rubrics, and says so rather than failing on it", () => {
        const damaged = { ...rubrics11, rubrics: [{ ...rubrics11.rubrics[0], rubric: [{ type: "item", points: 1 }] }] };
        expect(rubricsKind(JSON.stringify(rubrics11))).toBe("examy");
        expect(rubricsKind(JSON.stringify(damaged))).toBe(null);
        expect(rubricsKind(JSON.stringify({ ...rubrics11, rubrics: [{ rubric: [] }] }))).toBe(null);
        expect(() => rubricFromExamy(damaged as unknown as ExamyRubrics, null, assignment)).toThrow(/not examy's rubrics/);
        // examy 1.0.0's, with a title that is not text.
        expect(rubricsKind(JSON.stringify([{ ...rubrics[0], questions: [{ ...rubrics[0].questions[0], title: 3 }] }]))).toBe(null);
    });

    it("reads examy 1.0.0's rubrics too", () => {
        const sub: ExamyRubrics = [
            {
                exam: 1,
                questions: [
                    { number: "3.1.1", title: "", points: 0, rubric: [{ type: "item", points: 1, description: "i", annotation: null }] },
                    { number: "3.1.2", title: "", points: 0, rubric: [{ type: "item", points: 1, description: "ii", annotation: null }] },
                    { number: "3", title: "", points: 5, rubric: [{ type: "note", text: "Read carefully" }] },
                ],
            },
        ];
        const { file, warnings } = rubricFromExamy(sub, final, assignment);
        // 3 (a) is 3.1, and its subparts 3.2 and 3.3.
        expect(file.questions.map((q) => [q.number, q.rubric.map((e) => e.type === "item" && e.description)])).toEqual([
            ["3.2", ["i"]],
            ["3.3", ["ii"]],
        ]);
        expect(warnings).toContain(
            "Examy 3's own rubric is left out: it has no answer boxes or points of its own, so it is not a Gradescope question (its parts are)."
        );
        expect(warnings).toContain("Examy question 3.1.1 is question 3.2, which is not on Gradescope; set the outline first (Outline JSON).");
    });
});
