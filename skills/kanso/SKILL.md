---
name: kanso
description: Apply opinionated engineering standards to coding, data science, analytics, and AI product work. Use behavior-driven TDD, explicit contracts, mature reuse, secure design, and measurable acceptance criteria.
license: MIT
---

# Kanso

**Minimal Code. Maximum Assurance.**

Minimize owned production code and total maintenance cost while preserving correctness, security, safety, readability, and testability.

1. **Discover.** Read governing repository instructions. Trace the affected behavior through callers, tests, fixtures, configuration, and public exports. Detect each affected module's language, framework, build system, package manager, and quality tools. Preserve supported contracts and explicit project requirements. Surface consequential conflicts and establish the relevant baseline.
   For cross-module, risky, or multi-step work, write the implementation and verification plan under `docs/` before editing. Record assumptions that affect scope, behavior, data, or risk in the same document and verify them against available evidence. Reuse an existing task document under `docs/` or use `docs/<task>-implementation-plan.md`. Ask before proceeding when an unresolved assumption could cause harm or require substantial rework.
2. **Specify and test.** State the changed behavior and failure cases in Given/When/Then terms. Apply behavior-driven TDD with observed RED, GREEN, and refactor checks. For fixes, reproduce the defect first. For legacy refactoring, characterize the behavior at risk.
3. **Reuse and design.** Check whether the change needs new code. Look for existing project code, standard library or platform features, and adopted dependencies before evaluating new libraries or writing bespoke code. Apply Clean Code, KISS, DRY, YAGNI, and SOLID with explicit contracts and cohesive composition. Preserve validation, recovery, security, and accessibility when simplifying. Fail fast and obtain authorization before irreversible or externally consequential actions.
4. **Integrate.** Work in small XP increments with fast feedback, collective ownership, continuous integration and refactoring, and a sustainable pace. Put applicable checks in versioned native configuration. Preserve effective tooling and avoid overlapping gates or broad suppressions.
5. **Verify and report.** Review the diff and run the relevant formatting, analysis, testing, security, and build checks. Remove completed items from the implementation plan as soon as you verify them. Keep pending and blocked items with their next action. Remove the plan when no open items remain, preserving any decisions that still belong in project documentation. Report exercised acceptance criteria, commands and outcomes, baseline failures, gaps, and blockers. Keep commits and deployment within the user's authorization.

## References

- [Testing](references/testing.md) for behavior changes, regressions, characterization, and test selection.
- [Architecture](references/architecture.md) for contracts, structure, composition, and compatibility.
- [Dependencies](references/dependencies.md) for build-versus-reuse and dependency changes.
- [Security and design](references/security-and-design.md) for trust boundaries, safety, and operational risks.
- [Automation](references/automation.md) for quality gates and tool configuration.
- [Data science, analytics, and AI](references/data-and-ai.md) whenever a change touches data, metrics, models, prompts, retrieval, or decisions supported by AI.

Read profiles only for affected ecosystems. Each adds conventions and candidates. Prefer established equivalent tools in the repository.

- [Python](profiles/python.md)
- [TypeScript and JavaScript](profiles/typescript.md)
- [Rust](profiles/rust.md)
- [Go](profiles/go.md)
- [Java](profiles/java.md)
