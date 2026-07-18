import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { readFileSync } from "node:fs";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Packages published in dependency order: core -> ui -> cli -> create-versio.
// core/ui are source-only (published as-is); cli is compiled first.
// create-versio is the thin unscoped wrapper that delegates to @sofelaisrael/cli.
const steps = [
  { name: "@sofelaisrael/core", cwd: "packages/core", build: false },
  { name: "@sofelaisrael/ui", cwd: "packages/ui", build: false },
  { name: "@sofelaisrael/cli", cwd: "packages/cli", build: true },
  { name: "create-versio", cwd: "packages/create-versio", build: false },
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

// Returns true if this package@version is already published on the registry.
function isAlreadyPublished(name, version) {
  const res = spawnSync(
    "npm",
    ["view", `${name}@${version}`, "version"],
    { shell: true, encoding: "utf8" },
  );
  return res.status === 0 && res.stdout.includes(version);
}

const otp = process.env.NPM_OTP;
const publishArgs = ["publish", "--access", "public"];
if (otp) publishArgs.push(`--otp=${otp}`);

for (const step of steps) {
  const cwd = path.join(root, step.cwd);
  const pkg = JSON.parse(
    readFileSync(path.join(cwd, "package.json"), "utf8"),
  );
  console.log(`\n=== Publishing ${step.name} ===`);
  if (isAlreadyPublished(step.name, pkg.version)) {
    console.log(`→ ${step.name}@${pkg.version} already published, skipping`);
    continue;
  }
  if (step.build) {
    console.log(`→ building ${step.name}`);
    run("npm", ["run", "build"], cwd);
  }
  run("npm", publishArgs, cwd);
  console.log(`✓ ${step.name} published`);
}

console.log("\n🎉 All packages published.");
