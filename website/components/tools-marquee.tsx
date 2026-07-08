import type { SupportedTool } from "@/lib/supported-tools";
import { SUPPORTED_TOOLS } from "@/lib/supported-tools";

function ToolIconBadge({ tool }: { tool: SupportedTool }) {
  const { icon, label } = tool;

  return (
    <span className="tool-pill" title={label}>
      {icon.kind === "color" ? (
        // eslint-disable-next-line @next/next/no-img-element -- static public assets
        <img src={icon.src} alt="" className="tool-pill-icon" width={18} height={18} />
      ) : (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon.light}
            alt=""
            className="tool-pill-icon tool-pill-icon--light"
            width={18}
            height={18}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={icon.dark}
            alt=""
            className="tool-pill-icon tool-pill-icon--dark"
            width={18}
            height={18}
          />
        </>
      )}
      <span>{label}</span>
    </span>
  );
}

export function ToolsMarquee() {
  const track = [...SUPPORTED_TOOLS, ...SUPPORTED_TOOLS];

  return (
    <div className="tools-marquee" aria-hidden="true">
      <div className="tools-marquee-track">
        {track.map((tool, i) => (
          <ToolIconBadge key={`${tool.id}-${i}`} tool={tool} />
        ))}
      </div>
      <p className="sr-only">
        أدوات مدعومة: {SUPPORTED_TOOLS.map((t) => t.label).join("، ")}
      </p>
    </div>
  );
}
