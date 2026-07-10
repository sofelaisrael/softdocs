#!/usr/bin/env node

import { execSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { watchDocs } from "@softdocs/core";

const CWD = process.cwd();
const DOCS_DIR = path.join(CWD, "docs");

function main() {
  const command = process.argv[2];

  if (command === "dev") {
    startDev();
  } else if (command === "build") {
    runBuild();
  } else if (command === "create" || command === "init") {
    scaffold();
  } else {
    console.log(`Usage: softdocs <command>

Commands:
  create   Scaffold a new SoftDocs project in the current directory
  dev      Start the development server with file watching
  build    Build for production
`);
  }
}

function scaffold() {
  const dir = process.argv[3] || CWD;
  const target = path.resolve(CWD, dir);

  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  const dirs = ["docs", "docs/guides", "docs/reference", "public"];
  for (const d of dirs) {
    const p = path.join(target, d);
    if (!fs.existsSync(p)) fs.mkdirSync(p, { recursive: true });
  }

  const files: Record<string, string> = {
    "softdocs.config.ts": `import { defineConfig } from '@softdocs/core'

export default defineConfig({
  title: 'My Docs',
  description: 'Beautiful documentation powered by SoftDocs',
  theme: {
    accent: '#6366f1',
  },
  versions: {
    all: ['1.0'],
    default: '1.0',
    latest: '1.0',
  },
})
`,
    "docs/index.mdx": `---
title: Welcome
description: Get started with your new documentation site
---

# Welcome to your docs

This is your first documentation page. Edit or add new \`.mdx\` files in the \`docs/\` directory to build your documentation.

## Getting Started

SoftDocs turns Markdown into fast, searchable documentation sites. Start by editing this file or creating new ones.

### Features

- **Full-text search** — powered by Algolia
- **Versioned docs** — ship multiple versions without duplication
- **Custom MDX components** — tabs, API tables, callouts, and more
- **Dark mode** — automatic theme switching
- **Auto table of contents** — scroll-spying sidebar
`,
    "docs/guides/index.mdx": `---
title: Guides
description: Step-by-step guides for common tasks
---

# Guides

Browse the guides below to learn how to use SoftDocs effectively.
`,
    "docs/reference/index.mdx": `---
title: API Reference
description: Complete API documentation for SoftDocs
---

# API Reference

Reference documentation for the SoftDocs configuration and component APIs.
`,
    "package.json": JSON.stringify(
      {
        name: path.basename(target),
        version: "0.1.0",
        private: true,
        scripts: {
          dev: "next dev",
          build: "next build",
          start: "next start",
          lint: "eslint",
        },
      },
      null,
      2,
    ),
    "tsconfig.json": JSON.stringify(
      {
        compilerOptions: {
          target: "ES2017",
          lib: ["dom", "dom.iterable", "esnext"],
          allowJs: true,
          skipLibCheck: true,
          strict: true,
          noEmit: true,
          esModuleInterop: true,
          module: "esnext",
          moduleResolution: "bundler",
          resolveJsonModule: true,
          isolatedModules: true,
          jsx: "react-jsx",
          incremental: true,
          plugins: [{ name: "next" }],
          paths: {
            "@/*": ["./src/*"],
            "@softdocs/core": ["./node_modules/@softdocs/core/src"],
            "@softdocs/ui": ["./node_modules/@softdocs/ui/src"],
          },
        },
        include: ["next-env.d.ts", "**/*.ts", "**/*.tsx"],
        exclude: ["node_modules"],
      },
      null,
      2,
    ),
  };

  for (const [file, content] of Object.entries(files)) {
    const fp = path.join(target, file);
    if (!fs.existsSync(fp)) {
      fs.writeFileSync(fp, content, "utf-8");
      console.log(`  Created ${file}`);
    }
  }

  console.log(`
SoftDocs project scaffolded in ${target}

Next steps:
  cd ${dir}
  npm install @softdocs/core @softdocs/ui next react react-dom
  npm run dev
`);
}

function startDev() {
  console.log("SoftDocs dev server starting...");

  watchDocs(DOCS_DIR, (change) => {
    console.log(`  [${change.event}] ${change.slug}`);
  });

  const nextBin = path.join(CWD, "node_modules", ".bin", "next");
  try {
    const child = spawn(nextBin || "npx", ["next", "dev"], {
      stdio: "inherit",
      shell: true,
      cwd: CWD,
    });
    process.on("SIGINT", () => {
      child.kill();
      process.exit(0);
    });
  } catch {
    console.log("Starting Next.js dev server...");
    execSync("npx next dev", { stdio: "inherit", cwd: CWD });
  }
}

function runBuild() {
  execSync("npx next build", { stdio: "inherit", cwd: CWD });
}

main();
