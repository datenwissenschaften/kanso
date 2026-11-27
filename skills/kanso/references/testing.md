# Behavior-driven testing

For each behavior change, write observable acceptance scenarios in Gherkin. Put executable acceptance scenarios in `.feature` files. Use the project's existing Gherkin runner, reusing test fixtures in step definitions. Cover the intended outcome, relevant boundaries and failures. Keep unit, property, and other lower-level checks in the existing native framework. Preserve existing suites and report any execution gap when the project lacks a Gherkin runner.

1. **RED.** Add the smallest test of the new or corrected behavior and run it. Confirm the failure comes from the missing behavior or defect. A broken harness provides no RED evidence.
2. **GREEN.** Implement the smallest correct, maintainable change and run the test again.
3. **REFACTOR.** Improve names, structure and duplication while preserving behavior. Rerun the tests and repeat in small increments.
4. Run broader checks before completion. Record failures or blocked execution accurately.

Use public behavior as the test boundary. Reproduce bugs before fixing them. Characterize legacy behavior before restructuring. For non-behavioral changes, run applicable checks against the existing contract.

Prefer deterministic tests, real lightweight collaborators and doubles at external boundaries. Avoid sleeps, brittle mocks and unintended network dependence. Use integration and contract tests for interactions, property-based tests for invariants, and end-to-end tests for critical journeys. Preserve seeds and minimal counterexamples when available. Fuzz risky boundaries and consider mutation testing when the added feedback justifies the cost. Cover denied access, invalid input and recovery where relevant. Use coverage to find gaps and set thresholds from project needs.
