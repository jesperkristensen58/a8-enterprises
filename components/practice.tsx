import { DesktopPhoto } from "@/components/desktop-photo";
import { capabilities } from "@/lib/site";

export function Practice() {
  return (
    <section
      className="content-auto border-t border-line"
      aria-labelledby="practice-heading"
    >
      <div className="mx-auto grid max-w-[1400px] md:grid-cols-2">
        <div className="relative hidden min-h-[28rem] md:block">
          <DesktopPhoto
            src="/materials.webp"
            alt="Paper, steel ruler, and pencil on a stone table"
          />
        </div>
        <div className="flex flex-col justify-center px-5 py-16 md:px-10 md:py-24">
          <h2
            id="practice-heading"
            className="max-w-[22ch] text-2xl font-medium tracking-tight text-foreground md:text-3xl"
          >
            We sit inside the company, not beside it.
          </h2>
          <p className="mt-5 max-w-[48ch] text-base leading-relaxed text-muted">
            Engineering, go-to-market, and technical ownership as one piece of
            work.
          </p>
          <ul className="mt-12 space-y-8">
            {capabilities.map((item) => (
              <li key={item.name}>
                <p className="font-mono text-[11px] tracking-[0.14em] text-foreground">
                  {item.name}
                </p>
                <p className="mt-2 max-w-[36ch] text-base leading-relaxed text-muted">
                  {item.line}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
