"use client";

import { useState } from "react";
import { PillTabs } from "./pill-tabs";

export function BeforeAfterCard({
  before,
  after,
  label,
  tablistTestId,
}: {
  before: string;
  after: string;
  label?: string;
  tablistTestId?: string;
}) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <div className="card">
      {label && (
        <p className="text-sm text-[var(--brand)] mb-3 font-medium">{label}</p>
      )}

      <div className="hidden md:grid md:grid-cols-2 gap-4">
        <div className="rounded-lg border border-[var(--border)] p-4">
          <p className="text-xs font-medium text-[var(--fg-muted)] mb-2">
            قبل — ترجمة جامدة
          </p>
          <p className="text-[var(--fg-muted)] leading-relaxed">{before}</p>
        </div>
        <div className="rounded-lg border border-[var(--accent)]/40 p-4">
          <p className="text-xs font-medium text-[var(--accent)] mb-2">
            بعد — مصري طبيعي
          </p>
          <p className="text-[var(--fg)] leading-relaxed">{after}</p>
        </div>
      </div>

      <div className="md:hidden">
        <div className="mb-4">
          <PillTabs
            tabs={[
              { id: "after", label: "بعد" },
              { id: "before", label: "قبل" },
            ]}
            activeId={showAfter ? "after" : "before"}
            onChange={(id) => setShowAfter(id === "after")}
            size="sm"
            ariaLabel="قبل وبعد"
            testId={tablistTestId}
          />
        </div>
        <p
          data-testid={tablistTestId ? `${tablistTestId}-panel` : undefined}
          className={`leading-relaxed ${
            showAfter ? "text-[var(--fg)]" : "text-[var(--fg-muted)]"
          }`}
        >
          {showAfter ? after : before}
        </p>
      </div>
    </div>
  );
}
