import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, Faq } from "@/components/sections";
import { MembershipPlans } from "@/components/training-cards";
import { faqGroups } from "@/lib/faqs";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Membership",
  description: "Monthly, quarterly, semi-annual and annual memberships with 24/7 access, plus day passes.",
};

export default function MembershipPage() {
  return (
    <>
      <PageHero
        title="Membership"
        description="24/7 access, air-conditioned floors and a community that shows up. Pick the plan that fits and lock in your savings."
        image="/images/hero-home.jpg"
        imagePosition="object-right"
      />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="Elevate Your Growth">The longer you commit, the more you save. Every plan includes full gym access.</SectionHeading>
          <div className="mt-14 lg:mt-20">
            <MembershipPlans />
          </div>
        </Container>
      </section>
      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container className="grid gap-12 lg:grid-cols-3 lg:gap-20">
          <SectionHeading title="Membership FAQs" />
          <div className="lg:col-span-2">
            <Faq items={faqGroups.find((g) => g.id === "membership")!.items} />
          </div>
        </Container>
      </section>
      <CtaBand title="Want to see the gym first?" cta="Book a Tour" href={contactHref("tour")}>
        Drop by for a free assessment and a walk-through of the facility before you join.
      </CtaBand>
    </>
  );
}
