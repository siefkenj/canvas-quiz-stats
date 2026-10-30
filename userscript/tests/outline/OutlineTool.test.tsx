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
});
