# Java profile

## Detect

Inspect Maven or Gradle manifests and wrappers, toolchain settings, modules and framework configuration.

## Conventions

Honor the configured Java version and framework lifecycle. Use established nullability annotations, records for suitable immutable data, and constructor injection. Keep conversions and validation at transport and persistence boundaries.

## Tool candidates

Use the existing Maven or Gradle wrapper. Consider Spotless, Checkstyle or SpotBugs for distinct concerns, JUnit and jqwik for tests, and ArchUnit for layer constraints.

Prefer the project's configured `verify` or `check` tasks so integration checks stay in scope. Test affected modules and consumers. Exercise real serialization or persistence when the corresponding contract changes.

## Library candidates

Consider Jackson for serialization and Jakarta Validation for boundary constraints when supported by the stack.
