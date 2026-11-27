# Kanso 1.1 implementation plan

Kanso will ship one skill for software, data science, analytics, and AI product work. Use it through the Codex or Claude Code plugin, the Skills CLI, or a standalone ZIP.

## Assumptions

- The GitHub repository remains the source of truth for the canonical skill. Each distribution packages `skills/kanso`.
- Native plugins can use a prompt hook. Standalone installs use an explicit instruction in the host's configuration.
- The isolated prompt pilot gives response and token measurements. Generated code size and executed test coverage need working repository fixtures and an available evaluation account.

## Implementation and verification

- Publish the initial npm package when an authorized registry account is available. Configure OIDC for subsequent releases.
- Run the paid paired evaluation after the repository's evaluation environment has an API key and the workflow is enabled. Use working repository fixtures for any claims about generated code or executed tests.
