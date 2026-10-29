import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Assignment } from "./assignment";
import { QuestionHeader } from "./RubricView";
import { selectablePlans, selectedPlans, selectionSummary } from "./selection";
import { validateRubricText } from "./validate";
import { SEED } from "../../dev/seed";

const assignment = new Assignment(SEED);

/** Q1 is new, Q2.1 replaces its rubric, Q3 is the current rubric unchanged. */
function plans() {
    const file = assignment.toRubricFile();
    const keep = (n: string) => file.questions.find((q) => q.number === n)!;
    const q1 = { ...keep("1"), rubric: [{ type: "item", points: 2, description: "Correct" }] };
    const q21 = { ...keep("2.1"), rubric: [{ type: "item", points: 2, description: "Correct" }] };
    const result = validateRubricText(JSON.stringify({ ...file, questions: [q1, q21, keep("3")] }), assignment);
    expect(result.errors).toEqual([]);
    expect(result.plans.map((p) => p.status)).toEqual(["create", "conflict", "unchanged"]);
    return result.plans;
}

describe("selection", () => {
    it("selects every question that would change by default", () => {
        expect(selectablePlans(plans()).map((p) => p.number)).toEqual(["1", "2.1"]);
        expect(selectedPlans(plans(), new Set()).map((p) => p.number)).toEqual(["1", "2.1"]);
        expect(selectionSummary(plans(), new Set())).toEqual({ selectable: 2, selected: 2, replacing: 1 });
    });

    it("leaves out unticked questions", () => {
        expect(selectedPlans(plans(), new Set(["2.1"])).map((p) => p.number)).toEqual(["1"]);
        expect(selectionSummary(plans(), new Set(["2.1"]))).toEqual({ selectable: 2, selected: 1, replacing: 0 });
        // Unticking an unchanged question (or one not in the file) changes nothing.
        expect(selectionSummary(plans(), new Set(["3", "9"]))).toEqual({ selectable: 2, selected: 2, replacing: 1 });
    });
});

describe("QuestionHeader", () => {
    const header = (rubric: any[], scoring = "positive") =>
        renderToStaticMarkup(<QuestionHeader number="1" weight={2} scoring={scoring} rubric={rubric} />);
    const item = (points: number) => ({ type: "item", points, description: "x" });

    it("points out positive items that don't add up to the weight", () => {
        expect(header([item(1), item(0.5), item(0)])).toContain("sum of positive points: 1.5");
        expect(header([item(1), item(1), item(-0.5)])).not.toContain("rb-qtotal");
        expect(header([{ type: "group", description: "g", mutually_exclusive: true, items: [item(2), item(1)] }])).not.toContain("rb-qtotal");
    });

    it("stays quiet for empty and default rubrics", () => {
        expect(header([])).not.toContain("rb-qtotal");
        expect(header([item(0)])).not.toContain("rb-qtotal");
    });

    it("under negative scoring, points out only positive items", () => {
        expect(header([item(0), item(-1), item(-3)], "negative")).not.toContain("rb-qtotal");
        expect(header([item(0), item(1), item(-1)], "negative")).toContain("sum of positive points: 1");
    });
});
