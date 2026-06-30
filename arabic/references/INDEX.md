# 📂 Awesome Arabic Skill — Master File Index

## Token Load Strategy
Max 6 files per task. Always start with SKILL.md + 1 dialect file + 1–2 task-relevant references.
Never load all 38 files. Load strictly on demand.

---

## Core Router
| File | Purpose | Always loaded |
|---|---|---|
| `SKILL.md` | Master router — 7 tools, all modules | ✅ Yes |
| `references/INDEX.md` | This file | ✅ Yes |

---

## References — Load by Task (7 files)

| File | Load when |
|---|---|
| `references/intake-protocols.md` | Before asking intake questions (every new task) |
| `references/engines.md` | Before generating content (every task) |
| `references/output-templates.md` | After engine is selected (every task) |
| `references/taboos.md` | Before final delivery (every task) |
| `references/humanization-protocol.md` | After content is drafted (every task) |
| `references/trends-and-hooks.md` | When hooks, viral angles, or trends are needed |
| `references/examples.md` | When checking output quality against good/bad comparisons |

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

## Domains — Load ONLY if Industry Applies (12 files, load 0 or 1)

| File | Industry |
|---|---|
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

**Total planned files:** 42
**Total built:** 42 — v0.1.0 dev baseline (v1.0.0 when plan ships)

Breakdown: SKILL.md (1) + references/ (8, incl. this INDEX) + dialects/ (11) + domains/ (12) + conversations/ (6) + professional-docs/ (4) = 42.
