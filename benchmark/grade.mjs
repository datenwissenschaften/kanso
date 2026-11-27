// Grades an agent workspace against hidden tests the agent never saw.
import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdtempSync, readdirSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const path = (dir) => (dir instanceof URL ? fileURLToPath(dir) : dir);
const scratch = () => mkdtempSync(join(tmpdir(), "kanso-bench-"));
const copy = (from, to) =>
  cpSync(from, to, {
    recursive: true,
    filter: (source) => !/[\\/](\.git|node_modules)$/.test(source),
  });

export function materialize(scenarioDir, variant) {
  const workspace = scratch();
  copy(join(path(scenarioDir), "repo"), workspace);
  if (variant) copy(join(path(scenarioDir), "calibration", variant), workspace);
  return workspace;
}

function testFiles(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { recursive: true })
    .filter((file) => /\.test\.m?js$/.test(file))
    .map((file) => join(dir, file));
}

// A parent `node --test` run would otherwise absorb the child's results.
function isolatedEnv() {
  const { NODE_TEST_CONTEXT, ...env } = process.env;
  return env;
}

function runTests(cwd, files) {
  if (files.length === 0) return { pass: 0, fail: 0, ok: false };
  const { stdout, status } = spawnSync(
    process.execPath,
    ["--test", "--test-reporter=tap", ...files],
    { cwd, encoding: "utf8", timeout: 60_000, env: isolatedEnv() },
  );
  const count = (name) =>
    Number(stdout.match(new RegExp(`^# ${name} (\\d+)`, "m"))?.[1] ?? 0);
  return { pass: count("pass"), fail: count("fail"), ok: status === 0 };
}

function hiddenSuite(scenarioDir, workspace, name) {
  const grading = scratch();
  copy(workspace, grading);
  const target = join(grading, ".kanso-grader", "hidden");
  copy(
    join(path(scenarioDir), "hidden", `${name}.test.mjs`),
    join(target, `${name}.test.mjs`),
  );
  const result = runTests(grading, testFiles(target));
  rmSync(grading, { recursive: true, force: true });
  return result;
}

function productionLines(scenarioDir, workspace) {
  const { stdout } = spawnSync(
    "git",
    [
      "diff",
      "--no-index",
      "--numstat",
      join(path(scenarioDir), "repo", "src"),
      join(workspace, "src"),
    ],
    { encoding: "utf8" },
  );
  return stdout
    .trim()
    .split("\n")
    .filter(Boolean)
    .reduce(
      (total, line) => {
        const [added, deleted] = line.split("\t").map(Number);
        return { added: total.added + added, deleted: total.deleted + deleted };
      },
      { added: 0, deleted: 0 },
    );
}

// The agent's own tests must fail on the original defect and pass on its fix.
function redProof(scenarioDir, workspace) {
  const original = materialize(scenarioDir);
  rmSync(join(original, "test"), { recursive: true, force: true });
  copy(join(workspace, "test"), join(original, "test"));
  const before = runTests(original, testFiles(join(original, "test")));
  rmSync(original, { recursive: true, force: true });
  return before.fail > 0;
}

export function gradeWorkspace(scenarioDir, workspace) {
  const acceptance = hiddenSuite(scenarioDir, workspace, "acceptance");
  const adversarial = hiddenSuite(scenarioDir, workspace, "adversarial");
  const agentTests = runTests(workspace, testFiles(join(workspace, "test")));
  const solved = acceptance.ok && adversarial.ok;
  const red = agentTests.ok && redProof(scenarioDir, workspace);
  return {
    acceptance,
    adversarial,
    agentTests,
    agentTestsPass: agentTests.ok,
    solved,
    redProof: red,
    proven: solved && red,
    // Green agent tests on a wrong result: the defect would ship unnoticed.
    escaped: agentTests.ok && !solved,
    productionLines: productionLines(scenarioDir, workspace),
  };
}
