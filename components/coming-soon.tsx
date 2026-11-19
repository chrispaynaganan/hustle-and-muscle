import { ButtonLink } from "./button";
import { Container } from "./page-hero";

/** Placeholder for nav items that don't have a design yet. */
export function ComingSoon({ title, blurb, badge = "Coming Soon" }: { title: string; blurb: string; badge?: string }) {
  return (
    <section className="relative flex min-h-svh items-center overflow-hidden bg-linear-to-b from-black to-surface pt-44 pb-24">
      <div aria-hidden className="absolute -right-40 -bottom-40 size-140 rounded-full bg-brand/25 blur-3xl" />
      <Container className="relative">
        <div className="flex max-w-194.5 flex-col items-start gap-8">
          <span className="bg-brand p-3 text-lg font-medium tracking-display">{badge}</span>
          <h1 className="text-6xl font-medium tracking-display md:text-8xl lg:text-page">{title}</h1>
          <p className="text-xl tracking-display text-mist md:text-lede">{blurb}</p>
          <div className="flex flex-wrap gap-4">
            <ButtonLink href="/contact">Talk to Us</ButtonLink>
            <ButtonLink href="/" variant="outline" icon={false}>
              Back to Home
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  );
}
