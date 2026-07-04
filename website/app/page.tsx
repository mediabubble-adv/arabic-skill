import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { ModeFlow } from "@/components/mode-flow";
import { BeforeAfterCard } from "@/components/before-after-card";
import { InstallCta } from "@/components/install-cta";
import { StickyInstallBar } from "@/components/sticky-install-bar";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/"].title,
  description: siteMeta["/"].description,
};

const bento = [
  {
    title: "محتوى",
    desc: "منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات",
  },
  {
    title: "لهجات",
    desc: "١١+ لهجة. مصري أولاً.",
  },
  {
    title: "تأنيس",
    desc: "بيشيل أسلوب الترجمة والجمل اللي شكلها AI",
  },
  {
    title: "مشروع",
    desc: "/arabic auto بيمسح المشروع ويشرحه بعربي يفهمه أي حد",
  },
];

export default function HomePage() {
  return (
    <PageShell>
      <section className="max-w-3xl mb-12">
        <p className="text-[var(--brand)] text-sm font-medium mb-3">
          Awesome Arabic Skill
        </p>
        <h1 className="text-3xl md:text-5xl font-bold text-[var(--fg)] leading-tight mb-4">
          شريكك المصري لكتابة المحتوى جوه أدوات الذكاء الاصطناعي
        </h1>
        <p className="text-lg text-[var(--fg-muted)] mb-2">
          بيقرأ السياق، يوضّح الفكرة، يوصي بالاتجاه، يكتب، ويراجع — قبل ما
          يسلّم.
        </p>
        <p className="text-lg font-semibold text-[var(--accent)] mb-8">
          مش مجرد ترجمة.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link href="/install" className="btn-primary">
            ثبّت المهارة
          </Link>
          <Link href="/examples" className="btn-secondary">
            شوف أمثلة
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-4">
          المسار الافتراضي
        </h2>
        <ModeFlow />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-4">
          قبل وبعد (معاينة)
        </h2>
        <BeforeAfterCard
          before="اكتشف كيف يمكن لمهارة العربية أن تساعدك في إنشاء محتوى عربي احترافي."
          after="المهارة دي شريكك جوه الـ IDE — بتفهم السياق وتكتب مصري من غير ما تحس إنها ترجمة."
        />
      </section>

      <section className="mb-12">
        <h2 className="text-xl font-semibold text-[var(--fg)] mb-6">
          ليه المهارة دي؟
        </h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {bento.map((item) => (
            <div key={item.title} className="card">
              <h3 className="font-semibold text-[var(--fg)] mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-[var(--fg-muted)]">{item.desc}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[var(--fg-muted)] mt-6">
          Cursor · Claude · Codex · ChatGPT · Gemini · Qwen · Windsurf · VS
          Code — <strong className="text-[var(--fg)]">+14 أداة</strong>
        </p>
      </section>

      <InstallCta
        heading="ثبّت المهارة"
        sub="سطر واحد من التيرمنال وإنت جاهز."
      />
      <StickyInstallBar />
    </PageShell>
  );
}
