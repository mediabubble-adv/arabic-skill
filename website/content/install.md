# ثبّت المهارة في دقيقة

سطر واحد من التيرمنال — والمهارة تشتغل في Cursor أو Claude أو Codex.

## أنا مطور

### التثبيت السريع (G14)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target cursor
```

**skills.sh (المهارة بس — من غير command/rule):**

```bash
npx skills add mediabubble-adv/arabic-skill -a cursor -g -y
```

**أهداف تانية:**

```bash
npx @mediabubble-adv/arabic-skill@latest install --target claude
npx @mediabubble-adv/arabic-skill@latest install --target codex
npx @mediabubble-adv/arabic-skill@latest install --target all
npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force
```

**أول أمر بعد التثبيت:** `/arabic guide`

### بعد التثبيت

1. افتح المشروع اللي شغال عليه
2. اكتب `/arabic guide` وابدأ
3. لو عندك براند ثابت: `/arabic voice save`

## أول مرة أسمع عن المهارات

### إيه المهارة؟

المهارة دي حزمة تعليمات بتتثبت في أداة الذكاء الاصطناعي بتاعتك — مش شات منفصل. بتخلي الـ AI يكتب محتوى عربي بصوت طبيعي، يفهم السياق، ويراجع قبل ما يسلّم. **مش مجرد ترجمة.**

### هتعمل إيه؟

هتكتب منشورات، إعلانات، صفحات، سكريبتات — بالمصري أو أي لهجة — من جوه Cursor أو Claude أو Codex.

### ثبّت دلوقتي

نفس سطر التثبيت فوق — **ثبّت المهارة** وجرّب `/arabic guide`.

**عايز تشوف قبل ما تثبت؟** روح [الأمثلة](/examples) أو [الدروس](/tutorials).

## أسئلة شائعة

**هل المهارة مجانية؟**  
آه — مفتوحة المصدر على GitHub. `npx install` مجاني.

**لازم Cursor بس؟**  
لأ — في ٢٤ أداة مدعومة. Cursor وClaude وCodex ليهم أوامر جاهزة.

**إيه الفرق عن ChatGPT؟**  
ChatGPT عام. المهارة دي متخصصة في العربي: لهجات، تأنيس، تدقيق، ومشاريع كبيرة بخطة.

**محتاج GitHub؟**  
للتثبيت السريع: لأ. للـ rules والـ commands الكاملة في Cursor: clone يدوي.

## ثقة

الصفحة دي اتكتبت بـ `/arabic` — [شوف إزاي](/about).
