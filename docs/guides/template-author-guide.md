# Template Author Guide

**Phase 9B-3 (planning)** — Create reusable brand voice and domain packs for Arabic content workflows.

Use this guide when you need a **repeatable voice** beyond one-off prompts — for Slack, webhooks, or local `/arabic` runs.

Companion: [webhooks-setup.md](./webhooks-setup.md) (`template.create`, `template.publish` events).

## What counts as a template

A template is a portable bundle that locks:

1. **Dialect** — masri, khaliji, levantine, msa, …
2. **Tone / brand voice** — vocabulary, taboos, CTA style
3. **Domain context** — healthcare, fintech, legal terms
4. **Optional reference slices** — loaded per task class (not the full monolith)

Templates complement the core runtime pack in `arabic/` — they do not replace `SKILL.md`.

## Ship today (portable pack)

Before the marketplace API ships, authors can use the **existing runtime surfaces**:

### Brand voice → `voice.md`

```text
/arabic voice save
```

Persists project voice to `voice.md` (git-friendly). Reload on each session; re-upload for ChatGPT Projects.

### Structured briefs → `.arabic/briefs/*.yaml`

```text
/arabic brief
```

Builds YAML briefs from natural language or guided pickers. Reference in writes:

```text
/arabic write caption --brief .arabic/briefs/ramadan.yaml --dialect masri
```

Schema and examples: `arabic/templates/.arabic/briefs/example.yaml`.

### Domain + dialect references

Copy only the slices you need from `arabic/dialects/` and `arabic/references/` into your repo or template folder. Follow load discipline in `arabic/references/load-discipline.md` — do not paste the entire reference tree into every run.

## Planned template layout (9B-3)

Future first-class templates will use a folder per template:

```
templates/my-company-brand/
├── meta.json              # id, version, dialect, tags, license
├── dialect.md             # Dialect rules (vocabulary, grammar flags)
├── tone.md                # Brand voice guide
├── domain.md              # Terminology + context
├── test-cases.json        # Validation examples (input → expected style)
└── references/            # Optional extra knowledge files
    ├── brand-guide.md
    └── approved-terms.txt
```

### `meta.json` (minimum)

```json
{
  "id": "my-company-brand",
  "name": "My Company Brand",
  "description": "Khaliji marketing voice for B2B SaaS",
  "version": "1.0.0",
  "author": "Your Name",
  "dialect": "khaliji",
  "domains": ["marketing", "saas"],
  "tags": ["brand", "b2b"],
  "license": "CC-BY-4.0",
  "is_public": false
}
```

### `test-cases.json`

Pin expected style so audits catch drift:

```json
[
  {
    "input": "Sign up for a free trial today",
    "must_include": ["سجّل", "مجان"],
    "must_not_include": ["اشترك الآن مجاناً"],
    "dialect": "khaliji"
  }
]
```

Run validation with `/arabic audit` on generated outputs against these cases.

## Authoring workflow

1. **Pick dialect + domain** — one primary dialect per template; add domain file for terminology.
2. **Write `tone.md`** — 1–2 pages max: voice adjectives, banned phrases, CTA patterns, emoji policy.
3. **Add `dialect.md`** — vocabulary swaps and grammar notes (see `docs/planning/9b3-custom-templates.md` for examples).
4. **Create 5–10 test cases** — short EN or AR prompts with expected characteristics (not verbatim locks unless legal).
5. **Brief or voice** — export stable settings to `.arabic/briefs/` or `voice.md` for day-to-day use.
6. **Version** — bump `meta.json` `version` on breaking tone changes.

## Publishing (future)

When the templates API is live:

- `template.create` webhook — register metadata + file bundle (see [webhooks-setup.md](./webhooks-setup.md))
- `template.publish` — promote a version to `private`, `community`, or `marketplace`
- Gallery UI — planned at `/templates` (see `docs/planning/9b3-custom-templates.md`)

Until then, share templates as a **git repo** or internal monorepo folder and point teammates to `install --dir` or project-local `arabic/` overrides.

## Template types

| Type | Use when |
|------|----------|
| Company brand | One tone across ads, email, social |
| Dialect + domain | e.g. Khaliji + healthcare terminology |
| Workflow | Pre-chain: brief → write → audit (document in `domain.md`) |
| Reference pack | Extra knowledge only (SEO, compliance) |

## Quality checklist

- [ ] Dialect file names one primary dialect (no mixed masri/msa without rules)
- [ ] Tone doc fits in context budget (~2–4k tokens for template slice)
- [ ] Test cases cover CTA, headline, and body copy
- [ ] Taboos aligned with `arabic/references/taboos.md` for target market
- [ ] Brief YAML or `voice.md` generated for non-technical users
- [ ] `/arabic audit` run on 3 sample outputs before team rollout

## Related

- [slack-commands.md](./slack-commands.md) — `/arabic write`, `audit`, `voice` in Slack
- [slack-bot-setup.md](./slack-bot-setup.md) — install bot for team usage
- [github-actions-integration.md](./github-actions-integration.md) — CI validation of template outputs
