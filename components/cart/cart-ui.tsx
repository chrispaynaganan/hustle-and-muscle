"use client";

import Link from "next/link";
import { useState } from "react";
import { peso } from "@/lib/format";
import { buttonClasses } from "../button";
import { ArrowUpRight, Bag, Check, Close } from "../icons";
import { type CartItem, useCart } from "./cart-provider";

/** Cart icon with item count, used in the header. */
export function CartButton({ className = "" }: { className?: string }) {
  const { count, ready } = useCart();
  return (
    <Link href="/cart" aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`} className={`relative flex size-11 items-center justify-center transition-colors hover:text-brand ${className}`}>
      <Bag className="size-6" />
      {ready && count > 0 && (
        <span className="absolute top-0.5 right-0 flex size-5 items-center justify-center rounded-full bg-brand text-xs font-medium text-white">
          {count > 9 ? "9+" : count}
        </span>
      )}
    </Link>
  );
}

type AddToCartProps = {
  item: Omit<CartItem, "qty">;
  label?: string;
  variant?: "solid" | "outline" | "brand";
  className?: string;
};

/** A simple add-to-cart button for programs, classes and memberships. */
export function AddToCartButton({ item, label = "Add to Cart", variant = "solid", className = "" }: AddToCartProps) {
  const { add, items } = useCart();
  const inCart = items.some((i) => i.id === item.id);
  return (
    <button type="button" onClick={() => add(item)} className={buttonClasses(variant, `cursor-pointer ${className}`)}>
      <span>{inCart && item.kind !== "product" ? "In Your Cart" : label}</span>
      {inCart && item.kind !== "product" ? <Check className="size-5 shrink-0" /> : <ArrowUpRight className="size-6 shrink-0" />}
    </button>
  );
}

/** Product purchase box: option picker, quantity, add to cart. */
export function ProductPurchase({
  slug,
  name,
  price,
  options,
}: {
  slug: string;
  name: string;
  price: number;
  options?: { label: string; values: string[] };
}) {
  const { add } = useCart();
  const [option, setOption] = useState(options?.values[0]);
  const [qty, setQty] = useState(1);

  return (
    <div className="flex flex-col gap-8">
      {options && (
        <fieldset className="flex flex-col gap-4">
          <legend className="mb-4 text-lg font-medium tracking-display">
            {options.label}: <span className="text-mist">{option}</span>
          </legend>
          <div className="flex flex-wrap gap-3">
            {options.values.map((v) => (
              <label key={v} className="cursor-pointer">
                <input type="radio" name="option" value={v} checked={option === v} onChange={() => setOption(v)} className="peer sr-only" />
                <span className="block border border-white/30 px-5 py-3 text-base tracking-display transition-colors peer-checked:border-brand peer-checked:bg-brand peer-focus-visible:outline-2 peer-focus-visible:outline-brand hover:border-white">
                  {v}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <div className="flex flex-wrap items-stretch gap-4">
        <QtyStepper value={qty} onChange={setQty} />
        <button
          type="button"
          onClick={() =>
            add({ id: option ? `${slug}:${option}` : slug, slug, kind: "product", name, detail: option ? `${options?.label}: ${option}` : undefined, price, href: `/shop/${slug}` }, qty)
          }
          className={buttonClasses("brand", "flex-1 cursor-pointer text-lg")}
        >
          <span>Add to Cart · {peso(price * qty)}</span>
        </button>
      </div>
    </div>
  );
}

export function QtyStepper({ value, onChange, small = false }: { value: number; onChange: (n: number) => void; small?: boolean }) {
  const size = small ? "size-9" : "size-12";
  return (
    <div className="flex items-center border border-white/30">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(small ? 0 : 1, value - 1))} className={`${size} cursor-pointer text-xl transition-colors hover:text-brand`}>
        −
      </button>
      <span className="w-8 text-center text-base tabular-nums" aria-live="polite">
        {value}
      </span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(20, value + 1))} className={`${size} cursor-pointer text-xl transition-colors hover:text-brand`}>
        +
      </button>
    </div>
  );
}

/** Toast that confirms an item was added, with a shortcut to the cart. */
export function CartToast() {
  const { lastAdded, dismissToast, count } = useCart();
  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed right-4 bottom-4 left-4 z-50 transition-all duration-300 sm:left-auto sm:w-96 ${lastAdded ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}`}
    >
      {lastAdded && (
        <div className="flex flex-col gap-4 border border-brand/60 bg-night p-5 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center bg-brand">
                <Check className="size-4" />
              </span>
              <div>
                <p className="text-base font-medium tracking-display">Added to cart</p>
                <p className="text-sm tracking-display text-mist">
                  {lastAdded.name}
                  {lastAdded.detail ? ` · ${lastAdded.detail}` : ""}
                </p>
              </div>
            </div>
            <button type="button" onClick={dismissToast} aria-label="Dismiss" className="cursor-pointer text-mist hover:text-white">
              <Close className="size-5" />
            </button>
          </div>
          <Link href="/cart" onClick={dismissToast} className={buttonClasses("solid", "w-full")}>
            <span>View Cart ({count})</span>
          </Link>
        </div>
      )}
    </div>
  );
}
