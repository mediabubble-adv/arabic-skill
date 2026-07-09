# ثبّت المهارة في دقيقة

أمر واحد من التيرمنال — والمهارة تشتغل داخل Cursor أو Claude أو Codex.

## أنا مطور

### التثبيت السريع (G14)

```bash
npx @mediabubble-adv/arabic-skill@latest install --target cursor
```

**skills.sh (المهارة فقط — من غير command/rule):**

```bash
npx skills add mediabubble-adv/arabic-skill -a cursor -g -y
```

**أهداف أخرى:**

```bash
npx @mediabubble-adv/arabic-skill@latest install --list
npx @mediabubble-adv/arabic-skill@latest install --target claude
npx @mediabubble-adv/arabic-skill@latest install --target codex
npx @mediabubble-adv/arabic-skill@latest install --target hermes-agent
npx @mediabubble-adv/arabic-skill@latest install --target openclaw
npx @mediabubble-adv/arabic-skill@latest install --target opencode
npx @mediabubble-adv/arabic-skill@latest install --target antigravity
npx @mediabubble-adv/arabic-skill@latest install --target chatgpt
npx @mediabubble-adv/arabic-skill@latest install --target all
npx @mediabubble-adv/arabic-skill@latest install --dir ~/.cursor/skills --force
```

`--list` يعرض الـ ٢٤ أداة. `all` يثبّت كل المسارات العالمية (preset). ChatGPT وأدوات مشابهة: دليل يدوي من غير نسخ ملفات.

### أدوات بدليل يدوي

مفيش مجلد skills مؤكد — الأمر يطبع خطوات التثبيت:

```bash
npx @mediabubble-adv/arabic-skill@latest install --target chatgpt
npx @mediabubble-adv/arabic-skill@latest install --target windsurf
npx @mediabubble-adv/arabic-skill@latest install --target aider
npx @mediabubble-adv/arabic-skill@latest install --target vs-code
npx @mediabubble-adv/arabic-skill@latest install --list
```

فهرس الـ ٢٤ أداة: [docs/supported](https://github.com/mediabubble-adv/arabic-skill/tree/main/docs/supported)

**أول أمر بعد التثبيت:** `/arabic guide`

**في مشروع عميل:** `/arabic init` — ينشئ `.arabic/` للبرّيفات والخطط

### بعد التثبيت

1. افتح المشروع الحالي
2. اكتب `/arabic guide` وابدأ (حتى من غير ملفات إضافية في الريبو)
3. لمشروع عميل: `/arabic init` ثم `/arabic write … --brief .arabic/briefs/example.yaml`
4. لصوت براند ثابت: `/arabic voice save`

## أول مرة أسمع عن المهارات

### ما هي المهارة؟

حزمة تعليمات تتثبت داخل أداة الذكاء الاصطناعي — مش شات منفصل. تخلي الـ AI يكتب عربي بصوت طبيعي، يقرأ السياق، ويراجع قبل التسليم. **مش مجرد ترجمة.**

### ماذا ستفعل؟

تكتب منشورات، إعلانات، صفحات، وسكريبتات — بالمصري أو بأي لهجة — من جوه Cursor أو Claude أو Codex.

### ثبّت دلوقتي

نفس أمر التثبيت أعلاه — **ثبّت المهارة** ثم جرّب `/arabic guide`.

**تريد مراجعة قبل التثبيت؟** روح [الأمثلة](/examples) أو [الدروس](/tutorials).

## أسئلة شائعة

**هل المهارة مجانية؟**  
نعم — مفتوحة المصدر على GitHub. `npx install` مجاني.

**هل Cursor شرط؟**  
لا — ٢٤ أداة مدعومة. ٧ مسارات preset عالمية + دليل يدوي للباقي (مثل ChatGPT).

**ما الفرق عن ChatGPT؟**  
ChatGPT عام. المهارة متخصصة في العربي: لهجات، تأنيس، تدقيق، ومشاريع كبيرة بخطة.

**هل أحتاج GitHub؟**  
للتثبيت السريع: لا. لقواعد وcommands كاملة في Cursor: clone يدوي.

## ثقة

الصفحة اتكتبت بـ `/arabic` — [مسار البناء](/about).
