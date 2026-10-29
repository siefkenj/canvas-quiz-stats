/**
 * Diffs between rubrics: entry by entry (for the graphical preview) and a plain-text rendering
 * (for the text view).
 */
import type { RubricEntry, RubricQuestion } from "./types";

export type Mark = "same" | "added" | "removed";

/** Longest-common-subsequence diff of two sequences, matching elements by `key`. */
export function diffSequence<T>(
    before: T[],
    after: T[],
    key: (x: T) => string
): { mark: Mark; value: T; other?: T }[] {
    const a = before.map(key);
    const b = after.map(key);
    const n = a.length;
    const m = b.length;
    const lcs = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            lcs[i][j] = a[i] === b[j] ? lcs[i + 1][j + 1] + 1 : Math.max(lcs[i + 1][j], lcs[i][j + 1]);
        }
    }
    const out: { mark: Mark; value: T; other?: T }[] = [];
    let i = 0;
    let j = 0;
    while (i < n && j < m) {
        if (a[i] === b[j]) {
            out.push({ mark: "same", value: after[j], other: before[i] });
            i++;
            j++;
        } else if (lcs[i + 1][j] >= lcs[i][j + 1]) {
            out.push({ mark: "removed", value: before[i++] });
        } else {
            out.push({ mark: "added", value: after[j++] });
        }
    }
    while (i < n) {
        out.push({ mark: "removed", value: before[i++] });
    }
    while (j < m) {
        out.push({ mark: "added", value: after[j++] });
    }
    return out;
}

export type ViewMark = Mark | "changed";

export interface ViewItem {
    mark: ViewMark;
    points: number;
    description: string;
    /** For a "changed" item: its points before (its description is unchanged). */
    oldPoints?: number;
}

export interface ViewGroup {
    kind: "group";
    mark: ViewMark;
    description: string;
    mutually_exclusive: boolean;
    items: ViewItem[];
    /** For a "changed" group: what changed about the group itself. */
    oldDescription?: string;
    oldMutuallyExclusive?: boolean;
}

export type ViewEntry = ({ kind: "item" } & ViewItem) | ViewGroup;

const norm = (s: string) => s.replace(/\r\n/g, "\n").trim();
const itemKey = (i: { points: number; description: string }) => `${i.points}\u0000${norm(i.description)}`;
const entryKey = (e: RubricEntry) =>
    e.type === "item" ? `item\u0000${itemKey(e)}` : `group\u0000${e.mutually_exclusive}\u0000${norm(e.description)}`;

function viewEntry(e: RubricEntry, mark: Mark): ViewEntry {
    return e.type === "item"
        ? { kind: "item", mark, points: e.points, description: e.description }
        : {
              kind: "group",
              mark,
              description: e.description,
              mutually_exclusive: e.mutually_exclusive,
              items: e.items.map((i) => ({ mark, points: i.points, description: i.description })),
          };
}

/** A rubric as view entries with nothing marked. */
export function plainEntries(rubric: RubricEntry[]): ViewEntry[] {
    return rubric.map((e) => viewEntry(e, "same"));
}

/**
 * Mark a sequence diff for display. Within each run of differences (between unchanged
 * elements), a removed element that `matches` an added one is "the same thing, edited": the two
 * are merged into one "changed" element at the added one's position, with `old` set. So the
 * result follows the new order, with removed elements first within each run.
 */
function pairRuns<T>(
    diff: { mark: Mark; value: T; other?: T }[],
    matches: (removed: T, added: T) => boolean
): { mark: ViewMark; value: T; old?: T }[] {
    const out: { mark: ViewMark; value: T; old?: T }[] = [];
    let k = 0;
    while (k < diff.length) {
        if (diff[k].mark === "same") {
            out.push({ mark: "same", value: diff[k].value, old: diff[k].other });
            k++;
            continue;
        }
        const run: { mark: Mark; value: T }[] = [];
        while (k < diff.length && diff[k].mark !== "same") {
            run.push(diff[k++]);
        }
        const used = new Set<{ mark: Mark; value: T }>();
        const partners = new Map<number, T>();
        run.forEach((r, idx) => {
            if (r.mark === "added") {
                const match = run.find((x) => x.mark === "removed" && !used.has(x) && matches(x.value, r.value));
                if (match) {
                    used.add(match);
                    partners.set(idx, match.value);
                }
            }
        });
        run.forEach((r, idx) => {
            if (used.has(r)) {
                return; // merged into its partner
            }
            const old = partners.get(idx);
            out.push(old === undefined ? { mark: r.mark, value: r.value } : { mark: "changed", value: r.value, old });
        });
    }
    return out;
}

type Item = { points: number; description: string };
type Group = RubricEntry & { type: "group" };

function diffItems(before: Item[], after: Item[]): ViewItem[] {
    return pairRuns(diffSequence(before, after, itemKey), (a, b) => norm(a.description) === norm(b.description)).map(
        ({ mark, value, old }) => ({
            mark,
            points: value.points,
            description: value.description,
            ...(mark === "changed" ? { oldPoints: old!.points } : {}),
        })
    );
}

function groupView(before: Group, after: Group, mark: ViewMark): ViewGroup {
    return {
        kind: "group",
        mark,
        description: after.description,
        mutually_exclusive: after.mutually_exclusive,
        items: diffItems(before.items, after.items),
        ...(norm(before.description) !== norm(after.description) ? { oldDescription: before.description } : {}),
        ...(before.mutually_exclusive !== after.mutually_exclusive ? { oldMutuallyExclusive: before.mutually_exclusive } : {}),
    };
}

/**
 * The new rubric with the old rubric's removed entries interleaved, marked for display. An item
 * whose points changed, and a group whose heading or exclusivity changed, are shown once as
 * "changed"; the items of a group in both rubrics are compared one by one.
 */
export function diffEntries(before: RubricEntry[], after: RubricEntry[]): ViewEntry[] {
    const matches = (a: RubricEntry, b: RubricEntry) =>
        a.type === "group" ? b.type === "group" : b.type === "item" && norm(a.description) === norm(b.description);
    return pairRuns(diffSequence(before, after, entryKey), matches).map(({ mark, value, old }): ViewEntry => {
        if (value.type === "group" && old?.type === "group") {
            return groupView(old, value, mark);
        }
        if (mark === "changed" && value.type === "item" && old?.type === "item") {
            return { kind: "item", mark, points: value.points, description: value.description, oldPoints: old.points };
        }
        return viewEntry(value, mark as Mark);
    });
}

// ------------------------------------------------------------------------ text rendering

const fmtPoints = (p: number) => (p > 0 ? `+${p}` : `${p}`).padStart(5);

/** One line per rubric entry (multi-line descriptions are continued on indented lines). */
export function rubricLines(rubric: RubricEntry[]): string[] {
    const lines: string[] = [];
    const push = (prefix: string, description: string, indent: string) => {
        const [first, ...rest] = norm(description).split("\n");
        lines.push(`${prefix}${first}`);
        for (const line of rest) {
            lines.push(`${indent}${line}`);
        }
    };
    for (const e of rubric) {
        if (e.type === "item") {
            push(`${fmtPoints(e.points)}  `, e.description, " ".repeat(7));
        } else {
            push(`[group${e.mutually_exclusive ? ", mutually exclusive" : ""}] `, e.description, "    ");
            for (const i of e.items) {
                push(`    ${fmtPoints(i.points)}  `, i.description, " ".repeat(11));
            }
        }
    }
    return lines;
}

/** A whole rubric as readable text. */
export function rubricText(questions: RubricQuestion[]): string {
    return questions
        .map((q) => {
            const head = `Q${q.number}${q.title ? ` ${q.title}` : ""} (${q.weight} point${q.weight === 1 ? "" : "s"}, ${q.scoring} scoring)`;
            const body = rubricLines(q.rubric);
            return [head, ...(body.length ? body : ["    (no rubric items)"])].join("\n");
        })
        .join("\n\n") + "\n";
}
