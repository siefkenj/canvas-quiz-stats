import { describe, expect, it } from "vitest";
import { GradescopeClient } from "../../src/rubric/api";
import { Assignment } from "../../src/rubric/assignment";
import { uploadPlans } from "../../src/rubric/upload";
import { validateRubricText } from "../../src/rubric/validate";
import { MockGradescope } from "../../dev/mock-gradescope";
import { SEED } from "../../dev/seed";
import type { RubricFile } from "../../src/rubric/types";

const ORIGIN = "https://www.gradescope.ca";
const TOKEN = "test-token";

function setup(options: ConstructorParameters<typeof MockGradescope>[2] = {}) {
    const server = new MockGradescope(SEED, TOKEN, options);
    const client = new GradescopeClient({
        origin: ORIGIN,
        courseId: 1,
        assignmentId: 1,
        csrfToken: TOKEN,
        fetch: server.fetch,
    });
    return { server, client };
}

const file = (questions: RubricFile["questions"]): RubricFile => ({
    format: "gradescope-rubric",
    version: 1,
    assignment: { course_id: 1, assignment_id: 1 },
    questions,
});

const Q1: RubricFile["questions"][number] = {
    number: "1",
    weight: 2,
    scoring: "positive",
    rubric: [
        {
            type: "group",
            description: "**Proof**",
            mutually_exclusive: false,
            items: [
                { type: "item", points: 1, description: "Setup" },
                { type: "item", points: 1, description: "Conclusion" },
            ],
        },
        { type: "item", points: 0, description: "Incorrect" },
    ],
};

/** Validate against the server's current state and return the plans to upload. */
async function plansFor(client: GradescopeClient, f: RubricFile, overwrite: string[] = []) {
    const result = validateRubricText(JSON.stringify(f), await client.load());
    expect(result.errors).toEqual([]);
    return result.plans.filter(
        (p) => p.status === "create" || (p.status === "conflict" && overwrite.includes(p.number))
    );
}

describe("uploadPlans", () => {
    it("fills in a question that has only the default item", async () => {
        const { server, client } = setup();
        const results = await uploadPlans(client, await plansFor(client, file([Q1])), { delayMs: 0 });
        expect(results).toEqual([{ number: "1", ok: true, message: "Uploaded and verified." }]);
        const a = new Assignment(server.state.payload);
        expect(a.toRubricQuestion(a.question("1")!).rubric).toEqual(Q1.rubric);
        // The default item is gone.
        expect(server.state.payload.rubric_items.some((i) => i.id === 1001)).toBe(false);
    });

    it("overwrites an existing rubric, removing items a deleted group leaves behind", async () => {
        const { server, client } = setup({ cascadeGroupDelete: false });
        const q21 = { ...Q1, number: "2.1" };
        const results = await uploadPlans(client, await plansFor(client, file([q21]), ["2.1"]), {
            delayMs: 0,
        });
        expect(results[0].ok).toBe(true);
        const a = new Assignment(server.state.payload);
        expect(a.toRubricQuestion(a.question("2.1")!).rubric).toEqual(q21.rubric);
        for (const id of [1010, 1011, 1012]) {
            expect(server.state.payload.rubric_items.some((i) => i.id === id)).toBe(false);
        }
        expect(server.state.payload.rubric_item_groups.some((g) => g.id === 501)).toBe(false);
    });

    it("also works when deleting a group deletes its items", async () => {
        const { client } = setup({ cascadeGroupDelete: true });
        const results = await uploadPlans(
            client,
            await plansFor(client, file([{ ...Q1, number: "2.1" }]), ["2.1"]),
            { delayMs: 0 }
        );
        expect(results[0].ok).toBe(true);
    });

    it("stores negative-scoring points as Gradescope weights", async () => {
        const { server, client } = setup();
        const q3 = {
            number: "3",
            weight: 3,
            scoring: "negative" as const,
            rubric: [
                { type: "item" as const, points: 0, description: "Correct" },
                { type: "item" as const, points: -1.5, description: "Sign error" },
            ],
        };
        const results = await uploadPlans(client, await plansFor(client, file([q3]), ["3"]), { delayMs: 0 });
        expect(results[0].ok).toBe(true);
        const sign = server.state.payload.rubric_items.find((i) => i.description === "Sign error");
        expect(sign?.weight).toBe("1.5");
    });

    it("leaves unselected and other questions alone", async () => {
        const { server, client } = setup();
        const before = JSON.stringify(
            server.state.payload.rubric_items.filter((i) => i.question_id !== 101)
        );
        await uploadPlans(client, await plansFor(client, file([Q1, { ...Q1, number: "2.1" }])), {
            delayMs: 0,
        });
        expect(
            JSON.stringify(server.state.payload.rubric_items.filter((i) => i.question_id !== 101))
        ).toBe(before);
    });

    it("skips a question whose rubric changed after it was checked", async () => {
        const { server, client } = setup();
        const plans = await plansFor(client, file([Q1]));
        server.state.payload.rubric_items.find((i) => i.id === 1001)!.description = "Edited meanwhile";
        const results = await uploadPlans(client, plans, { delayMs: 0 });
        expect(results[0]).toMatchObject({ ok: false, message: expect.stringMatching(/changed since/) });
        expect(server.requests.filter((r) => !r.startsWith("GET"))).toEqual([]);
    });

    it("reports a failed request and carries on with the next question", async () => {
        const { server, client } = setup();
        const q4 = { number: "4", weight: 1, scoring: "positive" as const, rubric: [{ type: "item" as const, points: 1, description: "Correct" }] };
        const plans = await plansFor(client, file([Q1, q4]));
        const realFetch = server.fetch;
        let posts = 0;
        server.fetch = async (input, init) => {
            if (init?.method === "POST" && ++posts === 1) {
                server.options.failNextWith = 500;
            }
            return realFetch(input, init);
        };
        // GradescopeClient captured the original fetch, so route through a fresh client.
        const failing = new GradescopeClient({ origin: ORIGIN, courseId: 1, assignmentId: 1, csrfToken: TOKEN, fetch: server.fetch });
        const results = await uploadPlans(failing, plans, { delayMs: 0 });
        expect(results[0]).toMatchObject({ number: "1", ok: false, message: expect.stringMatching(/Failed while creating/) });
        expect(results[1]).toMatchObject({ number: "4", ok: true });
    });

    /** A client whose server fails the request after the `n`th request matching `match`. */
    function failAfter(server: MockGradescope, match: (method: string) => boolean, n: number) {
        const realFetch = server.fetch;
        let seen = 0;
        server.fetch = async (input, init) => {
            const res = await realFetch(input, init);
            if (match((init?.method ?? "GET").toUpperCase()) && ++seen === n) {
                server.options.failNextWith = 500;
            }
            return res;
        };
        return new GradescopeClient({ origin: ORIGIN, courseId: 1, assignmentId: 1, csrfToken: TOKEN, fetch: server.fetch });
    }

    it("removes the new entries again when creating them fails partway", async () => {
        const { server, client } = setup();
        const plans = await plansFor(client, file([Q1]));
        const before = JSON.stringify(new Assignment(server.state.payload).entries(101));
        // Q1's group is created, then creating its "Incorrect" item fails.
        const results = await uploadPlans(failAfter(server, (m) => m === "POST", 1), plans, { delayMs: 0 });
        expect(results[0]).toMatchObject({ ok: false, message: expect.stringMatching(/keeps its old rubric/) });
        expect(JSON.stringify(new Assignment(server.state.payload).entries(101))).toBe(before);
        expect(server.state.payload.rubric_items.filter((i) => i.question_id === 101)).toHaveLength(1);
    });

    it("keeps the results when the final check can't be read", async () => {
        const { client, server } = setup();
        const plans = await plansFor(client, file([Q1]));
        const results = await uploadPlans(failAfter(server, (m) => m === "PATCH", 1), plans, { delayMs: 0 });
        expect(results).toEqual([
            { number: "1", ok: false, message: expect.stringMatching(/^Uploaded, but it could not be verified/) },
        ]);
        const a = new Assignment(server.state.payload);
        expect(a.toRubricQuestion(a.question("1")!).rubric).toEqual(Q1.rubric);
    });

    it("skips a question whose weight changed after it was checked", async () => {
        const { server, client } = setup();
        const plans = await plansFor(client, file([Q1]));
        server.state.payload.questions.find((q) => q.id === 101)!.weight = "3.0";
        const results = await uploadPlans(client, plans, { delayMs: 0 });
        expect(results[0]).toMatchObject({ ok: false, message: expect.stringMatching(/points or scoring type/) });
        expect(server.requests.filter((r) => !r.startsWith("GET"))).toEqual([]);
    });

    it("uploads nothing when rubrics were locked after the check", async () => {
        const { server, client } = setup();
        const plans = await plansFor(client, file([Q1]));
        server.options.rubricsLocked = true;
        await expect(uploadPlans(client, plans, { delayMs: 0 })).rejects.toThrow(/locked/);
        expect(server.requests.filter((r) => !r.startsWith("GET"))).toEqual([]);
    });

    it("sends weights as strings and the CSRF token on every request", async () => {
        const { server, client } = setup();
        await uploadPlans(client, await plansFor(client, file([Q1])), { delayMs: 0 });
        // The mock rejects non-string weights and bad tokens; check it saw writes.
        expect(server.requests.some((r) => r.startsWith("POST"))).toBe(true);
        expect(server.requests.some((r) => r.startsWith("PATCH"))).toBe(true);
    });
});

describe("round trip through Gradescope", () => {
    it("downloads exactly the rubric that was uploaded", async () => {
        const { client } = setup();
        const q21 = { ...Q1, number: "2.1" };
        const q3 = {
            number: "3",
            weight: 3,
            scoring: "negative" as const,
            rubric: [
                { type: "item" as const, points: 0, description: "Correct" },
                {
                    type: "group" as const,
                    description: "**Errors**\n\nApply all that apply.",
                    mutually_exclusive: true,
                    items: [
                        { type: "item" as const, points: -0.5, description: "Units: $$\\mathrm{m}/\\mathrm{s}$$" },
                        { type: "item" as const, points: -2.25, description: "Sign" },
                    ],
                },
                { type: "item" as const, points: 0.5, description: "Bonus" },
            ],
        };
        const uploaded = file([Q1, q21, q3]);
        await uploadPlans(client, await plansFor(client, uploaded, ["2.1", "3"]), { delayMs: 0 });
        const downloaded = (await client.load()).toRubricFile();
        for (const q of uploaded.questions) {
            const d = downloaded.questions.find((x) => x.number === q.number)!;
            expect({ ...d, title: undefined }).toEqual({ ...q, title: undefined });
        }
        // ...and uploading the download changes nothing.
        const again = validateRubricText(JSON.stringify(downloaded), await client.load());
        expect(again.errors).toEqual([]);
        expect(again.warnings).toEqual([]);
        expect(again.plans.every((p) => p.status === "unchanged")).toBe(true);
    });
});
