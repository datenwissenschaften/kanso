# Python profile

## Detect

Inspect pyproject.toml, uv.lock, other lockfiles or requirements files, framework settings and CI.

## Conventions

Use pathlib for paths. Annotate public APIs and check types with the project's strict settings.

## Tool candidates

Prefer uv, Ruff for formatting and linting, Pyright for types, and pytest with Hypothesis for property tests. Put settings in pyproject.toml or existing native configuration.

## Library candidates

Consider Pydantic for validation, msgspec for measured serialization needs, Loguru for logging, Typer for CLI interfaces, httpx for HTTP, Tenacity for bounded retries, and Rich for terminal rendering. Consider python-box where attribute access suits dynamic mapping data and keeps boundary contracts explicit.
