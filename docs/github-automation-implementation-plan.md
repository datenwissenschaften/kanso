# GitHub automation implementation plan

## Assumptions

- Kanso ships one canonical skill and supports native metadata for each supported host.
- A semantic version tag authorizes packaging and publishing the matching GitHub release.
- npm publishing requires registry setup. Paid agent evaluations stay separate from pull-request and release CI.

## Implementation and verification

1. Inventory Ponytail by Git tree and map each directory and GitHub metadata file to Kanso's scope.
2. Add Copilot plugin metadata and repository guidance. Check that host manifests share the canonical skill and use the same version.
3. Build and inspect the ZIP and npm tarball in CI. Reuse that workflow before publishing tagged GitHub releases. Gate npm publishing on an explicitly configured trusted publisher.
4. Run format, link, workflow, secret, packaging and manifest checks locally and on GitHub. Verify the Copilot installer in an isolated profile where available.
