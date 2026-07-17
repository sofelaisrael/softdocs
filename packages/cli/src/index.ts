#!/usr/bin/env node

import { execFileSync, spawn } from "child_process";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CWD = process.cwd();

function main() {
  const command = process.argv[2];

  if (command === "create" || command === "init") {
    scaffold(process.argv[3]);
  } else if (command === "dev") {
    startDev();
  } else if (command === "build") {
    runBuild();
  } else {
    printHelp();
  }
}

function templateDir(): string {
  const candidates = [
    // Published package: bin ./src/index.ts, template at ./template (sibling)
    path.join(__dirname, "..", "template"),
    // Local dev fallback (run via tsx from repo root)
    path.join(CWD, "packages", "cli", "template"),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return c;
  }
  return candidates[0];
}

function copyDir(src: string, dest: string) {
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

function scaffold(targetArg?: string) {
  const dir = targetArg || ".";
  const target = path.resolve(CWD, dir);

  if (fs.existsSync(target) && fs.readdirSync(target).length > 0) {
    console.error(
      `Error: target directory "${dir}" is not empty. Choose an empty directory or a new name.`,
    );
    process.exit(1);
  }

  const tpl = templateDir();
  if (!fs.existsSync(tpl)) {
    console.error(
      "Error: template not found. Reinstall @softdocs/cli or run from a published package.",
    );
    process.exit(1);
  }

  copyDir(tpl, target);

  console.log(`
Versio project created in ${dir}

Next steps:
  cd ${dir}
  npm install
  npm run dev      # start the local docs server
  npm run build    # export a static site to ./out

Happy documenting!
`);
}

function startDev() {
  const nextBin = path.join(CWD, "node_modules", ".bin", "next");
  const cmd = fs.existsSync(nextBin) ? nextBin : "npx";
  const args = fs.existsSync(nextBin) ? ["dev"] : ["next", "dev"];
  console.log("Versio dev server starting...");
  const child = spawn(cmd, args, { stdio: "inherit", shell: true, cwd: CWD });
  child.on("exit", (code) => process.exit(code ?? 0));
}

function runBuild() {
  console.log("Building static documentation site...");
  const nextBin = path.join(CWD, "node_modules", ".bin", "next");
  const cmd = fs.existsSync(nextBin) ? nextBin : "npx";
  const args = fs.existsSync(nextBin) ? ["build"] : ["next", "build"];
  try {
    execFileSync(cmd, args, { stdio: "inherit", shell: true, cwd: CWD });
    console.log("\nBuild complete. Static site exported to ./out");
  } catch (err) {
    console.error(`Build failed: ${err instanceof Error ? err.message : err}`);
    process.exit(1);
  }
}

function printHelp() {
  console.log(`versio <command>

A batteries-included documentation framework with first-class versioning.

Commands:
  create [dir]   Scaffold a new Versio project (defaults to current directory)
  dev           Start the development server
  build         Export a static documentation site to ./out

Example:
  npx create-versio@latest my-docs
  cd my-docs && npm install && npm run dev
`);
}

main();
