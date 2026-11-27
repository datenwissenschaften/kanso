# Install Engineering Standards

1. [Download the release ZIP](https://github.com/datenwissenschaften/engineering-standards/releases/latest/download/engineering-standards.zip).
2. Extract it into the personal skills directory for your agent. Create the parent directory if needed. The archive already contains an `engineering-standards` folder. Verify that `SKILL.md` is directly inside that folder. If an installation already exists, review it before replacing it.

| Agent                                                 | Extract to          | Expected skill file                               |
| ----------------------------------------------------- | ------------------- | ------------------------------------------------- |
| [Codex](https://learn.chatgpt.com/docs/build-skills)  | `~/.agents/skills/` | `~/.agents/skills/engineering-standards/SKILL.md` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `~/.claude/skills/` | `~/.claude/skills/engineering-standards/SKILL.md` |

On Windows, `~` means the current user’s home directory. For WSL, use the home directory in the Linux environment where the agent runs.

## Apply it to every Codex prompt

Add this block once to your [global Codex instructions](https://learn.chatgpt.com/docs/agent-configuration/agents-md). Use `~/.codex/AGENTS.md`, or the corresponding file under `CODEX_HOME` if set. If a non-empty `AGENTS.override.md` is active there, add the block to that file.

```markdown
## Engineering Standards

On every user prompt, use the engineering-standards skill at
~/.agents/skills/engineering-standards/SKILL.md. Apply the guidance relevant
to the task while respecting higher-priority instructions and repository contracts.
```

Start a fresh session. The instruction applies across projects and keeps the skill in scope for every prompt. The checks Codex runs still depend on the task and its available tools. To invoke explicitly, use `$engineering-standards` in Codex or `/engineering-standards` in Claude Code.

## Update or remove

To update, download the new ZIP and replace the installed folder after reviewing local changes. To remove, delete the installed `engineering-standards` folder and remove the instruction block you added. If you use a development symlink or junction, remove only the link.

Contributors can link an existing clone into the same skills directory for live updates. Keep the released archive as the source for regular installations.
