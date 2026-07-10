import { describe, it, expect, beforeEach, afterEach } from "vitest";
import fs from "fs";
import path from "path";
import os from "os";
import { buildNavTree, getAdjacentDocs } from "../nav";

describe("buildNavTree", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nav-test-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("should return empty array for non-existent directory", () => {
    const result = buildNavTree("/non-existent-dir");
    expect(result).toEqual([]);
  });

  it("should create sections from directories", () => {
    fs.mkdirSync(path.join(tmpDir, "guides"));
    fs.writeFileSync(
      path.join(tmpDir, "guides", "getting-started.mdx"),
      "---\ntitle: Getting Started\n---\n# Hello",
    );
    fs.writeFileSync(
      path.join(tmpDir, "guides", "advanced.mdx"),
      "---\ntitle: Advanced\n---\n# Advanced",
    );

    const result = buildNavTree(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("Guides");
    expect(result[0].slug).toBe("guides");
    expect(result[0].items).toHaveLength(2);
    const titles = result[0].items.map((i) => i.title).sort();
    expect(titles).toEqual(["Advanced", "Getting Started"]);
  });

  it("should create General section for top-level files", () => {
    fs.writeFileSync(
      path.join(tmpDir, "installation.mdx"),
      "---\ntitle: Install\n---\n# Install",
    );

    const result = buildNavTree(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("General");
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].title).toBe("Installation");
    expect(result[0].items[0].slug).toBe("installation");
  });

  it("should exclude index.mdx from items", () => {
    fs.mkdirSync(path.join(tmpDir, "guides"));
    fs.writeFileSync(
      path.join(tmpDir, "guides", "index.mdx"),
      "---\ntitle: Guides\n---\n# Guides",
    );
    fs.writeFileSync(
      path.join(tmpDir, "guides", "setup.mdx"),
      "---\ntitle: Setup\n---\n# Setup",
    );

    const result = buildNavTree(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].slug).toBe("guides/setup");
  });

  it("should handle directory with only index.mdx", () => {
    fs.mkdirSync(path.join(tmpDir, "reference"));
    fs.writeFileSync(
      path.join(tmpDir, "reference", "index.mdx"),
      "---\ntitle: Reference\n---\n# Reference",
    );

    const result = buildNavTree(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0].label).toBe("General");
    expect(result[0].items).toHaveLength(1);
    expect(result[0].items[0].title).toBe("Reference");
  });

  it("should handle mixed files and directories", () => {
    fs.writeFileSync(
      path.join(tmpDir, "intro.mdx"),
      "---\ntitle: Intro\n---\n# Intro",
    );
    fs.mkdirSync(path.join(tmpDir, "guides"));
    fs.writeFileSync(
      path.join(tmpDir, "guides", "guide1.mdx"),
      "---\ntitle: Guide 1\n---\n# Guide 1",
    );

    const result = buildNavTree(tmpDir);
    expect(result).toHaveLength(2);
    const labels = result.map((s) => s.label).sort();
    expect(labels).toEqual(["General", "Guides"]);
  });

  it("should title-case section labels", () => {
    fs.mkdirSync(path.join(tmpDir, "my-custom-section"));
    fs.writeFileSync(
      path.join(tmpDir, "my-custom-section", "page.mdx"),
      "---\ntitle: Page\n---\n# Page",
    );

    const result = buildNavTree(tmpDir);
    expect(result[0].label).toBe("My Custom Section");
  });

  it("should handle .md files", () => {
    fs.writeFileSync(path.join(tmpDir, "readme.md"), "# Readme");

    const result = buildNavTree(tmpDir);
    expect(result).toHaveLength(1);
    expect(result[0].items).toHaveLength(1);
  });
});

describe("getAdjacentDocs", () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "nav-adjacent-"));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it("should return prev and next for middle item", () => {
    const sections = [
      {
        label: "General",
        slug: "",
        items: [
          { title: "First", slug: "first" },
          { title: "Second", slug: "second" },
          { title: "Third", slug: "third" },
        ],
      },
    ];

    const result = getAdjacentDocs(sections, tmpDir, "second");
    expect(result.prev?.slug).toBe("first");
    expect(result.next?.slug).toBe("third");
  });

  it("should return null prev for first item", () => {
    const sections = [
      {
        label: "General",
        slug: "",
        items: [
          { title: "First", slug: "first" },
          { title: "Second", slug: "second" },
        ],
      },
    ];

    const result = getAdjacentDocs(sections, tmpDir, "first");
    expect(result.prev).toBeNull();
    expect(result.next?.slug).toBe("second");
  });

  it("should return null next for last item", () => {
    const sections = [
      {
        label: "General",
        slug: "",
        items: [
          { title: "First", slug: "first" },
          { title: "Second", slug: "second" },
        ],
      },
    ];

    const result = getAdjacentDocs(sections, tmpDir, "second");
    expect(result.prev?.slug).toBe("first");
    expect(result.next).toBeNull();
  });

  it("should handle multiple sections", () => {
    const sections = [
      {
        label: "General",
        slug: "",
        items: [{ title: "Intro", slug: "intro" }],
      },
      {
        label: "Guides",
        slug: "guides",
        items: [
          { title: "Guide 1", slug: "guides/guide1" },
          { title: "Guide 2", slug: "guides/guide2" },
        ],
      },
    ];

    const result = getAdjacentDocs(sections, tmpDir, "intro");
    expect(result.prev).toBeNull();
    expect(result.next?.slug).toBe("guides/guide1");
  });

  it("should include section index pages in adjacency", () => {
    fs.mkdirSync(path.join(tmpDir, "guides"));
    fs.writeFileSync(
      path.join(tmpDir, "guides", "index.mdx"),
      "---\ntitle: Guides\n---\n# Guides",
    );

    const sections = [
      {
        label: "General",
        slug: "",
        items: [{ title: "Intro", slug: "intro" }],
      },
      {
        label: "Guides",
        slug: "guides",
        items: [{ title: "Guide 1", slug: "guides/guide1" }],
      },
    ];

    const result = getAdjacentDocs(sections, tmpDir, "intro");
    expect(result.next?.slug).toBe("guides");
  });
});
