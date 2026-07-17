# Versio — Agent Guide

> A batteries-included, Docusaurus-style documentation generator. Turn Markdown into beautiful, searchable, **versioned** static documentation sites.

## Project Identity

- **Product name:** Versio
- **Packages:** `@versio/core` (pure Node), `@versio/ui` (React/Next), `@versio/cli` (scaffold + dev/build)
- **Config file:** `versio.config.ts` at project root
- **CLI bins:** `versio` and `create-versio`

## Project Tree

```
versio/
├── versio.config.ts            # Project config (title, versions, theme, search)
├── src/                        # Canonical demo app — SINGLE SOURCE for app code
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout (fonts, theme vars, ThemeProvider)
│   │   ├── page.tsx            # Marketing homepage
│   │   ├── error.tsx           # Error boundary
│   │   ├── not-found.tsx
│   │   ├── changelog/page.tsx
│   │   └── docs/               # Documentation section
│   │       ├── [version]/[...slug]/page.tsx  # Main doc renderer (MDX)
│   │       ├── layout.tsx
│   │       ├── page.tsx
│   │       ├── _nav.tsx
│   │       └── not-found.tsx
│   ├── components/             # Navbar, Footer, BackToTop, ScrollReveal
│   └── app/theme-provider.tsx  # Custom theme provider (data-theme)
├── packages/
│   ├── core/src/               # Core library (zero React dep)
│   │   ├── config.ts           # Zod-validated config + defineConfig
│   │   ├── extract.ts          # MDX parser (frontmatter + headings)
│   │   ├── docs.ts             # Filesystem doc discovery + parsing
│   │   ├── content-index.ts    # Versioned content index builder
│   │   ├── nav.ts              # Navigation tree from filesystem
│   │   ├── version-resolver.ts # Semver version range resolution
│   │   ├── theme-builder.ts    # CSS custom properties from config
│   │   ├── algolia-indexer.ts  # Push content to Algolia
│   │   ├── watch.ts            # Chokidar file watcher
│   │   └── rehype-code-button.ts  # HAST plugin for code copy buttons
│   ├── ui/src/                 # React components (Next.js/React peer deps)
│   │   ├── sidebar.tsx         # Collapsible sidebar navigation
│   │   ├── scroll-spy.tsx      # IntersectionObserver TOC highlighter
│   │   ├── mobile-toc.tsx      # Mobile dropdown TOC
│   │   ├── version-picker.tsx  # Version switching dropdown
│   │   ├── theme-toggle.tsx    # Dark/light mode toggle
│   │   ├── copy-button.tsx     # Code copy button hydrator
│   │   ├── mdx-components.tsx  # MDX components (Callout, Steps, Tabs)
│   │   └── components/         # Search, CodeBlock, APITable
│   └── cli/                    # CLI (dev, build, create commands)
│       ├── src/index.ts        # versio + create-versio entry
│       └── template/           # Scaffold copied into new projects
│           ├── src/            # MIRRORED from root src/ via `npm run sync:template`
│           ├── package.json
│           ├── next.config.ts
│           ├── tsconfig.json
│           └── versio.config.ts
├── docs/                       # MDX documentation content (this site)
├── scripts/
│   ├── verify.js               # Screenshot/regression verification
│   ├── release.mjs             # Publish core→ui→cli in order
│   └── sync-template.mjs       # Mirror root src/ → cli template src/
├── e2e/                        # Playwright specs (docs, navigation, search)
└── public/                     # Static assets
```

## Golden Rules

1. **Strict TypeScript** — no `any` types. Use proper interfaces.
2. **No `console.log` in production code** — use proper error handling.
3. **Component naming** — React components must be `PascalCase.tsx`.
4. **Barrel exports** — packages must export everything through `index.ts`.
5. **Config validation** — always use `defineConfig()` with Zod schema.
6. **No dead code** — if it's not used, remove it.
7. **Version-aware** — all doc pages must handle version routing.
8. **Client/Server split** — UI components are `'use client'`, doc pages are server components.
9. **Single source for app code** — edit `src/` only; run `npm run sync:template` before committing CLI changes so `packages/cli/template/src` stays in sync.

## Package Dependency Graph

```
@versio/cli  →  @versio/core  →  zod, unified, remark-*, chokidar
@versio/ui   →  (peer: next, react, react-dom)
               →  (imports type NavSection from @versio/core)
Root app     →  @versio/core + @versio/ui + next, react
```

- `@versio/core` is pure Node.js — no React dependency.
- `@versio/ui` imports only types from core, no runtime code.
- Packages use TypeScript path aliases (no build step, source-only).

## Where to Look

| Task                    | Where                                                                            |
| ----------------------- | -------------------------------------------------------------------------------- |
| Add a new MDX component | `packages/ui/src/mdx-components.tsx`                                             |
| Modify config schema    | `packages/core/src/config.ts` (Zod schema)                                       |
| Change doc rendering    | `src/app/docs/[version]/[...slug]/page.tsx`                                      |
| Add a new doc page      | Create `.mdx` in `docs/`                                                         |
| Modify navigation       | `packages/core/src/nav.ts`                                                       |
| Change versioning logic | `packages/core/src/version-resolver.ts`                                          |
| Update theme/CSS        | `src/app/globals.css`                                                            |
| Add search features     | `packages/ui/src/components/Search.tsx` + `packages/core/src/algolia-indexer.ts` |
| Modify CLI commands     | `packages/cli/src/index.ts`                                                      |
| Sync CLI template       | `npm run sync:template` (mirrors `src/` → `packages/cli/template/src`)           |

## Content Pipeline

```
docs/*.mdx
  → extractMdx() (remark-parse + remark-frontmatter + remark-mdx)
  → buildContentIndex() (version resolution via semver)
  → compileMDX() (rehype-slug + @shikijs/rehype + rehypeCodeButton)
  → React render (server component)
```

## Testing

- **Unit tests:** `vitest` — run `npm test`
- **E2e tests:** `Playwright` — run `npm run test:e2e`
- **Lint:** `npm run lint` (ESLint with next/core-web-vitals + typescript)
- **Type check:** `npx tsc --noEmit`

## Loop Workflow

Every task follows the Loop engineering cycle:

```
Define → Build → Verify → Pass → Commit
                      ↓
                    Fail → Fix → Re-verify
```

### Steps

1. **Define** — Clear task definition with acceptance criteria
2. **Build** — Implement the solution
3. **Verify** — Run `node scripts/verify.js` (screenshot + regression)
4. **Pass** — If verification passes, commit changes
5. **Fail** — If verification fails, fix issues and re-verify

### Verify Script

```bash
# Verify all pages
node scripts/verify.js

# Verify specific page
node scripts/verify.js --page "/docs/3.0/configuration" --name "docs-config"
```

### Task Format

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
