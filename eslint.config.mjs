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
    // Generated CLI build output
    "packages/cli/dist/**",
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
      // Allow intentionally-unused args prefixed with underscore
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
    },
  },
  // CLI, scripts, and public assets are tooling — console output is intended.
  {
    files: ["packages/cli/src/**", "scripts/**", "public/**"],
    rules: {
      "no-console": "off",
    },
  },
]);

export default eslintConfig;
