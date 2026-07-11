# Loop Workflow

Every task follows the Loop engineering cycle:

```
Define → Build → Verify → Pass → Commit
                      ↓
                    Fail → Fix → Re-verify
```

## Steps

### 1. Define

Clear task definition with acceptance criteria before coding.

```markdown
## Task: [Brief description]

**Acceptance criteria:**

- [ ] Criterion 1
- [ ] Criterion 2

**Files to modify:**

- path/to/file.tsx

**Verification:**

- Page renders correctly
- No console errors
- Screenshot matches expected design
```

### 2. Build

Implement the solution following project conventions:

- Strict TypeScript (no `any`)
- No `console.log` in production
- PascalCase component names
- Barrel exports through `index.ts`
- core-never-imports-UI boundary

### 3. Verify

Run playwright verification to check all pages render correctly.

```powershell
# Verify all pages
node scripts/verify.js

# Verify specific page
node scripts/verify.js --page "/docs/3.0/configuration" --name "docs-config"
```

### 4. Pass/Fail

- **Pass** → Commit changes with descriptive message
- **Fail** → Fix issues, re-verify, then commit

## Page Checklist

Every task should verify these pages render correctly:

| Page                   | Route                         |
| ---------------------- | ----------------------------- |
| Home                   | `/`                           |
| Docs - Configuration   | `/docs/3.0/configuration`     |
| Docs - Getting Started | `/docs/3.0/getting-started`   |
| Docs - Versioning      | `/docs/3.0/guides/versioning` |
| Docs - API Reference   | `/docs/3.0/reference/api`     |
| Changelog              | `/changelog`                  |
| Pricing                | `/pricing`                    |
| Components             | `/components`                 |

## Phase 2 Tasks

### Task: APITable Component

**Acceptance criteria:**

- [ ] APITable component renders API documentation
- [ ] Supports method badges (GET, POST, etc.)
- [ ] Supports parameter rows
- [ ] Works in dark mode

**Files to modify:**

- `packages/ui/src/mdx-components.tsx`
- `packages/ui/src/index.ts`

### Task: Algolia Search Integration

**Acceptance criteria:**

- [ ] Search bar appears in navbar
- [ ] Search returns relevant results
- [ ] Results link to correct version/URL
- [ ] Works with Algolia free tier

**Files to modify:**

- `packages/ui/src/components/Search.tsx`
- `packages/core/src/algolia-indexer.ts`
- `src/components/Navbar.tsx`

### Task: Theme System (30 CSS Variables)

**Acceptance criteria:**

- [ ] ~30 CSS custom properties defined
- [ ] Dark mode uses all variables
- [ ] Light mode uses all variables
- [ ] theme.config.ts override works

**Files to modify:**

- `src/app/globals.css`
- `packages/core/src/theme-builder.ts`
