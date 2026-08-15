import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import { ctaPrimary, ctaOutline } from "@/lib/cta";
import { links } from "@/lib/links";
import { asset } from "@/lib/asset";
import { TokenFlow } from "@/components/marketing/token-flow";
import { IdpDemo, WorkspaceDemo, TiersDemo, ServiceDemo } from "@/components/marketing/capability-demos";
import { TierStack } from "@/components/marketing/tier-stack";
import { CodeCard, type CodeLine } from "@/components/marketing/code-card";
import { ScreenshotFrame } from "@/components/marketing/screenshot-frame";
import { Topology } from "@/components/marketing/topology";

const steps = [
  {
    n: "01",
    title: "Sign in with your IdP",
    desc: "Google, GitHub, Entra ID, or any OIDC provider. Your login UI, your client ID — Duar never sees a password.",
  },
  {
    n: "02",
    title: "Duar verifies and mints",
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
    desc: "AuthZ mode: your app logs in, Duar verifies the IdP token and mints an authz JWT. Proxy mode if you'd rather Duar own the flow.",
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
  "async def list_projects(user=Depends(duar.require_user)):",
  "    return await get_projects(user.workspace_id)",
  "",
  { t: "# Tier 2: RBAC action check", k: "muted" },
  '@app.get("/reports/export")',
  "async def export(",
  '    user=Depends(duar.require_action("reports:export")),',
  "):",
  "    ...",
  "",
  { t: "# Tier 3: entity-level permission", k: "muted" },
  '@app.get("/projects/{id}")',
  "async def get_project(id: str, auth=Depends(duar.get_auth)):",
  '    if not await auth.can("project", id, "view"):',
  "        raise HTTPException(403)",
];

const sdkCards: { title: string; install: string; lines: CodeLine[] }[] = [
  {
    title: "FastAPI",
    install: "pip install duar-auth",
    lines: [
      "from fastapi import Depends, FastAPI",
      "from duar_auth import Duar",
      "",
      "duar = Duar(",
      '    base_url="https://auth.example.com",',
      '    service_name="my-app",',
      '    service_key="sk_...",',
      '    mode="authz",',
      '    idp_audience="your-google-client-id.apps.googleusercontent.com",',
      '    idp_jwks_url="https://www.googleapis.com/oauth2/v3/certs",',
      ")",
      "",
      "app = FastAPI(lifespan=duar.lifespan)",
      { t: "duar.protect(app)", k: "brand" },
      "",
      '@app.get("/projects")',
      "async def list_projects(user=Depends(duar.require_user)):",
      "    return await get_projects(user.workspace_id)",
    ],
  },
  {
    title: "React",
    install: "npm i @duar-auth/react",
    lines: [
      'import { IdpConfigs } from "@duar-auth/js";',
      'import { AuthzProvider, AuthzGuard, useAuthz } from "@duar-auth/react";',
      "",
      "export function App() {",
      "  return (",
      "    <AuthzProvider config={{",
      '      duarUrl: "https://auth.example.com",',
      '      mintEndpoint: "/api/auth/mint",',
      '      idps: { google: IdpConfigs.google("your-google-client-id") },',
      "    }}>",
      { t: "      <AuthzGuard fallback={<Login />}>", k: "brand" },
      "        <Dashboard />",
      "      </AuthzGuard>",
      "    </AuthzProvider>",
      "  );",
      "}",
      "",
      "function Login() {",
      "  const { login } = useAuthz();",
      '  return <button onClick={() => login("google")}>Sign in</button>;',
      "}",
    ],
  },
  {
    title: "Next.js",
    install: "npm i @duar-auth/nextjs",
    lines: [
      { t: "// middleware.ts", k: "muted" },
      'import { createDuarAuthzMiddleware } from "@duar-auth/nextjs/authz-middleware";',
      "",
      { t: "export default createDuarAuthzMiddleware({", k: "brand" },
      "  duarUrl: process.env.DUAR_URL!,",
      '  idpJwksUrl: "https://www.googleapis.com/oauth2/v3/certs",',
      "  idpAudience: process.env.GOOGLE_CLIENT_ID!,",
      '  idpIssuer: "https://accounts.google.com",',
      '  serviceName: "team-notes",',
      '  publicPaths: ["/login", "/auth/callback"],',
      '  loginPath: "/login",',
      "});",
      "",
      "export const config = {",
      '  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],',
      "};",
    ],
  },
];

const problems = [
  {
    title: "JWT validation, per service",
    pain: "JWKS fetch, audience, clock skew, key rotation — re-implemented in every backend.",
    fix: "The SDK does it: RS256, kid rotation, /.well-known/jwks.json.",
  },
  {
    title: "A roles table in every app",
    pain: "RBAC drifts across services; nobody knows who can export what.",
    fix: "Namespaced actions and workspace-scoped roles in one place; require_action.",
  },
  {
    title: "Ad-hoc sharing logic",
    pain: "“Can Alice edit doc 42?” becomes columns and joins.",
    fix: "Zanzibar-style entity ACLs; can() and accessible().",
  },
  {
    title: "Tenant isolation by convention",
    pain: "The workspace_id filter someone forgets.",
    fix: "Workspace-scoped claims; roles and grants can't cross tenants.",
  },
  {
    title: "Token hygiene as an afterthought",
    pain: "Rotation, reuse detection, and revocation bolted on late.",
    fix: "Refresh rotation, reuse detection, Redis denylist, jti — built in.",
  },
  {
    title: "No admin UI",
    pain: "Auth state lives in SQL consoles and Slack threads.",
    fix: "React admin: users, workspaces, roles, grants, service apps, activity, usage.",
  },
];

const adminAreas = [
  "Users and workspaces",
  "Roles, actions, and grants",
  "Permissions (entity ACLs)",
  "Service apps and realms",
  "Activity, insights, usage",
];

const security = [
  "RS256 JWTs with kid rotation",
  "Refresh rotation with reuse detection",
  "Redis denylist for revocation",
  "IdP token never persisted",
  "Service keys 256-bit, DB-managed",
  "Rate limiting, CORS, HSTS, CSP, trusted hosts",
  "Audit and activity trail",
  "Trivy dependency and container scans in CI",
];

const stack = [
  { name: "FastAPI", role: "API layer", logo: "/logos/fastapi.svg" },
  { name: "SQLAlchemy 2.0", role: "Async ORM", logo: "/logos/sqlalchemy.svg" },
  { name: "PostgreSQL 16", role: "State", logo: "/logos/postgresql.svg" },
  { name: "Redis 7", role: "Denylist · limits", logo: "/logos/redis.svg" },
  { name: "Authlib", role: "OAuth2 / OIDC", logo: null },
  { name: "Python 3.12", role: "Service + SDK", logo: "/logos/python.svg" },
  { name: "React", role: "Admin · SDK", logo: "/logos/react.svg" },
  { name: "TypeScript", role: "JS SDKs", logo: "/logos/typescript.svg" },
  { name: "Docker", role: "Container image", logo: "/logos/docker.svg" },
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
          Authorization for everything after login.
        </h1>
        <p className="mt-5 label-mono text-[11px] text-muted-foreground">
          <span className="text-ink">Duar</span> — Doorway for Users, Actions, and Resources
        </p>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Keep Sign in with Google, GitHub, or Entra ID exactly as it is.{" "}
          <span className="font-medium text-ink">Duar</span> adds workspaces,
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
                  <p className="text-xl font-medium text-ink">{s.title}</p>
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
          <div className="min-w-0">
            <p className="label-mono text-[11px] text-muted-foreground">/ Users · Actions · Resources — three tiers, one dependency</p>
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

      {/* SDKs */}
      <section className="mx-auto w-full max-w-6xl px-6 py-16">
        <p className="label-mono text-[11px] text-muted-foreground">/ Ship it in your stack</p>
        <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          Three lines to a protected route.
        </h2>
        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {sdkCards.map((c) => (
            <CodeCard key={c.title} title={c.title} install={c.install} lines={c.lines} />
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          Full guides:{" "}
          <a href={links.sdkPython} className="text-ink underline-offset-4 hover:underline">Python SDK</a>
          {" · "}
          <a href={links.sdkJs} className="text-ink underline-offset-4 hover:underline">JS/TS SDK</a>
          {" · "}
          <a href={links.tutorialReact} className="text-ink underline-offset-4 hover:underline">React + FastAPI tutorial</a>
          {" · "}
          <a href={links.tutorialNext} className="text-ink underline-offset-4 hover:underline">Next.js tutorial</a>
        </p>
      </section>

      {/* Problems */}
      <section className="border-y border-border bg-wash/60">
        <div className="mx-auto w-full max-w-6xl px-6 py-20">
          <p className="label-mono text-[11px] text-muted-foreground">/ What you stop building</p>
          <h2 className="mt-4 max-w-2xl text-4xl font-medium tracking-tight text-ink sm:text-5xl">
            Six things every app re-implements. Solved once.
          </h2>
          <ol className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2">
            {problems.map((p, i) => (
              <li key={p.title} className="flex gap-5">
                <span className="label-mono shrink-0 text-[11px] text-muted-foreground">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="border-t border-ink/15 pt-1">
                  <h3 className="text-lg font-medium text-ink">{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.pain}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink">{p.fix}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Admin panel */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="label-mono text-[11px] text-muted-foreground">/ Admin panel</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              See everything from one place.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              A React admin ships with the service. Every workspace, role,
              grant, and service key is one click away — with the activity
              trail to explain how it got there.
            </p>
            <ul className="mt-8 space-y-3">
              {adminAreas.map((a) => (
                <li key={a} className="flex items-center gap-3 text-sm text-ink">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-ink" />
                  {a}
                </li>
              ))}
            </ul>
            <a href={links.guide("admin-panel")} className="mt-8 inline-flex items-center gap-1.5 label-mono text-[11px] text-ink">
              Admin panel guide
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
          <ScreenshotFrame alt="Duar admin dashboard" label="Screenshot — admin dashboard" />
        </div>
      </section>

      {/* Security */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        <div className="rounded-2xl border border-border bg-paper p-8 sm:p-12">
          <p className="label-mono text-[11px] text-muted-foreground">/ Built to be audited</p>
          <h2 className="mt-4 max-w-2xl text-3xl font-medium tracking-tight text-ink sm:text-4xl">
            Boring where it counts.
          </h2>
          <ul className="mt-8 grid gap-x-12 gap-y-3 sm:grid-cols-2">
            {security.map((s) => (
              <li key={s} className="flex items-start gap-3 text-sm text-ink">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-brand" />
                {s}
              </li>
            ))}
          </ul>
          <a href={links.security} className="mt-8 inline-flex items-center gap-1.5 label-mono text-[11px] text-ink">
            Security overview
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </section>

      {/* Under the hood */}
      <section className="mx-auto w-full max-w-6xl px-6 py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
          <div>
            <p className="label-mono text-[11px] text-muted-foreground">/ Under the hood</p>
            <h2 className="mt-4 text-4xl font-medium tracking-tight text-ink sm:text-5xl">
              Built on proven infrastructure.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              FastAPI and SQLAlchemy 2.0 async on PostgreSQL 16 and Redis 7,
              with Authlib doing the OAuth2/OIDC heavy lifting. Ships as one
              container image. Nothing leaves your network.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-3">
              {stack.map((t) => (
                <div key={t.name} className="group flex items-center gap-3 bg-paper px-4 py-3.5">
                  {t.logo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={asset(t.logo)}
                      alt=""
                      className="h-5 w-5 shrink-0 rounded-[3px] opacity-55 grayscale transition duration-200 group-hover:opacity-100 group-hover:grayscale-0"
                    />
                  ) : (
                    <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-[3px] bg-wash font-mono text-[9px] text-ink">
                      A
                    </span>
                  )}
                  <div className="min-w-0">
                    <div className="truncate text-[13px] font-medium leading-tight text-ink">{t.name}</div>
                    <div className="label-mono mt-0.5 truncate text-[9px] text-muted-foreground">{t.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <Topology />
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto w-full max-w-6xl px-6 pb-24">
        <div className="rounded-2xl bg-brand p-[1.5px]">
          <div className="flex flex-col items-start gap-8 rounded-[15px] bg-paper px-8 py-14 sm:px-14 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="max-w-md text-3xl font-medium tracking-tight text-ink sm:text-4xl">
                Ship auth in an afternoon.
              </h2>
              <p className="mt-4 max-w-md text-muted-foreground">
                Docker Compose or Kubernetes, your IdP credentials, one env
                file. Open source, MIT, yours to run.
              </p>
              <a href={links.ghcr} target="_blank" rel="noopener noreferrer" className="mt-5 inline-block font-mono text-[12px] text-ink underline-offset-4 hover:underline">docker pull ghcr.io/sidxz/duar</a>
            </div>
            <div className="flex shrink-0 flex-wrap gap-3">
              <a href={links.gettingStarted} className={ctaPrimary}>
                Get started
              </a>
              <a href={links.github} target="_blank" rel="noopener noreferrer" className={ctaOutline}>
                Star on GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
        <p className="mt-4 label-mono text-[10px] text-muted-foreground">
          Beta — APIs may change before 1.0.
        </p>
      </section>
    </div>
  );
}
