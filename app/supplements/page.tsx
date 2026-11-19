import type { Metadata } from "next";
import Image from "next/image";
import { ChamferCard } from "@/components/chamfer-card";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand, StepList } from "@/components/sections";
import { ProductGrid, ShopTabs } from "@/components/shop/product-grid";
import { products } from "@/lib/products";
import { partners, supplementCategories, supplementRules } from "@/lib/content";
import { contactHref } from "@/lib/site";

export const metadata: Metadata = {
  title: "Supplements",
  description: "Protein, pre-workout, creatine and recovery essentials from trusted partner brands, with honest advice from our coaches.",
};

export default function SupplementsPage() {
  return (
    <>
      <PageHero
        title="Supplements"
        description="Trusted brands, honest advice. Order online, then pick up at the front desk or get it delivered."
        image="/images/program-2.jpg"
        imagePosition="object-right"
      />

      {/* Products */}
      <section id="shop" className="scroll-mt-10 bg-linear-to-b from-black to-surface py-16 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading title="Shop supplements">Coach-approved staples. Free pick-up at the gym.</SectionHeading>
            <ShopTabs active="/supplements" />
          </div>
          <div className="mt-14">
            <ProductGrid products={products.filter((p) => p.category === "supplements")} />
          </div>
        </Container>
      </section>

      {/* Categories */}
      <section id="categories" className="scroll-mt-10 bg-linear-to-b from-surface to-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="What to take, and why">A quick guide to each category, so you only buy what helps your goal.</SectionHeading>
          <ul className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {supplementCategories.map((item, i) => (
              <li key={item.title}>
                <ChamferCard size="sm" glow={i < 3} className="h-full">
                  <div className="flex h-full flex-col gap-6 px-6 py-8 sm:px-10">
                    <span className="text-6xl font-bold tracking-display text-brand/80">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="text-3xl font-bold tracking-display lg:text-heading">{item.title}</h3>
                    <p className="text-lg tracking-display text-mist">{item.body}</p>
                    <p className="mt-auto text-base tracking-display">
                      <span className="text-graphite">Best for: </span>
                      <span className="font-medium">{item.bestFor}</span>
                    </p>
                  </div>
                </ChamferCard>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Brands */}
      <section id="brands" className="relative scroll-mt-10 overflow-hidden bg-black py-20 lg:py-24">
        <div aria-hidden className="absolute -top-16 left-1/2 h-24 w-11/12 -translate-x-1/2 rounded-full bg-brand/40 blur-3xl" />
        <Container className="relative">
          <SectionHeading title={<>From brands we <span className="text-brand">trust</span></>}>
            We partner with brands our coaches actually use, so you&apos;re not guessing what&apos;s in the tub.
          </SectionHeading>
          <ul className="mt-14 grid grid-cols-2 items-center justify-items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:mt-16 lg:flex lg:justify-between">
            {partners.filter((p) => !["VeritasPay", "Garmin"].includes(p.name)).map((p) => (
              <li key={p.src}>
                <Image src={p.src} alt={p.name} width={p.width} height={p.height} className="h-auto max-h-14 w-auto max-w-40 xl:max-w-52" />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Guidance */}
      <section className="bg-black py-20 lg:py-24">
        <Container>
          <SectionHeading title="Our honest take">Supplements help, but they&apos;re the last 10%. Here&apos;s how we approach them.</SectionHeading>
          <div className="mt-14">
            <StepList steps={supplementRules} columns={3} />
          </div>
        </Container>
      </section>

      <CtaBand title="Not sure what to take?" cta="Ask a Coach" href={contactHref("other", "Supplement advice")}>
        Book a free assessment and your coach will recommend what&apos;s worth it for your goal, and what you can skip.
      </CtaBand>
    </>
  );
}
