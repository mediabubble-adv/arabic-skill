type BgKey = {
  label?: string;
  w?: number;
  highlight?: boolean;
  mono?: boolean;
  delay?: number;
};

const ROW1 = "ض ص ث ق ف غ ع ه خ ح ج د ش س ي ب".split(" ");
const ROW2 = "ل ا ت ن م ك ط ئ ء ؤ ر لا ى ة و".split(" ");

function layoutRow(
  labels: string[],
  chassisX: number,
  chassisW: number,
  y: number,
  opts?: { indent?: number; keyW?: number; gap?: number },
) {
  const indent = opts?.indent ?? 0;
  const U = opts?.keyW ?? 52;
  const G = opts?.gap ?? 8;
  const total = labels.length * U + (labels.length - 1) * G;
  const startX = chassisX + (chassisW - total) / 2 + indent;
  return labels.map((label, i) => ({
    x: startX + i * (U + G),
    y,
    w: U,
    label,
    delay: i * 60,
  }));
}

function BgKeyCap({
  x,
  y,
  w,
  h,
  label,
  highlight,
  mono,
  delay = 0,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label?: string;
  highlight?: boolean;
  mono?: boolean;
  delay?: number;
}) {
  return (
    <g
      transform={`translate(${x} ${y})`}
      className={highlight ? "kb-key kb-key-highlight" : "kb-key"}
      style={{ animationDelay: highlight ? `${delay}ms` : undefined }}
    >
      <rect
        width={w}
        height={h}
        rx="7"
        className={highlight ? "kb-key-cap kb-key-cap-highlight" : "kb-key-cap"}
      />
      {label && (
        <text
          x={w / 2}
          y={h / 2 + (mono ? 4 : 5)}
          textAnchor="middle"
          className={mono ? "kb-key-label-mono" : "kb-key-label"}
          fontSize={
            label.length > 14 ? 7 : label.length > 8 ? 8 : label.length > 4 ? 9 : 11
          }
        >
          {label}
        </text>
      )}
    </g>
  );
}

/** Decorative Arabic keyboard — full-width illustration */
export function HeroKeyboardBackground({ className = "" }: { className?: string }) {
  const W = 1400;
  const H = 240;
  const pad = 16;
  const chassisW = W - pad * 2;
  const chassisH = 188;
  const chassisY = (H - chassisH) / 2;
  const U = 58;
  const G = 10;
  const keyH = 40;
  const rowDy = keyH + G;
  const y0 = chassisY + 22;

  const row1 = layoutRow(ROW1, pad, chassisW, y0, { keyW: U, gap: G });
  const row2 = layoutRow(ROW2, pad, chassisW, y0 + rowDy, { indent: 24, keyW: U, gap: G });

  const modY = y0 + rowDy * 2;
  const spaceW = 360;
  const spaceX = pad + (chassisW - spaceW) / 2;
  const modKeys: (BgKey & { x: number; y: number; w: number; h: number })[] = [
    { x: pad + 32, y: modY, w: 64, h: keyH, label: "Ctrl", mono: true },
    { x: pad + 32 + 64 + G, y: modY, w: 52, h: keyH, label: "Alt", mono: true },
    {
      x: spaceX,
      y: modY,
      w: spaceW,
      h: keyH,
      label: "/arabic write",
      highlight: true,
      mono: true,
      delay: 0,
    },
    {
      x: spaceX + spaceW + G,
      y: modY,
      w: 92,
      h: keyH,
      label: "مصري ✓",
      highlight: true,
      delay: 400,
    },
    {
      x: pad + chassisW - 32 - 52 - G - 48,
      y: modY,
      w: 52,
      h: keyH,
      label: "arabic",
      highlight: true,
      mono: true,
      delay: 800,
    },
    {
      x: pad + chassisW - 32 - 48,
      y: modY,
      w: 48,
      h: keyH,
      label: "↵",
      highlight: true,
      mono: true,
      delay: 600,
    },
  ];

  return (
    <svg
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect
        x={pad}
        y={chassisY}
        width={chassisW}
        height={chassisH}
        rx="18"
        className="kb-chassis"
      />
      {row1.map((key, i) => (
        <BgKeyCap key={`r1-${i}`} {...key} h={keyH} />
      ))}
      {row2.map((key, i) => (
        <BgKeyCap key={`r2-${i}`} {...key} h={keyH} />
      ))}
      {modKeys.map((key, i) => (
        <BgKeyCap key={`r3-${i}`} {...key} />
      ))}
    </svg>
  );
}
