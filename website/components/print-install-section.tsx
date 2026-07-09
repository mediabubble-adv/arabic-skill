"use client";

import Link from "next/link";
import { CopyBlock } from "@/components/copy-block";
import { PRINT_INSTALL_TARGETS } from "@/lib/install-commands";

export function PrintInstallSection() {
  return (
    <section>
      <h2 className="section-heading text-xl md:text-2xl font-semibold text-[var(--fg)]">
        أدوات بدليل يدوي
      </h2>
      <p className="text-[var(--fg-muted)] text-center max-w-2xl mx-auto mb-6">
        مفيش مجلد skills مؤكد للأداة دي — الأمر يطبع خطوات التثبيت في التيرمنال.
        لأي مسار مخصص: <code dir="ltr">install --dir &lt;path&gt;</code>
      </p>
      <div className="space-y-6 max-w-2xl mx-auto">
        {PRINT_INSTALL_TARGETS.map((item) => (
          <div key={item.id}>
            <h3 className="font-semibold text-[var(--fg)] mb-1 text-center">
              {item.label}
            </h3>
            <p className="text-sm text-[var(--fg-muted)] text-center mb-2">
              {item.note}
            </p>
            <CopyBlock text={item.command} compact />
          </div>
        ))}
      </div>
      <p className="text-sm text-[var(--fg-muted)] text-center mt-6">
        باقي الأدوات:{" "}
        <Link
          href="https://github.com/mediabubble-adv/arabic-skill/tree/main/docs/supported"
          className="text-[var(--brand)]"
        >
          فهرس الـ ٢٤ أداة
        </Link>
      </p>
    </section>
  );
}
