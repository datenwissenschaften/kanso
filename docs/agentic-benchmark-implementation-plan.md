# Agentic benchmark implementation plan

## Assumptions

- The benchmark compares two arms only: `baseline` and `kanso`. Both use the same agent, model, task, fixture, tools and permissions. Only the staged plugin, which contains the skill and its prompt hook, differs.
- Fixtures are small JavaScript repositories that use `node:test`, so a run needs Node.js, Git and the agent CLI and no package installation.
- Paid runs use Claude Code in headless mode with an API key and a fresh configuration directory per run, so user-level skills cannot leak into the baseline.
- Agent cost, time and changed production lines are measured. Developer time and the cost of technical debt are not converted into money. The benchmark reports escaped defects instead, where the agent's tests pass while the hidden tests fail.

## Implementation and verification

- Replicate the registered protocol through **Actions → Agentic benchmark** on the Linux runner. The local Windows run cost USD 1.89 for 30 sessions.
- Add harder fixtures. The registered local run in `benchmark/runs/28a2958e7244` solved 15/15 in both arms and had no escaped defects, so solved and escaped hit a ceiling. Only proven separated the arms, 8/15 against 15/15, driven by `bug-fix` and `analytics`.
- Extend to the remaining scenarios in `tests/scenarios/README.md` with hidden acceptance, adversarial and calibration variants.
