## Learned User Preferences

- Prefer runtime skill folder names without redundant `-skill` suffix; `SKILL.md` lives inside the folder and `name:` should match the install folder (e.g. `arabic`, not `arabic-skill`).
- Chose `arabic` as the skill ID/folder over `awesome-arabic` because the skill is for Arabic content creation, not brand-first naming.
- GitHub repo can stay `mediabubble-adv/arabic-skill` while the portable runtime pack uses the shorter skill id.
- Version policy: `1.0.0` shipped (PRD §12 + P1–P6); **`1.1.0` shipped** (P7 website G13–G18, P8 runtime); **`1.1.1`** npm publish CI; **`1.2.0`** full Cursor npx install + skills.sh registry; **`1.2.1`** git-clone npx fix (`@latest`); **1.2.x train** shipped (research R0–R4, onboarding, validate-golden, Playwright G15–G16, **G1–G12 routing contracts**); **`1.2.4`** shipped (validate-frontmatter + first research cron); next is **LLM agent harness** for interactive G1–G12.
- Plan-first for large bundles (website, book, YouTube series) and research distill — hard gate: no Execute until user approves plan (`approve plan` / `وافق على الخطة`).
- Website plans must include sitemap, per-page SEO, and AEO; G14 install copy on `/install` must match README Install section; use portable repo-root commands (not machine-specific absolute paths); for Next.js port use `website-design-system.md` + `website/content/` as primary reference (Stitch screens optional, not a Phase C gate); book plans need a narrative bible (characters, locations, key beats, opening, ending) before chapter generation.
- Prefer task-class load sets (plan/write/audit/rtl/research/onboarding) and split `engines/` + `templates/` slices — avoid loading full monolithic references on every write; platform ad writes load `ads-service-matrix.md` § one platform only.
- Never write directly into `arabic/SKILL.md` from research — runtime changes go through distill → PR → golden test.
- RTL/UI audit: tiered source-based checks first (portable); defer browser/screenshot tier past v1.1.
- Keep single portable `arabic` runtime core; fold new planning into `project-mode.md` rather than proliferating separate plan files.
- Marketing website UI copy: **مصري أولاً** (natural Egyptian Arabic) for all page chrome, including install and commands pages; dialect switcher in hero is preview-only; positioning lock **مش مجرد ترجمة** (not bare «مش ترجمة»); dogfood transparency **choice D** — full command trail + G16 snapshot on `/about`, global footer SSOT in `website/content/footer.md`.
- When sequencing v1.1 tracks, prefer docs/CHANGELOG hygiene before runtime or feature work (B then C).

## Learned Workspace Facts

- **Awesome Arabic Skill** — MediaBubble product for Arabic content creation.
- GitHub `mediabubble-adv/arabic-skill` (clone `arabic-skill`); runtime pack `arabic/` with `SKILL.md` `name: arabic`, `display_name: Awesome Arabic Skill`.
- Install (full Cursor): `npx @mediabubble-adv/arabic-skill@latest install --target cursor` — skill + `~/.cursor/commands/arabic.md` + `~/.cursor/rules/arabic.mdc`; from a git clone use `@latest`, `npm run install:cursor`, or `node bin/arabic-skill.js install`.
- skills.sh (skill pack only): `npx skills add mediabubble-adv/arabic-skill -a cursor -g -y`; listing is telemetry-driven from installs.
- `reference/` holds 38 canonical specialist skills; runtime `arabic/` is the distilled product—do not delete `reference/` casually.
- Research layer (`research/`): citation registry, knowledge-base, distillation queue; `/arabic research <topic|distill|status>` loads `references/research-mode.md`; `research/index.json` entries use `file` (relative to `research/`); monthly cron per `docs/planning/research-monthly-cron.md` with logs in `research/logs/`; `validate-research-scaffold.sh` + `validate-research.sh` (90/180d stale tiers, queue cap ≤20) in `npm run validate`.
- Onboarding: `onboarding-mode.md`, `arabic/templates/.arabic/`, `/arabic init` scaffold, post-install CLI next steps (`/arabic guide`, `/arabic init`); `onboarding` load-discipline task class; `validate-onboarding.sh` in `npm run validate`.
- P8 runtime shipped in **1.1.0** on `main`: `plan series`, `audit rtl`, `audit --dir` (40-file cap), `load-discipline.md` + `rtl-audit.md`; legacy + AI-likelihood scoring on `/arabic audit` only—not every write.
- Default git branch is `main` (not `master`).
- `docs/supported/` documents **24** tool profiles; `scripts/validate-supported.sh` enforces README index and `support-matrix.md` row parity (in `npm run validate` and CI).
- `npx install` presets exist only for Cursor, Claude, and Codex; other tools use manual paths per profile.
- Repo layout: `arabic/` (runtime), `reference/` (canonical library), `docs/` (product, planning, engineering, supported), `scripts/` (validation); `website/` Next.js App Router marketing site on `main` (**G13–G18** green; live https://arabic-skill.vercel.app); Masri copy in `website/content/` (8 routes + `footer.md`); install site shipped at v1.1.0 — README + `/install` + `docs/supported/` for tool profiles; v1.1 Stitch specs and dated execution plans in `docs/planning/`; G14 via `scripts/validate-website-install.sh`; `validate-frontmatter.sh` + `validate-golden.sh` (fixture structure, path refs, G13 route smoke) in `npm run validate` + CI; **`validate-website-playwright.sh`** (G15 mobile UX + G16 audit/footer smoke) + CI job `website-e2e`; npm pack gate via `scripts/validate-npm-pack.sh`; `tests/golden/` manual G1–G12 checklists; in `docs/` markdown use plain `/route` notation (not `[text](/route)` — `validate-docs.sh` treats absolute links as filesystem paths); lightweight tool SVGs in `public/assets/` (full brand packs gitignored).
