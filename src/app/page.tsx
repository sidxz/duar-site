import { ArrowRight, ArrowUpRight } from "lucide-react";
import { ctaPrimary, ctaOutline } from "@/lib/cta";
import { links } from "@/lib/links";
import { TokenFlow } from "@/components/marketing/token-flow";
import { IdpDemo, WorkspaceDemo, TiersDemo, ServiceDemo } from "@/components/marketing/capability-demos";
import { TierStack } from "@/components/marketing/tier-stack";
import { CodeCard, type CodeLine } from "@/components/marketing/code-card";

const steps = [
  {
    n: "01",
    title: "Sign in with your IdP",
    desc: "Google, GitHub, Entra ID, or any OIDC provider. Your login UI, your client ID — Sentinel never sees a password.",
  },
  {
    n: "02",
    title: "Sentinel verifies and mints",
    desc: "The IdP token is checked against the provider's JWKS, then exchanged for one RS256 authz JWT carrying workspace and role claims.",
  },
  {
    n: "03",
    title: "Your SDK enforces",
    desc: "require_user, require_action, can() — FastAPI dependencies, React guards, and Next.js middleware read the same token.",
  },
  {
    n: "04",
    title: "Manage it in the admin panel",
    desc: "Users, workspaces, roles, grants, service apps, activity — one React SPA, no SQL console.",
  },
];

const stats = [
  { value: "3", label: "Authorization tiers, coarse to per-resource" },
  { value: "4", label: "SDKs — Python, JS, React, Next.js" },
  { value: "0", label: "Passwords stored. Ever." },
];

const capabilities = [
  {
    title: "Bring your own IdP",
    desc: "AuthZ mode: your app logs in, Sentinel verifies the IdP token and mints an authz JWT. Proxy mode if you'd rather Sentinel own the flow.",
    href: links.guide("how-it-works"),
    demo: <IdpDemo />,
  },
  {
    title: "Workspaces & organizations",
    desc: "Multi-tenant by default. owner / admin / editor / viewer, groups, and email-domain organizations.",
    href: links.guide("workspaces"),
    demo: <WorkspaceDemo />,
  },
  {
    title: "Three-tier authorization",
    desc: "Workspace roles in the JWT, RBAC actions in the DB, Zanzibar-style entity ACLs per resource.",
    href: links.guide("authorization"),
    demo: <TiersDemo />,
  },
  {
    title: "Service-to-service",
    desc: "Service keys, realms, and m2m calls with or without a user in context.",
    href: links.guide("service-apps"),
    demo: <ServiceDemo />,
  },
];

const tiersCode: CodeLine[] = [
  { t: "# Tier 1: workspace role from the JWT — no DB call", k: "muted" },
  '@app.get("/projects")',
  "async def list_projects(user=Depends(sentinel.require_user)):",
  "    return await get_projects(user.workspace_id)",
  "",
  { t: "# Tier 2: RBAC action check", k: "muted" },
  '@app.get("/reports/export")',
  'async def export(user=Depends(sentinel.require_action("reports:export"))):',
  "    ...",
  "",
  { t: "# Tier 3: entity-level permission", k: "muted" },
  '@app.get("/projects/{id}")',
  "async def get_project(id: str, auth=Depends(sentinel.get_auth)):",
  '    if not await auth.can("project", id, "view"):',
  "        raise HTTPException(403)",
];

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto w-full max-w-6xl px-6 pt-20 pb-8">
        <p className="label-mono text-[11px] text-muted-foreground">
          <span className="text-brand">Open source</span> · Self-hosted · Bring your own IdP
        </p>
        <h1 className="mt-6 max-w-3xl text-5xl font-medium leading-[1.02] tracking-tight text-ink sm:text-6xl lg:text-[76px]">
          Auth for everything after login.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Keep Sign in with Google, GitHub, or Entra ID exactly as it is.{" "}
          <span className="font-medium text-ink">Sentinel</span> adds workspaces,
          roles, and per-resource permissions — issued as one RS256 JWT and
          enforced by SDKs for FastAPI, React, and Next.js. Self-hosted.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={links.gettingStarted} className={ctaPrimary}>
            Get started
          </a>
          <a href={links.github} target="_blank" rel="noopener noreferrer" className={ctaOutline}>
            View on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <div className="mt-14 grid items-center gap-12 lg:grid-cols-[1.1fr_1fr]">
          <TokenFlow className="mx-auto h-auto w-full max-w-md lg:max-w-none" />
          <ol className="flex flex-col gap-9">
            {steps.map((s) => (
              <li key={s.n} className="flex gap-5">
                <span className="label-mono shrink-0 pt-1.5 text-[11px] text-muted-foreground">{s.n}</span>
                <div>
                  <h3 className="text-xl font-medium text-ink">{s.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Stats */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid gap-8 border-y border-border py-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="text-6xl font-medium tracking-tight text-brand">{s.value}</div>
              <p className="mt-3 label-mono text-[11px] text-muted-foreground">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Capabilities */}
      <section id="features" className="mx-auto w-full max-w-6xl scroll-mt-20 px-6 py-16">
        <p className="label-mono text-[11px] text-muted-foreground">/ How it works</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Everything your IdP doesn&apos;t do.
        </h2>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((c) => (
            <a
              key={c.title}
              href={c.href}
              className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-paper transition-shadow hover:shadow-[0_12px_40px_rgba(11,11,13,0.09)]"
            >
              <div className="bg-brand-wash px-7 pt-8">{c.demo}</div>
              <div className="p-7">
                <h3 className="text-lg font-medium text-ink">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 label-mono text-[11px] text-ink">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Authorization deep-dive */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <TierStack className="mx-auto h-auto w-full max-w-md lg:max-w-none" />
          <div>
            <p className="label-mono text-[11px] text-muted-foreground">/ Three tiers, one dependency</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Coarse to fine, without leaving the request.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              The workspace role rides in the JWT — no database call. RBAC
              actions and Zanzibar-style entity ACLs answer the finer questions
              from the same service, through the same dependency.
            </p>
            <CodeCard title="FastAPI" lines={tiersCode} className="mt-8" />
          </div>
        </div>
      </section>

      {/* @@NEXT_SECTION */}
    </div>
  );
}
