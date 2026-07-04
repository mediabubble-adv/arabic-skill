import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { MarkdownContent } from "@/components/markdown-content";
import { InstallCta } from "@/components/install-cta";
import { getPageContent } from "@/lib/content";
import { siteMeta } from "@/lib/site-meta";

export const metadata: Metadata = {
  title: siteMeta["/commands"].title,
  description: siteMeta["/commands"].description,
};

export default function CommandsPage() {
  const content = getPageContent("commands");

  return (
    <PageShell>
      <MarkdownContent content={content} />
      <InstallCta heading="ابدأ بـ /arabic guide" />
    </PageShell>
  );
}
