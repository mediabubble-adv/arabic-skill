---
name: dialect-freshness-audit
version: 2026-07-04
purpose: Slang and register drift audit for a dialect module
output: research/distillation-queue.md + optional knowledge-base/dialects/
---

# Dialect freshness audit

## Inputs

- `dialect`: masri | khaliji | levantine | maghrebi | msa | …
- `reference_pack`: `reference/arabic-{dialect}/` (if exists)
- `runtime_target`: `arabic/dialects/{dialect}.md`
- `web_access`: yes | no

## Task

Audit `arabic/dialects/{dialect}.md` for:

- Slang drift and outdated vocabulary
- Register level gaps (L1–L5)
- False friends and MSA bleed in commercial copy
- Taboo or cultural sensitivity updates

Using `reference/arabic-{dialect}/` plus Tier **A/B** web sources only.

## Output

1. Optional brief note in `research/knowledge-base/dialects/{dialect}-audit-YYYY-MM.md` (frontmatter required)
2. Queue items in `distillation-queue.md` with trust tier and source IDs
3. Update `research/index.json` if a KB file was created

## Guardrails

- Tier **C** slang → `deferred` or human-review flag — never direct runtime merge
- Masri-first product: prioritize Egyptian commercial/register gaps when `dialect: masri`
- Max 30 lines of proposed runtime diff per queue item
