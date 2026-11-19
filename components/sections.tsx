import Image from "next/image";
import type { ReactNode } from "react";
import { ButtonLink } from "./button";
import { ChevronDown, Triangle } from "./icons";
import { Container, SectionHeading } from "./page-hero";
import { contactHref } from "@/lib/site";

/** Orange-triangle step list, as in the Contact page's "How it Works". */
export function StepList({ steps, columns = 4 }: { steps: { title: string; body: string }[]; columns?: 3 | 4 }) {
  return (
    <ol data-reveal-group className={`grid gap-10 sm:grid-cols-2 xl:gap-12 ${columns === 4 ? "xl:grid-cols-4" : "lg:grid-cols-3"}`}>
      {steps.map((step) => (
        <li key={step.title} className="flex gap-4">
          <Triangle className="mt-1 size-5 shrink-0 text-brand" />
          <div className="flex flex-col gap-4 lg:gap-6">
            <h3 className="text-2xl font-medium tracking-display lg:text-heading">{step.title}</h3>
            <p className="text-lg tracking-display text-ash">{step.body}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

/** Accessible accordion built on <details>, no JavaScript needed. */
export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div data-reveal-group className="divide-y divide-white/10 border-y border-white/10">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium tracking-display transition-colors hover:text-brand lg:text-2xl details-marker:hidden">
            {item.q}
            <ChevronDown className="size-6 shrink-0 text-brand transition-transform group-open:rotate-180" />
          </summary>
          <p className="mt-4 max-w-196 text-lg tracking-display text-ash">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

/** Closing call-to-action band with the orange glow used on the homepage. */
export function CtaBand({ title, children, cta = "Book a Free Assessment", href = contactHref("assessment") }: { title: string; children: ReactNode; cta?: string; href?: string }) {
  return (
    <section className="relative overflow-hidden bg-black py-24 lg:py-30">
      <div aria-hidden className="absolute -right-40 -bottom-60 size-140 rounded-full bg-brand/30 blur-3xl motion-safe:animate-glow" />
      <div aria-hidden data-reveal="scale" className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-brand to-transparent" />
      <Container className="relative flex flex-col items-start gap-12 lg:flex-row lg:items-end lg:justify-between">
        <SectionHeading title={title}>{children}</SectionHeading>
        <div data-reveal className="shrink-0">
          <ButtonLink href={href} className="text-lg">
            {cta}
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}

/** Two-column block: copy on one side, a chamfered photo on the other. */
export function SplitImage({ image, alt, reverse = false, children }: { image: string; alt: string; reverse?: boolean; children: ReactNode }) {
  return (
    <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
      <div data-reveal="scale" className={`group chamfer relative aspect-video overflow-hidden lg:aspect-square ${reverse ? "lg:order-2" : ""}`}>
        <Image src={image} alt={alt} fill sizes="(min-width: 1024px) 50vw, 100vw" className="object-cover transition duration-1000 ease-snappy group-hover:scale-105" />
        <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black/50 to-transparent" />
      </div>
      <div data-reveal className="flex flex-col items-start gap-10">
        {children}
      </div>
    </div>
  );
}
