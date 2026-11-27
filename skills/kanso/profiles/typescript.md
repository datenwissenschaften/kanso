# TypeScript and JavaScript profile

## Detect

Inspect package.json, workspace lockfiles, tsconfig, framework configuration and CI.

## Conventions

Use strict TypeScript for new modules. Narrow unknown values explicitly at untyped boundaries. Respect ESM or CommonJS contracts and workspace exports.

## Tool candidates

Consider Biome or Prettier for formatting, Biome or ESLint for linting, tsc for types, and Vitest, fast-check or Playwright for testing. Consider dependency-cruiser or Knip for boundaries or unused exports.

## Library candidates

Consider Zod for boundary schemas when the framework lacks validation and native fetch for HTTP where supported.
