# Collaboration Rules

## Who This Repo Serves

Contributors building the **Awesome Arabic Skill** — runtime skill, reference distillation, tool adapters, and docs.

---

## Contribution Principles

1. **Behavior before content** — do not add domain files before advisory core ships
2. **Reference is canonical** — distill into runtime; do not duplicate wholesale
3. **One product version** — use root `VERSION`; no plan-version labels in new docs
4. **Links must work** — run `scripts/validate-docs.sh` before PR
5. **Masri-first** — default depth target; pan-Arab breadth via dialect packs

---

## Pull Request Requirements

Every PR must include:

- [ ] Clear summary of what changed and why
- [ ] Link to related roadmap phase if applicable
- [ ] CI green (`validate` workflow)
- [ ] Updated `CHANGELOG.md` under `[Unreleased]` for user-visible changes
- [ ] Updated `INDEX.md` if runtime file count or routing changed

### PR Title Format

```
type(scope): short description
```

Types: `feat`, `fix`, `docs`, `chore`, `refactor`, `test`

Examples:

- `feat(skill): add advisory-mode reference`
- `docs(supported): expand cursor adapter`
- `fix(validate): correct broken link in prd`

---

## File Ownership

| Path | Owner focus | Review bar |
|------|-------------|------------|
| `arabic/SKILL.md` | Product behavior | High — affects all users |
| `arabic/references/` | Runtime knowledge | Medium — check INDEX sync |
| `arabic/dialects/` | Linguistic accuracy | High — native review preferred |
| `docs/product/` | Product intent | Medium |
| `docs/planning/` | Execution sequence | Medium |
| `reference/` | Canonical depth | Low churn — distillation only |
| `website/` | Public install UX (deferred — post-v1 test project) | — |
| `scripts/`, `.github/` | Engineering | Standard |

---

## Decision Authority

| Decision | Where it lives |
|----------|----------------|
| Product direction | `docs/product/prd.md` |
| What to build next | `docs/planning/roadmap.md` |
| How to structure files | `docs/product/content-structure.md` |
| Source-of-truth conflicts | `docs/product/context-and-sources.md` |
| Release timing | Maintainer + roadmap milestones |

When PRD and runtime disagree, **update runtime to match PRD** — or amend PRD first in a separate PR.

---

## Communication

- Use GitHub Issues for bugs and feature requests
- Use GitHub Discussions for product questions (optional)
- Tag releases in CHANGELOG — do not edit old release sections

---

## AI-Assisted Contributions

When using AI to edit skill files:

- Run golden acceptance scenarios mentally against changes
- Do not inflate SKILL.md beyond token-efficient routing
- Preserve 70/30 intake rule and contradiction protocol
- Note in PR if content was AI-generated and human-reviewed

---

## Related Documents

- [Branching Strategy](./branching-strategy.md)
- [Versioning and Releases](./versioning-and-releases.md)
- [CI Pipeline](./ci-pipeline.md)
