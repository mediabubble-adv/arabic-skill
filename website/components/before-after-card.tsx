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
    <div className="before-after">
      {label && (
        <p className="text-sm text-[var(--brand)] mb-3 font-medium">{label}</p>
      )}

      <div className="hidden md:grid md:grid-cols-2 gap-4">
        <div className="before-after-panel">
          <p className="before-after-label">قبل: ترجمة جامدة</p>
          <p className="text-[var(--fg-muted)] leading-relaxed">{before}</p>
        </div>
        <div className="before-after-panel before-after-panel--after">
          <p className="before-after-label before-after-label--after">بعد: مصري طبيعي</p>
          <p className="text-[var(--fg)] leading-relaxed">{after}</p>
        </div>
      </div>

      <div className="md:hidden before-after-panel before-after-panel--mobile">
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
