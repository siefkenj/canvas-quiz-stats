/**
 * An answer choice of a quiz question, as returned by the Canvas API.
 */
export interface QuizAnswer {
    id: number;
    text: string;
    html?: string;
    weight: number;
}

/**
 * A quiz question, as returned by `/api/v1/courses/:courseId/quizzes/:quizId/questions`.
 */
export interface QuizQuestion {
    id: number;
    quiz_id: number;
    quiz_group_id?: number | null;
    position: number;
    question_name: string;
    question_type: string;
    question_text: string;
    points_possible: number;
    correct_comments: string;
    incorrect_comments: string;
    answers: QuizAnswer[];
    type?: undefined;
}

/**
 * A question group, as returned by `/api/v1/courses/:courseId/quizzes/:quizId/groups/:groupId`,
 * with the questions belonging to the group attached.
 */
export interface QuestionGroup {
    type: "question_group";
    id: number;
    name: string;
    pick_count: number;
    question_points: number;
    position: number;
    questions: QuizQuestion[];
}

/**
 * An entry in a quiz: either a stand-alone question or a question group.
 */
export type QuizItem = QuizQuestion | QuestionGroup;

/**
 * Response of `/api/v1/courses/:courseId/quizzes/:quizId/statistics`
 * (only the fields that are used).
 */
export interface QuizStatisticsResponse {
    quiz_statistics: {
        question_statistics: {
            id: string;
            question_type: string;
            question_text: string;
            answers?: { id: string; text?: string }[];
        }[];
    }[];
}

export interface CanvasUser {
    id: string;
    sortable_name: string;
    sis_user_id: string | null;
    integration_id: string | null;
}

export interface QuizSubmission {
    id: string;
    user_id: string;
    attempt: number;
    end_at: string;
    workflow_state: string;
    result_url: string;
}

/**
 * Response of `/api/v1/courses/:courseId/quizzes/:quizId/submissions?include[]=user`
 */
export interface QuizSubmissionsResponse {
    quiz_submissions: QuizSubmission[];
    users: CanvasUser[];
}

export type QuizSubmissionWithUser = QuizSubmission & { user: CanvasUser };

/**
 * A submission along with the ids of the questions that the student was shown,
 * in the order they were shown.
 */
export type QuizSubmissionWithQuestions = QuizSubmissionWithUser & {
    questions: number[];
};

/**
 * Response of `/api/v1/quiz_submissions/:submissionId/questions` with the submission id attached.
 */
export interface QuizSubmissionQuestions {
    submission_id: string;
    quiz_submission_questions?: { id: number; position: number }[];
}

/**
 * An answer a student gave, as scraped from their quiz results page.
 */
export type SubmittedAnswer =
    | { type: "essay"; value: string }
    | { type: "multiple_choice"; value: string | undefined }
    | { type: "multiple_answers"; value: string[] };

/**
 * An entry of `submission_data` from a Canvas submission's `submission_history`.
 */
export interface SubmissionDataEntry {
    question_id: number;
    text?: string;
    answer_id?: number;
    [key: string]: unknown;
}

/**
 * Everything gathered about one student's quiz attempt.
 */
export interface StudentSubmissionData {
    user?: {
        utorid: string | null;
        id: string | null;
        canvas_id: string;
    };
    workflow_state?: string;
    answers?: Record<string, SubmittedAnswer>;
    questions?: number[];
}

/**
 * The score to give every submission for a particular question.
 */
export interface QuestionScore {
    score: number | string;
    id: string;
}

export interface Progress<T = unknown> {
    status: string;
    message: string;
    total: number | null;
    progress: number | null;
    partialData: T[];
}

export type ProgressCallback<T = unknown> = (progress: Progress<T>) => void;
