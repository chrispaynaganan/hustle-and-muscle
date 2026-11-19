import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductPurchase } from "@/components/cart/cart-ui";
import { Triangle } from "@/components/icons";
import { Container } from "@/components/page-hero";
import { ProductArt } from "@/components/shop/product-art";
import { ProductGrid } from "@/components/shop/product-grid";
import { peso } from "@/lib/format";
import { getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: product.name, description: product.short } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const categoryHref = product.category === "merch" ? "/merch" : "/supplements";
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);

  return (
    <>
      <section className="bg-linear-to-b from-black to-surface pt-40 pb-20 lg:pt-56 lg:pb-24">
        <Container>
          <nav aria-label="Breadcrumb" className="mb-10 flex flex-wrap gap-2 text-sm tracking-display text-graphite">
            <Link href="/shop" className="hover:text-white">
              Shop
            </Link>
            <span>/</span>
            <Link href={categoryHref} className="capitalize hover:text-white">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-mist">{product.name}</span>
          </nav>

          <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
            <div className="chamfer relative aspect-square overflow-hidden bg-linear-to-br from-surface to-black">
              <ProductArt kind={product.art} color={product.color} className="size-full" />
              {product.badge && <span className="absolute top-6 left-6 bg-brand p-3 text-lg font-medium tracking-display">{product.badge}</span>}
            </div>

            <div className="flex flex-col gap-10">
              <div className="flex flex-col gap-4">
                <p className="text-lg tracking-display text-graphite">{product.type}</p>
                <h1 className="text-4xl font-bold tracking-display md:text-5xl lg:text-section">{product.name}</h1>
                <p className="text-5xl font-bold tracking-display text-brand lg:text-6xl">{peso(product.price)}</p>
                <p className="text-lg tracking-display text-mist md:text-xl">{product.description}</p>
              </div>

              <ProductPurchase slug={product.slug} name={product.name} price={product.price} options={product.options} />

              <div className="flex flex-col gap-5 border-t border-white/10 pt-8">
                <p className="text-xl font-semibold tracking-display italic">Details</p>
                <ul className="flex flex-col gap-3 text-lg tracking-display">
                  {product.details.map((d) => (
                    <li key={d} className="flex items-start gap-3">
                      <Triangle className="mt-1.5 size-3 shrink-0 text-brand" />
                      {d}
                    </li>
                  ))}
                </ul>
                <p className="text-base tracking-display text-graphite">
                  Free pick-up at the front desk. Delivery available within Metro Manila.
                  {product.category === "supplements" && " If you're pregnant, on medication or have a medical condition, check with your doctor first."}
                </p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 && (
        <section className="bg-linear-to-b from-surface to-black py-20 lg:py-24">
          <Container>
            <h2 className="mb-12 text-3xl font-bold tracking-display lg:text-subsection">You might also like</h2>
            <ProductGrid products={related} />
          </Container>
        </section>
      )}
    </>
  );
}
