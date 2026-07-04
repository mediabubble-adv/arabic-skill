# 📣 Ads Service Matrix — Arabic Paid Media by Platform

**Load when:** Any paid-ad task, `/arabic plan campaign`, or a multi-channel ad brief.
**Pair with:** `domains/ads-media.md` (Egyptian paid-media psychology), `references/seasonal-calendar.md` (timing), the target `dialects/` file, and `references/taboos.md` (mandatory pre-delivery scan).

> Character limits below are the **practical Arabic limits** — Arabic glyphs render wider and RTL truncation cuts the *start* of the line in some placements, so write the hook to survive truncation. Always front-load meaning.

---

## 1. Platform Matrix (at a glance)

| Platform | Funnel role | Register | Hook window | Primary CTA |
|---|---|---|---|---|
| Meta (FB/IG) | Full funnel — discovery → conversion | L2–L3 | First line / first 1.5s video | اطلب / اعرف أكتر / كلّمنا |
| Google Search | High-intent capture | L3–L4 | Headline 1 | احجز / اطلب / اتصل |
| Google Display / Demand Gen | Awareness + retargeting | L2–L3 | Image + short headline | اكتشف / جرّب |
| YouTube | Awareness + consideration | L2–L3 | First 5s (pre-skip) | اعرف أكتر |
| TikTok | Discovery, virality | L1–L2 | First 2s, native feel | اطلب دلوقتي |
| Snapchat | Impulse, KSA-strong | L2 | Vertical full-screen, 1s | اسحب لأعلى |
| LinkedIn | B2B authority | L4 | Intro line before "…see more" | حمّل / احجز عرض |
| WhatsApp (click-to-chat) | Closing, retargeting | L2–L3 | Opening message | ابعت "مهتم" |

---

## 2. Per-Platform Specs

### Meta — Facebook & Instagram
- **Formats:** Feed image/video, Reels, Stories, Carousel, Collection, click-to-WhatsApp.
- **Limits (official recommended):** Primary text **125** chars; headline **40**; description **25–30**. Reels/Stories overlay ~**72** chars practical. FB Feed headline often truncates at **~27** on mobile.
- **Hook logic:** The first line *is* the ad. Lead with tension, a number, or a direct address — never the brand name.
- **CTA behavior:** One CTA per ad. In Egypt, click-to-WhatsApp out-converts on-platform forms for SMEs.
- **Egyptian audience:** Facebook still dominates 30–50 demo; Reels reach Gen Z. COD + WhatsApp = trust. Comments are a sales channel — write to invite them.
- **Sample (Masri L3, feed):**
```
بتدفع كل شهر في حاجة مش بتستخدمها؟

احنا حسبنالك الفرق — وفّر لحد 40% من أول شهر.

✓ بدون عقود ✓ إلغاء في أي وقت
كلّمنا على واتساب 👇
```

### Google Search
- **Formats:** Responsive Search Ads — up to **15** headlines (**30** chars each), **4** descriptions (**90** chars each), display path **15** chars each.
- **Limits:** Arabic counts per character; keep headlines ≤30 incl. spaces. Pin the offer headline to position 1.
- **Hook logic:** Match the query intent literally. If they searched "شحن تكييف القاهرة", Headline 1 = "شحن تكييف في القاهرة".
- **CTA behavior:** Action + reassurance: "احجز دلوقتي — زيارة في نفس اليوم".
- **Egyptian audience:** Searches often MSA-leaning even from Masri speakers (keyboard + formality). See `references/seo-aeo-masri.md` for the MSA/Masri query split.
- **Sample headlines:** `تكييف بسعر الجملة` · `تركيب مجاني خلال 24 ساعة` · `ضمان 5 سنين`

### Google Display / Demand Gen
- **Formats:** Responsive display (short headline 30, long headline 90, description 90), Demand Gen visual carousels.
- **Hook logic:** Image carries the message; text confirms it. Short headline = the single benefit.
- **CTA behavior:** Soft for cold audiences ("اكتشف المجموعة"), hard for retargeting ("كمّل الطلب").
- **Egyptian audience:** Strong for retargeting cart abandoners — pair with COD reassurance.

### YouTube
- **Formats:** Skippable in-stream (hook before 5s skip), bumper (6s, non-skip), in-feed.
- **Hook logic:** Say the payoff *before* second 5 — assume everyone skips. Bumpers need one idea only.
- **CTA behavior:** Verbal + on-screen CTA; companion banner repeats the offer.
- **Egyptian audience:** Huge mobile YouTube usage; storytelling and "اتفرج لحد الآخر" retention framing work.

### TikTok
- **Formats:** In-feed video (9:16), Spark Ads (boost organic), TopView.
- **Limits:** Non-Spark caption up to **100 chars** in Ads Manager (~**4 visible lines** before "See more"); practical **30–40** for overlay safe zone. Video 9:16 min 540×960; **9–15s** recommended. Spark: caption from organic post — **not editable** in Ads Manager.
- **Arabic / RTL:** Use TikTok's **Arabic Version RTL** safe-zone templates (not LTR) — download from [In-Feed specs](https://ads.tiktok.com/help/article/video-ads-specifications). Long captions shrink the overlay safe area.
- **Spark vs Non-Spark:** Spark caption is pulled from the organic post and **cannot be edited** in Ads Manager — fix copy before authorization. Non-Spark: no @, hashtags, or links in caption field.
- **Hook logic:** First 2 seconds, native and un-ad-like. A face + a claim beats a logo.
- **CTA behavior:** Casual and verbal: "اطلب من اللينك اللي في البايو".
- **Egyptian audience:** L1–L2 Masri, fast cuts, trending sounds, self-aware humor. Polished = scrolled past.

### Snapchat
- **Formats:** Single image/video (vertical), Story Ads, Collection, AR Lens.
- **Hook logic:** Full-screen vertical; first frame must stop the thumb. Bold text overlay.
- **CTA behavior:** "اسحب لأعلى" (swipe up) is the native action.
- **Egyptian audience:** Smaller than KSA but skews young/impulse. In KSA, Snap is a top-tier impulse channel — flag market when planning.

### LinkedIn
- **Formats:** Single image, document/carousel, video, message ads, lead-gen forms.
- **Limits:** Intro text ~150 chars before "…see more"; headline ~70.
- **Hook logic:** Lead with the insight or the result, not the pitch. Credibility before ask.
- **CTA behavior:** Gated value: "حمّل الدليل" / "احجز عرض توضيحي".
- **Egyptian audience:** L4 Masri or light MSA; mixing English tech terms is normal and credible. See masri.md §13 (L4 professional layer).

### WhatsApp (Click-to-Chat & Campaigns)
- **Formats:** Click-to-WhatsApp ads (Meta/Google entry), broadcast lists, catalog messages.
- **Hook logic:** The pre-filled opening message reduces friction: pre-fill "عايز أعرف تفاصيل [المنتج]".
- **CTA behavior:** Make the first reply trivial — "ابعتلنا كلمة 'مهتم' ونرجعلك بكل التفاصيل".
- **Egyptian audience:** WhatsApp is where Egyptian SME sales actually close. Treat the ad as the opener of a conversation, not a standalone pitch. See `conversations/sales-conversation.md`.

---

## 3. Campaign Bundle Builder (`/arabic plan campaign`)

When the brief is a full campaign, produce a **multi-channel bundle**, not a single ad:

1. **Confirm the spine:** objective (awareness/leads/sales), market(s), dialect/register, offer, season (check `seasonal-calendar.md`), budget tilt.
2. **Map channels to funnel:**
   - Top: TikTok / YouTube / Meta Reels / Snap (KSA)
   - Mid: Meta feed / Display / Demand Gen
   - Bottom: Google Search / click-to-WhatsApp / retargeting
3. **Write one core message,** then adapt per platform using §2 (do not paste the same copy everywhere).
4. **Per channel, deliver:** hook + body + CTA at the right register and length.
5. **Run the taboo scan** (`references/taboos.md`) on every asset before delivery — especially seasonal/Ramadan tone.
6. **Humanize** every asset (`references/humanization-protocol.md`).

**Minimum viable bundle output:** 1 awareness asset + 1 consideration asset + 1 conversion asset + 1 retargeting/WhatsApp asset, each labeled with platform, register, and funnel role.

---

## 4. Pre-Delivery Checklist

- [ ] Hook survives RTL truncation (meaning front-loaded)
- [ ] One CTA per asset, in target dialect
- [ ] Char limits respected per placement
- [ ] Funnel role explicit for each asset
- [ ] Seasonal timing checked
- [ ] Taboo scan passed
- [ ] Humanization pass applied
