import React from "react";
import { logFetch, log } from "../utils";
import { Button, Spinner } from "react-bootstrap";

// An example of a query to get details of a specific quiz
// https://q.utoronto.ca/api/v1/quiz_submissions/3791304/questions
// /api/v1/courses/181873/quizzes/115457/submissions?include[]=user&include[]=submission&per_page=20&page=2

export function QueryApi(props) {
    const [spinner, setSpinner] = React.useState(false);
    const [url, setUrl] = React.useState("");
    const [result, setResult] = React.useState("");

    async function query() {
        setSpinner(true);
        try {
            const resp = await logFetch(unescape(url));
            const json = await resp.json();
            log("Raw result", json);
            setResult(JSON.stringify(json, null, 4));
        } catch (e) {
            setResult("Error encountered. See console.");
            log(e);
        } finally {
            setSpinner(false);
        }
    }

    return (
        <div className="my-2">
            <p>
                Enter the API endpoint to be queried. A prefix of{" "}
                <i>https://q.utoronto.ca</i> is automatically added. Check the{" "}
                <a href="https://canvas.instructure.com/doc/api/">
                    Canvas API Documentation
                </a>
                for details. All results are returned as JSON.
            </p>
            <input
                className="query-input"
                value={url}
                onChange={(e) => {
                    setUrl(e.target.value);
                }}
            />
            Unescaped URL:
            <input
                value={unescape(url)}
                className="query-input"
                onChange={() => {}}
            />
            <Button onClick={query}>
                {spinner && <Spinner animation="border" role="status" />}
                Query
            </Button>
            <div style={{ whiteSpace: "pre" }}>{result}</div>
        </div>
    );
}
