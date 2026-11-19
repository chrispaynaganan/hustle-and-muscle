import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { peso } from "@/lib/format";
import { gxClasses, memberships, programs } from "@/lib/training";

export const metadata: Metadata = {
  title: "Packages",
  description: "Memberships, personal training programs and GX class packs at Hustle & Muscle.",
};

const lowest = (prices: number[]) => peso(Math.min(...prices));

const packages = [
  {
    title: "Memberships",
    body: "24/7 open gym access with every amenity. Monthly to annual plans, plus day passes.",
    from: `From ${lowest(memberships.filter((m) => m.kind === "membership").map((m) => m.price))}/month`,
    href: "/membership",
    image: "/images/hero-home.jpg",
  },
  {
    title: "General Programs",
    body: "Coached personal training for weight loss, strength, striking and mobility.",
    from: `From ${lowest(programs.map((p) => p.price))} for 6 sessions`,
    href: "/programs",
    image: "/images/program-2.jpg",
  },
  {
    title: "GX Classes",
    body: "Group classes like HIIT, boxing, Muay Thai, core and mobility, sold as class packs.",
    from: `From ${lowest(gxClasses.map((c) => c.price))} per pack`,
    href: "/classes",
    image: "/images/interview.jpg",
  },
];

export default function PackagesPage() {
  return (
    <>
      <PageHero
        title="Packages"
        description="Open gym, coached programs or group classes. Mix and match whatever gets you to your goal."
        image="/images/program-1.jpg"
        imagePosition="object-right"
      />
      <section className="bg-linear-to-b from-black to-surface py-20 lg:py-24">
        <Container>
          <SectionHeading title="Choose how you train" />
          <ul className="mt-14 grid gap-8 lg:grid-cols-3">
            {packages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="group chamfer relative flex aspect-portrait flex-col justify-end overflow-hidden">
                  <Image src={p.image} alt="" fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover transition duration-700 group-hover:scale-105" />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-black via-black/60 to-transparent" />
                  <div className="relative flex flex-col gap-4 p-8 sm:p-10">
                    <h2 className="text-4xl font-bold tracking-display">{p.title}</h2>
                    <p className="text-lg tracking-display text-mist">{p.body}</p>
                    <p className="text-xl font-bold tracking-display text-brand">{p.from}</p>
                    <span className="mt-2 inline-flex items-center gap-3 self-start bg-white px-6 py-3 text-base font-medium text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                      View {p.title}
                      <ArrowUpRight className="size-5" />
                    </span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <CtaBand title="Not sure which one?">Book a free assessment and we&apos;ll recommend the right mix for your goal and budget.</CtaBand>
    </>
  );
}
