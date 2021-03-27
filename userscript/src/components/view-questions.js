import React from "react";
import { Button, Spinner } from "react-bootstrap";
import { quizGlobal } from "../quiz-global";
import { Question } from "./question";
import RouteParser from "route-parser";
import FileSaver from "file-saver";

// An example of a query to get details of a specific quiz
// https://q.utoronto.ca/api/v1/quiz_submissions/3791304/questions
// /api/v1/courses/181873/quizzes/115457/submissions?include[]=user&include[]=submission&per_page=20&page=2

export function ViewQuestions() {
    const [spinner, setSpinner] = React.useState(false);
    const [result, setResult] = React.useState("");
    const [questions, setQuestions] = React.useState([]);
    const divRef = React.useRef(null);

    const numQuestions = questions
        .map((x) => (x.questions ? x.questions.length : 1))
        .reduce((a, b) => a + b, 0);

    React.useEffect(() => {
        setSpinner(true);
        const route = RouteParser("*start/courses/:courseId/quizzes/:quizId");
        const match = route.match(window.location);
        quizGlobal.init(match);
        quizGlobal
            .fetchQuestions()
            .then((q) => setQuestions(q))
            .catch((e) => setResult(e))
            .finally(() => setSpinner(false));
    }, []);

    /**
     * Make the questions printable by setting them as the page body
     * (because normally only the first page of a dialog's content is printable.).
     *
     */
    function print() {
        if (divRef.current) {
            document.body.innerHTML = divRef.current.outerHTML;
            document.body.style.overflow = "visible";
            document.body.style.padding = "1em";
        }
    }

    function download() {
        FileSaver.saveAs(
            new Blob([JSON.stringify(questions, null, 4)], {
                type: "application/json",
            }),
            "quiz-questions.json"
        );
    }

    return (
        <div className="my-2">
            {spinner && (
                <>
                    <Spinner animation="border" role="status" /> Fetching Quiz
                    Questions
                </>
            )}
            <div style={{ whiteSpace: "pre" }}>{result}</div>
            <h4>
                Displaying {numQuestions} questions{" "}
                <Button onClick={print} className="mr-2">
                    Make Printable
                </Button>
                <Button onClick={download}>Download Questions</Button>
            </h4>
            <div ref={divRef}>
                {questions.map((question, i) => (
                    <Question data={question} key={i} />
                ))}
            </div>
        </div>
    );
}
