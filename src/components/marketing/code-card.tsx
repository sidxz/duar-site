export type CodeLine = string | { t: string; k: "muted" | "brand" };

// Static, hand-marked code: whole-line styling only (comments muted, one brand
// line per card). No highlighter dependency.
export function CodeCard({
  title,
  install,
  lines,
  className,
}: {
  title: string;
  install?: string;
  lines: CodeLine[];
  className?: string;
}) {
  return (
    <div className={`flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border bg-paper ${className ?? ""}`}>
      <div className="flex items-center justify-between gap-4 border-b border-border bg-wash px-5 py-3">
        <span className="label-mono text-[10px] text-ink">{title}</span>
        {install && <span className="truncate font-mono text-[10px] text-muted-foreground">{install}</span>}
      </div>
      <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-[1.7] text-ink">
        {lines.map((l, i) => {
          const t = typeof l === "string" ? l : l.t;
          const k = typeof l === "string" ? undefined : l.k;
          return (
            <div key={i} className={k === "muted" ? "text-muted-foreground" : k === "brand" ? "text-brand" : undefined}>
              {t || " "}
            </div>
          );
        })}
      </pre>
    </div>
  );
}
