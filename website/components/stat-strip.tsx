const STATS = [
  { value: "v1.2.9", label: "الإصدار الحالي" },
  { value: "MIT", label: "مفتوح المصدر" },
  { value: "/arabic", label: "اتبنى بـ", mono: true },
] as const;

export function StatStrip() {
  return (
    <ul className="stat-strip">
      {STATS.map((item) => (
        <li key={item.label} className="stat-strip-item">
          {"mono" in item && item.mono ? (
            <code dir="ltr" className="stat-strip-value mono">
              {item.value}
            </code>
          ) : (
            <span className="stat-strip-value">{item.value}</span>
          )}
          <span className="stat-strip-label">{item.label}</span>
        </li>
      ))}
    </ul>
  );
}
