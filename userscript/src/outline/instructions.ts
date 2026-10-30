/**
 * The "AI instructions" markdown for the outline tool: everything an AI agent (or a person) with
 * the exam's source and Typst needs to write the regions file the tool reads, including this
 * assignment's template and outline, and the whole of `gradescope.typ`.
 */
import regionsScript from "./gradescope.typ?raw";
import { existingTree } from "./outline";
import { REGIONS_FORMAT, REGIONS_FORMAT_VERSION, type CropRect, type GsOutlineProps } from "./types";

/** The exam's file name, from the template's ("quiz-05.pdf" → "quiz-05"). */
export function examBase(props: GsOutlineProps | null) {
    return props?.template?.filename?.replace(/(-solutions)?\.pdf$/i, "") || "exam";
}

/** What an exam adds after examy's import to have its PDF carry the regions (and its rubrics). */
export const IMPORT_SNIPPET = `#import "gradescope.typ": gradescope
#show: gradescope(e, answer-box)`;

/** `arg` for a POSIX shell: as it is if it is safe, else single-quoted. */
export const shellQuote = (arg: string) => (/^[\w.\/=@%+:,-]+$/.test(arg) ? arg : `'${arg.replace(/'/g, `'\\''`)}'`);

/** The command that writes the regions file for the template's exam. */
export function regionsCommand(props: GsOutlineProps | null) {
    const base = examBase(props);
    return `typst eval --in gradescope.typ --input ${shellQuote(`exam=${base}.typ`)} 'query(<gs-regions>).first().value' > ${shellQuote(`${base}-regions.json`)}`;
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
package. You will write a **regions file**: JSON that \`gradescope.typ\` (below) writes
from the exam. The person then opens it in the "Outline JSON" dialog on Gradescope's outline
editor, which previews it and saves it. Do not write or edit the JSON by hand.

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

- **Work in a scratch folder, not in the exam's folder.** Do not change, add, or compile anything
  in the exam's folder. Copy the exam into the scratch folder (with any files it reads: images,
  included files), and make any changes (below) to the copy.
- The copy must lay out **exactly like the template PDF**: same pages, and every answer box and
  name block line in the same place. Text may differ slightly within a line; boxes and lines may
  not move.

## Steps

1. **Find the exam** that matches the template: \`${base}.typ\`, or ask. Copy it into the scratch
   folder, and note which examy version it imports (\`#import "@preview/examy:X.Y.Z": *\`).
2. **It needs examy 1.0.0 or later.** If it imports an older version, change the copy to import
   1.0.0 (see "Upgrading to examy 1.0.0"). If Typst says \`version 1.0.0 does not exist\`, examy
   1.0.0 is not published yet: clone <https://github.com/siefkenj/typst-examy> and import its
   \`src/lib.typ\` by path instead (e.g. clone it into the scratch folder and
   \`#import "typst-examy/src/lib.typ": *\`).
3. **Check the layout against the template PDF** (the person's compiled \`${base}.pdf\`, or the one
   they uploaded). Compile the copy (into the scratch folder) and compare it page by page, e.g. render both with
   \`pdftoppm -r 72 -png\` and compare where the long horizontal and vertical lines (box borders,
   name lines) are. Fix the copy until they match.
4. **Save \`gradescope.typ\`** (below) in the scratch folder, next to the copy, and run:

   \`\`\`
   ${regionsCommand(props)}
   \`\`\`

   there. Add \`--input examy=1.1.0\` if the exam imports a
   version other than 1.0.0; if it imports examy by path, add
   \`--input examy=path/to/src/lib.typ\` (the path as seen from \`gradescope.typ\`). If the exam and examy are not inside the folder of
   \`gradescope.typ\`, add \`--root\` with a folder that holds them all.
5. **Check the regions file** (see "What to check") and give it to the person: they open it in
   the Outline JSON dialog, which shows the regions over the template's pages before saving.

(Exams can also carry this data themselves: with \`#import "gradescope.typ": gradescope\` and
\`#show: gradescope(e, answer-box)\` after examy's import, their PDF has \`gradescope-regions.json\`
(and \`examy-rubric.json\`) attached. Only make that change if the person asks for it: it changes
the exam's file.)

## Upgrading to examy 1.0.0

From examy 0.4.0 (examy's own list of breaking changes, and what else it took):

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

The file is \`{"format": "${REGIONS_FORMAT}", "version": ${REGIONS_FORMAT_VERSION}, "pages": [..], "names": [..], "ends": [..], "exams": [[..]]}\`:

- \`pages\`: one per page, ${template ? `**${template.page_count}**, as the template has` : "as many as the template has"}, with their size and margins in pt.
- \`names\`: the name block's lines with their labels. A line labelled with a name ("Name:") becomes
  Gradescope's name region, one labelled with a student ID ("Student ID:", "Student number:",
  "UTORid:") its student ID region. Without them, Gradescope's stay as they are.
- \`exams[0]\`: every question, part, and subpart: \`number\` ("2.1" is 2 (a)), \`label\`, \`level\`,
  \`points\`, \`start\`, and \`boxes\` (each answer box's top left and bottom right, inside its \`inset\`).
  Positions are in pt from the page's top left.

How the dialog turns it into the outline, to judge whether it is right:

- Each question is a Gradescope question, worth its points (bonus points are not counted). If its
  points are in its parts, the parts are its subquestions; Gradescope has two levels only, so a
  part whose points are all in its subparts gives way to them (titled "(a) i"), and a part that
  has the points covers its subparts.
- A question's region is a rectangle per page around its answer boxes and its parts'. One with no
  answer boxes (multiple choice, or a box examy does not mark, such as one holding \`choices\`)
  gets its text instead, from its start to the next question or part. Tell the person which
  questions have no boxes.
- A question or part with 0 points is worth 0 on Gradescope; mention any.

## gradescope.typ

\`\`\`typst
${regionsScript.trimEnd()}
\`\`\`
`;
}
