"use client";

import { useState } from "react";
import Link from "next/link";
import { CopyBlock } from "@/components/copy-block";
import { ToolTabs } from "@/components/tool-tabs";
import { FaqAccordion } from "@/components/faq-accordion";
import { PrintInstallSection } from "@/components/print-install-section";
import { FIRST_COMMAND, INIT_BRIEF_EXAMPLE, PRIMARY_INSTALL } from "@/lib/install-commands";

const FAQ = [
  {
    question: "هل المهارة مجانية؟",
    answer: "نعم. مفتوحة المصدر على GitHub. npx install مجاني.",
  },
  {
    question: "هل Cursor شرط؟",
    answer:
      "لا. في ٢٤ أداة مدعومة — ٧ مسارات preset عالمية + دليل يدوي للباقي. Cursor وClaude وCodex وHermes وOpenClaw وOpenCode وAntigravity لهم أوامر npx جاهزة.",
  },
  {
    question: "ما الفرق عن ChatGPT؟",
    answer:
      "ChatGPT عام. المهارة متخصصة في العربي: لهجات، تأنيس، تدقيق، ومشاريع كبيرة بخطة.",
  },
  {
    question: "هل أحتاج GitHub؟",
    answer:
      "للتثبيت السريع: لا. لقواعد وcommands كاملة في Cursor: clone يدوي.",
  },
];

function InstallPageClient() {
  const [mode, setMode] = useState<"dev" | "beginner">("dev");

  return (
    <>
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setMode("dev")}
          className={`rounded-md px-4 py-2.5 min-h-11 text-sm font-medium transition-colors ${
            mode === "dev"
              ? "bg-[var(--brand)] text-[var(--btn-on-brand)]"
              : "border border-[var(--border)] text-[var(--fg-muted)]"
          }`}
        >
          أنا مطور
        </button>
        <button
          type="button"
          onClick={() => setMode("beginner")}
          className={`rounded-md px-4 py-2.5 min-h-11 text-sm font-medium transition-colors ${
            mode === "beginner"
              ? "bg-[var(--brand)] text-[var(--btn-on-brand)]"
              : "border border-[var(--border)] text-[var(--fg-muted)]"
          }`}
        >
          أول مرة أسمع عن المهارات
        </button>
      </div>

      {mode === "dev" ? (
        <div className="space-y-8">
          <section>
            <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
              التثبيت السريع (G14)
            </h2>
            <CopyBlock text={PRIMARY_INSTALL} />
          </section>
          <section>
            <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
              أدوات التثبيت
            </h2>
            <ToolTabs />
          </section>
          <PrintInstallSection />
          <section>
            <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
              أول أمر بعد التثبيت
            </h2>
            <CopyBlock text={FIRST_COMMAND} />
          </section>
          <section>
            <h3 className="font-semibold text-[var(--fg)] mb-2 text-center">
              بعد التثبيت
            </h3>
            <ol className="list-decimal list-inside text-[var(--fg-muted)] space-y-1 max-w-xl mx-auto">
              <li>افتح المشروع الحالي</li>
              <li>
                اكتب <code dir="ltr">{FIRST_COMMAND}</code> وابدأ (حتى من غير ملفات إضافية في الريبو)
              </li>
              <li>
                لمشروع عميل: <code dir="ltr">/arabic init</code> ثم{" "}
                <code dir="ltr">{INIT_BRIEF_EXAMPLE}</code>
              </li>
              <li>لصوت براند ثابت: /arabic voice save</li>
            </ol>
          </section>
        </div>
      ) : (
        <div className="space-y-6 text-[var(--fg-muted)] max-w-2xl mx-auto text-center">
          <section>
            <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">
              ما هي المهارة؟
            </h2>
            <p>
              حزمة تعليمات تتثبت داخل أداة الذكاء الاصطناعي — مش شات منفصل.
              تخلي الـ AI يكتب عربي بصوت طبيعي، يقرأ السياق، ويراجع قبل التسليم.{" "}
              <strong className="text-[var(--fg)]">مش مجرد ترجمة.</strong>
            </p>
          </section>
          <section>
            <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">
              ماذا ستفعل؟
            </h2>
            <p>
              تكتب منشورات، إعلانات، صفحات، وسكريبتات بالمصري أو بأي لهجة، من
              جوه Cursor أو Claude أو Codex.
            </p>
          </section>
          <div className="text-start">
            <CopyBlock text={PRIMARY_INSTALL} />
          </div>
          <p>
            تريد مراجعة قبل التثبيت؟{" "}
            <Link href="/examples" className="text-[var(--brand)]">
              الأمثلة
            </Link>{" "}
            أو{" "}
            <Link href="/tutorials" className="text-[var(--brand)]">
              الدروس
            </Link>
            .
          </p>
        </div>
      )}

      <section className="mt-12">
        <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
          أسئلة شائعة
        </h2>
        <FaqAccordion items={FAQ} />
      </section>

      <p className="mt-10 text-sm text-[var(--fg-muted)] border-t border-[var(--border)] pt-6 text-center">
        الصفحة اتكتبت بـ <code dir="ltr">/arabic</code>.{" "}
        <Link href="/about" className="text-[var(--brand)]">
          مسار البناء
        </Link>
        .
      </p>
    </>
  );
}

export { InstallPageClient };
