/* Hero graphic — the AuthZ-mode handshake. Your IdP issues an id_token; the
   app hands it to Duar, which verifies it against the IdP's JWKS and mints
   one RS256 authz JWT carrying workspace + role claims; the SDK enforces that
   JWT in your app. Static, server-rendered, drawn in paper on the ink hero.
   Brand red marks the shield and the minted-token edge only. */
const INK = "var(--color-paper)"; // line + text colour (the hero ground is ink)
const FILL = "var(--color-ink)"; // card fills
const CHIP = "rgba(255,255,255,0.08)"; // "your app" chip
const MONO = "var(--font-dm-mono), monospace";

const idps = [
  { y: 68, label: "Google" },
  { y: 128, label: "GitHub" },
  { y: 188, label: "Entra ID" },
];

const claims: [string, string][] = [
  ["sub", '"u_7f3a9c"'],
  ["workspace_id", '"ws_acme"'],
  ["workspace_role", '"editor"'],
  ["aud", '"duar:access"'],
  ["jti", '"9c1e-…"'],
];

export function TokenFlow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 520 290"
      role="img"
      aria-label="Google, GitHub, or Entra ID issue an id_token; Duar verifies it and mints an RS256 authz JWT with sub, workspace_id and workspace_role claims; your app's SDK enforces it"
      className={className}
    >
      <defs>
        <marker id="tf-arw" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 0.8 L6.8 4 L1 7.2" fill="none" stroke={INK} strokeOpacity="0.5" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
        <marker id="tf-arw-brand" viewBox="0 0 8 8" refX="6.5" refY="4" markerWidth="7" markerHeight="7" orient="auto">
          <path d="M1 0.8 L6.8 4 L1 7.2" fill="none" stroke="var(--color-brand)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
        </marker>
      </defs>

      {/* IdP chips → shield */}
      {idps.map((p) => (
        <g key={p.label}>
          <path
            d={`M128 ${p.y + 15} C 166 ${p.y + 15}, 170 143, 206 143`}
            fill="none"
            stroke={INK}
            strokeOpacity="0.25"
            strokeWidth="1"
          />
          <rect x="16" y={p.y} width="112" height="30" rx="4" fill={FILL} stroke={INK} strokeWidth="1" />
          <text x="30" y={p.y + 19} fontFamily={MONO} fontSize="10.5" fill={INK}>
            {p.label}
          </text>
        </g>
      ))}
      <text x="150" y="136" fontFamily={MONO} fontSize="8.5" letterSpacing="0.1em" fill={INK} opacity="0.5">
        ID_TOKEN
      </text>

      {/* Duar — shield with keyhole (brand) */}
      <path
        d="M240 96 L274 109 V146 C274 169 258 184 240 192 C222 184 206 169 206 146 V109 Z"
        fill={FILL}
        stroke="var(--color-brand)"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="240" cy="136" r="7" fill="none" stroke="var(--color-brand)" strokeWidth="1.6" />
      <path d="M236.5 142 L243.5 142 L246 160 L234 160 Z" fill="none" stroke="var(--color-brand)" strokeWidth="1.6" strokeLinejoin="round" />
      <text x="240" y="214" textAnchor="middle" fontFamily={MONO} fontSize="9" letterSpacing="0.14em" fill={INK} opacity="0.55">
        DUAR
      </text>

      {/* minted token edge (brand) */}
      <path d="M274 143 H330" fill="none" stroke="var(--color-brand)" strokeWidth="1.25" markerEnd="url(#tf-arw-brand)" />
      <text x="302" y="134" textAnchor="middle" fontFamily={MONO} fontSize="8.5" letterSpacing="0.1em" fill={INK} opacity="0.5">
        AUTHZ JWT
      </text>

      {/* JWT card */}
      <rect x="336" y="78" width="168" height="130" rx="6" fill={FILL} stroke={INK} strokeWidth="1.2" />
      <path d="M336 100 H504" stroke={INK} strokeOpacity="0.15" />
      <text x="348" y="93" fontFamily={MONO} fontSize="9" letterSpacing="0.1em" fill={INK} opacity="0.55">
        RS256 · KID 2026-08
      </text>
      {claims.map(([k, v], i) => (
        <text key={k} x="348" y={118 + i * 17} fontFamily={MONO} fontSize="10" fill={INK}>
          <tspan opacity="0.5">{k}: </tspan>
          {v}
        </text>
      ))}

      {/* → your app */}
      <path d="M420 208 V232" fill="none" stroke={INK} strokeOpacity="0.35" strokeWidth="1" markerEnd="url(#tf-arw)" />
      <rect x="356" y="238" width="128" height="32" rx="4" fill={CHIP} stroke={INK} strokeWidth="1" />
      <text x="420" y="258" textAnchor="middle" fontFamily={MONO} fontSize="10.5" fill={INK}>
        your app · SDK
      </text>
    </svg>
  );
}
