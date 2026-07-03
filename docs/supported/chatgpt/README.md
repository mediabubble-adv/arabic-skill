# ChatGPT Support Profile

**Skill:** Awesome Arabic Skill (`arabic`)

## Current Fit

`Partial`

## Install

No CLI installer target exists for ChatGPT (`bin/arabic-skill.js` does not list it). Use one of:

- **Custom GPT instructions:** paste `arabic/SKILL.md` body into the Custom GPT system prompt field; upload `arabic/references/*.md` and `arabic/dialects/*.md` as Knowledge files (subject to ChatGPT's per-file and total upload limits).
- **Project instructions (ChatGPT Projects):** paste `SKILL.md` into project instructions; upload reference files as project files.
- **Per-conversation:** paste `SKILL.md` at the start of a chat; large reference packs will not fit reliably in context this way — prefer Custom GPT or Projects for real use.

## Why It's Partial, Not Strong

ChatGPT has no local filesystem, no skills folder, and no native subcommand routing.
The advisory-first operating model and dialect/domain packs work as a system prompt +
uploaded knowledge, but:

- no persistent `voice.md` across sessions without the user re-uploading it
- no `/arabic` command surface — prompt convention only
- file upload/knowledge limits may force trimming which reference packs are included

## Expected Support

| Capability | Status | Notes |
|---|---|---|
| Rules / instructions | Partial | Works via Custom GPT / Project instructions field |
| Commands | Limited | Prompt convention only, no native routing |
| Subcommands | Limited | Prompt convention only |
| Agents / subagents | Limited | No native subagent model |
| Hooks / triggers | Limited | None |
| Local docs loading | Partial | Knowledge/file upload, subject to size limits |
| Persistence via `voice.md` | Limited | Requires manual re-upload per session/project |

## Recommended Packaging

- `SKILL.md` body as Custom GPT / Project system instructions
- reference/dialect packs as uploaded Knowledge files (trim to fit upload limits)
- prompt-conventional command routing — no native command surface
- re-paste or re-upload `voice.md` at the start of each session/project until persistence improves

## Fixes for First-Class Support

- None available without a ChatGPT-side mechanism (Actions/plugins) — out of scope until ChatGPT exposes a skills-equivalent API
