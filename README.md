# Engineering Standards

**Minimal Code. Maximum Assurance.**

A language-agnostic Agent Skill for AI coding agents. It favors minimal owned code, mature reuse, explicit contracts, secure design, behavior-driven TDD, and automated quality gates. The [skill](SKILL.md) routes agents to detailed references and the relevant language profiles.

## Install from Git

Use one local clone for all agents. Each symlink points to the clone, so updates to the checkout are available to every linked agent. Review updates before pulling them.

| Agent                                                 | Personal skill directory | Project skill directory | Explicit invocation      |
| ----------------------------------------------------- | ------------------------ | ----------------------- | ------------------------ |
| [Codex](https://learn.chatgpt.com/docs/build-skills)  | `~/.agents/skills`       | `.agents/skills`        | `$engineering-standards` |
| [Claude Code](https://code.claude.com/docs/en/skills) | `~/.claude/skills`       | `.claude/skills`        | `/engineering-standards` |

Run the commands in the environment where the agent runs. For WSL, this means using the WSL home directory. For project scope, select the documented directory under the target project instead. Reuse an existing clone by setting the clone path accordingly.

### macOS, Linux and WSL

```sh
clone="$HOME/Developer/engineering-standards"
skills="$HOME/.agents/skills"
link="$skills/engineering-standards"
mkdir -p "$HOME/Developer" "$skills"
if [ ! -e "$clone" ] && [ ! -L "$clone" ]; then
  git clone https://github.com/datenwissenschaften/engineering-standards.git "$clone"
fi

if [ ! -f "$clone/SKILL.md" ]; then
  printf '%s\n' "Expected a skill checkout at $clone" >&2
elif [ -L "$link" ] && [ "$(readlink "$link")" = "$clone" ]; then
  printf '%s\n' "Already linked"
elif [ -e "$link" ] || [ -L "$link" ]; then
  printf '%s\n' "Skill path already exists at $link" >&2
else
  ln -s "$clone" "$link"
fi
```

To remove the installation, run this in the same shell with the variables above.

```sh
if [ -L "$link" ] && [ "$(readlink "$link")" = "$clone" ]; then
  unlink "$link"
fi
```

### Windows PowerShell

Use a shell that can create directory symlinks, for example with Windows Developer Mode enabled. Set the clone path to the absolute path of your existing checkout.

```powershell
$clone = Join-Path $HOME 'Developer/engineering-standards'
$skills = Join-Path $HOME '.agents/skills'
$link = Join-Path $skills 'engineering-standards'

$checkout = Get-Item -LiteralPath $clone -Force -ErrorAction SilentlyContinue
if (-not $checkout) {
    git clone https://github.com/datenwissenschaften/engineering-standards.git $clone
    if ($LASTEXITCODE -ne 0) { throw 'Clone failed' }
}
if (-not (Test-Path -LiteralPath (Join-Path $clone 'SKILL.md') -PathType Leaf)) {
    throw "Expected a skill checkout at $clone"
}
[void][IO.Directory]::CreateDirectory($skills)
$existing = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
if ($existing.LinkType -eq 'SymbolicLink' -and $existing.Target -eq $clone) {
    Write-Output 'Already linked'
} elseif ($existing) {
    throw "Skill path already exists at $link"
} else {
    New-Item -ItemType SymbolicLink -Path $link -Target $clone -ErrorAction Stop
}
```

To remove the installation, run this in the same shell with the variables above.

```powershell
$existing = Get-Item -LiteralPath $link -Force -ErrorAction SilentlyContinue
if ($existing.LinkType -eq 'SymbolicLink' -and $existing.Target -eq $clone) {
    [IO.Directory]::Delete($link, $false)
}
```

Start a fresh Codex session, confirm the skill appears in the skill picker, and invoke it on a small code change. To extend the skill, invoke it in this repository and ask it to integrate the principle, update affected scenarios, and run the quality gates. See [Contributing](CONTRIBUTING.md), the [changelog](CHANGELOG.md), and the [MIT license](LICENSE).
