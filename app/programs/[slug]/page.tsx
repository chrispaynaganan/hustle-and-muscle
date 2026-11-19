import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { AddToCartButton } from "@/components/cart/cart-ui";
import { ChamferCard } from "@/components/chamfer-card";
import { Triangle } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, StepList } from "@/components/sections";
import { getCoach } from "@/lib/coaches";
import { contactSteps } from "@/lib/content";
import { peso } from "@/lib/format";
import { getProgram, programs } from "@/lib/training";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return programs.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const program = getProgram((await params).slug);
  return program ? { title: program.title, description: program.short } : {};
}

export default async function ProgramPage({ params }: Props) {
  const program = getProgram((await params).slug);
  if (!program) notFound();
  const programCoaches = program.coachSlugs.map(getCoach).filter((c) => c !== undefined);

  return (
    <>
      <PageHero title={program.title} description={program.short} image={program.image} imagePosition="object-right" compact />

      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-3 lg:gap-20">
          <div className="flex flex-col gap-14 lg:col-span-2">
            <div className="flex flex-col gap-6 text-lg tracking-display text-mist md:text-2xl">
              {program.overview.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="grid gap-12 sm:grid-cols-2">
              <List title="Who it's for" items={program.forWho} />
              <List title="What's included" items={program.includes} />
            </div>
          </div>

          <ChamferCard className="lg:sticky lg:top-8">
            <div className="flex flex-col gap-6 px-6 py-8 sm:px-10">
              {program.badge && <span className="self-start bg-brand p-3 text-lg font-medium tracking-display">{program.badge}</span>}
              <p className="flex flex-wrap items-end gap-2">
                <span className="text-6xl font-bold tracking-display text-brand">{peso(program.price)}</span>
                <span className="text-2xl tracking-display text-mist">{program.unit}</span>
              </p>
              <dl className="flex flex-col gap-3 text-lg tracking-display">
                <div className="flex gap-2">
                  <dt className="font-bold">Schedule:</dt>
                  <dd>{program.schedule}</dd>
                </div>
                <div className="flex flex-wrap gap-2">
                  <dt className="font-bold">Coach:</dt>
                  <dd>{program.coach}</dd>
                </div>
              </dl>
              <AddToCartButton
                item={{ id: `program:${program.slug}`, slug: program.slug, kind: "program", name: program.title, detail: program.unit.replace("/", ""), price: program.price, href: `/programs/${program.slug}` }}
                label={program.primaryCta}
                className="w-full text-lg"
              />
              <ButtonLink href="/contact" variant="outline" icon={false} className="w-full">
                Book a Free Assessment
              </ButtonLink>
            </div>
          </ChamferCard>
        </Container>
      </section>

      {programCoaches.length > 0 && (
        <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
          <Container>
            <SectionHeading title="Your coaches">Your assessment decides who you&apos;ll train with.</SectionHeading>
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {programCoaches.map((c) => (
                <li key={c.slug}>
                  <Link href={`/coaches/${c.slug}`} className="group flex items-center gap-5">
                    <Image src={c.image} alt="" width={160} height={160} className="size-20 rounded-full object-cover" />
                    <span>
                      <span className="block text-xl font-medium tracking-display transition-colors group-hover:text-brand">{c.name}</span>
                      <span className="block text-sm tracking-display text-mist">{c.role}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="bg-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="How it Works" />
          <div className="mt-14">
            <StepList steps={contactSteps} />
          </div>
        </Container>
      </section>

      <CtaBand title="Still have questions?" cta="Ask Us" href="/contact">
        Message us and a coach will help you decide if this program is right for you.
      </CtaBand>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-2xl font-semibold tracking-display italic">{title}</h2>
      <ul className="flex flex-col gap-4 text-lg tracking-display">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
