"use client";

import { useState } from "react";
import { PillTabs } from "./pill-tabs";

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
      <PillTabs
        tabs={STEPS.map((s, i) => ({ id: s.id, label: `${i + 1}. ${s.label}` }))}
        activeId={active}
        onChange={setActive}
        ariaLabel="مراحل المسار"
      />
      <p className="text-[var(--fg)] font-medium mt-4">{current.label}</p>
      <p className="text-[var(--fg-muted)] text-sm mt-1">{current.desc}</p>
    </div>
  );
}
