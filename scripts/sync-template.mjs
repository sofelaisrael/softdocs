import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SRC = path.join(ROOT, "src");
const TEMPLATE_SRC = path.join(ROOT, "packages", "cli", "template", "src");

// Directories under src/ that are the canonical, single-source-of-truth app
// code. The CLI template mirrors these exactly so there is never a hand-edited
// second copy that can drift.
const MIRROR_DIRS = ["app", "components"];

function rmrf(target) {
  if (fs.existsSync(target)) {
    fs.rmSync(target, { recursive: true, force: true });
  }
}

function copyDir(src, dest) {
  fs.mkdirSync(dest, { recursive: true });
  for (const entry of fs.readdirSync(src, { withFileTypes: true })) {
    const s = path.join(src, entry.name);
    const d = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(s, d);
    } else {
      fs.copyFileSync(s, d);
    }
  }
}

for (const dir of MIRROR_DIRS) {
  const from = path.join(SRC, dir);
  const to = path.join(TEMPLATE_SRC, dir);
  rmrf(to);
  copyDir(from, to);
  console.log(`synced src/${dir} -> template/src/${dir}`);
}

console.log("template/src is now in sync with src/ (single source of truth)");
