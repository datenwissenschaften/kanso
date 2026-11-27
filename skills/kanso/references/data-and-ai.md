# Data science, analytics, and AI

Start from the decision or user outcome. Name the metric, its denominator and unit, what counts as improvement, and the cost of a wrong answer. Establish an existing workflow, a simple rule, SQL query or small statistical model as the baseline before introducing a heavier model, agent or data platform.

## Data and analytics

- Define ownership, grain, keys, units, time zones, freshness, missingness and backfill behavior at boundaries. Test representative nulls, duplicates, late records, join cardinality and invalid values. Fail fast on contract violations where publishing incorrect results would be worse than delaying them.
- Keep metric definitions versioned and shared across reports. Prefer the warehouse or existing transformation layer for common transformations. Use incremental, idempotent processing when repeating or backfilling a job. Reconcile changed metrics against an agreed reference.
- Minimize personal or sensitive data. Use sanitized fixtures, scope access, and keep raw samples and credentials out of source and logs.

## Models and experiments

- Freeze the evaluation protocol before tuning. Split by time or entity when production conditions require it. Fit preprocessing on training data only and keep the final holdout insulated from development. Compare against the baseline and report uncertainty, sample sizes and relevant slices.
- Record the data snapshot, feature and split definitions, environment, parameters, seed where supported, and model or prompt version. Keep notebooks for exploration. Move recurring logic into importable, tested transformations once there is a recurring use case.
- Test deterministic invariants with ordinary tests. Review statistical behavior through fixed evaluation datasets and explicit thresholds. Record quality, latency and per-unit cost for material changes.

## AI products

- Prefer deterministic logic or a single model request when it meets the acceptance criteria. Add retrieval, orchestration, fine-tuning or multi-agent execution when evidence shows the simpler baseline falls short.
- Version prompts and model choices. Use typed output validation, bounded retries and explicit failure paths. Evaluate meaningful tasks, including unsupported questions, adversarial inputs, permission boundaries and relevant user slices. Ground claims in available evidence and provide a clear path to abstain or escalate.
- Require explicit authorization for consequential tool calls. Separate read access from write capabilities, limit scope and protect data crossing provider boundaries. For production rollouts, monitor quality, freshness, drift, latency and cost according to actual failure modes, and keep a rollback path.
