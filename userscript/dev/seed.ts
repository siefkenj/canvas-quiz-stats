/**
 * A made-up assignment for the dev harness and the tests, covering the cases the rubric tool
 * handles: a question with only Gradescope's default item, one with no items at all, a parent
 * question with parts, a part with an existing rubric (items and a group), and a negatively
 * scored question.
 */
import type { GsQuestion, GsRubricPayload } from "../src/rubric/types";

export const SEED_COURSE_ID = 1;
export const SEED_ASSIGNMENT_ID = 1;

function question(
    id: number,
    full_index: string,
    weight: number,
    scoring_type: "positive" | "negative" = "positive",
    children: GsQuestion[] | null = null,
    title = ""
): GsQuestion {
    return {
        id,
        parent_id: null,
        full_index,
        title,
        weight: weight.toFixed(1),
        scoring_type,
        children: children?.map((c) => ({ ...c, parent_id: id })) ?? null,
    };
}

const questions: GsQuestion[] = [
    question(101, "1", 2, "positive", null, "Definitions"),
    question(102, "2", 4, "positive", [question(103, "2.1", 2), question(104, "2.2", 2)]),
    question(105, "3", 3, "negative", null, "Short answer"),
    question(106, "4", 1),
];

const urls = (id: number) => ({
    create_group_with_items: `/courses/${SEED_COURSE_ID}/questions/${id}/rubric/create_group_with_items`,
    create_items: `/courses/${SEED_COURSE_ID}/questions/${id}/rubric/create_items`,
    rubric_item: `/courses/${SEED_COURSE_ID}/questions/${id}/rubric_items`,
    rubric_item_groups: `/courses/${SEED_COURSE_ID}/questions/${id}/rubric_item_groups`,
    update_rubric_entries: `/courses/${SEED_COURSE_ID}/questions/${id}/rubric/update_entries`,
    delete_rubric_entries: `/courses/${SEED_COURSE_ID}/questions/${id}/rubric/delete_entries`,
});

export const SEED: GsRubricPayload = {
    assignment: { id: SEED_ASSIGNMENT_ID, title: "Sample Problem Set", course_id: SEED_COURSE_ID },
    course: { id: SEED_COURSE_ID, name: "Sample Course", shortname: "SAMPLE101" },
    has_submissions_and_students: false,
    rubrics_locked: false,
    questions,
    rubric_items: [
        // Gradescope's default item on every question, including parents
        { id: 1001, description: "Correct", weight: "0.0", position: 0, group_id: null, question_id: 101 },
        { id: 1002, description: "Correct", weight: "0.0", position: 0, group_id: null, question_id: 102 },
        { id: 1004, description: "Correct", weight: "0.0", position: 0, group_id: null, question_id: 104 },
        // Q2.1: an existing rubric with a group
        { id: 1010, description: "**Claim**: You state the correct claim.", weight: "1.0", position: 0, group_id: 501, question_id: 103 },
        { id: 1011, description: "**Proof**: Your proof is complete.", weight: "1.0", position: 1, group_id: 501, question_id: 103 },
        { id: 1012, description: "Incorrect", weight: "0.0", position: 1, group_id: null, question_id: 103 },
        // Q3: negative scoring (weights are deductions)
        { id: 1020, description: "Correct", weight: "0.0", position: 0, group_id: null, question_id: 105 },
        { id: 1021, description: "Missing units", weight: "1.0", position: 1, group_id: null, question_id: 105 },
        { id: 1022, description: "Wrong answer", weight: "2.0", position: 2, group_id: null, question_id: 105 },
        // Q4 has no rubric items at all
    ],
    rubric_item_groups: [
        { id: 501, description: "**Argument**", mutually_exclusive: false, position: 0, question_id: 103 },
    ],
    urls: { question_urls: Object.fromEntries([101, 102, 103, 104, 105, 106].map((id) => [id, urls(id)])) },
};
