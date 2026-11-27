# Rust profile

## Detect

Inspect Cargo manifests, workspace features, Cargo.lock, toolchain configuration and CI.

## Conventions

Use Result for recoverable failures and enums for state. Scope unsafe code and document its safety invariants. Check supported feature sets and minimum Rust version.

## Tool candidates

Use Cargo with rustfmt, Clippy and cargo test. Consider proptest and cargo-audit or cargo-deny. Use rustfmt.toml, clippy.toml and Cargo.toml for native configuration.

## Library candidates

Consider Serde for serialization, thiserror for library errors, and tracing for diagnostics.
