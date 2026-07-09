import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { PageHero } from "@/components/page-hero";
import { InstallPageClient } from "@/components/install-page-client";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/install"].title,
  description: siteMeta["/install"].description,
};

export default function InstallPage() {
  return (
    <PageShell>
      <PageHero title="ثبّت المهارة في دقيقة">
        <p>أمر واحد من التيرمنال — والمهارة تشتغل داخل Cursor أو Claude أو Codex.</p>
      </PageHero>
      <InstallPageClient />
    </PageShell>
  );
}
