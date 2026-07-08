---
name: arabic-brief
display_name: Arabic Brief Builder
version: "1.0.0"
description: |
  Create `.arabic/briefs/*.yaml` from natural language or a one-at-a-time A/B/C
  questionnaire. Confirm once, then write the file and offer a ready --brief command.

  Triggers: /arabic brief | /arabic brief save | /arabic brief from <text|url|file>
---

# 🎯 Arabic Brief Builder

Turn a human request (or short Q&A) into a saved brief for `--brief`.

---

## Operating Model

```
intent → path (NL | guided | from file/url)
→ draft YAML → show preview → confirm
→ write .arabic/briefs/{slug}.yaml → copy-ready write/plan command
```

**Rules for the agent:**
1. If `.arabic/` is missing, offer `/arabic init` first (or create scaffold with user OK).
2. Never overwrite an existing brief without explicit confirm (`replace` / `Y`).
3. Prefer **lettered pickers** (one question per turn) in guided mode — same UX as `/arabic improve`.
4. Natural-language mode: extract fields, show preview, ask only for **missing required** fields (max 2 free questions, else pickers).
5. After save, print the exact next command with `--brief <path>`.

Unlike `/arabic voice save` (tone axes), a **brief** is the *job packet* for one write/plan run.

---

## Commands

| Command | Behavior |
|---------|----------|
| `/arabic brief` | Interactive: ask Path first |
| `/arabic brief save` | Alias of guided/NL save (default entry) |
| `/arabic brief from <text>` | Parse the pasted sentence/paragraph into YAML |
| `/arabic brief from --file <path>` | Extract brief fields from a doc / old brief / page |
| `/arabic brief show [slug]` | List briefs or show one file |
| `/arabic brief help` | Short usage |

Flags: `--out`, `--dialect`, `--yes`, `--name <slug>`, `--goal <write-target>` (see Flags).

---

## Path 0 — Entry picker *(one question)*

**How do you want to build the brief?**

| Key | Label |
|-----|--------|
| **A** ◆ | من كلام عادي (اكتب الجملة وخلاص) |
| **B** | أسئلة واحدة واحدة (A/B/C) |
| **C** | من ملف / رابط / برّيف قديم |

Wait for `A`/`B`/`C`, then continue.

---

## Path A — Natural language → YAML

1. Ask once (or use text already after `brief from`):

```markdown
اكتب البرّيف بجملة أو فقرة قصيرة.
مثال: «عايز ١٢ كابشن إنستغرام لمطعم في القاهرة، مصري، نبرة فكاهية، CTA احجز ترابيزة»
```

2. **Extract** into the schema below. Mark confidence per field (`high` / `guess`).
3. Show **Draft preview** (full YAML fence).
4. If required fields missing → one picker or ≤2 short asks (never a long form dump).
5. Confirm:

```markdown
أحفظ البرّيف؟
A) نعم — احفظ
B) عدّل حقل…
C) إلغاء
```

6. Write file → success line with next command.

### NL extraction tips
- Dialect words (مصري / سعودي / خليجي…) → `dialect`
- Platform (إنستغرام / ميتا / يوتيوب…) → `platform`
- Numbers (“١٢”، “3 variants”) → `count`
- Product / brand name → `product`
- Verb (كابشن / إعلان / صفحة / موقع / خطة) → `goal` + suggested write/plan subcommand
- CTA phrases → `cta`
- Audience age/city → `audience` / `market`

Do **not** invent product name, price, or legal claims — leave `""` and ask.

---

## Path B — Guided pickers (one at a time)

Ask **exactly one** question per message. Accept `A`/`B`/`C`, `skip` (◆ default), `back`.

### B1 — Goal / deliverable
| Key | Label | Sets |
|-----|--------|------|
| **A** ◆ | كابشنز سوشيال | `goal: social captions` → write `caption` |
| **B** | إعلان / Ads | `goal: ad copy` → write `ad` / platform |
| **C** | صفحة / لاندنج | `goal: landing page` → write `landing`/`page` |
| **D** | موقع متعدد الصفحات | `goal: multi-page website` → `plan website` |
| **E** | سكريبت / يوتيوب | `goal: video script` → write `video` |
| **F** | تاني… | short free text → `goal` |

### B2 — Dialect
| Key | Sets `dialect` |
|-----|----------------|
| **A** ◆ | masri |
| **B** | ksa |
| **C** | khaliji |
| **D** | levantine |
| **E** | msa / white-dialect |
| **F** | من config.yaml إن وُجد |

### B3 — Market
| Key | Sets `market` |
|-----|----------------|
| **A** ◆ | egypt |
| **B** | ksa |
| **C** | uae |
| **D** | pan-gulf |
| **E** | levant |
| **F** | تاني… |

### B4 — Platform *(skip if goal has no platform)*
| Key | Sets `platform` |
|-----|-----------------|
| **A** ◆ | instagram |
| **B** | meta / facebook |
| **C** | tiktok |
| **D** | linkedin |
| **E** | youtube |
| **F** | none / multi |

### B5 — Audience *(single)*
| Key | Sets `audience` (starter text; user can refine) |
|-----|------------------|
| **A** ◆ | مستخدمي موبايل ١٨–٣٥ |
| **B** | آباء / عائلات |
| **C** | مطورين / فرق AI |
| **D** | أصحاب قرار B2B |
| **E** | تاني… |

### B6 — Tone pack *(single)*
| Key | Sets `tone` |
|-----|-------------|
| **A** ◆ | ودود قريب · L2–L3 |
| **B** | وكالة واثقة · L3–L4 |
| **C** | جريء فكاهي · L2 |
| **D** | رسمي منسّق · L4–L5 |
| **E** | من voice.md |

### B7 — Count / CTA / product *(compact)*
Ask **one** multi-line prompt only here (or 3 mini-pickers if user hates typing):

```markdown
كمّل بسرعة (أو اكتب skip للقيم الافتراضية):
1) product: …
2) count: (افتراضي 3)
3) cta: …
```

### B8 — Language order *(single)* — skip if `--lang-order` / `--lang` set
Load `references/bilingual-pipeline.md` for dual-language website/UI goals.

| Key | Sets |
|-----|------|
| **A** ◆ | `lang_order: ar_en` · `languages: [ar, en]` |
| **B** | `lang_order: en_ar` · `languages: [en, ar]` |
| **C** | `languages: [ar]` only |
| **D** | `languages: [en]` only |

For single-locale social captions, default **C** without asking unless the user mentioned English.

### B9 — Slug / filename
| Key | Behavior |
|-----|----------|
| **A** ◆ | Auto slug from goal+product (`instagram-captions-fitzcairo.yaml`) |
| **B** | هسمّيه أنا… |

Then show YAML preview → confirm → save.

---

## Path C — From file / URL

1. Read file or fetch URL main copy (reference only).
2. Infer `goal`, `audience`, `tone`, `dialect`, `product` from evidence.
3. Same preview → confirm → save.
4. Put unresolved bits in `notes:` as questions for the later write.

---

## Brief schema (canonical)

Write this shape unless the goal needs extensions (page briefs may add `route`, `sections`, `seo_*`):

```yaml
# .arabic/briefs/{slug}.yaml — generated by /arabic brief
dialect: masri
market: egypt
goal: social captions
platform: instagram
product: ""
audience: ""
tone: ""
count: 3
cta: ""
lang_order: ar_en          # or en_ar; omit if single-locale
languages: [ar]            # or [ar, en] / [en]
notes: ""
source: human-nl | guided | file | url
created: YYYY-MM-DD
suggested_command: "/arabic write caption --brief .arabic/briefs/{slug}.yaml"
```

**Optional extensions** (when goal says so):
- Page: `route`, `sections`, `primary_cta`, `seo_title`, `seo_description`, `positioning`
- Plan: `project_type: website|campaign|book|series|brand`
- Voice hint: `voice: .arabic/voice.md` if user wants write to load voice
- Bilingual website: always set `lang_order` + `languages` per `bilingual-pipeline.md`

---

## Save protocol

1. Ensure `.arabic/briefs/` exists.
2. Slug: lowercase ascii, hyphens, ≤48 chars; no spaces.
3. If file exists → ask replace / new name.
4. Write UTF-8 YAML.
5. Reply:

```markdown
✓ Saved `.arabic/briefs/{slug}.yaml`

Next:
/arabic write caption --brief .arabic/briefs/{slug}.yaml --dialect masri

Or open guided write without flags — brief already has dialect/platform.
```

With `--yes`: skip final confirm if preview was already shown once in-session.

---

## `/arabic brief show`

- No slug: list `*.yaml` in `.arabic/briefs/` (name + `goal` line if present).
- With slug: print file contents.

---

## Flags

| Flag | Purpose |
|------|---------|
| `--name <slug>` | Force filename (without `.yaml`) |
| `--out <path>` | Full output path (default under `.arabic/briefs/`) |
| `--dialect <name>` | Prefill dialect; skip that picker |
| `--goal <target>` | Prefill goal (`caption`, `ad`, `page`, `website`, …) |
| `--yes` | Skip final save confirm |
| `--file <path>` | Path C input |
| `--lang-order ar_en\|en_ar` | Prefill B8; skip that picker |
| `--lang ar\|en\|ar,en` | Prefill `languages`; imply order when dual |

---

## Quality bar

**PASS:** Valid YAML · required fields present or explicitly empty with note · suggested_command runs clean · user answered with letters where guided  

**FAIL:** Invented product facts · overwrite without ask · questionnaire dump (all Qs at once) · saving outside `.arabic/briefs/` without `--out`

---

## Related

| Command | Role |
|---------|------|
| `/arabic init` | Scaffold `.arabic/` |
| `/arabic voice save` | Brand voice (not the job brief) |
| `/arabic write … --brief` | Consume the brief |
| `/arabic plan … --brief` | Staged projects |
| `/arabic improve` | Rewrite existing copy (not brief creation) |

---

## Loading order

1. This file  
2. `.arabic/config.yaml` for defaults if present  
3. `voice.md` only when user picks “from voice” tone  
4. Do not load full engines during brief creation  
