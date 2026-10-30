import { describe, expect, it } from "vitest";
import regionsScript from "../../src/outline/gradescope.typ?raw";
import { outlineAiInstructions, regionsCommand, shellQuote } from "../../src/outline/instructions";
import type { GsOutlineProps } from "../../src/outline/types";

const props = {
    assignment: { id: 7, title: "Midterm", course_id: 3, type: "PDFAssignment", id_regions: { name: { x1: 20, x2: 90, y1: 5, y2: 8, page_number: 1 }, sid: null } },
    has_submissions_and_students: false,
    template: { page_count: 9, pages: [], filename: "midterm.pdf" },
    outline: [
        { id: 1, type: "FreeResponseQuestion", title: "Sets", parent_id: null, weight: "3.0", crop_rect_list: [{ x1: 10, x2: 90, y1: 10, y2: 60, page_number: 2 }], index: 1 },
        { id: 2, type: "FreeResponseQuestion", title: "", parent_id: null, weight: "4.0", crop_rect_list: [], index: 2 },
        { id: 3, type: "FreeResponseQuestion", title: "(a)", parent_id: 2, weight: "4.0", crop_rect_list: [{ x1: 10, x2: 90, y1: 10, y2: 60, page_number: 3 }], index: 1 },
    ],
} as GsOutlineProps;

describe("outlineAiInstructions", () => {
    const md = outlineAiInstructions(props);
    it("describes this assignment: its template, outline, and name and ID regions", () => {
        expect(md).toContain("**Midterm**");
        expect(md).toContain("`midterm.pdf`, 9 pages");
        expect(md).toContain("| `1` | Sets | 3 | 2 |");
        expect(md).toContain("| `2.1` | (a) | 4 | 3 |");
        expect(md).toContain("name on page 1, student ID not set");
    });
    it("gives the command for the template's exam and embeds gradescope.typ whole", () => {
        expect(regionsCommand(props)).toBe("typst eval --in gradescope.typ --input exam=midterm.typ 'query(<gs-regions>).first().value' > midterm-regions.json");
        expect(md).toContain(regionsCommand(props));
        expect(md).toContain("```typst\n" + regionsScript.trimEnd() + "\n```");
    });
    it("quotes file names the shell would split", () => {
        const spaced = { ...props, template: { ...props.template!, filename: "Term Test 1.pdf" } };
        expect(regionsCommand(spaced)).toBe("typst eval --in gradescope.typ --input 'exam=Term Test 1.typ' 'query(<gs-regions>).first().value' > 'Term Test 1-regions.json'");
        expect(shellQuote("it's")).toBe("'it'\\''s'");
    });
    it("works before the outline has loaded", () => {
        expect(outlineAiInstructions(null)).toContain("--input exam=exam.typ");
    });
});
