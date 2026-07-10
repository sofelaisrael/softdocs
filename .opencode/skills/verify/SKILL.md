---
name: verify
description: >
  Verify-before-ship loop for SoftDocs. Spawn a verifier sub-agent to drive the
  app, capture screenshot/video proof, run regression tests, and open a PR with
  the proof embedded. Never ship on red.
user_invocable: true
---

# /verify — verify-before-ship loop

## Purpose

Prove that the just-built feature actually works before it ships. This is the
subjective check (does the app look and behave right?) plus the objective check
(do all tests pass?).

## Prerequisites

- Dev server running (`.\scripts\dev-local.ps1 up` or `npm run dev`)
- Changes committed on a branch
- Playwright installed (`npx playwright install chromium`)

## Procedure

### 1. Start dev server (if not running)

```powershell
.\scripts\dev-local.ps1 status
# If not running:
.\scripts\dev-local.ps1 up
```

### 2. Run unit tests

```bash
npm test
```

All tests must pass. If any fail, fix them before proceeding.

### 3. Run e2e tests

```bash
npx playwright test
```

All tests must pass. If any fail:

- Read the test output to understand what broke
- Fix the issue
- Re-run the tests
- Repeat until green

### 4. Manual verification (visual check)

Open the app in a browser and verify:

- [ ] The feature renders correctly
- [ ] No visual regressions
- [ ] Responsive layout works (mobile/tablet/desktop)
- [ ] Dark mode works (if applicable)
- [ ] No console errors

### 5. Screenshot proof

Take a screenshot of the feature working:

```bash
npx playwright screenshot --full-page http://localhost:3000/docs/2.0/ [feature-page] e2e/proof-[feature-name].png
```

### 6. Open PR

```bash
git add .
git commit -m "feat: [description]"
git push origin [branch]
gh pr create --title "feat: [description]" --body "## Verification

- [x] Unit tests pass
- [x] E2e tests pass
- [x] Visual verification complete

### Proof
![Screenshot](e2e/proof-[feature-name].png)
"
```

## Verification Checklist

| Check        | Command                   | Pass/Fail |
| ------------ | ------------------------- | --------- |
| Unit tests   | `npm test`                |           |
| E2e tests    | `npx playwright test`     |           |
| Lint         | `npm run lint`            |           |
| Type check   | `npx tsc --noEmit`        |           |
| Visual check | Manual browser inspection |           |
| Screenshot   | Captured to `e2e/`        |           |

## Failure Handling

If any check fails:

1. **Unit tests fail** — fix the code, re-run `npm test`
2. **E2e tests fail** — check if it's a test issue or a real bug, fix accordingly
3. **Lint fails** — run `npm run lint -- --fix` or fix manually
4. **Type check fails** — fix TypeScript errors
5. **Visual issue** — fix the UI, re-capture screenshot

**Never ship on red.** All checks must pass before opening a PR.
