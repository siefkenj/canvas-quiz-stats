/**
 * Dev harness: mounts the real Rubric JSON tool on a fake Gradescope rubric page, backed by
 * MockGradescope. The mock's data and settings persist in localStorage, so "Reload the page"
 * after an upload behaves like Gradescope.
 */
import React from "react";
import { createRoot } from "react-dom/client";
import { updateRubricTool } from "../src/rubric/mount";
import { Assignment } from "../src/rubric/assignment";
import { MockGradescope, type MockOptions, type MockState } from "./mock-gradescope";
import { SEED, SEED_ASSIGNMENT_ID, SEED_COURSE_ID } from "./seed";

const STORAGE_KEY = "rubric-json-harness";
const PATH = `/courses/${SEED_COURSE_ID}/assignments/${SEED_ASSIGNMENT_ID}/rubric/edit`;
if (window.location.pathname !== PATH) {
    history.replaceState(null, "", PATH);
}

const server = new MockGradescope(SEED, "dev-token");
try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "null");
    if (saved) {
        server.state = saved.state as MockState;
        server.options = { ...server.options, ...(saved.options as MockOptions), failNextWith: null };
    }
} catch {
    // start fresh
}

const listeners = new Set<() => void>();
function changed() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ state: server.state, options: server.options }));
    listeners.forEach((f) => f());
}
const mockFetch: typeof fetch = async (input, init) => {
    const res = await server.fetch(input, init);
    changed();
    return res;
};

const VALID_SAMPLE = {
    format: "gradescope-rubric",
    version: 1,
    assignment: { course_id: SEED_COURSE_ID, assignment_id: SEED_ASSIGNMENT_ID, title: "Sample Problem Set" },
    questions: [
        {
            number: "1",
            weight: 2,
            scoring: "positive",
            rubric: [
                { type: "item", points: 1, description: "**Definition**: You state the definition of $$f$$ being injective." },
                { type: "item", points: 1, description: "**Example**: Your example $$\\{1,2\\} \\to \\mathbb{Z}$$ is injective." },
                { type: "item", points: 0, description: "Incorrect" },
            ],
        },
        {
            number: "2.1",
            weight: 2,
            scoring: "positive",
            rubric: [
                {
                    type: "group",
                    description: "**Argument**\n\nTo get points here you must make the correct claim.",
                    mutually_exclusive: false,
                    items: [
                        { type: "item", points: 1, description: "**Claim**: You state the correct claim." },
                        { type: "item", points: 1, description: "**Proof**: Your proof is complete." },
                    ],
                },
                { type: "item", points: -0.5, description: "**Missing universe**" },
                { type: "item", points: 0, description: "Incorrect" },
            ],
        },
        {
            number: "3",
            weight: 3,
            scoring: "negative",
            rubric: [
                { type: "item", points: 0, description: "Correct" },
                { type: "item", points: -1, description: "Missing units" },
                { type: "item", points: -2, description: "Wrong answer" },
            ],
        },
    ],
};

// Mistakes AI agents make: quoted numbers, renamed keys, single $, LaTeX that lost its backslash.
const NEAR_MISS_SAMPLE = String.raw`{
  "format": "gradescope-rubric",
  "version": 1,
  "assignment": { "course_id": 1, "assignment_id": 1 },
  "questions": [
    { "number": 1, "weight": 2, "scoring": "positive", "rubric": [
      { "type": "item", "points": "1", "description": "Uses $x \\in \\mathbb{Z}$" },
      { "type": "item", "weight": 1, "description": "$$\text{ok} \frac{1}{2}$$" } ] },
    { "number": "2", "weight": 4, "scoring": "positive", "rubric": [
      { "type": "group", "description": "Proof", "exclusive": true, "items": [ { "points": 1, "description": "x" } ] } ] },
    { "number": "3", "weight": 3, "scoring": "positive", "rubric": [
      { "type": "item", "points": 0.333, "description": "$$ {x \\in A}$$" } ] }
  ]
}`;

function Harness() {
    const [, setTick] = React.useState(0);
    React.useEffect(() => {
        const f = () => setTick((t) => t + 1);
        listeners.add(f);
        return () => void listeners.delete(f);
    }, []);
    const set = (patch: Partial<MockOptions>) => {
        Object.assign(server.options, patch);
        changed();
    };
    const copy = (text: string) => navigator.clipboard.writeText(text);
    const assignment = new Assignment(server.state.payload);

    return (
        <>
            <div className="panel">
                <h2>Mock Gradescope settings</h2>
                <label>
                    <input type="checkbox" checked={server.options.hasSubmissions} onChange={(e) => set({ hasSubmissions: e.target.checked })} />{" "}
                    Assignment has submissions
                </label>
                <label>
                    <input type="checkbox" checked={server.options.rubricsLocked} onChange={(e) => set({ rubricsLocked: e.target.checked })} />{" "}
                    Rubrics locked
                </label>
                <label>
                    <input
                        type="checkbox"
                        checked={server.options.cascadeGroupDelete}
                        onChange={(e) => set({ cascadeGroupDelete: e.target.checked })}
                    />{" "}
                    Deleting a group deletes its items
                </label>
                <label>
                    Latency{" "}
                    <select value={server.options.latencyMs} onChange={(e) => set({ latencyMs: Number(e.target.value) })}>
                        {[0, 100, 400, 1000].map((ms) => (
                            <option key={ms} value={ms}>
                                {ms} ms
                            </option>
                        ))}
                    </select>
                </label>
                <div style={{ marginTop: 8 }}>
                    <button onClick={() => set({ failNextWith: 500 })}>
                        Fail the next request{server.options.failNextWith ? " (armed)" : ""}
                    </button>
                    <button
                        onClick={() => {
                            server.state = { payload: structuredClone(SEED), nextId: 900000 };
                            server.requests.length = 0;
                            changed();
                        }}
                    >
                        Reset data
                    </button>
                </div>
            </div>
            <div className="panel">
                <h2>Sample files to paste into the tool</h2>
                <button onClick={() => copy(JSON.stringify(VALID_SAMPLE, null, 2))}>Copy a valid file</button>
                <button onClick={() => copy(NEAR_MISS_SAMPLE)}>Copy a file with typical AI mistakes</button>
            </div>
            <div className="cols">
                <div className="panel">
                    <h2>Current rubric on the mock (as the tool would download it)</h2>
                    <pre>{JSON.stringify(assignment.toRubricFile(), null, 2)}</pre>
                </div>
                <div className="panel">
                    <h2>Requests ({server.requests.length})</h2>
                    <pre>{server.requests.slice().reverse().join("\n")}</pre>
                </div>
            </div>
        </>
    );
}

createRoot(document.getElementById("harness")!).render(<Harness />);
updateRubricTool({ fetch: mockFetch });
