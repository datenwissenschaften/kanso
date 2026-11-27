# Contributing

Integrate a new principle into its existing section and remove redundant or conflicting guidance. Match the profile headings for detection, conventions, tool candidates and library candidates. Keep the canonical skill under [skills/kanso](skills/kanso/SKILL.md) and link its resources from SKILL.md.

Write observable Given/When/Then criteria for a changed instruction. Run the relevant [scenarios](tests/scenarios/README.md) against the baseline and against the revised skill using the same fixture and settings. Record the model, agent version, skill revision, commands, results, and limitations. Review evaluation logs for private information before sharing them.

Use the commands in the [quality workflow](.github/workflows/quality.yml) to verify the proposed changes. Run behavioral scenarios separately for affected instructions.

Use [Semantic Versioning](https://semver.org/). Use patch releases for compatible corrections, minor releases for compatible principles or profiles, and major releases for breaking changes to the engineering contract. Update the [changelog](CHANGELOG.md) and create a v-prefixed release tag after verification.

Update the version in `package.json` and the Claude Code, Codex, and Copilot manifests together. The [quality workflow](.github/workflows/quality.yml) builds and inspects the ZIP and npm tarball. Pushing a matching `vX.Y.Z` tag starts the [publish workflow](.github/workflows/publish.yml). It reruns quality checks and attaches the verified ZIP to the GitHub release.

Run **Actions → Publish → Run workflow** to rehearse the build and artifact handoff without publishing.

Kanso is not published to npm. The tarball check only confirms that the package metadata ships the canonical skill.

### Agentic benchmark

The [benchmark](benchmark/protocol.json) runs a coding agent on working fixtures with and without Kanso. Hidden acceptance and adversarial tests decide whether a fix is correct. A fix counts as proven only when the agent's own tests fail on the original defect and pass on its change. Commit protocol changes before a paid run. The runner refuses an uncommitted tree so the report can cite the revision. Run **Actions → Agentic benchmark → Run workflow** on `main` with the evaluation setup below. The [workflow](.github/workflows/benchmark.yml) uploads results, diffs, transcripts and the static explorer as an artifact.

To run locally, put `ANTHROPIC_API_KEY` in an ignored `.env` file and run `node --env-file=.env benchmark/run.mjs`, then `node benchmark/report.mjs benchmark/results/<revision>`. Add `--smoke <scenario>` to check the pipeline with one run per arm. Smoke reports are labelled and are not results.

### Agent evaluation setup

1. Create an API key in the [Claude Console](https://platform.claude.com/settings/keys) for a workspace with API credits or billing configured.
2. In GitHub, open **Settings → Environments → evaluation** and add an environment secret named `ANTHROPIC_API_KEY`.
3. Under **Settings → Secrets and variables → Actions → Variables**, set the repository variable `KANSO_EVAL_ENABLED` to `true`.
4. Open **Actions → Agent evaluation → Run workflow** and select `main`.

The [workflow](.github/workflows/evaluate.yml) uses synthetic scenarios and saves JSON and HTML reports as run artifacts. The evaluator checks a USD 3 budget before each run. Concurrent runs already underway can exceed it.
