# TypeScript and JavaScript profile

## Detect

Inspect `package.json`, workspace lockfiles, `tsconfig.json`, framework configuration, and CI. Identify modules that run in the browser, on the server, or both.

## Conventions

Use strict TypeScript for new modules. Narrow `unknown` and validate external payloads at runtime. Respect ESM or CommonJS contracts, workspace exports and the boundary between server-only code and client bundles.

## Tool candidates

Consider Biome or Prettier for formatting, Biome or ESLint for linting, tsc for types, and Vitest, fast-check or Playwright for testing. Consider dependency-cruiser or Knip for boundaries or unused exports.

Use the locked package manager and existing scripts. Run tests and type checks for affected packages and consumers of changed exports. Exercise the browser or server build when changing a runtime boundary.

## Library candidates

Consider Zod for boundary schemas when the framework lacks validation and native fetch for HTTP where supported.
