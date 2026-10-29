/**
 * Upload validated rubric plans to Gradescope.
 *
 * Each question is replaced in four steps, so it is never left without a rubric: create the new
 * entries, delete the old ones (and any items a deleted group leaves behind), put the new entries
 * in order, and finally re-read everything and verify it. If creating the new entries fails, the
 * ones already created are removed again, so the question keeps just its old rubric.
 */
import { pointsToWeight, sameRubric } from "./assignment";
import type { GradescopeClient } from "./api";
import type { GsEntry } from "./types";
import type { QuestionPlan } from "./validate";

const message = (e: unknown) => (e instanceof Error ? e.message : String(e));
const entryKey = (e: GsEntry) => (e.kind === "group" ? `group:${e.group.id}` : `item:${e.item.id}`);

/** Delete rubric entries. A group's items are deleted too, in case deleting a group leaves them behind. */
async function deleteEntries(client: GradescopeClient, questionId: number, entries: GsEntry[], pause: () => Promise<unknown>) {
    for (const e of entries) {
        if (e.kind === "group") {
            await client.deleteGroup(questionId, e.group.id);
            for (const item of e.items) {
                await client.deleteItem(questionId, item.id);
            }
        } else {
            await client.deleteItem(questionId, e.item.id);
        }
        await pause();
    }
}

/** Why a question can't be uploaded as planned any more, or null if it still can. */
function staleReason(plan: QuestionPlan, actual: QuestionPlan["current"] | null) {
    if (!actual) {
        return "Skipped: the question is no longer on Gradescope.";
    }
    if (actual.weight !== plan.current.weight || actual.scoring !== plan.current.scoring) {
        return "Skipped: the question's points or scoring type on Gradescope changed since it was checked. Check the file again.";
    }
    if (!sameRubric(actual.rubric, plan.current.rubric)) {
        return "Skipped: the rubric on Gradescope changed since it was checked. Check the file again.";
    }
    return null;
}

export interface UploadResult {
    number: string;
    ok: boolean;
    message: string;
}

export interface UploadOptions {
    /** Called with progress messages. */
    log?: (message: string) => void;
    /** Pause between requests, to be gentle with the server. */
    delayMs?: number;
}

export async function uploadPlans(
    client: GradescopeClient,
    plans: QuestionPlan[],
    { log = () => {}, delayMs = 100 }: UploadOptions = {}
): Promise<UploadResult[]> {
    const pause = () => new Promise((r) => setTimeout(r, delayMs));
    const results: UploadResult[] = [];
    const uploaded: QuestionPlan[] = [];

    // Re-read Gradescope: refuse to touch a question that changed since the preview. (If this
    // fails, nothing has been changed yet.)
    let assignment = await client.load();
    if (assignment.payload.rubrics_locked) {
        throw new Error("Rubrics are locked for this assignment; nothing was uploaded.");
    }
    for (const plan of plans) {
        const q = assignment.question(plan.number);
        const stale = staleReason(plan, q ? assignment.toRubricQuestion(q) : null);
        if (!q || stale) {
            results.push({ number: plan.number, ok: false, message: stale! });
            continue;
        }

        const { scoring } = plan.next;
        const old = assignment.entries(q.id);
        let step = "creating the new rubric";
        try {
            log(`Q${plan.number}: ${step}`);
            const created: { kind: "item" | "group"; id: number }[] = [];
            for (const e of plan.next.rubric) {
                if (e.type === "item") {
                    const id = await client.createItem(q.id, e.description, pointsToWeight(e.points, scoring));
                    created.push({ kind: "item", id });
                } else {
                    const id = await client.createGroup(
                        q.id,
                        e.description,
                        e.mutually_exclusive,
                        e.items.map((i) => ({
                            description: i.description,
                            weight: pointsToWeight(i.points, scoring),
                        }))
                    );
                    created.push({ kind: "group", id });
                }
                await pause();
            }

            step = "deleting the old rubric";
            log(`Q${plan.number}: ${step}`);
            await deleteEntries(client, q.id, old, pause);

            step = "ordering the new rubric";
            log(`Q${plan.number}: ${step}`);
            await client.setPositions(q.id, created);
            await pause();
            uploaded.push(plan);
        } catch (e) {
            const failure = `Failed while ${step}: ${message(e)}.`;
            if (step !== "creating the new rubric") {
                results.push({
                    number: plan.number,
                    ok: false,
                    message: `${failure} The question may be partly updated; reload the page and check it.`,
                });
                continue;
            }
            // Nothing old was deleted yet: remove whatever new entries were created.
            log(`Q${plan.number}: removing the partly created rubric`);
            try {
                const oldKeys = new Set(old.map(entryKey));
                const now = await client.load();
                await deleteEntries(client, q.id, now.entries(q.id).filter((e) => !oldKeys.has(entryKey(e))), pause);
                results.push({ number: plan.number, ok: false, message: `${failure} The question keeps its old rubric.` });
            } catch (e2) {
                results.push({
                    number: plan.number,
                    ok: false,
                    message: `${failure} Removing the partly created rubric also failed (${message(e2)}), so the question may have both old and new items; reload the page and check it.`,
                });
            }
        }
    }

    // Verify against a fresh copy of the rubric.
    if (uploaded.length) {
        log("Verifying");
        try {
            assignment = await client.load();
        } catch (e) {
            for (const plan of uploaded) {
                results.push({
                    number: plan.number,
                    ok: false,
                    message: `Uploaded, but it could not be verified (${message(e)}). Reload the page and check it.`,
                });
            }
            uploaded.length = 0;
        }
    }
    for (const plan of uploaded) {
        const q = assignment.question(plan.number);
        const actual = q ? assignment.toRubricQuestion(q).rubric : [];
        results.push(
            sameRubric(actual, plan.next.rubric)
                ? { number: plan.number, ok: true, message: "Uploaded and verified." }
                : {
                      number: plan.number,
                      ok: false,
                      message: "Uploaded, but the rubric on Gradescope does not match the file. Reload the page and check it.",
                  }
        );
    }
    const order = new Map(plans.map((p, k) => [p.number, k]));
    return results.sort((a, b) => order.get(a.number)! - order.get(b.number)!);
}
