# Architecture

Versio is a **monorepo** that turns Markdown into beautiful, versioned documentation sites.

## Monorepo Structure

```
versio/
├── src/app/              # Next.js App Router (the demo website)
├── packages/
│   ├── core/             # Pure Node.js library (no React)
│   ├── ui/               # React components
│   └── cli/              # CLI tool (dev, build, create)
└── docs/                 # MDX documentation content
```

## Package Dependency Graph

```
@sofelaisrael/cli ──→ @sofelaisrael/core ──→ zod, unified, remark-*, chokidar
                                     └──→ algoliasearch, semver

@sofelaisrael/ui ──→ (peer: next, react, react-dom)
               └──→ (imports type NavSection from @sofelaisrael/core)

Root app ──→ @sofelaisrael/core + @sofelaisrael/ui + next, react, gsap
```

### Key Design Decisions

- **`@sofelaisrael/core`** is pure Node.js — no React dependency. This keeps the content pipeline testable without a browser.
- **`@sofelaisrael/ui`** imports only **types** from core (no runtime code). Components are `'use client'` for Next.js hydration.
- **Packages use TypeScript path aliases** — no build step. Source is consumed directly via `tsconfig.json` paths.

## Content Pipeline

The flow from MDX file to rendered page:

```
docs/*.mdx
  │
  ▼
extractMdx()                    ← remark-parse + remark-frontmatter + remark-mdx
  │                               Extracts: frontmatter, headings, raw content
  ▼
buildContentIndex()             ← Walks docs/ directory
  │                               Resolves version ranges via semver
  │                               Builds bySlug and byVersion maps
  ▼
resolveVersions()               ← Filters versions per doc's frontmatter
  │                               e.g. version: [">=2.0"] → only 2.0, 3.0
  ▼
compileMDX()                    ← next-mdx-remote/rsc (server component)
  │                               Rehype chain: rehype-slug → @shikijs/rehype → rehypeCodeButton
  │                               Components: mdxComponents from @sofelaisrael/ui
  ▼
React Server Component          ← Rendered HTML with syntax highlighting
                                  + Sidebar + TOC + Version Picker + Search
```

### extractMdx()

Parses MDX using the unified ecosystem:

1. `remark-parse` — parse markdown to MDAST
2. `remark-frontmatter` — extract YAML/TOML frontmatter blocks
3. `remark-mdx` — handle MDX syntax extensions
4. Walk AST to collect headings (depth, text, id, content capped at 500 chars)

### buildContentIndex()

1. Recursively walks `docs/` for `.mdx` files
2. Calls `extractMdx()` on each file
3. Resolves version ranges via `resolveVersions()`
4. Builds three data structures:
   - `docs[]` — flat list of all documents
   - `bySlug` — Map keyed by slug path
   - `byVersion` — Map keyed by version string

### rehypeCodeButton

Custom HAST plugin that wraps every `<pre><code>` block with:

- A `.code-block` wrapper div
- A `.code-header` with language label + copy button
- A `.code-body` containing the original code

## Versioning System

Versions are defined in `versio.config.ts`:

```typescript
versions: {
  all: ['1.0', '2.0', '3.0'],
  default: '2.0',
  latest: '3.0',
}
```

### How docs are versioned

- **No `version` frontmatter** → doc appears in **all versions**
- **`version: [">=2.0"]`** → doc only appears in versions satisfying the semver range
- **`version: ["1.0"]`** → doc only appears in version 1.0

### Version routing

- `/docs/2.0/installation` → renders `docs/installation.mdx` for version 2.0
- `/docs/installation` → redirects to `/docs/2.0/installation` (default version)
- `/docs/1.0/installation` → renders `docs/installation.mdx` for version 1.0

## Navigation System

`buildNavTree()` scans `docs/` directory structure:

- **Directories** become `NavSection`s (label = directory name, title-cased)
- **MDX files** become `NavItem`s under their parent section
- **`index.mdx`** files define the section's landing page (excluded from items list)
- Top-level files without a directory go under a "General" section

`getAdjacentDocs()` flattens the nav tree to compute prev/next links.

## Config System

`versio.config.ts` is validated at build time by `defineConfig()` using Zod:

```typescript
VersioConfigSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  theme: z.object({ accent: z.string().optional() }).optional(),
  versions: z.object({
    all: z.array(z.string()),
    default: z.string(),
    latest: z.string(),
  }),
  search: z
    .object({
      provider: z.literal("algolia"),
      appId: z.string(),
      apiKey: z.string(),
      indexName: z.string(),
    })
    .optional(),
});
```

## Search (Algolia)

### Indexing (build-time)

`pushAlgoliaIndex()` in `packages/core/src/algolia-indexer.ts`:

1. Builds content index from all docs
2. Creates one Algolia record per heading per version
3. Each record: `objectID`, `version`, `slug`, `title`, `heading`, `content`, `url`
4. Uses `client.replaceAllObjects()` for full index replacement

### Frontend (runtime)

`packages/ui/src/components/Search.tsx`:

- Algolia InstantSearch with `algoliasearch/lite` client
- Cmd+K / Ctrl+K keyboard shortcut
- Modal overlay with search box, version facets, and hit results
- Pre-filters to current version

## CSS Design System

`src/app/globals.css` defines:

- **CSS custom properties** for theming (`--accent`, `--paper`, `--ink`)
- **`[data-theme="dark"]`** selector (themed by the custom `ThemeProvider` in `src/app/theme-provider.tsx`)
- **Design tokens**: spacing scale, border radii, shadows
- **Typography**: `--font-display` (Fraunces), `--font-sans` (Inter), `--font-mono` (JetBrains Mono)
- **Responsive breakpoints**: 640px, 768px, 1024px
- **Layout**: sidebar (260px), content (760px max), TOC (220px)
