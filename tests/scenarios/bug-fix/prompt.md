---
max_turns: 5
allowed_tools: [Read, Glob, Grep, Skill]
---

The invoice helper rounds its running total after each line. The call totalCents([0.4, 0.4]) returns 0 and should return 1. Use Math.round semantics and preserve whole-cent results. Explain the change and verification you would perform.
