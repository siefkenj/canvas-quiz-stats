/**
 * Add the "Rubric JSON" button to Gradescope's rubric editor page.
 *
 * The tool is rendered into a shadow root attached to <body>, outside Gradescope's React app
 * (which may re-render its own DOM at any time), so its styles and Gradescope's stay separate.
 */
import React from "react";
import { createRoot, type Root } from "react-dom/client";
import css from "./rubric-tool.css?inline";
import { GradescopeClient } from "./api";
import { RubricTool } from "./RubricTool";
import { styleShadowRoot } from "../shadow-styles";

const HOST_ID = "canvas-quiz-stats-rubric-tool";

/** The course and assignment of a rubric editor URL, or null for any other page. */
export function rubricEditorRoute(pathname: string) {
    const m = pathname.match(/^\/courses\/(\d+)\/assignments\/(\d+)\/rubric\/edit\/?$/);
    return m ? { courseId: Number(m[1]), assignmentId: Number(m[2]) } : null;
}

export interface MountOptions {
    /** Defaults to the page's own `fetch`; the dev harness passes a mock. */
    fetch?: typeof fetch;
}

let mounted: { root: Root; host: HTMLElement; path: string } | null = null;

/** Show the tool if the current page is a rubric editor; remove it otherwise. */
export function updateRubricTool(options: MountOptions = {}) {
    const route = rubricEditorRoute(window.location.pathname);
    if (mounted && mounted.path !== window.location.pathname) {
        mounted.root.unmount();
        mounted.host.remove();
        mounted = null;
    }
    if (!route || mounted || !document.body) {
        return;
    }
    const csrfToken = document.querySelector<HTMLMetaElement>('meta[name="csrf-token"]')?.content;
    if (!csrfToken) {
        return; // not logged in
    }

    const host = document.createElement("div");
    host.id = HOST_ID;
    document.body.appendChild(host);
    const shadow = host.attachShadow({ mode: "open" });
    styleShadowRoot(shadow, css);
    const container = document.createElement("div");
    shadow.appendChild(container);

    const client = new GradescopeClient({
        origin: window.location.origin,
        courseId: route.courseId,
        assignmentId: route.assignmentId,
        csrfToken,
        fetch: options.fetch,
    });
    const root = createRoot(container);
    root.render(<RubricTool client={client} />);
    mounted = { root, host, path: window.location.pathname };
}
