import { describe, expect, it } from "vitest";
import { existingTree, flatten, idRegionKey, matchIdRegions, matchOutline, outlinePayload, parseRegions, planOutline, type PlannedQuestion } from "../../src/outline/outline";
import type { GsOutlineProps, GsOutlineQuestion, RegionsFile } from "../../src/outline/types";
// Regions in gradescope.typ's format (examy 1.0.0): examy's final-exam example, and the MAT246
// midterm (with its rubrics).
import finalExam from "./fixtures/examy-final-exam.json";
import midterm from "./fixtures/midterm.json";
// The MAT246 midterm reflection, in gradescope.typ's format: no points, and parts with answer boxes
// beside multiple choice ones.
import reflection from "./fixtures/midterm-reflection.json";
// The same exams' regions as examy 1.1.0 writes them (examy-regions.json); the reflection's
// question 3 has its parts in columns.
import finalExam11 from "./fixtures/examy-final-exam.examy-regions.json";
import midterm11 from "./fixtures/midterm.examy-regions.json";
import reflection11 from "./fixtures/midterm-reflection.examy-regions.json";

/** A regions file, read as the dialog reads it. */
const read = (data: unknown): RegionsFile => {
    const { file, errors } = parseRegions(JSON.stringify(data));
    expect(errors).toEqual([]);
    return file!;
};
const FINAL = read(finalExam);
const MIDTERM = read(midterm);
const FINAL11 = read(finalExam11);
const MIDTERM11 = read(midterm11);

const template = (count: number): GsOutlineProps["template"] => ({
    page_count: count,
    pages: Array.from({ length: count }, (_, k) => ({ number: k + 1, width: 2550, height: 3300, url: "" })),
});

const shape = (qs: PlannedQuestion[]): unknown[] =>
    qs.map((q) => (q.children ? [q.number, q.title, q.weight, shape(q.children)] : [q.number, q.title, q.weight]));

describe("parseRegions", () => {
    it("reads examy's regions: numbers from addresses, and points with the parts' own", () => {
        expect(FINAL11.source).toBe("examy-regions");
        expect(FINAL11.exams).toHaveLength(1);
        const rows = FINAL11.exams[0].map((d) => [d.number, d.level, d.points]);
        // examy gives 2 no points of its own: its parts' 2 and 3 make 5, as gradescope.typ's file has it.
        expect(rows).toEqual(FINAL.exams[0].map((d) => [d.number, d.level, d.points]));
        expect(MIDTERM11.exam).toBe("MAT246H1F Midterm LEC0101");
    });
    it("reads gradescope.typ's older regions", () => {
        expect(FINAL.source).toBe("examy-gradescope-regions");
        expect(FINAL.exams[0][0].end).toBe(null);
    });
    it("reports a damaged file instead of failing on it", () => {
        const errors = (data: unknown) => parseRegions(JSON.stringify(data)).errors.map((e) => e.message);
        // A question cut short, as by pasting part of the file.
        const cut = { ...finalExam11, "question-regions": [{ "display-name": "1", level: 1 }] };
        expect(errors(cut)).toEqual(['Not a valid regions file: "question-regions" 1 has no "address".']);
        const noBoxes = { ...finalExam11, "question-regions": finalExam11["question-regions"].map(({ "answer-boxes": _, ...q }) => q) };
        expect(errors(noBoxes)).toEqual(['Not a valid regions file: "question-regions" 1 has "answer-boxes" that are not boxes.']);
        expect(errors({ ...finalExam11, pages: [{ page: 1 }] })[0]).toMatch(/"pages" 1 is not a page/);
        const noMargins = { ...finalExam11, pages: finalExam11.pages.map((p) => ({ ...p, margin: {} })) };
        expect(errors(noMargins)[0]).toMatch(/"pages" 1 is not a page/);
        const numberLabel = { ...finalExam11, "name-block-regions": finalExam11["name-block-regions"].map((n) => ({ ...n, "display-name": 7 })) };
        expect(errors(numberLabel)).toEqual(['Not a valid regions file: "name-block-regions" 1 has a "display-name" that is not text.']);
        expect(errors({ ...finalExam, names: [{ ...finalExam.names[0], label: 7 }] })).toEqual(['Not a valid regions file: "names" 1 has a "label" that is not text.']);
        // gradescope.typ's, with a division missing its boxes.
        const legacy = { ...finalExam, exams: [[{ ...finalExam.exams[0][0], boxes: undefined }]] };
        expect(errors(legacy)).toEqual(['Not a valid regions file: "exams[0]" 1 has "boxes" that are not boxes.']);
    });
    it("explains other files", () => {
        expect(parseRegions("{").errors[0].message).toMatch(/^Not JSON/);
        expect(parseRegions('{"format": "gradescope-rubric"}').errors[0].message).toMatch(/Not a regions file/);
    });
});

describe("planOutline", () => {
    it("makes each part and subpart a subquestion, side by side in its question's group", () => {
        const plan = planOutline(FINAL, template(5));
        expect(plan.errors).toEqual([]);
        // 3 (a) has points of its own (2), and two subparts with none: all three are subquestions.
        expect(shape(plan.questions)).toEqual([
            ["1", "", 3],
            ["2", "", 5, [["2.1", "(a)", 2], ["2.2", "(b)", 3]]],
            ["3", "", 5, [["3.1", "(a)", 2], ["3.2", "(a) i", 0], ["3.3", "(a) ii", 0], ["3.4", "(b)", 3], ["3.5", "(c)", 0]]],
        ]);
        expect(plan.questions[2].children!.map((c) => c.covers)).toEqual([["3.1"], ["3.1.1"], ["3.1.2"], ["3.2"], ["3.3"]]);
        expect(plan.warnings.map((w) => w.message)).toEqual([
            "Question 3.1 (examy 3 (a)) has no answer boxes examy marks; its region is its text.",
            "Question 3.2 (examy 3 (a) i) has no points, so it is worth 0 on Gradescope.",
            "Question 3.3 (examy 3 (a) ii) has no points, so it is worth 0 on Gradescope.",
            "Question 3.5 (examy 3 (c)) has only bonus points, so it is worth 0 on Gradescope.",
        ]);
    });

    it("makes a question with parts a group even when its points are its own, the question first", () => {
        const at = (y: number) => ({ page: 1, x: 70, y });
        const div = (number: string, label: string, points: number, boxes: [number, number][]) => ({
            number,
            label,
            level: number.split(".").length,
            points,
            bonus: null,
            start: at(boxes[0][0] - 10),
            end: null,
            boxes: boxes.map(([t, b]) => ({ top: at(t), bottom: { page: 1, x: 500, y: b } })),
        });
        // 1 has a box and 1 point of its own; its part 1.1 has 2.
        const file: RegionsFile = { ...FINAL, exams: [[div("1", "1", 3, [[100, 200]]), div("1.1", "1 (a)", 2, [[300, 400], [450, 500]])]] };
        const [q] = planOutline(file, template(5)).questions;
        expect(shape([q])).toEqual([["1", "", 3, [["1.1", "", 1], ["1.2", "(a)", 2]]]]);
        // A part whose subpart has the bonus has none itself.
        const bonusFile: RegionsFile = {
            ...FINAL,
            exams: [[{ ...div("1", "1", 0, [[100, 150]]), bonus: 1 }, { ...div("1.1", "1 (a)", 0, [[300, 400]]), bonus: 1 }]],
        };
        expect(planOutline(bonusFile, template(5)).warnings.map((w) => w.message)).toEqual([
            "Question 1.1 (examy 1) has no points, so it is worth 0 on Gradescope.",
            "Question 1.2 (examy 1 (a)) has only bonus points, so it is worth 0 on Gradescope.",
        ]);
        // A part with two boxes: one rectangle around both.
        expect(q.children![1].rects).toHaveLength(1);
        expect(q.children![1].rects[0].y1).toBeLessThan(q.children![1].rects[0].y2 - 20);
    });

    it("puts a region around the answer boxes, 2pt past their borders", () => {
        const plan = planOutline(FINAL, template(5));
        // Q1's box: 70.5pt to 558pt across and 101.33pt to 738pt down page 2 (612 by 792pt).
        expect(plan.questions[0].rects).toEqual([{ x1: 11.2, x2: 91.5, y1: 12.5, y2: 93.4, page_number: 2 }]);
        // 3 (a) i's box, by itself (3 (a) ii's is its own).
        expect(plan.questions[2].children![1].rects).toEqual([{ x1: 16.6, x2: 91.5, y1: 15.9, y2: 53.2, page_number: 4 }]);
        expect(plan.questions[2].children![2].rects).toEqual([{ x1: 16.6, x2: 91.5, y1: 56.1, y2: 93.4, page_number: 4 }]);
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

    it("plans the same outline from examy's regions as from gradescope.typ's", () => {
        for (const [old, now, pages] of [
            [FINAL, FINAL11, 5],
            [MIDTERM, MIDTERM11, 9],
        ] as const) {
            const a = planOutline(old, template(pages));
            const b = planOutline(now, template(pages));
            expect(shape(b.questions)).toEqual(shape(a.questions));
            // Regions around answer boxes agree to within a few tenths of a percent (examy measures
            // to the outside of a box's border, gradescope.typ inside it).
            for (const [p, q] of flatten(a.questions).map((p, k) => [p, flatten(b.questions)[k]] as const)) {
                // Text regions differ: examy says where a part ends; gradescope.typ's do not.
                if (p.fallback || p.children?.some((c) => c.fallback)) {
                    continue;
                }
                expect(q.rects.map((r) => r.page_number)).toEqual(p.rects.map((r) => r.page_number));
                q.rects.forEach((r, k) => {
                    for (const key of ["x1", "x2", "y1", "y2"] as const) {
                        expect(Math.abs(r[key] - p.rects[k][key])).toBeLessThanOrEqual(0.3);
                    }
                });
            }
            expect(Object.keys(b.idRegions)).toEqual(Object.keys(a.idRegions));
        }
    });

    it("bounds a part without answer boxes by where examy says it ends", () => {
        const plan = planOutline(MIDTERM11, template(9));
        const [a, b] = plan.questions[1].children!;
        // 2 (a) runs from its label (95.2pt down page 3) to the end of its text (213pt), the width
        // of its text: not to 2 (b)'s start.
        expect(a.fallback).toBe(true);
        expect(a.rects).toEqual([{ x1: 11.5, x2: 91.2, y1: 12, y2: 26.9, page_number: 3 }]);
        expect(b.rects[0].y1).toBeGreaterThan(a.rects[0].y2);
    });

    it("gives a part in a column, without answer boxes, its column's text, beside the other column's part", () => {
        // The reflection's question 3: (a) a table to fill in, in the left column; (b) an answer
        // box, in the right one.
        const plan = planOutline(read(reflection11), template(6));
        expect(plan.errors).toEqual([]);
        const [a, b] = plan.questions[2].children!;
        expect([a.fallback, b.fallback]).toEqual([true, false]);
        // (a): from its label over the table, in the left column; (b): its box, in the right one.
        expect(a.rects).toEqual([{ x1: 11.3, x2: 49.2, y1: 41, y2: 83.9, page_number: 3 }]);
        expect(b.rects).toEqual([{ x1: 55.3, x2: 91.6, y1: 46.3, y2: 93.5, page_number: 3 }]);
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

    it("makes a group of a question with parts even without points, each part with a region of its own", () => {
        const plan = planOutline(read(reflection), template(6));
        expect(plan.errors).toEqual([]);
        expect(plan.questions.map((q) => [q.number, q.weight, q.children?.length ?? 0])).toEqual([
            ["1", 0, 3],
            ["2", 0, 5],
            // 3's halves are labelled by hand, not examy parts: one question.
            ["3", 0, 0],
            ["4", 0, 2],
            ["5", 0, 3],
        ]);
        const [a, b, c] = plan.questions[0].children!;
        // 1 (a) and 1 (b) are multiple choice: their text, to the next part's start. 1 (c): its box.
        expect([a.fallback, b.fallback, c.fallback]).toEqual([true, true, false]);
        expect(a.rects).toEqual([{ x1: 8.8, x2: 91.2, y1: 25.6, y2: 47, page_number: 1 }]);
        expect(c.rects).toEqual([{ x1: 13.9, x2: 91.5, y1: 55.1, y2: 86.9, page_number: 1 }]);
        // The group's region is around its subquestions'.
        expect(plan.questions[0].rects).toEqual([{ x1: 8.8, x2: 91.5, y1: 25.6, y2: 86.9, page_number: 1 }]);
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
            end: null,
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
            ["3", ["3.1", "3.2", "3.3", "3.4", "3.5"]],
        ]);
    });

    it("finds nothing to change in the outline it saved, and keeps question titles", () => {
        const m = matchOutline(plan, savedOutline(plan, { "1": "Sets" }));
        expect(flatten(m.questions).map((q) => q.status)).toEqual(Array(10).fill("same"));
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
        const outline = savedOutline(plan).filter((q) => q.id !== 10); // without 3 (c)
        const body = outlinePayload(matchOutline(plan, outline), props);
        expect(body.assignment).toEqual({ identification_regions: { name, sid: null } });
        expect(body.question_data.map((q) => [q.id, q.weight, q.children?.map((c) => c.id)])).toEqual([
            [1, 3, undefined],
            [2, 5, [3, 4]],
            [5, 5, [6, 7, 8, 9, undefined]],
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
