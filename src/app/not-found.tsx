import Link from "next/link";
import { ctaPrimary } from "@/lib/cta";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-32">
      <p className="label-mono text-[11px] text-muted-foreground">404</p>
      <h1 className="text-4xl font-medium tracking-tight text-ink">Page not found</h1>
      <Link href="/" className={ctaPrimary}>
        Back home
      </Link>
    </div>
  );
}
