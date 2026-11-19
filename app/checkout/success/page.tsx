"use client";

import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/button";
import { Check } from "@/components/icons";
import { Container } from "@/components/page-hero";
import { peso } from "@/lib/format";

type Order = { number: string; name: string; email: string; fulfillment: string; payment?: string; total: number; items: { id: string; name: string; qty: number }[] };

export default function CheckoutSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    try {
      const raw = window.sessionStorage.getItem("hm-last-order");
      if (raw) setOrder(JSON.parse(raw));
    } catch {
      /* ignore */
    }
  }, []);

  return (
    <section className="min-h-svh bg-linear-to-b from-black to-surface pt-40 pb-24 lg:pt-56">
      <Container>
        <div className="flex max-w-196 flex-col items-start gap-8">
        <span className="flex size-16 items-center justify-center bg-brand">
          <Check className="size-8" />
        </span>
        <h1 className="text-5xl font-medium tracking-display md:text-7xl">Order received!</h1>
        {order ? (
          <>
            <p className="text-xl tracking-display text-mist">
              Thanks, {order.name.split(" ")[0]}. Your order <span className="font-medium text-white">{order.number}</span> is in. We&apos;ll contact you at{" "}
              <span className="text-white">{order.email}</span> to confirm payment
              {order.fulfillment === "pickup" ? " and let you know when it's ready for pick-up." : order.fulfillment === "delivery" ? " and delivery." : "."}
            </p>
            <ul className="w-full divide-y divide-white/10 border-y border-white/10">
              {order.items.map((i) => (
                <li key={i.id} className="flex justify-between py-4 text-lg tracking-display">
                  <span>{i.name}</span>
                  <span className="text-mist">× {i.qty}</span>
                </li>
              ))}
              <li className="flex justify-between py-4 text-2xl font-bold tracking-display">
                <span>Total</span>
                <span className="text-brand">{peso(order.total)}</span>
              </li>
            </ul>
          </>
        ) : (
          <p className="text-xl tracking-display text-mist">Thanks for your order. We&apos;ll be in touch shortly to confirm it.</p>
        )}
        <div className="flex flex-wrap gap-4">
          <ButtonLink href="/">Back to Home</ButtonLink>
          <ButtonLink href="/shop" variant="outline" icon={false}>
            Keep Shopping
          </ButtonLink>
        </div>
        </div>
      </Container>
    </section>
  );
}
