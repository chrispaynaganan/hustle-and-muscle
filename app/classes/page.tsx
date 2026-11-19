import type { Metadata } from "next";
import Link from "next/link";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { ClassCard } from "@/components/training-cards";
import { getCoach } from "@/lib/coaches";
import { gxClasses } from "@/lib/training";

export const metadata: Metadata = {
  title: "GX Classes",
  description: "Group exercise classes at Hustle & Muscle: HIIT, boxing, Muay Thai, core and mobility.",
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function ClassesPage() {
  return (
    <>
      <PageHero
        title="GX Classes"
        description="Group and specialized classes that build strength, conditioning and mobility, with a crew that keeps you coming back."
        image="/images/interview.jpg"
      />

      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="Weekly Schedule">Buy a class pack, then show up at any of its scheduled times.</SectionHeading>
          <div className="mt-14 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-7">
            {days.map((day) => {
              const sessions = gxClasses.flatMap((c) => c.slots.filter((s) => s.day === day).map((s) => ({ ...s, c })));
              return (
                <div key={day} className="flex min-h-40 flex-col gap-4 bg-night p-5">
                  <p className="text-sm font-medium tracking-display text-graphite uppercase">{day}</p>
                  {sessions.length === 0 ? (
                    <p className="text-base tracking-display text-iron">Open gym</p>
                  ) : (
                    sessions.map(({ time, c }) => (
                      <Link key={c.slug} href={`/classes/${c.slug}`} className="group flex flex-col gap-1 border-l-2 border-brand pl-3">
                        <span className="text-sm tracking-display text-brand">{time}</span>
                        <span className="text-base font-medium tracking-display transition-colors group-hover:text-brand">{c.title}</span>
                        <span className="text-sm tracking-display text-mist">{getCoach(c.coachSlug)?.name}</span>
                      </Link>
                    ))
                  )}
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="All Classes">Class packs are valid for 2 months from your first session.</SectionHeading>
          <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {gxClasses.map((c) => (
              <ClassCard key={c.slug} gx={c} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="New to group classes?">Try one with a day pass first, or book a free assessment and we&apos;ll point you to the right class.</CtaBand>
    </>
  );
}
