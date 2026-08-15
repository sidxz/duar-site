import { ArrowUpRight } from "lucide-react";
import { ctaPrimary, ctaOutline } from "@/lib/cta";
import { links } from "@/lib/links";
import { TokenFlow } from "@/components/marketing/token-flow";

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

      {/* @@NEXT_SECTION */}
    </div>
  );
}
