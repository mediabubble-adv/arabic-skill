# Cursor Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

> **`/arabic` command reference:** [commands.md](./commands.md) — copy-paste examples per verb + flags.

## Current Fit

`Strong`

## Install

### Preferred (npx — full integration)

Copies runtime skill, `/arabic` command, and routing rule to your Cursor user directory:

```bash
npx @mediabubble-adv/arabic-skill install --target cursor
```

Installs:

| Path | Role |
|------|------|
| `~/.cursor/skills/arabic/` | Runtime skill pack |
| `~/.cursor/commands/arabic.md` | `/arabic` slash command |
| `~/.cursor/rules/arabic.mdc` | Auto-load on Arabic tasks |

### skills.sh registry

Skill pack only (no command/rule files):

```bash
npx skills add mediabubble-adv/arabic-skill -a cursor -g -y
```

### Manual Fallback

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
cp -r arabic ~/.cursor/skills/arabic
cp .cursor/commands/arabic.md ~/.cursor/commands/
cp .cursor/rules/arabic.mdc ~/.cursor/rules/
```

## Why It Fits Well

Cursor aligns well with a repo-driven skill model because it works well with:

- repo-local rules
- markdown docs
- prompt conventions
- file-based persistence

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Best fit for project-level routing rules |
| Commands | Strong | Command-style prompting works well |
| Subcommands | Strong | Easy to model through docs and command tables |
| Agents / subagents | Partial | Usually simulated unless external tooling is added |
| Hooks / triggers | Partial | Depends on current rules features and workflow setup |
| Local docs loading | Strong | One of the best fits |
| Persistence via `voice.md` | Strong | Repo-local state is natural |

## Recommended Packaging

- repo-level rules
- `docs/` planning set
- runtime markdown in `arabic/`
- explicit `/arabic` command tree

## What To Validate

- exact rule-file layout you want to standardize
- whether separate command docs improve reliability
- how much agent simulation is needed vs tool-native assistance

## Fixes for First-Class Support

- keep `commands.md`, `.cursor/commands/arabic.md`, and `.cursor/rules/arabic.mdc` aligned with `arabic/references/command-router.md`
- standardize how commands map to runtime files
- define how project mode should be invoked inside Cursor
