# Claude Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Strong`

## Install

### Preferred (npx)

```bash
npx @mediabubble-adv/arabic-skill install --target claude
```

### Manual Fallback

```bash
git clone https://github.com/mediabubble-adv/arabic-skill.git
cd arabic-skill
cp -r arabic ~/.claude/skills/arabic
```

## Why It Fits Well

Claude-style environments map well to the current skill architecture because they typically support:

- strong system instructions
- large markdown reference packs
- explicit workflow prompting
- simulated or native subagent orchestration depending environment

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Strong | Good fit for master router behavior |
| Commands | Strong | `/arabic` style commands map cleanly |
| Subcommands | Strong | Best handled through documented command tree |
| Agents / subagents | Strong | Native in some surfaces, simulated in others |
| Hooks / triggers | Partial | Often prompt-driven rather than fully event-driven |
| Local docs loading | Strong | Good fit for markdown knowledge packs |
| Persistence via `voice.md` | Strong | Repo-local file works well |

## Recommended Packaging

- master runtime in `SKILL.md`
- supporting knowledge in markdown
- command router block
- explicit QA loop

## What To Validate

- how the active Claude surface handles project-local docs
- whether subagents are native or must be simulated in the target environment
- whether slash-command behavior should be real or prompt-conventional

## Fixes for First-Class Support

- keep the command tree explicit
- keep the advisory-first flow in the top-level instructions
- make brand-voice persistence file-driven, not memory-dependent
