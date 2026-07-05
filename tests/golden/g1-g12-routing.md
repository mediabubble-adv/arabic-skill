# Golden Tests G1–G12 — Behavioral routing contracts (v1.2.5)

Routing-contract gate for the behavioral golden harness. Full LLM scenario runs stay manual until agent harness ships.

## BH-01 — Manifest + gate script

- [ ] `tests/golden/g1-g12-manifest.json` lists G1–G12 with `command`, `required_files`, `markers`
- [ ] `scripts/validate-behavioral-golden.sh` exits 0
- [ ] `npm run validate:behavioral-golden` runs the gate
- [ ] `.github/workflows/validate.yml` includes behavioral golden step

## BH-02 — Per-test contract (automated)

**Command:** `bash scripts/validate-behavioral-golden.sh`

| ID | Command | Contract |
|----|---------|----------|
| G1 | `/arabic guide` | advisory-mode + intake + router markers |
| G2 | `/arabic write meta` | ads matrix + meta route |
| G3 | `/arabic coach` | prompt-engineering + coach route |
| G4 | `/arabic plan website` | project-mode + plan route |
| G5 | `/arabic plan campaign` | ads matrix + campaign markers |
| G6 | `/arabic plan book` | project-mode + book-writing |
| G7 | `/arabic` | bare command → advisory |
| G8 | `/arabic write caption` | captions engine route |
| G9 | `/arabic audit` | audit-mode |
| G10 | `/arabic plan website` | `.arabic/projects/` persistence |
| G11 | `/arabic auto explain` | project-context-scanner + dev-tech |
| G12 | `/arabic write caption --dialect masri` | masri dialect + MSA purity rule |

## BH-03 — Out of scope (manual / future LLM harness)

Interactive pass criteria (guides before write, scored audit output, dialect bleed detection on generated text) require agent/LLM runner — not this gate.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `npm run validate:behavioral-golden` exits 0
