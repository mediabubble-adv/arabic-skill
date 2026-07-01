# Codex Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Strong`

## Install

### Preferred (npx)

```bash
npx @mediabubble-adv/arabic-skill install --target codex
```

### Manual Fallback

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
cp -r arabic ~/.codex/skills/arabic
```

## Why It Fits Well

Codex's skills directory (`~/.codex/skills/`) accepts the same portable Markdown
runtime pack as Claude and Cursor — no adapter layer needed for core content generation.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | `SKILL.md` frontmatter + body loads directly |
| Commands | Partial | No native `/arabic` slash command; use prompt convention from [command-router.md](../../../arabic/references/command-router.md) |
| Subcommands | Partial | Prompt-conventional, not native |
| Agents / subagents | Unknown | Not yet validated in this environment |
| Hooks / triggers | Unknown | Not yet validated |
| Local docs loading | Strong | Skills-folder pattern loads all runtime Markdown |
| Persistence via `voice.md` | Strong | Repo-local file works via skills folder |

## What To Validate

- Whether Codex supports any native command routing beyond the skills-folder load
- Whether subagents/hooks exist in the current Codex CLI/IDE surface

## Fixes for First-Class Support

- Confirm `~/.codex/skills/` is the correct install path across Codex CLI versions (validate before marking `Strong` with confidence — currently inferred from `targetRoots`, not hands-on tested)
