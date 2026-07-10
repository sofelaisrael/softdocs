import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "playwright-report/**",
    "test-results/**",
  ]),
  // Custom rules
  {
    rules: {
      // Ban console.log in production code (allow warn/error/info)
      "no-console": ["warn", { allow: ["warn", "error", "info"] }],
      // Enforce consistent type imports
      "@typescript-eslint/consistent-type-imports": "warn",
      // Downgrade strict Next.js rules to warnings for existing code
      "@next/next/no-html-link-for-pages": "warn",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
]);

export default eslintConfig;
