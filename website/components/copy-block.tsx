"use client";

import { useState } from "react";

type CopyBlockProps = {
  text: string;
  compact?: boolean;
};

function CopyIcon({ copied }: { copied: boolean }) {
  if (copied) {
    return (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <path d="M20 6 9 17l-5-5" />
      </svg>
    );
  }

  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="9" y="9" width="13" height="13" rx="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

export function CopyBlock({ text, compact = false }: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  if (compact) {
    return (
      <div
        dir="ltr"
        className="flex items-stretch gap-2 rounded-md border border-[var(--border)] bg-[var(--bg-elev)] p-2 ps-3"
      >
        <pre className="flex-1 min-w-0 font-[family-name:var(--font-mono)] text-sm leading-relaxed text-[var(--fg)] whitespace-nowrap overflow-x-auto">
          {text}
        </pre>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "تم النسخ" : "نسخ الأمر"}
          className="shrink-0 self-center inline-flex items-center justify-center rounded-md bg-[var(--brand)] size-11 text-[var(--btn-on-brand)] hover:bg-[var(--brand-strong)] transition-colors"
        >
          <CopyIcon copied={copied} />
        </button>
      </div>
    );
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
        aria-label={copied ? "تم النسخ" : "نسخ الأمر"}
        className="mt-3 inline-flex items-center gap-2 rounded-md bg-[var(--brand)] px-4 py-2 text-sm font-medium text-[var(--btn-on-brand)] hover:bg-[var(--brand-strong)] transition-colors"
      >
        <CopyIcon copied={copied} />
        <span>{copied ? "تم النسخ" : "نسخ"}</span>
      </button>
    </div>
  );
}
