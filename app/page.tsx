import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button";
import { Star, Triangle } from "@/components/icons";
import { Container, SectionHeading } from "@/components/page-hero";
import { ClassCard, MembershipPlans, ProgramCard } from "@/components/training-cards";
import { heroQuotes, partners, testimonials } from "@/lib/content";
import { gxClasses, programs } from "@/lib/training";
import { contactHref } from "@/lib/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Partners />
      <Programs />
      <Consultation />
      <Membership />
      <Experiences />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden bg-black pt-40 lg:min-h-280 lg:pt-72">
      <Image src="/images/hero-home.jpg" alt="" fill priority sizes="100vw" className="object-cover object-right lg:object-center" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-l from-transparent to-black to-75%" />
      <div aria-hidden className="absolute inset-0 bg-linear-to-b from-transparent from-55% to-night" />

      <Container className="relative flex flex-1 flex-col">
        <div className="flex max-w-220 flex-col gap-10 lg:gap-16">
          <div className="flex flex-col gap-8 lg:gap-12">
            <h1 className="text-6xl leading-none font-medium tracking-display sm:text-8xl xl:text-hero">
              Build the Body That <span className="text-brand">Powers</span> Your Life.
            </h1>
            <p className="max-w-194.5 text-xl tracking-display md:text-3xl lg:text-heading lg:leading-snug">
              We are dedicated to helping you achieve your fitness goals and improve your overall health and well-being.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 sm:gap-8.5">
            <ButtonLink href="/membership">Become a Member</ButtonLink>
            <ButtonLink href="/packages" variant="ghost">
              View Services
            </ButtonLink>
          </div>
        </div>

        <div className="mt-auto flex flex-col gap-10 pt-16 pb-10 lg:flex-row lg:items-end lg:justify-between lg:pb-24">
          <div className="hidden flex-wrap gap-x-42 gap-y-6 md:flex">
            {heroQuotes.map((quote, i) => (
              <figure key={i} className="flex max-w-100 items-center gap-4">
                <span aria-hidden className="h-11.5 w-px shrink-0 bg-haze" />
                <blockquote className="text-sm tracking-display text-haze">{quote}</blockquote>
              </figure>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4, 5].map((n) => (
                <Image
                  key={n}
                  src={`/images/avatar-${n}.png`}
                  alt=""
                  width={40}
                  height={40}
                  className="size-10 rounded-full border-2 border-black object-cover"
                />
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-4xl font-medium tracking-display">500+</p>
              <p className="text-lg tracking-display text-mist">Healthy members</p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Partners() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-black to-surface py-24 lg:py-36">
      {/* Orange horizon glow from the design */}
      <div aria-hidden className="absolute -top-16 left-1/2 h-24 w-11/12 -translate-x-1/2 rounded-full bg-brand/60 blur-3xl" />
      <div aria-hidden className="absolute -top-10 left-1/2 h-14 w-full -translate-x-1/2 rounded-full border-b border-brand/70" />

      <Container className="relative">
        <SectionHeading
          title={
            <>
              Partnered with <span className="text-brand">10+ companies</span>
            </>
          }
        >
          We value your fitness journey. That is why we want you to have the best of the best. Along with your training with us are
          partners who make your goal much more attainable.
        </SectionHeading>

        <ul className="mt-16 grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:mt-20 lg:flex lg:justify-between">
          {partners.map((p) => (
            <li key={p.src}>
              <Image
                src={p.src}
                alt={p.name}
                width={p.width}
                height={p.height}
                className="h-auto max-h-14 w-auto max-w-40 opacity-80 grayscale transition hover:opacity-100 hover:grayscale-0 xl:max-w-52"
              />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Programs() {
  return (
    <section id="programs" className="scroll-mt-10 bg-linear-to-b from-surface to-black py-24 lg:py-30">
      <Container>
        <SectionHeading title="Whatever your goal is, we got your back.">
          Take a closer look at our highly competitive membership fees designed to help you accelerate your growth and achieve your goals!
        </SectionHeading>

        <div className="mt-16 flex items-end justify-between gap-6 lg:mt-24">
          <h3 className="text-3xl font-bold tracking-display lg:text-subsection">General Programs</h3>
          <Link href="/programs" className="shrink-0 text-base font-medium text-brand hover:underline">
            View all programs
          </Link>
        </div>
        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          {programs
            .filter((p) => p.featured)
            .map((program) => (
              <ProgramCard key={program.slug} program={program} />
            ))}
        </div>

        <div id="classes" className="mt-20 flex scroll-mt-10 flex-col gap-6 lg:mt-24">
          <div className="flex items-end justify-between gap-6">
            <h3 className="text-3xl font-bold tracking-display lg:text-subsection">Group and Specialized Classes</h3>
            <Link href="/classes" className="shrink-0 text-base font-medium text-brand hover:underline">
              View all classes
            </Link>
          </div>
          <p className="max-w-196 text-lg tracking-display md:text-2xl">
            Train differently by joining group and specialized classes to boost not only strength but also your mobility. Plus, you get to
            enjoy it with other fitness enthusiasts.
          </p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {gxClasses
            .filter((c) => c.home)
            .map((c) => (
              <ClassCard key={c.slug} gx={c} wide={c.featured} />
            ))}
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Consultation() {
  return (
    <section className="relative overflow-hidden bg-black">
      <Container className="relative grid items-center gap-10 pt-24 lg:min-h-136 lg:grid-cols-2 lg:pt-0">
        <div className="relative z-10 flex flex-col items-start gap-12 lg:py-30">
          <SectionHeading title="Not sure what you need?">
            We provide a complimentary consultation to assess your body composition, dietary restrictions, and other factors. This allows us
            to tailor a program specifically designed to meet your unique needs.
          </SectionHeading>
          <ButtonLink href={contactHref("assessment")} className="text-lg">
            Book a Free Consultation
          </ButtonLink>
        </div>

        <div className="relative h-96 sm:h-120 lg:h-full">
          <div aria-hidden className="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/3 rounded-full bg-brand/50 blur-3xl sm:size-120" />
          <Image
            src="/images/consult-coach.png"
            alt="Hustle & Muscle coach"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-contain object-bottom"
          />
        </div>
      </Container>
      <div aria-hidden className="absolute right-0 bottom-0 h-19 w-full bg-linear-to-t from-brand/40 to-transparent lg:w-1/2" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Membership() {
  return (
    <section id="membership" className="scroll-mt-10 bg-black py-24 lg:py-30">
      <Container>
        <SectionHeading title="Elevate Your Growth">
          Take a closer look at our highly competitive membership fees designed to help you accelerate your growth and achieve your goals!
        </SectionHeading>
        <div className="mt-16 lg:mt-20">
          <MembershipPlans />
        </div>
      </Container>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Experiences() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-black to-surface-deep py-24 lg:py-28">
      <div aria-hidden className="absolute -bottom-10 left-1/2 h-20 w-full -translate-x-1/2 rounded-full bg-brand/30 blur-3xl" />
      <Container className="relative">
        <h2 className="text-4xl font-medium tracking-display md:text-5xl lg:text-section">One Gym. Different Experiences.</h2>

        <div className="mt-12 grid items-center gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-20">
          <Link
            href="/stories/alex"
            className="group relative block aspect-video overflow-hidden lg:col-span-8 lg:aspect-auto lg:h-180"
            aria-label="View Alex's full interview"
          >
            <Image src="/images/interview.jpg" alt="" fill sizes="(min-width: 1024px) 66vw, 100vw" className="object-cover transition duration-500 group-hover:scale-105" />
            <span aria-hidden className="absolute inset-0 bg-black/50 transition-colors group-hover:bg-black/40" />
            <Triangle className="absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2 text-white transition group-hover:scale-110 group-hover:text-brand lg:size-25" />
          </Link>

          <div className="flex flex-col items-start gap-12 lg:col-span-4">
            <blockquote className="flex flex-col gap-8">
              <p className="text-3xl font-semibold tracking-display italic lg:text-quote">
                <span className="text-brand">Joining Hustle &amp; Muscle changed how I see fitness.</span> I feel stronger, more confident,
                and actually excited to show up.
              </p>
              <footer className="text-xl font-light tracking-display text-graphite italic">
                Alex, a member for 3 years, as she shares her experience in Hustle &amp; Muscle Fitness Gym
              </footer>
            </blockquote>
            <ButtonLink href="/stories/alex" variant="outline">
              View Full Interview
            </ButtonLink>
          </div>
        </div>

        <h3 className="mt-24 text-3xl font-medium tracking-display lg:mt-28 lg:text-heading">Let&apos;s Hear From Our Members</h3>
        <div className="mt-10 grid gap-10 md:grid-cols-3 lg:gap-8">
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
  );
}
