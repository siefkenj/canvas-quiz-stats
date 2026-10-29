/**
 * Which questions an upload sends. Every question that would change is selected unless the user
 * unticked it, so the selection is kept as the set of unticked question numbers.
 */
import type { QuestionPlan } from "./validate";

/** The plans that can be uploaded: those that would change something. */
export function selectablePlans(plans: QuestionPlan[]) {
    return plans.filter((p) => p.status !== "unchanged");
}

/** The plans to upload, in file order. */
export function selectedPlans(plans: QuestionPlan[], unticked: ReadonlySet<string>) {
    return selectablePlans(plans).filter((p) => !unticked.has(p.number));
}

/** What the selection does, for the Upload button and its hint. */
export function selectionSummary(plans: QuestionPlan[], unticked: ReadonlySet<string>) {
    const selectable = selectablePlans(plans);
    const selected = selectedPlans(plans, unticked);
    return {
        selectable: selectable.length,
        selected: selected.length,
        /** Selected questions whose existing rubric is deleted and replaced. */
        replacing: selected.filter((p) => p.status === "conflict").length,
    };
}
