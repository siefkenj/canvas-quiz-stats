import React from "react";
import { log } from "../utils";
import { Button, Spinner } from "react-bootstrap";
import { quizGlobal, formatSubmissionsAsCSV } from "../quiz-global";
import RouteParser from "route-parser";

// An example of a query to get details of a specific quiz
// https://q.utoronto.ca/api/v1/quiz_submissions/3791304/questions
// /api/v1/courses/181873/quizzes/115457/submissions?include[]=user&include[]=submission&per_page=20&page=2

export function ViewSubmissions(props) {
    const [spinner, setSpinner] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [progress, setProgress] = React.useState({});

    function fetchQuizSubmissions() {
        setSpinner(true);
        const route = RouteParser("*start/courses/:courseId/quizzes/:quizId");
        const match = route.match(window.location);
        quizGlobal.init(match);
        setResult(null);
        quizGlobal
            .fetchSubmissions(setProgress)
            .then((q) => q)
            .catch((e) => {
                log(e);
                setResult(e);
            })
            .finally(() => setSpinner(false));
    }

    return (
        <div className="my-2">
            <p>
                When fetched, quiz submissions appear in the textbox below. They
                can be copy-and-pasted into a CSV document. The questions are
                listed by Quercus question id in the order that they appear in a
                given student's test.{" "}
                <i style={{ fontFamily: "monospace" }}>end_at</i> lists the time
                that a student's test was scheduled to finish (not the time they
                actually submitted).
            </p>
            <div className="my-2">
                <Button
                    title="Fetch all quiz submissions. This could take a while!"
                    onClick={fetchQuizSubmissions}
                >
                    {spinner && (
                        <Spinner
                            animation="border"
                            role="status"
                            className="mr-2"
                            size="sm"
                        />
                    )}
                    Fetch Quiz Submissions
                </Button>
                {(spinner && progress.status && (
                    <span className="mx-3">
                        {" "}
                        Fetching Quiz Submissions ({progress.message})
                    </span>
                )) || <> This could take a while</>}
            </div>
            <textarea
                style={{ width: "100%" }}
                value={
                    result ||
                    (!!progress.partialData &&
                        formatSubmissionsAsCSV(progress.partialData)) ||
                    ""
                }
                rows={20}
                onChange={() => {}}
            ></textarea>
        </div>
    );
}
