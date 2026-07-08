import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { InstallCta } from "@/components/install-cta";
import { getPageContent } from "@/lib/content";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/features"].title,
  description: siteMeta["/features"].description,
};

const capabilities = [
  {
    title: "كتابة المحتوى",
    desc: "منشورات، إعلانات، صفحات هبوط، مقالات، سكريبتات حسب المطلوب.",
  },
  {
    title: "اللهجات",
    desc: "أكثر من ١١ لهجة. مصري أولاً، وخليجي وشامي وغيرهما عند الحاجة.",
  },
  {
    title: "التأنيس",
    desc: "يزيل نبرة الترجمة والجمل الآلية قبل التسليم.",
  },
  {
    title: "وعي المشروع",
    desc: "/arabic auto يمسح المشروع ويشرحه بعربي يفهمه الفريق كله.",
  },
  {
    title: "البحث",
    desc: "/arabic research يجمع مصادر قبل الكتابة — من غير تخمين.",
  },
  {
    title: "الأوامر",
    desc: "write، audit، plan، coach من غير ما تضيع في محادثة طويلة.",
  },
  {
    title: "مشاريع كبيرة",
    desc: "موقع، حملة، كتاب: الخطة أولاً، والتنفيذ بعد الموافقة.",
  },
  {
    title: "SEO و AEO",
    desc: "محتوى عربي مضبوط للبحث ومحركات الإجابة — من غير أرقام وهمية.",
  },
];

export default function FeaturesPage() {
  const raw = getPageContent("features");
  const intro = raw.split("##")[0].replace(/^#\s.+?\n/, "").trim();

  return (
    <PageShell>
      <PageHero title="ماذا تقدّم المهارة؟">
        <p>{intro}</p>
      </PageHero>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
        {capabilities.map((cap) => (
          <div key={cap.title} className="card">
            <h2 className="font-semibold text-[var(--fg)] mb-2">{cap.title}</h2>
            <p className="text-sm text-[var(--fg-muted)]">{cap.desc}</p>
          </div>
        ))}
      </div>
      <InstallCta />
    </PageShell>
  );
}
