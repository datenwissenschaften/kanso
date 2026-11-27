---
name: engineering-standards
description: Apply language-independent engineering standards when implementing features, fixing bugs, refactoring, reviewing code, or configuring software quality gates. Use behavior-driven TDD, explicit contracts, mature reuse, and secure design.
license: MIT
---

# Engineering Standards

**Minimal Code. Maximum Assurance.**

Minimize owned production code and total maintenance cost while preserving correctness, security, safety, readability, and testability.

1. **Discover.** Read governing repository instructions. Detect languages, frameworks, build systems, package managers, quality tools, and tests from source, manifests, lockfiles, configuration, and CI. Check each affected module in mixed repositories. Preserve authorized scope, supported contracts, and explicit project requirements. Surface conflicts and resolve consequential ambiguity before acting. Establish the relevant baseline.
2. **Specify and test.** State the changed behavior and failure cases in Given/When/Then terms. Apply behavior-driven TDD with observed RED, GREEN, and refactor checks. For fixes, reproduce the defect first. For legacy refactoring, characterize the behavior at risk.
3. **Reuse and design.** Search the repository, standard library, and mature dependencies before owning new code. Apply Clean Code, KISS, DRY, YAGNI, and SOLID with explicit contracts, composition, and cohesive responsibilities. Validate trust boundaries, fail fast, and get authorization before irreversible or externally consequential actions.
4. **Integrate.** Work in small XP increments with fast feedback, collective ownership, continuous integration and refactoring, and a sustainable pace. Put applicable checks in versioned native configuration. Preserve effective tooling and avoid overlapping gates or broad suppressions.
5. **Verify and report.** Review the diff and run the relevant formatting, analysis, testing, security, and build checks. Report exercised acceptance criteria, commands and outcomes, baseline failures, gaps, and blockers. Keep commits and deployment within the user's authorization.

## References

- [Testing](references/testing.md) for behavior changes, regressions, characterization, and test selection.
- [Architecture](references/architecture.md) for contracts, structure, composition, and compatibility.
- [Dependencies](references/dependencies.md) for build-versus-reuse and dependency changes.
- [Security and design](references/security-and-design.md) for trust boundaries, safety, and operational risks.
- [Automation](references/automation.md) for quality gates and tool configuration.

Read profiles only for affected ecosystems. Each adds conventions and candidates. Prefer established equivalent tools in the repository.

- [Python](profiles/python.md)
- [TypeScript and JavaScript](profiles/typescript.md)
- [Rust](profiles/rust.md)
- [Go](profiles/go.md)
- [Java](profiles/java.md)

For changes to this skill, follow [Contributing](CONTRIBUTING.md) and exercise the relevant [evaluation scenarios](tests/scenarios/README.md). See the [README](README.md) for installation, [LICENSE](LICENSE) for terms, and [changelog](CHANGELOG.md) for releases.
