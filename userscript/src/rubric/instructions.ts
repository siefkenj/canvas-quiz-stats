/**
 * The "AI instructions" markdown: everything an AI agent (or a person) needs to write a rubric
 * JSON file that the uploader accepts, including this assignment's questions.
 */
import type { Assignment } from "./assignment";
import { RUBRIC_FORMAT, RUBRIC_FORMAT_VERSION, type RubricFile } from "./types";

export function aiInstructions(assignment: Assignment): string {
    const file = assignment.toRubricFile();
    const rows = assignment.leafQuestions.map((q) => {
        const status = assignment.hasOnlyDefaultRubric(q.id)
            ? "empty (Gradescope's default item only)"
            : `${assignment.entries(q.id).length} existing entries`;
        const title = q.title ? q.title.replace(/\|/g, "\\|") : "";
        return `| \`${q.full_index}\` | ${title} | ${parseFloat(q.weight)} | ${q.scoring_type} | ${status} |`;
    });
    const parents = assignment.questions.filter((q) => assignment.isParent(q));

    const example: RubricFile = {
        format: RUBRIC_FORMAT,
        version: RUBRIC_FORMAT_VERSION,
        assignment: file.assignment,
        questions: [
            {
                number: "1",
                weight: 2,
                scoring: "positive",
                rubric: [
                    {
                        type: "item",
                        points: 1,
                        description:
                            "**Correct claim**: You claim that $$f(x)=x^2$$ is not injective on $$\\mathbb{R}$$.",
                    },
                    {
                        type: "group",
                        description: "**Proof**",
                        mutually_exclusive: false,
                        items: [
                            {
                                type: "item",
                                points: 1,
                                description:
                                    "**Counterexample**: You give $$x \\neq y$$ with $$f(x)=f(y)$$, e.g. $$x=1$$, $$y=-1$$.",
                            },
                            {
                                type: "item",
                                points: -0.5,
                                description:
                                    "**Missing braces**: You wrote the set $$\\{1,-1\\}$$ as $$1,-1$$.",
                            },
                        ],
                    },
                    { type: "item", points: 0, description: "Incorrect" },
                ],
            },
        ],
    };

    return `# Writing a Gradescope rubric JSON file

These instructions describe the JSON file that the *Rubric JSON* tool (part of the Canvas Quiz
Stats userscript) uploads to Gradescope. The uploader checks the file strictly and rejects
anything that does not follow these rules **exactly**, so follow them to the letter.

## This assignment

- Assignment: **${assignment.title}** (course id \`${assignment.courseId}\`, assignment id \`${assignment.assignmentId}\`)
- Questions that can have a rubric:

| number | title | weight | scoring | current rubric |
| --- | --- | --- | --- | --- |
${rows.join("\n")}
${
    parents.length
        ? `\nQuestions ${parents.map((q) => `\`${q.full_index}\``).join(", ")} only group their parts; they cannot have a rubric.\n`
        : ""
}
The best starting point is the current rubric as JSON (the dialog's JSON view), which has this exact
structure filled in with the current rubric.

## File structure

An illustrative file for a 2-point, positively scored question \`"1"\` (use the numbers,
weights and scoring from the table above):

\`\`\`json
${JSON.stringify(example, null, 2)}
\`\`\`

### Top level
An object with exactly these keys:
- \`"format"\`: the string \`"${RUBRIC_FORMAT}"\`.
- \`"version"\`: the number \`${RUBRIC_FORMAT_VERSION}\`.
- \`"assignment"\` (optional): an object with \`"course_id"\` (\`${assignment.courseId}\`) and
  \`"assignment_id"\` (\`${assignment.assignmentId}\`), both numbers, and optionally \`"title"\` (a
  string; not uploaded). If given, it must match this assignment. Leave it out to use the same file
  for several assignments.
- \`"questions"\`: a non-empty array of questions.

### Questions
Each question is an object with exactly these keys:
- \`"number"\`: the question number from the table above, as a **string** (\`"3.1"\`, not \`3.1\`).
- \`"weight"\`: a number equal to the question's weight in the table. (The rubric cannot change it.)
- \`"scoring"\`: \`"positive"\` or \`"negative"\`, equal to the table.
- \`"rubric"\`: a non-empty array of rubric entries, in the order they should appear.
- \`"title"\` (optional): a string. It is informational and not uploaded.

Include only the questions whose rubric you want to set; questions that are left out are not
touched. Each question may appear only once.

### Rubric entries
An entry is either an **item** or a **group**.

An item has exactly these keys:
- \`"type"\`: \`"item"\`.
- \`"points"\`: a number with at most two decimal places.
- \`"description"\`: a non-empty string (Gradescope markdown, see below).

A group has exactly these keys:
- \`"type"\`: \`"group"\`.
- \`"description"\`: a non-empty string, shown as the group's heading.
- \`"mutually_exclusive"\`: \`true\` if graders may apply at most one of its items, otherwise \`false\`.
- \`"items"\`: a non-empty array of items (groups cannot be nested).

### Points
\`"points"\` is always **the change to the student's score** when the item is applied:
- Under **positive** scoring the student starts at 0. Use positive points for credit and negative
  points for penalties. The positive items should add up to the question's weight (an exclusive
  group counts only its best item); the uploader warns if they don't.
- Under **negative** scoring the student starts at full marks. Use negative points for deductions
  (e.g. \`-1\`) and \`0\` for "Correct". The uploader converts this to Gradescope's own convention,
  and warns about positive points (which would give more than full marks).
- Use \`0\` for feedback-only items such as "Incorrect" or "Blank".

## Descriptions: Gradescope markdown

Descriptions are markdown, as rendered by Gradescope:
- \`**bold**\`, \`*italic*\`, bullet lists (\`* item\`), and paragraphs separated by a blank line.
- **Inline math is \`$$...$$\`** and **display math is \`$$$...$$$\`**. A single \`$\` is *not* math
  and is rejected. \`\\(...\\)\` and \`\\[...\\]\` are not rendered and are rejected.
- Math is LaTeX: \`\\mathbb{Z}\`, \`\\in\`, \`\\subseteq\`, \`\\Rightarrow\`, \`\\le\`, \`\\neq\`, \`\\frac{a}{b}\`.
- Set braces must be escaped: \`$$\\{x \\in \\mathbb{Z} : x > 0\\}$$\`. Plain \`{ }\` are invisible in LaTeX.

### Backslashes in JSON
JSON strings use backslash escapes, so **every LaTeX backslash must be written twice** in the
JSON file: \`"$$\\\\frac{1}{2}$$"\`, \`"$$\\\\{0\\\\}$$"\`. With a single backslash, \`"\\frac"\` becomes a
form feed followed by "rac", \`"\\text"\` a tab followed by "ext", and \`"\\neq"\` a line break
followed by "eq". The uploader detects these and rejects the file.

## What the uploader checks

Errors (the upload is blocked until every one is fixed):
- The file is valid JSON with exactly the keys described above (unknown keys are errors, including
  look-alikes such as \`"weight"\` for an item, \`"exclusive"\`, or \`"text"\`).
- Types are exact: numbers are not quoted, \`"number"\` is a string, \`"mutually_exclusive"\` is a boolean.
- \`"format"\`, \`"version"\`, and the assignment ids match.
- Every question number exists on this assignment, is not a question that only groups parts, and
  appears once; its \`"weight"\` and \`"scoring"\` match Gradescope.
- No empty rubrics, groups, or descriptions, and no Gradescope placeholder text.
- Points have at most two decimal places.
- Math delimiters pair up, there is no single \`$\`, no \`\\(\` \`\\)\` \`\\[\` \`\\]\`, braces balance inside
  math, and there are no control characters (from LaTeX backslashes lost to JSON escaping).

The checks of descriptions, points, and empty rubrics or groups only apply to questions whose
rubric would change. A rubric downloaded from Gradescope can always be uploaded again unchanged,
even if what is already on Gradescope breaks these rules.

Warnings (shown to the user before uploading; fix them unless they are intended):
- Under positive scoring, the positive items don't add up to the question's weight.
- Under negative scoring, an item has positive points (deductions must be negative).
- An item is worth more than the whole question.
- A \`{\` in math that doesn't start a LaTeX argument (probably an unescaped set brace).
- Typst-style or ASCII math (\`RR\`, \`ZZ\`, \`<=\`, \`=>\`), or a line break inside math.
- Two items in a question with the same description.
- The assignment title differs from the one on Gradescope.

## How the upload works

The user pastes the JSON (or picks a file) in the *Rubric JSON* dialog on the assignment's rubric
page and sees a preview of every question before anything is changed:
- A question whose rubric is empty (only Gradescope's default item) is filled in.
- A question that already has a rubric is shown with a diff; uploading it deletes the old items.
- A question whose rubric already matches the file is marked "No change".
- Every question that would change is ticked; the user can untick questions to leave them as they
  are.
`;
}
