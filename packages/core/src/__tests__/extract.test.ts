import { describe, it, expect } from "vitest";
import { extractMdx } from "../extract";

describe("extractMdx", () => {
  it("should extract frontmatter from YAML", async () => {
    const mdx = `---
title: My Doc
description: A test document
version: ["1.0", "2.0"]
---

# Hello World

Some content here.
`;
    const result = await extractMdx(mdx);
    expect(result.frontmatter.title).toBe("My Doc");
    expect(result.frontmatter.description).toBe("A test document");
    expect(result.frontmatter.version).toEqual(["1.0", "2.0"]);
  });

  it("should extract headings with correct depth", async () => {
    const mdx = `---
title: Test
---

# Top Level

## Second Level

### Third Level

Some content.
`;
    const result = await extractMdx(mdx);
    expect(result.headings).toHaveLength(3);
    expect(result.headings[0]).toMatchObject({
      depth: 1,
      text: "Top Level",
      id: "top-level",
    });
    expect(result.headings[1]).toMatchObject({
      depth: 2,
      text: "Second Level",
      id: "second-level",
    });
    expect(result.headings[2]).toMatchObject({
      depth: 3,
      text: "Third Level",
      id: "third-level",
    });
  });

  it("should generate slugified heading ids", async () => {
    const mdx = `---
title: Test
---

# Hello World! This is a Heading

Content here.
`;
    const result = await extractMdx(mdx);
    expect(result.headings[0].id).toBe("hello-world-this-is-a-heading");
  });

  it("should accumulate content under headings", async () => {
    const mdx = `---
title: Test
---

# Section One

First paragraph content.

More content here.

## Section Two

Second section content.
`;
    const result = await extractMdx(mdx);
    expect(result.headings[0].text).toBe("Section One");
    expect(result.headings[0].content).toContain("First paragraph content");
    expect(result.headings[0].content).toContain("More content here");
    expect(result.headings[1].text).toBe("Section Two");
    expect(result.headings[1].content).toContain("Second section content");
  });

  it("should cap heading content at 500 chars", async () => {
    const longContent = "A".repeat(600);
    const mdx = `---
title: Test
---

# Long Section

${longContent}
`;
    const result = await extractMdx(mdx);
    expect(result.headings[0].content.length).toBeLessThanOrEqual(500);
  });

  it("should return raw MDX source", async () => {
    const mdx = `---
title: Test
---

# Hello

Some content.
`;
    const result = await extractMdx(mdx);
    expect(result.raw).toBe(mdx);
  });

  it("should handle MDX with code blocks", async () => {
    const mdx = `---
title: Test
---

# Code Example

\`\`\`typescript
const x = 1
\`\`\`

More content.
`;
    const result = await extractMdx(mdx);
    expect(result.headings).toHaveLength(1);
    expect(result.headings[0].text).toBe("Code Example");
  });

  it("should handle MDX with no frontmatter", async () => {
    const mdx = `# Just a Heading

Content without frontmatter.
`;
    const result = await extractMdx(mdx);
    expect(result.frontmatter).toEqual({});
    expect(result.headings).toHaveLength(1);
  });

  it("should handle empty MDX", async () => {
    const mdx = "";
    const result = await extractMdx(mdx);
    expect(result.frontmatter).toEqual({});
    expect(result.headings).toHaveLength(0);
  });

  it("should handle multiple frontmatter fields", async () => {
    const mdx = `---
title: Test
description: Description here
sidebar_position: 3
tags: [docs, guide]
---

# Content
`;
    const result = await extractMdx(mdx);
    expect(result.frontmatter.title).toBe("Test");
    expect(result.frontmatter.description).toBe("Description here");
    expect(result.frontmatter.sidebar_position).toBe(3);
    expect(result.frontmatter.tags).toEqual(["docs", "guide"]);
  });
});
