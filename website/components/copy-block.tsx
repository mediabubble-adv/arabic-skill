"use client";

import { useState } from "react";

export function CopyBlock({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="rounded-md border border-[var(--border)] bg-[var(--bg-elev)] p-4">
      <pre
        dir="ltr"
        className="font-[family-name:var(--font-mono)] text-sm overflow-x-auto text-[var(--fg)]"
      >
        {text}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="mt-3 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--bg)] hover:bg-[var(--brand-strong)] transition-colors"
      >
        {copied ? "تم النسخ" : "نسخ"}
      </button>
    </div>
  );
}
