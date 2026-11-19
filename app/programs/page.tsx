import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, StepList } from "@/components/sections";
import { ProgramCard } from "@/components/training-cards";
import { contactSteps } from "@/lib/content";
import { programs } from "@/lib/training";

export const metadata: Metadata = {
  title: "Personal Training Programs",
  description: "One-on-one and small-group personal training programs for weight loss, strength, striking and mobility.",
};

export default function ProgramsPage() {
  return (
    <>
      <PageHero
        title="Personal Training"
        description="Coached programs built around your goal, your schedule and your starting point. Every program begins with a free assessment."
        image="/images/program-1.jpg"
        imagePosition="object-right"
      />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="General Programs">Pick the goal. Your coach handles the plan.</SectionHeading>
          <div data-reveal-group className="mt-14 grid gap-8 lg:grid-cols-2">
            {programs.map((p) => (
              <ProgramCard key={p.slug} program={p} />
            ))}
          </div>
        </Container>
      </section>
      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="How it Works">From your first message to your first session in four simple steps.</SectionHeading>
          <div className="mt-14">
            <StepList steps={contactSteps} />
          </div>
        </Container>
      </section>
      <CtaBand title="Not sure which program fits?">Book a free assessment and your coach will recommend the right one.</CtaBand>
    </>
  );
}
