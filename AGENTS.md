## Learned User Preferences

- Prefer runtime skill folder names without redundant `-skill` suffix; `SKILL.md` lives inside the folder and `name:` should match the install folder (e.g. `arabic`, not `arabic-skill`).
- Chose `arabic` as the skill ID/folder over `awesome-arabic` because the skill is for Arabic content creation, not brand-first naming.
- GitHub repo can stay `mediabubble-adv/arabic-skill` while the portable runtime pack uses the shorter skill id.
- Version policy: `1.0.0` shipped (PRD §12 + P1–P6); target **`1.1.0`** for P8 plan-first bundles, audit/RTL extensions, load-discipline refactor, and P7 distribution (website, `npx skills add`).
- Plan-first for large bundles (website, book, YouTube series) — hard gate: no Execute until user approves plan (`approve plan` / `وافق على الخطة`).
- Website plans must include sitemap, per-page SEO, and AEO; book plans need a narrative bible (characters, locations, key beats, opening, ending) before chapter generation.
- Prefer task-class load sets (plan/write/audit/rtl) and split `engines/` + `templates/` slices — avoid loading full monolithic references on every write; skill should respond faster.
- Defer first-run onboarding, performance pack, and bundled agents/rules until install/setup model is chosen.
- RTL/UI audit: tiered source-based checks first (portable); defer browser/screenshot tier past v1.1.
- Keep single portable `arabic` runtime core; fold new planning into `project-mode.md` rather than proliferating separate plan files.
- Marketing website UI copy: **مصري أولاً** (natural Egyptian Arabic) for all page chrome, including install and commands pages; dialect switcher in hero is preview-only.
- Install docs live in README + `docs/supported/` until the website ships.

## Learned Workspace Facts

- **Awesome Arabic Skill** — MediaBubble product for Arabic content creation.
- GitHub org/repo: `mediabubble-adv/arabic-skill` (clone folder `arabic-skill`).
- Runtime skill pack: `arabic/` with `SKILL.md` frontmatter `name: arabic` and `display_name: Awesome Arabic Skill`.
- Install: `npx @mediabubble-adv/arabic-skill install --target cursor` (or manually clone the repo and copy).
- `npx install` copies only `arabic/` to the skills directory—not repo `.cursor/rules` or `.cursor/commands`; full Cursor integration requires clone or manual copy.
- `reference/` holds 38 canonical specialist skills; runtime `arabic/` is the distilled product—do not delete `reference/` casually.
- Current product version is `1.0.0` in root `VERSION`, `CHANGELOG.md`, `package.json`, and `arabic/SKILL.md`; **v1.1.0 in progress** (P8 + distribution) per enhancement plan and CHANGELOG `[Unreleased]`.
- P8/v1.1 planned commands: `plan series`, `audit rtl`, `audit --dir` (capped); legacy + AI-likelihood scoring on `/arabic audit` only—not every write delivery.
- Default git branch is `main` (not `master`).
- `docs/supported/` documents **24** tool profiles; `scripts/validate-supported.sh` enforces README index and `support-matrix.md` row parity (in `npm run validate` and CI).
- `npx install` presets exist only for Cursor, Claude, and Codex; other tools use manual paths per profile.
- Repo layout: `arabic/` (runtime), `reference/` (canonical library), `docs/` (product, planning, engineering, supported), `scripts/` (validation); no active `website/` folder; v1.1 website/Stitch specs in `docs/planning/stitch-*.md`.
