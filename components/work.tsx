import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { projects } from "@/lib/site";
import { Reveal } from "@/components/reveal";

export function Work() {
  return (
    <section
      id="work"
      className="scroll-mt-20 border-t border-line"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <Reveal>
          <h2
            id="work-heading"
            className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
          >
            Active work
          </h2>
        </Reveal>
        <ul className="mt-10">
          {projects.map((project, index) => (
            <li key={project.name}>
              <Reveal delay={index * 0.06}>
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-1 items-baseline gap-2 border-t border-line py-8 transition-colors md:grid-cols-[minmax(0,1fr)_auto] md:py-10"
                >
                  <div>
                    <p className="text-2xl font-medium tracking-tight text-foreground md:text-4xl">
                      {project.name}
                    </p>
                    <p className="mt-2 max-w-[46ch] text-base leading-relaxed text-muted">
                      {project.line}
                    </p>
                  </div>
                  <p className="flex flex-col items-start gap-2 font-mono text-[11px] tracking-[0.14em] text-muted md:items-end">
                    <span className="text-foreground">{project.status}</span>
                    <span>{project.dates}</span>
                    <span className="flex items-center gap-2 group-hover:text-foreground">
                      {project.host}
                      <ArrowUpRight
                        size={14}
                        weight="bold"
                        className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </span>
                    <span className="sr-only">(opens in a new tab)</span>
                  </p>
                </a>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
