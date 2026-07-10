import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",
    include: ["packages/core/src/**/*.test.ts"],
    exclude: ["node_modules", ".next", "playwright-report", "test-results"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      include: ["packages/core/src/**/*.ts"],
      exclude: ["**/__tests__/**", "**/*.test.ts"],
    },
  },
  resolve: {
    alias: {
      "@softdocs/core": path.resolve(__dirname, "packages/core/src"),
      "@softdocs/ui": path.resolve(__dirname, "packages/ui/src"),
    },
  },
});
