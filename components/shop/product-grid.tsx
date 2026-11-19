import Link from "next/link";
import { peso } from "@/lib/format";
import type { Product } from "@/lib/products";
import { ProductArt } from "./product-art";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group flex h-full flex-col transition-transform duration-500 ease-snappy hover:-translate-y-1.5">
      <div className="chamfer-sm relative aspect-square overflow-hidden bg-linear-to-br from-surface to-black">
        <ProductArt kind={product.art} color={product.color} className="size-full transition duration-700 ease-snappy group-hover:scale-110 group-hover:-rotate-2" />
        {product.badge && <span className="absolute top-4 left-4 bg-brand px-3 py-1.5 text-sm font-medium tracking-display">{product.badge}</span>}
      </div>
      <div className="mt-5 flex flex-1 flex-col gap-2">
        <p className="text-sm tracking-display text-graphite">{product.type}</p>
        <h3 className="text-xl font-medium tracking-display transition-colors group-hover:text-brand">{product.name}</h3>
        <p className="text-base tracking-display text-ash">{product.short}</p>
        <p className="mt-auto pt-2 text-2xl font-bold tracking-display text-brand">{peso(product.price)}</p>
      </div>
    </Link>
  );
}

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <ul data-reveal-group className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((p) => (
        <li key={p.slug}>
          <ProductCard product={p} />
        </li>
      ))}
    </ul>
  );
}

const tabs = [
  { label: "All Products", href: "/shop" },
  { label: "Supplements", href: "/supplements" },
  { label: "Merch", href: "/merch" },
];

export function ShopTabs({ active }: { active: string }) {
  return (
    <nav aria-label="Shop categories" className="flex flex-wrap gap-3">
      {tabs.map((t) => (
        <Link
          key={t.href}
          href={t.href}
          aria-current={active === t.href ? "page" : undefined}
          className={`border px-5 py-2.5 text-base font-medium tracking-display transition-colors ${active === t.href ? "border-brand bg-brand" : "border-white/30 hover:border-white"}`}
        >
          {t.label}
        </Link>
      ))}
    </nav>
  );
}
