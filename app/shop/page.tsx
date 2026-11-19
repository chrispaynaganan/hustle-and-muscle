import type { Metadata } from "next";
import { Container, PageHero } from "@/components/page-hero";
import { ProductGrid, ShopTabs } from "@/components/shop/product-grid";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Shop",
  description: "Supplements, apparel and gym gear from Hustle & Muscle. Order online and pick up at the gym or get it delivered.",
};

export default function ShopPage() {
  return (
    <>
      <PageHero
        title="Shop"
        description="Supplements, apparel and gear. Order online, then pick up at the front desk or get it delivered."
        image="/images/program-2.jpg"
        imagePosition="object-right"
      />
      <section className="bg-linear-to-b from-black to-surface py-16 lg:py-24">
        <Container>
          <ShopTabs active="/shop" />
          <div className="mt-12">
            <ProductGrid products={products} />
          </div>
        </Container>
      </section>
    </>
  );
}
