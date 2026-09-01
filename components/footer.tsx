import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-8 md:px-10">
        <p className="text-sm text-foreground">{site.name}</p>
        <p className="font-mono text-[11px] tracking-[0.14em] text-muted">
          2026
        </p>
      </div>
    </footer>
  );
}
