# Dependencies and reuse

1. Identify existing repository capabilities, standard-library support, and mature external candidates. Prefer an adopted library when it meets the contract. Select an external library when it reduces owned code and lifecycle risk.
2. Check maintenance, security advisories and history, provenance, license, supported platforms and versions, API stability, transitive dependencies, deployment footprint, and integration cost. Use current evidence and state what remains unverified. Add an SBOM when distribution or risk warrants it.
3. Use native APIs and configuration directly where practical. Pin tools and lock dependency resolution when supported. Remove superseded code and unused dependencies after verifying existing callers.
4. Report material tradeoffs and checks. Use changes in owned code and complexity as diagnostics. Preserve tests and safeguards.
