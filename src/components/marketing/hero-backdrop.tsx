/* Hero backdrop, on the ink ground — three layers, all decorative and
   server-rendered:
   1. a hairline grid fading out from the top-right (`.ink-grid`),
   2. two crimson glow blobs drifting on 22/28 s loops (the one place red is
      allowed to be a field: it is light, not a fill),
   3. the claims ledger — two faint columns of the claims and checks the SDK
      actually reads scroll slowly up the right half; one line per column is
      brand red (the minted grant). CSS loop (`animate-ledger`), xl only
      (below that it collides with the headline), fades before the steps.
   Reduced motion → everything static. The parent is the full-bleed hero
   wrapper (`relative overflow-hidden`), so `right-0` is the viewport edge. */

const col1 = [
  '{"alg": "RS256", "kid": "2026-08"}',
  'iss: "https://auth.acme.dev"',
  'sub: "u_7f3a9c"',
  'aud: "duar:access"',
  'workspace_id: "ws_acme"',
  ['workspace_role: "editor"', true],
  'realm: "platform"',
  'jti: "9c1e-4b7a-8d20"',
  "iat: 1755280000",
  "exp: 1755283600",
  "require_user            ok",
  'require_action("reports:export")  ok',
  'can("project", "42", "view")  granted',
  "GET /projects/42        200",
  "POST /reports/export    403",
  "refresh: rotated · reuse: none",
  "denylist: jti 8b02-… (redis)",
  "kid rotation: 2026-08 -> 2026-11",
  'service_name: "team-notes"',
  "X-Service-Key: sk_live_9f3a…",
] as const;

const col2 = [
  "GET /.well-known/jwks.json  200",
  "kid: 2026-08   alg: RS256",
  "verify: id_token (google)   ok",
  "aud: your-client-id.apps…   ok",
  "exp: not expired            ok",
  "mint: authz_jwt             15m",
  ["grant: ws_acme / editor", true],
  'groups: ["platform-eng"]',
  "org: acme.dev (email domain)",
  'accessible("project")   [42, 47, 51]',
  'can("doc", "42", "edit")    denied',
  'require_action("users:invite")  ok',
  "m2m: team-notes -> reports  ok",
  "rate: 118/120  window 60s",
  "audit: user.role.changed",
] as const;

type Line = string | readonly [string, boolean];

function Column({ lines, className }: { lines: readonly Line[]; className?: string }) {
  // duplicated so the -50% translate loops seamlessly
  const rows = [...lines, ...lines];
  return (
    <div className={`whitespace-pre font-mono text-[11px] font-medium leading-[2.15] text-paper will-change-transform motion-safe:animate-ledger ${className ?? ""}`}>
      {rows.map((l, i) => {
        const [text, hot] = typeof l === "string" ? [l, false] : l;
        return (
          <div key={i} className={hot ? "text-brand" : undefined}>
            {text}
          </div>
        );
      })}
    </div>
  );
}

export function HeroBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <div className="ink-grid absolute inset-0" />
      <div className="absolute -top-[360px] -right-[260px] h-[760px] w-[1100px] rounded-full bg-[radial-gradient(closest-side,rgba(244,55,55,0.55),rgba(122,15,31,0.38)_45%,transparent_72%)] blur-3xl will-change-transform motion-safe:animate-glow-a" />
      <div className="absolute -bottom-[260px] -left-[200px] h-[520px] w-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(122,15,31,0.32),transparent_70%)] blur-3xl will-change-transform motion-safe:animate-glow-b" />
      {/* ledger: from ~54% of the 72rem container to the viewport edge */}
      <div className="ledger-fade-y absolute top-0 left-[calc(50%+3rem)] right-0 hidden h-[60%] xl:block">
        <div className="ledger-fade-x absolute inset-0 flex gap-12 pl-[22%]">
          <Column lines={col1} className="opacity-[.22]" />
          <Column lines={col2} className="opacity-[.15] [animation-duration:92s]" />
        </div>
      </div>
    </div>
  );
}
