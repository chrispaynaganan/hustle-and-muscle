import type { Metadata } from "next";
import { Container, PageHero } from "@/components/page-hero";
import { CtaBand, Faq } from "@/components/sections";
import { faqGroups } from "@/lib/faqs";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs",
  description: "Answers about Hustle & Muscle memberships, programs, classes, meal plans and online orders.",
};

export default function FaqsPage() {
  return (
    <>
      <PageHero title="FAQs" description="Quick answers about memberships, training, meal plans and the shop." image="/images/hero-contact.jpg" imagePosition="object-right" />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-4 lg:gap-16">
          <nav aria-label="FAQ topics" className="flex flex-wrap gap-3 lg:sticky lg:top-8 lg:flex-col lg:gap-4">
            {faqGroups.map((g) => (
              <a key={g.id} href={`#${g.id}`} className="border border-white/20 px-4 py-2 text-base tracking-display transition-colors hover:border-brand hover:text-brand lg:border-0 lg:border-l-2 lg:px-4 lg:py-1">
                {g.title}
              </a>
            ))}
          </nav>
          <div data-reveal-group className="flex flex-col gap-16 lg:col-span-3">
            {faqGroups.map((g) => (
              <div key={g.id} id={g.id} className="scroll-mt-10">
                <h2 className="mb-6 text-3xl font-bold tracking-display lg:text-subsection">{g.title}</h2>
                <Faq items={g.items} />
              </div>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Didn't find your answer?" cta="Contact Us" href={contactHref("other")}>Send us a message and our team will get back to you.</CtaBand>
    </>
  );
}
