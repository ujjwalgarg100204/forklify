/// <references types="vitest" />

import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vitest/config";

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: ["./app/testing/vitest-setup.ts"],
    },
    resolve: {
        alias: {
            "@ui": path.resolve(__dirname, "app", "components", "ui"),
            "@utils": path.resolve(__dirname, "app", "utils"),
            "@": path.resolve(__dirname),
        },
    },
});
