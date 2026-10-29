/**
 * An in-memory imitation of Gradescope's rubric endpoints, for the dev harness and the tests.
 * Request and response shapes follow requests recorded from Gradescope's own rubric editor.
 * Never part of the built userscript.
 */
import type {
    GsQuestion,
    GsRubricItem,
    GsRubricItemGroup,
    GsRubricPayload,
} from "../src/rubric/types";

export interface MockOptions {
    /** Delete a group's items along with it (unknown for real Gradescope; default false). */
    cascadeGroupDelete: boolean;
    hasSubmissions: boolean;
    rubricsLocked: boolean;
    /** Respond to the next request with this HTTP status instead of handling it. */
    failNextWith: number | null;
    latencyMs: number;
}

export interface MockState {
    payload: GsRubricPayload;
    nextId: number;
}

export class MockGradescope {
    state: MockState;
    options: MockOptions;
    /** Every request handled, as "METHOD /path". */
    readonly requests: string[] = [];
    private readonly csrfToken: string;

    constructor(seed: GsRubricPayload, csrfToken: string, options: Partial<MockOptions> = {}) {
        this.state = { payload: structuredClone(seed), nextId: 900000 };
        this.csrfToken = csrfToken;
        this.options = {
            cascadeGroupDelete: false,
            hasSubmissions: false,
            rubricsLocked: false,
            failNextWith: null,
            latencyMs: 0,
            ...options,
        };
    }

    private get items() {
        return this.state.payload.rubric_items;
    }
    private get groups() {
        return this.state.payload.rubric_item_groups;
    }
    private topLevelCount(questionId: number) {
        return (
            this.items.filter((i) => i.question_id === questionId && i.group_id == null).length +
            this.groups.filter((g) => g.question_id === questionId).length
        );
    }
    private question(id: number): GsQuestion | undefined {
        const all: GsQuestion[] = [];
        const walk = (qs: GsQuestion[]) =>
            qs.forEach((q) => {
                all.push(q);
                walk(q.children ?? []);
            });
        walk(this.state.payload.questions);
        return all.find((q) => q.id === id);
    }

    /** A `fetch` replacement that serves the rubric endpoints. */
    fetch = async (input: RequestInfo | URL, init: RequestInit = {}): Promise<Response> => {
        const url = new URL(typeof input === "string" ? input : input instanceof URL ? input.href : input.url);
        const method = (init.method ?? "GET").toUpperCase();
        this.requests.push(`${method} ${url.pathname}`);
        if (this.options.latencyMs) {
            await new Promise((r) => setTimeout(r, this.options.latencyMs));
        }
        const json = (body: unknown, status = 200) =>
            new Response(JSON.stringify(body), {
                status,
                headers: { "Content-Type": "application/json" },
            });
        if (this.options.failNextWith) {
            const status = this.options.failNextWith;
            this.options.failNextWith = null;
            return json({ error: "Simulated failure" }, status);
        }
        const headers = new Headers(init.headers);
        if (headers.get("X-CSRF-Token") !== this.csrfToken) {
            return json({ error: "Invalid authenticity token" }, 422);
        }
        if (headers.get("X-Requested-With") !== "XMLHttpRequest") {
            return new Response("<html>not json</html>", { status: 200 });
        }
        const body = init.body ? JSON.parse(String(init.body)) : undefined;
        if (method !== "GET" && this.options.rubricsLocked) {
            return json({ error: "Rubrics are locked" }, 403);
        }

        let m: RegExpMatchArray | null;
        const path = url.pathname;
        if (method === "GET" && /^\/courses\/\d+\/assignments\/\d+\/rubric\/edit\.json$/.test(path)) {
            return json({
                ...this.state.payload,
                has_submissions_and_students: this.options.hasSubmissions,
                rubrics_locked: this.options.rubricsLocked,
            });
        }
        if ((m = path.match(/^\/courses\/\d+\/questions\/(\d+)\/(.+)$/))) {
            const questionId = Number(m[1]);
            const rest = m[2];
            if (!this.question(questionId)) {
                return json({ error: "Not Found" }, 404);
            }
            const weight = (w: unknown) => {
                if (typeof w !== "string" || !Number.isFinite(parseFloat(w))) {
                    throw new Error(`weight must be a numeric string, got ${JSON.stringify(w)}`);
                }
                // Like Gradescope: "1.0", "0.5", "0.25"
                const n = parseFloat(w);
                return Number.isInteger(n) ? n.toFixed(1) : String(n);
            };
            try {
                if (method === "POST" && rest === "rubric_items") {
                    const r = body.rubric_item;
                    const groupId = r.group_id ?? null;
                    const item: GsRubricItem = {
                        id: this.state.nextId++,
                        description: r.description,
                        weight: weight(r.weight),
                        position:
                            groupId == null
                                ? this.topLevelCount(questionId)
                                : this.items.filter((i) => i.group_id === groupId).length,
                        group_id: groupId,
                        question_id: questionId,
                    };
                    this.items.push(item);
                    return json({ ...item, explanation: null, locked: false });
                }
                if ((m = rest.match(/^rubric_items\/(\d+)$/))) {
                    const index = this.items.findIndex(
                        (i) => i.id === Number(m![1]) && i.question_id === questionId
                    );
                    if (index < 0) {
                        return json({ error: "Not Found" }, 404);
                    }
                    if (method === "PUT") {
                        Object.assign(this.items[index], {
                            description: body.description ?? this.items[index].description,
                            weight: body.weight === undefined ? this.items[index].weight : weight(body.weight),
                        });
                        return json(this.items[index]);
                    }
                    if (method === "DELETE") {
                        this.items.splice(index, 1);
                        return new Response(null, { status: 204 });
                    }
                }
                if (method === "POST" && rest === "rubric/create_group_with_items") {
                    const group: GsRubricItemGroup = {
                        id: this.state.nextId++,
                        position: this.topLevelCount(questionId),
                        description: body.rubric_item_group.description,
                        mutually_exclusive: !!body.rubric_item_group.mutually_exclusive,
                        question_id: questionId,
                    };
                    this.groups.push(group);
                    const items = (body.rubric_items as { description: string; weight: string }[]).map(
                        (r, k): GsRubricItem => ({
                            id: this.state.nextId++,
                            description: r.description,
                            weight: weight(r.weight),
                            position: k,
                            group_id: group.id,
                            question_id: questionId,
                        })
                    );
                    this.items.push(...items);
                    return json({ rubric_item_group: group, rubric_items: items });
                }
                if (method === "DELETE" && (m = rest.match(/^rubric_item_groups\/(\d+)$/))) {
                    const id = Number(m[1]);
                    const index = this.groups.findIndex((g) => g.id === id && g.question_id === questionId);
                    if (index < 0) {
                        return json({ error: "Not Found" }, 404);
                    }
                    this.groups.splice(index, 1);
                    if (this.options.cascadeGroupDelete) {
                        this.state.payload.rubric_items = this.items.filter((i) => i.group_id !== id);
                    }
                    return new Response(null, { status: 204 });
                }
                if (method === "PATCH" && rest === "rubric/update_entries") {
                    for (const [id, { position }] of Object.entries(body.rubric_items ?? {}) as [string, { position: number }][]) {
                        const item = this.items.find((i) => i.id === Number(id));
                        if (item) item.position = position;
                    }
                    for (const [id, { position }] of Object.entries(body.rubric_item_groups ?? {}) as [string, { position: number }][]) {
                        const group = this.groups.find((g) => g.id === Number(id));
                        if (group) group.position = position;
                    }
                    return json({});
                }
            } catch (e) {
                return json({ error: String(e) }, 422);
            }
        }
        return json({ error: "Not Found" }, 404);
    };
}
