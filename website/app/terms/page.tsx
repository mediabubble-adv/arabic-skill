import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/terms"].title,
  description: siteMeta["/terms"].description,
};

export default function TermsPage() {
  return (
    <PageShell>
      <article className="prose-site max-w-3xl">
        <h1>شروط الاستخدام</h1>
        <p>آخر تحديث: يوليو ٢٠٢٦</p>
        <h2>الترخيص</h2>
        <p>
          مهارة العربية مفتوحة المصدر تحت رخصة MIT. الكود والمحتوى المرجعي على
          GitHub يخضعوا لنفس الرخصة ما لم يُذكر غير كده.
        </p>
        <h2>الاستخدام المقبول</h2>
        <p>
          المهارة أداة مساعدة للكتابة والتدقيق. أنت مسؤول عن المحتوى اللي
          بتنشره. ممنوع استخدام الموقع أو المهارة في أنشطة غير قانونية أو مضللة.
        </p>
        <h2>ضمان محدود</h2>
        <p>
          الموقع والمهارة بيتقدموا «كما هم». MediaBubble مش مسؤولة عن أضرار ناتجة
          عن الاعتماد على مخرجات الذكاء الاصطناعي من غير مراجعة بشرية.
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
