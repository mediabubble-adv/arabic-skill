# Golden Test — G1–G12 agent harness (v1.2.6+)

Interactive scenario manifest + opt-in LLM runner. Schema gate runs in CI; `--run` is local/maintainer only.

## Validation

- [ ] `npm run validate` exits 0
- [ ] `npm run validate:golden-scenarios` exits 0

## AH-01 — Scenario manifest + schema gate

- [x] `tests/golden/scenarios/g1-g12-scenarios.json` lists G1–G12 with `command`, prompts, `pass_signals`
- [x] `scripts/validate-golden-scenarios.sh` exits 0 (manifest command parity)
- [x] `npm run validate:golden-scenarios` wired into `npm run validate` + CI

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
npm run golden:harness -- --run --report auto
```

Uses `GOLDEN_HARNESS_MODEL` (default `gpt-4o-mini`) and loads `arabic/SKILL.md` + manifest `required_files` as system context.

**Using Gemini instead of OpenAI:** the harness talks to `{OPENAI_BASE_URL}/chat/completions`, and Gemini exposes an OpenAI-compatible endpoint at the same shape — no code changes needed, just point the base URL and key at Gemini:

```bash
export OPENAI_API_KEY=<your-gemini-key>
export OPENAI_BASE_URL="https://generativelanguage.googleapis.com/v1beta/openai/"
export GOLDEN_HARNESS_MODEL="gemini-3.5-flash"
npm run golden:harness -- --run --id G1
```

Note: the OpenAI compatibility layer covers the standard chat-completions shape (system/user messages, `choices[0].message.content`), which is all this harness uses — but it doesn't expose Gemini-native-only features.

## AH-03 — Signal checks (automated after LLM response)

| ID | Key signals |
|----|-------------|
| G1, G7 | Presets `advisory_clarify` + `no_msa_corporate` |
| G8, G12 | Presets `masri_output` + `no_msa_corporate` |
| G9 | Preset `audit_scored` (`regex_match_any` for scored audit) |
| G10 | Presets `plan_workspace` + `plan_approval_gate` |
| G11 | Preset `project_evidence` |

Shared presets: `tests/golden/scenarios/signal-presets.json`

## AH-04 — Out of scope

Full CI LLM runs on every PR (cost, flake, API secrets). Use routing gate + scenario schema in CI; run harness locally or via nightly workflow before releases.

## AH-05 — Signal presets + reports (v1.2.7)

- [ ] `tests/golden/scenarios/signal-presets.json` — reusable `pass_signals` bundles
- [ ] Harness supports `regex_match_any` and `--report` / `--report auto`
- [ ] Reports land in `tests/golden/reports/` (gitignored JSON; `.gitkeep` only)

## AH-06 — Nightly workflow (v1.2.7)

- [ ] `.github/workflows/golden-harness-nightly.yml` — weekly + `workflow_dispatch`
- [ ] Runs only when `OPENAI_API_KEY` repository secret is set
- [ ] Uploads JSON report artifact
