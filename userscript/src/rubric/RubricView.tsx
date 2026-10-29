/**
 * A compact, Gradescope-like rendering of rubrics, used both for the current rubric and for the
 * preview of an upload (where added and removed entries are marked).
 */
import React from "react";
import { GsMarkdown } from "./markdown";
import type { ViewEntry, ViewItem, ViewMark } from "./diff";
import type { RubricEntry } from "./types";
import { maxPositivePoints } from "./validate";

const MARK_TITLES: Record<ViewMark, string> = {
    same: "",
    added: "New: will be added by the upload",
    removed: "Will be removed by the upload",
    changed: "Changed by the upload (the old version is struck through)",
};

export function formatPoints(points: number) {
    const magnitude = Math.abs(points);
    const text = Number.isInteger(magnitude) ? magnitude.toFixed(1) : String(magnitude);
    return points > 0 ? `+${text}` : points < 0 ? `−${text}` : text;
}

export function PointsBadge({ points }: { points: number }) {
    const kind = points > 0 ? "positive" : points < 0 ? "negative" : "zero";
    const n = Math.abs(points);
    const title =
        points > 0
            ? `Adds ${n} point${n === 1 ? "" : "s"} when applied`
            : points < 0
              ? `Subtracts ${n} point${n === 1 ? "" : "s"} when applied`
              : "Feedback only: 0 points";
    return (
        <span className={`rb-points ${kind}`} title={title}>
            {formatPoints(points)}
        </span>
    );
}

function ItemRow({ item }: { item: ViewItem }) {
    return (
        <div className={`rb-item ${item.mark}`} title={MARK_TITLES[item.mark] || undefined}>
            {item.oldPoints !== undefined ? (
                <span className="rb-points-change">
                    <s title="Old points">
                        <PointsBadge points={item.oldPoints} />
                    </s>
                    <PointsBadge points={item.points} />
                </span>
            ) : (
                <PointsBadge points={item.points} />
            )}
            <div className="rb-desc">
                <GsMarkdown text={item.description} />
            </div>
        </div>
    );
}

export function EntryList({ entries }: { entries: ViewEntry[] }) {
    if (entries.length === 0) {
        return <div className="rb-empty" title="This question has no rubric items">No rubric items</div>;
    }
    return (
        <div className="rb-entries">
            {entries.map((e, k) =>
                e.kind === "item" ? (
                    <ItemRow key={k} item={e} />
                ) : (
                    <div key={k} className={`rb-group ${e.mark}`} title={MARK_TITLES[e.mark] || undefined}>
                        <div className="rb-group-head">
                            <div className="rb-desc">
                                {e.oldDescription !== undefined && (
                                    <div className="rb-old" title="Old group description">
                                        <GsMarkdown text={e.oldDescription} />
                                    </div>
                                )}
                                <GsMarkdown text={e.description} />
                            </div>
                            {e.oldMutuallyExclusive !== undefined && (
                                <s className="rb-group-kind" title="Old setting">
                                    {e.oldMutuallyExclusive ? "one of" : "any of"}
                                </s>
                            )}
                            <span
                                className="rb-group-kind"
                                title={
                                    e.mutually_exclusive
                                        ? "Mutually exclusive: graders can apply at most one item of this group"
                                        : "Graders can apply any number of items of this group"
                                }
                            >
                                {e.mutually_exclusive ? "one of" : "any of"}
                            </span>
                        </div>
                        <div className="rb-group-items">
                            {e.items.map((i, j) => (
                                <ItemRow key={j} item={i} />
                            ))}
                        </div>
                    </div>
                )
            )}
        </div>
    );
}

/**
 * The sum of a rubric's positive points (an exclusive group counting its best item) when it
 * doesn't suit the question: under positive scoring when it differs from the weight (an empty
 * rubric or Gradescope's lone default item is not worth pointing out), under negative scoring
 * (students start with full marks) when there are any.
 */
function pointsMismatch(rubric: RubricEntry[] | undefined, weight: number, scoring: string) {
    if (!rubric) {
        return null;
    }
    const total = maxPositivePoints(rubric);
    if (scoring === "negative") {
        return total > 0 ? total : null;
    }
    if (Math.abs(total - weight) < 1e-9 || (total === 0 && rubric.length <= 1)) {
        return null;
    }
    return total;
}

export function QuestionHeader(props: {
    number: string;
    title?: string;
    weight: number;
    scoring: string;
    /** When given, a total of the positive items that differs from the weight is pointed out. */
    rubric?: RubricEntry[];
    /** Shown before the question number (e.g. a checkbox). */
    before?: React.ReactNode;
    children?: React.ReactNode;
}) {
    const mismatch = pointsMismatch(props.rubric, props.weight, props.scoring);
    return (
        <div className="rb-qhead">
            {props.before}
            <span className="rb-qnum" title={`Question ${props.number}${props.title ? `: ${props.title}` : ""}`}>
                Q{props.number}
            </span>
            {props.title && <span className="rb-qtitle">{props.title}</span>}
            <span className="rb-qmeta" title={`Worth ${props.weight} point${props.weight === 1 ? "" : "s"}, ${props.scoring} scoring`}>
                {props.weight} pt{props.weight === 1 ? "" : "s"}
                {props.scoring === "negative" ? " · negative scoring" : ""}
            </span>
            {mismatch !== null && (
                <span
                    className="rb-qtotal"
                    title={
                        props.scoring === "negative"
                            ? `Under negative scoring students start with full marks (${props.weight}); positive items (up to ${mismatch} point${mismatch === 1 ? "" : "s"}) would give more`
                            : `The positive items add up to at most ${mismatch} point${mismatch === 1 ? "" : "s"}, but the question is worth ${props.weight}`
                    }
                >
                    sum of positive points: {mismatch}
                </span>
            )}
            {props.children}
        </div>
    );
}
