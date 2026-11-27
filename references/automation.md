# Automation and quality gates

Inventory existing commands and run a baseline. Keep one authoritative versioned configuration per concern. Use native package scripts, build targets, or the existing task runner for reproducible local and CI checks. Install locked dependencies where supported. Use fast optional hooks for feedback and read-only CI checks as the authoritative gate. Pin tool versions and third-party CI actions, give jobs minimum permissions, and omit credentials from untrusted changes.

| Concern                                   | Configure where applicable                                                                                                               |
| ----------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Formatting                                | One formatter per file type. Use native configuration or EditorConfig for shared conventions. Apply safe fixes locally and verify in CI. |
| Lint and types                            | Enable supported strict type analysis and checks for naming, imports, unsafe constructs and unused symbols.                              |
| Behavior and properties                   | Run the native test suite, integration checks and invariant/property tests in CI where relevant.                                         |
| Architecture                              | Enforce intended dependency directions and structural constraints with native rules or mature AST tooling such as ast-grep.              |
| Complexity, dead code and duplication     | Use reliable existing metrics and detectors. Scope generated or vendored exclusions narrowly.                                            |
| Static security, dependencies and secrets | Use native security rules or an established scanner such as Semgrep, OSV-Scanner, Trivy or Gitleaks for the relevant concern.            |
| Build                                     | Verify the supported build targets from a clean, reproducible installation.                                                              |

Where native checks cannot express a structural rule such as the handwritten class limit, prefer an existing AST tool. Verify checks with representative passing and failing cases. Retain semantic or impractical checks for review and report those gaps. Document narrow exceptions and baseline debt. Never weaken a gate to achieve a passing result.

For ecosystems without a dedicated profile, reuse established candidates such as ktlint, detekt and Kotest for Kotlin, dotnet format, Roslyn and xUnit/FsCheck for C#, clang-format, clang-tidy and GoogleTest for C/C++, shfmt, ShellCheck and Bats for shell, and SQLFluff plus dbt tests or integration tests for SQL.
