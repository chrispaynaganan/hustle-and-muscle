import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { AddToCartButton } from "@/components/cart/cart-ui";
import { ChamferCard } from "@/components/chamfer-card";
import { Clock, Triangle } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { ClassCard } from "@/components/training-cards";
import { getCoach } from "@/lib/coaches";
import { peso } from "@/lib/format";
import { getClass, gxClasses } from "@/lib/training";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return gxClasses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const gx = getClass((await params).slug);
  return gx ? { title: gx.title, description: gx.short } : {};
}

export default async function ClassPage({ params }: Props) {
  const gx = getClass((await params).slug);
  if (!gx) notFound();
  const coach = getCoach(gx.coachSlug);
  const others = gxClasses.filter((c) => c.slug !== gx.slug).slice(0, 3);

  return (
    <>
      <PageHero title={gx.title} description={gx.short} image={coach?.image ?? "/images/interview.jpg"} compact />

      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-3 lg:gap-20">
          <div className="flex flex-col gap-14 lg:col-span-2">
            <div className="flex flex-col gap-6 text-lg tracking-display text-mist md:text-2xl">
              {gx.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>

            <dl className="grid gap-6 border-y border-white/10 py-8 sm:grid-cols-3">
              <div>
                <dt className="text-sm tracking-display text-graphite">Level</dt>
                <dd className="mt-1 text-xl font-medium tracking-display">{gx.level}</dd>
              </div>
              <div>
                <dt className="text-sm tracking-display text-graphite">Duration</dt>
                <dd className="mt-1 text-xl font-medium tracking-display">{gx.duration}</dd>
              </div>
              <div>
                <dt className="text-sm tracking-display text-graphite">Pack</dt>
                <dd className="mt-1 text-xl font-medium tracking-display">{gx.unit.replace("/", "")}</dd>
              </div>
            </dl>

            <div className="grid gap-12 sm:grid-cols-2">
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-semibold tracking-display italic">Schedule</h2>
                <ul className="flex flex-col gap-4 text-lg tracking-display">
                  {gx.slots.map((s) => (
                    <li key={s.day} className="flex items-center gap-3">
                      <Clock className="size-5 shrink-0 text-brand" />
                      {s.day}s, {s.time}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-5">
                <h2 className="text-2xl font-semibold tracking-display italic">What to bring</h2>
                <ul className="flex flex-col gap-4 text-lg tracking-display">
                  {gx.bring.map((b) => (
                    <li key={b} className="flex items-start gap-3">
                      <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {coach && (
              <Link href={`/coaches/${coach.slug}`} className="group flex items-center gap-6 border border-white/10 p-6">
                <Image src={coach.image} alt="" width={192} height={192} className="size-24 shrink-0 rounded-full object-cover" />
                <span className="flex flex-col gap-1">
                  <span className="text-sm tracking-display text-graphite">Your coach</span>
                  <span className="text-2xl font-medium tracking-display transition-colors group-hover:text-brand">{coach.name}</span>
                  <span className="text-base tracking-display text-mist">{coach.role}</span>
                </span>
              </Link>
            )}
          </div>

          <ChamferCard glow={!!gx.featured} className="lg:sticky lg:top-8">
            <div className="flex flex-col gap-6 px-6 py-8 sm:px-10">
              <p className="flex flex-wrap items-end gap-2">
                <span className="text-6xl font-bold tracking-display text-brand">{peso(gx.price)}</span>
                <span className="text-2xl tracking-display text-mist">{gx.unit}</span>
              </p>
              <p className="text-lg font-light tracking-display italic">{gx.schedule}</p>
              {gx.slotsLeft && <p className="self-start bg-brand/15 px-3 py-2 text-base font-medium tracking-display text-brand">Only {gx.slotsLeft} slots left</p>}
              <AddToCartButton
                item={{ id: `class:${gx.slug}`, slug: gx.slug, kind: "class", name: gx.title, detail: gx.unit.replace("/", ""), price: gx.price, href: `/classes/${gx.slug}` }}
                label="Join the Class"
                className="w-full text-lg"
              />
              <ButtonLink href="/membership" variant="outline" icon={false} className="w-full">
                Try It With a Day Pass
              </ButtonLink>
            </div>
          </ChamferCard>
        </Container>
      </section>

      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="Other classes" />
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {others.map((c) => (
              <ClassCard key={c.slug} gx={c} />
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Questions about this class?" cta="Ask Us">Message us and we&apos;ll help you pick the right class for your level.</CtaBand>
    </>
  );
}
