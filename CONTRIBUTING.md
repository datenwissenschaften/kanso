# Contributing

Integrate a new principle into its existing section and remove redundant or conflicting guidance. Match the profile headings for detection, conventions, tool candidates and library candidates. Keep the canonical skill under [skills/kanso](skills/kanso/SKILL.md) and link its resources from SKILL.md.

Write observable Given/When/Then criteria for a changed instruction. Run the relevant [scenarios](tests/scenarios/README.md) against the baseline and against the revised skill using the same fixture and settings. Record the model, agent version, skill revision, commands, results, and limitations. Review evaluation logs for private information before sharing them.

Use the commands in the [quality workflow](.github/workflows/quality.yml) to verify the proposed changes. Run behavioral scenarios separately for affected instructions.

Use [Semantic Versioning](https://semver.org/). Use patch releases for compatible corrections, minor releases for compatible principles or profiles, and major releases for breaking changes to the engineering contract. Update the [changelog](CHANGELOG.md) and create a v-prefixed release tag after verification.

For the standalone release asset, export the verified commit to a staging directory, copy the root LICENSE into its `skills/kanso` folder, and create `kanso.zip` with that folder at the archive root. Extract it into an empty directory and validate the skill and links before attaching the ZIP to the [GitHub release](https://github.com/datenwissenschaften/kanso/releases).
