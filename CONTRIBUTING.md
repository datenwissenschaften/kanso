# Contributing

Integrate a new principle into its existing section and remove redundant or conflicting guidance. Match the profile headings for detection, conventions, tool candidates and library candidates. Keep the canonical skill under [skills/kanso](skills/kanso/SKILL.md) and link its resources from SKILL.md.

Write observable Given/When/Then criteria for a changed instruction. Run the relevant [scenarios](tests/scenarios/README.md) against the baseline and against the revised skill using the same fixture and settings. Record the model, agent version, skill revision, commands, results, and limitations. Review evaluation logs for private information before sharing them.

Use the commands in the [quality workflow](.github/workflows/quality.yml) to verify the proposed changes. Run behavioral scenarios separately for affected instructions.

Use [Semantic Versioning](https://semver.org/). Use patch releases for compatible corrections, minor releases for compatible principles or profiles, and major releases for breaking changes to the engineering contract. Update the [changelog](CHANGELOG.md) and create a v-prefixed release tag after verification.

Update the version in `package.json` and the Claude Code, Codex, and Copilot manifests together. The [quality workflow](.github/workflows/quality.yml) builds and inspects the ZIP and npm tarball. Pushing a matching `vX.Y.Z` tag starts the [publish workflow](.github/workflows/publish.yml). It reruns quality checks and attaches the verified ZIP to the GitHub release.

To enable npm publishing, create the initial package with an authorized npm account. In its [trusted publisher settings](https://docs.npmjs.com/trusted-publishers/), select GitHub Actions and register `datenwissenschaften/kanso`, workflow `publish.yml`, and environment `npm`. Set the GitHub repository variable `NPM_PUBLISH_ENABLED` to `true` after setup. Future tags publish the verified tarball using OIDC.

To run the paid [agent evaluation workflow](.github/workflows/evaluate.yml), configure the `evaluation` environment with `ANTHROPIC_API_KEY` and enable the repository variable `KANSO_EVAL_ENABLED`. Dispatch it from Actions. It uses synthetic scenarios and saves reports as run artifacts. The evaluator checks a USD 3 budget before each run. Concurrent runs already underway can exceed it.
