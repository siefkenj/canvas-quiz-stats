/**
 * Add the "Outline JSON" button to Gradescope's outline editor page.
 *
 * Like the Rubric JSON tool (see ../rubric/mount.tsx), it is rendered into a shadow root attached
 * to <body>, with the rubric tool's styles and a few of its own.
 */
import React from "react";
import { createRoot, type Root } from "react-dom/client";
import rubricCss from "../rubric/rubric-tool.css?inline";
import css from "./outline-tool.css?inline";
import { OutlineClient } from "./api";
import { OutlineTool } from "./OutlineTool";
import { styleShadowRoot } from "../shadow-styles";

const HOST_ID = "canvas-quiz-stats-outline-tool";

/** The course and assignment of an outline editor URL, or null for any other page. */
export function outlineEditorRoute(pathname: string) {
    const m = pathname.match(/^\/courses\/(\d+)\/assignments\/(\d+)\/outline\/edit\/?$/);
    return m ? { courseId: Number(m[1]), assignmentId: Number(m[2]) } : null;
}

let mounted: { root: Root; host: HTMLElement; path: string } | null = null;

/** Show the tool if the current page is an outline editor; remove it otherwise. */
export function updateOutlineTool(options: { fetch?: typeof fetch } = {}) {
    const route = outlineEditorRoute(window.location.pathname);
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
    styleShadowRoot(shadow, rubricCss + css);
    const container = document.createElement("div");
    shadow.appendChild(container);

    const client = new OutlineClient({
        origin: window.location.origin,
        courseId: route.courseId,
        assignmentId: route.assignmentId,
        csrfToken,
        fetch: options.fetch,
    });
    const root = createRoot(container);
    root.render(<OutlineTool client={client} />);
    mounted = { root, host, path: window.location.pathname };
}
