# Golden Test — validate-frontmatter.sh

Manual checklist for SKILL.md frontmatter gate (`feat/validate-frontmatter-cron`).

## G-FM-01 — Script exists and runs in CI

- [ ] `scripts/validate-frontmatter.sh` exists and is executable
- [ ] `npm run validate` invokes `validate-frontmatter.sh` after `validate-skill.sh`
- [ ] `npm run validate:frontmatter` runs the script standalone
- [ ] `.github/workflows/validate.yml` includes frontmatter step

## G-FM-02 — Required schema

**Command:** `bash scripts/validate-frontmatter.sh`

**Expected (current `arabic/SKILL.md`):**

| Key | Rule |
|-----|------|
| `name` | Exactly `arabic` (no `-skill` suffix) |
| `display_name` | Non-empty string |
| `version` | Semver `x.y.z` |
| `description` | Non-empty block (discovery metadata) |

Exit 0 on valid file.

## G-FM-03 — Failure smoke (local only)

Temporarily break `name:` in a scratch branch → script exits 1 with `name must be arabic`.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `docs/planning/roadmap.md` marks frontmatter gate as shipped
