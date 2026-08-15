import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { links } from "@/lib/links";

const columns: Record<string, { label: string; href: string }[]> = {
  Product: [
    { label: "Features", href: "/#features" },
    { label: "Docs", href: links.docs },
    { label: "Getting started", href: links.gettingStarted },
    { label: "Security", href: links.security },
  ],
  SDKs: [
    { label: "sentinel-auth-sdk (PyPI)", href: links.pypi },
    { label: "@sentinel-auth/js", href: links.npm("js") },
    { label: "@sentinel-auth/react", href: links.npm("react") },
    { label: "@sentinel-auth/nextjs", href: links.npm("nextjs") },
  ],
  Community: [
    { label: "GitHub", href: links.github },
    { label: "Issues", href: links.issues },
    { label: "Changelog", href: links.changelog },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border">
      {/* brand hairline */}
      <div className="h-px w-full bg-brand" />
      <div className="mx-auto w-full max-w-6xl px-6 py-16">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Authentication proxy and authorization microservice. Bring your
              own IdP. Open source, self-hosted.
            </p>
          </div>
          {Object.entries(columns).map(([category, items]) => (
            <div key={category}>
              <p className="label-mono text-[10px] text-muted-foreground">{category}</p>
              <ul className="mt-4 space-y-3">
                {items.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("/") ? (
                      <Link
                        href={l.href}
                        className="text-sm text-muted-foreground transition-colors hover:text-ink"
                      >
                        {l.label}
                      </Link>
                    ) : (
                      <a
                        href={l.href}
                        {...(l.href.startsWith("http")
                          ? { target: "_blank", rel: "noopener noreferrer" }
                          : {})}
                        className="text-sm text-muted-foreground transition-colors hover:text-ink"
                      >
                        {l.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-14 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="label-mono text-[10px] text-muted-foreground">
            &copy; {new Date().getFullYear()} Sentinel Auth
          </p>
          <p className="label-mono text-[10px] text-muted-foreground">MIT License</p>
        </div>
        <p className="mt-4 max-w-2xl text-xs leading-relaxed text-muted-foreground">
          Sentinel Auth is an independent open-source project and is not
          affiliated with Microsoft or other Sentinel-branded products.
        </p>
      </div>
    </footer>
  );
}
