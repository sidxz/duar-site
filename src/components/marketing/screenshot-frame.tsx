import { asset } from "@/lib/asset";

export function ScreenshotFrame({
  src,
  alt,
  label,
  url = "admin.duar.local",
}: {
  src?: string;
  alt: string;
  label: string;
  url?: string;
}) {
  return (
    <figure className="overflow-hidden rounded-2xl border border-border bg-paper shadow-[0_12px_40px_rgba(11,11,13,0.06)]">
      <div className="flex h-9 items-center gap-2 border-b border-border bg-wash px-4">
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink/15" />
        <span className="ml-3 flex-1 truncate rounded-sm bg-paper px-2 py-0.5 font-mono text-[10px] text-muted-foreground">
          {url}
        </span>
      </div>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset(src)} alt={alt} className="block h-auto w-full" />
      ) : (
        <div className="m-3 flex aspect-[16/10] items-center justify-center rounded-lg border border-dashed border-ink/20 bg-wash/60">
          <span className="label-mono text-[10px] text-muted-foreground">{label}</span>
        </div>
      )}
    </figure>
  );
}
