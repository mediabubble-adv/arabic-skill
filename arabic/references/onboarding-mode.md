# Onboarding Mode — first-run & `/arabic init`

Load when the user just installed the skill, runs bare `/arabic`, `/arabic guide` on a fresh workspace, or `/arabic init`.

> **Two audiences:** (A) global skill install — no repo scaffold needed; (B) client project — `.arabic/` workspace for briefs, plans, and voice.

**Load discipline:** `onboarding` task class in `references/load-discipline.md` — max 4 files.

---

## 1. Detect path

| Signal | Path | Primary command |
|--------|------|-----------------|
| User says "just installed", "first time", "how do I start" | **A — Tool** | `/arabic guide` |
| User runs `/arabic init` or asks to set up a project | **B — Project** | `/arabic init` |
| Workspace has no `.arabic/` and task needs `--brief` or `plan` | **B — Project** | Offer `/arabic init` before continuing |
| `.arabic/` already exists | **Resume** | Show config summary; skip scaffold |

---

## 2. Path A — Tool install (global)

**Goal:** Confirm the skill works; no files required.

1. **Welcome (Masri L2, one paragraph)** — advisor, not translator; Masri-first, pan-Arab capable.
2. **Copy-ready next steps:**

```text
/arabic guide                    ← vague idea → clarify → recommend
/arabic write caption --dialect masri --count 3   ← quick win
/arabic voice save               ← after you have brand axes
```

3. **Point to docs:** https://arabic-skill.vercel.app/install · `docs/supported/` for non-Cursor tools.
4. **Do not** create `.arabic/` unless the user asks for project persistence.

---

## 3. Path B — `/arabic init` (project scaffold)

**Template source (skill pack):** `arabic/templates/.arabic/` — copy into workspace root as `.arabic/`.

### 3.1 Create tree

```text
.arabic/
├── config.yaml          ← from template; customize dialect/market
├── briefs/
│   └── example.yaml     ← starter brief (safe to delete)
├── projects/            ← empty; plan mode writes here
└── README.md            ← optional one-liner for the team
```

**Do not create on init:** `voice.md` (first `/arabic voice save`), `last-run.json` (first `/arabic auto`), `audits/` (first audit snapshot).

### 3.2 Init steps (agent)

1. If `.arabic/` exists → list contents; ask **skip** or **refresh config only**.
2. Copy template files from `arabic/templates/.arabic/` (preserve relative paths).
3. Ask **at most 2 questions** if `config.yaml` still has defaults:
   - Primary dialect / country?
   - Brand or product name (optional)?
4. Write updated `config.yaml`.
5. Output **copy-ready next steps** (see §4).

### 3.3 `config.yaml` schema

| Key | Required | Example |
|-----|----------|---------|
| `dialect` | yes | `masri` |
| `market` | yes | `egypt` |
| `brand_name` | no | `""` |
| `register` | no | `L2-L3` |

Briefs and plans may override `dialect` via `--dialect` or YAML fields.

---

## 4. Post-init next steps (copy-ready)

```text
/arabic brief                         ← NL or guided → .arabic/briefs/*.yaml
/arabic write caption --brief .arabic/briefs/example.yaml
/arabic plan website --lang-order ar_en
/arabic audit --file path/to/draft.md  ← saves .arabic/audits/… then offer improve
/arabic improve --from-audit .arabic/audits/…md
/arabic voice save
```

---

## 5. Installer ↔ agent handoff

After `npx @mediabubble-adv/arabic-skill install`, the CLI prints the same three steps as Path A. In a **client repo**, run `/arabic init` before `--brief` or `plan` workflows.

---

## Related

- `references/command-router.md` §6 — scaffold tree
- `references/advisory-mode.md` — Path A guide behavior
- `docs/planning/command-surface.md` §7.4 — workspace spec
