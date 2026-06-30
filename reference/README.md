# Reference Library

Canonical specialist skills and deep knowledge for **Awesome Arabic Skill** (`arabic`).

## Purpose

- Long-lived research and specialist packs
- Source material for distillation into `arabic/` runtime files
- Not installed directly by end users

## Relationship to Runtime

```
reference/  → what the system knows (canonical)
arabic/       → what the system does at runtime (distilled)
```

See [Reference Distillation Plan](../docs/planning/reference-distillation.md) for what to absorb and when.

## Layout

Each folder is a standalone specialist skill:

```text
reference/
├── arabic-qa/
├── arabic-creator/
├── arabic-content-strategist/
├── arabic-masri/
├── arabic-seo-optimizer/
└── … (38 specialist packs)
```

**Note:** `reference/arabic-content/` is a legacy MENA umbrella pack — distinct from the runtime product `arabic/`.

## Do Not Delete Casually

Reference skills are the distillation source for v1.0+ capabilities. Remove only after content is migrated into runtime or explicitly marked obsolete.
