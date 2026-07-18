import { defineConfig } from "@sofelaisrael/core";

export default defineConfig({
  title: "My Docs",
  description: "Beautiful documentation powered by Versio",
  theme: {
    accent: "#d85a2b",
  },
  versions: {
    all: ["1.0"],
    default: "1.0",
    latest: "1.0",
  },
});
