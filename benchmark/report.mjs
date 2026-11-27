// Renders a static explorer: node benchmark/report.mjs benchmark/results/<id>
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const escape = (value) =>
  String(value ?? "").replace(
    /[&<>"]/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c],
  );
const pct = ({ count, n, ci95 }) =>
  `${count}/${n} (95% CI ${Math.round(ci95[0] * 100)}–${Math.round(ci95[1] * 100)}%)`;
const usd = (value) => (value == null ? "n/a" : `$${value.toFixed(2)}`);
const mark = (value) => (value ? "yes" : "no");

export function render({ revision, protocol, runs, summary }) {
  const arms = Object.keys(summary.arms);
  const row = (label, cell) =>
    `<tr><th>${label}</th>${arms.map((arm) => `<td>${escape(cell(summary.arms[arm]))}</td>`).join("")}</tr>`;
  const verdicts = Object.entries(summary.verdict)
    .map(([metric, verdict]) => {
      const { difference, ci95 } = summary.difference[metric];
      return `<li>${metric}: <strong>${escape(verdict)}</strong> (difference ${difference.toFixed(2)}, 95% CI ${ci95[0].toFixed(2)} to ${ci95[1].toFixed(2)})</li>`;
    })
    .join("");
  const details = runs
    .map(
      (
        run,
      ) => `<tr><td>${escape(run.id)}</td><td>${escape(run.arm)}</td><td>${escape(run.error ?? "")}</td>
<td>${mark(run.grade?.solved)}</td><td>${mark(run.grade?.redProof)}</td><td>${mark(run.grade?.escaped)}</td>
<td>${escape(run.grade ? run.grade.productionLines.added + run.grade.productionLines.deleted : "")}</td><td>${usd(run.agent?.costUsd)}</td>
<td><a href="${escape(run.id)}.diff">diff</a> · <a href="${escape(run.id)}.transcript.json">transcript</a></td></tr>`,
    )
    .join("\n");
  return `<!doctype html>
<html lang="en"><meta charset="utf-8"><title>Kanso benchmark ${escape(revision?.slice(0, 12))}</title>
<style>body{font:15px system-ui;max-width:72rem;margin:2rem auto;padding:0 1rem}table{border-collapse:collapse}td,th{border:1px solid #ccc;padding:.3rem .6rem;text-align:left}</style>
<h1>Kanso benchmark</h1>
${protocol.smoke ? "<p><strong>Smoke run: one run per arm to check the pipeline. Not a registered result.</strong></p>" : ""}
<p>Revision <code>${escape(revision)}</code> · agent ${escape(protocol.agent.package)}@${escape(protocol.agent.version)} · model ${escape(protocol.agent.model)} · ${escape(protocol.runsPerArm)} runs per arm and scenario · scenarios: ${escape(protocol.scenarios.join(", "))}</p>
<p>${escape(protocol.decisionRule)} Errored runs count as failures.</p>
<h2>Summary</h2>
<table><tr><th></th>${arms.map((arm) => `<th>${escape(arm)}</th>`).join("")}</tr>
${row("Proven fix (hidden tests pass and the agent's tests fail on the original defect)", (a) => pct(a.proven))}
${row("Solved (hidden acceptance and adversarial tests pass)", (a) => pct(a.solved))}
${row("Escaped defect (agent tests green, hidden tests red)", (a) => pct(a.escaped))}
${row("Errored runs", (a) => a.errors)}
${row("Agent cost", (a) => usd(a.costUsd))}
${row("Agent cost per proven fix", (a) => usd(a.costPerProvenUsd))}
${row("Production lines changed", (a) => a.productionLines)}
${row("Agent time (s)", (a) => Math.round(a.durationSeconds))}
</table>
<ul>${verdicts}</ul>
<h2>Runs</h2>
<table><tr><th>Run</th><th>Arm</th><th>Error</th><th>Solved</th><th>RED proof</th><th>Escaped</th><th>Lines</th><th>Cost</th><th>Evidence</th></tr>
${details}
</table>
</html>
`;
}

if (
  process.argv[1] &&
  resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  const dir = resolve(process.argv[2]);
  writeFileSync(
    join(dir, "index.html"),
    render(JSON.parse(readFileSync(join(dir, "results.json"), "utf8"))),
  );
}
