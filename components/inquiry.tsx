import { InquiryForm } from "@/components/inquiry-form";

export function Inquiry() {
  return (
    <section
      id="inquiry"
      className="content-auto scroll-mt-20 border-t border-line"
      aria-labelledby="inquiry-heading"
    >
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <h2
          id="inquiry-heading"
          className="text-2xl font-medium tracking-tight text-foreground md:text-3xl"
        >
          Start a project
        </h2>
        <p className="mt-4 max-w-[54ch] text-base leading-relaxed text-muted">
          Tell us the product, the market, and what you need owned.
        </p>
        <InquiryForm />
      </div>
    </section>
  );
}
