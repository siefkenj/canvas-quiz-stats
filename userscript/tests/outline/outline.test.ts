import { describe, expect, it } from "vitest";
import { existingTree, flatten, idRegionKey, matchIdRegions, matchOutline, outlinePayload, parseRegions, planOutline, type PlannedQuestion } from "../../src/outline/outline";
import type { GsOutlineProps, GsOutlineQuestion, RegionsFile } from "../../src/outline/types";
import finalExam from "./fixtures/examy-final-exam.json";
import midterm from "./fixtures/midterm.json";

const FINAL = finalExam as RegionsFile;
const MIDTERM = midterm as RegionsFile;

const template = (count: number): GsOutlineProps["template"] => ({
    page_count: count,
    pages: Array.from({ length: count }, (_, k) => ({ number: k + 1, width: 2550, height: 3300, url: "" })),
});

const shape = (qs: PlannedQuestion[]): unknown[] =>
    qs.map((q) => (q.children ? [q.number, q.title, q.weight, shape(q.children)] : [q.number, q.title, q.weight]));

describe("parseRegions", () => {
    it("reads a regions file", () => {
        expect(parseRegions(JSON.stringify(FINAL)).errors).toEqual([]);
    });
    it("explains other files", () => {
        expect(parseRegions("{").errors[0].message).toMatch(/^Not JSON/);
        expect(parseRegions('{"format": "gradescope-rubric"}').errors[0].message).toMatch(/Not a regions file/);
    });
});

describe("planOutline", () => {
    it("makes parts subquestions, and folds subparts into a part that has the points", () => {
        const plan = planOutline(FINAL, template(5));
        expect(plan.errors).toEqual([]);
        expect(shape(plan.questions)).toEqual([
            ["1", "", 3],
            ["2", "", 5, [["2.1", "(a)", 2], ["2.2", "(b)", 3]]],
            ["3", "", 5, [["3.1", "(a)", 2], ["3.2", "(b)", 3], ["3.3", "(c)", 0]]],
        ]);
        expect(plan.questions[2].children![0].covers).toEqual(["3.1", "3.1.1", "3.1.2"]);
        expect(plan.warnings.map((w) => w.message)).toEqual([
            "Question 3.3 (examy 3 (c)) has only bonus points, so it is worth 0 on Gradescope.",
        ]);
    });

    it("puts a region around the answer boxes, 2pt past their borders", () => {
        const plan = planOutline(FINAL, template(5));
        // Q1's box: 70.5pt to 558pt across and 101.33pt to 738pt down page 2 (612 by 792pt).
        expect(plan.questions[0].rects).toEqual([{ x1: 11.2, x2: 91.5, y1: 12.5, y2: 93.4, page_number: 2 }]);
        // 3 (a)'s subparts' boxes, together.
        expect(plan.questions[2].children![0].rects).toEqual([{ x1: 16.6, x2: 91.5, y1: 15.9, y2: 93.4, page_number: 4 }]);
        // A group's region is around its subquestions'.
        expect(plan.questions[1].rects).toEqual([{ x1: 13.9, x2: 91.5, y1: 13.3, y2: 93.4, page_number: 3 }]);
    });

    it("makes the name and student ID regions from the name block's lines", () => {
        expect(planOutline(FINAL, template(5)).idRegions).toEqual({
            name: { x1: 26.3, x2: 91.7, y1: 15.2, y2: 20, page_number: 1 },
            sid: { x1: 26.3, x2: 91.7, y1: 22.8, y2: 25.9, page_number: 1 },
        });
        // UofT's name block: "UTORid:" is the student ID; "Email address:" is neither.
        expect(Object.keys(planOutline(MIDTERM, template(9)).idRegions)).toEqual(["name", "sid"]);
        expect(["NAME:", "Student ID:", "Student number:", "UTORid:", "Email address:"].map(idRegionKey)).toEqual(["name", "sid", "sid", "sid", null]);
        expect(["Surname:", "Given names:", "Student name:", "ID:", "Tutorial ID:", "Username:"].map(idRegionKey)).toEqual(["name", "name", "name", "sid", null, null]);
    });

    it("makes the name region around every line for a name, and the student ID region around the first line for one", () => {
        const line = (label: string, y: number) => ({ label, start: { page: 1, x: 100, y }, end: { page: 1, x: 500, y } });
        const names = [line("First name:", 100), line("Last name:", 130), line("Student number:", 160), line("UTORid:", 190)];
        const { idRegions } = planOutline({ ...FINAL, names }, template(5));
        const pct = (y: number) => Math.round((y / 792) * 1000) / 10;
        expect(idRegions.name).toMatchObject({ y1: pct(100 - 6 - 3), y2: pct(130 + 3) });
        expect(idRegions.sid).toMatchObject({ y1: pct(160 - 6 - 3), y2: pct(160 + 3) });
    });

    it("leaves out of the name region the lines after the name's, and name lines after them", () => {
        const line = (label: string, y: number) => ({ label, start: { page: 1, x: 100, y }, end: { page: 1, x: 500, y } });
        const names = [line("First name:", 100), line("Student number:", 130), line("Last name:", 160)];
        const { idRegions } = planOutline({ ...FINAL, names }, template(5));
        const pct = (y: number) => Math.round((y / 792) * 1000) / 10;
        expect(idRegions.name).toMatchObject({ y1: pct(100 - 6 - 3), y2: pct(100 + 3) });
    });

    it("refuses an exam the file does not have, rather than delete every question", () => {
        const plan = planOutline(FINAL, template(5), 1);
        expect(plan.questions).toEqual([]);
        expect(plan.errors.map((e) => e.message)).toEqual(["The regions file has no exam 2."]);
    });

    it("measures fixed-height boxes, and falls back to the text for parts without marked boxes", () => {
        const plan = planOutline(MIDTERM, template(9));
        expect(plan.errors).toEqual([]);
        const q4a = plan.questions[3].children![0];
        // The box is drawn from 87pt to 558pt across and 95pt to 167pt down page 5; its markers
        // are inside its 5pt inset.
        expect(q4a.rects).toEqual([{ x1: 13.9, x2: 91.5, y1: 11.8, y2: 21.4, page_number: 5 }]);
        const q2 = plan.questions[1].children!;
        expect(q2.every((c) => c.fallback)).toBe(true);
        // 2 (a) runs from its start to 2 (b)'s.
        expect(q2[0].rects).toEqual([{ x1: 8.8, x2: 91.2, y1: 10.2, y2: 26.8, page_number: 3 }]);
        expect(plan.warnings.filter((w) => /no answer boxes/.test(w.message)).map((w) => w.number)).toEqual(["2.1", "2.2", "2.3", "2.4"]);
    });

    it("splits a part whose points are all in its subparts, titling them with examy's labels", () => {
        const at = (y: number) => ({ page: 1, x: 70, y });
        const div = (number: string, label: string, points: number, boxes: [number, number][] = []) => ({
            number,
            label,
            level: number.split(".").length,
            points,
            bonus: null,
            start: at(boxes[0]?.[0] ?? 100),
            boxes: boxes.map(([t, b]) => ({ top: at(t), bottom: at(b) })),
        });
        const file: RegionsFile = {
            ...FINAL,
            pages: [{ page: 1, width: 612, height: 792, margin: { top: 54, bottom: 54, left: 54, right: 54 } }],
            ends: [at(738)],
            exams: [
                [
                    div("1", "1", 4),
                    div("1.1", "1 (a)", 3),
                    div("1.1.1", "1 (a) i", 1, [[100, 200]]),
                    div("1.1.2", "1 (a) ii", 2, [[220, 300]]),
                    div("1.2", "1 (b)", 1, [[320, 400]]),
                ],
            ],
        };
        const plan = planOutline(file, template(1));
        expect(shape(plan.questions)).toEqual([["1", "", 4, [["1.1", "(a) i", 1], ["1.2", "(a) ii", 2], ["1.3", "(b)", 1]]]]);
    });

    it("refuses regions on pages Gradescope's template doesn't have", () => {
        const plan = planOutline(FINAL, template(3));
        expect(plan.errors.map((e) => e.message)).toEqual([
            "The regions reach page 5, but Gradescope's template has 3 pages. Is it the same PDF?",
        ]);
    });
});

/** Gradescope's outline as the plan would leave it, with ids from 1. */
function savedOutline(qs: PlannedQuestion[], titles: Record<string, string> = {}): GsOutlineQuestion[] {
    let id = 0;
    const out: GsOutlineQuestion[] = [];
    qs.forEach((q, k) => {
        const parent = ++id;
        out.push({ id: parent, type: "FreeResponseQuestion", title: titles[q.number] ?? q.title, parent_id: null, weight: q.weight.toFixed(1), crop_rect_list: q.rects, index: k + 1 });
        q.children?.forEach((c, j) => {
            out.push({ id: ++id, type: "FreeResponseQuestion", title: c.title, parent_id: parent, weight: c.weight.toFixed(1), crop_rect_list: c.rects, index: j + 1 });
        });
    });
    return out;
}

describe("matchOutline", () => {
    const plan = planOutline(FINAL, template(5)).questions;

    it("numbers Gradescope's outline by position", () => {
        expect(existingTree(savedOutline(plan)).map((e) => [e.number, e.children.map((c) => c.number)])).toEqual([
            ["1", []],
            ["2", ["2.1", "2.2"]],
            ["3", ["3.1", "3.2", "3.3"]],
        ]);
    });

    it("finds nothing to change in the outline it saved, and keeps question titles", () => {
        const m = matchOutline(plan, savedOutline(plan, { "1": "Sets" }));
        expect(flatten(m.questions).map((q) => q.status)).toEqual(Array(8).fill("same"));
        expect(m.questions[0].title).toBe("Sets");
        expect(m.deleted).toEqual([]);
    });

    it("updates questions in their place, makes new ones, and deletes those left over", () => {
        // Gradescope's: two questions, the first a lone question, the second too.
        const outline: GsOutlineQuestion[] = [
            { id: 11, type: "FreeResponseQuestion", title: "", parent_id: null, weight: "1.0", crop_rect_list: [], index: 1 },
            { id: 12, type: "FreeResponseQuestion", title: "", parent_id: null, weight: "1.0", crop_rect_list: [], index: 2 },
            { id: 13, type: "FreeResponseQuestion", title: "Extra", parent_id: null, weight: "1.0", crop_rect_list: [], index: 4 },
            { id: 14, type: "FreeResponseQuestion", title: "", parent_id: 13, weight: "1.0", crop_rect_list: [], index: 1 },
        ];
        const m = matchOutline(plan.slice(0, 2), outline);
        expect(m.questions[0]).toMatchObject({ status: "changed", changes: ["weight 1 → 3", "region"] });
        expect(m.questions[0].existing?.id).toBe(11);
        // A lone question can't become a group: question 2 is new, and the old one is deleted.
        expect(m.questions[1].status).toBe("new");
        expect(m.deleted.map((d) => d.question.id)).toEqual([12, 13, 14]);
    });

    it("saves ids, nests subquestions, and keeps the name and ID regions", () => {
        const name = { x1: 23.8, x2: 92, y1: 4.4, y2: 8.5, page_number: 1 };
        const props = { assignment: { id_regions: { name, sid: null } } } as unknown as GsOutlineProps;
        const outline = savedOutline(plan).filter((q) => q.id !== 8); // without 3 (c)
        const body = outlinePayload(matchOutline(plan, outline), props);
        expect(body.assignment).toEqual({ identification_regions: { name, sid: null } });
        expect(body.question_data.map((q) => [q.id, q.weight, q.children?.map((c) => c.id)])).toEqual([
            [1, 3, undefined],
            [2, 5, [3, 4]],
            [5, 5, [6, 7, undefined]],
        ]);
        expect(body.question_data[1].children![0]).toEqual({ title: "(a)", weight: 2, crop_rect_list: plan[1].children![0].rects, id: 3 });
    });

    it("sets the name and student ID regions the exam has, and keeps the others", () => {
        const name = { x1: 23.8, x2: 92, y1: 4.4, y2: 8.5, page_number: 1 };
        const props = { assignment: { id_regions: { name, sid: null } } } as unknown as GsOutlineProps;
        const sid = planOutline(FINAL, template(5)).idRegions.sid!;
        const ids = matchIdRegions({ sid }, props);
        expect(ids.map((i) => [i.key, i.status])).toEqual([["name", "kept"], ["sid", "new"]]);
        expect(outlinePayload(matchOutline(plan, []), props, ids).assignment).toEqual({ identification_regions: { name, sid } });
        expect(matchIdRegions({ name }, props)[0].status).toBe("same");
    });
});
