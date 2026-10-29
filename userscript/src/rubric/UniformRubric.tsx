/** The sub-dialog that writes a uniform rubric (the same items and points on every chosen question). */
import React from "react";
import type { Assignment } from "./assignment";
import { formatPoints } from "./RubricView";
import { useModal } from "./hooks";
import { ArrowDownIcon, ArrowUpIcon, PlusIcon, TrashIcon } from "./icons";
import type { RubricFile } from "./types";
import {
    maxPoints,
    presetFullMarks,
    templateFit,
    templateProblems,
    uniformPoints,
    uniformRubric,
    UNIFORM_PRESETS,
    type UniformItem,
    type UniformTemplate,
} from "./uniform";

/** An item row as edited: the points are kept as typed. */
type Row = { description: string; points: string };
const toRows = (items: UniformItem[]): Row[] => items.map((i) => ({ description: i.description, points: String(i.points) }));
const parsePoints = (s: string) => (s.trim() === "" ? NaN : Number(s));

export function UniformRubricDialog(props: {
    assignment: Assignment | null;
    open: boolean;
    onClose: () => void;
    onCreate: (file: RubricFile) => void;
}) {
    const { assignment } = props;
    const dialog = React.useRef<HTMLDialogElement>(null);
    useModal(dialog, props.open);
    const [rows, setRowsState] = React.useState<Row[]>(() => toRows(UNIFORM_PRESETS[0].items(1)));
    /** Whether the items were edited (until then they follow the questions' weight). */
    const edited = React.useRef(false);
    const setRows: typeof setRowsState = (rows) => {
        edited.current = true;
        setRowsState(rows);
    };
    const [grouped, setGrouped] = React.useState(false);
    const [groupDescription, setGroupDescription] = React.useState("**Score**");
    const [exclusive, setExclusive] = React.useState(true);
    const questions = React.useMemo(() => assignment?.toRubricFile().questions ?? [], [assignment]);
    const [chosen, setChosen] = React.useState<Set<string>>(new Set());
    /** Whether `chosen` was filled in yet (every question is chosen at first). */
    const initialized = React.useRef(false);
    React.useEffect(() => {
        if (!initialized.current && questions.length) {
            initialized.current = true;
            setChosen(new Set(questions.map((q) => q.number)));
        } else {
            // Keep the choice when the rubric is reloaded, dropping questions that are gone.
            const numbers = new Set(questions.map((q) => q.number));
            setChosen((s) => new Set([...s].filter((n) => numbers.has(n))));
        }
        if (!edited.current) {
            setRowsState(toRows(UNIFORM_PRESETS[0].items(presetFullMarks(questions))));
        }
    }, [questions]);

    const template: UniformTemplate = {
        items: rows.map((r) => ({ description: r.description, points: parsePoints(r.points) })),
        group: grouped ? { description: groupDescription, mutually_exclusive: exclusive } : null,
    };
    const problems = templateProblems(template, chosen.size);
    const max = problems.length ? null : maxPoints(template);
    const chosenQuestions = questions.filter((q) => chosen.has(q.number));
    const fullMarks = presetFullMarks(chosenQuestions.length ? chosenQuestions : questions);
    const replacing = questions.filter((q) => chosen.has(q.number) && assignment && !assignment.hasOnlyDefaultRubric(assignment.question(q.number)!.id));

    const setRow = (k: number, patch: Partial<Row>) => setRows((rs) => rs.map((r, j) => (j === k ? { ...r, ...patch } : r)));
    const move = (k: number, by: number) =>
        setRows((rs) => {
            const next = rs.slice();
            const [r] = next.splice(k, 1);
            next.splice(k + by, 0, r);
            return next;
        });
    const toggle = (n: string) =>
        setChosen((s) => {
            const next = new Set(s);
            next.has(n) ? next.delete(n) : next.add(n);
            return next;
        });

    function create() {
        if (assignment && problems.length === 0) {
            props.onCreate(uniformRubric(assignment, template, chosen));
        }
    }

    return (
        <dialog ref={dialog} className="uniform" onClose={props.onClose}>
            <header>
                <h2 title="The same rubric items with the same points on every chosen question (as deductions on negatively scored questions)">Uniform rubric</h2>
                <button type="button" className="icon-button close" title="Close without changing anything" aria-label="Close" onClick={props.onClose}>
                    ×
                </button>
            </header>
            <main>
                <div className="row">
                    <h3>Items</h3>
                    <span className="hint">Start from:</span>
                    {UNIFORM_PRESETS.map((p) => (
                        <button
                            key={p.name}
                            type="button"
                            className="small"
                            title={`Replace the items with: ${p.title} (full marks: ${fullMarks}, the chosen questions' weight if they share one)`}
                            onClick={() => setRows(toRows(p.items(fullMarks)))}
                        >
                            {p.name}
                        </button>
                    ))}
                </div>
                <table className="uniform-items">
                    <thead>
                        <tr>
                            <th title="Gradescope markdown: **bold**, $$math$$">Description</th>
                            <th title="The change to the score when the item is applied; negative for a penalty or deduction">Points</th>
                            <th />
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map((r, k) => (
                            <tr key={k}>
                                <td>
                                    <input
                                        type="text"
                                        value={r.description}
                                        onChange={(e) => setRow(k, { description: e.target.value })}
                                        title="The item's description (Gradescope markdown: **bold**, $$math$$)"
                                        aria-label={`Item ${k + 1} description`}
                                    />
                                </td>
                                <td className="points">
                                    <input
                                        type="number"
                                        step="any"
                                        value={r.points}
                                        onChange={(e) => setRow(k, { points: e.target.value })}
                                        title="The change to the score when the item is applied (negative for a penalty or deduction)"
                                        aria-label={`Item ${k + 1} points`}
                                    />
                                </td>
                                <td className="row-tools">
                                    <button type="button" className="icon-button" title="Move up" disabled={k === 0} onClick={() => move(k, -1)}>
                                        <ArrowUpIcon />
                                    </button>
                                    <button type="button" className="icon-button" title="Move down" disabled={k === rows.length - 1} onClick={() => move(k, 1)}>
                                        <ArrowDownIcon />
                                    </button>
                                    <button type="button" className="icon-button" title="Remove this item" onClick={() => setRows((rs) => rs.filter((_, j) => j !== k))}>
                                        <TrashIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="row">
                    <button type="button" className="small" title="Add an item" onClick={() => setRows((rs) => [...rs, { description: "", points: "0" }])}>
                        <PlusIcon /> Add item
                    </button>
                    {max !== null && (
                        <span className="hint" title="Under positive scoring, what a student can get at most">
                            The positive items add up to at most {max} point{max === 1 ? "" : "s"}.
                        </span>
                    )}
                </div>
                <p className="hint">
                    Every chosen question gets exactly these points. On a negatively scored question (students start with full marks), an item worth p points becomes a
                    deduction of the weight minus p, so it still leaves the student with p; negative points stay deductions.
                </p>
                <label className="check-line" title="Put the items under a group heading">
                    <input type="checkbox" checked={grouped} onChange={(e) => setGrouped(e.target.checked)} /> Put the items in a group
                </label>
                {grouped && (
                    <div className="row uniform-group">
                        <input
                            type="text"
                            value={groupDescription}
                            onChange={(e) => setGroupDescription(e.target.value)}
                            title="The group's heading (Gradescope markdown)"
                            aria-label="Group description"
                        />
                        <label className="check-line" title="Graders can apply at most one item of a mutually exclusive group">
                            <input type="checkbox" checked={exclusive} onChange={(e) => setExclusive(e.target.checked)} /> Mutually exclusive
                        </label>
                    </div>
                )}

                <div className="row">
                    <h3>Questions</h3>
                    <button type="button" className="small" title="Choose every question" onClick={() => setChosen(new Set(questions.map((q) => q.number)))}>
                        Select all
                    </button>
                    <button type="button" className="small" title="Choose no questions" onClick={() => setChosen(new Set())}>
                        Select none
                    </button>
                    {replacing.length > 0 && (
                        <span className="hint" title="These questions already have a rubric of their own">
                            {replacing.length === 1 ? "Q" + replacing[0].number + " already has a rubric" : `${replacing.length} chosen questions already have a rubric`}; the preview will show what changes.
                        </span>
                    )}
                </div>
                <table className="uniform-preview">
                    <thead>
                        <tr>
                            <th />
                            <th>Question</th>
                            <th>Worth</th>
                            <th title="The items' points on this question (deductions on a negatively scored question)">Points</th>
                            <th title="Whether these items suit the question">Fit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.map((q) => {
                            const fit = problems.length ? null : templateFit(template, q);
                            return (
                                <tr key={q.number} className={chosen.has(q.number) ? "" : "skipped"}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            checked={chosen.has(q.number)}
                                            onChange={() => toggle(q.number)}
                                            title={chosen.has(q.number) ? `Give Q${q.number} this rubric` : `Leave Q${q.number} out`}
                                        />
                                    </td>
                                    <td>
                                        <b>Q{q.number}</b> {q.title}
                                    </td>
                                    <td className="worth" title={`${q.weight} points, ${q.scoring} scoring`}>
                                        {q.weight} pt{q.weight === 1 ? "" : "s"}
                                        {q.scoring === "negative" ? " · negative scoring" : ""}
                                    </td>
                                    <td className="item-points" title={q.scoring === "negative" ? "Deductions: students start with full marks" : "Points added"}>
                                        {problems.length ? "–" : template.items.map((i) => formatPoints(uniformPoints(i.points, q.weight, q.scoring))).join(" / ")}
                                    </td>
                                    <td className={fit ? "misfit" : "fit"} title={fit ?? "The items suit this question"}>
                                        {problems.length ? "–" : (fit ?? "✓")}
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </main>
            <footer>
                <span className="hint">{problems[0] ?? `Writes rubric JSON for ${chosen.size} question${chosen.size === 1 ? "" : "s"} into the New rubric box. Nothing is uploaded yet.`}</span>
                <button
                    type="button"
                    className="primary"
                    disabled={problems.length > 0}
                    onClick={create}
                    title={problems.length ? problems.join("\n") : "Replace the New rubric box with this rubric, to review and upload"}
                >
                    Use this rubric
                </button>
                <button type="button" title="Close without changing anything" onClick={props.onClose}>
                    Cancel
                </button>
            </footer>
        </dialog>
    );
}
