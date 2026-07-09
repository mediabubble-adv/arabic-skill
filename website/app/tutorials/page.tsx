import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { InstallCta } from "@/components/install-cta";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/tutorials"].title,
  description: siteMeta["/tutorials"].description,
};

const lessons = [
  {
    title: "ثبّت المهارة في ٣ دقايق",
    outcome: "أمر التثبيت من README اتنسخ + /arabic guide شغال.",
    steps: [
      "افتح التيرمنال في مشروعك",
      "انسخ أمر التثبيت من صفحة /install",
      "اكتب /arabic guide في Cursor",
    ],
    meta: "~٣ دقايق · مبتدئ",
  },
  {
    title: "اكتب أول منشور مصري",
    outcome: "منشور سوشيال مصري من برّيف بسيط.",
    steps: [
      "اكتب الفكرة بشكل جزئي — مش شرط برّيف كامل",
      "/arabic guide يوضّح ويسأل",
      "/arabic write يولّد المحتوى",
      "/arabic audit يراجع قبل التسليم",
    ],
    meta: "~١٠ دقايق · مبتدئ",
  },
  {
    title: "راجع النص قبل النشر",
    outcome: "تقرير تدقيق + قائمة إصلاحات.",
    steps: [
      "ضع النص في ملف .md",
      "/arabic audit --file path/to/file.md",
      "طبّق أهم إصلاح — واطلب إعادة تدقيق عند الحاجة",
    ],
    meta: "~٥ دقايق · متوسط",
  },
];

export default function TutorialsPage() {
  return (
    <PageShell>
      <PageHero title="اتعلّم بالعربي">
        <p>
          دروس من شغل المهارة نفسها.{" "}
          <strong className="text-[var(--fg)]">مش مجرد ترجمة</strong> من إنجليزي.
        </p>
      </PageHero>
      <div className="space-y-6 mb-10">
        {lessons.map((lesson, i) => (
          <article key={lesson.title} className="card">
            <p className="text-sm text-[var(--brand)] mb-1">الدرس {i + 1}</p>
            <h2 className="text-xl font-semibold text-[var(--fg)] mb-2">
              {lesson.title}
            </h2>
            <p className="text-sm text-[var(--fg-muted)] mb-3">
              <strong className="text-[var(--fg)]">النتيجة:</strong>{" "}
              {lesson.outcome}
            </p>
            <ol className="list-decimal list-inside text-sm text-[var(--fg-muted)] space-y-1 mb-3">
              {lesson.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
            <p className="text-xs text-[var(--fg-muted)]">{lesson.meta}</p>
          </article>
        ))}
      </div>
      <p className="text-[var(--fg-muted)] mb-8 text-center">
        الموقع كله اتكتب بـ <code dir="ltr">/arabic</code>.{" "}
        <Link href="/about" className="text-[var(--brand)]">
          مسار البناء
        </Link>
        .
      </p>
      <InstallCta />
    </PageShell>
  );
}
