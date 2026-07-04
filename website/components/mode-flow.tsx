"use client";

import { useState } from "react";

const STEPS = [
  { id: "guide", label: "استشارة", desc: "يفهم طلبك ويوضّح الفكرة" },
  { id: "clarify", label: "توضيح", desc: "يسأل عن اللي ناقص" },
  { id: "recommend", label: "توصية", desc: "يقترح اتجاه قبل الكتابة" },
  { id: "write", label: "كتابة", desc: "يولّد المحتوى باللهجة المطلوبة" },
  { id: "review", label: "مراجعة", desc: "يراجع قبل التسليم" },
] as const;

export function ModeFlow() {
  const [active, setActive] = useState<string>(STEPS[0].id);
  const current = STEPS.find((s) => s.id === active) ?? STEPS[0];

  return (
    <div className="card">
      <div className="flex flex-wrap gap-2 mb-4">
        {STEPS.map((step, i) => (
          <button
            key={step.id}
            type="button"
            onClick={() => setActive(step.id)}
            className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
              active === step.id
                ? "bg-[var(--brand)] text-[var(--bg)]"
                : "border border-[var(--border)] text-[var(--fg-muted)] hover:border-[var(--brand)]"
            }`}
          >
            {i + 1}. {step.label}
          </button>
        ))}
      </div>
      <p className="text-[var(--fg)] font-medium">{current.label}</p>
      <p className="text-[var(--fg-muted)] text-sm mt-1">{current.desc}</p>
    </div>
  );
}
