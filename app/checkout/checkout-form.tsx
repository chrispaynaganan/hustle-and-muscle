"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ButtonLink } from "@/components/button";
import { useCart } from "@/components/cart/cart-provider";
import { Container } from "@/components/page-hero";
import { peso } from "@/lib/format";

const field =
  "w-full bg-field px-4 py-4 text-lg tracking-display text-white placeholder:text-smoke focus:outline-2 focus:outline-brand";

const DELIVERY_FEE = 150;

const paymentMethods = [
  { value: "gcash", label: "GCash" },
  { value: "maya", label: "Maya" },
  { value: "card", label: "Credit / Debit Card" },
  { value: "cash", label: "Cash at the front desk" },
];

export function CheckoutForm() {
  const router = useRouter();
  const { items, subtotal, clear, ready } = useCart();
  const hasProducts = items.some((i) => i.kind === "product");
  const [fulfillment, setFulfillment] = useState<"pickup" | "delivery">("pickup");
  const [payment, setPayment] = useState("gcash");

  const delivery = hasProducts && fulfillment === "delivery" ? DELIVERY_FEE : 0;
  const total = subtotal + delivery;

  if (ready && items.length === 0) {
    return (
      <section className="min-h-svh bg-linear-to-b from-black to-surface pt-40 pb-24 lg:pt-56">
        <Container className="flex flex-col items-start gap-8">
          <h1 className="text-6xl font-medium tracking-display md:text-8xl">Checkout</h1>
          <p className="text-xl tracking-display text-mist">There&apos;s nothing in your cart yet.</p>
          <ButtonLink href="/shop">Go to the Shop</ButtonLink>
        </Container>
      </section>
    );
  }

  // Frontend-only: no payment is taken. Connect a payment provider (e.g. PayMongo) here later.
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const order = {
      number: `HM-${Date.now().toString().slice(-6)}`,
      name: String(data.get("name") || ""),
      email: String(data.get("email") || ""),
      fulfillment: hasProducts ? fulfillment : "none",
      payment: paymentMethods.find((p) => p.value === payment)?.label,
      items,
      total,
    };
    try {
      window.sessionStorage.setItem("hm-last-order", JSON.stringify(order));
    } catch {
      /* ignore */
    }
    clear();
    router.push("/checkout/success");
  }

  return (
    <section className="min-h-svh bg-linear-to-b from-black to-surface pt-40 pb-24 lg:pt-56">
      <Container>
        <h1 className="text-6xl font-medium tracking-display md:text-8xl">Checkout</h1>

        <form onSubmit={onSubmit} className="mt-12 grid items-start gap-12 lg:grid-cols-3">
          <div className="flex flex-col gap-12 lg:col-span-2">
            <fieldset className="flex flex-col gap-6">
              <legend className="mb-6 text-2xl font-medium tracking-display lg:text-heading">Your details</legend>
              <input name="name" required autoComplete="name" placeholder="Full Name" aria-label="Full Name" className={field} />
              <div className="grid gap-6 sm:grid-cols-2">
                <input name="email" type="email" required autoComplete="email" placeholder="Email Address" aria-label="Email Address" className={field} />
                <input name="mobile" type="tel" required autoComplete="tel" placeholder="Mobile Number" aria-label="Mobile Number" className={field} />
              </div>
            </fieldset>

            {hasProducts && (
              <fieldset className="flex flex-col gap-6">
                <legend className="mb-6 text-2xl font-medium tracking-display lg:text-heading">Pick-up or delivery</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(["pickup", "delivery"] as const).map((f) => (
                    <label key={f} className="cursor-pointer">
                      <input type="radio" name="fulfillment" checked={fulfillment === f} onChange={() => setFulfillment(f)} className="peer sr-only" />
                      <span className="flex h-full flex-col gap-1 border border-white/20 p-5 transition-colors peer-checked:border-brand peer-checked:bg-brand/10 peer-focus-visible:outline-2 peer-focus-visible:outline-brand">
                        <span className="text-lg font-medium tracking-display">{f === "pickup" ? "Pick up at the gym" : "Deliver to me"}</span>
                        <span className="text-base tracking-display text-mist">{f === "pickup" ? "Free · Ready within 24 hours" : `${peso(DELIVERY_FEE)} · Metro Manila, 2–4 days`}</span>
                      </span>
                    </label>
                  ))}
                </div>
                {fulfillment === "delivery" && (
                  <div className="flex flex-col gap-6">
                    <input name="address" required autoComplete="street-address" placeholder="Street address, building, unit" aria-label="Street address" className={field} />
                    <div className="grid gap-6 sm:grid-cols-2">
                      <input name="city" required autoComplete="address-level2" placeholder="City" aria-label="City" className={field} />
                      <input name="zip" required autoComplete="postal-code" placeholder="ZIP Code" aria-label="ZIP Code" className={field} />
                    </div>
                  </div>
                )}
              </fieldset>
            )}

            <fieldset className="flex flex-col gap-6">
              <legend className="mb-6 text-2xl font-medium tracking-display lg:text-heading">Payment</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                {paymentMethods.map((m) => (
                  <label key={m.value} className="cursor-pointer">
                    <input type="radio" name="payment" checked={payment === m.value} onChange={() => setPayment(m.value)} className="peer sr-only" />
                    <span className="block border border-white/20 p-5 text-lg font-medium tracking-display transition-colors peer-checked:border-brand peer-checked:bg-brand/10 peer-focus-visible:outline-2 peer-focus-visible:outline-brand">
                      {m.label}
                    </span>
                  </label>
                ))}
              </div>
              <p className="text-base tracking-display text-graphite">
                Demo checkout: no payment is charged. Our team will contact you to confirm your order and payment.
              </p>
            </fieldset>
          </div>

          <aside className="flex flex-col gap-6 border border-white/10 bg-night p-8 lg:sticky lg:top-8">
            <h2 className="text-2xl font-medium tracking-display">Order Summary</h2>
            <ul className="flex flex-col gap-4 border-b border-white/10 pb-6">
              {items.map((i) => (
                <li key={i.id} className="flex justify-between gap-4 text-base tracking-display">
                  <span>
                    {i.name}
                    {i.qty > 1 && <span className="text-mist"> × {i.qty}</span>}
                    {i.detail && <span className="block text-sm text-graphite">{i.detail}</span>}
                  </span>
                  <span className="shrink-0 tabular-nums">{peso(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="flex flex-col gap-3 text-lg tracking-display">
              <div className="flex justify-between">
                <dt className="text-mist">Subtotal</dt>
                <dd className="tabular-nums">{peso(subtotal)}</dd>
              </div>
              {hasProducts && (
                <div className="flex justify-between">
                  <dt className="text-mist">Delivery</dt>
                  <dd className="tabular-nums">{delivery ? peso(delivery) : "Free"}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-white/10 pt-3 text-2xl font-bold">
                <dt>Total</dt>
                <dd className="text-brand tabular-nums">{peso(total)}</dd>
              </div>
            </dl>
            <label className="flex cursor-pointer items-start gap-3 text-base tracking-display text-fog">
              <input type="checkbox" required className="mt-1 size-4 shrink-0 accent-brand" />
              <span>
                I agree to the{" "}
                <a href="/terms" target="_blank" className="underline hover:text-brand">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="/club-rules" target="_blank" className="underline hover:text-brand">
                  Club Rules
                </a>
                .
              </span>
            </label>
            <button type="submit" className="w-full cursor-pointer bg-brand px-4 py-5 text-lg font-medium tracking-display transition-colors hover:bg-brand-dark">
              Place Order · {peso(total)}
            </button>
          </aside>
        </form>
      </Container>
    </section>
  );
}
