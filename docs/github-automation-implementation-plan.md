# GitHub automation implementation plan

## Assumptions

- Kanso ships one canonical skill and supports native metadata for each supported host.
- A semantic version tag authorizes packaging and publishing the matching GitHub release. Kanso is not published to npm.
- Paid agent evaluations stay separate from pull-request and release CI.

## Implementation and verification

- Verify tag-triggered publishing on the next version tag. The v1.1.0 release predates the publish workflow, and both publish runs so far were manual rehearsals.
