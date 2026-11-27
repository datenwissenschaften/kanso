# Python profile

## Detect

Read `pyproject.toml`, the dependency manifests, CI, and the supported Python versions. Check the project interpreter. For notebook work, check that the kernel uses the intended environment.

## Conventions

- Use `pathlib`, type public APIs, and validate configuration and external inputs at boundaries. Keep I/O separate from transformations so small fixtures can exercise parsing and business rules.
- Use notebooks for exploration. Put recurring transformations and feature code in importable modules called by both notebooks and production jobs. Match the existing data stack. Test schemas, nulls, duplicates, time zones, and join behavior against representative inputs. See the [data and AI playbook](../references/data-and-ai.md) for evaluation and leakage controls.

## Tool candidates

For new projects, prefer uv, Ruff, Pyright with strict checking for owned modules, and pytest. Keep an existing equivalent. Put settings in `pyproject.toml` where supported. Use Hypothesis to test invariants that are hard to cover with examples.

With tools installed in a uv project, run `uv run --locked ruff check`, `uv run --locked ruff format --check`, `uv run --locked pyright`, and `uv run --locked pytest`. Build and smoke-test the wheel if distributing a package. See the [uv locking guide](https://docs.astral.sh/uv/concepts/projects/sync/).

## Library candidates

Start with the standard library. Keep an existing open-source tool that meets the contract. For a new responsibility, select one default from the matching row. Check the exact edition and license. Required features must run locally. Rule out mandatory vendor accounts, paid unlocks, freemium limits, and hosted-only components.

| Task                                 | Default        | Why                                                                              |
| ------------------------------------ | -------------- | -------------------------------------------------------------------------------- |
| Dataframe transformations            | pandas         | Familiar tabular operations for data that fits in memory.                        |
| Local SQL over files                 | DuckDB         | Query CSV and Parquet with SQL without a separate database service.              |
| Arrow and Parquet interchange        | PyArrow        | Keep the storage schema explicit across tools.                                   |
| Distributed Spark transformations    | PySpark        | Work in the existing Spark environment when the job needs distributed execution. |
| Relational database access           | SQLAlchemy     | Keep transaction ownership and query parameters explicit.                        |
| Typed input and configuration        | Pydantic       | Validate data at the boundary.                                                   |
| Dataframe validation                 | Pandera        | Define column constraints and test them at handoffs.                             |
| Numerical arrays                     | NumPy          | Express vectorized calculations with explicit shapes.                            |
| Statistical tests                    | SciPy          | Use established statistical functions and document assumptions.                  |
| Statistical inference                | statsmodels    | Inspect uncertainty and diagnostics for fitted models.                           |
| Classical model baselines            | scikit-learn   | Fit preprocessing and estimators together in a pipeline.                         |
| Neural-network training              | PyTorch        | Use it when the task calls for trainable tensor models.                          |
| Local LLM inference                  | ollama         | Connect to a local model server when local inference meets requirements.         |
| HTTP API service                     | FastAPI        | Use typed request and response boundaries for a new API.                         |
| Server-rendered project UI           | Jinja2         | Use plain HTML templates served by the existing application.                     |
| Interactive browser charts           | Plotly         | Render charts using locally bundled assets.                                      |
| HTTP requests                        | httpx          | Set explicit timeouts and reuse client instances.                                |
| Bounded retry policies               | Tenacity       | Retry only safe operations for a finite number of attempts.                      |
| Application logs                     | Loguru         | Keep a single structured logging configuration.                                  |
| Command-line apps                    | Typer          | Define typed commands when a standard-library CLI has outgrown its needs.        |
| Terminal rendering                   | Rich           | Keep display logic separate from commands and business rules.                    |
| Measured serialization bottlenecks   | msgspec        | Adopt only after profiling and checking compatibility.                           |
| Attribute access to dynamic mappings | python-box     | Keep external schema validation at the boundary.                                 |
| Behavior tests                       | pytest         | Test public behavior through small fixtures.                                     |
| Property-based tests                 | Hypothesis     | Generate inputs for explicit invariants.                                         |
| HTTP client tests                    | respx          | Exercise error and timeout handling without remote calls.                        |
| Database integration tests           | Testcontainers | Use a real test database when the project supports containers.                   |
