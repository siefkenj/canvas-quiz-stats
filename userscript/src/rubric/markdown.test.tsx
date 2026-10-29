import { describe, expect, it } from "vitest";
import React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { GsMarkdown, latexToText } from "./markdown";

const html = (text: string) => renderToStaticMarkup(<GsMarkdown text={text} />);

describe("latexToText", () => {
    it.each([
        ["\\{x \\in \\mathbb{Z} : x > 0\\}", "{x ∈ ℤ : x > 0}"],
        ["A \\subseteq B \\Rightarrow B \\not\\subseteq A", "A ⊆ B ⇒ B \\not⊆ A"],
        ["\\frac{a}{b} + \\frac{2m}{3}", "a/b + (2m)/3"],
        ["x^{2} + y^3 - a_{n} + a_{i+1}", "x² + y³ - aₙ + aᵢ₊₁"],
        ["x^{ab}", "x^(ab)"],
        ["\\text{for some } k \\in \\mathbb{Z}", "for some k ∈ ℤ"],
        ["\\left\\{ 1, -1 \\right\\}", "{ 1, -1 }"],
        ["\\mathbb{R} \\setminus \\{0\\}", "ℝ ∖ {0}"],
        ["k'", "k′"],
        ["\\sqrt{2} \\le \\pi", "√(2) ≤ π"],
    ])("%s → %s", (tex, text) => {
        expect(latexToText(tex)).toBe(text);
    });
});

describe("GsMarkdown", () => {
    it("renders bold, italics, code and inline math", () => {
        const out = html("**Claim**: *you* show `x` with $$x \\in \\mathbb{Z}$$.");
        expect(out).toContain("<strong>Claim</strong>");
        expect(out).toContain("<em>you</em>");
        expect(out).toContain("<code>x</code>");
        expect(out).toContain('<span class="math" title="LaTeX: x \\in \\mathbb{Z}">x ∈ ℤ</span>');
    });

    it("renders paragraphs, line breaks and lists", () => {
        const out = html("First line\nsecond line\n\n* one $$a$$\n* two\n\nAfter");
        expect(out).toContain("<p>First line<br/>second line</p>");
        expect(out).toContain('<ul><li>one <span class="math"');
        expect(out).toContain("<li>two</li></ul>");
        expect(out).toContain("<p>After</p>");
    });

    it("renders display math and keeps math out of emphasis parsing", () => {
        const out = html("$$$a * b * c$$$ and **bold $$x_1$$ here**");
        expect(out).toContain('<span class="math display"');
        expect(out).toContain("a * b * c");
        expect(out).toMatch(/<strong>bold <span class="math"[^>]*>x₁<\/span> here<\/strong>/);
    });

    it("never produces raw HTML from the text", () => {
        expect(html('<img src=x onerror="alert(1)">')).toContain("&lt;img");
    });

    it("unescapes \\$", () => {
        expect(html("costs \\$5")).toContain("costs $5");
    });
});
