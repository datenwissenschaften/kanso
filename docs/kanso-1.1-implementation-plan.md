# Kanso 1.1 implementation plan

Kanso will ship one skill for software, data science, analytics, and AI product work. Use it through the Codex or Claude Code plugin, the Skills CLI, or a standalone ZIP.

## Assumptions

- The GitHub repository remains the source of truth for the canonical skill. Each distribution packages `skills/kanso`.
- Native plugins can use a prompt hook. Standalone installs use an explicit instruction in the host's configuration.
- The isolated prompt pilot gives response and token measurements. Generated code size and executed test coverage need working repository fixtures and an available evaluation account.

## Implementation and verification

1. Package the same skill for the supported marketplaces, ZIP and npm. Verify discovery, validate manifests, inspect each archive, and test local installation.
2. Add the data and AI playbook, illustrations and decision scenarios. Check relative links and keep measured pilot results separate from repository execution benchmarks.
3. Run the quality workflow on the release commit, publish the GitHub release, then smoke-test installation from its public sources. Publish the npm package when an authorized registry account is available.
