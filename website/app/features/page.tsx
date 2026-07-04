import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
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
    desc: "منشورات، إعلانات، صفحات هبوط، مدونات، سكريبتات — حسب اللي محتاجه.",
  },
  {
    title: "اللهجات",
    desc: "١١+ لهجة. مصري أولاً، وخليجي وشامي وغيرهم لما تحتاج.",
  },
  {
    title: "التأنيس",
    desc: "بيشيل أسلوب الترجمة والجمل اللي شكلها AI — قبل ما يسلّم.",
  },
  {
    title: "وعي المشروع",
    desc: "/arabic auto بيمسح المشروع ويشرحه بعربي يفهمه أي حد.",
  },
  {
    title: "البحث",
    desc: "/arabic research بيجمع مصادر قبل ما يكتب — مش تخمين.",
  },
  {
    title: "الأوامر",
    desc: "write، audit، plan، coach — من غير ما تلف في شات طويل.",
  },
  {
    title: "مشاريع كبيرة",
    desc: "موقع، حملة، كتاب — خطة الأول، تنفيذ بعد الموافقة.",
  },
  {
    title: "SEO و AEO",
    desc: "محتوى عربي مظبوط للبحث ومحركات الإجابة — من غير إحصائيات وهمية.",
  },
];

export default function FeaturesPage() {
  const raw = getPageContent("features");
  const intro = raw.split("##")[0].replace(/^#\s.+?\n/, "").trim();

  return (
    <PageShell>
      <header className="max-w-3xl mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--fg)] mb-3">
          المهارة دي بتعمل إيه؟
        </h1>
        <p className="text-[var(--fg-muted)]">{intro}</p>
      </header>
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
