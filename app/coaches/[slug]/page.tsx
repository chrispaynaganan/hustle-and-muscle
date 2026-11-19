import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { ChamferCard } from "@/components/chamfer-card";
import { Triangle } from "@/components/icons";
import { Container, SectionHeading } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { ClassCard } from "@/components/training-cards";
import { coaches, getCoach } from "@/lib/coaches";
import { peso } from "@/lib/format";
import { contactHref } from "@/lib/site";
import { gxClasses, programs } from "@/lib/training";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return coaches.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const coach = getCoach((await params).slug);
  return coach ? { title: coach.name, description: `${coach.role} at Hustle & Muscle. ${coach.bio[0]}` } : {};
}

export default async function CoachPage({ params }: Props) {
  const coach = getCoach((await params).slug);
  if (!coach) notFound();

  const classes = gxClasses.filter((c) => c.coachSlug === coach.slug);
  const coachPrograms = programs.filter((p) => p.coachSlugs.includes(coach.slug));
  const others = coaches.filter((c) => c.slug !== coach.slug).slice(0, 3);

  return (
    <>
      <section className="bg-linear-to-b from-black to-surface pt-40 pb-20 lg:pt-56 lg:pb-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 flex gap-2 text-sm tracking-display text-graphite">
            <Link href="/coaches" className="hover:text-white">
              Coaches
            </Link>
            <span>/</span>
            <span className="text-mist">{coach.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-5 lg:gap-20">
            <div className="chamfer relative aspect-portrait overflow-hidden bg-mist lg:col-span-2">
              <Image src={coach.image} alt={coach.name} fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>

            <div className="flex flex-col gap-10 lg:col-span-3">
              <div className="flex flex-col gap-4">
                <p className="text-lg font-medium tracking-display text-brand">{coach.role}</p>
                <h1 className="text-5xl font-medium tracking-display md:text-7xl lg:text-8xl">{coach.name.replace("Coach ", "")}</h1>
                <p className="text-2xl font-light tracking-display text-mist italic lg:text-heading">&ldquo;{coach.motto}&rdquo;</p>
              </div>

              <dl className="grid grid-cols-3 gap-4 border-y border-white/10 py-6">
                <div>
                  <dt className="text-sm tracking-display text-graphite">Experience</dt>
                  <dd className="mt-1 text-3xl font-bold tracking-display">{coach.years} yrs</dd>
                </div>
                <div>
                  <dt className="text-sm tracking-display text-graphite">GX classes</dt>
                  <dd className="mt-1 text-3xl font-bold tracking-display">{classes.length}</dd>
                </div>
                <div>
                  <dt className="text-sm tracking-display text-graphite">Programs</dt>
                  <dd className="mt-1 text-3xl font-bold tracking-display">{coachPrograms.length}</dd>
                </div>
              </dl>

              <div className="flex flex-col gap-5 text-lg tracking-display text-mist md:text-xl">
                {coach.bio.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>

              <div data-reveal-group className="grid gap-10 sm:grid-cols-2">
                <div className="flex flex-col gap-5">
                  <h2 className="text-xl font-semibold tracking-display italic">Specialties</h2>
                  <ul className="flex flex-col gap-3 text-lg tracking-display">
                    {coach.specialties.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-5">
                  <h2 className="text-xl font-semibold tracking-display italic">Great for</h2>
                  <ul className="flex flex-col gap-3 text-lg tracking-display">
                    {coach.bestFor.map((s) => (
                      <li key={s} className="flex items-start gap-3">
                        <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <ButtonLink href={contactHref("coaching", coach.name)}>Book a Session</ButtonLink>
                {coach.facebook && (
                  <ButtonLink href={coach.facebook} target="_blank" rel="noreferrer" variant="outline">
                    View Facebook
                  </ButtonLink>
                )}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {(classes.length > 0 || coachPrograms.length > 0) && (
        <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
          <Container>
            <SectionHeading title={`Train with ${coach.name.split(" ")[1]}`}>Programs and GX classes led by this coach.</SectionHeading>
            <div data-reveal-group className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {coachPrograms.map((p) => (
                <ChamferCard key={p.slug} size="sm" className="h-full">
                  <Link href={`/programs/${p.slug}`} className="group flex h-full flex-col gap-6 px-6 py-8 sm:px-10">
                    <span className="self-start border border-white/30 px-3 py-1.5 text-sm tracking-display text-mist">General Program</span>
                    <h3 className="text-3xl font-bold tracking-display transition-colors group-hover:text-brand lg:text-heading">{p.title}</h3>
                    <p className="text-lg tracking-display text-mist">{p.short}</p>
                    <p className="mt-auto flex items-end gap-2">
                      <span className="text-5xl font-bold tracking-display text-brand">{peso(p.price)}</span>
                      <span className="text-xl tracking-display text-mist">{p.unit}</span>
                    </p>
                  </Link>
                </ChamferCard>
              ))}
              {classes.map((c) => (
                <ClassCard key={c.slug} gx={c} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-black py-20 lg:py-24">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading title="More coaches" />
            <ButtonLink href="/coaches" variant="outline">
              All Coaches
            </ButtonLink>
          </div>
          <ul data-reveal-group className="mt-12 grid gap-6 sm:grid-cols-3 lg:gap-8">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/coaches/${c.slug}`} className="group relative block aspect-portrait overflow-hidden bg-mist">
                  <Image src={c.image} alt={c.name} fill sizes="(min-width: 640px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-x-0 bottom-0 bg-white/10 px-6 py-6 backdrop-blur-2xl">
                    <p className="text-xl font-medium tracking-display lg:text-2xl">{c.name}</p>
                    <p className="text-sm tracking-display text-mist">{c.role}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBand title={`Book a session with ${coach.name.split(" ")[1]}`} cta="Book a Session" href={contactHref("coaching", coach.name)}>Start with a free assessment and we&apos;ll set you up with the right plan.</CtaBand>
    </>
  );
}
