# Golden Test — G1–G12 agent harness (v1.2.6)

Interactive scenario manifest + opt-in LLM runner. Schema gate runs in CI; `--run` is local/maintainer only.

## AH-01 — Scenario manifest + schema gate

- [ ] `tests/golden/scenarios/g1-g12-scenarios.json` lists G1–G12 with `command`, prompts, `pass_signals`
- [ ] `scripts/validate-golden-scenarios.sh` exits 0 (manifest command parity)
- [ ] `npm run validate:golden-scenarios` wired into `npm run validate` + CI

## AH-02 — Harness CLI (opt-in LLM)

**List:**

```bash
npm run golden:harness -- --list
```

**Dry run:**

```bash
npm run golden:harness -- --run --dry-run
npm run golden:harness -- --run --dry-run --id G9
```

**Live run (maintainer — requires API key):**

```bash
export OPENAI_API_KEY=...
npm run golden:harness -- --run --id G1
```

Uses `GOLDEN_HARNESS_MODEL` (default `gpt-4o-mini`) and loads `arabic/SKILL.md` + manifest `required_files` as system context.

## AH-03 — Signal checks (automated after LLM response)

| ID | Key signals |
|----|-------------|
| G1, G7 | Clarifying questions before long copy; no corporate MSA filler |
| G8, G12 | Masri output; G12 rejects formal MSA phrases |
| G9 | Scored audit structure (uses `fixtures/g9-audit-sample.txt`) |
| G10 | Mentions `.arabic/projects` plan path |
| G11 | Cites repo evidence; no secret patterns |

## AH-04 — Out of scope

Full CI LLM runs (cost, flake, API secrets). Use routing gate + scenario schema in CI; run harness locally before releases.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `npm run validate:golden-scenarios` exits 0
