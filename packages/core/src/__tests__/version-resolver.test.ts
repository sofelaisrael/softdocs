import { describe, it, expect } from "vitest";
import { resolveVersions } from "../version-resolver";

describe("resolveVersions", () => {
  const allVersions = ["1.0", "2.0", "3.0"];

  it("should return all versions when ranges is undefined", () => {
    const result = resolveVersions(undefined, allVersions);
    expect(result).toEqual(allVersions);
  });

  it("should return all versions when ranges is empty", () => {
    const result = resolveVersions([], allVersions);
    expect(result).toEqual(allVersions);
  });

  it("should filter by exact version match", () => {
    const result = resolveVersions(["2.0"], allVersions);
    expect(result).toEqual(["2.0"]);
  });

  it("should filter by semver range >=", () => {
    const result = resolveVersions([">=2.0"], allVersions);
    expect(result).toEqual(["2.0", "3.0"]);
  });

  it("should filter by semver range <=", () => {
    const result = resolveVersions(["<=2.0"], allVersions);
    expect(result).toEqual(["1.0", "2.0"]);
  });

  it("should filter by semver range ^", () => {
    const result = resolveVersions(["^2.0"], allVersions);
    expect(result).toEqual(["2.0"]);
  });

  it("should filter by semver range ~", () => {
    const result = resolveVersions(["~2.0"], allVersions);
    expect(result).toEqual(["2.0"]);
  });

  it("should handle multiple ranges (union)", () => {
    const result = resolveVersions(["1.0", "3.0"], allVersions);
    expect(result).toEqual(["1.0", "3.0"]);
  });

  it("should handle non-standard version strings", () => {
    const versions = ["1", "2", "3"];
    const result = resolveVersions([">=2"], versions);
    expect(result).toEqual(["2", "3"]);
  });

  it("should handle partial versions", () => {
    const versions = ["1.0.0", "2.0.0", "3.0.0"];
    const result = resolveVersions([">=2.0.0"], versions);
    expect(result).toEqual(["2.0.0", "3.0.0"]);
  });

  it("should return empty array when no versions match", () => {
    const result = resolveVersions([">=5.0"], allVersions);
    expect(result).toEqual([]);
  });

  it("should handle invalid semver gracefully", () => {
    const result = resolveVersions(["not-a-version"], allVersions);
    expect(result).toEqual([]);
  });

  it("should handle single version in allVersions", () => {
    const result = resolveVersions(["1.0"], ["1.0"]);
    expect(result).toEqual(["1.0"]);
  });
});
