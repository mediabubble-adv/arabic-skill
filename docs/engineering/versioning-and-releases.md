# Versioning and Releases

## Product Version

The canonical product version lives in the repository root:

```text
VERSION          → 1.0.0 (first public release)
CHANGELOG.md     → human-readable history
arabic/SKILL.md → version field in YAML frontmatter (must match VERSION)
```

**Rule:** `SKILL.md` `version` must equal root `VERSION` on every tagged release. CI enforces this.

---

## Version Phases

| Phase | Version range | Meaning |
|-------|---------------|---------|
| **Development** | `0.1.x` | Architecture, docs, validation — **not** the public product launch |
| **First public release** | **`1.0.0`** | All [PRD success criteria](../product/prd.md#12-success-criteria) met + [implementation plan](../planning/implementation-plan.md) Phases **P1–P6** complete |
| **Distribution** | `1.1.0` | Website, `npx skills add`, enhanced install UX |
| **Breaking changes** | `2.0.0` | Removed modes, restructured routing, incompatible `voice.md` |

**Important:** `v1.0.0` is the first public release. Current state is **`1.0.0`**.

---

## Semantic Versioning (post-0.x)

| Bump | When | Example |
|------|------|---------|
| **MAJOR** | Breaking skill behavior, removed modes, restructured routing | 2.0.0 |
| **MINOR** | New modes, engines, domains, non-breaking features | 1.1.0 |
| **PATCH** | Fixes, typo, taboo update, example additions | 1.0.1 |

During `0.x`, increments are **development markers** only. Optional `v0.1.0` tag for contributors; no "production" announcement.

---

## v1.0.0 Release Gate

Ship **v1.0.0** only when **all** of the following are true:

1. PRD §12 success criteria (11 items) — verified
2. Implementation plan Phases **P1–P6** — delivered in runtime
3. Golden tests **G1–G12 pass** (G13–G18 gate v1.1.0) — see [implementation-plan §0.3](../planning/implementation-plan.md#03-golden-test-master-table-g1g18)
4. `scripts/validate-skill.sh` — passes with no blocking errors
5. Install instructions in README — tested on at least Cursor + Claude paths

See [Skill Craft Research](../analysis/skill-craft-and-release-research.md) for quality bar rationale.

---

## Release Tags

Format: `v{MAJOR}.{MINOR}.{PATCH}`

Examples:

- `v0.1.0` — development baseline (optional)
- **`v1.0.0`** — **first public release** (plan complete)
- `v1.1.0` — distribution layer (website, skills.sh)
- `v2.0.0` — breaking changes

**Never** use plan-version labels (v4, v5.2) in tags or docs. Product semver only.

---

## Release Process

### Pre-1.0 (daily development)

1. Work on `main` or feature branches per [branching strategy](./branching-strategy.md)
2. Update `[Unreleased]` in `CHANGELOG.md`
3. CI must pass on PR merge
4. **No requirement** to tag every merge

### Public release (v1.0.0+)

1. Confirm v1.0.0 gate checklist (above)
2. Update `VERSION` and `CHANGELOG.md` (move `[Unreleased]` → `[1.0.0]`)
3. Update `arabic/SKILL.md` frontmatter `version`
4. Update `arabic/references/INDEX.md` build status if file count changed
5. Open PR to `main` — CI must pass
6. Merge PR
7. Create annotated tag: `git tag -a v1.0.0 -m "v1.0.0: first public release"`
8. Push tag: `git push origin v1.0.0`
9. GitHub Actions `release.yml` creates GitHub Release

---

## Changelog Format

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased]

### Added
- Work in progress toward v1.0.0

## [1.0.0] - 2026-XX-XX

### Added
- Advisory Mode in SKILL.md
- references/advisory-mode.md

### Changed
- Default flow: guide before write
```

---

## Runtime vs Docs Versioning

| Artifact | Versioned? | Notes |
|----------|------------|-------|
| `arabic/` skill pack | Yes | Tied to product VERSION |
| `docs/` planning | No separate version | Tracks product via CHANGELOG |
| `reference/` canonical | No separate version | Distilled into runtime on schedule |

---

## Distribution Channels

| Channel | Available from |
|---------|----------------|
| Git clone + manual copy | Now |
| GitHub Releases (zip) | v1.0.0+ |
| `npx skills add mediabubble-adv/arabic-skill` | v1.1.0 (planned) |
| Install website | v1.1.0 (post-v1 test project) |

---

## Related Documents

- [Branching Strategy](./branching-strategy.md)
- [CI Pipeline](./ci-pipeline.md)
- [Collaboration Rules](./collaboration-rules.md)
- [Roadmap](../planning/roadmap.md)
- [Skill Craft Research](../analysis/skill-craft-and-release-research.md)
