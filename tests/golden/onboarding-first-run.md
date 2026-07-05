# Golden Test — Onboarding (first-run)

Manual checklist for onboarding (`feat/onboarding-first-run`).

## G-ONB-01 — Runtime onboarding reference

- [ ] `arabic/references/onboarding-mode.md` exists
- [ ] Listed in `arabic/references/INDEX.md`
- [ ] `load-discipline.md` defines `onboarding` task class
- [ ] `SKILL.md` mode router includes Onboarding / `/arabic init`

## G-ONB-02 — Scaffold templates

- [ ] `arabic/templates/.arabic/config.yaml` exists
- [ ] `arabic/templates/.arabic/briefs/example.yaml` exists
- [ ] `scripts/validate-onboarding.sh` passes

## G-ONB-03 — Path A (tool install)

**Context:** User says "I just installed the skill."

**Expected:** Loads onboarding-mode Path A; recommends `/arabic guide` and a quick write; does **not** create `.arabic/` unless asked.

## G-ONB-04 — Path B (`/arabic init`)

**Command:** `/arabic init` in an empty client repo.

**Expected:** Creates `.arabic/` from templates; `config.yaml` + `briefs/example.yaml` + `projects/`; suggests `/arabic write … --brief .arabic/briefs/example.yaml`.

## G-ONB-05 — Installer post-message

**Command:** `node bin/arabic-skill.js install --target cursor --dry-run` (inspect output) then real install.

**Expected:** After install, CLI prints `/arabic guide`, `/arabic init`, and install docs URL.

## Validation

- [ ] `npm run validate` exits 0
