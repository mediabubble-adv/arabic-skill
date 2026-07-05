# Execution Engine Reference

Apply the matching engine before generating any content. Engines can be combined.

---

## ⚡ Hybrid Engine Routing Table

When two engines apply simultaneously, use this table to decide synthesis order and output structure.

| Task Combination | Primary Engine | Secondary Engine | Synthesis Rule |
|---|---|---|---|
| Blog post for SEO + AEO | SEO Engine | AEO Engine | First paragraph = direct AEO answer. Body = SEO development. FAQ at end serves both. |
| Social media launch (brand + captions) | Brand Voice Engine | Captions Engine | Build voice guide first. Captions inherit vocabulary and tone restrictions from the guide. |
| VSL (sales + video) | Sales Content Engine | Video Script Engine | Sales page structure governs content skeleton. Video Script Engine governs timing and delivery format. |
| Campaign (ad agency + captions) | Marketing Funnel Engine | Captions Engine | Funnel strategy defines message hierarchy. Captions are platform-native executions per funnel stage. |
| Website with SEO | Website Content Engine | SEO Engine | H-tag structure from SEO Engine. Copy body from Website Engine. |
| Book + author platform | Book Engine | Brand Voice Engine | Author voice defined first. Book written in that voice. Platform content inherits author's signature phrases. |
| Pitch deck / proposal | Sales Content Engine | Book Engine | Sales psychology governs message order. Long-Form Engine governs narrative structure. |

---

## 🌐 Website Content Engine

Full page copy — not just headlines but the complete persuasive structure of each page.

### Page Structures

**Home Page:**
- **Hero section:** Problem (in the reader's exact words) + Promise (what changes after working with you). H1 + H2 + CTA.
- **Social proof strip:** Logos or numbers — make it scannable, make it big. Arabic readers trust credentials.
- **Core value proposition:** Why you, vs. every competitor. 3 benefit statements, not feature lists.
- **Feature/service sections (3 max):** Icon + Benefit headline + 2-sentence expansion.
- **CTA section:** Repeat the promise. One action only. Remove all escape routes.

**About Us Page:**
- Opening with a founding conflict (not "we started in 2010...") — what problem made this company necessary?
- Mission statement in plain Arabic, not corporate language.
- Team humanization section: real names, real photos context, one personal detail per person.
- "Why us and not anyone else" — direct, not defensive. Written to the reader, not about the company.

**Services Page:**
- Each service as: Name → One-line promise → 3 benefits (not features) → Mini CTA.
- No bullet-point feature dumps. Arabic readers buy outcomes, not specifications.
- Price transparency: in Gulf/KSA markets, showing price increases trust. In Egypt/Levant, "request quote" is more common.

**FAQ Page (AEO-ready):**
- Every answer begins with the answer — the question is the H3, the first sentence is the direct answer.
- Minimum 8 questions. Written in the exact language users actually ask in — colloquial where appropriate.
- Never start an answer with "Great question!" or any filler.

**Contact Page:**
- Include one trust-reinforcing line that removes hesitation: "بنرد خلال 24 ساعة" or "تواصل مباشرة على واتساب."
- Multiple contact paths: WhatsApp is primary in most Arab markets, then email, then form.

### Arabic Website Copy Rules
- Arabic readers trust pages that lead with credibility signals: years of experience, number of clients, certifications.
- Religious/cultural phrases (بإذن الله، على بركة الله) are common and trust-building in KSA/Gulf — use them contextually, not in every sentence.
- Arabic navigation labels: "من نحن" not "عنّا" for formal brands. "تواصل معنا" not "اتصل بنا" for WhatsApp-heavy markets.
- Mobile-first: 70%+ of Arab web traffic is mobile. Keep paragraphs under 3 lines on mobile.

---

## 🔍 SEO Engine

**Before writing:** Map keywords first.
- Primary keyword (1) — in exact dialect/language variant
- Secondary keywords (3–5) — related queries
- LSI terms (2–3) — semantically connected concepts that appear naturally

**H-tag structure:**
- H1: Singular, contains primary keyword, never a question for H1
- H2: Section topics — each one a keyword variant or question
- H3: Sub-topics or FAQ answers
- Never skip heading levels

**Meta tags:**
- Title: 55–60 characters, primary keyword in first 35 characters, implicit CTA at end
- Description: 150–160 characters, primary keyword, benefit statement, soft CTA
- For Egyptian/KSA markets: the same concept often has different search volumes in colloquial vs. MSA — flag this and write variants

**Content rules:**
- Keyword density: 1–2%. Write for humans first, search engines second.
- Answer the search intent in the first paragraph. Don't make the reader scroll to find the answer.
- Structure: Introduction (hook + promise) → Section 1 → Section 2 → Section 3 → Conclusion with CTA
- Word count target: Informational = 1200–2000 words. Transactional = 600–900 words. Pillar page = 2500+ words.

---

## 🤖 AEO Engine — Answer Engine Optimization

AEO optimizes Arabic content to be cited and quoted by AI search engines: Perplexity, ChatGPT Search,
Google AI Overviews, Microsoft Copilot. The writing style is fundamentally different from SEO.
You are writing for a machine that extracts and quotes sentences, not a human who reads the full page.

**Core AEO principles:**

1. **Direct Answer First:** Every section must open with a direct, one-sentence answer to the implied question. Expand after. Never bury the answer.

2. **Question-as-heading structure:** Write H2s and H3s as the exact question a user would type into an AI search box. Example: "ما هي أفضل أدوات تسويق المحتوى للسوق المصري؟"

3. **Entity-rich writing:** Name real brands, real people, real platforms, real places. AI engines prefer citable facts over generalizations. "تطبيق Canva يعتبر من أكثر الأدوات استخداماً" is citable. "هناك أدوات كثيرة" is not.

4. **Numbered lists and tables:** These get extracted directly into AI summaries. Any process, ranking, or comparison belongs in a list or table, not in paragraph prose.

5. **FAQ sections are AEO goldmines:** Structure each FAQ entry as: [Question as H3] → [Direct 1-sentence answer] → [2–3 supporting sentences]. AI engines pull from FAQ sections more than any other format.

6. **Sentence simplicity:** AI engines with weaker Arabic language models (which is most of them) cite simpler, clearer sentence structures more reliably. Clean MSA or very light dialect gets cited more than complex stylistic writing. When the goal is AEO, choose clarity over elegance.

**Intake-specific question for AEO:** What exact question does your audience type into Perplexity or ChatGPT? That question = the H1. Write the answer to that question in the first paragraph.

**Arabic AEO challenge to flag:** Arabic NLP is still weaker than English in most AI engines. Your content competes against English content for AI citations. Structured, factual Arabic that uses consistent spelling (no dialect variation in headings) will outperform poetic or stylistic content for citation purposes.

---

## 📣 Marketing Funnel Engine

The Arab consumer journey is shaped by: **trust (ثقة)** → **social proof (الناس بتقول)** → **family/community impact** → **honor/shame dynamics** → **FOMO (عرض محدود)**.
Address trust before addressing price. Always.

**Full funnel sequence:**

1. **Awareness Ad (ToFu):** Pattern interrupt hook + problem agitation. No product mention in the first 3 seconds/lines. → 3 variants per dialect.
2. **Consideration Content (MoFu):** Education + social proof (testimonials from same region as target audience). → Blog post, video, or carousel.
3. **Landing Page (MoFu/BoFu):** AIDA structure — Attention (hook) → Interest (problem expansion) → Desire (vision of transformation) → Action (single CTA). Trust signals: certifications, client logos, guarantees, refund policy.
4. **Email/WhatsApp Sequence (5-part):** Welcome → Value delivery → Social proof → Urgency → Follow-up. WhatsApp messages: 150 words max, conversational, always end with a question.
5. **Retargeting Ad:** Address the specific objection the person had (based on which page they exited). Never just repeat the original ad.

Label every piece with: stage, psychological lever activated, and next step in the sequence.

**For narrative-driven funnels:** Load `storytelling.md` — selects narrative device per archetype (Proverb, Hakawati, Nested, We-Arc, Honor-Restoration) and applies dialect-specific pacing (Masri punchline, Levantine lyrical, Gulf dignified).

---

## 💰 Sales Content Engine

Sales converts desire that marketing created. Different psychology, different structure.

**Sales Page (Long-form):**
- **Opening:** The promise in the reader's exact language (not your language)
- **Problem section:** Name the pain with precision. The reader should feel seen, not sold to.
- **Agitation:** Make them feel the cost of NOT solving this problem
- **Solution introduction:** Introduce the offer softly — through transformation, not features
- **Features-as-benefits:** Every feature must link to a human outcome. Format: "[Feature] so that [Benefit]"
- **Social proof stack:** Testimonials ordered by: most relatable → most impressive. Same region as reader.
- **Objection handling:** Name the top 3 Arab buyer objections directly: trust, price, timing. Address each.
- **Guarantee:** Reduces risk. In Gulf markets, a guarantee increases conversion more than a discount.
- **CTA:** One action. One button. No escape routes. Urgency must be real, not manufactured.
- **FAQ (AEO-ready):** Bottom of page. Addresses remaining objections.

**Arab-specific sales psychology:**
- Trust barrier is higher than in Western markets. The brand must demonstrate they understand the region before it can sell.
- Community endorsement outperforms celebrity endorsement. "2500 عميل من السعودية" > a famous name.
- WhatsApp CTA converts higher than email CTA in most Arab markets. Use it.

**For narrative-driven sales copy:** Load `storytelling.md` — founder story, testimonial arc, honor-restoration before/after. Pairing archetype to narrative device elevates credibility and emotional resonance.

**VSL (Video Sales Letter) Script:**
- Hook (0–10 sec): Start with a painful or shocking truth, not a greeting.
- Problem (10–60 sec): Tell their story back to them.
- Solution introduction (1–3 min): The product arrives as a relief, not a pitch.
- Proof (3–5 min): Before/after, testimonials, results.
- Offer reveal: Price last, after value has been built.
- CTA: Single. Clear. Urgent.

**Cold Outreach (WhatsApp/Email/DM):**
- First line must be personalized — reference their country, their industry, a recent post, or a specific result.
- Never open with "أنا X، شركتنا تقدم Y." Open with their problem.
- Maximum 5 sentences in the first message. Always end with one simple question.
- Follow-up rule: 3 follow-ups maximum. Each one adds value, never just "just checking in."

---

## 🎬 Video Script Engine

A video script is spoken, not read. It has timestamps, breath points, and a retention architecture.
Dead air in the first 7 seconds kills the algorithm. There are no "أهلاً وسهلاً" openings here.

**Script structure with timestamps:**

```
[0–7 sec] HOOK
Pattern interrupt. Start in the middle of the action. A shocking fact, a counterintuitive claim,
or a direct question. The audience decides in 3 seconds whether to keep watching.
NOT: "أهلاً وسهلاً بيكم في قناتي..." → This kills retention.
YES: "في 2024، 80% من المشاريع الصغيرة في مصر فشلت بسبب سبب واحد..."

[7–20 sec] PROMISE
Tell them exactly what they'll get by watching until the end.
"لو كملت الفيديو ده لآخره، هتعرف..."

[20–90 sec] PROBLEM AGITATION
Make them feel the pain before offering the solution.
Use the dialect's natural storytelling rhythm — no bullet points in spoken word.

[90 sec – X min] CONTENT BODY
Numbered beats. Every major point gets a transition phrase native to the dialect.
Masri: "طب والنقطة التانية..." / Khaliji: "وثاني شيء..." / Shami: "والشغلة التانية..."

[Sponsor read — mid-video, NOT end]
Transition: "قبل ما أكمل معكم، ..." → Product integration → Back to content.
Never apologize for the sponsor. Present it as a relevant recommendation.

[Last 30 sec] CTA
One action only — not "like, subscribe, comment, and share." Pick one.
End with a question to drive comments: "ايه رأيكم في..." / "اكتبوا في الكومنتس..."
```

**Word count guidance:**
- Arabic spoken delivery: ~130–150 words/minute (slower than English due to longer vowels and pausing).
- 5-minute video ≈ 650–750 words of spoken script.
- 8-minute video ≈ 1050–1200 words of spoken script.
- 15-minute video ≈ 2000–2200 words of spoken script.
- Use these as calibration anchors — a script that reads in 3 minutes will play in 4.5 minutes when spoken naturally.

**Spoken-word rhythm rules:**
- Sentences must be short enough to say in one breath.
- Vary pace: slow down on the most important point, speed up during energy-building sections.
- Place the most culturally resonant phrase at a natural pause point — it lands harder in silence.
- The thumbnail copy and video title are part of the deliverable — they set the viewer expectation.

**Recap section (mandatory for 5+ minute videos):**
Add a [Last 60–90 sec before CTA] RECAP section. Numbered summary of every key point covered.
This is not filler — it drives retention metrics, re-engages viewers who zoned out, and reinforces the core message before the CTA.
Format: "خلاصة سريعة: أولاً… ثانياً… ثالثاً…"

**YouTube description deliverable:**
The full script output must include a **YouTube Description** block with:
- First 150 chars: hook sentence + primary keyword (this is what appears in YouTube search)
- Chapter timestamps matching the script sections (0:00 Hook, X:XX Tip 1, etc.) — these improve SEO ranking and viewer navigation
- 3–5 hashtags at the end (Arabic + English mixed)

**Output format:** Two columns — Spoken Arabic Script / [Stage Direction: camera, pause, cut, B-roll cue]

---

## 📸 Captions Engine

Platform-native captions. Not "social media content" — the exact format for each platform's culture.

### Instagram
- **Visible text:** First 125 characters matter most — hook must land before "more" is tapped.
- **Structure:** Hook (emotional or curiosity) → Story or value → CTA.
- **Hashtags:** Block at the end, separated by line breaks. 5–15 hashtags. Never in the caption body.
- **Arabic Hashtag Strategy:**
  - If web search is available: check current trending hashtags for the target country this week.
  - If web search is unavailable: use the Evergreen Hashtag System below. Note in the output: "Hashtag trends require live verification before publishing."
  - Mix rule: 5–15 total. Split: 3 branded (#BrandName) + 4 category + 4–8 market-specific.

**Evergreen Hashtag Categories by Market (fallback when live search unavailable):**

🇪🇬 Masri / Egypt:
- Community: #مصر #القاهرة #الإسكندرية
- Content: #محتوى_عربي #تسويق_رقمي #ريادة_الأعمال
- Platform: #انستقرام_عربي #تيك_توك_مصر
- Add 2–3 industry-specific hashtags based on the domain

🇸🇦 KSA:
- Community: #السعودية #الرياض #جدة
- Vision alignment (when relevant): #رؤية_2030 #صنع_في_السعودية
- Content: #محتوى_سعودي #تسويق_سعودي
- Add 2–3 industry-specific hashtags based on the domain

🇦🇪 UAE / Gulf:
- Community: #الإمارات #دبي #أبوظبي #الخليج
- Content: #محتوى_خليجي #بيزنس_خليجي
- Add 2–3 industry-specific hashtags based on the domain

🌍 Pan-Arab:
- Base: #محتوى_عربي #العالم_العربي #عرب
- Always pair with 3–4 country-specific hashtags for the target market.
- **Emoji use:** As visual bullets or emphasis — not decoration. Max 1 per idea.
- **Carousel captions:** Short — the content is in the slides. Caption = why should I swipe?

### TikTok
- Caption is secondary to audio and visuals — it reinforces the hook, not replaces it.
- 3–5 hashtags max. Trending sound note: if applicable, mention which audio trend this should use.
- Caption tone: ultra-casual, same as how they speak. Abbreviations are fine.
- Arabic TikTok by region: Masri and Khaliji dominate Arabic TikTok. Adapt to platform demographics.

### LinkedIn (Arabic)
- Near-MSA or very light Masri — professional but warm, never stiff.
- Structure: Personal story hook → Professional insight → Takeaway → Soft CTA.
- No hashtag overload — 3–5 max, integrated into the post, not a block at the end.
- Personal narratives consistently outperform "thought leadership" on Arabic LinkedIn.
- Character range: 800–1200 characters performs best.

### X / Twitter (Arabic)
- **Thread:** First tweet is a standalone hook — it must be worth reading even if they don't click "show more."
- Number all thread tweets: ١/ ٢/ ٣/ — Arabic-numeral numbering reads more naturally.
- **Standalone tweet:** 200–280 characters. If you need more, thread it.
- Masri Arabic dominates Arabic Twitter. Khaliji is second. Know your audience.

### YouTube (Video Description)
- First 150 characters appear in search results and channel page — keywords + hook must be here.
- Include primary keyword in sentence 1.
- Structure: Hook paragraph → Chapter timestamps (if applicable) → Links → Hashtags.
- Arabic descriptions: MSA or near-MSA performs better for SEO in Arabic YouTube search.

### Snapchat
- Hyper-casual Khaliji or Masri.
- Caption is brief — the visual carries the message. 1–2 sentences max.
- Emoji-heavy is expected. Urgency is native to the format ("لازم تشوف" / "لحظي").
- Stories-first: captions on Snapchat are often overlaid on images — keep them short enough for mobile overlay.

### WhatsApp Broadcast
- Format: announcement into a named community — not a personal conversation.
- 150 words max per message. Long Broadcast messages get left on read.
- No links requiring immediate clicking — use short URLs or QR codes offline.
- Personal opener even in broadcast: name the community ("أهل [Brand Name]" or "يا جماعة الخير").
- Always end with one clear question or one concrete action — not both.
- Emojis: 2–3 max per message, functional (✅ = done, 🔗 = link, 📌 = important) not decorative.
- Arabic WhatsApp dominant in: Egypt, KSA, UAE, Kuwait, Morocco, Jordan — primary CTA channel in all.

### Telegram Channels
- Arabic Telegram dominant in: Iraq, Levant (Syria / Lebanon / Jordan), and Arab diaspora communities.
- Posts can be 300–800 words — Telegram is a reading platform, not a scrolling platform.
- Pin the most important message — drafting pinned messages requires the same care as a headline.
- Register: more formal than TikTok, less formal than LinkedIn. Authoritative but human.
- Hashtags in Telegram: used as navigation tags (same hashtag = same topic thread), not discovery. 1–3 per post, consistent.
- Formatting: Telegram supports **bold**, _italic_, and `code` — use bold for the key takeaway per paragraph.

### Threads
- Growing Arabic presence — Masri dialect dominates Arabic Threads (2024–2025).
- Casual, conversational, opinion-led content outperforms promotional content here.
- Thread format: Hook post → 3–5 development posts → Summary/takeaway post.
- Arabic Threads culture: Masri sarcasm and social observations are the top-performing content type.
- 500 characters per Thread post — write tight, cut ruthlessly.
- Cross-post strategy: X/Twitter threads repurposed for Threads need tone adjustment — Threads is warmer and less political than Arabic X.

**Caption voice consistency test:** Paste 10 captions from the same account side by side.
They should sound like the same person. If they don't, the brand voice is not locked.

---

## 🏷 Tagline Engine

Taglines are a distinct craft. Different rules from ad copy, captions, or website content.

### 3 Tagline Types

**Campaign Tagline (temporal — lives for 60–90 days):**
- Tied to a specific moment, emotion, or promotion.
- Emotional spike over brand permanence. Urgency is acceptable.
- Example register (Masri): "خلي الحلم أكبر منك" / "إنت اللي فارق"

**Brand Tagline (permanent — lives for years):**
- Defines identity, not a product or promotion.
- Must work without the brand name. Must survive translation. Must mean something said aloud.
- Example register (Khaliji): "من هنا، بدأ الفرق" / "على قدر الكبار"

**Product Tagline (feature-focused):**
- Communicates what the product does and why it matters in 5–8 words.
- Benefit-led, not feature-led. "X so that Y" collapsed to 6 words.
- Example: "تصوير احترافي. بضغطة وحدة." / "صوتك، بوضوح جديد"

### Arabic Phonetic Rules for Taglines
- **السجع (rhyming cadence):** Arabic taglines with internal rhyme are remembered longer. Aim for it when natural — never force it.
- **الجناس (alliteration or word play):** Double meanings or sound-alike words are a sign of craft in Arabic copywriting. If it exists, use it.
- **Spoken-aloud test:** Every tagline must be tested by speaking it at normal pace. If it's hard to say, it's wrong.
- **Length:** 3–7 words is the Arabic tagline sweet spot. Under 3 is often ambiguous; over 8 is forgettable.

### Tagline Deliverable Format
Always deliver: 12 variants (3 tiers of 4), not a single tagline. Present them in tiers:
- **Tier A (Bold / Direct):** 4 options
- **Tier B (Emotional / Story):** 4 options
- **Tier C (Playful / Unexpected):** 4 options

Include for each: the tagline in Arabic → its English meaning (not translation) → which psychological lever it activates → pass/fail on: memorable after 24h? / works without brand name? / sounds right aloud?

---

## 🎙 Brand Voice Engine

The brand voice guide governs everything else. Build it once. All future content inherits from it.

### Brand Voice Intake (from Workspace 2 — run those 5 questions first)

### Brand Voice Document Structure

**1. Voice Dimensions:**
Map the brand on 4 axes. Mark where it sits:
- Formal ←——●———→ Casual
- Warm ←———●——→ Professional
- Bold ←——●———→ Subtle
- Serious ←———●——→ Playful

**2. Sounds Like / Never Sounds Like Table:**
| Sounds Like | Never Sounds Like |
|---|---|
| [6 example sentences in brand voice] | [6 example sentences that violate brand voice] |
Each sentence must be a real, complete sentence — not a vague adjective like "warm" or "confident."

**3. Brand Vocabulary List:**
- 10 words this brand owns and uses consistently
- 10 words this brand avoids (and why)
- 5 power phrases (recurring expressions unique to this brand)

**4. Dialect & Register Rules:**
- Primary dialect: [locked in]
- When to shift to MSA: [only for X and Y contexts]
- Use of religion/culture markers: [yes/conditional/no — specify]
- Use of humor: [type, frequency, limits]

**5. Brand Voice in Action — 6 Content Samples:**
Write the same piece of information in brand voice across 6 formats:
- Instagram caption
- LinkedIn post
- WhatsApp message to a prospect
- Error message (UI copy)
- Email subject line
- CTA button

These 6 samples become the North Star for all future content produced for this brand.

---

## 📖 Long-Form / Book Engine

Split into two distinct tracks. Identify the track before outlining.

### Track A: Non-Fiction

**Non-fiction structures (choose based on book type):**

- **Business book:** SCQA framework — Situation → Complication → Question → Answer. Every chapter is a mini-SCQA.
- **Self-development book:** Transformation arc — Who the reader is now → The limiting belief to break → The new framework → Who they become. Apply per chapter.
- **How-to / Educational:** Problem → Method → Application → Proof → Action step. Numbered chapters that build on each other.

**Chapter structure template (non-fiction):**
1. Opening hook: A story, a statistic, or a counterintuitive claim
2. Concept introduction: What this chapter teaches, in one sentence
3. Expanded argument: Evidence, examples, case studies
4. Arabic cultural application: How this applies specifically in Arab context
5. Framework or tool: Something the reader can use immediately
6. Key takeaways: 3–5 numbered bullet points (Arabic readers love numbered takeaways)
7. Chapter bridge: Last sentence creates a question answered in the next chapter

**Chapter word targets:** 2000–3500 words for business/self-dev. 1500–2500 for educational how-to.

**Arabic publishing conventions:**
- Saudi publishers prefer MSA, no dialect in body text.
- Egyptian publishers accept light Masri in self-dev and personal narrative.
- Lebanese publishers are the most permissive with hybrid MSA/Levantine.

### Track B: Fiction

**Story structures:**
- **Three-Act Structure:** Setup → Confrontation → Resolution. Classic, works for most genres.
- **Hero's Journey:** Call → Trials → Transformation → Return. Best for epic and coming-of-age narratives.
- **Non-linear / 1001 Nights style:** Nested storytelling — story within a story. Native to Arab narrative tradition.

**Chapter pacing rule:** Every chapter must end with an open loop — a question unanswered, a revelation half-given, or a conflict unresolved. This drives the reader forward.

**Dialect dialogue rule:**
- The narrator speaks in a consistent register (usually near-MSA or elevated dialect).
- Each character's dialect is their identity — never let it bleed into another character's voice.
- A Masri character doesn't suddenly use Khaliji expressions. A peasant doesn't suddenly speak like a professor.
- Write a character dialect sheet before writing any dialogue: list 5 expressions, 3 habits, and 1 speech quirk for each major character.

**Chapter word targets:**
- Thriller / YA: 800–1500 words (short chapters maintain pace)
- Literary fiction: 2000–4000 words (depth over pace)
- Historical / epic: 3000–5000 words (world-building demands space)

**Arabic genre conventions to know:**
- Religious fiction: Characters must be morally coherent. Sin can appear but must carry consequence.
- Historical fiction: Research accuracy is expected. Readers will catch anachronisms.
- Romantic fiction: Physical descriptions are suggestive, not explicit in most Arab markets. Emotional intimacy is the main currency.

### Series Planning
- Book 1 must standalone. The series question (what overarching mystery/journey spans the series?) must be introduced but not answered.
- Character arcs: Map each major character's arc across all planned books before writing Book 1.
- Arabic series naming: The series name and book titles should work in Arabic numerically or thematically (لا يُنسى الجزء الأول، الجزء الثاني، etc.)

---

## 🖥 UI/UX Microcopy Engine

**Character limits (Arabic):**
- H1 (Hero Headline): 40–60 characters max
- H2 (Section Header): 30–50 characters
- CTA Button: 15–25 characters
- Tooltip / Helper Text: 60–80 characters
- Error Message: 40–60 characters — never blame the user
- Notification copy: 80 characters max
- Meta Title: 55–60 characters

**Arabic UI rules:**
- Arabic is 20–30% longer than English. Validate all char limits in the Arabic version, not the English.
- RTL reading: Users scan right-to-left. Lead with the most critical word — avoid starting with articles (ال) on primary CTAs.
- Error messages: Be specific, not vague. "حدث خطأ" is useless. "الرقم المُدخل غير مكتمل — يجب أن يكون 11 رقمًا" is helpful.
- Empty state copy: Should feel human, not like a system message. "لا توجد نتائج بعد — ابدأ بإضافة..." not "No results found."
- Onboarding copy: Benefits-first, not instructions-first. "شوف كيف تكسب أكثر" not "يمكنك عرض تقاريرك هنا."
- App Store (ASO): Title = keyword + brand. First line of description = single strongest benefit, no filler.

---

## 🗓 Content Planner Engine

Use before any multi-piece content project. Activates when the user asks for a "content plan,"
"content calendar," "editorial calendar," "content strategy," or when a task involves 4+ pieces.
Forces strategic structure before execution — never write before the plan is approved.

### When to activate
- "عايزني أعمل خطة محتوى" / "content plan" / "content strategy"
- Task involves 4 or more content pieces
- Book or long-form project needs a MECE outline before prose begins

### Output: Content Calendar

```
📅 CONTENT PLAN: [Brand/Project Name]
Period: [Duration]
Dialect: [Locked]
Goal: [KPI or transformation — e.g., grow followers 20%, drive 50 leads, launch product]

| # | Type | Platform | Topic | Psychological Lever | Target Date |
|---|---|---|---|---|---|
| 1 | [Reel / Post / Article...] | [Platform] | [Topic] | [e.g., Curiosity / FOMO / Social proof] | [Date] |
| 2 | ... | ... | ... | ... | ... |

🔁 Content Clusters: [Group related pieces that reinforce each other — e.g., "Week 1 = Authority"]
📌 Pillar Content: [The 1–2 cornerstone pieces everything else links to or supports]
⚡ Production Priority: [Which 3 pieces to produce first if budget/time is limited]
```

### Output: MECE Outline (for books or long-form series)

Build this BEFORE writing any prose. Present to user for approval before drafting.

```
📖 MECE OUTLINE: [Project Title]
Core Transformation: [Reader/audience at the start] → [Reader/audience at the end]

Part 1: [Title] — [What this part establishes]
  1.1: [Section Title] | Purpose: [Core argument] | Key point: [One sentence]
  1.2: [Section Title] | Purpose: [Core argument] | Key point: [One sentence]

Part 2: [Title] — [What this part establishes]
  ...

Total planned pieces/chapters: [X]
Completeness check: Does any topic in the transformation go unaddressed? [Yes/No — flag if yes]
```

---

## 📁 Additional Content Modes

### Conversation Scripts
For live conversation scripts (sales calls, customer service, coaching, podcasts, negotiation, community),
load the appropriate file from `conversations/` before applying any engine.
See `references/INDEX.md` for the full directory listing.

### Professional Documents
For contracts, AI skill files, agent instructions, subagent rules, or compliance copy,
load the appropriate file from `professional-docs/` and use Template F.
See `references/INDEX.md` for the full directory listing.

---

## 🧭 Project Mode Engine

Use for websites, campaigns, editorial systems, books, and any long-form deliverable that needs staged execution.

### Core behavior
- Clarify scope before writing
- Recommend a direction before drafting
- Plan the full structure before producing pieces
- Write in dependency order
- Test the whole bundle for continuity before delivery

### What it must do
- keep a continuity ledger across all pieces
- preserve register and dialect consistency
- mark assumptions explicitly when evidence is thin
- prefer staged outputs over one-shot generation

### What it must not do
- one-shot a website, campaign, or book
- invent facts about a real product or repo
- jump to drafting before the plan is approved

### Output pairing
- For recommendation phases, use `references/output-templates.md` Template H
- For plan phases, use `references/output-templates.md` Template I
- For evidence-grounded repo tasks, pair with `references/project-context-scanner.md`

---

## 🤖 Prompt Coach Engine

Use when the user asks for help improving a weak Arabic prompt or wants to brief better.

### Core behavior
- diagnose what is missing or unclear
- rewrite the prompt into stronger variants
- explain why the upgraded version is better
- preserve the user’s intent while making it actionable

### What it must do
- offer beginner, standard, and pro versions when useful
- show the key prompt structure in Arabic
- keep examples short and practical

### What it must not do
- rewrite the prompt without explaining the improvement
- assume hidden context that the user did not provide
- overcomplicate simple prompt repairs

---

---

## 💻 Dev-Tech / Project Explanation Engine

Use for GitHub READMEs, docs, tutorials, API explanations, changelogs, and project-aware Arabic summaries.

### Core behavior
- read visible evidence first
- keep code and identifiers in English
- explain behavior in the right Arabic register
- separate confirmed facts from inference

### What it must do
- use `references/project-context-scanner.md` for real repos
- produce install/use/tutorial copy grounded in docs and scripts
- state unknowns instead of inventing features

### What it must not do
- expose secrets, tokens, or private files
- claim support that the repo does not show
- translate code syntax unnecessarily
