// Runs the pre-registered protocol: node benchmark/run.mjs [--out <dir>] [--smoke <scenario>]
import { spawnSync } from "node:child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { gradeWorkspace, materialize } from "./grade.mjs";
import { summarize } from "./summary.mjs";

const root = resolve(fileURLToPath(new URL("..", import.meta.url)));
const git = (cwd, ...args) => spawnSync("git", args, { cwd, encoding: "utf8" });

// Seeded shuffle so both arms meet the same API conditions over time.
export function schedule({ scenarios, arms, runsPerArm, seed }) {
  const jobs = scenarios.flatMap((scenario) =>
    Object.keys(arms).flatMap((arm) =>
      Array.from({ length: runsPerArm }, (_, index) => ({
        scenario,
        arm,
        index,
      })),
    ),
  );
  let state = seed >>> 0;
  const random = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  for (let i = jobs.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [jobs[i], jobs[j]] = [jobs[j], jobs[i]];
  }
  return jobs;
}

// Only the shipped plugin files, so the treatment arm cannot reach hidden graders.
export function stagePlugin(pluginDir) {
  const stage = mkdtempSync(join(tmpdir(), "kanso-plugin-"));
  for (const part of [".claude-plugin", "hooks", "skills"])
    cpSync(resolve(root, pluginDir, part), join(stage, part), {
      recursive: true,
    });
  return stage;
}

// npx through node avoids a shell on every platform; the task is passed on stdin.
const npx = ["node_modules", "../lib/node_modules"]
  .map((dir) => join(dirname(process.execPath), dir, "npm/bin/npx-cli.js"))
  .find(existsSync);
export function claudeAgent(protocol) {
  return ({ workspace, task, pluginDir }) => {
    const { version, model, maxTurns } = protocol.agent;
    const args = [
      "--yes",
      `${protocol.agent.package}@${version}`,
      "-p",
      "--output-format",
      "json",
      "--model",
      model,
      "--max-turns",
      String(maxTurns),
      "--permission-mode",
      "acceptEdits",
      "--allowedTools",
      "Read",
      "Edit",
      "Write",
      "Glob",
      "Grep",
      "Bash(node:*)",
      "Bash(npm test:*)",
      "Bash(git:*)",
    ];
    const plugin = pluginDir && stagePlugin(pluginDir);
    if (plugin) args.push("--plugin-dir", plugin);
    // A fresh config directory keeps user-level skills, hooks and memory out of both arms.
    const config = mkdtempSync(join(tmpdir(), "kanso-claude-"));
    const started = Date.now();
    const { stdout, stderr, status } = spawnSync(
      process.execPath,
      [npx, ...args],
      {
        cwd: workspace,
        input: task,
        encoding: "utf8",
        timeout: 20 * 60_000,
        env: { ...process.env, CLAUDE_CONFIG_DIR: config },
      },
    );
    for (const dir of [config, plugin].filter(Boolean))
      rmSync(dir, { recursive: true, force: true });
    let report = {};
    try {
      report = JSON.parse(stdout);
    } catch {}
    return {
      transcript: stdout,
      stderr,
      error:
        status !== 0 || report.is_error
          ? (report.terminal_reason ?? report.subtype ?? `exit ${status}`)
          : null,
      costUsd: report.total_cost_usd ?? null,
      durationSeconds: (Date.now() - started) / 1000,
      turns: report.num_turns ?? null,
      usage: report.usage ?? null,
    };
  };
}

export function runBenchmark({ protocol, agent, out, revision }) {
  mkdirSync(out, { recursive: true });
  const runs = [];
  for (const job of schedule(protocol)) {
    const scenarioDir = join(root, "benchmark", "scenarios", job.scenario);
    const workspace = materialize(scenarioDir);
    git(workspace, "init", "-q");
    git(workspace, "add", "-A");
    git(
      workspace,
      "-c",
      "user.name=bench",
      "-c",
      "user.email=bench@invalid",
      "commit",
      "-qm",
      "fixture",
    );
    const task = readFileSync(join(scenarioDir, "task.md"), "utf8");
    const result = agent({
      workspace,
      task,
      pluginDir: protocol.arms[job.arm].pluginDir,
    });
    git(workspace, "add", "-A");
    const diff = git(workspace, "diff", "--cached").stdout;
    const grade = result.error ? null : gradeWorkspace(scenarioDir, workspace);
    const id = `${job.scenario}-${job.arm}-${job.index}`;
    writeFileSync(join(out, `${id}.diff`), diff);
    writeFileSync(join(out, `${id}.transcript.json`), result.transcript ?? "");
    const { transcript, ...agentFields } = result;
    runs.push({ id, ...job, error: result.error, agent: agentFields, grade });
    rmSync(workspace, { recursive: true, force: true });
  }
  const summary = summarize(runs, Object.keys(protocol.arms));
  writeFileSync(
    join(out, "results.json"),
    JSON.stringify({ revision, protocol, runs, summary }, null, 2),
  );
  return { runs, summary };
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const option = (name) => {
    const flag = process.argv.indexOf(name);
    return flag > 0 ? process.argv[flag + 1] : undefined;
  };
  const registered = JSON.parse(
    readFileSync(join(root, "benchmark", "protocol.json"), "utf8"),
  );
  // A smoke run checks the pipeline with one run per arm and is labelled as such.
  const smoke = option("--smoke");
  if (smoke && !registered.scenarios.includes(smoke))
    throw new Error(`Unknown scenario: ${smoke}`);
  if (!smoke && git(root, "status", "--porcelain").stdout.trim())
    throw new Error(
      "Commit the protocol and fixtures before a run so the report can cite the revision.",
    );
  const protocol = smoke
    ? { ...registered, scenarios: [smoke], runsPerArm: 1, smoke: true }
    : registered;
  const revision = git(root, "rev-parse", "HEAD").stdout.trim();
  const out = option("--out")
    ? resolve(option("--out"))
    : join(
        root,
        "benchmark",
        "results",
        smoke ? `smoke-${smoke}` : revision.slice(0, 12),
      );
  const { summary } = runBenchmark({
    protocol,
    agent: claudeAgent(protocol),
    out,
    revision,
  });
  console.log(JSON.stringify(summary, null, 2));
}
