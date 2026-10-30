import { describe, expect, it } from "vitest";
import { isPdf, pdfAttachments, pdfString } from "../src/pdf-attachments";
// The PDF, base64 encoded (`base64 -w 0 examy-rubric-test.pdf`), so that it imports as text.
import pdfBase64 from "./fixtures/examy-rubric-test.pdf.base64?raw";
// The same PDF saved again by qpdf (pikepdf), with its objects packed into an object stream.
import resavedBase64 from "./fixtures/examy-rubric-test-resaved.pdf.base64?raw";
import regions from "./fixtures/examy-rubric-test.regions.json";
import rubrics from "./fixtures/examy-rubric-test.rubric.json";

const bytesOf = (base64: string) => Uint8Array.from(atob(base64.trim()), (c) => c.charCodeAt(0));

describe("pdfAttachments", () => {
    it("reads the files gradescope.typ attaches to an exam's PDF", async () => {
        const pdf = bytesOf(pdfBase64);
        expect(isPdf(pdf)).toBe(true);
        const files = await pdfAttachments(pdf);
        expect([...files.keys()].sort()).toEqual(["examy-rubric.json", "gradescope-regions.json"]);
        expect(JSON.parse(files.get("gradescope-regions.json")!)).toEqual(regions);
        expect(JSON.parse(files.get("examy-rubric.json")!)).toEqual(rubrics);
    });
    it("reads them from a PDF saved again with object streams", async () => {
        const pdf = bytesOf(resavedBase64);
        expect(new TextDecoder("latin1").decode(pdf)).toContain("/ObjStm");
        const files = await pdfAttachments(pdf);
        expect([...files.keys()].sort()).toEqual(["examy-rubric.json", "gradescope-regions.json"]);
        expect(JSON.parse(files.get("gradescope-regions.json")!)).toEqual(regions);
        expect(JSON.parse(files.get("examy-rubric.json")!)).toEqual(rubrics);
    });
    it("finds none in other files", async () => {
        const json = new TextEncoder().encode('{"format": "x"}');
        expect(isPdf(json)).toBe(false);
        expect((await pdfAttachments(json)).size).toBe(0);
    });
    it("takes a PDF header after a few bytes of something else", () => {
        expect(isPdf(new TextEncoder().encode("\n\n%PDF-1.7\n"))).toBe(true);
    });
});

describe("pdfString", () => {
    it("reads literal strings, with escapes and balanced parentheses", () => {
        expect(pdfString("/UF (a\\(b\\) \\\\ \\101 (c))", 4)).toBe("a(b) \\ A (c)");
    });
    it("reads hex strings, and UTF-16 text", () => {
        expect(pdfString("<61 62>", 0)).toBe("ab");
        expect(pdfString("<FEFF00E9007A>", 0)).toBe("éz");
        expect(pdfString("(\\376\\377\\000x)", 0)).toBe("x");
    });
    it("finds no string elsewhere", () => {
        expect(pdfString("<< /a 1 >>", 0)).toBe(null);
        expect(pdfString("/a", 0)).toBe(null);
    });
});
