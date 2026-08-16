import { asset } from "@/lib/asset";

/* Duar logo — the real brand mark (public/logo.png: black shield outline,
   yellow hexagon + keyhole, transparent background) next to a "Duar.io"
   wordmark. `inverted` (navbar, on ink) swaps in public/logo-on-ink.png —
   the same mark with the black shield repainted paper — and sets the
   wordmark in paper. Favicon is src/app/icon.png (same mark, 64px, padded). */
export function Logo({ className, inverted }: { className?: string; inverted?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-2 ${inverted ? "text-paper" : "text-ink"} ${className ?? ""}`}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset(inverted ? "/logo-on-ink.png" : "/logo.png")} alt="" className="h-8 w-auto" />
      <span className="text-[22px] font-medium tracking-tight">
        Duar<span className={inverted ? "text-paper/60" : "text-ink/30"}>.io</span>
      </span>
    </span>
  );
}
