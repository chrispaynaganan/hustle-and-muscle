import type { Metadata } from "next";
import { ButtonLink } from "@/components/button";
import { ChamferCard } from "@/components/chamfer-card";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { SimpleForm } from "@/components/simple-form";
import { applicationFields, roles } from "@/lib/careers";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the Hustle & Muscle team. See open roles for coaches, class instructors and front desk staff.",
};

export default function CareersPage() {
  return (
    <>
      <PageHero
        title="Careers"
        description="Love fitness and people? Help our members build the body that powers their life."
        image="/images/hero-coaches.jpg"
      />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="Open Roles">Pick a role to see the full description, or apply straight away.</SectionHeading>
          <ul data-reveal-group className="mt-14 grid gap-8 lg:grid-cols-3">
            {roles.map((r) => (
              <li key={r.slug}>
                <ChamferCard size="sm" glow={false} className="h-full">
                  <div className="flex h-full flex-col gap-6 px-6 py-8 sm:px-10">
                    <span className="self-start border border-brand px-3 py-1.5 text-sm tracking-display text-brand">{r.type}</span>
                    <h3 className="text-3xl font-bold tracking-display lg:text-heading">{r.title}</h3>
                    <p className="text-lg tracking-display text-mist">{r.summary}</p>
                    <p className="text-base tracking-display text-graphite">{r.schedule}</p>
                    <div className="mt-auto flex flex-wrap gap-4 pt-2">
                      <ButtonLink href={`/careers/${r.slug}#apply`}>Apply</ButtonLink>
                      <ButtonLink href={`/careers/${r.slug}`} variant="outline" icon={false}>
                        View Role
                      </ButtonLink>
                    </div>
                  </div>
                </ChamferCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <section id="apply" className="scroll-mt-10 bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <SectionHeading title="Don't see your role?">Send us your details anyway. We&apos;re always looking for great people.</SectionHeading>
          <ChamferCard hover={false}>
            <div className="px-6 py-10 sm:px-10.5">
              <SimpleForm
                submitLabel="Submit Application"
                successTitle="Application received!"
                successBody="Thanks for your interest in joining Hustle & Muscle. We'll review your details and reach out if there's a fit."
                fields={applicationFields("Other")}
              />
            </div>
          </ChamferCard>
        </Container>
      </section>
    </>
  );
}
