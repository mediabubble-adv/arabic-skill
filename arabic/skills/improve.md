---
name: arabic-improve
display_name: Arabic Content Improve
version: "1.3.0"
description: |
  Interactive full-rewrite skill. Ask ONE multiple-choice question at a time
  (easy picks for Cursor/Claude). Old content is reference only. Each answer
  steers a totally different rewrite branch — never a synonym patch of the source.
  Supports --from-audit to seed locks/issues from a saved audit report.

  Triggers: /arabic improve <content-link|content-file.md|website>
            /arabic improve --from-audit .arabic/audits/{slug}-{date}.md
---

# 🎯 Arabic Content Improve Skill

Full rewrite guided by a **one-question-at-a-time picker**. Source = brief only (facts + locks). Output = new prose.

---

## Operating Model

```
load source as brief → ask Q1 (wait) → ask Q2 (wait) → …
→ show branch summary → full rewrite → deliver
```

**From audit:**

```
load --from-audit report → seed locks + issues + improve seeds
→ skip Q1–Q2 (diagnosis) → ask only missing pickers (voice/scope/delivery/lang)
→ Branch Card includes from_audit → full rewrite (still blank-page)
```

**Hard UI rules for the agent:**
1. Ask **exactly one** picker question per message.
2. Wait for the user's reply before the next question.
3. Options must be **lettered (A/B/C…)** so the user can answer with a single letter.
4. Keep each turn short: progress chip + one question + options (+ optional one-line tip).
5. Do **not** dump the full questionnaire upfront.
6. After every answer, briefly name the **branch lock** that answer just set (so the user sees the path diverge).

Unlike `/arabic audit`, this skill does not patch. Unlike `/arabic write`, it starts from an existing surface as reference.

---

## Core Rule — Reference, Don't Patch

**Old content is reference only. Output must be a full rewrite.**

### Preserve (constraints)
- Facts, product names, commands, install strings (G14), frozen snapshots (G16)
- Confirmed brand locks and voice.md lexicon
- Page/job intent and required links/routes
- Structural obligations the surface needs (FAQ keys, nav labels) when locked
- **From audit:** every string listed under `## Locks to preserve`

### Must change
- Hooks, sentence rhythm, section titles (unless locked), CTA phrasing, argument order
- **From audit:** every failing component/section called out in `## Issues` — new prose that fixes the *direction*, not a synonym of the old line

### Rewrite bar — FAIL if:
- >~30% near-copy of the source
- Synonym-swap of the same draft
- Two different picker paths would produce interchangeable openings
- Audit issues remain visibly unaddressed after rewrite

**Pass:** A new reader would not read this as a line-edit of the old draft; locks still hold; ranked audit issues are resolved by new wording/structure.

---

## Input Format

```text
/arabic improve <content-link|file|website>
/arabic improve --from-audit .arabic/audits/{slug}-{YYYY-MM-DD}.md
```

| Source | Meaning |
|--------|---------|
| content-link | URL or short description |
| file path | Local markdown / content file |
| website | Marketing surface (`website/content/` + chrome) |
| `--from-audit` | Saved report = constraints + issue list; content paths from `scope_paths` / Source field |

Flags: `--voice`, `--dialect`, `--format`, `--dry-run`, `--file`, `--out`, `--from-audit`, `--lang-order`, `--lang` (see Flags).

---

## `--from-audit` protocol

1. Read the report. Require headings: Issues, Locks, Improve seeds, Copy-ready (see `tests/golden/audit-report-shape.md`).
2. Prefill Branch Card:
   - `from_audit: <path>`
   - `primary_job` ← Improve seeds
   - `lang_order` ← seeds or bilingual-pipeline default `ar_en`
   - `locks` ← Locks section (byte-sensitive strings)
   - Failing component IDs ← Issues + Component map
3. **Skip Q1 and Q2** (job + diagnosis already in the report). Announce:
   `✓ Seeded from audit — skipping job/diagnosis pickers`
4. Ask only missing questions: dialect (if unset), audience if needed, **Q5 voice**, **Q6 scope** (default to `scope_paths`), **Q7** only if locks empty, **Q8 delivery**, language order if bilingual site and unset.
5. Still enforce **blank-page rewrite**. Do not apply audit “Fix direction” as a line patch list.
6. After delivery, offer optional `/arabic audit` re-run on the new copy.

When website surface: load `references/website-ui-system.md` for component IDs. When `lang_order` dual: load `references/bilingual-pipeline.md`.

---

## Sequential Picker Protocol (mandatory)

### Turn shape (every question)

```markdown
`/arabic improve` · خطوة N من ~6 · [هدف مختصر]

**السؤال N — [title]**

A) …
B) …
C) …
D) …   ← optional

رد بحرف واحد (A / B / C) — أو اكتب الرقم.
```

### After each answer (1–2 lines only)

```markdown
✓ Locked: [branch name] → [what will be totally different]
Next question…
```

### Fast replies the agent must accept
- `A` / `a` / `1`
- `A,C` only on questions marked **multi-select**
- `skip` — use the **default** marked with ◆ when offered
- `back` — re-ask the previous question

### Never do
- Ask free-form essay questions when a picker can work
- Ask tone as four separate 0–10 number prompts (use preset bundles instead)
- Generate the full rewrite before the picker finishes (unless `--yes` / user said skip questions)

---

## Question Bank (ask in this order)

Skip a question only if the flag/brief already answered it (e.g. `--dialect masri` skips Q3 dialect).

---

### Q1 — Primary job *(single)*

**What should this rewrite mainly fix?**

| Key | Label | Branch lock (must diverge) |
|-----|--------|----------------------------|
| **A** ◆ | أقوى جذب / هوك | New cold-open + sharper first screen; proof later |
| **B** | أوضح تدفق / ترتيب | Rebuild section order; same job, new architecture |
| **C** | نبرة أقرب للجمهور | Register/lexicon shift drives every sentence |
| **D** | أقوى تحويل (CTA) | CTA-first path; install/action gravitational |
| **E** | توافق صوت البراند | voice.md / locked lexicon is the spine |

After A–E: set `primary_job`. Show branch lock line.

---

### Q2 — Diagnosis *(single)*

**What's wrong with the current copy?**

| Key | Label | Branch lock |
|-----|--------|-------------|
| **A** ◆ | اعمل Scan وقرر أنت | Agent states 2–3 failing signals, then continues |
| **B** | رسمي زيادة / فصحى | Punchier dialect; kill MSA bleed |
| **C** | عامّي زيادة / ضعيف ثقة | Elevate register; agency cool |
| **D** | ممل / يشبه بعضه | New metaphors + new section spines |
| **E** | مش واضح لمن موجّه | Audience mismatch → force Q4 path |

---

### Q3 — Dialect *(single)* — skip if `--dialect` set

**Which dialect should the new copy speak?**

| Key | Label | Branch lock |
|-----|--------|-------------|
| **A** ◆ | مصري (Masri) | Load `dialects/masri.md` |
| **B** | سعودي (KSA) | Load `dialects/ksa.md` |
| **C** | خليجي | Load `dialects/khaliji.md` · ask country only if needed later |
| **D** | شامي | Load `dialects/levantine.md` |
| **E** | فصحى / بيضاء | Load `msa` or `white-dialect` |
| **F** | زي المصدر | Detect from source · still full rewrite in that dialect |

---

### Q4 — Audience *(single)*

**Who is the primary reader for this rewrite?**

| Key | Label | Branch lock (voice + examples change) |
|-----|--------|----------------------------------------|
| **A** ◆ | مطوّر / مستخدم أدوات AI | Dev metaphor, commands, terminal gravity |
| **B** | صانع محتوى / ماركتنج | Campaign/scenes, platform cues |
| **C** | مؤسس / صاحب قرار | Outcome + risk reduction + clarity |
| **D** | جمهور مختلط (زائر الموقع) | Broad hooks; avoid insider slang |
| **E** | غير كده… | Ask ONE short free-text follow-up, then continue |

Different audiences must produce **different openings and proof order** — not the same page with a swapped noun.

---

### Q5 — Voice preset *(single)* — skip axes 0–10 by default

**Pick the voice pack for the rewrite:**

| Key | Label | Axes (F / W / S / P) | Feel |
|-----|--------|----------------------|------|
| **A** | ودود قريب | 3 / 7 / 3 / 7 | Warm chat Masri |
| **B** ◆ | وكالة واثقة | 7 / 4 / 7 / 4 | Cool premium agency |
| **C** | جريء مباشر | 4 / 8 / 5 / 5 | Bold punchy |
| **D** | رسمي منسّق | 9 / 3 / 8 / 3 | Elevated / near-formal |
| **E** | من voice.md | — | Load saved voice · confirm |
| **F** | تخصيص سريع | — | Ask **one** follow-up: paste 4 numbers `F-W-S-P` (e.g. `8-4-8-4`) |

If no filled `voice.md`, hide or disable **E** and say so in the option tip.

**Divergence rule:** A vs B vs C vs D must yield recognizably different first paragraphs on the same brief.

---

### Q6 — Scope *(multi-select allowed)*

**What should we rewrite?**  
Reply like `A` or `A,C` or `ALL`.

| Key | Label |
|-----|--------|
| **A** ◆ | السطح الحالي بالكامل (كل اللي متشاف للمصدر) |
| **B** | الهيرو / أول شاشة فقط |
| **C** | صفحات التحويل (install / CTA) |
| **D** | صفحات الثقة (about / examples / tutorials) |
| **E** | الميتا / العناوين فقط |

---

### Q7 — Locks *(single)*

**What must stay unchanged?**

| Key | Label |
|-----|--------|
| **A** ◆ | الأقفال الظاهرة في المصدر (براند + أوامر تثبيت + أي G14/G16) |
| **B** | البراند فقط (مفاتيح التسويق) — الأوامر تقدر تتعيد صياغتها للشرح |
| **C** | مفيش أقفال — أعد كل حاجة مع الحفاظ على الحقائق الأساسية |
| **D** | هحدد أنا… | One free-text line of lock strings |

---

### Q8 — Delivery *(single)*

**How should I deliver?**

| Key | Label |
|-----|--------|
| **A** ◆ | اكتب في الملفات / الصفحة (rewrite in place) |
| **B** | تقرير + النسخة الجديدة هنا في الشات |
| **C** | Side-by-side عيّنات فقط + ملخص اتجاه |
| **D** | Dry-run: اتجاه + ٣ افتتاحيات مختلفة من غير كتابة ملفات |

---

## Branch → Result Matrix (forced divergence)

Before writing, assemble a **Branch Card** from answers and obey it:

| Signal | Must change in the output |
|--------|---------------------------|
| Q1=A Attraction | New hook in first 5–12 words; delay feature laundry lists |
| Q1=B Flow | Different H2 order than source |
| Q1=C Tone | Lexicon/register swap visible in every section |
| Q1=D Conversion | CTA appears earlier; secondary CTAs pruned/refocused |
| Q1=E Brand | voice.md do/don't + samples echoed |
| Q4 audience | Proof type changes (code vs campaign vs ROI vs plain benefits) |
| Q5 voice pack | Sentence length + warmth markers follow the pack table |

**Anti-collapse rule:** If two branch cards would produce similar copy, amplify the highest-priority differing signal (Q1 > Q5 > Q4) until openings clearly diverge. Show the user one sample line of the chosen opening before the full write when `--dry-run` or Q8=C/D.

After the last answer, show:

```markdown
## Branch Card
- from_audit: … (path or none)
- Job: …
- Diagnosis: …
- Dialect: …
- Audience: …
- Voice: …
- Scope: …
- Locks: …
- lang_order: …
- Delivery: …

أكتب النسخة الجديدة؟ (Y / N / adjust)
```

Wait for **Y** (or user already said `--yes` / «ابعت» / «اكتب») before generating files.

---

## Rewrite Checks (before delivery)

| Check | Enforce |
|-------|---------|
| Blank-page rewrite | Source = brief only |
| Branch fidelity | Output matches Branch Card (not a generic polish) |
| Constraint lock | Confirmed locks untouched |
| Dialect / register / tone / lexicon | As locked |
| Engagement + cultural + back-translation | Final gate |
| Brand compliance | voice.md if used |

---

## Output Format

```markdown
## Content Improvement Report

**Source:** …
**Branch Card:** [compact one-liner from Q1–Q8]
**Mode:** full rewrite (source = reference only)

### Direction Taken
- …

### Locks Preserved
- …

### New Version
[complete new copy]

### Divergence Proof
**Original sample:** …
**New sample:** …   ← must not read as synonym swap

### Recommendation
- …
```

---

## Flags

| Flag | Purpose |
|------|---------|
| `--voice <path>` | Prefill Q5=E |
| `--dialect <name>` | Skip Q3 |
| `--format annotated\|side-by-side\|bullet\|rewrite` | Prefill delivery style |
| `--dry-run` | Force Q8=D path |
| `--file` / `--out` | IO paths |
| `--yes` | Skip final Y confirm (still run pickers unless user also said skip questions) |
| `--from-audit <path>` | Seed from saved audit report (skip Q1–Q2; full rewrite still) |
| `--lang-order ar_en\|en_ar` | Prefill bilingual order (`bilingual-pipeline.md`) |
| `--lang ar\|en\|ar,en` | Locale scope |

If the user says **skip questions** / **just rewrite**: ask **only Q5 (voice)** + **Q7 (locks)** — still pickers, still one at a time — then Branch Card → write.  
With `--from-audit`, “skip questions” still honors report locks and only asks delivery if missing.

---

## Related Commands

| Command | Use when |
|---------|----------|
| `/arabic improve` | Existing draft → **new** prose via pickers |
| `/arabic improve --from-audit` | Rewrite using a saved audit report as constraints |
| `/arabic audit` | Scores + **saved report** + handoff to improve |
| `/arabic write` | No usable source draft |
| `/arabic voice *` | Save/load brand voice for Q5=E |

---

## Loading Order

1. This file + `voice.md` if present  
2. `dialects/{dialect}.md` after Q3  
3. Domain file if industry obvious from source  
4. `humanization-protocol.md` after draft  
5. `taboos.md` before delivery  
6. `references/audit-mode.md` checks only as a final gate — never as patch instructions  
7. `references/website-ui-system.md` when improving website/UI surfaces  
8. `references/bilingual-pipeline.md` when `lang_order` is dual-locale  

---

## Quality Bar

**PASS:** Picker path obvious in the prose · native dialect · locks intact · openings would differ under another Q1/Q5 choice · audit issues addressed when `--from-audit`  

**FAIL:** Questionnaire dump · free-form maze · synonym patch · branch collapse · ignored audit report

---

## Safety

- Never invent voice — use presets or voice.md  
- Contradiction → pause one clarifying picker  
- Taboo scan always  
- Don't ship if Branch Card and output diverge  
