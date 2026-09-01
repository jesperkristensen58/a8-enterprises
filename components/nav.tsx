import { site } from "@/lib/site";

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-20 h-16 w-full border-b border-line bg-background">
      <a
        href="#content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-40 focus:bg-foreground focus:px-3 focus:py-1 focus:text-background"
      >
        Skip to content
      </a>
      <a
        href="#top"
        className="absolute top-1/2 left-5 z-30 -translate-y-1/2 font-sans text-[15px] font-medium tracking-tight text-foreground md:left-10"
      >
        {site.shortName}
      </a>
      <a
        href="#work"
        className="absolute top-1/2 right-5 z-30 -translate-y-1/2 text-sm text-foreground md:right-10"
      >
        Work
      </a>
    </header>
  );
}
