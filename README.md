# Canvas Quiz Stats
Canvas Quiz Stats is a Greasemonkey/Tampermonkey script to allow you to download all quiz questions as well
as all personalized versions of a specific quiz.

When you use randomized question groups on a Canvas quiz, Canvas will let you inspect an individual's quiz
(and the unique order that they were presented questions in), but it will now let you batch-download
all quizzes for all students. This script adds a *Quiz Stats* button that allows access to this data.

# Installation

In Firefox or Chrome, install [Greasemonkey](https://addons.mozilla.org/en-CA/firefox/addon/greasemonkey/) or Tampermonkey.
You can then install the script by clicking [here](https://github.com/siefkenj/canvas-quiz-stats/raw/main/dist/react-userscripts.user.js).

## Gradescope in Canvas

When Gradescope is opened through Canvas, it runs inside a frame, so Ctrl+clicking a Gradescope link
normally opens the bare Gradescope page outside of Canvas. *Canvas Quiz Stats* makes links inside
Gradescope point back to Canvas instead, so Ctrl+click, middle-click, "Copy link", etc. open the page
*inside* Canvas. Plain clicks behave as usual.

These links look like `<canvas page>#gs=<Gradescope URL>`. Opening one launches Gradescope from Canvas
as usual and then shows the given page. The Canvas address bar is kept in this form as you browse, so
reloading or bookmarking returns you to the same Gradescope page.

The script must be allowed to run in frames (the default in Greasemonkey/Tampermonkey).

## Gradescope rubric JSON

On a Gradescope assignment's rubric editor (*Edit Rubric*), *Canvas Quiz Stats* adds a
**Rubric JSON** button (top right). Its dialog has:

- **AI instructions** and **Current rubric**, two reference sections that start collapsed to
  grey bars (click a bar to expand it; click the grey sidebar to collapse it again; the handle
  below them shares the height with the new rubric).
  - *AI instructions* is a Markdown file describing the JSON format, every check the uploader
    makes, and this assignment's questions. Give it to an AI agent (or follow it yourself) to
    write rubric JSON. Copy and download buttons stay on its bar when collapsed.
  - *Current rubric* is the rubric as it is on Gradescope, shown compactly the way Gradescope
    shows it (*Graphical*), as plain *Text*, or as *JSON*, with buttons to reload, copy, and
    download it (as `.json`, or `.txt` in the Text view; the download button stays on the bar
    when collapsed). Math is shown as readable Unicode; hover over it to see the LaTeX. A
    question whose positive items don't add up to its weight is marked (e.g. "sum of positive
    points: 1.5"); under negative scoring (students start with full marks), any positive items
    are marked.
- **New rubric**: paste rubric JSON into the box, open a file, or use *Autogenerate*. The file can
  also be the PDF of an [examy](https://github.com/siefkenj/typst-examy) exam made with
  `gradescope.typ` in it (see "Gradescope outline from examy"): its rubrics (`#rubric[..]`) are put
  in the box, numbered as the Outline JSON tool numbers the questions (from the regions attached
  beside them; a rubric JSON file attached instead goes in the box as it is), with Gradescope's weights and scoring types and Gradescope's math (`$x$` becomes
  `$$x$$`, `$$x$$` becomes `$$$x$$$`). What Gradescope has no place for (annotations, notes, groups
  inside groups) is left out, and listed above the box.
  - *Start from the current rubric* puts the current rubric in the box, to edit it in place;
  - *Uniform rubric for all questions…* opens a small dialog that gives every chosen question the
    same items with the same points (e.g. Correct / Partially correct / Incorrect), optionally in
    a group. It shows, for each question, the resulting points and whether they add up to its
    weight. On a negatively scored question an item worth p points becomes a deduction of the
    weight minus p (so on a 3-point question, 3 / 1.5 / 0 become 0 / −1.5 / −3);
  - *From an examy exam's PDF…* opens such a PDF, as above.

  The JSON is checked locally as you type; nothing is sent to Gradescope until you press
  *Upload*. Unknown or misspelled keys, wrong types, unknown question numbers, weights or scoring
  types that differ from Gradescope's, and malformed math (Gradescope uses `$$…$$` for inline and
  `$$$…$$$` for display math) are errors that block the upload; likely mistakes that might be
  intended are warnings, shown under the box but not blocking the upload.

Next to the box, a preview shows every question in the JSON as it will look, marking new
entries in green, removed ones in red (struck through), and edited ones in amber:
- questions that only have Gradescope's default item are marked *New*;
- questions with an existing rubric are marked *Replaces existing rubric*: uploading them deletes
  the old items, including any already applied to submissions;
- questions whose rubric already matches show *No change*.

Every question that would change is ticked; untick the ones to leave as they are (*Select all*
ticks or unticks them all). The Upload button says how many questions it sends and how many of
them replace an existing rubric.

Download and upload round-trip: a downloaded rubric can always be uploaded again unchanged (it
shows *No change* everywhere), because the checks of descriptions and points only apply to
questions whose rubric would change. After uploading, the rubric is re-read from Gradescope and
each question is verified, so downloading afterwards gives back exactly what was uploaded.
Gradescope's editor behind the dialog doesn't update by itself, so after an upload the dialog's
*Close* button becomes *Close and reload*, which reloads the editor (only the Gradescope frame,
inside Canvas); *Close without reloading* just closes the dialog.

### Gradescope rubric endpoints

There is no public API; these were found by recording Gradescope's own rubric editor.

| Request | Purpose |
| --- | --- |
| `GET /courses/:c/assignments/:a/rubric/edit.json` | questions, rubric items, groups, per-question URLs |
| `POST /courses/:c/questions/:q/rubric_items` `{"rubric_item": {description, weight, group_id}}` | create an item (response: the item) |
| `POST /courses/:c/questions/:q/rubric/create_group_with_items` `{"rubric_item_group": {description, mutually_exclusive?}, "rubric_items": [{description, weight}]}` | create a group with its items |
| `DELETE /courses/:c/questions/:q/rubric_items/:id` | delete an item |
| `DELETE /courses/:c/questions/:q/rubric_item_groups/:id` | delete a group |
| `PATCH /courses/:c/questions/:q/rubric/update_entries` `{question_id, rubric_items: {id: {position}}, rubric_item_groups: {id: {position}}}` | order a question's top-level entries |

Requests need the page's `X-CSRF-Token` and `X-Requested-With: XMLHttpRequest`. Weights are
strings. Under negative scoring, a weight is subtracted (a weight of `"1.0"` shows as −1.0);
the rubric JSON instead always uses `points`, the change to the score.

## Gradescope outline from examy

On a Gradescope assignment's outline editor (*Edit Outline*), *Canvas Quiz Stats* adds an
**Outline JSON** button. It sets the outline (questions, subquestions, points, and the region of
the page each one takes) from an exam written with [examy](https://github.com/siefkenj/typst-examy)
1.0.0 or later, with each region around the question's answer boxes, and the name and student ID
regions from the exam's name block.

1. Make the regions file with `gradescope.typ` (download it from the dialog and put it next to
   the exam). It lays the exam out as it is (adding only invisible markers) and records where
   every answer box and name block line is, each question's points, and the pages' sizes. Either:

   - run the command the dialog shows, for an exam left as it is, e.g.

     ```
     typst eval --in gradescope.typ --input exam=quiz-04a.typ 'query(<gs-regions>).first().value' > quiz-04a-regions.json
     ```

     `--input examy=1.1.0` picks the examy version the exam imports (1.0.0 by default), and
     `--input examy=path/to/src/lib.typ` an examy that is not installed as a package; or
   - make the exam's PDF carry it: after examy's import, add

     ```typst
     #import "gradescope.typ": gradescope
     #show: gradescope(e, answer-box)
     ```

     The PDF then has the regions attached as `gradescope-regions.json` (and the exam's rubrics,
     as examy exports them, as `examy-rubric.json`); `pdfdetach -save 1 exam.pdf` saves them.
     The dialogs read them from that PDF, and from one saved again by a program that keeps
     attachments (some, such as print-to-PDF, drop them). Other names work too: the Outline JSON
     dialog takes any attachment named `*regions.json`, the Rubric JSON dialog any `*rubric.json`
     or `*rubrics.json` (examy's export, or a rubric JSON file as this tool downloads it). If
     several fit, the dialog takes, in order: one whose contents are of the right kind; the name
     `gradescope.typ` gives; one named after the PDF (`midterm-regions.json` in `midterm.pdf`);
     the first in the PDF. It says which it took, and what else fits.

   Or give the dialog's **AI instructions** (collapsed at the top; copy or download them) to an AI
   agent that can read the exam and run Typst. They describe this assignment's template and
   outline, how to bring an older exam up to examy 1.0.0 on a copy in a scratch folder (without
   touching the exam's folder) and check that its layout still matches the template, the command,
   and what to check in the result, and they hold the whole of `gradescope.typ`.
2. Open the exam's PDF (made with `gradescope.typ` in it) or the regions file, or paste the regions
   file. The dialog shows the outline next to Gradescope's template,
   with the new regions drawn over its pages (Gradescope's regions now, dashed), and for each
   question its points, pages, and whether it is new, changes, or stays the same.
3. *Save outline*, then *Close and reload* to see it in Gradescope's editor.

How the exam becomes an outline:

- Each examy question is a Gradescope question. When its points are in its parts, the parts are
  subquestions; Gradescope has no third level, so a part whose points are in its subparts gives
  way to them (titled with examy's labels, e.g. "(a) i"), and a part with the points covers its
  subparts. Weights are examy's points (bonus points are not counted).
- A question's region is one rectangle per page around its answer boxes (and its parts'), 2pt past
  their borders. A question without answer boxes (such as a multiple choice one; examy also does
  not mark boxes that hold `choices`) gets its text instead, from its start to the next question
  or part, the width of the page's text; these are marked "text".
- Questions are matched to Gradescope's by number (by position: 1, 2, 2.1, ...), so they keep
  their ids, and with them their rubrics and grading. A question whose place holds a group (or
  the other way round) is new, and questions left over are deleted. Before deleting a question
  the dialog asks Gradescope whether it has grading, as Gradescope's editor does; deleting one
  that has, or changing the outline of an assignment with submissions, needs a confirmation.
- The name and student ID regions are the lines of the exam's `name-block` labelled with a name
  ("Name:", "Last name:", "Surname:") and a student ID ("Student ID:", "Student number:",
  "UTORid:", "ID:"), from the line's start to its end and a little above it. The name region takes
  the first name line and the name lines right after it ("First name:" and "Last name:" both);
  the student ID region the first student ID line. A region the name block has no line for is kept as it is.
- If Gradescope can't say whether the questions to delete have grading, the dialog won't save
  until it can: **Retry** asks again.
- Titles of questions are kept; subquestions are titled with examy's labels.

### Gradescope outline endpoints

| Request | Purpose |
| --- | --- |
| `GET /courses/:c/assignments/:a/outline/edit` (HTML) | the outline: the `data-react-props` of `[data-react-class="AssignmentOutline"]` (`assignment.id_regions`, `template.pages`, `outline`: questions with `id`, `parent_id`, `weight`, `crop_rect_list`, `index`) |
| `GET /courses/:c/assignments/:a/question_grading_data?question_ids[]=:q` | asked before deleting questions; `{}` when they have no grading |
| `PATCH /courses/:c/assignments/:a/outline/` `{"assignment": {"identification_regions": {name, sid}}, "question_data": [{id?, title, weight, crop_rect_list, children?}]}` | save the whole outline: questions with an `id` are updated, those without are created, and those left out are deleted |

Regions (`crop_rect_list`) are `{x1, x2, y1, y2, page_number}` in percent of the page from its top
left. A group has a `weight` (its subquestions' total) and a region of its own.

## Sideffects

*Canvas Quiz Stats* loads the Bootstrap CSS, which overrides some of the settings that Canvas uses. Therefore, when you load the plugin,
your Canvas page might look different to you. This is a temporary change that's only active when the script is loaded. To return to the
default styling, disable *Canvas Quiz Stats* in Greasemonkey.

# Development

## Building

To build `canvas-quiz-stats` you must have [Node.js](https://nodejs.org/en/download/) and [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).
Then, from the `canvas-quiz-stats` directory, run

```
npm install
npm run build
```

The source and its dependencies are in `userscript/`; the top-level `package.json` only runs
`userscript/`'s scripts (`npm install` there installs `userscript/`'s dependencies), so every
command below also works from inside `userscript/`.

When the build script completes, you should have a fresh version of the userscript located at `dist/react-userscripts.user.js`
(in the top-level `dist/` directory). (Ignore the message provided on the console about serving the project; that message is for
developing a normal web application, not a userscript addon.)

## Development and Dynamic Loading

When developing, it's nice to be able to get the newest version of your script upon a page
refresh. To do this, install the development version of `react-userscripts` script located
`dist/react-userscripts-dev.user.js` or click [here](https://github.com/siefkenj/canvas-quiz-stats/raw/main/dist/react-userscripts-dev.user.js).
The dev script will dynamically load the extension from port `8124`, so you can take advantage of
`create-react-app`'s ability to auto-recompile an app when the source changes.

Now, run

```
npm install    # if you haven't already
npm run dev    # or: npm start
```

and a development server should start running on `localhost:8124`. Changing any files in `userscript/src` will trigger
and automatic recompile which will be served to the dev addon on the next page reload.

## Trying the Rubric JSON tool without Gradescope

```
npm run harness
```

and open <http://localhost:8125/>. This serves a fake Gradescope rubric editor
(`userscript/dev/`) with the real Rubric JSON tool, backed by an in-memory mock of Gradescope's
rubric API with made-up data. Settings on the page simulate an assignment with submissions,
locked rubrics, a failing request, and slow responses; sample files (one valid, one with typical
AI mistakes) can be copied for pasting into the tool. The mock's data persists across reloads
until you click *Reset data*. Nothing in `userscript/dev/` is part of the built userscript.

## Tests

```
npm test
```

runs the unit tests (Vitest): the rubric tool (validation, diffs, and uploading against the
mock), the outline tool, examy rubric conversion, and reading PDF attachments. They live in
`userscript/tests/`, laid out like `userscript/src/` (`tests/rubric/upload.test.ts` tests
`src/rubric/upload.ts`), with the files they read in `fixtures/` folders beside them.
