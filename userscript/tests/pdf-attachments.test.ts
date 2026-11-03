import { describe, expect, it } from "vitest";
import { findAttachment, isPdf, pdfAttachments, pdfString, readFileOrAttachment } from "../src/pdf-attachments";
import { REGIONS_ATTACHMENT } from "../src/outline/outline";
import { RUBRICS_ATTACHMENT } from "../src/rubric/from-examy";
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

describe("findAttachment", () => {
    const regionsText = JSON.stringify(regions);
    const rubricFile = JSON.stringify({ format: "gradescope-rubric", version: 1, questions: [] });
    const names = (m: Map<string, string>, pdf?: string) => {
        const found = findAttachment(m, REGIONS_ATTACHMENT, pdf);
        return found && [found.name, ...found.others];
    };

    it("takes any *regions.json, and none other", () => {
        expect(names(new Map([["notes.json", regionsText], ["Midterm-Regions.JSON", regionsText]]))).toEqual(["Midterm-Regions.JSON"]);
        expect(findAttachment(new Map([["notes.json", regionsText]]), REGIONS_ATTACHMENT)).toBe(null);
    });
    it("prefers one that is a regions file, then gradescope.typ's name, then one named after the PDF, then the first", () => {
        const m = new Map([
            ["a-regions.json", regionsText],
            ["old-regions.json", "{}"],
            ["midterm-regions.json", regionsText],
            ["gradescope-regions.json", regionsText],
        ]);
        expect(names(m, "midterm.pdf")).toEqual(["gradescope-regions.json", "midterm-regions.json", "a-regions.json", "old-regions.json"]);
        m.delete("gradescope-regions.json");
        expect(names(m, "Midterm.pdf")).toEqual(["midterm-regions.json", "a-regions.json", "old-regions.json"]);
        expect(names(m)).toEqual(["a-regions.json", "midterm-regions.json", "old-regions.json"]);
    });
    it("takes a rubric JSON file as well as examy's rubrics", () => {
        const m = new Map([["notes-rubric.json", "[]"], ["midterm-rubric.json", rubricFile], ["examy-rubric.json", JSON.stringify(rubrics)]]);
        const found = findAttachment(m, RUBRICS_ATTACHMENT, "midterm.pdf")!;
        expect([found.name, ...found.others]).toEqual(["examy-rubric.json", "midterm-rubric.json", "notes-rubric.json"]);
    });
});

describe("readFileOrAttachment", () => {
    const file = (data: BlobPart, name: string) => Object.assign(new Blob([data]), { name });
    it("reads a text file as it is, whatever its name", async () => {
        const read = await readFileOrAttachment(file('{"a": 1}', "anything.json"), REGIONS_ATTACHMENT);
        expect(read).toEqual({ text: '{"a": 1}', attachments: null, attached: null });
    });
    it("reads a PDF's attachment of the kind, and says what else fits", async () => {
        const read = await readFileOrAttachment(file(bytesOf(pdfBase64), "exam.pdf"), RUBRICS_ATTACHMENT);
        expect(read.attached).toMatchObject({ name: "examy-rubric.json", others: [] });
        expect(JSON.parse(read.text)).toEqual(rubrics);
    });
    it("says which kind of file a PDF lacks", async () => {
        const noAttachments = new TextEncoder().encode("%PDF-1.7\n%%EOF\n");
        await expect(readFileOrAttachment(file(noAttachments, "plain.pdf"), REGIONS_ATTACHMENT)).rejects.toThrow(/plain\.pdf has no regions attached \(a file named like gradescope-regions\.json\)/);
    });
});
