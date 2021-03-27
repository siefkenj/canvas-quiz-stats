/**
 * Wrapped console.log function.
 *
 * @export
 * @param {*} args
 */
export function log(...args) {
    console.log("Userscript (React Mode):", ...args);
}

/**
 * Wrapped version of `fetch` that logs the output as it's being fetched.
 * It also specifies the full path, because in Greasemonkey, the full path is needed.
 *
 * @param {string} arg
 * @returns {Promise} - the `fetch` promise
 */
export function logFetch(arg) {
    const url = new URL(arg, window.location);
    log("GET request", "" + url);
    return fetch("" + url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json+canvas-string-ids",
        },
    });
}

/**
 * Wrapped version of `fetch` that logs the output as it's being fetched.
 * It also specifies the full path, because in Greasemonkey, the full path is needed.
 *
 * @param {string} url
 * @returns {Promise} - the `fetch` promise
 */
export function logPut(url, body = {}) {
    url = new URL(url, window.location);
    log("PUT request", "" + url, body);
    return fetch("" + url, {
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json+canvas-string-ids",
        },
        body: JSON.stringify({ ...body, authenticity_token: getCSRFToken() }),
        method: "PUT",
    });
}

/**
 * Ensure `callback` is called every time window.location changes
 * Code derived from https://stackoverflow.com/questions/3522090/event-when-window-location-href-changes
 *
 * @export
 * @param {function} callback - function to be called when URL changes
 * @returns {MutationObserver} - MutationObserver that watches the URL
 */
export function addLocationChangeCallback(callback) {
    // Run the callback once right at the start
    window.setTimeout(callback, 0);

    // Set up a `MutationObserver` to watch for changes in the URL
    let oldHref = window.location.href;
    const body = document.querySelector("body");
    const observer = new MutationObserver((mutations) => {
        if (mutations.some(() => oldHref !== document.location.href)) {
            oldHref = document.location.href;
            callback();
        }
    });

    observer.observe(body, { childList: true, subtree: true });
    return observer;
}

export function getCSRFToken() {
    const csrfCookie = document.cookie
        .split(";")
        .find((v) => v.trim().startsWith("_csrf_token="));
    if (csrfCookie) {
        return decodeURIComponent(csrfCookie.trim().slice(12));
    }
}

/**
 * Awaits for an element with the specified `selector` to be found
 * and then returns the selected dom node.
 * This is used to delay rendering a widget until its parent appears.
 *
 * @export
 * @param {string} selector
 * @returns {DOMNode}
 */
export async function awaitElement(selector) {
    const MAX_TRIES = 60;
    let tries = 0;
    return new Promise((resolve, reject) => {
        function probe() {
            tries++;
            return document.querySelector(selector);
        }

        function delayedProbe() {
            if (tries >= MAX_TRIES) {
                log("Can't find element with selector", selector);
                reject();
                return;
            }
            const elm = probe();
            if (elm) {
                resolve(elm);
                return;
            }

            window.setTimeout(delayedProbe, 250);
        }

        delayedProbe();
    });
}

/**
 * Take the html of a quiz edit page and return a list of question/group ids
 * in the same order that they appear in the page.
 *
 * An edit url might look like `/courses/${this.courseId}/quizzes/${this.quizId}/edit`
 *
 * @export
 * @param {*} html
 * @returns
 */
export function quizHtmlToOrder(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    // Question groups have a `data-group-id` attribute. Questions have a `id="question_XXXXXX"`
    // attribute. We want to find them both, because they're all interleaved.
    const nodes = doc.querySelectorAll(
        "div[data-group-id], div.question[id^='question_']"
    );
    let seen = {};
    const ids = Array.from(nodes)
        .map((node) => {
            let attr = node.getAttribute("id");
            if (attr.match(/question_(\d+)/)) {
                return attr.match(/question_(\d+)/)[1];
            } else {
                return node.getAttribute("data-group-id");
            }
        })
        // Make sure each id only appears once
        .filter((id) => {
            if (seen[id]) {
                return false;
            }
            seen[id] = true;
            return true;
        });
    return ids;
}

/**
 * Turn a question list into a flat hash of questions by their id.
 * If there are questions inside a question group, they are extracted.
 *
 * @export
 * @param {*} questions
 * @returns
 */
export function quizQuestionsToHash(questions) {
    const ret = {};

    for (const q of questions) {
        if (q.type === "question_group") {
            for (const innerQ of q.questions) {
                ret[innerQ.id] = innerQ;
            }
        } else {
            ret[q.id] = q;
        }
    }
    return ret;
}

/**
 * Given a answer from a `submission_data` array and
 * a hash of question ids -> questions, normalize the answers.
 *
 * @export
 * @param {*} answer
 * @param {*} questionHash
 * @returns
 */
export function processSubmittedAnswer(answer, questionHash) {
    const question = questionHash[answer.question_id];
    if (question == null) {
        log("WARNING. Could not find question for answer", answer);
        return { question_id: question.id, answers: answer };
    }
    let ret;
    switch (question.question_type) {
        case "essay_question":
            return { question_id: question.id, answers: [answer.text] };
        case "multiple_answers_question":
            // Multiple answer question responses are recorded in fields like
            // {
            //      answer_XXXXX: "0",
            //      answer_YYYYY: "1"
            // }
            // where XXXXX and YYYYY are choice ids and "0"/"1" indicate whether
            // they selected that choice.
            ret = [];
            for (const [key, val] of Object.entries(answer)) {
                if (key.startsWith("answer_")) {
                    if (+val > 0) {
                        ret.push(key.slice(7));
                    }
                }
            }
            return { question_id: question.id, answers: ret };
        case "multiple_choice_question":
            return { question_id: question.id, answers: [answer.answer_id] };
        case "text_only_question":
            return null;
        default:
            log("WARNING. Unknown question type", question.question_type);
            return { question_id: question.id, answers: answer };
    }
}
