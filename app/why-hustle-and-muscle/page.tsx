import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { ChamferCard } from "@/components/chamfer-card";
import { Star } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, SplitImage } from "@/components/sections";
import { testimonials } from "@/lib/content";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Why Hustle & Muscle",
  description: "24/7 access, real coaching, group classes and a welcoming community. Here's what makes Hustle & Muscle different.",
};

const reasons = [
  { n: "01", title: "Open 24/7", body: "Train before work, after a night shift or at 2 AM. Your membership works around your schedule, not the other way around." },
  { n: "02", title: "Coaching that's personal", body: "Every member gets a free assessment. Programs are built around your goal, not a template off the internet." },
  { n: "03", title: "Classes for every mood", body: "HIIT, boxing, Muay Thai, core and mobility. Mix it up whenever the weights get boring." },
  { n: "04", title: "A welcoming community", body: "Friendly staff and members who cheer each other on. Beginners feel at home from day one." },
  { n: "05", title: "Clean and comfortable", body: "Fully air-conditioned floors, hot and cold showers, lockers, Wi-Fi and free parking." },
  { n: "06", title: "Fair, simple pricing", body: "Monthly from ₱2,500, with real savings the longer you commit. No hidden charges beyond the annual fee." },
];

export default function WhyPage() {
  return (
    <>
      <PageHero
        title="Why Hustle & Muscle"
        description="Plenty of gyms have equipment. We have coaches who know your name and a community that notices when you don't show up."
        image="/images/hero-home.jpg"
        imagePosition="object-right"
        compact
      />

      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title={<>Six reasons members <span className="text-brand">stay.</span></>} />
          <ul data-reveal-group className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <li key={r.n}>
                <ChamferCard size="sm" glow={i === 0} className="h-full">
                  <div className="flex h-full flex-col gap-5 px-6 py-8 sm:px-10">
                    <span className="text-6xl font-bold tracking-display text-brand/80">{r.n}</span>
                    <h3 className="text-3xl font-bold tracking-display lg:text-heading">{r.title}</h3>
                    <p className="text-lg tracking-display text-mist">{r.body}</p>
                  </div>
                </ChamferCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SplitImage image="/images/interview.jpg" alt="A coach talking with a member at Hustle & Muscle">
            <SectionHeading title="It starts with a conversation.">
              Your free assessment covers your goals, history and schedule. Then we recommend a membership, program or class, and never push
              what you don&apos;t need.
            </SectionHeading>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href={contactHref("assessment")}>Book a Free Assessment</ButtonLink>
              <ButtonLink href="/membership" variant="outline" icon={false}>
                See Memberships
              </ButtonLink>
            </div>
          </SplitImage>
        </Container>
      </section>

      <section className="bg-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="Hear it from our members" />
          <div data-reveal-group className="mt-12 grid gap-10 md:grid-cols-3 lg:gap-8">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex gap-4">
                <span aria-hidden className="w-px shrink-0 bg-white/60" />
                <div className="flex flex-col gap-3">
                  <div className="flex gap-0.5" aria-label={`${t.rating} out of 5 stars`}>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <Star key={n} className={`size-2.5 ${n <= t.rating ? "text-brand" : "text-white/25"}`} />
                    ))}
                  </div>
                  <blockquote className="text-base font-medium tracking-display">{t.quote}</blockquote>
                  <figcaption className="text-sm tracking-display text-graphite">{t.name}</figcaption>
                </div>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Ready when you are." cta="Become a Member" href="/membership">
        Join 500+ members building the body that powers their life.
      </CtaBand>
    </>
  );
}
