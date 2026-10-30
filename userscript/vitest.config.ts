import { defineConfig } from "vitest/config";

// Unit tests, in tests/ (beside src/, which they test; the main vite.config.ts builds the userscript).
export default defineConfig({
    test: {
        include: ["tests/**/*.test.{ts,tsx}"],
        environment: "node",
    },
});
