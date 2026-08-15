const EDGE = "rgba(255,255,255,0.25)";
const JOINT = "rgba(255,255,255,0.35)";
const LABEL = "rgba(255,255,255,0.4)";

type NodeProps = { x: number; y: number; w: number; label: string; sub: string; accent?: boolean };

function Node({ x, y, w, label, sub, accent }: NodeProps) {
  const cx = x + w / 2;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={46}
        rx={6}
        fill={accent ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,0.03)"}
        stroke={accent ? "var(--color-brand)" : "rgba(255,255,255,0.16)"}
        strokeWidth={accent ? 1.25 : 1}
      />
      <text x={cx} y={y + 20} textAnchor="middle" fontSize={12.5} fontWeight={500} fill="rgba(255,255,255,0.92)">
        {label}
      </text>
      <text x={cx} y={y + 35} textAnchor="middle" fontSize={8.5} letterSpacing="0.1em" fill="rgba(255,255,255,0.38)">
        {sub}
      </text>
    </g>
  );
}

export function Topology() {
  return (
    <div className="rounded-2xl border border-border bg-ink p-7 sm:p-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <span className="label-mono text-[10px] text-paper/50">Runtime topology</span>
        <span className="label-mono text-[10px] text-paper/30">One image · Self-hosted</span>
      </div>
      <svg
        viewBox="0 0 560 324"
        role="img"
        aria-label="Runtime topology: your app signs in with the identity provider and exchanges the id_token with the Sentinel API for an authz JWT; the admin panel talks to the same API; Sentinel persists to PostgreSQL and uses Redis for the denylist, auth codes and rate limits."
        className="h-auto w-full font-mono"
      >
        <defs>
          <marker id="tp-arw" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M1 0.8 L6.8 4 L1 7.2" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Edges */}
        <g fill="none" stroke={EDGE} strokeWidth="1">
          <path d="M216 39 H339" markerEnd="url(#tp-arw)" />
          <path d="M116 62 V121" markerEnd="url(#tp-arw)" />
          <path d="M344 149 H325" markerEnd="url(#tp-arw)" />
          <path d="M168 172 V232" />
          <path d="M138 232 H422" />
          <path d="M138 232 V257" markerEnd="url(#tp-arw)" />
          <path d="M422 232 V257" markerEnd="url(#tp-arw)" />
        </g>
        <g fill={JOINT}>
          <circle cx="168" cy="232" r="2" />
        </g>

        {/* Edge labels */}
        <g fontSize={9} letterSpacing="0.1em" fill={LABEL}>
          <text x={278} y={31} textAnchor="middle">SIGN IN</text>
          <text x={126} y={96}>ID_TOKEN → AUTHZ JWT</text>
          <text x={280} y={220} textAnchor="middle">PERSISTENCE</text>
        </g>

        {/* Nodes */}
        <Node x={16} y={16} w={200} label="Your app + SDK" sub="FASTAPI · REACT · NEXT.JS" />
        <Node x={344} y={16} w={200} label="Identity provider" sub="GOOGLE · GITHUB · ENTRA ID" />
        <Node x={16} y={126} w={304} label="Sentinel API" sub="FASTAPI · AUTHZ + PROXY MODES" accent />
        <Node x={344} y={126} w={200} label="Admin panel" sub="REACT SPA" />
        <Node x={16} y={262} w={244} label="PostgreSQL" sub="USERS · WORKSPACES · ROLES · ACLS" />
        <Node x={300} y={262} w={244} label="Redis" sub="DENYLIST · AUTH CODES · RATE LIMITS" />
      </svg>
    </div>
  );
}
