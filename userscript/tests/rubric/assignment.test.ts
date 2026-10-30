import { describe, expect, it } from "vitest";
import { Assignment, pointsToWeight, sameRubric, weightToPoints } from "../../src/rubric/assignment";
import { diffEntries, diffSequence, rubricText } from "../../src/rubric/diff";
import { SEED } from "../../dev/seed";

const a = new Assignment(SEED);

describe("Assignment", () => {
    it("lists only questions that can have a rubric", () => {
        expect(a.leafQuestions.map((q) => q.full_index)).toEqual(["1", "2.1", "2.2", "3", "4"]);
    });

    it("recognises Gradescope's default rubric", () => {
        const ids = Object.fromEntries(a.leafQuestions.map((q) => [q.full_index, a.hasOnlyDefaultRubric(q.id)]));
        expect(ids).toEqual({ "1": true, "2.1": false, "2.2": true, "3": false, "4": true });
    });

    it("shows items whose group is gone as ungrouped", () => {
        const payload = structuredClone(SEED);
        payload.rubric_item_groups = payload.rubric_item_groups.filter((g) => g.id !== 501);
        const b = new Assignment(payload);
        const entries = b.entries(b.question("2.1")!.id);
        expect(entries.map((e) => (e.kind === "item" ? e.item.id : e.group.id)).sort()).toEqual([1010, 1011, 1012]);
    });

    it("reads entries in position order, with groups and their items", () => {
        const q = a.toRubricQuestion(a.question("2.1")!);
        expect(q.rubric).toEqual([
            {
                type: "group",
                description: "**Argument**",
                mutually_exclusive: false,
                items: [
                    { type: "item", points: 1, description: "**Claim**: You state the correct claim." },
                    { type: "item", points: 1, description: "**Proof**: Your proof is complete." },
                ],
            },
            { type: "item", points: 0, description: "Incorrect" },
        ]);
    });

    it("converts negative-scoring weights to score changes", () => {
        const q = a.toRubricQuestion(a.question("3")!);
        expect(q.rubric.map((e) => e.type === "item" && e.points)).toEqual([0, -1, -2]);
        expect(weightToPoints("1.0", "negative")).toBe(-1);
        expect(weightToPoints("0.0", "negative")).toBe(0);
        expect(Object.is(weightToPoints("0.0", "negative"), -0)).toBe(false);
        expect(pointsToWeight(-1.5, "negative")).toBe("1.5");
        expect(pointsToWeight(-0.5, "positive")).toBe("-0.5");
    });

    it("compares rubrics ignoring surrounding whitespace", () => {
        const r = a.toRubricQuestion(a.question("2.1")!).rubric;
        const copy = structuredClone(r);
        if (copy[1].type === "item") copy[1].description = " Incorrect\r\n";
        expect(sameRubric(r, copy)).toBe(true);
        if (copy[1].type === "item") copy[1].points = 0.5;
        expect(sameRubric(r, copy)).toBe(false);
    });
});

describe("diff", () => {
    it("diffs sequences by longest common subsequence", () => {
        const d = diffSequence(["a", "b", "c"], ["a", "x", "c"], (x) => x);
        expect(d.map((e) => `${e.mark}:${e.value}`)).toEqual(["same:a", "removed:b", "added:x", "same:c"]);
    });

    it("marks removed and added entries, and diffs items inside a kept group", () => {
        const before = a.toRubricQuestion(a.question("2.1")!).rubric;
        const after = structuredClone(before);
        if (after[0].type === "group") {
            after[0].items[1].points = 0.5; // changed item: removed + added
            after[0].items.push({ type: "item", points: 0, description: "Blank" });
        }
        after.pop(); // "Incorrect" removed
        const view = diffEntries(before, after);
        expect(view.map((e) => `${e.kind}:${e.mark}`)).toEqual(["group:same", "item:removed"]);
        const group = view[0];
        expect(group.kind === "group" && group.items.map((i) => `${i.mark}:${i.points}:${i.oldPoints ?? ""}`)).toEqual([
            "same:1:",
            "changed:0.5:1",
            "added:0:",
        ]);
    });

    it("shows a group with a new heading once, as changed, with its items compared", () => {
        const before = a.toRubricQuestion(a.question("2.1")!).rubric;
        const after = structuredClone(before);
        if (after[0].type === "group") {
            after[0].description = "**Argument**\n\nYou must make the correct claim.";
            after[0].mutually_exclusive = true;
            after[0].items.pop();
        }
        const view = diffEntries(before, after);
        expect(view.map((e) => e.mark)).toEqual(["changed", "same"]);
        const group = view[0];
        expect(group.kind === "group" && [group.oldDescription, group.oldMutuallyExclusive]).toEqual(["**Argument**", false]);
        expect(group.kind === "group" && group.items.map((i) => i.mark)).toEqual(["same", "removed"]);
    });

    it("shows an item whose points changed once, and unrelated edits as removed and added", () => {
        const before = [
            { type: "item" as const, points: 1, description: "Setup" },
            { type: "item" as const, points: 0, description: "Blank" },
        ];
        const after = [
            { type: "item" as const, points: 2, description: "Setup" },
            { type: "item" as const, points: 0, description: "Incorrect" },
        ];
        // Within a run of changes, removed entries come first; the rest follow the new order.
        expect(diffEntries(before, after).map((e) => `${e.mark}:${e.kind === "item" ? e.description : ""}`)).toEqual([
            "removed:Blank",
            "changed:Setup",
            "added:Incorrect",
        ]);
    });

    it("renders a rubric as text", () => {
        const text = rubricText([a.toRubricQuestion(a.question("2.1")!)]);
        expect(text).toContain("Q2.1 (2 points, positive scoring)");
        expect(text).toContain("[group] **Argument**");
        expect(text).toContain("       +1  **Claim**");
    });
});
