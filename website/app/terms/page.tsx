import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/terms"].title,
  description: siteMeta["/terms"].description,
};

export default function TermsPage() {
  return (
    <PageShell>
      <PageHero title="شروط الاستخدام">
        <p>آخر تحديث: يوليو ٢٠٢٦</p>
      </PageHero>
      <article className="prose-site max-w-3xl mx-auto">
        <h2>الترخيص</h2>
        <p>
          مهارة العربية مفتوحة المصدر تحت رخصة MIT. الكود والمحتوى المرجعي على
          GitHub يخضعان لنفس الرخصة ما لم يُذكر غير ذلك.
        </p>
        <h2>الاستخدام المقبول</h2>
        <p>
          المهارة أداة مساعدة للكتابة والتدقيق. أنت مسؤول عن المحتوى الذي
          تنشره. يُمنع استخدام الموقع أو المهارة في أنشطة غير قانونية أو مضللة.
        </p>
        <h2>ضمان محدود</h2>
        <p>
          الموقع والمهارة يُقدَّمان «كما هما». MediaBubble غير مسؤولة عن أضرار
          ناتجة عن الاعتماد على مخرجات الذكاء الاصطناعي من غير مراجعة بشرية.
        </p>
        <h2>تواصل</h2>
        <p>
          للأسئلة القانونية، تواصل عبر{" "}
          <a href="https://github.com/mediabubble-adv/arabic-skill">GitHub</a>.
        </p>
      </article>
    </PageShell>
  );
}
