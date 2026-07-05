# Golden Test — validate-golden.sh

Manual checklist for the automated golden fixture gate (`feat/golden-runner`).

## G-GOLDEN-01 — Script exists and runs in CI

- [ ] `scripts/validate-golden.sh` exists and is executable
- [ ] `npm run validate:golden` exits 0
- [ ] `npm run validate` invokes `validate-golden.sh`
- [ ] `.github/workflows/validate.yml` includes golden runner step

## G-GOLDEN-02 — Fixture structure

**Command:** `bash scripts/validate-golden.sh`

**Expected:**

| Title | Each fixture under `tests/golden/` has `# Golden Test` or `# Golden Tests` heading |
|-------|-------------------------------------------------------------------------------------|
| Validation | Each fixture has `## Validation` section |
| Checklist | Each fixture has at least one `- [ ]` or `- [x]` item |
| Paths | Backtick repo paths resolve on disk |
| IDs | Section ids (`## G-*`, `## G13`, `## RQ-*`) are unique across fixtures |

## G-GOLDEN-03 — Lightweight smoke (no LLM)

- [ ] Eight App Router pages exist under `website/app/`
- [ ] `website/README.md` documents a `https://` preview URL
- [ ] Referenced `scripts/validate-frontmatter.sh` paths in fixtures exist

## G-GOLDEN-04 — Out of scope (manual / future)

Behavioral golden tests (G1–G12 advisory flows) use routing-contract gate `validate-behavioral-golden.sh`; full LLM scenario runs stay manual until agent harness ships. G15–G16 UX/content smoke is covered by `validate-website-playwright.sh`.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `docs/planning/roadmap.md` marks automated golden runner as shipped
