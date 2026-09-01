import Image from "next/image";
import { site } from "@/lib/site";

export function Hero() {
  return (
    <section
      id="top"
      className="min-h-[100dvh] pt-16"
      aria-labelledby="hero-heading"
    >
      <div className="mx-auto grid w-full min-h-[calc(100dvh-4rem)] max-w-[1400px] grid-cols-1 md:grid-cols-2">
        <div className="flex min-w-0 flex-col justify-start px-5 pt-12 pb-16 md:justify-center md:px-10 md:py-12">
          <h1
            id="hero-heading"
            className="font-medium tracking-tight text-foreground"
          >
            <span className="block text-6xl leading-[1.05] md:text-7xl lg:text-8xl">
              {site.shortName}
            </span>
            <span className="mt-6 block max-w-[8.5em] text-3xl leading-[1.2] md:mt-8 md:max-w-none md:text-4xl lg:text-5xl">
              {site.headline}
            </span>
          </h1>
          <div className="mt-10">
            <a
              href="#inquiry"
              className="inline-flex h-11 items-center bg-foreground px-6 text-[15px] text-background transition-transform duration-150 hover:bg-foreground/90 active:scale-[0.98]"
            >
              Start a project
            </a>
          </div>
        </div>
        <div className="relative hidden min-h-full md:block">
          <Image
            src="/hero.jpg"
            alt="Software studio with a wide display on a long desk"
            fill
            priority
            sizes="50vw"
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}
