import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { BeforeAfterCard } from "@/components/before-after-card";
import { InstallCta } from "@/components/install-cta";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/examples"].title,
  description: siteMeta["/examples"].description,
};

const examples = [
  {
    label: "كابشن إنستغرام — أبليكيشن رياضة",
    before:
      "اكتشف تطبيقنا الجديد الذي يساعدك على تحقيق أهدافك الرياضية بكل سهولة.",
    after:
      "عايز تلعب جيم من غير أعذار؟ الأبليكيشن ده بيظبطلك التمرين على مزاجك — جرّبه وقولنا.",
    command: "/arabic write social --dialect masri",
  },
  {
    label: "هيرو صفحة هبوط",
    before: "منصة متكاملة لإدارة المحتوى العربي بكفاءة عالية.",
    after:
      "محتوى عربي يبان إنه اتكتب لبشر — مش اتترجم من إنجليزي. المهارة دي شريكك جوه الـ IDE.",
  },
  {
    label: "أزرار واجهة",
    before: "انقر هنا للمتابعة",
    after: "كمّل من هنا",
  },
];

export default function ExamplesPage() {
  return (
    <PageShell>
      <header className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--fg)] mb-3">
          أمثلة من الشغل الحقيقي
        </h1>
        <p className="text-[var(--fg-muted)]">
          كابشنز، إعلانات، صفحات هبوط، سكريبتات، نصوص واجهة —{" "}
          <em>اتولد بـ /arabic write</em>.{" "}
          <Link href="/about" className="text-[var(--brand)]">
            مسار البناء الكامل →
          </Link>
        </p>
      </header>
      <div className="space-y-6 mb-12">
        {examples.map((ex, index) => (
          <div key={ex.label}>
            <BeforeAfterCard
              label={ex.label}
              before={ex.before}
              after={ex.after}
              tablistTestId={index === 0 ? "before-after-tablist" : undefined}
            />
            {ex.command && (
              <p className="text-sm text-[var(--fg-muted)] mt-2" dir="ltr">
                {ex.command}
              </p>
            )}
          </div>
        ))}
      </div>
      <InstallCta heading="ثبّت وجرّب على مشروعك" />
    </PageShell>
  );
}
