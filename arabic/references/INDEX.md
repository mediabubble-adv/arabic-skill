# 📂 Awesome Arabic Skill — Master File Index

## Token Load Strategy
Max 6 files per task by default — use `references/load-discipline.md` task-class sets (plan / write / audit / rtl / research / onboarding).
Never load all files. Load strictly on demand per task class.

---

## Core Router
| File | Purpose | Always loaded |
|---|---|---|
| `SKILL.md` | Master router — 7 tools, all modules | ✅ Yes |
| `references/INDEX.md` | This file | ✅ Yes |
| `voice.md` | Brand voice memory (root) — load before writing if present | Load if exists |

---

## References — Load by Task (24 files)

| File | Load when |
|---|---|
| `references/load-discipline.md` | Any `/arabic` command — pick plan/write/audit/rtl/research load set first |
| `references/advisory-mode.md` | Start of any task that is not a complete brief (default operating model) |
| `references/audit-mode.md` | Audit Mode / `/arabic audit`, and as the final 9-point QA review |
| `references/rtl-audit.md` | `/arabic audit rtl` — tier-1 RTL/UI source checks |
| `references/prompt-engineering.md` | Prompt Coach Mode / `/arabic coach`, or any weak-prompt arrival |
| `references/intake-protocols.md` | Before asking intake questions (every new task) |
| `references/engines.md` | Before generating content (every task) |
| `references/output-templates.md` | After engine is selected (every task) |
| `references/command-router.md` | `/arabic` routing, workspace persistence, and Cursor adapter behavior |
| `references/taboos.md` | Before final delivery (every task) |
| `references/humanization-protocol.md` | After content is drafted (every task) |
| `references/trends-and-hooks.md` | When hooks, viral angles, or trends are needed |
| `references/examples.md` | When checking output quality against good/bad comparisons |
| `references/ads-service-matrix.md` | Paid-ad tasks, `/arabic plan campaign`, multi-channel ad briefs |
| `references/project-mode.md` | Large deliverables, staged execution, website/campaign/book work |
| `references/project-context-scanner.md` | Real repo explanations, install/use guides, evidence-grounded copy |
| `references/book-writing.md` | Book projects, premise-to-continuity workflows |
| `references/seo-aeo-masri.md` | SEO/AEO or website-copy tasks targeting Egypt |
| `references/seo-aeo-gulf.md` | SEO/AEO or website-copy tasks targeting the Gulf (UAE/Kuwait/Qatar/Bahrain/Oman) |
| `references/seo-aeo-ksa.md` | SEO/AEO or website-copy tasks targeting Saudi Arabia |
| `references/seasonal-calendar.md` | Campaign planning or any time-sensitive / seasonal brief |
| `references/research-mode.md` | `/arabic research`, `/arabic research distill`, `/arabic research status` |
| `references/onboarding-mode.md` | `/arabic init`, first-run install, bare `/arabic` without `.arabic/` |

---

## Dialects — Load ONLY the 1 Target Dialect (11 files)

| File | Dialect | Region |
|---|---|---|
| `dialects/masri.md` | مصري — Egyptian | Egypt |
| `dialects/ksa.md` | سعودي — Saudi | KSA (Riyadhi / Hejazi / Qassimi) |
| `dialects/khaliji.md` | خليجي — Gulf | UAE / Kuwait / Qatar / Bahrain / Oman |
| `dialects/levantine.md` | شامي — Levantine | Syria / Lebanon / Jordan / Palestine |
| `dialects/iraqi.md` | عراقي — Iraqi | Iraq (Baghdad / Southern / Kurdish regions) |
| `dialects/yemeni.md` | يمني — Yemeni | Yemen |
| `dialects/maghrebi.md` | مغربي — Maghrebi | Morocco / Tunisia / Algeria |
| `dialects/sudanese.md` | سوداني — Sudanese | Sudan |
| `dialects/libyan.md` | ليبي — Libyan | Libya |
| `dialects/msa.md` | فصحى — MSA | Pan-Arab formal |
| `dialects/white-dialect.md` | لهجة بيضاء — White Dialect | Pan-Arab neutral |

---

## Domains — Load ONLY if Industry Applies (14 files, load 0 or 1)

| File | Industry |
|---|---|
| `domains/ads-media.md` | Paid media & advertising |
| `domains/healthcare.md` | Healthcare & medical |
| `domains/finance-banking.md` | Finance & banking |
| `domains/legal.md` | Legal services |
| `domains/tech-saas.md` | Tech & SaaS |
| `domains/ecommerce-retail.md` | E-commerce & retail |
| `domains/education.md` | Education & training |
| `domains/real-estate.md` | Real estate |
| `domains/hospitality-tourism.md` | Hospitality & tourism |
| `domains/food-beverage.md` | Food & beverage |
| `domains/beauty-fashion.md` | Beauty & fashion |
| `domains/fitness-wellness.md` | Fitness & wellness |
| `domains/government-ngo.md` | Government & NGO |
| `domains/dev-tech.md` | Developer-facing product docs and technical Arabic copy |

---

## Conversations — Load ONLY if Task is a Live Conversation Script (6 files, load 0 or 1)

| File | Conversation type |
|---|---|
| `conversations/sales-conversation.md` | Sales calls, WhatsApp sales sequences |
| `conversations/customer-service.md` | Support scripts, FAQ flows, complaint handling |
| `conversations/negotiation.md` | B2B negotiation, partnership talks |
| `conversations/coaching-consulting.md` | Coaching calls, consulting session scripts |
| `conversations/interview-podcast.md` | Podcast scripts, interview question sets |
| `conversations/community-management.md` | Community replies, moderation scripts |

---

## Professional Docs — Load ONLY if Task is a Formal Document (4 files, load 0 or 1)

| File | Document type |
|---|---|
| `professional-docs/contracts.md` | Arabic contract drafting (bilingual / Arabic-only) |
| `professional-docs/skill-writing.md` | AI skill / Claude Code skill writing |
| `professional-docs/agent-rules.md` | Agent / subagent instruction sets |
| `professional-docs/compliance-language.md` | Regulatory & compliance copy |

---

## Build Status

| Phase | Files | Status |
|---|---|---|
| Phase 1 | SKILL.md, INDEX.md, intake-protocols.md, engines.md, output-templates.md | ✅ Complete |
| Phase 2 | humanization-protocol.md, trends-and-hooks.md, examples.md, taboos.md | ✅ Complete |
| Phase 3 | 11 dialect files (`dialects/`) | ✅ Complete |
| Phase 4 | 12 domain files (`domains/`) | ✅ Complete |
| Phase 5 | 6 conversation files + 4 professional-docs files | ✅ Complete |
| P1 (advisory core) | advisory-mode.md + SKILL.md advisory rewrite | ✅ Complete |
| P2 (quality engine) | audit-mode.md + humanization-protocol.md v2 (anti-translationese, channel layers) | ✅ Complete |
| P3 (coach & memory) | prompt-engineering.md + voice.md (brand voice persistence) | ✅ Complete |
| P4 (Masri commercial) | ads-service-matrix.md + ads-media.md + seo-aeo-masri.md + seasonal-calendar.md + masri.md expansion | ✅ Complete |
| P4 (Gulf SEO/AEO) | seo-aeo-gulf.md (market-specific SEO/AEO for UAE/Kuwait/Qatar/Bahrain/Oman) | ✅ Complete |
| P5 (KSA SEO/AEO) | seo-aeo-ksa.md (market-specific SEO/AEO for Saudi Arabia) | ✅ Complete |
| P5 (project mode & dev-tech) | project-mode.md + project-context-scanner.md + book-writing.md + domains/dev-tech.md | ✅ Complete |
| C1–C3 (command surface) | command-router.md + Cursor adapter + `.arabic/` scaffold | ✅ Complete |
| P8 (v1.1 runtime) | load-discipline.md + rtl-audit.md + audit/plan/command extensions | ✅ Complete |
| R3 (research command) | research-mode.md + monthly cron doc | ✅ Complete |

**Total planned files:** 61
**Total built:** 61 — v1.2.1 + research command wiring + Gulf SEO/AEO + KSA SEO/AEO

Breakdown: SKILL.md (1) + voice.md (1) + references/ (24, incl. this INDEX) + dialects/ (11) + domains/ (14) + conversations/ (6) + professional-docs/ (4) = 61.
