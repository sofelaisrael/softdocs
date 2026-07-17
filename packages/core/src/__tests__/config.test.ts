import { describe, it, expect } from "vitest";
import { defineConfig, SoftDocsConfigSchema } from "../config";

describe("SoftDocsConfigSchema", () => {
  it("should validate a valid config", () => {
    const result = SoftDocsConfigSchema.safeParse({
      title: "Test Docs",
      versions: {
        all: ["1.0", "2.0"],
        default: "2.0",
        latest: "2.0",
      },
    });
    expect(result.success).toBe(true);
  });

  it("should reject config without title", () => {
    const result = SoftDocsConfigSchema.safeParse({
      versions: {
        all: ["1.0"],
        default: "1.0",
        latest: "1.0",
      },
    });
    expect(result.success).toBe(false);
  });

  it("should reject config with empty title", () => {
    const result = SoftDocsConfigSchema.safeParse({
      title: "",
      versions: {
        all: ["1.0"],
        default: "1.0",
        latest: "1.0",
      },
    });
    expect(result.success).toBe(false);
  });

  it("should reject config without versions", () => {
    const result = SoftDocsConfigSchema.safeParse({
      title: "Test",
    });
    expect(result.success).toBe(false);
  });

  it("should accept config with optional theme", () => {
    const result = SoftDocsConfigSchema.safeParse({
      title: "Test",
      theme: { accent: "#6366f1" },
      versions: {
        all: ["1.0"],
        default: "1.0",
        latest: "1.0",
      },
    });
    expect(result.success).toBe(true);
  });

  it("should accept config with search", () => {
    const result = SoftDocsConfigSchema.safeParse({
      title: "Test",
      versions: {
        all: ["1.0"],
        default: "1.0",
        latest: "1.0",
      },
      search: {
        provider: "algolia",
        appId: "test",
        apiKey: "test",
        indexName: "test",
      },
    });
    expect(result.success).toBe(true);
  });

  it("should reject search with wrong provider", () => {
    const result = SoftDocsConfigSchema.safeParse({
      title: "Test",
      versions: {
        all: ["1.0"],
        default: "1.0",
        latest: "1.0",
      },
      search: {
        provider: "meilisearch",
        appId: "test",
        apiKey: "test",
        indexName: "test",
      },
    });
    expect(result.success).toBe(false);
  });
});

describe("defineConfig", () => {
  it("should return validated config", () => {
    const config = defineConfig({
      title: "Test",
      versions: {
        all: ["1.0", "2.0"],
        default: "2.0",
        latest: "2.0",
      },
    });
    expect(config.title).toBe("Test");
    expect(config.versions.all).toEqual(["1.0", "2.0"]);
  });

  it("should throw on invalid config", () => {
    expect(() =>
      defineConfig({
        title: "",
        versions: {
          all: [],
          default: "",
          latest: "",
        },
      }),
    ).toThrow("Invalid softdocs config");
  });

  it("should include field path in error message", () => {
    try {
      defineConfig({
        title: "Test",
        versions: {
          all: [],
          default: "",
          latest: "",
        },
      });
    } catch (e) {
      expect(e).toBeInstanceOf(Error);
      expect((e as Error).message).toContain("versions");
    }
  });

  it("should preserve optional fields", () => {
    const config = defineConfig({
      title: "Test",
      description: "A test",
      theme: { accent: "#ff0000" },
      versions: {
        all: ["1.0"],
        default: "1.0",
        latest: "1.0",
      },
    });
    expect(config.description).toBe("A test");
    expect(config.theme?.accent).toBe("#ff0000");
  });
});
