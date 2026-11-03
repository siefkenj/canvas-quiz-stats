import React from "react";
import FileSaver from "file-saver";
import type { Assignment } from "./assignment";
import type { GradescopeClient } from "./api";
import { diffEntries, plainEntries, rubricText } from "./diff";
import { useModal } from "./hooks";
import { ChevronDownIcon, CopyIcon, DownloadIcon, FileIcon, PlusIcon, RefreshIcon, SparkleIcon } from "./icons";
import { aiInstructions } from "./instructions";
import { EntryList, QuestionHeader } from "./RubricView";
import { selectablePlans, selectedPlans, selectionSummary } from "./selection";
import { UniformRubricDialog } from "./UniformRubric";
import { uploadPlans, type UploadResult } from "./upload";
import { validateRubricText, type Issue, type QuestionPlan, type ValidationResult } from "./validate";
import { rubricFromExamy, rubricsKind, RUBRICS_ATTACHMENT, type ExamyRubrics } from "./from-examy";
import { findAttachment, readFileOrAttachment } from "../pdf-attachments";
import { REGIONS_ATTACHMENT } from "../outline/outline";
import type { RegionsFile } from "../outline/types";

const slug = (s: string) =>
    s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "assignment";
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

export function download(text: string, filename: string, type: string) {
    FileSaver.saveAs(new Blob([text], { type: `${type};charset=utf-8` }), filename);
}

/** Reload the page. Inside Canvas this reloads only the Gradescope frame. */
const reloadPage = () => window.location.reload();

/** Copy text, falling back to a selected textarea where the Clipboard API is unavailable. */
export async function copyText(text: string, host: Node) {
    try {
        await navigator.clipboard.writeText(text);
    } catch {
        const area = document.createElement("textarea");
        area.value = text;
        area.style.position = "fixed";
        area.style.opacity = "0";
        host.appendChild(area);
        area.select();
        const ok = document.execCommand("copy");
        area.remove();
        if (!ok) {
            throw new Error("Copying is blocked here; switch to the Text or JSON view and copy by hand.");
        }
    }
}

type View = "graphical" | "text" | "json";
const VIEWS: { id: View; label: string; title: string }[] = [
    { id: "graphical", label: "Graphical", title: "Show the rubric as Gradescope does, compactly" },
    { id: "text", label: "Text", title: "Show the rubric as plain text" },
    { id: "json", label: "JSON", title: "Show the rubric as JSON, in the format the upload accepts" },
];

/** The least height for the open reference sections (their sideways labels need room). */
const MIN_REFERENCE_HEIGHT = { one: 170, both: 336 };
const MIN_UPLOAD_HEIGHT = 220;

export function RubricTool({ client }: { client: GradescopeClient }) {
    const dialog = React.useRef<HTMLDialogElement>(null);
    const mainRef = React.useRef<HTMLElement>(null);
    const referencesRef = React.useRef<HTMLDivElement>(null);
    const [open, setOpen] = React.useState(false);
    const [busy, setBusy] = React.useState<string | null>(null);
    const [error, setError] = React.useState<string | null>(null);
    const [notice, setNotice] = React.useState<string | null>(null);
    const [assignment, setAssignment] = React.useState<Assignment | null>(null);
    const [view, setView] = React.useState<View>("graphical");
    const [instructionsOpen, setInstructionsOpen] = React.useState(false);
    const [currentOpen, setCurrentOpen] = React.useState(false);
    /** Height of the reference sections set by dragging the splitter (null: automatic). */
    const [referencesHeight, setReferencesHeight] = React.useState<number | null>(null);
    const [uniformOpen, setUniformOpen] = React.useState(false);
    const [text, setText] = React.useState("");
    const [checked, setChecked] = React.useState<{ text: string; result: ValidationResult } | null>(null);
    const [unticked, setUnticked] = React.useState<Set<string>>(new Set());
    const [panel, setPanel] = React.useState<"preview" | "results">("preview");
    const [log, setLog] = React.useState<string[]>([]);
    const [uploadResults, setUploadResults] = React.useState<UploadResult[] | null>(null);
    /** What converting an exam's PDF into the box left out (see `rubricFromExamy`). */
    const [imported, setImported] = React.useState<{ from: string; warnings: string[] } | null>(null);
    const fileInput = React.useRef<HTMLInputElement>(null);
    /** An upload was started, so Gradescope's own editor (behind the dialog) may be out of date. */
    const [uploaded, setUploaded] = React.useState(false);
    /** "Close and reload" was pressed; the page is reloading. */
    const [reloading, setReloading] = React.useState(false);

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
            "Loading the rubric from Gradescope…",
            async () => {
                const a = await client.load();
                setAssignment(a);
                return a;
            },
            { keepError }
        );

    function openDialog() {
        // The reference sections start collapsed, so the dialog opens on the new rubric.
        setInstructionsOpen(false);
        setCurrentOpen(false);
        setReferencesHeight(null);
        setOpen(true);
        reload();
    }

    function flash(message: string) {
        setNotice(message);
        window.setTimeout(() => setNotice((n) => (n === message ? null : n)), 2500);
    }

    // Check the upload box locally (no network) shortly after each change.
    React.useEffect(() => {
        if (!assignment || !text.trim()) {
            setChecked(null);
            return;
        }
        const timer = window.setTimeout(
            () => setChecked({ text, result: validateRubricText(text, assignment) }),
            250
        );
        return () => window.clearTimeout(timer);
    }, [text, assignment]);

    const file = React.useMemo(() => assignment?.toRubricFile() ?? null, [assignment]);
    const exports = React.useMemo(() => {
        if (!assignment || !file) {
            return null;
        }
        const base = slug(assignment.title);
        return {
            base,
            json: { text: JSON.stringify(file, null, 2) + "\n", filename: `${base}-rubric.json`, type: "application/json" },
            text: { text: rubricText(file.questions), filename: `${base}-rubric.txt`, type: "text/plain" },
            instructions: { text: aiInstructions(assignment), filename: `${base}-rubric-ai-instructions.md`, type: "text/markdown" },
        };
    }, [assignment, file]);
    const current = exports ? (view === "text" ? exports.text : exports.json) : null;
    const instructions = exports?.instructions;

    async function copy(what: { text: string }, label: string) {
        const copied = await run("Copying…", async () => {
            await copyText(what.text, dialog.current ?? document.body);
            return true;
        });
        if (copied) {
            flash(`Copied ${label} to the clipboard.`);
        }
    }

    /** Replace the upload box (a new file starts with every question selected). */
    function replaceText(value: string) {
        setImported(null);
        setText(value);
        setUnticked(new Set());
        setPanel("preview");
    }

    /** Load a rubric JSON file, or the rubrics attached to an exam's PDF (by gradescope.typ). */
    async function onFile(e: React.ChangeEvent<HTMLInputElement>) {
        const f = e.target.files?.[0];
        e.target.value = ""; // allow choosing the same file again after editing it
        if (!f) {
            return;
        }
        const converted = await run(`Reading ${f.name}…`, async () => {
            const { text, attachments, attached } = await readFileOrAttachment(f, RUBRICS_ATTACHMENT);
            if (!attachments || !attached) {
                return { text, from: null, warnings: null };
            }
            const from = `${attached.name} from ${f.name}`;
            const notes = attached.others.length ? [`${f.name} also has ${attached.others.join(", ")}; this is ${attached.name}.`] : [];
            const kind = rubricsKind(text);
            if (kind === "rubric-file") {
                // Already a rubric JSON file: as it is, for the box to check.
                return { text: JSON.stringify(JSON.parse(text), null, 2) + "\n", from, warnings: notes };
            }
            if (kind !== "examy") {
                throw new Error(`The ${attached.name} attached to ${f.name} is neither examy's rubrics nor a rubric JSON file.`);
            }
            const a = assignment ?? (await client.load());
            const regions = findAttachment(attachments, REGIONS_ATTACHMENT, f.name);
            const { file, warnings } = rubricFromExamy(
                JSON.parse(text) as ExamyRubrics[],
                regions && REGIONS_ATTACHMENT.is(regions.text) ? (JSON.parse(regions.text) as RegionsFile) : null,
                a
            );
            return { text: JSON.stringify(file, null, 2) + "\n", from, warnings: [...notes, ...warnings] };
        });
        if (converted) {
            replaceText(converted.text);
            if (converted.from && converted.warnings) {
                setImported({ from: converted.from, warnings: converted.warnings });
            }
        }
    }

    const minReferencesHeight = () => (instructionsOpen && currentOpen ? MIN_REFERENCE_HEIGHT.both : MIN_REFERENCE_HEIGHT.one);
    const maxReferencesHeight = () => Math.max(minReferencesHeight(), (mainRef.current?.clientHeight ?? 0) - MIN_UPLOAD_HEIGHT);
    const clampReferences = (h: number) => Math.round(Math.max(minReferencesHeight(), Math.min(maxReferencesHeight(), h)));

    function startResize(e: React.PointerEvent<HTMLDivElement>) {
        const refs = referencesRef.current;
        if (!refs) {
            return;
        }
        e.preventDefault();
        const handle = e.currentTarget;
        handle.setPointerCapture(e.pointerId);
        const startY = e.clientY;
        const startHeight = refs.getBoundingClientRect().height;
        const move = (ev: PointerEvent) => setReferencesHeight(clampReferences(startHeight + ev.clientY - startY));
        const up = () => {
            handle.removeEventListener("pointermove", move);
            handle.removeEventListener("pointerup", up);
            handle.removeEventListener("pointercancel", up);
        };
        handle.addEventListener("pointermove", move);
        handle.addEventListener("pointerup", up);
        handle.addEventListener("pointercancel", up);
    }

    function resizeByKey(e: React.KeyboardEvent<HTMLDivElement>) {
        const step = e.key === "ArrowUp" ? -24 : e.key === "ArrowDown" ? 24 : 0;
        const refs = referencesRef.current;
        if (step && refs) {
            e.preventDefault();
            setReferencesHeight(clampReferences(refs.getBoundingClientRect().height + step));
        }
    }

    const result = checked?.text === text ? checked.result : null;
    const pending = !!text.trim() && !result;
    const plans = result?.plans ?? [];
    const toUpload = selectedPlans(plans, unticked);
    const summary = selectionSummary(plans, unticked);
    const locked = !!assignment?.payload.rubrics_locked;
    const blockedReason = !text.trim()
        ? "Paste or autogenerate rubric JSON to upload it."
        : pending
          ? "Checking…"
          : result!.errors.length
            ? `Fix the ${plural(result!.errors.length, "error")} first.`
            : locked
              ? "Rubrics are locked for this assignment."
              : summary.selectable === 0
                ? "Nothing to upload: every question already matches."
                : summary.selected === 0
                  ? "No question is selected."
                  : null;
    const replacing =
        summary.replacing === 0
            ? ""
            : summary.replacing === summary.selected
              ? summary.selected === 1
                  ? "; it replaces an existing rubric"
                  : "; all of them replace existing rubrics"
              : summary.replacing === 1
                ? "; 1 of them replaces an existing rubric"
                : `; ${summary.replacing} of them replace existing rubrics`;
    const uploadSummary = `${plural(summary.selected, "question")} will be uploaded${replacing}.`;

    async function upload() {
        setUploaded(true);
        setUploadResults(null);
        setLog([]);
        setPanel("results");
        const results = await run("Uploading…", () =>
            uploadPlans(client, toUpload, { log: (m) => setLog((l) => [...l, m]) })
        );
        if (results) {
            setUploadResults(results);
        } else {
            setPanel("preview"); // the error banner says what went wrong
        }
        // Even a failed upload may have changed some questions.
        await reload({ keepError: !results });
    }

    const hasResults = log.length > 0 || !!uploadResults;
    const anyReferenceOpen = instructionsOpen || currentOpen;
    const bothReferencesOpen = instructionsOpen && currentOpen;

    const iconButton = (title: string, icon: React.ReactNode, onClick: () => void, disabled = false) => (
        <button type="button" className="icon-button" title={title} onClick={onClick} disabled={disabled}>
            {icon}
        </button>
    );
    const instructionsTools = (
        <>
            {iconButton("Copy the AI instructions to the clipboard", <CopyIcon />, () => instructions && copy(instructions, "the AI instructions"), !instructions)}
            {iconButton(
                `Download the AI instructions (${instructions?.filename ?? ".md"})`,
                <DownloadIcon />,
                () => instructions && download(instructions.text, instructions.filename, instructions.type),
                !instructions
            )}
        </>
    );
    const downloadCurrent = iconButton(
        view === "text" ? `Download the current rubric as text (${current?.filename ?? ".txt"})` : `Download the current rubric as JSON (${current?.filename ?? ".json"})`,
        <DownloadIcon />,
        () => current && download(current.text, current.filename, current.type),
        !current
    );

    return (
        <>
            <button className="launcher" type="button" onClick={openDialog} title="Download, preview, or upload this rubric as JSON">
                Rubric JSON
            </button>
            <dialog
                ref={dialog}
                className="tool"
                onClose={() => {
                    setOpen(false);
                    setUniformOpen(false);
                }}
            >
                <header>
                    <h2 title={assignment ? `Assignment ${assignment.assignmentId}` : undefined}>
                        Rubric JSON{assignment ? ` — ${assignment.title}` : ""}
                    </h2>
                    <button type="button" className="icon-button close" title="Close" aria-label="Close" onClick={() => setOpen(false)}>
                        ×
                    </button>
                </header>

                <main ref={mainRef}>
                    {busy && <p className="status" title="Working">{busy}</p>}
                    {error && <p className="banner error" title="Error">{error}</p>}
                    {notice && <p className="banner ok">{notice}</p>}
                    {imported && (
                        <div className={`banner ${imported.warnings.length ? "warning" : "ok"}`} title="Converting the exam's rubrics">
                            Read {imported.from}.
                            {imported.warnings.length > 0 && (
                                <ul className="issues">
                                    {imported.warnings.map((w, k) => (
                                        <li key={k}>{w}</li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}

                    <div
                        ref={referencesRef}
                        className={`references ${bothReferencesOpen ? "both" : ""} ${anyReferenceOpen && referencesHeight !== null ? "sized" : ""} ${anyReferenceOpen ? "" : "closed"}`}
                        style={anyReferenceOpen && referencesHeight !== null ? { height: referencesHeight } : undefined}
                    >
                        <ReferenceSection
                            name="instructions"
                            label="AI instructions"
                            title="Instructions for an AI agent to write rubric JSON for this assignment: the format, every check, and the questions."
                            open={instructionsOpen}
                            setOpen={setInstructionsOpen}
                            tools={
                                <>
                                    <span className="hint">Give these to an AI agent to write the new rubric.</span>
                                    {instructionsTools}
                                </>
                            }
                            collapsedTools={instructionsTools}
                        >
                            <pre className="viewer-text" title="The AI instructions (Markdown)">
                                {instructions?.text ?? ""}
                            </pre>
                        </ReferenceSection>
                        <ReferenceSection
                            name="current"
                            label="Current rubric"
                            title="The rubric as it is on Gradescope now."
                            open={currentOpen}
                            setOpen={setCurrentOpen}
                            tools={
                                <>
                                    <div className="segmented" role="group" aria-label="View">
                                        {VIEWS.map((v) => (
                                            <button
                                                key={v.id}
                                                type="button"
                                                className={view === v.id ? "on" : ""}
                                                aria-pressed={view === v.id}
                                                title={v.title}
                                                onClick={() => setView(v.id)}
                                            >
                                                {v.label}
                                            </button>
                                        ))}
                                    </div>
                                    {iconButton("Reload the rubric from Gradescope", <RefreshIcon />, () => reload(), !!busy)}
                                    {iconButton(
                                        view === "text" ? "Copy the rubric as text" : "Copy the rubric JSON",
                                        <CopyIcon />,
                                        () => current && copy(current, view === "text" ? "the rubric text" : "the rubric JSON"),
                                        !current
                                    )}
                                    {downloadCurrent}
                                </>
                            }
                            collapsedTools={downloadCurrent}
                        >
                            {!file ? (
                                <p className="hint">Loading…</p>
                            ) : view === "graphical" ? (
                                <div className="rb">
                                    {file.questions.map((q) => (
                                        <div key={q.number} className="rb-question">
                                            <QuestionHeader number={q.number} title={q.title} weight={q.weight} scoring={q.scoring} rubric={q.rubric} />
                                            <EntryList entries={plainEntries(q.rubric)} />
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <pre className="viewer-text" title={view === "text" ? "The rubric as text" : "The rubric as JSON"}>
                                    {current?.text ?? ""}
                                </pre>
                            )}
                        </ReferenceSection>
                    </div>

                    {anyReferenceOpen && (
                        <div
                            className="splitter"
                            role="separator"
                            aria-orientation="horizontal"
                            tabIndex={0}
                            title="Drag (or use the arrow keys) to share the height with the new rubric; double-click to size automatically"
                            onPointerDown={startResize}
                            onKeyDown={resizeByKey}
                            onDoubleClick={() => setReferencesHeight(null)}
                        />
                    )}

                    <section className="upload">
                        <div className="ref-bar new-bar">
                            <span className="ref-bar-label" title="The rubric to upload: paste it, open a file, or autogenerate it">
                                <PlusIcon />
                                <span className="ref-label">New rubric</span>
                            </span>
                            <Menu
                                label={
                                    <>
                                        <SparkleIcon /> Autogenerate <ChevronDownIcon />
                                    </>
                                }
                                title="Fill the box below with a generated rubric (replacing what is in it)"
                                disabled={!exports}
                                items={[
                                    {
                                        label: "Start from the current rubric",
                                        title: "Put the current rubric in the box, to edit it and upload it again",
                                        onClick: () => exports && replaceText(exports.json.text),
                                    },
                                    {
                                        label: "Uniform rubric for all questions…",
                                        title: "Give every chosen question the same items with the same points (as deductions on negatively scored questions)",
                                        onClick: () => setUniformOpen(true),
                                    },
                                    {
                                        label: "From an examy exam's PDF…",
                                        title: "The rubrics (#rubric[..]) of an exam whose PDF was made with gradescope.typ in it (#show: gradescope(e, answer-box)), as Gradescope's: see Outline JSON for gradescope.typ",
                                        onClick: () => fileInput.current?.click(),
                                    },
                                ]}
                            />
                            <label className="icon-button file-button" title="Load a rubric JSON file into the box below, or the rubrics of an examy exam's PDF made with gradescope.typ">
                                <FileIcon />
                                <input ref={fileInput} type="file" accept=".json,application/json,.pdf,application/pdf" onChange={onFile} />
                            </label>
                            {iconButton(
                                "Download the JSON in the box",
                                <DownloadIcon />,
                                () => download(text, `${exports?.base ?? "assignment"}-new-rubric.json`, "application/json"),
                                !text.trim()
                            )}
                            {text && (
                                <button type="button" className="link" title="Empty the box" onClick={() => replaceText("")}>
                                    Clear
                                </button>
                            )}
                        </div>
                        <div className="upload-grid">
                            <div className="upload-input">
                                <div className="row step-row">
                                    <h3 title="Paste rubric JSON, open a file, or autogenerate one from the menu above">
                                        <span className="step">1</span> Paste rubric JSON
                                    </h3>
                                </div>
                                <textarea
                                    value={text}
                                    placeholder={'Paste rubric JSON here (e.g. one written by an AI agent from the AI instructions), or use Autogenerate above.\n\n{ "format": "gradescope-rubric", … }'}
                                    onChange={(e) => setText(e.target.value)}
                                    spellCheck={false}
                                    title="Rubric JSON to upload. It is checked as you type; nothing is sent until you press Upload."
                                />
                                <div className="check-area">
                                    <CheckStatus text={text} pending={pending} result={result} toUpload={summary.selected} />
                                </div>
                            </div>
                            <div className="upload-output">
                                <div className="row step-row">
                                    <h3 title="What the upload will change on Gradescope">
                                        <span className="step">2</span> Review the changes
                                    </h3>
                                </div>
                                <div className="upload-preview">
                                    {panel === "results" && hasResults ? (
                                        <Results log={log} results={uploadResults} back={() => setPanel("preview")} />
                                    ) : (
                                        <Preview
                                            result={result}
                                            unticked={unticked}
                                            toggle={(n) =>
                                                setUnticked((s) => {
                                                    const next = new Set(s);
                                                    next.has(n) ? next.delete(n) : next.add(n);
                                                    return next;
                                                })
                                            }
                                            setAll={(on) => setUnticked(on ? new Set() : new Set(selectablePlans(plans).map((p) => p.number)))}
                                            hasSubmissions={!!assignment?.payload.has_submissions_and_students}
                                            showResults={hasResults ? () => setPanel("results") : undefined}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </section>
                </main>

                <footer>
                    <span className="step" title="Step 3: upload the selected questions">3</span>
                    <span className="hint" title={blockedReason ?? uploadSummary}>
                        {blockedReason ?? uploadSummary}
                    </span>
                    <button
                        type="button"
                        className={uploaded ? "" : "primary"}
                        onClick={upload}
                        disabled={!!busy || !!blockedReason}
                        title={blockedReason ?? `Upload to Gradescope: ${uploadSummary}`}
                    >
                        {blockedReason ? "Upload" : `Upload ${plural(summary.selected, "question")}`}
                    </button>
                    {uploaded ? (
                        <>
                            <button type="button" title="Close this dialog; Gradescope's editor keeps showing the old rubric" onClick={() => setOpen(false)}>
                                Close without reloading
                            </button>
                            <button
                                type="button"
                                className="primary"
                                disabled={!!busy || reloading}
                                title={
                                    reloading
                                        ? "Reloading Gradescope's editor…"
                                        : busy
                                          ? "Wait until the dialog has finished talking to Gradescope"
                                          : "Close this dialog and reload Gradescope's editor to show the new rubric"
                                }
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

            <UniformRubricDialog
                assignment={assignment}
                open={open && uniformOpen}
                onClose={() => setUniformOpen(false)}
                onCreate={(f) => {
                    replaceText(JSON.stringify(f, null, 2) + "\n");
                    setUniformOpen(false);
                }}
            />
        </>
    );
}

/**
 * A reference section (AI instructions, current rubric). Expanded, a grey sidebar with its name
 * written sideways collapses it; collapsed, it is a grey bar with its name and a few tools.
 */
export function ReferenceSection(props: {
    name: string;
    label: string;
    title: string;
    open: boolean;
    setOpen: (open: boolean) => void;
    tools: React.ReactNode;
    collapsedTools: React.ReactNode;
    children: React.ReactNode;
}) {
    if (!props.open) {
        return (
            <section className={`ref ${props.name} collapsed`}>
                <div className="ref-bar">
                    <button type="button" className="ref-bar-toggle" aria-expanded={false} title={`${props.title} Click to expand.`} onClick={() => props.setOpen(true)}>
                        <ChevronDownIcon />
                        <span className="ref-label">{props.label}</span>
                    </button>
                    {props.collapsedTools}
                </div>
            </section>
        );
    }
    return (
        <section className={`ref ${props.name} open`}>
            <button type="button" className="ref-sidebar" aria-expanded={true} title={`${props.title} Click to collapse.`} onClick={() => props.setOpen(false)}>
                <ChevronDownIcon />
                <span className="ref-label">{props.label}</span>
            </button>
            <div className="ref-body">
                <div className="row tight ref-tools">{props.tools}</div>
                <div className="viewer">{props.children}</div>
            </div>
        </section>
    );
}

function Results(props: { log: string[]; results: UploadResult[] | null; back: () => void }) {
    return (
        <div className="preview-body">
            <div className="row tight">
                <h3>Upload results</h3>
                <button type="button" className="link" title="Show the preview of the box's JSON again" onClick={props.back}>
                    Back to the preview
                </button>
            </div>
            {props.results ? (
                <>
                    <ul className="results">
                        {props.results.map((r) => (
                            <li key={r.number} className={r.ok ? "ok" : "bad"} title={r.ok ? "Verified against Gradescope" : "Needs attention"}>
                                <b>Q{r.number}</b>: {r.message}
                            </li>
                        ))}
                    </ul>
                    <p className="hint">
                        Gradescope's editor does not update by itself; <i>Close and reload</i> to see the new rubric in it.
                    </p>
                </>
            ) : (
                <pre className="log" title="Progress of the upload">{props.log.join("\n")}</pre>
            )}
        </div>
    );
}

interface MenuItem {
    label: React.ReactNode;
    title: string;
    onClick: () => void;
}

function Menu(props: { label: React.ReactNode; title: string; disabled?: boolean; items: MenuItem[] }) {
    const [open, setOpen] = React.useState(false);
    return (
        <div className="menu">
            <button
                type="button"
                className="menu-button"
                aria-haspopup="menu"
                aria-expanded={open}
                disabled={props.disabled}
                title={props.title}
                onClick={() => setOpen((o) => !o)}
            >
                {props.label}
            </button>
            {open && (
                <>
                    <div className="menu-backdrop" onClick={() => setOpen(false)} />
                    <div className="menu-list" role="menu" onKeyDown={(e) => e.key === "Escape" && setOpen(false)}>
                        {props.items.map((item, k) => (
                            <button
                                key={k}
                                type="button"
                                role="menuitem"
                                title={item.title}
                                onClick={() => {
                                    setOpen(false);
                                    item.onClick();
                                }}
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

function IssueList({ issues, kind }: { issues: Issue[]; kind: "error" | "warning" }) {
    return (
        <ul className={`issues ${kind}`}>
            {issues.map((i, k) => (
                <li key={k} title={i.path}>
                    {i.question && <b>Q{i.question} </b>}
                    <code>{i.path}</code>: {i.message}
                </li>
            ))}
        </ul>
    );
}

function CheckStatus(props: {
    text: string;
    pending: boolean;
    result: ValidationResult | null;
    toUpload: number;
}) {
    const { result } = props;
    if (!props.text.trim()) {
        return (
            <p className="check-status idle" title="Nothing to check yet">
                Paste rubric JSON above, open a file, or use Autogenerate.
            </p>
        );
    }
    if (props.pending || !result) {
        return <p className="check-status idle">Checking…</p>;
    }
    const unchanged = result.plans.filter((p) => p.status === "unchanged").length;
    return (
        <>
            {result.errors.length > 0 ? (
                <p className="check-status bad" title="The JSON was checked locally; nothing was sent to Gradescope">
                    ✗ {plural(result.errors.length, "error")}. Nothing can be uploaded until {result.errors.length === 1 ? "it is" : "they are"} fixed.
                </p>
            ) : (
                <p className="check-status good" title="The JSON was checked locally; nothing was sent to Gradescope">
                    ✓ Valid. {plural(result.plans.length, "question")} in the file
                    {unchanged ? `, ${unchanged} unchanged` : ""}; {plural(props.toUpload, "question")} will be uploaded.
                </p>
            )}
            {result.errors.length > 0 && <IssueList issues={result.errors} kind="error" />}
            {result.warnings.length > 0 && (
                <div className="banner warning">
                    ⚠ {plural(result.warnings.length, "warning")} (likely mistakes; they don't block the upload):
                    <IssueList issues={result.warnings} kind="warning" />
                </div>
            )}
        </>
    );
}

function SelectAll(props: { selected: number; selectable: number; setAll: (on: boolean) => void }) {
    const box = React.useRef<HTMLInputElement>(null);
    const all = props.selectable > 0 && props.selected === props.selectable;
    React.useEffect(() => {
        if (box.current) {
            box.current.indeterminate = props.selected > 0 && !all;
        }
    });
    return (
        <label className="select-all" title={all ? "Untick every question" : "Tick every question that would change"}>
            <input ref={box} type="checkbox" checked={all} onChange={(e) => props.setAll(e.target.checked)} />
            Select all
            <span className="hint">
                ({props.selected} of {plural(props.selectable, "question")} selected)
            </span>
        </label>
    );
}

function Preview(props: {
    result: ValidationResult | null;
    unticked: Set<string>;
    toggle: (number: string) => void;
    setAll: (on: boolean) => void;
    hasSubmissions: boolean;
    showResults?: () => void;
}) {
    const { result } = props;
    const resultsLink = props.showResults && (
        <button type="button" className="link" title="Show the results of the last upload" onClick={props.showResults}>
            Show the upload results
        </button>
    );
    if (!result) {
        return (
            <div className="preview-body">
                <p className="hint preview-empty" title="The preview appears once the JSON can be read">
                    Preview of the upload
                </p>
                {resultsLink}
            </div>
        );
    }
    if (result.plans.length === 0) {
        return (
            <div className="preview-body">
                <p className="hint preview-empty">Nothing to preview: no question in the file could be read.</p>
                {resultsLink}
            </div>
        );
    }
    const summary = selectionSummary(result.plans, props.unticked);
    return (
        <>
            <div className="preview-bar">
                {summary.selectable > 0 ? (
                    <SelectAll selected={summary.selected} selectable={summary.selectable} setAll={props.setAll} />
                ) : (
                    <span className="hint" title="Nothing would change">
                        Every question already matches.
                    </span>
                )}
                {resultsLink}
            </div>
            <div className="preview-body rb">
                {props.hasSubmissions && summary.replacing > 0 && (
                    <p className="banner warning" title="Replacing a rubric deletes its old items">
                        This assignment has submissions. Replacing a rubric deletes its old items, including any already applied to submissions, which changes those scores.
                    </p>
                )}
                {result.plans.map((p) => (
                    <PreviewQuestion
                        key={p.number}
                        plan={p}
                        errors={result.errors.filter((e) => e.question === p.number)}
                        checked={!props.unticked.has(p.number)}
                        toggle={() => props.toggle(p.number)}
                    />
                ))}
            </div>
        </>
    );
}

function PreviewQuestion(props: { plan: QuestionPlan; errors: Issue[]; checked: boolean; toggle: () => void }) {
    const { plan } = props;
    const { next } = plan;
    const changes = plan.status !== "unchanged";
    const status =
        plan.status === "unchanged" ? (
            <span className="tag same" title="The rubric on Gradescope already matches; nothing will be sent">
                No change
            </span>
        ) : plan.status === "create" ? (
            <span className="tag new" title="This question only has Gradescope's default item (or none), so the rubric is filled in">
                New
            </span>
        ) : (
            <span className="tag conflict" title="This question already has a different rubric. Uploading it deletes the old items and adds these.">
                Replaces existing rubric
            </span>
        );
    return (
        <div className={`rb-question ${changes && !props.checked ? "skipped" : ""}`}>
            <QuestionHeader
                number={next.number}
                title={plan.current.title}
                weight={next.weight}
                scoring={next.scoring}
                rubric={next.rubric}
                before={
                    changes && (
                        <input
                            type="checkbox"
                            className="pick"
                            checked={props.checked}
                            onChange={props.toggle}
                            title={props.checked ? `Q${next.number} will be uploaded; untick to leave it as it is` : `Q${next.number} will be left as it is; tick to upload it`}
                        />
                    )
                }
            >
                {status}
                {props.errors.length > 0 && (
                    <span className="tag error" title={props.errors.map((e) => e.message).join("\n")}>
                        {plural(props.errors.length, "error")}
                    </span>
                )}
            </QuestionHeader>
            {changes && <EntryList entries={diffEntries(plan.current.rubric, next.rubric)} />}
        </div>
    );
}
