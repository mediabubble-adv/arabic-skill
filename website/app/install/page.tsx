import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { InstallPageClient } from "@/components/install-page-client";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/install"].title,
  description: siteMeta["/install"].description,
};

export default function InstallPage() {
  return (
    <PageShell>
      <header className="max-w-3xl mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-[var(--fg)] mb-3">
          ثبّت المهارة في دقيقة
        </h1>
        <p className="text-[var(--fg-muted)]">
          سطر واحد من التيرمنال — والمهارة تشتغل في Cursor أو Claude أو Codex.
        </p>
      </header>
      <InstallPageClient />
    </PageShell>
  );
}
