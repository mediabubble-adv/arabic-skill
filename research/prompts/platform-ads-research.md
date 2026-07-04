---
name: platform-ads-research
version: 2026-07-04
purpose: Official ad-format and policy research per platform
output: research/knowledge-base/platforms/{platform}.md
---

# Platform ads research

## Inputs

- `platform`: Meta | Google | TikTok | Snap | LinkedIn | YouTube | WhatsApp
- `market`: e.g. Egypt, GCC, pan-Arab (default: Egypt / Masri-first notes)
- `web_access`: yes | no

## Task

Research **official** `{platform}` ad formats, character limits, CTA rules, placement specs, and Arabic-market notes relevant to paid social/search.

1. Collect from official help centers first (Meta Business, Google Ads Help, TikTok for Business, etc.)
2. Register each URL in `research/sources/sources.yaml` with `trust_tier`, `accessed`, `runtime_eligible`
3. Write curated summary to `research/knowledge-base/platforms/{platform}.md` using KB frontmatter (§7a in research-intelligence-plan.md)
4. Propose distill targets in `arabic/references/ads-service-matrix.md` as queue items

## Output

- Updated `sources.yaml` entries
- New or updated `knowledge-base/platforms/{platform}.md`
- 1–3 rows in `distillation-queue.md` if runtime changes are needed

## Guardrails

- **No live API claims** — research informs preloaded runtime knowledge only
- If `web_access: no`, mark findings `needs_live_verification` — do not promote to runtime rules
- Tier A/B only for direct runtime rules; Tier C → human-review flag
