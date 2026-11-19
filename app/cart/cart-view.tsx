"use client";

import Link from "next/link";
import { buttonClasses, ButtonLink } from "@/components/button";
import { useCart } from "@/components/cart/cart-provider";
import { QtyStepper } from "@/components/cart/cart-ui";
import { Trash } from "@/components/icons";
import { Container } from "@/components/page-hero";
import { peso } from "@/lib/format";

const kindLabel = { product: "Shop", program: "Program", class: "GX Class", membership: "Membership" } as const;

export function CartView() {
  const { items, subtotal, setQty, remove, ready } = useCart();

  return (
    <section className="min-h-svh bg-linear-to-b from-black to-surface pt-40 pb-24 lg:pt-56">
      <Container>
        <h1 className="text-6xl font-medium tracking-display md:text-8xl">Your Cart</h1>

        {!ready ? null : items.length === 0 ? (
          <div className="mt-12 flex flex-col items-start gap-8">
            <p className="text-xl tracking-display text-mist">Your cart is empty.</p>
            <div className="flex flex-wrap gap-4">
              <ButtonLink href="/shop">Shop Products</ButtonLink>
              <ButtonLink href="/membership" variant="outline">
                See Memberships
              </ButtonLink>
            </div>
          </div>
        ) : (
          <div className="mt-12 grid items-start gap-12 lg:grid-cols-3">
            <ul className="divide-y divide-white/10 border-y border-white/10 lg:col-span-2">
              {items.map((item) => (
                <li key={item.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-col gap-1">
                    <span className="text-sm tracking-display text-brand">{kindLabel[item.kind]}</span>
                    <Link href={item.href} className="text-xl font-medium tracking-display hover:text-brand">
                      {item.name}
                    </Link>
                    {item.detail && <span className="text-base tracking-display text-mist">{item.detail}</span>}
                    <span className="text-base tracking-display text-graphite">{peso(item.price)} each</span>
                  </div>
                  <div className="flex items-center gap-6">
                    {item.kind === "product" ? <QtyStepper small value={item.qty} onChange={(n) => setQty(item.id, n)} /> : <span className="text-base text-graphite">Qty 1</span>}
                    <span className="w-28 text-right text-xl font-bold tracking-display tabular-nums">{peso(item.price * item.qty)}</span>
                    <button type="button" onClick={() => remove(item.id)} aria-label={`Remove ${item.name}`} className="cursor-pointer text-graphite transition-colors hover:text-brand">
                      <Trash className="size-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <aside className="flex flex-col gap-6 border border-white/10 bg-night p-8">
              <h2 className="text-2xl font-medium tracking-display">Order Summary</h2>
              <dl className="flex flex-col gap-3 text-lg tracking-display">
                <div className="flex justify-between">
                  <dt className="text-mist">Subtotal</dt>
                  <dd className="tabular-nums">{peso(subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mist">Delivery</dt>
                  <dd className="text-mist">Calculated at checkout</dd>
                </div>
              </dl>
              <Link href="/checkout" className={buttonClasses("brand", "w-full text-lg")}>
                <span>Checkout</span>
              </Link>
              <Link href="/shop" className="text-center text-base text-mist hover:text-white">
                Continue shopping
              </Link>
            </aside>
          </div>
        )}
      </Container>
    </section>
  );
}
