import assert from "node:assert/strict";
import test from "node:test";
import { gradeWorkspace, materialize } from "../benchmark/grade.mjs";
import { summarize, wilson } from "../benchmark/summary.mjs";
import { runBenchmark, schedule, stagePlugin } from "../benchmark/run.mjs";
import { render } from "../benchmark/report.mjs";
import {
  cpSync,
  existsSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

const scenario = new URL("../benchmark/scenarios/bug-fix/", import.meta.url);
const protocol = JSON.parse(
  readFileSync(new URL("../benchmark/protocol.json", import.meta.url), "utf8"),
);

for (const name of protocol.scenarios) {
  const dir = new URL(`../benchmark/scenarios/${name}/`, import.meta.url);

  test(`${name}: graders reject the untouched fixture`, () => {
    const result = gradeWorkspace(dir, materialize(dir));
    assert.equal(result.agentTestsPass, true);
    assert.equal(result.solved, false);
    assert.equal(result.redProof, false);
    assert.equal(result.escaped, true);
    assert.deepEqual(result.productionLines, { added: 0, deleted: 0 });
  });

  test(`${name}: graders accept a fix without a failing test but deny the RED proof`, () => {
    const result = gradeWorkspace(dir, materialize(dir, "untested"));
    assert.equal(result.solved, true);
    assert.equal(result.agentTestsPass, true);
    assert.equal(result.redProof, false);
    assert.ok(result.productionLines.added > 0);
  });

  test(`${name}: graders credit a test-first fix`, () => {
    const result = gradeWorkspace(dir, materialize(dir, "reference"));
    assert.equal(result.solved, true);
    assert.equal(result.redProof, true);
    assert.equal(result.proven, true);
    assert.equal(result.escaped, false);
  });
}

test("wilson interval stays inside [0, 1] and widens for small samples", () => {
  const [low, high] = wilson(5, 5);
  assert.ok(low > 0.5 && low < 0.6);
  assert.equal(high, 1);
  assert.deepEqual(wilson(0, 0), [0, 1]);
});

test("summary counts errored runs as failures and reports them", () => {
  const runs = [
    { arm: "baseline", error: "quota", grade: null },
    { arm: "baseline", grade: { solved: true, proven: false } },
    { arm: "kanso", grade: { solved: true, proven: true } },
    { arm: "kanso", grade: { solved: false, proven: false } },
  ];
  const summary = summarize(runs);
  assert.equal(summary.arms.baseline.runs, 2);
  assert.equal(summary.arms.baseline.errors, 1);
  assert.equal(summary.arms.baseline.solved.count, 1);
  assert.equal(summary.arms.kanso.proven.count, 1);
  assert.equal(summary.verdict.proven, "inconclusive");
});

test("schedule is seeded, balanced and interleaves the arms", () => {
  const protocol = {
    scenarios: ["bug-fix"],
    arms: { baseline: {}, kanso: {} },
    runsPerArm: 5,
    seed: 7,
  };
  const jobs = schedule(protocol);
  assert.deepEqual(jobs, schedule(protocol));
  assert.equal(jobs.filter((job) => job.arm === "kanso").length, 5);
  assert.notDeepEqual(
    jobs.slice(0, 5).map((job) => job.arm),
    Array(5).fill("baseline"),
  );
});

test("the treatment plugin cannot reach the hidden graders", () => {
  const stage = stagePlugin(".");
  try {
    assert.ok(existsSync(join(stage, "skills", "kanso", "SKILL.md")));
    assert.ok(existsSync(join(stage, "hooks", "hooks.json")));
    assert.deepEqual(readdirSync(stage).sort(), [
      ".claude-plugin",
      "hooks",
      "skills",
    ]);
  } finally {
    rmSync(stage, { recursive: true, force: true });
  }
});

test("a full run records evidence, costs and a rendered report", () => {
  const out = mkdtempSync(join(tmpdir(), "kanso-bench-test-"));
  const reference = fileURLToPath(new URL("calibration/reference/", scenario));
  const agent = ({ workspace, pluginDir }) => {
    if (pluginDir) cpSync(reference, workspace, { recursive: true });
    return { transcript: "{}", error: null, costUsd: 0.5, durationSeconds: 1 };
  };
  const protocol = {
    scenarios: ["bug-fix"],
    arms: { baseline: { pluginDir: null }, kanso: { pluginDir: "." } },
    runsPerArm: 2,
    seed: 1,
    agent: { package: "fake", version: "0", model: "fake" },
    decisionRule: "Pre-registered.",
  };
  try {
    const { runs, summary } = runBenchmark({
      protocol,
      agent,
      out,
      revision: "abc",
    });
    assert.equal(runs.length, 4);
    assert.equal(summary.arms.kanso.proven.count, 2);
    assert.equal(summary.arms.baseline.solved.count, 0);
    assert.equal(summary.arms.kanso.costPerProvenUsd, 0.5);
    assert.match(
      readFileSync(join(out, "bug-fix-kanso-0.diff"), "utf8"),
      /Math\.round\(amounts/,
    );
    const html = render(
      JSON.parse(readFileSync(join(out, "results.json"), "utf8")),
    );
    assert.match(html, /Agent cost per proven fix/);
    assert.match(html, /bug-fix-baseline-1\.diff/);
  } finally {
    rmSync(out, { recursive: true, force: true });
  }
});
