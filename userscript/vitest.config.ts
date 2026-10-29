import { defineConfig } from "vitest/config";

// Unit tests for the rubric tool (the main vite.config.ts builds the userscript).
export default defineConfig({
    test: {
        include: ["src/**/*.test.{ts,tsx}", "dev/**/*.test.{ts,tsx}"],
        environment: "node",
    },
});
