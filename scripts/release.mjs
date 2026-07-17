import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Packages published in dependency order: core -> ui -> cli.
// core/ui are source-only (published as-is); cli is compiled first.
const steps = [
  { name: "@versio/core", cwd: "packages/core", build: false },
  { name: "@versio/ui", cwd: "packages/ui", build: false },
  { name: "@versio/cli", cwd: "packages/cli", build: true },
];

function run(cmd, args, cwd) {
  const res = spawnSync(cmd, args, {
    cwd,
    stdio: "inherit",
    shell: true,
  });
  if (res.status !== 0) {
    console.error(`\n✗ Failed: ${cmd} ${args.join(" ")} (in ${cwd})`);
    process.exit(res.status ?? 1);
  }
}

const otp = process.env.NPM_OTP;
const publishArgs = ["publish", "--access", "public"];
if (otp) publishArgs.push(`--otp=${otp}`);

for (const step of steps) {
  const cwd = path.join(root, step.cwd);
  console.log(`\n=== Publishing ${step.name} ===`);
  if (step.build) {
    console.log(`→ building ${step.name}`);
    run("npm", ["run", "build"], cwd);
  }
  run("npm", publishArgs, cwd);
  console.log(`✓ ${step.name} published`);
}

console.log("\n🎉 All packages published.");
