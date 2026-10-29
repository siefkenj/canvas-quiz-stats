import { defineConfig } from "vite";

// Dev harness for the Gradescope Rubric JSON tool: a fake rubric editor page backed by an
// in-memory mock of Gradescope's API. Run with `npm run harness`; never part of the build.
export default defineConfig({
    root: "dev",
    appType: "spa", // serve index.html at /courses/1/assignments/1/rubric/edit
    // All interfaces, so it is reachable from outside a dev container
    server: { port: 8125, strictPort: true, host: "0.0.0.0" },
    define: { "process.env.NODE_ENV": JSON.stringify("development") },
});
