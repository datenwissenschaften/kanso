---
max_turns: 5
allowed_tools: [Read, Glob, Grep, Skill]
---

Our item API returns 20 items when existing callers omit pageSize. Add support for pageSize between 1 and 100. The repository requires compatibility for existing callers. Outline your change and tests.
