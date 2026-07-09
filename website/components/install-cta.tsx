import Link from "next/link";
import { CopyBlock } from "@/components/copy-block";
import { HERO_INSTALL_SNIPPET } from "@/lib/install-commands";

export function InstallCta({
  heading = "جاهز للتثبيت؟",
  sub = "أمر واحد من التيرمنال، ثم ابدأ بـ /arabic guide",
}: {
  heading?: string;
  sub?: string;
}) {
  return (
    <section className="install-cta">
      <h2 className="install-cta-title">{heading}</h2>
      <p className="install-cta-sub">{sub}</p>
      <div className="install-cta-command">
        <CopyBlock text={HERO_INSTALL_SNIPPET} compact />
      </div>
      <Link href="/install" className="btn-primary">
        صفحة التثبيت الكاملة
      </Link>
    </section>
  );
}
