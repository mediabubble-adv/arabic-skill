"use client";

import { useState } from "react";

export function BeforeAfterCard({
  before,
  after,
  label,
}: {
  before: string;
  after: string;
  label?: string;
}) {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="card">
      {label && (
        <p className="text-sm text-[var(--brand)] mb-3 font-medium">{label}</p>
      )}
      <div className="flex gap-2 mb-4">
        <button
          type="button"
          onClick={() => setShowAfter(false)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            !showAfter
              ? "bg-[var(--brand)] text-[var(--bg)]"
              : "text-[var(--fg-muted)] border border-[var(--border)]"
          }`}
        >
          قبل
        </button>
        <button
          type="button"
          onClick={() => setShowAfter(true)}
          className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
            showAfter
              ? "bg-[var(--brand)] text-[var(--bg)]"
              : "text-[var(--fg-muted)] border border-[var(--border)]"
          }`}
        >
          بعد
        </button>
      </div>
      <p className="text-[var(--fg)] leading-relaxed">
        {showAfter ? after : before}
      </p>
    </div>
  );
}
