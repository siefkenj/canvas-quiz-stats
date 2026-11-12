/**
 * Turn a regions file (examy's `examy-regions.json`, or the older one of `gradescope.typ`) into a
 * Gradescope outline: which questions
 * and subquestions, their weights, and their regions; match it to the outline Gradescope has, so
 * that questions keep their ids (and so their rubrics and grading); and build the request that
 * saves it.
 *
 * Gradescope has questions and subquestions only, so examy's subparts are folded in: a part with
 * points becomes a subquestion that covers its subparts too, and a part whose points are all in
 * its subparts gives way to them, each a subquestion titled with its examy label ("(a) i").
 */
import {
    EXAMY_REGIONS_FORMAT,
    LEGACY_REGIONS_FORMAT,
    LEGACY_REGIONS_FORMAT_VERSION,
    type CropRect,
    type ExamyRegions,
    type GsOutlineProps,
    type GsOutlineQuestion,
    type LegacyRegionsFile,
    type OutlinePayload,
    type Position,
    type QuestionData,
    type RegionsBox,
    type RegionsDivision,
    type RegionsFile,
    type RegionsNameLine,
    type RegionsPage,
} from "./types";
import type { AttachmentKind } from "../pdf-attachments";

/** Room left around an answer box, past its border. */
const BOX_PAD = 2;
/** How far above its first baseline a division's first line starts (for gradescope.typ's files). */
const LINE = 14;

export interface Problem {
    message: string;
    /** The Gradescope question it is about ("2.1"), if any. */
    number?: string;
}

export interface ParsedRegions {
    file: RegionsFile | null;
    errors: Problem[];
}

/**
 * Read a regions file: examy's (`examy-regions.json`, examy 1.1.0 and later), or the older one of
 * `gradescope.typ`. Only checks its shape; `planOutline` checks its contents.
 */
export function parseRegions(text: string): ParsedRegions {
    let data: unknown;
    try {
        data = JSON.parse(text);
    } catch (e) {
        return { file: null, errors: [{ message: `Not JSON: ${e instanceof Error ? e.message : String(e)}` }] };
    }
    const format = data && typeof data === "object" ? (data as { format?: unknown }).format : undefined;
    if (format === EXAMY_REGIONS_FORMAT || format === LEGACY_REGIONS_FORMAT) {
        const problem = format === EXAMY_REGIONS_FORMAT ? examyRegionsProblem(data) : legacyRegionsProblem(data);
        if (problem) {
            return { file: null, errors: [{ message: `Not a valid regions file: ${problem}.` }] };
        }
        try {
            return format === EXAMY_REGIONS_FORMAT ? fromExamyRegions(data as Partial<ExamyRegions>) : fromLegacyRegions(data as Partial<LegacyRegionsFile>);
        } catch (e) {
            return { file: null, errors: [{ message: `Not a valid regions file: ${e instanceof Error ? e.message : String(e)}.` }] };
        }
    }
    return {
        file: null,
        errors: [
            {
                message: `Not a regions file: "format" should be "${EXAMY_REGIONS_FORMAT}". Make it with examy 1.1.0 or later (see "Regions from examy").`,
            },
        ],
    };
}

const NO_QUESTIONS: ParsedRegions = { file: null, errors: [{ message: "The regions file has no questions." }] };

// The shapes the readers below rely on, checked so that a damaged file (pasted in part, say) is
// reported rather than breaking the dialog.
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);
const isPosition = (v: unknown) => isObject(v) && [v.page, v.x, v.y].every(Number.isFinite);
const isNumberOr = (v: unknown, other: null | undefined) => v === other || Number.isFinite(v);
const isPage = (v: unknown) =>
    isObject(v) && [v.page, v.width, v.height].every(Number.isFinite) && isObject(v.margin) && [v.margin.top, v.margin.bottom, v.margin.left, v.margin.right].every(Number.isFinite);
const isTextOrNull = (v: unknown) => v === null || typeof v === "string";
const isBox = (v: unknown) => isObject(v) && isPosition(v.top) && isPosition(v.bottom);

/** What is wrong with each entry of `list` (an array, if `optional`, may be left out). */
function listProblem(list: unknown, name: string, check: (item: Record<string, unknown>) => string | null, optional = true): string | null {
    if (list === undefined && optional) {
        return null;
    }
    if (!Array.isArray(list)) {
        return `"${name}" is not a list`;
    }
    for (const [k, item] of list.entries()) {
        const problem = isObject(item) ? check(item) : "is not an object";
        if (problem) {
            return `"${name}" ${k + 1} ${problem}`;
        }
    }
    return null;
}

/** What is wrong with examy's regions file `f`, if anything. */
function examyRegionsProblem(f: unknown): string | null {
    const file = f as Record<string, unknown>;
    return (
        listProblem(file.pages, "pages", (p) => (isPage(p) ? null : "is not a page (page, width, height, and margin's top, bottom, left, right)")) ??
        listProblem(file["name-block-regions"], "name-block-regions", (n) =>
            !isPosition(n.start) || !isPosition(n.end) ? "has no start or end" : !isTextOrNull(n["display-name"]) ? 'has a "display-name" that is not text' : null
        ) ??
        listProblem(
            file["question-regions"],
            "question-regions",
            (q) =>
                !Array.isArray(q.address) || q.address.length === 0 || !q.address.every(Number.isInteger)
                    ? 'has no "address"'
                    : typeof q["display-name"] !== "string"
                      ? 'has no "display-name"'
                      : !Number.isInteger(q.level)
                        ? 'has no "level"'
                        : !isNumberOr(q.points, null) || !isNumberOr(q["bonus-points"], null)
                          ? "has points that are not numbers"
                          : !(q.start === null || isPosition(q.start)) || !(q.end === null || isPosition(q.end))
                            ? "has a start or end that is not a position"
                            : !Array.isArray(q["answer-boxes"]) || !q["answer-boxes"].every(isBox)
                              ? 'has "answer-boxes" that are not boxes'
                              : null,
            false
        )
    );
}

/** What is wrong with gradescope.typ's regions file `f`, if anything. */
function legacyRegionsProblem(f: unknown): string | null {
    const file = f as Record<string, unknown>;
    const exams = Array.isArray(file.exams) ? file.exams : [];
    return (
        listProblem(file.pages, "pages", (p) => (isPage(p) ? null : "is not a page (page, width, height, and margin's top, bottom, left, right)")) ??
        listProblem(file.names, "names", (n) =>
            !isPosition(n.start) || !isPosition(n.end) ? "has no start or end" : !isTextOrNull(n.label ?? null) ? 'has a "label" that is not text' : null
        ) ??
        listProblem(file.ends, "ends", (e) => (isPosition(e) ? null : "is not a position")) ??
        exams
            .map((rows, k) =>
                listProblem(rows, `exams[${k}]`, (d) =>
                    typeof d.number !== "string" || typeof d.label !== "string" || !Number.isInteger(d.level)
                        ? 'has no "number", "label", or "level"'
                        : !Number.isFinite(d.points) || !isNumberOr(d.bonus, null)
                          ? "has points that are not numbers"
                          : !(d.start === null || isPosition(d.start))
                            ? "has a start that is not a position"
                            : !Array.isArray(d.boxes) || !d.boxes.every(isBox)
                              ? 'has "boxes" that are not boxes'
                              : null
                )
            )
            .find((p) => p) ??
        null
    );
}

/** examy's regions (one exam): totals of points from its divisions' own, and its numbers from their addresses. */
function fromExamyRegions(f: Partial<ExamyRegions>): ParsedRegions {
    const qs = f["question-regions"];
    if (!Array.isArray(qs) || qs.length === 0) {
        return NO_QUESTIONS;
    }
    const number = (q: { address: number[] }) => q.address.map((a) => a + 1).join(".");
    const inside = (q: { address: number[] }, d: { address: number[] }) => q.address.length >= d.address.length && d.address.every((a, k) => q.address[k] === a);
    const divisions = qs.map((d): RegionsDivision => {
        const all = qs.filter((q) => inside(q, d));
        const bonuses = all.map((q) => q["bonus-points"]).filter((b): b is number => b != null);
        return {
            number: number(d),
            label: d["display-name"],
            level: d.level,
            points: sum(all.map((q) => q.points ?? 0)),
            bonus: bonuses.length ? sum(bonuses) : null,
            start: d.start,
            end: d.end,
            boxes: (d["answer-boxes"] ?? []).map((b) => ({ top: b.top, bottom: b.bottom })),
        };
    });
    return {
        file: {
            source: EXAMY_REGIONS_FORMAT,
            exam: f["exam-name"]?.trim() || null,
            pages: f.pages ?? [],
            ends: [null],
            names: (f["name-block-regions"] ?? []).map((n) => ({ label: n["display-name"], start: n.start, end: n.end })),
            exams: [divisions],
        },
        errors: [],
    };
}

/** gradescope.typ's regions: starts moved up from the first baseline, and boxes out by their inset. */
function fromLegacyRegions(f: Partial<LegacyRegionsFile>): ParsedRegions {
    if (f.version !== LEGACY_REGIONS_FORMAT_VERSION) {
        return { file: null, errors: [{ message: `gradescope.typ's regions file version ${f.version} is not supported. Make the regions with examy 1.1.0 or later instead.` }] };
    }
    if (!Array.isArray(f.exams) || f.exams.length === 0 || !Array.isArray(f.exams[0]) || f.exams[0].length === 0) {
        return NO_QUESTIONS;
    }
    const exams = f.exams.map((rows) =>
        rows.map((r): RegionsDivision => ({
            ...r,
            start: r.start ? { ...r.start, y: r.start.y - LINE } : null,
            end: null,
            boxes: r.boxes.map((b) => {
                const i = b.inset ?? { top: 0, bottom: 0, left: 0, right: 0 };
                // A bottom right no further right than the top left: the box takes the rest of the line.
                const rest = b.bottom.x <= b.top.x;
                return {
                    top: { ...b.top, x: b.top.x - i.left, y: b.top.y - i.top },
                    bottom: { ...b.bottom, x: rest ? b.top.x - i.left : b.bottom.x + i.right, y: b.bottom.y + i.bottom },
                };
            }),
        }))
    );
    return {
        file: { source: LEGACY_REGIONS_FORMAT, exam: f.exam ?? null, pages: f.pages ?? [], ends: f.ends ?? [], names: f.names ?? [], exams },
        errors: [],
    };
}

/**
 * The regions as attached to an exam's PDF: by examy (`embed-metadata`), by gradescope.typ
 * (older), or as any `*regions.json` (`*regions-2.json` for a document's second exam).
 */
export const REGIONS_ATTACHMENT: AttachmentKind = {
    what: "regions",
    names: ["examy-regions.json", "gradescope-regions.json"],
    embed: "question-regions",
    pattern: /regions(-\d+)?\.json$/i,
    is: (text) => parseRegions(text).file !== null,
};

// --------------------------------------------------------------------------------- planning

/** A Gradescope question (or subquestion, or group) to be saved. */
export interface PlannedQuestion {
    /** Its Gradescope number, by position: "2", "2.1". */
    number: string;
    /** The examy divisions it covers ("3.1", "3.1.1", ...), the first its own. */
    covers: string[];
    /** Its examy label, e.g. "3 (a) i". */
    label: string;
    title: string;
    weight: number;
    rects: CropRect[];
    /** Its region is the text from its start to the next division's, as it has no answer boxes. */
    fallback: boolean;
    /** Its parts that have no answer boxes when others do: their text is in its region too. */
    textParts?: string[];
    children?: PlannedQuestion[];
}

export interface OutlinePlan {
    questions: PlannedQuestion[];
    /** The name and student ID regions, where the exam's name block has lines for them. */
    idRegions: Partial<Record<"name" | "sid", CropRect>>;
    errors: Problem[];
    warnings: Problem[];
}

const round1 = (v: number) => Math.round(v * 10) / 10;
const clamp = (v: number) => Math.min(100, Math.max(0, v));
const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
const near = (a: number, b: number) => Math.abs(a - b) < 1e-9;

/** A stretch of a page, in pt. */
interface Span {
    page: number;
    top: number;
    bottom: number;
    left: number;
    right: number;
}

/** The page sizes to use: the file's, else (if an exam set its own page `foreground`) Gradescope's. */
function pageSizes(file: RegionsFile, template: GsOutlineProps["template"], warnings: Problem[]) {
    const pages = new Map<number, RegionsPage>(file.pages.map((p) => [p.page, p]));
    if (pages.size === 0 && template?.pages?.length) {
        warnings.push({
            message: "The regions file has no page sizes (does the exam set its own page `foreground`?), so Gradescope's are used, with 0.75in margins.",
        });
        for (const p of template.pages) {
            // Gradescope's page images are 300 dpi.
            const width = (p.width * 72) / 300;
            const height = (p.height * 72) / 300;
            pages.set(p.number, { page: p.number, width, height, margin: { top: 54, bottom: 54, left: 54, right: 54 } });
        }
    }
    return pages;
}

/**
 * The stretches of pages from `from` to `to`, split at page breaks (and the pages' margins), from
 * `left` to `right` (default: the page's text, margin to margin).
 */
function spansBetween(from: Position, to: Position, pages: Map<number, RegionsPage>, left?: number, right?: number): Span[] {
    const spans: Span[] = [];
    for (let page = from.page; page <= to.page; page++) {
        const p = pages.get(page);
        if (!p) {
            continue;
        }
        const top = page === from.page ? from.y : p.margin.top;
        const bottom = page === to.page ? to.y : p.height - p.margin.bottom;
        if (bottom > top) {
            spans.push({ page, top, bottom, left: left ?? p.margin.left, right: right ?? p.width - p.margin.right });
        }
    }
    return spans;
}

/** The stretch of page an answer box takes, to its border. */
function boxSpans(b: RegionsBox, pages: Map<number, RegionsPage>): Span[] {
    const p = pages.get(b.bottom.page);
    // A bottom right no further right than the top left: the box takes the rest of the line.
    const right = b.bottom.x > b.top.x ? b.bottom.x : p ? p.width - p.margin.right : undefined;
    return spansBetween(b.top, b.bottom, pages, b.top.x, right);
}

/** One rectangle per page around `spans`, `pad` pt bigger on every side, in percent. */
function toRects(spans: Span[], pages: Map<number, RegionsPage>, pad: number): CropRect[] {
    const byPage = new Map<number, Omit<Span, "page">>();
    for (const s of spans) {
        const r = byPage.get(s.page);
        byPage.set(
            s.page,
            r
                ? { top: Math.min(r.top, s.top), bottom: Math.max(r.bottom, s.bottom), left: Math.min(r.left, s.left), right: Math.max(r.right, s.right) }
                : { top: s.top, bottom: s.bottom, left: s.left, right: s.right }
        );
    }
    return [...byPage.entries()]
        .sort(([a], [b]) => a - b)
        .flatMap(([page, r]) => {
            const p = pages.get(page);
            if (!p) {
                return [];
            }
            return [
                {
                    x1: round1(clamp(((r.left - pad) / p.width) * 100)),
                    x2: round1(clamp(((r.right + pad) / p.width) * 100)),
                    y1: round1(clamp(((r.top - pad) / p.height) * 100)),
                    y2: round1(clamp(((r.bottom + pad) / p.height) * 100)),
                    page_number: page,
                },
            ];
        });
}

/**
 * Which of Gradescope's identification regions a name block line is, by its label: a student ID
 * ("Student ID:", "Student number:", "UTORid:", "ID:"; not "Tutorial ID:"), or a name ("Name:",
 * "Last name:", "Surname:", "Given names:").
 */
export function idRegionKey(label: string | null): "name" | "sid" | null {
    const l = (label ?? "").toLowerCase().trim();
    if (/student\s*(id|no\.?|number|#)|utorid|\bsid\b|^id\b/.test(l)) {
        return "sid";
    }
    if (/(?<!user)names?\b/.test(l)) {
        return "name";
    }
    return null;
}

/** Room above a name block line (handwriting rises above it) and around it. */
const NAME_ABOVE = 6;
const NAME_PAD = 3;

/**
 * The name and student ID regions, from the name block's lines: the name region around the first
 * line for a name and those right after it (a name may take two, "First name:" and "Last name:"),
 * the student ID region around the first line for one.
 */
function planIdRegions(names: RegionsNameLine[], pages: Map<number, RegionsPage>): Partial<Record<"name" | "sid", CropRect>> {
    const spans: Partial<Record<"name" | "sid", Span[]>> = {};
    /** The name lines have ended: a line for something else came after them. */
    let namesEnded = false;
    for (const line of names) {
        const key = idRegionKey(line.label);
        const p = pages.get(line.start.page);
        const had = key ? spans[key] : undefined;
        if (spans.name && key !== "name") {
            namesEnded = true;
        }
        if (!key || !p || (had && (key === "sid" || namesEnded || had[0].page !== line.start.page))) {
            continue;
        }
        const right = line.end.x > line.start.x ? line.end.x : p.width - p.margin.right;
        spans[key] = [...(had ?? []), { page: line.start.page, top: line.start.y - NAME_ABOVE, bottom: line.end.y, left: line.start.x, right }];
    }
    const out: Partial<Record<"name" | "sid", CropRect>> = {};
    for (const key of ["name", "sid"] as const) {
        const [rect] = spans[key] ? toRects(spans[key], pages, NAME_PAD) : [];
        if (rect) {
            out[key] = rect;
        }
    }
    return out;
}

/**
 * Plan the outline for exam `examIndex` of `file`: its questions, with weights from examy's
 * points and regions around their answer boxes. `template` is Gradescope's template, to check
 * the pages against.
 */
export function planOutline(file: RegionsFile, template: GsOutlineProps["template"], examIndex = 0): OutlinePlan {
    const errors: Problem[] = [];
    const warnings: Problem[] = [];
    const exam = file.exams[examIndex];
    if (!exam?.length) {
        // Saving no questions would delete Gradescope's.
        errors.push({ message: exam ? `Exam ${examIndex + 1} of the regions file has no questions.` : `The regions file has no exam ${examIndex + 1}.` });
        return { questions: [], idRegions: {}, errors, warnings };
    }
    // Examy's labels hold non-breaking spaces ("2\u00a0(a)").
    const rows = exam.map((r) => ({ ...r, label: r.label.replace(/\s+/g, " ").trim() }));
    const end = file.ends[examIndex] ?? null;
    const pages = pageSizes(file, template, warnings);
    if (file.exams.length > 1) {
        warnings.push({ message: `The file holds ${file.exams.length} exams; this is exam ${examIndex + 1}.` });
    }

    const childrenOf = (d: RegionsDivision) =>
        rows.filter((r) => r.level === d.level + 1 && r.number.startsWith(d.number + "."));
    const subtree = (d: RegionsDivision) => rows.filter((r) => r === d || r.number.startsWith(d.number + "."));
    const own = (d: RegionsDivision) => d.points - sum(childrenOf(d).map((c) => c.points));
    /** Whether the points are in `d`'s parts, so that they are graded separately. */
    const splits = (d: RegionsDivision) => {
        const kids = childrenOf(d);
        return kids.length > 0 && own(d) <= 1e-9 && kids.some((c) => c.points > 0);
    };
    /** The divisions that become subquestions under `d`. */
    const units = (d: RegionsDivision): RegionsDivision[] => (splits(d) ? childrenOf(d).flatMap(units) : [d]);

    /** Where the text after `d` (and its parts) starts: the next division's start, or the exam's end. */
    const after = (d: RegionsDivision): Position | null => {
        const last = subtree(d).at(-1)!;
        const next = rows.slice(rows.indexOf(last) + 1).find((r) => r.start);
        return next?.start ?? end;
    };

    /**
     * The text of division `d` (and its parts): around everything in it, where the file says where
     * that ends (examy's), else from its start to the next division's, the width of the page's text.
     */
    const textOf = (d: RegionsDivision) => {
        if (d.start && d.end) {
            return spansBetween(d.start, d.end, pages, d.start.x, d.end.x > d.start.x ? d.end.x : undefined);
        }
        const to = after(d);
        return d.start && to ? spansBetween(d.start, to, pages) : [];
    };
    const hasBoxes = (d: RegionsDivision) => subtree(d).some((x) => x.boxes.length > 0);
    const parentOf = (d: RegionsDivision) => rows.find((r) => r.level === d.level - 1 && d.number.startsWith(r.number + "."));

    /**
     * Regions for division `d` with its parts `ds`: around their answer boxes, and the text of
     * those parts that have none (multiple choice, blanks to fill in); else, if none has a box,
     * `d`'s text.
     */
    const regionOf = (d: RegionsDivision, ds: RegionsDivision[]): { rects: CropRect[]; fallback: boolean; textParts?: string[] } => {
        const boxes = ds.flatMap((x) => x.boxes);
        if (!boxes.length) {
            return { rects: toRects(textOf(d), pages, 0), fallback: true };
        }
        // The largest parts without boxes: those whose parent has some.
        const bare = ds.filter((x) => x !== d && !hasBoxes(x) && hasBoxes(parentOf(x) ?? d));
        const rects = toRects(boxes.flatMap((b) => boxSpans(b, pages)), pages, BOX_PAD);
        if (!bare.length) {
            return { rects, fallback: false };
        }
        const text = toRects(bare.flatMap(textOf), pages, 0);
        return { rects: mergeRects([...rects, ...text]), fallback: false, textParts: bare.map((x) => x.label) };
    };

    const questions: PlannedQuestion[] = [];
    rows.filter((r) => r.level === 1).forEach((q, k) => {
        const number = String(k + 1);
        if (q.number !== number) {
            warnings.push({ message: `Examy question ${q.number} is question ${number} on Gradescope (questions are numbered by position).`, number });
        }
        if (!splits(q)) {
            const ds = subtree(q);
            questions.push({ number, covers: ds.map((d) => d.number), label: q.label, title: "", weight: q.points, ...regionOf(q, ds) });
            if (childrenOf(q).length && own(q) > 1e-9 && childrenOf(q).some((c) => c.points > 0)) {
                warnings.push({ message: `Question ${q.number} has points of its own and in its parts, so it is one question on Gradescope.`, number });
            }
            return;
        }
        const children = units(q).map((u, j): PlannedQuestion => {
            const ds = subtree(u);
            const title = u.label.startsWith(q.label) ? u.label.slice(q.label.length).trim() : u.label;
            return { number: `${number}.${j + 1}`, covers: ds.map((d) => d.number), label: u.label, title, weight: u.points, ...regionOf(u, ds) };
        });
        // The group's region: around its subquestions', and its own boxes outside them.
        const ownBoxes = q.boxes.flatMap((b) => boxSpans(b, pages));
        const groupRects = mergeRects([...children.flatMap((c) => c.rects), ...toRects(ownBoxes, pages, BOX_PAD)]);
        questions.push({
            number,
            covers: subtree(q).map((d) => d.number),
            label: q.label,
            title: "",
            weight: sum(children.map((c) => c.weight)),
            rects: groupRects,
            fallback: children.every((c) => c.fallback),
            children,
        });
    });

    for (const p of flatten(questions)) {
        if (p.children) {
            continue;
        }
        if (p.rects.length === 0) {
            errors.push({ message: `Question ${p.number} (examy ${p.label}) has no region: it has no answer boxes, and its position is unknown.`, number: p.number });
        } else if (p.fallback) {
            warnings.push({ message: `Question ${p.number} (examy ${p.label}) has no answer boxes examy marks; its region is its text, to the next question or part.`, number: p.number });
        } else if (p.textParts?.length) {
            const parts = p.textParts.join(", ");
            warnings.push({
                message: `Question ${p.number} (examy ${p.label}): ${parts} ${p.textParts.length === 1 ? "has" : "have"} no answer boxes examy marks, so ${p.textParts.length === 1 ? "its" : "their"} text is in the region, around the answer boxes.`,
                number: p.number,
            });
        }
        if (p.weight <= 0) {
            const bonus = p.covers.some((n) => (rows.find((r) => r.number === n)?.bonus ?? 0) > 0);
            warnings.push({
                message: bonus
                    ? `Question ${p.number} (examy ${p.label}) has only bonus points, so it is worth 0 on Gradescope.`
                    : `Question ${p.number} (examy ${p.label}) has no points, so it is worth 0 on Gradescope.`,
                number: p.number,
            });
        }
    }

    // The pages must be those of Gradescope's template.
    if (template) {
        const used = Math.max(0, ...flatten(questions).flatMap((p) => p.rects.map((r) => r.page_number)));
        if (used > template.page_count) {
            errors.push({ message: `The regions reach page ${used}, but Gradescope's template has ${template.page_count} page${template.page_count === 1 ? "" : "s"}. Is it the same PDF?` });
        } else if (file.pages.length && file.pages.length !== template.page_count) {
            warnings.push({ message: `The exam has ${file.pages.length} pages, Gradescope's template ${template.page_count}. Is it the same PDF?` });
        }
        for (const t of template.pages ?? []) {
            const p = file.pages.find((x) => x.page === t.number);
            if (p && Math.abs(p.width / p.height - t.width / t.height) > 0.01) {
                warnings.push({ message: `Page ${t.number} is ${p.width}×${p.height}pt in the exam but shaped ${t.width}×${t.height} on Gradescope. Is it the same PDF?` });
                break;
            }
        }
    }
    const idRegions = planIdRegions(file.names, pages);
    if (file.names.length && !idRegions.name && !idRegions.sid) {
        warnings.push({ message: "The name block has no line labelled with a name or student ID, so Gradescope's name and ID regions stay as they are." });
    }
    return { questions, idRegions, errors, warnings };
}

/** One rectangle per page around `rects`. */
function mergeRects(rects: CropRect[]): CropRect[] {
    const byPage = new Map<number, CropRect>();
    for (const r of rects) {
        const m = byPage.get(r.page_number);
        byPage.set(
            r.page_number,
            m ? { x1: Math.min(m.x1, r.x1), x2: Math.max(m.x2, r.x2), y1: Math.min(m.y1, r.y1), y2: Math.max(m.y2, r.y2), page_number: r.page_number } : { ...r }
        );
    }
    return [...byPage.values()].sort((a, b) => a.page_number - b.page_number);
}

export function flatten<T extends { children?: T[] }>(qs: T[]): T[] {
    return qs.flatMap((q) => [q, ...(q.children ? flatten(q.children) : [])]);
}

// --------------------------------------------------------------------------------- matching

/** A question of Gradescope's outline, with its number by position and its subquestions. */
export interface ExistingQuestion {
    number: string;
    question: GsOutlineQuestion;
    children: ExistingQuestion[];
}

/** Gradescope's flat outline as a tree, numbered by position as Gradescope numbers it. */
export function existingTree(outline: GsOutlineQuestion[]): ExistingQuestion[] {
    const byIndex = (a: GsOutlineQuestion, b: GsOutlineQuestion) => a.index - b.index;
    const tops = outline.filter((q) => q.parent_id == null).sort(byIndex);
    return tops.map((q, k) => ({
        number: String(k + 1),
        question: q,
        children: outline
            .filter((c) => c.parent_id != null && String(c.parent_id) === String(q.id))
            .sort(byIndex)
            .map((c, j) => ({ number: `${k + 1}.${j + 1}`, question: c, children: [] })),
    }));
}

export type MatchStatus = "new" | "changed" | "same";

export interface MatchedQuestion extends PlannedQuestion {
    /** The Gradescope question it updates, if any. */
    existing: GsOutlineQuestion | null;
    status: MatchStatus;
    /** What changes, e.g. ["weight 2 → 3", "region"]. */
    changes: string[];
    children?: MatchedQuestion[];
}

export interface OutlineMatch {
    questions: MatchedQuestion[];
    /** Gradescope questions the save deletes (subquestions of a deleted group included). */
    deleted: ExistingQuestion[];
}

const sameRects = (a: CropRect[] | null, b: CropRect[]) => {
    const key = (rs: CropRect[]) =>
        JSON.stringify(
            [...rs]
                .map((r) => [r.page_number, round1(r.x1), round1(r.x2), round1(r.y1), round1(r.y2)])
                .sort((x, y) => x[0] - y[0] || x[3] - y[3])
        );
    return key(a ?? []) === key(b);
};

/**
 * Match the planned questions to Gradescope's, by number: a question to the question in its
 * place, a group to the group, and a group's subquestions to its subquestions, so that each keeps
 * its id. A question whose place holds a group (or the other way round) is new, and what was in
 * its place is deleted.
 */
export function matchOutline(planned: PlannedQuestion[], outline: GsOutlineQuestion[]): OutlineMatch {
    const tree = existingTree(outline);
    const deleted: ExistingQuestion[] = [];

    const match = (p: PlannedQuestion, e: ExistingQuestion | null, titleFrom: "plan" | "existing"): MatchedQuestion => {
        const q = e?.question ?? null;
        const title = titleFrom === "existing" && q ? q.title : p.title;
        const changes: string[] = [];
        if (q) {
            if (!near(parseFloat(q.weight), p.weight)) {
                changes.push(`weight ${parseFloat(q.weight)} → ${p.weight}`);
            }
            if ((q.title ?? "") !== title) {
                changes.push(`title "${q.title ?? ""}" → "${title}"`);
            }
            if (!sameRects(q.crop_rect_list, p.rects)) {
                changes.push("region");
            }
        }
        return { ...p, title, existing: q, status: q ? (changes.length ? "changed" : "same") : "new", changes, children: undefined };
    };

    const questions = planned.map((p, k): MatchedQuestion => {
        const e = tree[k] ?? null;
        const sameKind = e && !!p.children === e.children.length > 0;
        if (e && !sameKind) {
            deleted.push(e, ...e.children);
        }
        const top = match(p, sameKind ? e : null, "existing");
        if (!p.children) {
            return top;
        }
        const kids = p.children.map((c, j) => match(c, sameKind ? (e!.children[j] ?? null) : null, "plan"));
        if (sameKind) {
            deleted.push(...e!.children.slice(p.children.length));
            if (e!.children.length !== p.children.length && top.status === "same") {
                top.status = "changed";
            }
        }
        if (top.status === "same" && kids.some((c) => c.status !== "same")) {
            top.status = "changed";
        }
        return { ...top, children: kids };
    });
    for (const e of tree.slice(planned.length)) {
        deleted.push(e, ...e.children);
    }
    return { questions, deleted };
}

export const ID_REGION_LABELS = { name: "Name", sid: "Student ID" } as const;

export interface IdRegionMatch {
    key: "name" | "sid";
    /** The region to save: the exam's, else Gradescope's as it is. */
    rect: CropRect | null;
    existing: CropRect | null;
    status: MatchStatus | "kept";
}

/** The name and student ID regions: the exam's where it has them, compared with Gradescope's. */
export function matchIdRegions(planned: OutlinePlan["idRegions"], props: GsOutlineProps): IdRegionMatch[] {
    const regions = props.assignment.id_regions ?? {};
    return (["name", "sid"] as const).map((key) => {
        const existing = regions[key] ?? null;
        const rect = planned[key] ?? null;
        if (!rect) {
            return { key, rect: existing, existing, status: "kept" };
        }
        return { key, rect, existing, status: !existing ? "new" : sameRects([existing], [rect]) ? "same" : "changed" };
    });
}

/**
 * The request body that saves the matched outline, with the name and ID regions `ids` (see
 * `matchIdRegions`; by default Gradescope's, as they are).
 */
export function outlinePayload(match: OutlineMatch, props: GsOutlineProps, ids: IdRegionMatch[] = []): OutlinePayload {
    const regions = { ...(props.assignment.id_regions ?? {}) };
    for (const id of ids) {
        regions[id.key] = id.rect;
    }
    const data = (q: MatchedQuestion): QuestionData => ({
        title: q.title,
        weight: q.weight,
        crop_rect_list: q.rects,
        ...(q.children ? { children: q.children.map(data) } : {}),
        ...(q.existing ? { id: q.existing.id } : {}),
    });
    return {
        assignment: { identification_regions: { name: regions.name ?? null, sid: regions.sid ?? null, ...regions } },
        question_data: match.questions.map(data),
    };
}
