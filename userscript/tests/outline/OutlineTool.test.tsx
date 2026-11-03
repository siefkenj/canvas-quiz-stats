import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { matchOutline, planOutline } from "../../src/outline/outline";
import { PagePreview, QuestionTable } from "../../src/outline/OutlineTool";
import type { GsOutlineQuestion, RegionsFile } from "../../src/outline/types";
import finalExam from "./fixtures/examy-final-exam.json";

const template = { page_count: 5, pages: [1, 2, 3, 4, 5].map((number) => ({ number, width: 2550, height: 3300, url: `page${number}.jpg` })) };
const plan = planOutline(finalExam as RegionsFile, template);
const outline: GsOutlineQuestion[] = [
    { id: 11, type: "FreeResponseQuestion", title: "Sets", parent_id: null, weight: "1.0", crop_rect_list: [{ x1: 10, x2: 90, y1: 20, y2: 30, page_number: 2 }], index: 1 },
    { id: 12, type: "FreeResponseQuestion", title: "", parent_id: null, weight: "1.0", crop_rect_list: [], index: 2 },
];
const match = matchOutline(plan.questions, outline);

describe("QuestionTable", () => {
    const html = renderToStaticMarkup(<QuestionTable match={match} hovered={null} setHovered={() => {}} graded={[12]} />);
    it("lists the questions with their subquestions, points, pages, and changes", () => {
        expect(html).toContain("Sets");
        expect(html).toContain("weight 1 → 3");
        expect(html).toContain(">(a)<"); // 3 (a), with its subparts folded in
        expect(html).toContain("p. 4");
    });
    it("marks the questions saving deletes, and those with grading", () => {
        expect(html).toContain("Deleted");
        expect(html).toContain("has grading");
    });
});

describe("PagePreview", () => {
    it("draws the new regions over the page, numbered, and Gradescope's as they are", () => {
        const html = renderToStaticMarkup(<PagePreview url="page2.jpg" number={2} match={match} existing={outline} hovered="1" />);
        expect(html).toContain('src="page2.jpg"');
        expect(html).toContain('class="rect old"');
        expect(html).toMatch(/class="rect new hovered[^"]*" style="left:11.2%;top:12.5%;width:80.3%;height:80.9/);
        expect(html).toContain('<span class="rect-label">1</span>');
    });

    // A group (21) with subquestions (22, 23), and a group (31) whose region is its own.
    const rect = (y1: number) => ({ x1: 10, x2: 90, y1, y2: y1 + 10, page_number: 2 });
    const grouped: GsOutlineQuestion[] = [
        { id: 21, type: "QuestionGroup", title: "", parent_id: null, weight: "2.0", crop_rect_list: [rect(10)], index: 1 },
        { id: 22, type: "FreeResponseQuestion", title: "", parent_id: 21, weight: "1.0", crop_rect_list: [rect(20)], index: 1 },
        { id: 23, type: "FreeResponseQuestion", title: "", parent_id: 21, weight: "1.0", crop_rect_list: [rect(40)], index: 2 },
        { id: 31, type: "QuestionGroup", title: "", parent_id: null, weight: "1.0", crop_rect_list: [rect(60)], index: 2 },
        { id: 32, type: "FreeResponseQuestion", title: "", parent_id: 31, weight: "1.0", crop_rect_list: [], index: 1 },
    ];
    const oldRects = (html: string) => [...html.matchAll(/class="rect old" style="[^"]*top:([\d.]+)%[^"]*"><span class="rect-label">([^<]*)</g)].map((m) => [Number(m[1]), m[2]]);

    it("draws Gradescope's subquestions, numbered, and a group's own region when its subquestions have none", () => {
        const html = renderToStaticMarkup(<PagePreview url="page2.jpg" number={2} match={null} existing={grouped} hovered={null} />);
        expect(oldRects(html)).toEqual([
            [20, "1.1"],
            [40, "1.2"],
            [60, "2"],
        ]);
    });

    it("draws Gradescope's regions over the new ones, so that they show where they are the same", () => {
        const html = renderToStaticMarkup(<PagePreview url="page2.jpg" number={2} match={match} existing={grouped} hovered={null} />);
        expect(html.indexOf('class="rect old"')).toBeGreaterThan(html.lastIndexOf('class="rect new'));
    });

    it("finds subquestions whose parent id Gradescope gives as text", () => {
        const texty = grouped.map((q) => ({ ...q, parent_id: q.parent_id == null ? null : (String(q.parent_id) as unknown as number) }));
        const html = renderToStaticMarkup(<PagePreview url="page2.jpg" number={2} match={null} existing={texty} hovered={null} />);
        expect(oldRects(html).map(([, n]) => n)).toEqual(["1.1", "1.2", "2"]);
    });
});
