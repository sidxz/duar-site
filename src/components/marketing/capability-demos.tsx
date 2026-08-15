import { ArrowRight, Check } from "lucide-react";

const win =
  "flex h-32 flex-col justify-center rounded-t-lg border border-b-0 border-border bg-paper p-4 font-mono text-[11px] leading-relaxed text-ink";
const chip = "rounded bg-wash px-1.5 py-0.5 text-[9px] text-ink";

export function IdpDemo() {
  return (
    <div className={win}>
      <div className="text-muted-foreground">{"// authz mode"}</div>
      <div className="mt-1 flex items-center gap-2">
        <span>id_token</span>
        <ArrowRight className="h-3 w-3 text-muted-foreground" />
        <span>authz_jwt</span>
      </div>
      <div className="mt-1 text-muted-foreground">
        workspace_role: <span className="text-ink">editor</span>
      </div>
    </div>
  );
}

export function WorkspaceDemo() {
  const members: [string, string][] = [
    ["ada", "owner"],
    ["grace", "admin"],
    ["linus", "viewer"],
  ];
  return (
    <div className={win}>
      <div className="text-muted-foreground">acme-labs · 3 members</div>
      {members.map(([name, role]) => (
        <div key={name} className="mt-1 flex items-center justify-between">
          <span>{name}</span>
          <span className={chip}>{role}</span>
        </div>
      ))}
    </div>
  );
}

export function TiersDemo() {
  const rows: [string, string][] = [
    ["require_user", "editor"],
    ["require_action", "reports:export"],
    ["can(doc, view)", "granted"],
  ];
  return (
    <div className={win}>
      {rows.map(([fn, res]) => (
        <div key={fn} className="mt-1 flex items-center justify-between gap-2 first:mt-0">
          <span>{fn}</span>
          <span className="inline-flex items-center gap-1">
            <span className={chip}>{res}</span>
            <Check className="h-3 w-3 text-ink" />
          </span>
        </div>
      ))}
    </div>
  );
}

export function ServiceDemo() {
  return (
    <div className={win}>
      <div>X-Service-Key: sk_live_9f…</div>
      <div className="mt-1 flex items-center gap-2">
        <span>realm: platform</span>
        <Check className="h-3 w-3 text-ink" />
      </div>
      <div className="mt-1 text-muted-foreground">user: none (m2m)</div>
    </div>
  );
}
