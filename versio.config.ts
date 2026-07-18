import { defineConfig } from "@sofelaisrael/core";

export default defineConfig({
  title: "SoftDocs",
  description: "Turn Markdown into beautiful documentation",
  theme: {
    accent: "#d85a2b",
  },
  versions: {
    all: ["1.0", "2.0", "3.0"],
    default: "2.0",
    latest: "3.0",
  },
});
