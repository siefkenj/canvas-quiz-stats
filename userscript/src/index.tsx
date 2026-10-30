import React from "react";
import { createRoot } from "react-dom/client";
import indexCss from "./index.css?inline";
import appCss from "./App.css?inline";
import bootstrapCss from "./namespaced-bootstrap.css?inline";
import App from "./App";
import {
    awaitElement,
    log,
    addLocationChangeCallback,
    injectStyles,
} from "./utils";
import RouteParser from "route-parser";
import { quizGlobal } from "./quiz-global";
import {
    isGradescope,
    runInCanvas,
    runInGradescope,
} from "./gradescope-bridge";
import { updateRubricTool } from "./rubric/mount";
import { updateOutlineTool } from "./outline/mount";

// Do required initial work. Gets called every time the URL changes,
// so that elements can be re-inserted as a user navigates a page with
// different routes.
async function main() {
    // Find <body/>. This can be any element. We wait until
    // the page has loaded enough for that element to exist.
    const body = await awaitElement(".header-bar");
    const container = document.createElement("div");

    const route = RouteParser("*start/courses/:courseId/quizzes/:quizId");
    const match = route.match(window.location);
    if (match) {
        quizGlobal.init(match);
        log(quizGlobal);
        body.appendChild(container);
        const root = createRoot(container);
        root.render(<App />);
    }
}

if (isGradescope()) {
    // On Gradescope: link rewriting, the Rubric JSON tool on rubric editor pages, and the Outline
    // JSON tool on outline editor pages. None uses Canvas's styles (the tools style themselves
    // inside shadow roots).
    log("Gradescope script started", window.location.href);
    runInGradescope();
    addLocationChangeCallback(() => {
        for (const update of [updateRubricTool, updateOutlineTool]) {
            try {
                update();
            } catch (e) {
                log(e);
            }
        }
    });
} else {
    log("React script has successfully started");
    injectStyles(indexCss + appCss + bootstrapCss);
    runInCanvas();

    // Call `main()` every time the page URL changes, including on first load.
    addLocationChangeCallback(() => {
        // Greasemonkey doesn't bubble errors up to the main console,
        // so we have to catch them manually and log them
        main().catch((e) => {
            log(e);
        });
    });
}
