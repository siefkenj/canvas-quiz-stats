/**
 * Types for the regions files the outline tool reads (examy's, and the older one of
 * `gradescope.typ`), the regions as the tool works with them, and the subset of Gradescope's
 * outline editor data (`AssignmentOutline`'s props) and its save request that the tool uses.
 */

/** A point on a page, in pt from its top left. `page` counts from 1. */
export interface Position {
    page: number;
    x: number;
    y: number;
}

export interface RegionsPage {
    page: number;
    width: number;
    height: number;
    margin: { top: number; bottom: number; left: number; right: number };
}

// ------------------------------------------------------------- examy's regions (examy 1.1.0)

/**
 * `examy-regions.json`, which examy 1.1.0 and later attach to an exam's PDF (`embed-metadata`), or
 * `query(<examy-regions>)`: one exam's. See examy's manual, "Exam metadata".
 */
export const EXAMY_REGIONS_FORMAT = "examy-regions";

export interface ExamyRegions {
    format: typeof EXAMY_REGIONS_FORMAT;
    "exam-name": string | null;
    pages: RegionsPage[];
    "name-block-regions": { "display-name": string | null; start: Position; end: Position }[];
    "question-regions": ExamyQuestionRegion[];
}

/** A question, part, or subpart, where it is on the page. */
export interface ExamyQuestionRegion {
    /** Its place among its siblings at each level, from 0: `[0, 2]` is 1 (c). */
    address: number[];
    /** Its label, e.g. "1 (c)". */
    "display-name": string;
    level: number;
    /** Points given to it directly, not its parts'. */
    points: number | null;
    "bonus-points": number | null;
    /** The top left of its label. */
    start: Position | null;
    /** The bottom right of everything in it, its parts' too. */
    end: Position | null;
    /** Its own answer boxes, to the outside of their borders. */
    "answer-boxes": { top: Position; bottom: Position }[];
}

// ------------------------------------------------------- gradescope.typ's regions (older)

/** The regions file `gradescope.typ` wrote (for examy 1.0.0), still read. */
export const LEGACY_REGIONS_FORMAT = "examy-gradescope-regions";
export const LEGACY_REGIONS_FORMAT_VERSION = 1;

export interface LegacyRegionsFile {
    format: typeof LEGACY_REGIONS_FORMAT;
    version: typeof LEGACY_REGIONS_FORMAT_VERSION;
    /** The exam's file, if made from the command line. */
    exam?: string | null;
    pages: RegionsPage[];
    /** Where each exam's questions end. */
    ends: Position[];
    /** The lines of the name block: the top left of its row, and the line's end. */
    names?: { label: string | null; start: Position; end: Position }[];
    /** Each exam's divisions, in order. */
    exams: {
        number: string;
        label: string;
        level: number;
        /** Its points, its parts' included. */
        points: number;
        bonus: number | null;
        /** The baseline of its first line. */
        start: Position | null;
        /** Its own answer boxes: top left and bottom right inside the inset, and the inset. */
        boxes: { top: Position; bottom: Position; inset?: { top: number; bottom: number; left: number; right: number } }[];
    }[][];
}

// -------------------------------------------------------------- the regions, as the tool reads them

/** An examy question, part, or subpart. */
export interface RegionsDivision {
    /** Its numbers from the question down, joined by dots: "2.1" for 2 (a). */
    number: string;
    /** As examy labels it, e.g. "2 (a)". */
    label: string;
    /** 1 for a question, 2 for a part, 3 for a subpart. */
    level: number;
    /** Its points, its parts' and subparts' included (bonus points not). */
    points: number;
    bonus: number | null;
    /** The top left of its first line. */
    start: Position | null;
    /** The bottom right of everything in it, if known (else it runs to the next division). */
    end: Position | null;
    /** Its own answer boxes (not its parts'). */
    boxes: RegionsBox[];
}

/**
 * An answer box, to the outside of its border: its top left and bottom right. A bottom right no
 * further right than the top left means the box takes the rest of the line.
 */
export interface RegionsBox {
    top: Position;
    bottom: Position;
}

/** A line of the name block (`name-block`) and its label ("Name:"). */
export interface RegionsNameLine {
    label: string | null;
    /** Its top left; and its bottom right (its left again, if the line takes the full width). */
    start: Position;
    end: Position;
}

/** A regions file, read (`parseRegions`), whichever format it came in. */
export interface RegionsFile {
    /** The file's format. */
    source: typeof EXAMY_REGIONS_FORMAT | typeof LEGACY_REGIONS_FORMAT;
    /** The exam's name, or its file. */
    exam: string | null;
    pages: RegionsPage[];
    /** Where each exam's questions end, if known. */
    ends: (Position | null)[];
    /** The lines of the name block, if there is one. */
    names: RegionsNameLine[];
    /** Each exam's divisions, in order. */
    exams: RegionsDivision[][];
}

// ---------------------------------------------------------------- Gradescope outline editor

/** A region, in percent of the page from its top left. `page_number` counts from 1. */
export interface CropRect {
    x1: number;
    x2: number;
    y1: number;
    y2: number;
    page_number: number;
}

export interface GsOutlineQuestion {
    id: number;
    type: string;
    title: string;
    parent_id: number | null;
    weight: string;
    crop_rect_list: CropRect[] | null;
    index: number;
}

export interface GsTemplatePage {
    number: number;
    /** In pixels. */
    width: number;
    height: number;
    url: string;
    thumb_url?: string;
}

/** The props Gradescope's outline editor (`AssignmentOutline`) is mounted with. */
export interface GsOutlineProps {
    assignment: {
        id: number;
        title: string;
        course_id: number;
        type: string;
        id_regions?: Record<string, CropRect | null> | null;
    };
    has_submissions_and_students: boolean;
    template: { page_count: number; pages: GsTemplatePage[]; filename?: string } | null;
    /** Flat: subquestions point to their group with `parent_id`. */
    outline: GsOutlineQuestion[];
}

/** A question as the outline editor saves it (`PATCH outline/`). New questions have no `id`. */
export interface QuestionData {
    id?: number;
    title: string;
    weight: number;
    crop_rect_list: CropRect[];
    children?: QuestionData[];
}

export interface OutlinePayload {
    assignment: { identification_regions: Record<string, CropRect | null> };
    question_data: QuestionData[];
}
