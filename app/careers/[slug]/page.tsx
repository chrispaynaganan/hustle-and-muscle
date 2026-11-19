import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/button";
import { ChamferCard } from "@/components/chamfer-card";
import { Triangle } from "@/components/icons";
import { Container, SectionHeading } from "@/components/page-hero";
import { SimpleForm } from "@/components/simple-form";
import { applicationFields, getRole, roles } from "@/lib/careers";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return roles.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const role = getRole((await params).slug);
  return role ? { title: `${role.title} | Careers`, description: role.summary } : {};
}

export default async function RolePage({ params }: Props) {
  const role = getRole((await params).slug);
  if (!role) notFound();

  return (
    <>
      <section className="bg-linear-to-b from-black to-surface pt-40 pb-20 lg:pt-56 lg:pb-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 flex gap-2 text-sm tracking-display text-graphite">
            <Link href="/careers" className="hover:text-white">
              Careers
            </Link>
            <span>/</span>
            <span className="text-mist">{role.title}</span>
          </nav>
          <div className="flex max-w-220 flex-col items-start gap-8">
            <span className="border border-brand px-3 py-1.5 text-sm tracking-display text-brand">{role.type}</span>
            <h1 className="text-5xl leading-tight font-medium tracking-display md:text-7xl">{role.title}</h1>
            <p className="text-xl tracking-display text-mist md:text-lede">{role.summary}</p>
            <ButtonLink href="#apply">Apply for this Role</ButtonLink>
          </div>
        </Container>
      </section>

      <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container className="grid items-start gap-14 lg:grid-cols-3 lg:gap-20">
          <div data-reveal-group className="flex flex-col gap-14 lg:col-span-2">
            <div className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold tracking-display lg:text-subsection">About the role</h2>
              {role.about.map((p) => (
                <p key={p} className="text-lg tracking-display text-mist md:text-xl">
                  {p}
                </p>
              ))}
            </div>
            <List title="What you'll do" items={role.responsibilities} />
            <List title="What we're looking for" items={role.requirements} />
          </div>
          <aside className="flex flex-col gap-8 border border-white/10 bg-night p-8 lg:sticky lg:top-8">
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-display text-graphite">Type</p>
              <p className="text-xl font-medium tracking-display">{role.type}</p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm tracking-display text-graphite">Schedule</p>
              <p className="text-lg tracking-display">{role.schedule}</p>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-sm tracking-display text-graphite">Perks</p>
              <ul className="flex flex-col gap-2 text-lg tracking-display">
                {role.perks.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </section>

      <section id="apply" className="scroll-mt-10 bg-black py-20 lg:py-24">
        <Container className="grid items-start gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="flex flex-col items-start gap-8">
            <SectionHeading title="Apply now">Tell us about yourself and we&apos;ll get in touch if there&apos;s a fit.</SectionHeading>
            <Link href="/careers" className="text-base font-medium text-brand hover:underline">
              See other open roles
            </Link>
          </div>
          <ChamferCard hover={false}>
            <div className="px-6 py-10 sm:px-10.5">
              <SimpleForm
                submitLabel="Submit Application"
                successTitle="Application received!"
                successBody={`Thanks for applying for ${role.title}. We'll review your details and reach out if there's a fit.`}
                fields={applicationFields(role.title)}
              />
            </div>
          </ChamferCard>
        </Container>
      </section>
    </>
  );
}

function List({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-3xl font-bold tracking-display lg:text-subsection">{title}</h2>
      <ul className="flex flex-col gap-4 text-lg tracking-display md:text-xl">
        {items.map((i) => (
          <li key={i} className="flex items-start gap-3">
            <Triangle className="mt-2 size-3 shrink-0 text-brand" />
            {i}
          </li>
        ))}
      </ul>
    </div>
  );
}
