// Sharp, mono-labelled buttons — copied from docustore-site.
export const ctaPrimary =
  "inline-flex h-11 items-center rounded-none bg-ink px-6 label-mono text-[11px] text-paper transition-opacity hover:opacity-85";
export const ctaOutline =
  "inline-flex h-11 items-center gap-2 rounded-none border border-ink px-6 label-mono text-[11px] text-ink transition-colors hover:bg-ink hover:text-paper";
// Navbar-sized primary. No tailwind-merge here, so don't append h-9/px-4 to ctaPrimary.
export const ctaPrimarySm = ctaPrimary.replace("h-11", "h-9").replace("px-6", "px-4");
