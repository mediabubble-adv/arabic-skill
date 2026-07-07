const STATS = [
  { value: "v1.2.9", label: "الإصدار الحالي" },
  { value: "٢٤", label: "أداة مدعومة" },
  { value: "MIT", label: "مفتوح المصدر" },
  { value: "/arabic", label: "اتبنى بـ", mono: true },
] as const;

export function StatStrip() {
  return (
    <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[var(--fg-muted)] border-y border-[var(--border)] py-4 mb-12">
      {STATS.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          {"mono" in item && item.mono ? (
            <code dir="ltr" className="text-[var(--brand)] font-[family-name:var(--font-mono)]">
              {item.value}
            </code>
          ) : (
            <span className="font-semibold text-[var(--fg)]">{item.value}</span>
          )}
          <span>{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
