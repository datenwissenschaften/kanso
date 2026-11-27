# Agentic benchmark implementation plan

## Assumptions

- The benchmark compares two arms only: `baseline` and `kanso`. Both use the same agent, model, task, fixture, tools and permissions. Only the staged plugin, which contains the skill and its prompt hook, differs.
- Fixtures are small JavaScript repositories that use `node:test`, so a run needs Node.js, Git and the agent CLI and no package installation.
- Paid runs use Claude Code in headless mode with an API key and a fresh configuration directory per run, so user-level skills cannot leak into the baseline.
- Agent cost, time and changed production lines are measured. Developer time and the cost of technical debt are not converted into money. The benchmark reports escaped defects instead, where the agent's tests pass while the hidden tests fail.

## Implementation and verification

- Run **Actions → Agentic benchmark** on `main` with n = 5 per arm for `bug-fix`, `security` and `analytics`. Publish `results.json`, diffs, transcripts and the rendered explorer, including errored runs. Local smoke runs with `claude-sonnet-5-5` cost about USD 0.07 per run, so the registered protocol should cost about USD 2.
- Check for a ceiling effect. In the smoke runs both arms solved `security` and `analytics` and wrote a test that failed on the defect. Only `bug-fix` separated the arms, where the baseline added no test. If the registered run shows the same ceiling, add harder fixtures before claiming a difference.
- Extend to the remaining scenarios in `tests/scenarios/README.md` with hidden acceptance, adversarial and calibration variants.
