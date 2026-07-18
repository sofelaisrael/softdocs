#!/usr/bin/env node
import { spawnSync } from "node:child_process";

const args = process.argv.slice(2);
const target = args[0] || ".";

const res = spawnSync(
  "npx",
  ["-y", "@sofelaisrael/cli", "create", target, ...args.slice(1)],
  { stdio: "inherit", shell: true },
);

if (res.status !== 0) {
  process.exit(res.status ?? 1);
}
