/**
 * The Gradescope rubric endpoints, as used by Gradescope's own rubric editor (found by recording
 * the editor's requests; there is no public API). See "Gradescope rubric endpoints" in the README.
 */
import { Assignment } from "./assignment";
import type { GsQuestionUrls, GsRubricPayload } from "./types";

export interface ClientOptions {
    /** e.g. "https://www.gradescope.ca" */
    origin: string;
    courseId: number;
    assignmentId: number;
    csrfToken: string;
    fetch?: typeof fetch;
}

/** Firefox's content-script global; see `pageFetch`. */
declare const content: { fetch?: typeof fetch } | undefined;

/**
 * A `fetch` that makes requests as the page itself. Greasemonkey runs userscripts as Firefox
 * content scripts, whose own `fetch` doesn't use the page's cookies when Gradescope is embedded
 * in Canvas (Firefox keeps a third-party frame's cookies separately), so Gradescope answers 401.
 * Firefox's `content.fetch` sends the request from the page instead.
 */
function pageFetch(): typeof fetch {
    if (typeof content !== "undefined" && typeof content?.fetch === "function") {
        return content.fetch.bind(content);
    }
    return window.fetch.bind(window);
}

export class HttpError extends Error {
    constructor(
        readonly method: string,
        readonly url: string,
        readonly status: number,
        statusText: string
    ) {
        super(`${method} ${url} failed: ${status} ${statusText}`);
    }
}

export class GradescopeClient {
    private readonly options: ClientOptions;
    private payload: GsRubricPayload | null = null;

    constructor(options: ClientOptions) {
        this.options = options;
    }

    private get base() {
        return `${this.options.origin}/courses/${this.options.courseId}`;
    }

    private async request(method: string, url: string, body?: unknown) {
        const doFetch = this.options.fetch ?? pageFetch();
        const absolute = new URL(url, this.options.origin).href;
        const res = await doFetch(absolute, {
            method,
            credentials: "include",
            headers: {
                Accept: "application/json, text/javascript, */*; q=0.01",
                "Content-Type": "application/json",
                "X-CSRF-Token": this.options.csrfToken,
                "X-Requested-With": "XMLHttpRequest",
            },
            body: body === undefined ? undefined : JSON.stringify(body),
        });
        if (!res.ok) {
            throw new HttpError(method, absolute, res.status, res.statusText);
        }
        const text = await res.text();
        try {
            return text ? JSON.parse(text) : null;
        } catch {
            return text;
        }
    }

    /** Fetch the assignment's questions and rubric. */
    async load(): Promise<Assignment> {
        this.payload = await this.request(
            "GET",
            `${this.base}/assignments/${this.options.assignmentId}/rubric/edit.json`
        );
        return new Assignment(this.payload!);
    }

    private url(questionId: number, key: keyof GsQuestionUrls, fallback: string) {
        return (
            this.payload?.urls?.question_urls?.[questionId]?.[key] ??
            `${this.base}/questions/${questionId}/${fallback}`
        );
    }

    async createItem(questionId: number, description: string, weight: string): Promise<number> {
        const res = await this.request("POST", this.url(questionId, "rubric_item", "rubric_items"), {
            rubric_item: { description, weight, group_id: null },
        });
        const id = res?.id ?? res?.rubric_item?.id;
        if (!Number.isInteger(id)) {
            throw new Error(`Creating an item returned no id: ${JSON.stringify(res).slice(0, 200)}`);
        }
        return id;
    }

    async createGroup(
        questionId: number,
        description: string,
        mutuallyExclusive: boolean,
        items: { description: string; weight: string }[]
    ): Promise<number> {
        const res = await this.request(
            "POST",
            this.url(questionId, "create_group_with_items", "rubric/create_group_with_items"),
            {
                rubric_item_group: {
                    description,
                    ...(mutuallyExclusive ? { mutually_exclusive: true } : {}),
                },
                rubric_items: items,
            }
        );
        const id = res?.rubric_item_group?.id;
        if (!Number.isInteger(id)) {
            throw new Error(`Creating a group returned no id: ${JSON.stringify(res).slice(0, 200)}`);
        }
        return id;
    }

    /** Delete a rubric item. A 404 means it is already gone, which is fine. */
    async deleteItem(questionId: number, itemId: number) {
        await this.ignore404(() =>
            this.request("DELETE", `${this.url(questionId, "rubric_item", "rubric_items")}/${itemId}`)
        );
    }

    /** Delete a rubric item group. A 404 means it is already gone, which is fine. */
    async deleteGroup(questionId: number, groupId: number) {
        await this.ignore404(() =>
            this.request(
                "DELETE",
                `${this.url(questionId, "rubric_item_groups", "rubric_item_groups")}/${groupId}`
            )
        );
    }

    /** Set the top-level order of a question's ungrouped items and groups. */
    async setPositions(
        questionId: number,
        entries: { kind: "item" | "group"; id: number }[]
    ) {
        const rubric_items: Record<number, { position: number }> = {};
        const rubric_item_groups: Record<number, { position: number }> = {};
        entries.forEach(({ kind, id }, position) => {
            (kind === "group" ? rubric_item_groups : rubric_items)[id] = { position };
        });
        await this.request(
            "PATCH",
            this.url(questionId, "update_rubric_entries", "rubric/update_entries"),
            { question_id: questionId, rubric_items, rubric_item_groups }
        );
    }

    private async ignore404(f: () => Promise<unknown>) {
        try {
            await f();
        } catch (e) {
            if (!(e instanceof HttpError && e.status === 404)) {
                throw e;
            }
        }
    }
}
