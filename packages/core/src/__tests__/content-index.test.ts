import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { buildContentIndex } from "../content-index";

describe("buildContentIndex", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "content-index-test-"));
    fs.mkdirSync(path.join(tmpDir, "docs"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("should build index from MDX files", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "docs", "install.mdx"),
      `---
title: Installation
---

# Install Guide

How to install.
`,
    );

    const index = await buildContentIndex(path.join(tmpDir, "docs"), [
      "1.0",
      "2.0",
    ]);
    expect(index.docs).toHaveLength(1);
    expect(index.docs[0].title).toBe("Installation");
    expect(index.docs[0].slug).toEqual(["install"]);
  });

  it("should build bySlug map", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "docs", "config.mdx"),
      `---
title: Configuration
---

# Config
`,
    );

    const index = await buildContentIndex(path.join(tmpDir, "docs"), ["1.0"]);
    expect(index.bySlug.has("config")).toBe(true);
    expect(index.bySlug.get("config")?.title).toBe("Configuration");
  });

  it("should build byVersion map", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "docs", "v2-only.mdx"),
      `---
title: V2 Only
version: [">=2.0"]
---

# V2 Feature
`,
    );
    fs.writeFileSync(
      path.join(tmpDir, "docs", "all-versions.mdx"),
      `---
title: All Versions
---

# Always Here
`,
    );

    const index = await buildContentIndex(path.join(tmpDir, "docs"), [
      "1.0",
      "2.0",
      "3.0",
    ]);

    expect(index.byVersion.get("1.0")).toHaveLength(1);
    expect(index.byVersion.get("1.0")?.[0].title).toBe("All Versions");

    expect(index.byVersion.get("2.0")).toHaveLength(2);
    expect(index.byVersion.get("2.0")?.map((d) => d.title)).toContain(
      "V2 Only",
    );
    expect(index.byVersion.get("2.0")?.map((d) => d.title)).toContain(
      "All Versions",
    );

    expect(index.byVersion.get("3.0")).toHaveLength(2);
  });

  it("should handle nested directories", async () => {
    fs.mkdirSync(path.join(tmpDir, "docs", "guides"));
    fs.writeFileSync(
      path.join(tmpDir, "docs", "guides", "getting-started.mdx"),
      `---
title: Getting Started
---

# Getting Started
`,
    );

    const index = await buildContentIndex(path.join(tmpDir, "docs"), ["1.0"]);
    expect(index.docs).toHaveLength(1);
    expect(index.docs[0].slug).toEqual(["guides", "getting-started"]);
  });

  it("should handle empty docs directory", async () => {
    const index = await buildContentIndex(path.join(tmpDir, "docs"), ["1.0"]);
    expect(index.docs).toHaveLength(0);
    expect(index.bySlug.size).toBe(0);
    expect(index.byVersion.get("1.0")).toHaveLength(0);
  });

  it("should extract headings from docs", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "docs", "api.mdx"),
      `---
title: API Reference
---

# API

## Methods

Description of methods.

## Properties

Description of properties.
`,
    );

    const index = await buildContentIndex(path.join(tmpDir, "docs"), ["1.0"]);
    expect(index.docs[0].headings).toHaveLength(3);
    expect(index.docs[0].headings[0].text).toBe("API");
    expect(index.docs[0].headings[1].text).toBe("Methods");
    expect(index.docs[0].headings[2].text).toBe("Properties");
  });

  it("should handle files without frontmatter", async () => {
    fs.writeFileSync(
      path.join(tmpDir, "docs", "bare.mdx"),
      `# Just a Title

Some content.
`,
    );

    const index = await buildContentIndex(path.join(tmpDir, "docs"), ["1.0"]);
    expect(index.docs).toHaveLength(1);
    expect(index.docs[0].title).toBe("bare");
  });

  it("should skip non-mdx files", async () => {
    fs.writeFileSync(path.join(tmpDir, "docs", "readme.md"), "# Readme");
    fs.writeFileSync(path.join(tmpDir, "docs", "notes.txt"), "Some notes");

    const index = await buildContentIndex(path.join(tmpDir, "docs"), ["1.0"]);
    expect(index.docs).toHaveLength(0);
  });
});
