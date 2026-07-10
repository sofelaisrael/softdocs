# Testing

SoftDocs uses two layers of testing:

- **Unit tests** (vitest) — test individual functions in `@softdocs/core`
- **E2e tests** (Playwright) — test the running app in a real browser

## Quick Commands

```bash
# Unit tests
npm test                    # Run all unit tests
npm test -- --watch         # Watch mode
npm test -- --coverage      # With coverage

# E2e tests
npx playwright test         # Run all e2e tests
npx playwright test --ui    # Interactive UI mode
npx playwright show-report  # View HTML report

# Lint + type check
npm run lint                # ESLint
npx tsc --noEmit            # TypeScript check
```

## Unit Tests

Location: `packages/core/src/__tests__/`

### Running

```bash
npm test                    # Run once
npm test -- --watch         # Watch mode (reruns on file change)
npm test -- --reporter=verbose  # Detailed output
```

### Writing Tests

Unit tests live next to the code they test in `__tests__/` directories. Use the `.test.ts` extension.

Example structure:

```typescript
import { describe, it, expect } from "vitest";
import { myFunction } from "../my-module";

describe("myFunction", () => {
  it("should do something specific", () => {
    const result = myFunction(input);
    expect(result).toBe(expected);
  });

  it("should handle edge cases", () => {
    expect(() => myFunction(null)).toThrow();
  });
});
```

### What to Test

- **`config.ts`** — `defineConfig()` validates correctly, throws on invalid config
- **`extract.ts`** — `extractMdx()` parses frontmatter, extracts headings with correct depth/text/id
- **`nav.ts`** — `buildNavTree()` creates correct sections from directory structure
- **`version-resolver.ts`** — `resolveVersions()` filters correctly for semver ranges
- **`content-index.ts`** — `buildContentIndex()` builds correct maps

## E2e Tests

Location: `e2e/`

### Running

```bash
npx playwright test                     # Run all tests
npx playwright test e2e/docs.spec.ts    # Run specific file
npx playwright test --headed            # Watch in browser
npx playwright test --debug             # Step through with inspector
```

### Writing Tests

E2e tests use Playwright. They test the running app in a real browser.

Example structure:

```typescript
import { test, expect } from "@playwright/test";

test.describe("Documentation pages", () => {
  test("should render a doc page", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await expect(page.locator("h1")).toBeVisible();
  });

  test("should switch versions", async ({ page }) => {
    await page.goto("/docs/2.0/installation");
    await page.click("[data-version-picker]");
    await page.click("text=3.0");
    await expect(page).toHaveURL(/\/docs\/3\.0\//);
  });
});
```

### What to Test

- **Doc pages** — render correctly, show correct content for version
- **Version switching** — picker navigates to correct version
- **Search** — Cmd+K opens modal, returns results
- **Navigation** — sidebar links work, prev/next links work
- **Dark mode** — toggle switches theme

### Fixtures

Playwright config includes:

- **Video recording** — all test runs are recorded
- **Screenshots** — on failure
- **Traces** — for debugging failures
- **Base URL** — `http://localhost:3000` (dev server must be running)

### Setup

Before running e2e tests, start the dev server:

```bash
npm run dev &
npx playwright test
```

Or use the `scripts/dev-local.sh` script which handles this.

## CI Integration

### GitHub Actions

```yaml
# .github/workflows/test.yml
name: Test
on: [push, pull_request]
jobs:
  unit:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npm test
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20 }
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run dev &
      - run: npx playwright test
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

## Coverage

Generate coverage reports:

```bash
npm test -- --coverage
```

Coverage config in `vitest.config.ts`:

```typescript
coverage: {
  provider: 'v8',
  reporter: ['text', 'html', 'lcov'],
  include: ['packages/core/src/**/*.ts'],
  exclude: ['**/__tests__/**', '**/*.test.ts'],
}
```
