import type { Metadata } from "next";
import { Container, PageHero, SectionHeading } from "@/components/page-hero";
import { CtaBand } from "@/components/sections";
import { ProductGrid, ShopTabs } from "@/components/shop/product-grid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Merch",
  description: "Hustle & Muscle tees, hoodies, caps and gym accessories.",
};

export default function MerchPage() {
  return (
    <>
      <PageHero
        title="Merch"
        description="Rep the gym inside and outside the weights area. Tees, hoodies, caps and the gear you need for every session."
        image="/images/hero-coaches.jpg"
      />
      <section className="bg-linear-to-b from-black to-surface py-16 lg:py-24">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHeading title="Wear the hustle.">Limited runs, made to train in. Members get first dibs on new drops.</SectionHeading>
            <ShopTabs active="/merch" />
          </div>
          <div className="mt-14">
            <ProductGrid products={products.filter((p) => p.category === "merch")} />
          </div>
        </Container>
      </section>
      <CtaBand title="Not a member yet?" cta="See Memberships" href="/membership">
        Join Hustle &amp; Muscle and get 24/7 access, coaching and a community that shows up.
      </CtaBand>
    </>
  );
}
