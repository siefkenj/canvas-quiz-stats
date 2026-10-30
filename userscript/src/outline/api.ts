/**
 * The Gradescope outline endpoints, as used by Gradescope's own outline editor (found by
 * recording the editor's requests; there is no public API). See "Gradescope outline endpoints"
 * in the README.
 */
import { HttpError, pageFetch } from "../rubric/api";
import type { GsOutlineProps, OutlinePayload } from "./types";

export interface OutlineClientOptions {
    /** e.g. "https://www.gradescope.ca" */
    origin: string;
    courseId: number;
    assignmentId: number;
    csrfToken: string;
    fetch?: typeof fetch;
}

/** The outline editor's props, from the `AssignmentOutline` element of its page. */
export function outlineProps(doc: Document): GsOutlineProps | null {
    const el = doc.querySelector<HTMLElement>('[data-react-class="AssignmentOutline"]');
    const props = el?.dataset.reactProps;
    return props ? (JSON.parse(props) as GsOutlineProps) : null;
}

export class OutlineClient {
    private readonly options: OutlineClientOptions;

    constructor(options: OutlineClientOptions) {
        this.options = options;
    }

    private get base() {
        return `${this.options.origin}/courses/${this.options.courseId}/assignments/${this.options.assignmentId}`;
    }

    private async request(method: string, url: string, { body, accept = "application/json, text/javascript, */*; q=0.01" }: { body?: unknown; accept?: string } = {}) {
        const doFetch = this.options.fetch ?? pageFetch();
        const res = await doFetch(url, {
            method,
            credentials: "include",
            headers: {
                Accept: accept,
                "Content-Type": "application/json",
                "X-CSRF-Token": this.options.csrfToken,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
        if (!res.ok) {
            throw new HttpError(method, url, res.status, res.statusText);
        }
        return res.text();
    }

    /** The outline as Gradescope has it now, read from a fresh copy of the editor's page. */
    async load(): Promise<GsOutlineProps> {
        const html = await this.request("GET", `${this.base}/outline/edit`, { accept: "text/html" });
        const props = outlineProps(new DOMParser().parseFromString(html, "text/html"));
        if (!props) {
            throw new Error("Gradescope's outline editor page has no outline data (AssignmentOutline).");
        }
        return props;
    }

    /**
     * Which of questions `ids` have grading data, as Gradescope's editor asks before deleting
     * them. Gradescope answers `{}` when none has; anything else counts as grading for all of them.
     */
    async gradedQuestions(ids: number[]): Promise<number[]> {
        if (ids.length === 0) {
            return [];
        }
        const query = ids.map((id) => `question_ids%5B%5D=${id}`).join("&");
        const text = await this.request("GET", `${this.base}/question_grading_data?${query}`);
        const data = text ? JSON.parse(text) : {};
        if (!data || typeof data !== "object" || Object.keys(data).length === 0) {
            return [];
        }
        const named = ids.filter((id) => String(id) in data);
        return named.length ? named : ids;
    }

    /** Save the whole outline, as the editor's Save button does. */
    async save(payload: OutlinePayload) {
        await this.request("PATCH", `${this.base}/outline/`, { body: payload });
    }
}
