# GitHub automation implementation plan

## Assumptions

- Kanso ships one canonical skill and supports native metadata for each supported host.
- A semantic version tag authorizes packaging and publishing the matching GitHub release.
- npm publishing requires registry setup. Paid agent evaluations stay separate from pull-request and release CI.

## Implementation and verification

- Verify actual publishing on the next authorized version tag.
- Refresh the three Dependabot action pins and verify them together against current CI.
- Add workflow and dependency review gates, enable available GitHub security controls, and verify the resulting checks on a pull request.
