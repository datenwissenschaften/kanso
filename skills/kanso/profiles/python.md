# Python profile

## Detect

Read `pyproject.toml`, the lockfile or requirements files, CI, and the supported Python versions. Check the project interpreter. For notebook work, check that the kernel uses the intended environment.

## Conventions

- Use `pathlib`, type public APIs, and validate configuration and external inputs at boundaries. Keep I/O separate from transformations so small fixtures can exercise parsing and business rules.
- Use notebooks for exploration. Put recurring transformations and feature code in importable modules called by both notebooks and production jobs. Match the existing dataframe or warehouse stack. Test schemas, nulls, duplicates, time zones, and join behavior against representative inputs. See the [data and AI playbook](../references/data-and-ai.md) for evaluation and leakage controls.

## Tool candidates

For new projects, prefer uv, Ruff, Pyright with strict checking for owned modules, and pytest. Keep an existing equivalent. Put settings in `pyproject.toml` where supported. Use Hypothesis to test invariants that are hard to cover with examples.

With tools installed in a uv project, run `uv run --locked ruff check`, `uv run --locked ruff format --check`, `uv run --locked pyright`, and `uv run --locked pytest`. Build and smoke-test the wheel if distributing a package. See the [uv locking guide](https://docs.astral.sh/uv/concepts/projects/sync/).

## Library candidates

Start with standard-library CSV, JSON, logging, CLI and path handling. Consider Pydantic for external schemas, msgspec for measured serialization needs, Loguru for application logging, Typer for richer CLIs, httpx for HTTP, Tenacity for bounded retries, and Rich for terminal rendering. Consider python-box for dynamic mappings with separately validated boundaries. Reuse the project's dataframe, SQL and modeling stack.
