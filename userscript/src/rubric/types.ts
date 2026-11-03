/**
 * Types for the rubric JSON format (what users download and upload) and for the subset of
 * Gradescope's `rubric/edit.json` payload that the rubric tool reads.
 */

export const RUBRIC_FORMAT = "gradescope-rubric";
export const RUBRIC_FORMAT_VERSION = 1;

export type Scoring = "positive" | "negative";

/** A rubric item. `points` is the change to the student's score when the item is applied. */
export interface RubricItem {
    type: "item";
    points: number;
    description: string;
}

export interface RubricGroup {
    type: "group";
    description: string;
    mutually_exclusive: boolean;
    items: RubricItem[];
}

export type RubricEntry = RubricItem | RubricGroup;

export interface RubricQuestion {
    /** Gradescope's question number, e.g. "1" or "3.2" (`full_index`). */
    number: string;
    /** Informational only. */
    title?: string;
    /** Must equal the question's weight on Gradescope. */
    weight: number;
    /** Must equal the question's scoring type on Gradescope. */
    scoring: Scoring;
    rubric: RubricEntry[];
}

export interface RubricFile {
    format: typeof RUBRIC_FORMAT;
    version: typeof RUBRIC_FORMAT_VERSION;
    /**
     * The assignment the file is for. Optional: the page says which assignment it is, and this is
     * only a check that the file is not uploaded to another. Leave it out to use one file for
     * several assignments.
     */
    assignment?: {
        course_id: number;
        assignment_id: number;
        /** Informational only. */
        title?: string;
    };
    questions: RubricQuestion[];
}

// ------------------------------------------------------------------- Gradescope payload

export interface GsQuestion {
    id: number;
    parent_id: number | null;
    full_index: string;
    title: string;
    weight: string;
    scoring_type: Scoring;
    children: GsQuestion[] | null;
}

export interface GsRubricItem {
    id: number;
    description: string;
    weight: string;
    position: number;
    group_id: number | null;
    question_id: number;
}

export interface GsRubricItemGroup {
    id: number;
    description: string;
    mutually_exclusive: boolean;
    position: number;
    question_id: number;
}

export interface GsQuestionUrls {
    create_group_with_items: string;
    rubric_item: string;
    rubric_item_groups: string;
    update_rubric_entries: string;
}

/** The parts of `GET /courses/:c/assignments/:a/rubric/edit.json` that we use. */
export interface GsRubricPayload {
    assignment: { id: number; title: string; course_id: number };
    course?: { id: number; name?: string; shortname?: string };
    has_submissions_and_students: boolean;
    questions: GsQuestion[];
    rubric_items: GsRubricItem[];
    rubric_item_groups: GsRubricItemGroup[];
    urls?: { question_urls?: Record<string, Partial<GsQuestionUrls>> };
    rubrics_locked?: boolean;
}

/** A top-level rubric entry of a question as it currently exists on Gradescope. */
export type GsEntry =
    | { kind: "item"; item: GsRubricItem }
    | { kind: "group"; group: GsRubricItemGroup; items: GsRubricItem[] };
