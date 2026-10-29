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
- **New rubric**: paste rubric JSON into the box, open a file, or use *Autogenerate*:
  - *Start from the current rubric* puts the current rubric in the box, to edit it in place;
  - *Uniform rubric for all questions…* opens a small dialog that gives every chosen question the
    same items with the same points (e.g. Correct / Partially correct / Incorrect), optionally in
    a group. It shows, for each question, the resulting points and whether they add up to its
    weight. On a negatively scored question an item worth p points becomes a deduction of the
    weight minus p (so on a 3-point question, 3 / 1.5 / 0 become 0 / −1.5 / −3).

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

runs the unit tests for the rubric tool (validation, diffs, and uploading against the mock).
