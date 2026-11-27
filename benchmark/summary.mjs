// Pre-registered statistics: Wilson intervals per arm, Newcombe interval for the difference.
const Z = 1.959964;

export function wilson(successes, n) {
  if (n === 0) return [0, 1];
  const p = successes / n;
  const denominator = 1 + Z ** 2 / n;
  const centre = (p + Z ** 2 / (2 * n)) / denominator;
  const margin =
    (Z * Math.sqrt((p * (1 - p)) / n + Z ** 2 / (4 * n ** 2))) / denominator;
  return [Math.max(0, centre - margin), Math.min(1, centre + margin)];
}

function rate(count, n) {
  return { count, n, rate: n ? count / n : 0, ci95: wilson(count, n) };
}

function newcombe(a, b) {
  const difference = a.rate - b.rate;
  const low = difference - Math.hypot(a.rate - a.ci95[0], b.ci95[1] - b.rate);
  const high = difference + Math.hypot(a.ci95[1] - a.rate, b.rate - b.ci95[0]);
  return { difference, ci95: [low, high] };
}

// Higher is better for solved and proven; lower is better for escaped defects.
export const METRICS = { solved: 1, proven: 1, escaped: -1 };

const sum = (runs, pick) =>
  runs.reduce((total, run) => total + (pick(run) ?? 0), 0);

export function summarize(runs, arms = ["baseline", "kanso"]) {
  const summary = { arms: {}, difference: {}, verdict: {} };
  for (const arm of arms) {
    const own = runs.filter((run) => run.arm === arm);
    const costUsd = sum(own, (run) => run.agent?.costUsd);
    const entry = {
      runs: own.length,
      errors: own.filter((run) => run.error).length,
      costUsd,
      durationSeconds: sum(own, (run) => run.agent?.durationSeconds),
      productionLines: sum(
        own,
        ({ grade }) =>
          grade?.productionLines &&
          grade.productionLines.added + grade.productionLines.deleted,
      ),
    };
    for (const metric of Object.keys(METRICS))
      entry[metric] = rate(
        own.filter((run) => run.grade?.[metric]).length,
        own.length,
      );
    entry.costPerProvenUsd = entry.proven.count
      ? costUsd / entry.proven.count
      : null;
    summary.arms[arm] = entry;
  }
  const [control, treatment] = arms;
  for (const [metric, direction] of Object.entries(METRICS)) {
    const difference = newcombe(
      summary.arms[treatment][metric],
      summary.arms[control][metric],
    );
    const [low, high] = difference.ci95.map((bound) => bound * direction);
    summary.difference[metric] = difference;
    summary.verdict[metric] =
      Math.min(low, high) > 0
        ? `${treatment} better`
        : Math.max(low, high) < 0
          ? `${control} better`
          : "inconclusive";
  }
  return summary;
}
