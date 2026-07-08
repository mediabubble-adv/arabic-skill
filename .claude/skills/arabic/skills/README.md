# Arabic Skills

Specialized workflows for Arabic content — loaded by `/arabic` subcommands.

---

## Available Skills

### `brief.md` — `/arabic brief`

Build `.arabic/briefs/*.yaml` from **natural language** or **one-at-a-time A/B/C questions**, then save and print a ready `--brief` command.

**What it does:**
1. Path picker: NL · guided · from file/URL
2. Draft YAML preview → confirm
3. Write `.arabic/briefs/{slug}.yaml`
4. Offer copy-ready `/arabic write … --brief …` or `plan …`

**Usage:**
```bash
/arabic brief
/arabic brief save
/arabic brief from عايز ١٢ كابشن إنستغرام لمطعم في القاهرة
/arabic brief from --file notes.md --name restaurant-ig
/arabic brief show
```

**Flags:** `--name` · `--out` · `--dialect` · `--goal` · `--yes` · `--file`

**When to use:** Before Pro Mode writes/plans when you do not want to hand-edit YAML  

**Related:** `/arabic init` (scaffold) · `/arabic voice save` (brand voice, not job brief)

---

### `improve.md` — `/arabic improve`

Full rewrite guided by a **one-question-at-a-time A/B/C picker** (easy in Cursor/Claude). Old content is **reference only**. Each answer locks a different rewrite branch. Use `--from-audit` to seed from a saved QA report.

**What it does:**
1. Ask **one** lettered question per turn (wait for `A`/`B`/`C`) — or seed from audit and skip job/diagnosis
2. After each answer, name the branch lock
3. Build a Branch Card → confirm → generate **new** prose (not a patch)
4. Prove divergence with before/after samples

**Usage:**
```bash
/arabic improve <content-link|file.md|website>
/arabic improve ./blog/article.md --format rewrite
/arabic improve --from-audit .arabic/audits/home-2026-07-08.md
/arabic improve website --voice .arabic/voice.md --lang-order ar_en
```

**Flags:** `--voice` · `--dialect` · `--format` · `--dry-run` · `--file` / `--out` · `--yes` · `--from-audit` · `--lang-order` · `--lang`

**When to use:** Fresh take on existing copy with guided choices; post-audit rewrite  

**Not for:** Surgical QA → `/arabic audit` · Greenfield → `/arabic write`

---

## How Skills Work in This Project

1. **Loading:** Parent command loads the skill (`/arabic improve` → `skills/improve.md`)
2. **Integration:** dialects, domains, humanization, taboos, voice.md
3. **Escalation:** Can reference other commands; must not collapse into audit-style patches

---

## Adding a New Skill

```yaml
---
name: skill-name
display_name: Human Readable Name
version: "1.0.0"
description: One-line description and triggers
---
```

Register in `references/command-router.md`.

---

## Related

- `../SKILL.md` · `../voice.md` · `../references/command-router.md`
