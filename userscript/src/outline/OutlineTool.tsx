/**
 * The "Outline JSON" dialog on Gradescope's outline editor: read the regions an examy exam's
 * answer boxes take (from `gradescope.typ`), preview them over the template's pages next
 * to the outline Gradescope has, and save them as the outline.
 */
import React from "react";
import regionsScript from "./gradescope.typ?raw";
import { useModal } from "../rubric/hooks";
import { CopyIcon, DownloadIcon, FileIcon } from "../rubric/icons";
import { copyText, download, ReferenceSection } from "../rubric/RubricTool";
import { examBase, IMPORT_SNIPPET, outlineAiInstructions, regionsCommand } from "./instructions";
import { readFileOrAttachment } from "../pdf-attachments";
import type { OutlineClient } from "./api";
import {
    flatten,
    ID_REGION_LABELS,
    matchIdRegions,
    matchOutline,
    outlinePayload,
    parseRegions,
    planOutline,
    type IdRegionMatch,
    type MatchedQuestion,
    type OutlineMatch,
} from "./outline";
import type { CropRect, GsOutlineProps } from "./types";

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

/** Reload the page. Inside Canvas this reloads only the Gradescope frame. */
const reloadPage = () => window.location.reload();

/** What a save changes, in words, and whether it changes anything. */
function summarize(match: OutlineMatch, ids: IdRegionMatch[]) {
    const all = flatten(match.questions);
    const added = all.filter((q) => q.status === "new").length;
    const changed = all.filter((q) => q.status === "changed").length;
    const idChanged = ids.filter((i) => i.status === "new" || i.status === "changed");
    const parts = [
        added && `${plural(added, "question")} added`,
        changed && `${plural(changed, "question")} changed`,
        match.deleted.length && `${plural(match.deleted.length, "question")} deleted`,
        idChanged.length && `${idChanged.map((i) => ID_REGION_LABELS[i.key].toLowerCase()).join(" and ")} region${idChanged.length > 1 ? "s" : ""} set`,
    ].filter(Boolean);
    return { text: parts.join(", "), any: parts.length > 0 };
}

export function OutlineTool({ client }: { client: OutlineClient }) {
    const dialog = React.useRef<HTMLDialogElement>(null);
    const [open, setOpen] = React.useState(false);
    const [busy, setBusy] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [notice, setNotice] = React.useState<string | null>(null);
    const [props, setProps] = React.useState<GsOutlineProps | null>(null);
    const [text, setText] = React.useState("");
    const [examIndex, setExamIndex] = React.useState(0);
    /**
     * Of the questions the save would delete (`ids`), those Gradescope says have grading data;
     * or why it could not say.
     */
    const [graded, setGraded] = React.useState<{ ids: string; graded: number[]; failed?: string } | null>(null);
    /** Bumped to ask Gradescope again after the grading check failed. */
    const [gradedAttempt, setGradedAttempt] = React.useState(0);
    const [confirmed, setConfirmed] = React.useState(false);
    const [hovered, setHovered] = React.useState<string | null>(null);
    const [results, setResults] = React.useState<{ ok: boolean; message: string }[] | null>(null);
    /** A save was started, so Gradescope's editor (behind the dialog) may be out of date. */
    const [saved, setSaved] = React.useState(false);
    const [reloading, setReloading] = React.useState(false);
    const [instructionsOpen, setInstructionsOpen] = React.useState(false);

    useModal(dialog, open);

    /** Run `f`, showing `label` meanwhile and any error it throws (`keepError`: and the one before). */
    async function run<T>(label: string, f: () => Promise<T>, { keepError = false } = {}): Promise<T | undefined> {
        setBusy(label);
        if (!keepError) {
            setError(null);
        }
        try {
            return await f();
        } catch (e) {
            setError(e instanceof Error ? e.message : String(e));
        } finally {
            setBusy(null);
        }
    }

    const reload = ({ keepError = false } = {}) =>
        run(
            "Loading the outline from Gradescope…",
            async () => {
                const p = await client.load();
                setProps(p);
                return p;
            },
            { keepError }
        );

    function openDialog() {
        setInstructionsOpen(false);
        setOpen(true);
        reload();
    }

    function flash(message: string) {
        setNotice(message);
        window.setTimeout(() => setNotice((n) => (n === message ? null : n)), 2500);
    }

    const parsed = React.useMemo(() => (text.trim() ? parseRegions(text) : null), [text]);
    const file = parsed?.file ?? null;
    // The chosen exam, if the file (which may have been replaced since) has it.
    const exam = file && examIndex < file.exams.length ? examIndex : 0;
    const plan = React.useMemo(() => (file && props ? planOutline(file, props.template, exam) : null), [file, props, exam]);
    const match = React.useMemo(() => (plan && props ? matchOutline(plan.questions, props.outline) : null), [plan, props]);
    const ids = React.useMemo(() => (plan && props ? matchIdRegions(plan.idRegions, props) : []), [plan, props]);
    const deletedIds = match ? match.deleted.map((d) => d.question.id) : [];
    const deletedKey = deletedIds.join(",");

    // Ask Gradescope whether the questions the save would delete have grading, as its editor does.
    React.useEffect(() => {
        setConfirmed(false);
        if (!deletedKey) {
            setGraded(null);
            return;
        }
        let current = true;
        client
            .gradedQuestions(deletedKey.split(",").map(Number))
            .then((g) => current && setGraded({ ids: deletedKey, graded: g }))
            .catch((e) => current && setGraded({ ids: deletedKey, graded: [], failed: e instanceof Error ? e.message : String(e) }));
        return () => {
            current = false;
        };
    }, [deletedKey, gradedAttempt]);

    function retryGradedCheck() {
        setGraded(null);
        setGradedAttempt((n) => n + 1);
    }

    const summary = match ? summarize(match, ids) : null;
    const gradedFor = graded?.ids === deletedKey ? graded : null;
    const gradedFailed = deletedKey && gradedFor?.failed ? gradedFor.failed : null;
    const gradedKnown = !deletedKey || (!!gradedFor && !gradedFailed);
    const needsConfirm = !!props?.has_submissions_and_students || (gradedKnown && (gradedFor?.graded.length ?? 0) > 0);
    const errors = [...(parsed?.errors ?? []), ...(plan?.errors ?? [])];
    const blockedReason = !text.trim()
        ? "Paste or open the regions file made from the exam."
        : errors.length
          ? `Fix the ${plural(errors.length, "error")} first.`
          : !props || !match
            ? "Loading…"
            : !summary!.any
              ? "Nothing to save: Gradescope's outline already matches."
              : gradedFailed
                ? `Could not check the questions to delete for grading (${gradedFailed}).`
                : !gradedKnown
                  ? "Checking the questions to delete for grading…"
                  : needsConfirm && !confirmed
                    ? "Confirm below that the outline may change."
                    : null;

    /** Read a regions file, or the one attached to an exam's PDF. */
    async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        e.target.value = ""; // allow choosing the same file again
        if (!f) {
            return;
        }
        const read = await run("Reading " + f.name + "…", async () => {
            const { text, attachments } = await readFileOrAttachment(f, "gradescope-regions.json");
            if (!attachments) {
                return { text, attached: false };
            }
            try {
                return { text: JSON.stringify(JSON.parse(text), null, 1), attached: true };
            } catch (e) {
                throw new Error(`The gradescope-regions.json attached to ${f.name} is not JSON: ${e instanceof Error ? e.message : String(e)}`);
            }
        });
        if (read) {
            changeText(read.text);
            if (read.attached) {
                flash(`Read the regions attached to ${f.name}.`);
            }
        }
    }

    /** Replace the regions file (a new file starts with its first exam). */
    function changeText(value: string) {
        setText(value);
        setExamIndex(0);
        setResults(null);
    }

    async function copy(text: string, label: string) {
        const copied = await run("Copying…", async () => {
            await copyText(text, dialog.current ?? document.body);
            return true;
        });
        if (copied) {
            flash(`Copied ${label} to the clipboard.`);
        }
    }

    const instructions = React.useMemo(() => outlineAiInstructions(props), [props]);
    const instructionsFile = `${examBase(props)}-regions-ai-instructions.md`;
    const iconButton = (title: string, icon: React.ReactNode, onClick: () => void) => (
        <button type="button" className="icon-button" title={title} onClick={onClick}>
            {icon}
        </button>
    );
    const instructionsTools = (
        <>
            {iconButton("Copy the AI instructions to the clipboard", <CopyIcon />, () => copy(instructions, "the AI instructions"))}
            {iconButton(`Download the AI instructions (${instructionsFile})`, <DownloadIcon />, () => download(instructions, instructionsFile, "text/markdown"))}
        </>
    );

    async function save() {
        if (!match || !props || !plan) {
            return;
        }
        setSaved(true);
        setResults(null);
        const body = outlinePayload(match, props, ids);
        const ok = await run("Saving the outline…", () => client.save(body).then(() => true));
        // Even a failed save may have changed the outline: read it again, and check it.
        const now = await reload({ keepError: !ok });
        if (!ok || !now) {
            return;
        }
        const again = matchOutline(plan.questions, now.outline);
        const left = flatten(again.questions).filter((q) => q.status !== "same");
        const idsLeft = matchIdRegions(plan.idRegions, now).filter((i) => i.status === "new" || i.status === "changed");
        setResults(
            left.length === 0 && again.deleted.length === 0 && idsLeft.length === 0
                ? [{ ok: true, message: `Saved and verified: ${plural(flatten(again.questions).length, "question")}.` }]
                : [
                      ...left.map((q) => ({ ok: false, message: `Question ${q.number}: ${q.status === "new" ? "not on Gradescope" : q.changes.join(", ")}` })),
                      ...again.deleted.map((d) => ({ ok: false, message: `Question ${d.number} is still on Gradescope.` })),
                      ...idsLeft.map((i) => ({ ok: false, message: `The ${ID_REGION_LABELS[i.key].toLowerCase()} region is not as saved.` })),
                  ]
        );
    }

    const pages = props?.template?.pages ?? [];
    const exams = file?.exams.length ?? 0;

    return (
        <>
            <button className="launcher" type="button" onClick={openDialog} title="Set this outline's questions, points, and regions from an examy exam">
                Outline JSON
            </button>
            <dialog ref={dialog} className="tool outline-tool" onClose={() => setOpen(false)}>
                <header>
                    <h2>Outline JSON{props ? ` — ${props.assignment.title}` : ""}</h2>
                    <button type="button" className="icon-button close" title="Close" aria-label="Close" onClick={() => setOpen(false)}>
                        ×
                    </button>
                </header>

                <main>
                    {busy && <p className="status">{busy}</p>}
                    {error && <p className="banner error">{error}</p>}
                    {notice && <p className="banner ok">{notice}</p>}

                    <div className={`references ${instructionsOpen ? "" : "closed"}`}>
                        <ReferenceSection
                            name="instructions"
                            label="AI instructions"
                            title="Instructions for an AI agent to make the regions file from the exam: upgrading it to examy 1.0.0 on a copy, checking its layout, the command, and gradescope.typ."
                            open={instructionsOpen}
                            setOpen={setInstructionsOpen}
                            tools={
                                <>
                                    <span className="hint">Give these to an AI agent that can read the exam and run Typst.</span>
                                    {instructionsTools}
                                </>
                            }
                            collapsedTools={instructionsTools}
                        >
                            <pre className="viewer-text" title="The AI instructions (Markdown)">
                                {instructions}
                            </pre>
                        </ReferenceSection>
                    </div>

                    <section className="regions-input">
                        <div className="row step-row">
                            <h3>
                                <span className="step">1</span> Regions from examy
                            </h3>
                            <button
                                type="button"
                                className="small"
                                title="Download gradescope.typ; put it next to the exam"
                                onClick={() => download(regionsScript, "gradescope.typ", "text/plain")}
                            >
                                <DownloadIcon /> gradescope.typ
                            </button>
                            <span className="hint">Put it next to the exam (examy 1.0.0 or later), then either:</span>
                        </div>
                        <ol className="ways">
                            <li>
                                <span className="hint">
                                    add to the exam, after examy's import, so that its PDF carries the regions (and its rubrics, for Rubric JSON):
                                </span>
                                <div className="snippet-row">
                                    <pre className="snippet" title="gradescope.typ attaches gradescope-regions.json (and examy-rubric.json) to the PDF">
                                        {IMPORT_SNIPPET}
                                    </pre>
                                    <button type="button" className="icon-button" title="Copy these lines" onClick={() => copy(IMPORT_SNIPPET, "the lines")}>
                                        <CopyIcon />
                                    </button>
                                </div>
                            </li>
                            <li>
                                <span className="hint">or, leaving the exam as it is, run next to it:</span>
                                <div className="snippet-row">
                                    <pre className="snippet" title="Writes the regions file; add --input examy=.. for another examy version (see gradescope.typ)">
                                        {regionsCommand(props)}
                                    </pre>
                                    <button type="button" className="icon-button" title="Copy the command" onClick={() => copy(regionsCommand(props), "the command")}>
                                        <CopyIcon />
                                    </button>
                                </div>
                            </li>
                        </ol>
                        <div className="row tight">
                            <label className="file-button" title="Open the exam's PDF (made with gradescope.typ in it) or the regions file">
                                <FileIcon /> Open PDF or regions file
                                <input type="file" accept=".pdf,application/pdf,.json,application/json" onChange={onFile} />
                            </label>
                            <span className="hint">or paste the regions file:</span>
                            {exams > 1 && (
                                <select value={exam} onChange={(e) => setExamIndex(Number(e.target.value))} title="The file holds several exams">
                                    {Array.from({ length: exams }, (_, k) => (
                                        <option key={k} value={k}>
                                            Exam {k + 1}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <textarea
                            value={text}
                            onChange={(e) => changeText(e.target.value)}
                            placeholder={'{ "format": "examy-gradescope-regions", … }'}
                            spellCheck={false}
                            rows={3}
                            title="The regions file. Nothing is sent to Gradescope until you press Save."
                        />
                    </section>

                    <div className="row step-row">
                        <h3>
                            <span className="step">2</span> Review the outline
                        </h3>
                        <span className="legend new-rect">new region</span>
                        <span className="legend old-rect">Gradescope's region now</span>
                    </div>
                    <div className="outline-grid">
                        <div className="outline-list">
                            {errors.length > 0 && (
                                <ul className="issues errors">
                                    {errors.map((e, k) => (
                                        <li key={k}>✗ {e.message}</li>
                                    ))}
                                </ul>
                            )}
                            {results && (
                                <ul className="results">
                                    {results.map((r, k) => (
                                        <li key={k} className={r.ok ? "ok" : "bad"}>
                                            {r.message}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            {match ? (
                                <QuestionTable match={match} ids={ids} hovered={hovered} setHovered={setHovered} graded={gradedFor?.graded ?? []} />
                            ) : (
                                !errors.length && <p className="hint">The questions appear here once there is a regions file.</p>
                            )}
                            {(plan?.warnings.length ?? 0) > 0 && (
                                <ul className="issues warnings">
                                    {plan!.warnings.map((w, k) => (
                                        <li key={k}>⚠ {w.message}</li>
                                    ))}
                                </ul>
                            )}
                            {needsConfirm && match && summary?.any && (
                                <label className="check-line confirm">
                                    <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} />
                                    {props?.has_submissions_and_students
                                        ? "This assignment has submissions. Change its outline anyway."
                                        : "Delete the questions that have grading anyway."}
                                </label>
                            )}
                        </div>
                        <div className="outline-pages" title="Gradescope's template, with the regions">
                            {pages.length === 0 && <p className="hint">{props ? "Gradescope has no template pages." : "Loading…"}</p>}
                            {pages.map((p) => (
                                <PagePreview
                                    key={p.number}
                                    url={p.url}
                                    number={p.number}
                                    match={match}
                                    ids={ids}
                                    existing={props?.outline ?? []}
                                    existingIds={props?.assignment.id_regions ?? {}}
                                    hovered={hovered}
                                />
                            ))}
                        </div>
                    </div>
                </main>

                <footer>
                    <span className="step">3</span>
                    <span className="hint">{blockedReason ?? `Save: ${summary!.text}.`}</span>
                    {gradedFailed && (
                        <button type="button" className="small" title="Ask Gradescope again whether the questions to delete have grading" onClick={retryGradedCheck}>
                            Retry
                        </button>
                    )}
                    <button type="button" className={saved ? "" : "primary"} onClick={save} disabled={!!busy || !!blockedReason} title={blockedReason ?? "Save the outline on Gradescope"}>
                        Save outline
                    </button>
                    {saved ? (
                        <>
                            <button type="button" title="Close this dialog; Gradescope's editor keeps showing the old outline" onClick={() => setOpen(false)}>
                                Close without reloading
                            </button>
                            <button
                                type="button"
                                className="primary"
                                disabled={!!busy || reloading}
                                title={reloading ? "Reloading Gradescope's editor…" : busy ? "Wait until the dialog has finished talking to Gradescope" : "Close this dialog and reload Gradescope's editor to show the new outline"}
                                onClick={() => {
                                    setReloading(true);
                                    reloadPage();
                                }}
                            >
                                {(busy || reloading) && <span className="spinner" aria-hidden="true" />}
                                {reloading ? "Reloading…" : "Close and reload"}
                            </button>
                        </>
                    ) : (
                        <button type="button" title="Close this dialog" onClick={() => setOpen(false)}>
                            Close
                        </button>
                    )}
                </footer>
            </dialog>
        </>
    );
}

const STATUS: Record<MatchedQuestion["status"], { label: string; className: string }> = {
    new: { label: "New", className: "new" },
    changed: { label: "Changes", className: "conflict" },
    same: { label: "No change", className: "same" },
};

const pagesOf = (rects: CropRect[]) => {
    const ps = [...new Set(rects.map((r) => r.page_number))];
    return ps.length === 0 ? "–" : ps.length === 1 ? `p. ${ps[0]}` : `pp. ${ps.join(", ")}`;
};

export function QuestionTable(props: { match: OutlineMatch; ids?: IdRegionMatch[]; hovered: string | null; setHovered: (n: string | null) => void; graded: number[] }) {
    const idRow = (i: IdRegionMatch) => (
        <tr key={i.key} className={`id-row ${props.hovered === i.key ? "hovered" : ""}`} onMouseEnter={() => props.setHovered(i.key)} onMouseLeave={() => props.setHovered(null)}>
            <td className="num">{i.key === "name" ? "Name" : "ID"}</td>
            <td>
                <span className="hint">{ID_REGION_LABELS[i.key]} region</span>
            </td>
            <td className="pts" />
            <td className="pgs">{i.rect ? pagesOf([i.rect]) : "–"}</td>
            <td>
                {i.status === "kept" ? (
                    <span className="tag same" title="The exam's name block has no line for it, so Gradescope's stays as it is">
                        {i.existing ? "Kept" : "None"}
                    </span>
                ) : (
                    <span className={`tag ${STATUS[i.status].className}`}>{STATUS[i.status].label}</span>
                )}
                {i.status === "changed" && <span className="hint changes"> region</span>}
            </td>
        </tr>
    );
    const row = (q: MatchedQuestion, child: boolean) => (
        <tr
            key={q.number}
            className={`${child ? "child" : ""} ${props.hovered === q.number ? "hovered" : ""}`}
            onMouseEnter={() => props.setHovered(q.number)}
            onMouseLeave={() => props.setHovered(null)}
        >
            <td className="num">{q.number}</td>
            <td title={`Examy ${q.label}${q.covers.length > 1 ? ` (with ${q.covers.slice(1).join(", ")})` : ""}`}>
                {q.title || <span className="hint">{q.existing ? "(no title)" : `examy ${q.label}`}</span>}
            </td>
            <td className="pts">{q.weight}</td>
            <td className="pgs">
                {pagesOf(q.rects)}
                {q.fallback && !q.children && (
                    <span className="tag conflict" title="No answer boxes examy marks: the region is the text to the next question or part">
                        text
                    </span>
                )}
            </td>
            <td>
                <span className={`tag ${STATUS[q.status].className}`} title={q.changes.join("; ") || undefined}>
                    {STATUS[q.status].label}
                </span>
                {q.changes.length > 0 && <span className="hint changes"> {q.changes.join(", ")}</span>}
            </td>
        </tr>
    );
    return (
        <table className="outline-table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th title="Weight on Gradescope (examy's points)">Pts</th>
                    <th>Region</th>
                    <th>Change</th>
                </tr>
            </thead>
            <tbody>
                {(props.ids ?? []).map(idRow)}
                {props.match.questions.flatMap((q) => [row(q, false), ...(q.children ?? []).map((c) => row(c, true))])}
                {props.match.deleted.map((d) => (
                    <tr key={`deleted-${d.question.id}`} className={`deleted ${d.children.length === 0 && d.number.includes(".") ? "child" : ""}`}>
                        <td className="num">{d.number}</td>
                        <td>{d.question.title || <span className="hint">(no title)</span>}</td>
                        <td className="pts">{parseFloat(d.question.weight)}</td>
                        <td className="pgs">{pagesOf(d.question.crop_rect_list ?? [])}</td>
                        <td>
                            <span className="tag error" title="Saving deletes this question from the outline">
                                Deleted
                            </span>
                            {props.graded.includes(d.question.id) && <span className="hint changes"> has grading</span>}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export function PagePreview(props: {
    url: string;
    number: number;
    match: OutlineMatch | null;
    ids?: IdRegionMatch[];
    existing: GsOutlineProps["outline"];
    existingIds?: Record<string, CropRect | null>;
    hovered: string | null;
}) {
    const leaves = props.match ? flatten(props.match.questions).filter((q) => !q.children) : [];
    const box = (r: CropRect) => ({ left: `${r.x1}%`, top: `${r.y1}%`, width: `${r.x2 - r.x1}%`, height: `${r.y2 - r.y1}%` });
    const isGroup = (id: number) => props.existing.some((q) => q.parent_id === id);
    return (
        <figure className="page">
            <img src={props.url} alt={`Page ${props.number}`} loading="lazy" />
            {props.existing
                .filter((q) => !isGroup(q.id))
                .flatMap((q) => (q.crop_rect_list ?? []).filter((r) => r.page_number === props.number).map((r, k) => <div key={`old-${q.id}-${k}`} className="rect old" style={box(r)} />))}
            {Object.entries(props.existingIds ?? {})
                .filter(([, r]) => r && r.page_number === props.number)
                .map(([key, r]) => <div key={`old-id-${key}`} className="rect old" style={box(r!)} />)}
            {(props.ids ?? [])
                .filter((i) => i.status !== "kept" && i.rect?.page_number === props.number)
                .map((i) => (
                    <div key={`id-${i.key}`} className={`rect new id ${props.hovered === i.key ? "hovered" : ""}`} style={box(i.rect!)}>
                        <span className="rect-label">{i.key === "name" ? "Name" : "ID"}</span>
                    </div>
                ))}
            {leaves.flatMap((q) =>
                q.rects
                    .filter((r) => r.page_number === props.number)
                    .map((r, k) => (
                        <div key={`new-${q.number}-${k}`} className={`rect new ${props.hovered === q.number ? "hovered" : ""} ${q.fallback ? "fallback" : ""}`} style={box(r)}>
                            <span className="rect-label">{q.number}</span>
                        </div>
                    ))
            )}
            <figcaption>Page {props.number}</figcaption>
        </figure>
    );
}
