# Continue Support Profile

## Current Fit

`Partial`

## Important Note

Continue was acquired by Cursor, but its open-source docs and model of local configuration still make it a useful compatibility target.

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Best through config and repo docs |
| Commands | Partial | Better as conventions than native slash commands |
| Subcommands | Partial | Better documented than assumed |
| Agents / subagents | Limited | Usually simulated |
| Hooks / triggers | Limited | Needs explicit validation |
| Local docs loading | Strong | Strong fit for markdown context |
| Persistence via `voice.md` | Partial | File-based persistence should work |

## v1.1 Command Map

| Task | Native command | Prompt fallback |
|---|---|---|
| Plan | none | "arabic plan &lt;project&gt;" per [project-mode.md](../../../arabic/references/project-mode.md) |
| Audit | none | "arabic audit" per [audit-mode.md](../../../arabic/references/audit-mode.md) |
| Audit RTL | none | "arabic audit rtl" |
| Audit (capped scan) | none | "arabic audit --dir &lt;path&gt;" |

## Persistence

`.arabic/voice.md` and `.arabic/projects/{slug}/plan.md` — repo-local files, work identically across all three tools since none has a native memory API this skill can hook into.

## Recommended Packaging

- local config plus repo docs
- documented command tree
- simulated advisory and QA behavior

## What To Validate

- current viability of the exact Continue surface you want to support
- how much config-driven workflow it still exposes post-acquisition

## Fixes for First-Class Support

- treat Continue support as compatibility mode
- avoid depending on advanced native agent features
