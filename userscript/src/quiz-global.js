import {
    logFetch,
    log,
    logPut,
    quizHtmlToOrder,
    quizQuestionsToHash,
    processSubmittedAnswer,
} from "./utils";

class Quiz {
    init({ courseId, quizId }) {
        this.courseId = courseId;
        this.quizId = quizId;
    }

    /**
     * Fetch all the Quiz questions
     *
     * @memberof Quiz
     */
    async fetchQuestions({ asFlatList = false } = {}) {
        // We'll assume there's not more than 1000 questions...
        const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/questions?per_page=1000`;
        const groupUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/groups/`;
        const editUrl = `/courses/${this.courseId}/quizzes/${this.quizId}/edit`;

        const resp = await logFetch(unescape(url));
        const json = await resp.json();
        this.quizQuestions = json;

        if (asFlatList) {
            return this.quizQuestions;
        }
        // many of the questions could be in quiz groups, so we need to fetch data about each group.
        const quizGroups = {};
        for (const question of this.quizQuestions) {
            // There may be an "undefined"/"null" group for questions that aren't part of a group, but
            // that's okay.
            const groupId = question.quiz_group_id;
            quizGroups[groupId] = quizGroups[groupId] || [];
            quizGroups[groupId].push(question);
        }

        const groupIds = Object.keys(quizGroups).filter(
            (id) => id !== "null" && id !== "undefined"
        );
        log("Found the following question groups", groupIds);

        // Since the `position` attribute is wrong in the JSON data returned from Canvas,
        // we need to extract the question order directly from the html
        const editFetchResp = logFetch(editUrl);

        // fetch information about the question groups
        const resps = await Promise.all(
            groupIds.map((id) => logFetch(groupUrl + id))
        );
        const groupInfo = await Promise.all(resps.map((resp) => resp.json()));
        const groups = {};
        for (const group of groupInfo) {
            groups[group.id] = {
                type: "question_group",
                ...group,
                questions: quizGroups[group.id] || [],
            };
        }

        const editPageContents = await (await editFetchResp).text();
        const questionOder = quizHtmlToOrder(editPageContents);

        // Assemble the groups and un-grouped questions together into one array.
        const ret = this.quizQuestions
            .filter(
                (q) =>
                    "" + q.quiz_group_id === "null" ||
                    "" + q.quiz_group_id === "undefined"
            )
            .concat(Object.values(groups));

        ret.forEach((item) => {
            item.position = questionOder.indexOf(item.id);
        });
        ret.sort((a, b) => (a.position | 0) - (b.position | 0));

        return ret;
    }

    /**
     * Fetch the ids of all quiz submissions
     *
     * @memberof Quiz
     */
    async fetchSubmissionIds(progressCallback = () => {}) {
        const PAGE_SIZE = 20;
        const progress = {
            status: "in progress",
            message: "",
            total: null,
            progress: null,
            partialData: [],
        };
        function notifyProgress() {
            progressCallback({ ...progress });
        }
        // /api/v1/courses/181873/quizzes/115457/submissions?include[]=user&include[]=submission&per_page=20&page=2
        const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?include[]=user&per_page=${PAGE_SIZE}`;
        let resp = null;

        // Get the total number of submissions
        progress.message = "Getting total number of submissions";
        notifyProgress();
        const numSubmissions = await this.findNumPages(
            `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?per_page=1`
        );
        progress.message = "";
        progress.total = numSubmissions;
        notifyProgress();

        const ret = [];
        // Fetch in batches until we have all the data
        const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
        for (let page = 1; page <= numPages; page++) {
            progress.message = `Fetching ${
                page * PAGE_SIZE
            } of ${numSubmissions}`;
            notifyProgress();

            resp = await logFetch(url + "&page=" + page);
            const json = await resp.json();

            const submissions = combineSubmissionAndUserData(json);
            ret.push(...submissions);
            progress.partialData = [...ret];
            notifyProgress();
        }

        progress.status = "";
        notifyProgress();

        return ret;
    }

    async gradeSubmissions(
        submissions = [],
        questionInfo = { score: 0, id: "1234567" },
        progressCallback = () => {}
    ) {
        const BATCH_SIZE = 20;
        const progress = {
            status: "in progress",
            message: "",
            total: null,
            progress: null,
            partialData: [],
        };
        function notifyProgress() {
            progressCallback({ ...progress });
        }
        const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions/`;

        for (let i = 0; i <= Math.ceil(submissions.length / BATCH_SIZE); i++) {
            const slice = submissions.slice(
                i * BATCH_SIZE,
                (i + 1) * BATCH_SIZE
            );
            progress.message = `Grading submissions ${i * BATCH_SIZE} of ${
                submissions.length
            }`;
            notifyProgress();
            const promises = slice.map((submission) =>
                logPut(url + submission.id, {
                    quiz_submissions: [
                        {
                            attempt: submission.attempt,
                            questions: {
                                [questionInfo.id]: {
                                    score: questionInfo.score,
                                },
                            },
                        },
                    ],
                })
            );
            await Promise.all(promises);
        }

        progress.status = "done";
        progress.message = `Graded all ${submissions.length} submissions`;
        notifyProgress();
    }

    /**
     * Fetch the quiz submissions and answers that students gave
     *
     * @memberof Quiz
     */
    async fetchSubmissionsWithAnswers(progressCallback = () => {}) {
        const ret = {};
        // When this is set to 0, all submissions are fetched otherwise,
        // fetching is limited to the specified number.
        const FETCH_LIMIT_OVERRIDE = 0;
        const PAGE_SIZE = FETCH_LIMIT_OVERRIDE || 20;
        // We are doing two parallel progress operations,
        // so we need two parallel progress states.
        const progressA = {
            status: "in progress",
            message: "",
            total: null,
            progress: null,
            partialData: [],
        };
        const progressB = {
            status: "in progress",
            message: "",
            total: null,
            progress: null,
            partialData: [],
        };
        function notifyProgress() {
            // There are two operations going on at the same time,
            // so we need to keep two trackers of progress.
            const progress = { ...progressA };
            progress.status = progressA.status || progressB.status;
            progress.message = [progressA.message, progressB.message]
                .filter((x) => x)
                .join("; ");
            progress.total =
                (progressA.total != null
                    ? progressA.total + (progressB.total || 0)
                    : null) ||
                (progressB.total != null
                    ? progressB.total + (progressA.total || 0)
                    : null);
            progress.progress =
                (progressA.progress != null
                    ? progressA.progress + (progressB.progress || 0)
                    : null) ||
                (progressB.progress != null
                    ? progressB.progress + (progressA.progress || 0)
                    : null);
            progressCallback({ ...progress });
        }
        // /api/v1/courses/181873/quizzes/115457/submissions?include[]=user&include[]=submission&per_page=20&page=2
        const quizUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}`;
        const quizVersionUrl = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?include[]=user&per_page=${PAGE_SIZE}`;
        let resp = null;

        progressA.message = "Fetching Quiz Details";
        notifyProgress();

        // We need to get the assignment_id from the quiz object.
        resp = await logFetch(quizUrl);
        const quizData = await resp.json();
        const assignmentId = quizData["assignment_id"];
        log("Quiz", this.quizId, "has assignment id", assignmentId);
        const quizQuestions = await this.fetchQuestions();
        const questionHash = quizQuestionsToHash(quizQuestions);

        const getQuizSubmittedAnswers = async () => {
            const answersUrl = `/api/v1/courses/${this.courseId}/assignments/${assignmentId}/submissions?include[]=user&include[]=submission_history&per_page=${PAGE_SIZE}`;

            const numSubmissions =
                FETCH_LIMIT_OVERRIDE ||
                (await this.findNumPages(
                    `/api/v1/courses/${this.courseId}/assignments/${assignmentId}/submissions?per_page=1`
                ));

            // Fetch in batches until we have all the data
            const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
            for (let page = 1; page <= numPages; page++) {
                progressA.message = `Fetching ${
                    page * PAGE_SIZE
                } of ${numSubmissions}`;
                notifyProgress();

                resp = await logFetch(answersUrl + "&page=" + page);
                const userAnswers = await resp.json();

                for (const submission of userAnswers) {
                    const utorid = submission.user.sis_user_id;
                    ret[utorid] = ret[utorid] || {};
                    ret[utorid].user = {
                        utorid,
                        id: submission.user.integration_id,
                    };
                    ret[utorid].workflow_state = submission.workflow_state;
                    ret[utorid].answers =
                        submission.submission_history[0].submission_data || [];
                    ret[utorid].answers = ret[utorid].answers
                        .map((answer) =>
                            processSubmittedAnswer(answer, questionHash)
                        )
                        // Any `null` answers don't belong
                        .filter((x) => x);
                }
            }

            progressA.status = "";
            notifyProgress();

            return ret;
        };

        const getQuizVersions = async () => {
            // Get the total number of submissions
            progressB.message = "Getting total number of submissions";
            notifyProgress();
            const numSubmissions =
                FETCH_LIMIT_OVERRIDE ||
                (await this.findNumPages(
                    `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?per_page=1`
                ));
            progressB.message = "";
            progressB.total = numSubmissions;
            notifyProgress();

            // Fetch in batches until we have all the data
            const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
            for (let page = 1; page <= numPages; page++) {
                progressB.message = `Fetching ${
                    page * PAGE_SIZE
                } of ${numSubmissions}`;
                notifyProgress();

                resp = await logFetch(quizVersionUrl + "&page=" + page);
                const json = await resp.json();

                const submissions = combineSubmissionAndUserData(json);

                const detailedSubmissions = await Promise.all(
                    submissions.map(async (s) => {
                        const rawData = await (
                            await logFetch(
                                `/api/v1/quiz_submissions/${s.id}/questions`
                            )
                        ).json();

                        return { ...rawData, submission_id: s.id };
                    })
                );
                const submissionsHash = submissionsToSubmissionsHash(
                    detailedSubmissions
                );
                const combinedSubmissionData = submissions.map((sub) => ({
                    ...sub,
                    questions: submissionsHash[sub.id],
                }));
                log("Combined submission data", combinedSubmissionData);

                for (const submission of combinedSubmissionData) {
                    const utorid = submission.user.sis_user_id;
                    ret[utorid] = ret[utorid] || {};
                    ret[utorid].questions = submission.questions;
                }

                notifyProgress();
            }

            progressB.status = "";
            notifyProgress();

            return ret;
        };

        await Promise.all([getQuizSubmittedAnswers(), getQuizVersions()]);
        const fullData = {
            quizQuestions,
            quizSubmissions: Object.values(ret),
        };

        console.log("OUTING", fullData);
        return fullData;
    }

    /**
     * Fetch the quiz submissions
     *
     * @memberof Quiz
     */
    async fetchSubmissions(progressCallback = () => {}) {
        const PAGE_SIZE = 20;
        const progress = {
            status: "in progress",
            message: "",
            total: null,
            progress: null,
            partialData: [],
        };
        function notifyProgress() {
            progressCallback({ ...progress });
        }
        // /api/v1/courses/181873/quizzes/115457/submissions?include[]=user&include[]=submission&per_page=20&page=2
        const url = `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?include[]=user&per_page=${PAGE_SIZE}`;
        let resp = null;

        // Get the total number of submissions
        progress.message = "Getting total number of submissions";
        notifyProgress();
        const numSubmissions = await this.findNumPages(
            `/api/v1/courses/${this.courseId}/quizzes/${this.quizId}/submissions?per_page=1`
        );
        progress.message = "";
        progress.total = numSubmissions;
        notifyProgress();

        const ret = [];
        // Fetch in batches until we have all the data
        const numPages = Math.ceil(numSubmissions / PAGE_SIZE);
        for (let page = 1; page <= numPages; page++) {
            progress.message = `Fetching ${
                page * PAGE_SIZE
            } of ${numSubmissions}`;
            notifyProgress();

            resp = await logFetch(url + "&page=" + page);
            const json = await resp.json();

            const submissions = combineSubmissionAndUserData(json);
            log("got submissions", submissions);

            const detailedSubmissions = await Promise.all(
                submissions.map(async (s) => {
                    const rawData = await (
                        await logFetch(
                            `/api/v1/quiz_submissions/${s.id}/questions`
                        )
                    ).json();

                    return { ...rawData, submission_id: s.id };
                })
            );
            const submissionsHash = submissionsToSubmissionsHash(
                detailedSubmissions
            );
            const combinedSubmissionData = submissions.map((sub) => ({
                ...sub,
                questions: submissionsHash[sub.id],
            }));
            log("Combined submission data", combinedSubmissionData);

            ret.push(...combinedSubmissionData);
            progress.partialData = [...ret];
            notifyProgress();
        }

        progress.status = "";
        notifyProgress();

        return ret;
    }

    /**
     * Perform bisection to find the number of pages associated with the API
     * endpoint specified by `url`
     *
     * @param {*} url
     * @memberof Quiz
     */
    async findNumPages(url) {
        const START_GUESS = 1000;
        let guessPage = START_GUESS;
        let lowerBound = 1;
        let upperBound = 1000000;

        function getURL(page) {
            if (page == null) {
                page = guessPage;
            }
            return url + "&page=" + page;
        }

        async function isEmptyAt(page) {
            const resp = await logFetch(getURL(page));
            const json = await resp.json();
            return getPrimaryData(json).length === 0;
        }

        // Exponentially search out from the starting guess
        for (let i = 0; i < 10; i++) {
            if (await isEmptyAt(guessPage)) {
                break;
            }
            lowerBound = guessPage;
            guessPage *= 2;
        }
        upperBound = guessPage;

        // Perform bisection now that we have an empty page
        for (
            let i = 0;
            // XXX This formula is NOT right, but I cannot be bothered to figured it out right now...
            i < (2 * Math.log(upperBound - lowerBound)) / Math.log(2) + 10;
            i++
        ) {
            if (lowerBound === upperBound) {
                break;
            }
            guessPage = Math.floor(lowerBound / 2 + upperBound / 2) | 0;
            if (await isEmptyAt(guessPage)) {
                upperBound = guessPage;
            } else {
                lowerBound = guessPage;
            }
        }

        return Math.max(lowerBound, upperBound) - 1;
    }
}

function combineSubmissionAndUserData(data) {
    const submissions = data.quiz_submissions;
    const usersList = data.users;
    const users = {};
    for (const user of usersList) {
        users[user.id] = user;
    }
    return submissions.map((s) => ({ ...s, user: users[s.user_id] }));
}
/**
 * Take the raw submissions data and create a hash from submission
 * id to the list of question_ids in the order that that user had them
 *
 * @param {*} data
 */
function submissionsToSubmissionsHash(data) {
    const ret = {};
    for (const submission of data) {
        const questions = [...submission.quiz_submission_questions];
        questions.sort((a, b) => a.position - b.position);
        ret[submission.submission_id] = questions.map((q) => q.id);
    }

    return ret;
}

export function formatSubmissionsAsCSV(submissions) {
    let ret = "last,first,utorid,quercus_id,id,end_at,questions\n";
    return (
        ret +
        submissions
            .map((sub) =>
                [
                    sub.user.sortable_name,
                    sub.user.sis_user_id,
                    sub.user.id,
                    sub.user.integration_id,
                    sub.end_at,
                    ...sub.questions,
                ].join(",")
            )
            .join("\n")
    );
}

/**
 * Given data returned from the API, unwrap it and
 * return the "primary array".
 *
 * @param {*} data
 * @returns
 */
function getPrimaryData(data) {
    if (Array.isArray(data)) {
        return data;
    }
    const keys = Object.keys(data);
    if (keys.length === 0) {
        return data;
    }
    if (keys.length === 1) {
        return data[keys[0]];
    }
    if (data.meta) {
        return data[data.meta.primaryCollection];
    }
    return data;
}

export const quizGlobal = new Quiz();
