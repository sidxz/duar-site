/* Sentinel mark — a line-art distillation of the existing shield logo:
   shield outline (currentColor), hexagon core in brand red (the single accent,
   like docustore's hexagon), keyhole in currentColor, two circuit stubs.
   Favicon (src/app/icon.svg) is the hexagon+keyhole fragment; keep in sync. */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      {/* shield */}
      <path
        d="M16 3.5 L27 8 V16.5 C27 22.5 22.5 27 16 29.5 C9.5 27 5 22.5 5 16.5 V8 Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      {/* circuit stubs */}
      <line x1="5" y1="13" x2="2.2" y2="13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="1.4" cy="13" r="1.1" fill="currentColor" />
      <line x1="27" y1="13" x2="29.8" y2="13" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="30.6" cy="13" r="1.1" fill="currentColor" />
      {/* hexagon core — the accent */}
      <polygon
        points="16,10 20.76,12.75 20.76,18.25 16,21 11.24,18.25 11.24,12.75"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      {/* keyhole */}
      <circle cx="16" cy="14.6" r="1.9" fill="currentColor" />
      <path d="M15.1 16 L16.9 16 L17.6 19.4 L14.4 19.4 Z" fill="currentColor" />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 text-ink ${className ?? ""}`}>
      <LogoMark className="h-8 w-8" />
      <span className="text-[22px] font-medium tracking-tight">
        Sentinel<span className="hidden text-ink/30 sm:inline"> Auth</span>
      </span>
    </span>
  );
}
