# Cursor — `/arabic` Command Reference

> Copy-paste examples for the `/arabic` command surface in Cursor. Full spec: [command-surface.md](../../planning/command-surface.md). The adapter now ships with the runtime `command-router.md` and Cursor command/rule files (see [implementation-plan §0](../../planning/implementation-plan.md#0-canonical-phase-map--golden-tests-source-of-truth)).

Natural language always works; commands are the **fast path**.

---

## Setup files

| File | Purpose |
|------|---------|
| `.cursor/commands/arabic.md` | Root `/arabic` slash command |
| `.cursor/rules/arabic.mdc` | Auto-load skill on `/arabic` or Arabic-writing tasks |

Invoke the skill in chat or through Cursor slash commands; the examples below remain valid either way.

---

## Verbs

```bash
# Advisory (default) — guides before writing
/arabic
/arabic guide
> I need captions for a fitness app in Cairo

# Pro write — structured deliverable
/arabic write caption --dialect masri --platform instagram --count 12
/arabic write meta --dialect masri --brief .arabic/briefs/fitness-launch.yaml
/arabic write landing --dialect khaliji --out content/landing.ar.md

# Audit existing Arabic copy
/arabic audit
> [paste Arabic text]
/arabic audit --file content/landing.ar.md

# Prompt coach
/arabic coach
> اكتبلي بوست

# Plan (multi-piece projects)
/arabic plan campaign --dialect masri
/arabic plan website --brief .arabic/briefs/site.yaml
/arabic plan book --dialect masri

# Workspace automation
/arabic auto
/arabic auto explain            # scan repo → Arabic product explanation
/arabic auto campaign ramadan ecommerce --yes

# Project-aware Arabic from this repo
/arabic write readme --dialect masri
/arabic write tutorial --dialect masri

# Voice memory
/arabic voice save
/arabic voice load
/arabic voice show

# Research + setup + help
/arabic research tiktok-hooks-2026
/arabic init
/arabic help write
```

---

## Flags

| Flag | Example |
|------|---------|
| `--dialect` | `--dialect masri` |
| `--platform` | `--platform meta` |
| `--brief` | `--brief .arabic/briefs/x.yaml` |
| `--file` | `--file content/page.ar.md` |
| `--out` | `--out content/landing.ar.md` |
| `--yes` | `--yes` (skip auto-confirmation) |
| `--count` | `--count 12` |

Full flag semantics: [command-surface.md §2a](../../planning/command-surface.md#2a-flag-reference).

---

## Notes

- Unknown subcommand → the skill suggests the nearest match (see [command-surface.md §13b](../../planning/command-surface.md#13b-error-handling)).
- `auto`/`explain` never read secrets — `.env*`, lockfiles, and build output are excluded.

## Related

- [Cursor adapter overview](./README.md)
- [Command Surface](../../planning/command-surface.md)
