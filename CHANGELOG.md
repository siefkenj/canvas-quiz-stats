# Changelog

## 1.8.2 (2026-11-03)

### Fixed

-   A rubric JSON file no longer needs an `"assignment"`: the page says which assignment it is, so
    one file can be uploaded to several assignments (e.g., the versions of a quiz). If the file
    has one, it must still match the page.

## 1.8.1 (2026-11-03)

### Added

-   The dialogs find an exam PDF's attachments by more names: the Outline JSON dialog any
    `*regions.json`, the Rubric JSON dialog any `*rubric.json` or `*rubrics.json`, which may also be
    a rubric JSON file (put in the box as it is). If several fit, one whose contents are of the
    right kind comes first, then `gradescope.typ`'s name, then one named after the PDF, then the
    first in the PDF; the dialog says which it took and what else fits.

### Fixed

-   The Outline JSON preview draws Gradescope's regions on top of the new ones, numbered, so they
    show where the two are the same; and draws a group's own region when its subquestions have
    none.
-   Subquestions are found under their group also if Gradescope gives their parent's id as text.
-   The name region no longer reaches over other lines of the name block: it takes the first name
    line and the name lines right after it, not every name line on the page.
-   Editing the regions file by hand keeps the chosen exam; only opening a file goes back to the
    first.

## 1.8.0 (2026-10-30)

### Added

-   The Rubric JSON and Outline JSON dialogs read the files attached to an exam's PDF also when
    another program has saved the PDF again (packing its objects into object streams, or writing
    names as hex or UTF-16). If a PDF has no attachment, the message says that some programs drop
    them.
-   The name region takes every line of the name block labelled with a name on its page ("First
    name:" and "Last name:"), and more labels are recognised ("Surname:", "Given names:", "ID:");
    "Tutorial ID:" and "Username:" are not taken for a student ID or a name.

### Fixed

-   "Fetch Quiz Submissions with Answers" works again. It asked for the submissions of the quiz's
    assignment id instead of its quiz id, which Canvas refused.
-   The Outline JSON dialog no longer plans to delete every question when the regions file is
    replaced by one with fewer exams than the one chosen; a file without the chosen exam is an
    error.
-   If Gradescope can't say whether the questions an outline save would delete have grading, the
    dialog says so and offers *Retry*, instead of waiting forever.
-   A PDF whose attached regions are not JSON is reported, not silently ignored.
-   The command the Outline JSON dialog shows quotes file names with spaces.

### Development

-   Tests and their fixtures moved from beside the code in `userscript/src/` to
    `userscript/tests/`, which mirrors `src/`.

## 1.7.0 (2026-10-29)

### Added

-   **Outline JSON** tool on Gradescope's outline editor (`/courses/…/assignments/…/outline/edit`):
    sets the outline (questions, subquestions, points, and regions) from an examy exam, with each
    region around the question's answer boxes (or its text, if it has none), and the name and
    student ID regions from its name block. `gradescope.typ`, downloadable from the
    dialog, writes the regions file from the exam with `typst eval`, or, imported by the exam
    (`#show: gradescope(e, answer-box)`), attaches it to the exam's PDF along with examy's
    export of the exam's rubrics; examy itself is unchanged. The dialog shows both ways, and opens
    the exam's PDF as well as the regions file.
    Subparts are folded into Gradescope's two levels and titled with examy's labels. Its
    *AI instructions* tell an AI agent how to make the regions file, including upgrading an exam
    to examy 1.0.0 on a copy, and hold the whole of `gradescope.typ`. The dialog
    previews the regions over the template's pages next to Gradescope's, keeps questions' ids
    (and so their rubrics), checks questions it would delete for grading, and verifies the
    outline after saving.
-   The Rubric JSON dialog opens the PDF of an examy exam made with `gradescope.typ` in it (also
    from *Autogenerate*), and puts its rubrics in the box, numbered as the Outline JSON tool numbers
    the questions, with Gradescope's weights, scoring types, and math.
-   After an upload, the Rubric JSON dialog's *Close* button becomes *Close and reload*, which
    closes the dialog and reloads Gradescope's editor to show the new rubric (inside Canvas, only
    the Gradescope frame is reloaded). It is disabled, with a spinner, until the upload has
    finished. *Close without reloading* is also offered.

### Fixed

-   The Rubric JSON tool works inside Canvas with Greasemonkey in Firefox. Its requests to
    Gradescope are now sent as the page, so they carry the page's login (they failed with 401).
-   If creating a question's new rubric fails partway, the entries already created are removed
    again, so the question keeps its old rubric.
-   If the rubric can't be re-read after an upload, each uploaded question is reported as not
    verified, instead of all the results being lost. The dialog re-reads the rubric after every
    upload, even one that failed.
-   An upload skips questions whose points or scoring type changed since the file was checked,
    and uploads nothing if rubrics were locked in the meantime.
-   Rubric items whose group no longer exists are shown as ungrouped items, and are replaced on
    upload.
-   "Copied … to the clipboard" only appears when copying worked.
-   The uniform rubric dialog keeps the chosen questions when the rubric is reloaded.
-   The uniform rubric's tooltips no longer say that its points are scaled to each question.
-   An error from a failed upload is no longer cleared by the rubric's reload after it.

### Development

-   A top-level `package.json` runs `userscript/`'s scripts from the repository root
    (`npm install`, `npm run dev`/`npm start`, `npm run build`, `npm test`, `npm run harness`).

## 1.6.0 (2026-10-16)

### Added

-   **Rubric JSON** tool on Gradescope's rubric editor (`/courses/…/assignments/…/rubric/edit`),
    both inside Canvas and on its own. A *Rubric JSON* button opens a dialog with:
    -   "AI instructions": a markdown file describing the JSON format, every check the uploader
        makes, and the assignment's questions, so an AI agent can write a valid file;
    -   the current rubric, shown compactly as Gradescope does, as text, or as JSON, with buttons
        to reload, copy, and download it. Questions whose positive items don't add up to their
        weight (or, under negative scoring, that have positive items) are marked;
    -   both of these start collapsed to grey bars that keep their download buttons, and can be
        resized against the new rubric;
    -   a box for the new rubric's JSON: pasted, opened from a file, or autogenerated (from the
        current rubric, or as a uniform rubric: the same items and points on every chosen
        question, turned into deductions on negatively scored ones). It is checked locally as you
        type: unknown keys, wrong types, question numbers, weights, scoring types, and Gradescope
        math markdown (including LaTeX that lost its backslashes to JSON escaping) block the
        upload; likely mistakes that might be intended (such as positive points under negative
        scoring) are shown as warnings. Nothing is sent until *Upload* is pressed.
-   A preview beside the box shows each question as it will look, with added, removed, and
    edited entries marked, and whether it is new, replaces an existing rubric, or has no change.
    Every question that would change is ticked for upload; untick any to leave them as they are.
    After uploading, the rubric is re-read from Gradescope and every question is verified.
-   The dialog fits the window: the reference sections, the new rubric's box, the check results,
    and the preview each scroll by themselves.
-   Download and upload round-trip: a downloaded rubric always uploads unchanged ("No change"
    everywhere), since content checks only apply to questions that would change, and downloading
    after an upload gives back exactly what was uploaded.

### Development

-   `npm run harness` serves a fake Gradescope rubric editor with an in-memory mock of the
    rubric API, for trying the Rubric JSON tool without Gradescope. It is not part of the build.
-   `npm test` runs unit tests (Vitest) for the rubric tool; CI runs them too.

## 1.5.0 (2026-10-05)

### Added

-   Gradescope links work inside Canvas. When Gradescope is opened through Canvas, links in
    Gradescope now point back to Canvas, so Ctrl+click, middle-click, and "Copy link" open the
    page inside Canvas instead of on bare Gradescope. Plain clicks work as before.
-   The Canvas address bar follows the Gradescope page you are on, so reloading or bookmarking
    returns to the same Gradescope page.
-   The script now also runs on `www.gradescope.ca` and `www.gradescope.com`. On Gradescope, it
    only does the link rewriting above, and only when Gradescope is embedded in Canvas.

### Development

-   The source is TypeScript built with Vite. The source files missing after the Vite
    conversion have been restored.
-   A GitHub Actions workflow checks that the source builds and that `dist/` is up to date.
-   The development userscript (`dist/react-userscripts-dev.user.js`) also
    runs on Gradescope.

Changes before 1.5.0 were not recorded.
