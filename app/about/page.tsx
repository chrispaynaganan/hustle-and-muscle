import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { CountUp } from "@/components/motion/count-up";
import { ChamferCard } from "@/components/chamfer-card";
import { ArrowUpRight, Triangle } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, SplitImage, StepList } from "@/components/sections";
import { coaches } from "@/lib/coaches";
import { aboutStats, monthlyInclusions, values } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us",
  description: "Hustle & Muscle is a 24/7 community gym with certified coaches, group classes and programs for every level.",
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="A 24/7 neighborhood gym built on real coaching, a welcoming community, and programs that fit your life."
        image="/images/interview.jpg"
      />

      {/* Story + stats */}
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container className="grid gap-16 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col gap-8">
            <SectionHeading title={<>Built for people who <span className="text-brand">show up.</span></>} />
            <div className="flex flex-col gap-6 text-lg tracking-display text-mist md:text-2xl">
              <p>
                Hustle &amp; Muscle started with a simple idea: a gym that feels like it&apos;s yours. No intimidation, no guesswork, just good
                coaching and people who want to see you win.
              </p>
              <p>
                Today we&apos;re home to more than 500 members, from first-timers learning to squat to fighters getting ready for the ring. Whatever
                brings you in, we build the plan around you.
              </p>
            </div>
          </div>

          <ul data-reveal-group className="grid grid-cols-2 gap-6 self-start lg:gap-8">
            {aboutStats.map((stat, i) => (
              <li key={stat.label}>
                <ChamferCard size="sm" glow={i === 0}>
                  <div className="flex flex-col gap-3 px-6 py-8 sm:px-8 lg:py-10">
                    <span className="text-5xl font-bold tracking-display text-brand lg:text-6xl">
                      {/^\d+\+?$/.test(stat.value) ? <CountUp value={parseInt(stat.value)} suffix={stat.value.endsWith("+") ? "+" : ""} /> : stat.value}
                    </span>
                    <span className="text-lg tracking-display lg:text-xl">{stat.label}</span>
                  </div>
                </ChamferCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Values */}
      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="What we stand for">The four things every coach, staff member and program at Hustle &amp; Muscle is built on.</SectionHeading>
          <div className="mt-14">
            <StepList steps={values} />
          </div>
        </Container>
      </section>

      {/* Facility */}
      <section className="bg-black py-20 lg:py-24">
        <Container>
          <SplitImage image="/images/program-2.jpg" alt="Member training on the squat rack at Hustle & Muscle">
            <SectionHeading title="The Facility">Everything you need to train hard, any hour of the day.</SectionHeading>
            <ul className="grid w-full gap-x-6 gap-y-5 text-xl tracking-display sm:grid-cols-2 lg:text-2xl">
              {monthlyInclusions.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Triangle className="size-3 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/membership">See Memberships</ButtonLink>
          </SplitImage>
        </Container>
      </section>

      {/* Coaches teaser */}
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading title="Meet the Team">Certified coaches for strength, boxing, HIIT, mobility and more.</SectionHeading>
            <ButtonLink href="/coaches" variant="outline">
              All Coaches
            </ButtonLink>
          </div>
          <ul data-reveal-group className="mt-14 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {coaches.slice(0, 3).map((coach) => (
              <li key={coach.name}>
                <Link href={`/coaches/${coach.slug}`} className="group relative block aspect-portrait overflow-hidden bg-mist">
                  <Image
                    src={coach.image}
                    alt={coach.name}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-white/10 px-6 py-6 backdrop-blur-2xl">
                    <div>
                      <p className="text-xl font-medium tracking-display lg:text-2xl">{coach.name}</p>
                      <p className="text-sm tracking-display text-mist">{coach.role}</p>
                    </div>
                    <ArrowUpRight className="size-6 shrink-0 transition-colors group-hover:text-brand" />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Visit */}
      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SplitImage image="/images/map.jpg" alt="Map showing Hustle and Muscle Fitness Gym in Greenwoods Executive Village" reverse>
            <SectionHeading title="Visit Us">Drop by for a tour or your free assessment. The doors are always open.</SectionHeading>
            <dl className="flex flex-col gap-6 text-xl tracking-display">
              <div>
                <dt className="text-base text-graphite">Address</dt>
                <dd className="mt-1">{site.address}</dd>
              </div>
              <div>
                <dt className="text-base text-graphite">Hours</dt>
                <dd className="mt-1">Open 24 hours, 7 days a week</dd>
              </div>
              <div>
                <dt className="text-base text-graphite">Contact</dt>
                <dd className="mt-1 flex flex-col gap-1">
                  <a href={site.phoneHref} className="hover:text-brand">
                    {site.phone}
                  </a>
                  <a href={`mailto:${site.email}`} className="break-all hover:text-brand">
                    {site.email}
                  </a>
                </dd>
              </div>
            </dl>
          </SplitImage>
        </Container>
      </section>

      <CtaBand title="Ready to start?">Book a free assessment and we&apos;ll match you with the right program and coach.</CtaBand>
    </>
  );
}
