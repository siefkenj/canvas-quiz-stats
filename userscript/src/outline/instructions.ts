/**
 * The "AI instructions" markdown for the outline tool: everything an AI agent (or a person) with
 * the exam's source and Typst needs to make the regions examy writes (examy 1.1.0 and later), which
 * the tool reads, including this assignment's template and outline.
 */
import { existingTree } from "./outline";
import { EXAMY_REGIONS_FORMAT, type CropRect, type GsOutlineProps } from "./types";

/** The exam's file name, from the template's ("quiz-05.pdf" → "quiz-05"). */
export function examBase(props: GsOutlineProps | null) {
    return props?.template?.filename?.replace(/(-solutions)?\.pdf$/i, "") || "exam";
}

/** The examy version whose metadata the tool reads (`embed-metadata`). */
export const EXAMY_VERSION = "1.1.0";

/** `arg` for a POSIX shell: as it is if it is safe, else single-quoted. */
export const shellQuote = (arg: string) => (/^[\w.\/=@%+:,-]+$/.test(arg) ? arg : `'${arg.replace(/'/g, `'\\''`)}'`);

/**
 * The command that compiles the template's exam with its regions attached, to a PDF of its own
 * (the layout is the same as without them).
 */
export function embedCommand(props: GsOutlineProps | null) {
    const base = examBase(props);
    return `typst compile --input embed-metadata=question-regions ${shellQuote(`${base}.typ`)} ${shellQuote(`${base}-regions.pdf`)}`;
}

/** The command that writes the regions file for the template's exam, next to it. */
export function regionsCommand(props: GsOutlineProps | null) {
    const base = examBase(props);
    return `typst eval --in ${shellQuote(`${base}.typ`)} --input embed-metadata=question-regions 'query(<examy-regions>).first().value' > ${shellQuote(`${base}-regions.json`)}`;
}

const pages = (rects: CropRect[] | null) => [...new Set((rects ?? []).map((r) => r.page_number))].join(", ") || "–";

export function outlineAiInstructions(props: GsOutlineProps | null): string {
    const base = examBase(props);
    const template = props?.template;
    const tree = props ? existingTree(props.outline) : [];
    const rows = tree.flatMap((q) => [q, ...q.children]).map((q) => {
        const title = (q.question.title ?? "").replace(/\|/g, "\\|");
        return `| \`${q.number}\` | ${title} | ${parseFloat(q.question.weight)} | ${pages(q.question.crop_rect_list)} |`;
    });
    const ids = props?.assignment.id_regions ?? {};
    const idList = (["name", "sid"] as const).map((k) => `${k === "name" ? "name" : "student ID"} ${ids[k] ? `on page ${ids[k]!.page_number}` : "not set"}`).join(", ");

    return `# Making a Gradescope regions file from an examy exam

You are helping set the outline of a Gradescope assignment (its questions, their points, and the
region of the page each one takes) from the Typst source of the exam, written with the examy
package. You will make a **regions file**: the JSON that examy ${EXAMY_VERSION} and later write about an
exam (\`examy-regions.json\`). The person then opens it in the "Outline JSON" dialog on Gradescope's
outline editor, which previews it and saves it. Do not write or edit the JSON by hand.

## This assignment

- Gradescope assignment: **${props?.assignment.title ?? "(not loaded)"}** (course ${props?.assignment.course_id ?? "?"}, assignment ${props?.assignment.id ?? "?"})
- Template PDF on Gradescope: \`${template?.filename ?? "(unknown)"}\`, ${template ? `${template.page_count} page${template.page_count === 1 ? "" : "s"}` : "page count unknown"}
- The exam is probably \`${base}.typ\`, compiled as the **student version** (\`show-solutions: false\`): the regions must match the PDF students write on, page for page.
- Has submissions: ${props?.has_submissions_and_students ? "**yes** (changing the outline is risky; tell the person)" : "no"}
- Name and student ID regions now: ${idList}

${
    rows.length
        ? `Gradescope's outline now (numbered by position, as Gradescope numbers it):

| Number | Title | Points | Pages |
| --- | --- | --- | --- |
${rows.join("\n")}

Questions keep their place: question 2 of the exam updates question 2 here (keeping its rubric),
and so on. Questions left over are deleted.`
        : "Gradescope's outline is empty now."
}

## Rules

- **Do not change the exam's file.** It is what the template PDF was made from. If it needs
  changes (an upgrade, below), make a copy next to it, so that the copy reads the same images and
  included files, and change the copy. The commands below only read the exam, and write new files
  beside it.
- What you make the regions from must lay out **exactly like the template PDF**: same pages, and
  every answer box and name block line in the same place. Text may differ slightly within a line;
  boxes and lines may not move.

## Steps

1. **Find the exam** that matches the template: \`${base}.typ\`, or ask. Note which examy version
   it imports (\`#import "@preview/examy:X.Y.Z": *\`).
2. **It needs examy ${EXAMY_VERSION} or later**, which writes the regions. If it imports an older
   version, copy it next to itself (e.g. as \`${base}-examy-${EXAMY_VERSION}.typ\`) and change the copy to
   import ${EXAMY_VERSION} (see "Upgrading to examy ${EXAMY_VERSION}"). Use the copy's name in place of
   \`${base}.typ\` below.
3. **Check the layout against the template PDF** (the person's compiled \`${base}.pdf\`, or the one
   they uploaded) if you made a copy, or are not sure the PDF is of the exam as it is now. Compile
   it to a new PDF, not over the template's (\`typst compile ${shellQuote(`${base}.typ`)} ${shellQuote(`${base}-check.pdf`)}\`), and
   compare the two page by page, e.g. render both with \`pdftoppm -r 72 -png\` and compare where
   the long horizontal and vertical lines (box borders, name lines) are. If you made a copy, fix
   the copy until they match. If the exam itself does not match the template, stop and tell the
   person: the template was made from another version of the exam, and its regions would be
   wrong.
4. **Write the regions file**, in the exam's folder:

   \`\`\`
   ${regionsCommand(props)}
   \`\`\`

   \`embed-metadata=question-regions\` has examy record the regions, and \`query(<examy-regions>)\`
   writes them out. Add \`--root\` with a folder that holds the exam and every file it reads, if
   they are not all in its folder.
5. **Check the regions file** (see "What to check") and give it to the person: they open it in
   the Outline JSON dialog, which shows the regions over the template's pages before saving.

The PDF can carry the regions instead: \`${embedCommand(props)}\` compiles the exam with
\`examy-regions.json\` attached, to a PDF of its own (laid out as the exam's; the exam's PDF is
left as it is), and the dialog opens that PDF. An exam can also attach them itself, with
\`embed-metadata: "question-regions"\` in its config (e.g.
\`#show: exam.with(embed-metadata: "question-regions")\`); only make that change if the person asks
for it, as it changes the exam's file. Do not attach the rubrics (\`embed-metadata: true\` or
\`"rubric"\`) to a PDF students will have: anyone with the PDF could read them.

## Upgrading to examy ${EXAMY_VERSION}

From examy 1.0.0: change the import; nothing else changes the layout. (The rubric data,
\`<examy-rubric>\`, has a new format, which matters only to a document that reads it.)

From examy 0.4.0 (examy's own list of breaking changes in 1.0.0, and what else it took):

- \`#points-table\` is a function: write \`#points-table()\`.
- \`num-points\` and \`num-questions\` are functions that need context: \`#context num-points()\`.
- \`maketitle\` and \`name-block\` use the document's font instead of DejaVu Sans Mono. To keep the
  layout, set the font around them:
  \`#{ set text(font: "DejaVu Sans Mono"); maketitle(); v(1em); name-block(..) }\`.
- An answer box with no \`height\` fits its content instead of being 2cm tall: give it
  \`height: 2cm\` to keep the layout.
- \`question\`, \`part\`, and \`subpart\` no longer take \`solution:\`: write \`#solution[..]\` in the body.
- \`show-solutions\` is \`true\` or \`false\` (\`none\` is not accepted).
- \`exam\` is a function: \`e.set_(exam, ..)\` and \`e.show_(exam, ..)\` no longer apply to it.
  \`#exam(questions: [..])\` still works; \`#show: exam.with(show-solutions: false)\` is the new way.

From older examy (0.1.x): \`#exam\` no longer takes \`name_list\`; drop it and put
\`#name-block()\` (in DejaVu Sans Mono, as above) where the name area was. (\`#show: e.prepare()\`
can stay.)

## What to check

The file is \`{"format": "${EXAMY_REGIONS_FORMAT}", "exam-name": .., "pages": [..], "name-block-regions": [..], "question-regions": [..]}\`
(examy's manual, "Exam metadata", has its whole schema). Positions are in pt from the page's top
left.

- \`pages\`: one per page, ${template ? `**${template.page_count}**, as the template has` : "as many as the template has"}, with their size and margins.
- \`name-block-regions\`: the name block's lines, each with its label (\`display-name\`). A line
  labelled with a name ("Name:", "Last name:") becomes Gradescope's name region, one labelled with
  a student ID ("Student ID:", "Student number:", "UTORid:") its student ID region. Without them,
  Gradescope's stay as they are.
- \`question-regions\`: every question, part, and subpart, in order: \`address\` (\`[1, 0]\` is
  2 (a)), \`display-name\`, \`level\`, its own \`points\` (not its parts'), \`start\` (the top left of
  its label), \`end\` (the bottom right of everything in it), and \`answer-boxes\`.

How the dialog turns it into the outline, to judge whether it is right:

- Each question is a Gradescope question, worth its points and its parts' (bonus points are not
  counted). If its points are in its parts, the parts are its subquestions; Gradescope has two
  levels only, so a part whose points are all in its subparts gives way to them (titled "(a) i"),
  and a part that has the points covers its subparts.
- A question's region is a rectangle per page around its answer boxes and its parts'. One with no
  answer boxes (multiple choice, say) gets its text instead, from its \`start\` to its \`end\`; so
  does a part with no answer boxes in a question whose other parts have them (its text joins the
  region). Tell the person which questions and parts have no boxes. Anything else students write
  in that is neither an answer box nor in a part of its own (a table in a question's own text, a
  blank beside a question's prompt) is outside the regions: mention it.
- A question or part with 0 points is worth 0 on Gradescope; mention any.
`;
}
