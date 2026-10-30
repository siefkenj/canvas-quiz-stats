/**
 * Types for the regions file that `gradescope.typ` writes from an examy exam, and for
 * the subset of Gradescope's outline editor data (`AssignmentOutline`'s props) and its save
 * request that the outline tool uses.
 */

export const REGIONS_FORMAT = "examy-gradescope-regions";
export const REGIONS_FORMAT_VERSION = 1;

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
    /** Where it starts (the baseline of its first line). */
    start: Position | null;
    /** Its own answer boxes (not its parts'). */
    boxes: RegionsBox[];
}

/** An answer box: its top left and bottom right inside its inset, and the inset, in pt. */
export interface RegionsBox {
    top: Position;
    bottom: Position;
    inset?: { top: number; bottom: number; left: number; right: number };
}

/** A line of the name block (`name-block`) and its label ("Name:"). */
export interface RegionsNameLine {
    label: string | null;
    /** Its top left; and its bottom (its left again, if the line takes the full width). */
    start: Position;
    end: Position;
}

export interface RegionsFile {
    format: typeof REGIONS_FORMAT;
    version: typeof REGIONS_FORMAT_VERSION;
    /** The exam's file, if made from the command line. */
    exam?: string | null;
    pages: RegionsPage[];
    /** Where each exam's questions end. */
    ends: Position[];
    /** The lines of the name block, if there is one. */
    names?: RegionsNameLine[];
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
