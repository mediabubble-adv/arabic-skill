# `/arabic` Command Router

**Load when:** routing `/arabic` commands, resolving workspace automation, or checking how a command maps to engine/template/output behavior.
**Pairs with:** `references/output-templates.md`, `references/engines.md`, `references/project-mode.md`, `references/project-context-scanner.md`, `references/advisory-mode.md`, and `docs/supported/cursor/commands.md`.

> **Rule:** This is the single runtime routing table. `SKILL.md` may reference it, but it should not duplicate this table.

---

## 1. Command Grammar

```text
/arabic [subcommand] [target] [flags]
```

### Root behavior

- Bare `/arabic` or `/arabic guide` -> Advisory Mode
- `/arabic write ...` -> content generation with the selected workspace, engine, and template
- `/arabic plan ...` -> staged project execution
- `/arabic audit ...` -> review an existing Arabic draft or file
- `/arabic coach ...` -> prompt repair and upgrade
- `/arabic research ...` -> research-intelligence workflow
- `/arabic voice ...` -> load, save, or show brand voice memory
- `/arabic auto ...` -> infer intent from the workspace and route automatically
- `/arabic init` -> create the `.arabic/` scaffold
- `/arabic help ...` -> copy-ready usage help

---

## 2. Routing Table

### 2.1 Advisory and helper commands

| Command | Workspace | Engine / flow | Template | Output |
|---|---|---|---|---|
| `/arabic` | Advisory | Advisory Mode | B when writing is needed | stdout |
| `/arabic guide` | Advisory | Advisory Mode | B when writing is needed | stdout |
| `/arabic help` | Help | Command help | n/a | stdout |
| `/arabic help <subcommand>` | Help | Subcommand help | n/a | stdout |

### 2.2 Write commands

| Command | Workspace | Engine | Template | Notes |
|---|---|---|---|---|
| `caption` | Social Creator | Captions Engine | A | Single caption set |
| `captions` | Social Creator | Captions Engine | A | Batch caption set |
| `reel` | Social Creator | Captions + Video | A/C | Short-form reel copy |
| `story` | Social Creator | Captions Engine | A | Story copy |
| `post` | Social Creator / Blogger | Captions or SEO Engine | A/B | Platform decides final shape |
| `ad` | Ad Agency | Marketing Funnel Engine | A | Single ad asset |
| `ads` | Ad Agency | Marketing Funnel Engine | A | Multi-asset set |
| `meta` | Performance Marketer | Marketing Funnel Engine | A | Meta-specific copy |
| `google` | Performance Marketer | Marketing Funnel Engine | A | Search / RSA copy |
| `tiktok` | Performance Marketer | Captions + Video | A/C | Hook-first short-form |
| `snap` | Performance Marketer | Captions Engine | A | Snap-specific copy |
| `linkedin` | B2B / Ad Agency | Marketing Funnel Engine | B | Professional register |
| `whatsapp` | Sales Professional | Sales Content Engine | A | Message sequence or DM copy |
| `email` | Sales Professional | Sales Content Engine | B | Subject + body |
| `landing` | Website Owner | Website Content + SEO Engine | B | Single landing page |
| `page` | Website Owner | Website Content Engine | B | Full page copy |
| `website` | Website Owner | Website Content Engine | B | Triggers plan when multi-page |
| `blog` | Blogger / SEO | SEO + AEO Engines | B | Article or pillar page |
| `seo` | Blogger / SEO | SEO Engine | B | Search-first copy |
| `aeo` | Blogger / SEO | AEO Engine | B | FAQ / answer blocks |
| `video` | Video Creator | Video Script Engine | C | Timestamped script |
| `script` | Video Creator | Video Script Engine | C | Alias for `video` |
| `youtube` | Video Creator | Video Script Engine | C | Retention-focused script |
| `podcast` | Video Creator | Video Script + Conversation Router | C | Interview or show script |
| `sales` | Sales Professional | Sales Content Engine | B/C | Funnel-stage aware |
| `funnel` | Ad Agency | Marketing Funnel Engine | B | Funnel bundle |
| `tagline` | Brand Builder | Brand Voice Engine | A | 12 variants |
| `brand` | Brand Builder | Brand Voice Engine | D | Voice guide |
| `book` | Author | Book Engine | E | Triggers plan book when large |
| `chapter` | Author | Book Engine | E | Continuity-aware chapter copy |
| `outline` | Author | Book Engine | E | Premise + structure |
| `ui` | Indie Dev | UI/UX Microcopy Engine | A | Strings and empty states |
| `readme` | Indie Dev / SaaS | Website Content Engine | B | Load `domains/dev-tech.md` + project scan; README structure |
| `tutorial` | Indie Dev / SaaS | Website Content Engine / Video Script Engine | B/C | Load `domains/dev-tech.md` + project scan; step-by-step teaching |
| `explain` | Indie Dev / SaaS | Website Content Engine | B | Load `domains/dev-tech.md` + project scan; Arabic explanation |
| `contract` | Professional Document | Professional Documents | F | Contracts |
| `skill` | Professional Document | Professional Documents | F | Skill writing |
| `rules` | Professional Document | Professional Documents | F | Agent / subagent rules |

### 2.3 Plan commands

| Command | Project mode | Stages | Output |
|---|---|---|---|
| `/arabic plan campaign` | Campaign bundle | Discuss -> Research -> Recommend -> Plan -> Execute -> Test -> Refine | `.arabic/projects/{slug}/plan.md` + outputs |
| `/arabic plan website` | Multi-page site | Sitemap -> per-page brief -> copy -> QA | `.arabic/projects/{slug}/plan.md` + outputs |
| `/arabic plan book` | Long-form editorial | Premise -> outline -> chapters -> continuity QA | `.arabic/projects/{slug}/plan.md` + outputs |
| `/arabic plan series` | YouTube / podcast season | Narrative bible -> episode table -> pilot -> episodes | `.arabic/projects/{slug}/plan.md` + outputs |
| `/arabic plan brand` | Voice system | Audit -> pillars -> vocabulary -> examples | `.arabic/projects/{slug}/plan.md` + outputs |

### 2.4 Audit, coach, research, voice, and automation

| Command | Behavior | Notes |
|---|---|---|
| `/arabic audit` | Run the 9-point QA pipeline on pasted Arabic text | Also accepts `--file`; legacy + AI-likelihood scoring (audit-only) |
| `/arabic audit rtl` | Tier-1 RTL/UI source audit | Also accepts `--file` or capped `--dir` — loads `rtl-audit.md` |
| `/arabic audit --dir <path>` | Audit Arabic copy in up to 40 files under path | Safe-scan rules from `project-context-scanner.md` |
| `/arabic coach` | Repair a weak prompt and explain the upgrade | Also accepts `--file` |
| `/arabic research <topic>` | Structured research run → `research/knowledge-base/` | Loads `research-mode.md` + matching `research/prompts/` |
| `/arabic research distill` | Distill plan from `distillation-queue.md` | ≤50 lines/runtime file; user approves PR |
| `/arabic research status` | `index.json` + queue + stale sources (90d) | Monthly cron: `docs/planning/research-monthly-cron.md` |
| `/arabic voice save` | Save a brand voice to `.arabic/voice.md` or project `voice.md` | Prompts the user for missing axes |
| `/arabic voice load` | Load voice into the next write or plan task | Inject before engine selection |
| `/arabic voice show` | Show the current voice summary | Read-only |
| `/arabic auto` | Infer intent from workspace and route to the right command | Uses safe repo scanning |
| `/arabic init` | Create the `.arabic/` scaffold | First-use setup |

---

## 3. Flag Reference

| Flag | Applies to | Purpose |
|---|---|---|
| `--dialect` | write / plan | Locks dialect inference |
| `--platform` | write | Selects platform-specific rules |
| `--brief` | write / plan | Loads a structured brief and compresses intake |
| `--file` | audit / coach / audit rtl | Reads from a workspace file |
| `--dir` | audit / audit rtl | Capped directory scan (max 40 files) |
| `--out` | write / plan / audit | Writes output to a path |
| `--yes` | auto / plan | Skips confirmation and runs the inferred action |
| `--count` | write captions / ads | Controls variant count |

Unknown flags should warn and be ignored. Never guess-execute a command that has an unrecognized subcommand.

---

## 4. Auto-Detection Rules

| Signal | Inferred action |
|---|---|
| Selection contains Arabic text | `audit` |
| User asks to run research, gap scan, or platform specs collection | `research` |
| `research/distillation-queue.md` has open items and user says distill | `research distill` |
| `brief.md` or `*.brief.yaml` exists | `write` in Pro Mode |
| Open file lives under `content/`, `copy/`, or `marketing/` | `write` matching the file type |
| `.arabic/projects/*/plan.md` is incomplete | Resume `plan` |
| User asks to explain a repo or tool in Arabic | `write explain` after safe project scan |
| User asks for install or use instructions | `write tutorial` after safe project scan |
| CI / validation failure in this repo | Suggest `audit` and check `SKILL.md` routing |
| Empty multi-page website request | `plan website` |
| Rich campaign request | `plan campaign` |
| Multi-episode YouTube / podcast season | `plan series` |

### Safe scan inputs for `auto`

- `README.md`
- `docs/`
- `package.json`, `pyproject.toml`, `Cargo.toml`, `go.mod`, and similar config files
- routes, pages, examples, and public source files
- changelog or release notes
- visible scripts and command surfaces
- `voice.md` and `.arabic/` state when present

### Safe scan exclusions for `auto`

- `.env*`
- secrets, credentials, tokens, private keys
- `node_modules/`, `vendor/`, `.venv/`
- build output, caches, and generated artifacts
- lockfile noise unless the install flow specifically depends on it

---

## 5. Error Handling

| Condition | Behavior |
|---|---|
| Unknown subcommand | Suggest the nearest match and stop |
| Missing required brief field | Ask only the missing field, max two questions |
| `--file` path not found | Report the path and stop |
| Thin project evidence | Say evidence is thin and ask one focused question |
| Dialect not resolvable | Ask which country is the primary audience |
| Multiple project directions | Return a recommendation summary before planning |

---

## 6. `.arabic/` Scaffold

Created by `/arabic init` or the first `auto` run when the workspace needs persistence.

```text
.arabic/
├── config.yaml
├── briefs/
├── projects/
│   └── {slug}/
│       ├── plan.md
│       └── output/
├── voice.md
└── last-run.json
```

`voice.md` is created on first `/arabic voice save` for a project or workspace. If a project-specific voice file already exists, `voice load` should prefer it over the root voice memory.
