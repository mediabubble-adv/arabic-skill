# Versioning and Releases

## Product Version

The canonical product version lives in the repository root:

```text
VERSION          → 1.2.0 (current)
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
| **Distribution** | `1.1.x` | Website, npm `npx` installer, P8 runtime extensions |
| **Distribution follow-ups** | `1.2.0` | Full Cursor npx install, skills.sh registry — ✅ shipped |
| **Research + onboarding** | `1.2.x` | Research R4, first-run onboarding |
| **Breaking changes** | `2.0.0` | Removed modes, restructured routing, incompatible `voice.md` |

**Current state:** **`1.2.0`** on `main` — full Cursor npx install + skills.sh registry shipped 2026-07-04.

---

## Semantic Versioning (post-0.x)

| Bump | When | Example |
|------|------|---------|
| **MAJOR** | Breaking skill behavior, removed modes, restructured routing | 2.0.0 |
| **MINOR** | New modes, engines, domains, non-breaking features | 1.2.0 |
| **PATCH** | Fixes, typo, taboo update, example additions, distribution patches | 1.1.1 |

During `0.x`, increments are **development markers** only. Optional `v0.1.0` tag for contributors; no "production" announcement.

---

## v1.0.0 Release Gate

Ship **v1.0.0** only when **all** of the following are true:

1. PRD §12 success criteria (11 items) — verified
2. Implementation plan Phases **P1–P6** — delivered in runtime
3. Golden tests **G1–G12 pass** (G13–G18 gate v1.1.0) — see [implementation-plan §0.3](../planning/implementation-plan.md#03-golden-test-master-table-g1g18)
4. `scripts/validate-skill.sh` — passes with no blocking errors
5. Install instructions in README — tested on at least Cursor + Claude paths

**Status:** ✅ Gate passed — `v1.0.0` tagged 2026-06-30.

See [Skill Craft Research](../analysis/skill-craft-and-release-research.md) for quality bar rationale.

---

## Release Tags

Format: `v{MAJOR}.{MINOR}.{PATCH}`

Examples:

- `v0.1.0` — development baseline
- **`v1.0.0`** — **first public release** (plan complete) ✅
- `v1.1.0` — website + P8 runtime + npx installer scaffold ✅
- `v1.1.1` — npm publish CI and pack gates ✅
- `v1.2.0` — full Cursor npx install + skills.sh registry ✅
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

1. Confirm release gate checklist for the target version
2. Update `VERSION` and `CHANGELOG.md` (move `[Unreleased]` → `[x.y.z]`)
3. Update `arabic/SKILL.md` frontmatter `version`
4. Update `arabic/references/INDEX.md` build status if file count changed
5. Open PR to `main` — CI must pass (`npm run validate`)
6. Merge PR
7. Create annotated tag: `git tag -a v1.1.1 -m "v1.1.1: distribution patch"`
8. Push tag: `git push origin v1.1.1`
9. GitHub Actions `release.yml` creates GitHub Release; `npm-publish.yml` publishes to npm (requires `NPM_TOKEN`)

---

## Changelog Format

Follow [Keep a Changelog](https://keepachangelog.com/):

```markdown
## [Unreleased]

Working toward v1.2.0

## [1.1.1] - 2026-07-04

### Added
- npm publish CI and pack validation gates
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

| Channel | Status | Notes |
|---------|--------|-------|
| Git clone + manual copy | ✅ Available | Full Cursor integration (rules + commands) |
| GitHub Releases (zip) | ✅ v1.0.0+ | Tag push → `release.yml` |
| `npx @mediabubble-adv/arabic-skill install` | ✅ v1.1.1 | Copies `arabic/` runtime; Cursor/Claude/Codex presets |
| Install website | ✅ v1.1.0 | https://arabic-skill.vercel.app |
| `npx skills add mediabubble-adv/arabic-skill` | ✅ v1.2.0 | skills.sh registry; skill pack only |
| Full Cursor npx install | ✅ v1.2.0 | Skill + `~/.cursor/commands/arabic.md` + `~/.cursor/rules/arabic.mdc` |

See [npm Publishing](./npm-publishing.md) for maintainer publish steps.

---

## Related Documents

- [Branching Strategy](./branching-strategy.md)
- [CI Pipeline](./ci-pipeline.md)
- [Collaboration Rules](./collaboration-rules.md)
- [npm Publishing](./npm-publishing.md)
- [Roadmap](../planning/roadmap.md)
- [Skill Craft Research](../analysis/skill-craft-and-release-research.md)
