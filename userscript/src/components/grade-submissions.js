import React from "react";
import { log } from "../utils";
import { Button, InputGroup, FormControl } from "react-bootstrap";
import { quizGlobal } from "../quiz-global";
import RouteParser from "route-parser";
import { Question } from "./question";

// An example of a query to set the score of a specific question is:
// fetch(
//     "https://q.utoronto.ca/api/v1/courses/181873/quizzes/115457/submissions/3980153",
//     {
//         credentials: "include",
//         headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json+canvas-string-ids",
//         },
//         method: "put",
//         body: JSON.stringify({
//             quiz_submissions: [
//                 {
//                     attempt: 1,
//                     questions: {
//                         1170712: {
//                             score: 0,
//                             comment: "Not counted towards score",
//                         },
//                     },
//                 },
//             ],
//             authenticity_token:
//                 "Xc4fXLY3WlbmXARvgo9udQ63Wr/i+SW+LhA3tPatKqwHrCY9x1wfYqtsMQfluCc9S/A89re0f/JdKVXHvcB46w==",
//         }),
//     }
// );

export function GradeSubmissions() {
    const [questionId, setQuestionId] = React.useState("");
    const [spinner, setSpinner] = React.useState(false);
    let [submissions, setSubmissions] = React.useState([]);
    const [progress, setProgress] = React.useState({});
    const [gradingProgress, setGradingProgress] = React.useState({});
    const [questions, setQuestions] = React.useState([]);
    const [points, setPoints] = React.useState("0");
    const questionsById = {};
    for (const question of questions) {
        questionsById[question.id] = question;
    }

    // The questions are fetched when the tab is loaded. That way they can be previewed.
    React.useEffect(() => {
        setSpinner(true);
        const route = RouteParser("*start/courses/:courseId/quizzes/:quizId");
        const match = route.match(window.location);
        quizGlobal.init(match);
        quizGlobal
            .fetchQuestions({ asFlatList: true })
            .then((q) => setQuestions(q))
            .catch((e) => setSubmissions(e))
            .finally(() => setSpinner(false));
    }, []);

    function fetchQuizSubmissions() {
        setSpinner(true);
        const route = RouteParser("*start/courses/:courseId/quizzes/:quizId");
        const match = route.match(window.location);
        quizGlobal.init(match);
        setSubmissions([]);
        quizGlobal
            .fetchSubmissionIds(setProgress)
            .then(setSubmissions)
            .catch((e) => {
                log(e);
            })
            .finally(() => setSpinner(false));
    }

    function gradeQuizSubmissions() {
        setSpinner(true);
        const route = RouteParser("*start/courses/:courseId/quizzes/:quizId");
        const match = route.match(window.location);
        quizGlobal.init(match);
        quizGlobal
            .gradeSubmissions(
                //[{ attempt: 1, id: "3980153" }],
                submissions,
                { score: points, id: questionId },
                setGradingProgress
            )
            .then(() => {})
            .catch((e) => {
                log(e);
            })
            .finally(() => setSpinner(false));
    }

    let submissionSummary =
        (submissions || []).length > 0 && !spinner ? (
            <span className="mx-3">
                Found {(submissions || []).length} submissions
            </span>
        ) : (
            progress.status && (
                <span className="mx-3">
                    {" "}
                    Fetching Quiz Submissions ({progress.message})
                </span>
            )
        );
    let gradingSummary = gradingProgress.status && (
        <span className="mx-3">
            {" "}
            Grading Submissions ({gradingProgress.message})
        </span>
    );

    const question = questionsById[questionId];
    const disabled = !question || !submissions.length;
    return (
        <div className="my-2">
            <p>
                Set a uniform grade for a specific question. For example, this
                can be used to set a mark for essay questions without going
                through the speed grader. The question ID can be found from the{" "}
                <i>Quiz Questions</i> tab.
            </p>
            <InputGroup
                title="The internal Quercus ID for the question you want graded."
                className="my-2"
            >
                <InputGroup.Prepend>
                    <InputGroup.Text>Question ID</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={questionId}
                    onChange={(e) => setQuestionId(e.target.value)}
                />
            </InputGroup>
            <div>
                <h3>Question Preview</h3>
                <div className="ml-4">
                    {question ? (
                        <Question data={question} />
                    ) : (
                        <p>No valid question to preview.</p>
                    )}
                </div>
            </div>
            <div className="my-2">
                <Button onClick={fetchQuizSubmissions}>
                    Fetch Submissions to be Marked
                </Button>
                {submissionSummary}
            </div>
            <InputGroup
                title="How many points to grade all the submissions"
                className="my-2"
            >
                <InputGroup.Prepend>
                    <InputGroup.Text>Set all submissions to</InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl
                    value={points}
                    onChange={(e) => setPoints(e.target.value)}
                />
                <InputGroup.Append>
                    <InputGroup.Text>
                        out of {question ? question.points_possible : "?"}
                    </InputGroup.Text>
                </InputGroup.Append>
            </InputGroup>
            <Button
                title={"Grade all submissions"}
                disabled={disabled}
                className="mr-2"
                onClick={gradeQuizSubmissions}
            >
                Grade Submissions
            </Button>
            {disabled &&
                "You must download the submission and specify a question before grading"}{" "}
            {gradingSummary}
        </div>
    );
}
