"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import type { Coach } from "@/lib/coaches";
import { peso } from "@/lib/format";
import type { Product } from "@/lib/products";
import type { Membership } from "@/lib/training";
import { ChamferCard } from "../chamfer-card";
import { CountUp } from "../motion/count-up";
import { ProductArt } from "../shop/product-art";

const btn =
  "glint inline-flex items-center justify-center bg-white px-3 py-2 text-sm font-medium text-brand transition-all duration-300 ease-snappy hover:bg-brand hover:text-white active:scale-95 disabled:pointer-events-none disabled:opacity-50";
const ghost = "inline-flex items-center justify-center border border-white/60 px-3 py-2 text-sm font-medium transition-colors hover:bg-white hover:text-black";

type AddFn = (el: HTMLElement) => void;

/** Program, class or single membership offer with a counting price. */
export function OfferCard({
  tag,
  title,
  price,
  unit,
  line,
  href,
  addLabel,
  addedLabel,
  detailsLabel,
  onAdd,
}: {
  tag?: string;
  title: string;
  price: number;
  unit?: string;
  line: string;
  href: string;
  addLabel: string;
  addedLabel: string;
  detailsLabel: string;
  onAdd: AddFn;
}) {
  const [added, setAdded] = useState(false);
  return (
    <ChamferCard size="sm" hover={false} className="motion-safe:animate-card-wipe">
      <div className="flex flex-col gap-2 p-4">
        {tag && <span className="self-start bg-brand px-2 py-1 text-xs font-medium">{tag}</span>}
        <p className="text-lg leading-tight font-bold tracking-display">{title}</p>
        <p className="flex items-end gap-1.5">
          <span className="text-3xl font-bold tracking-display text-brand">
            ₱<CountUp value={price} duration={900} />
          </span>
          {unit && <span className="pb-1 text-sm text-mist">{unit}</span>}
        </p>
        <p className="text-sm text-mist">{line}</p>
        <div className="mt-2 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={added}
            onClick={(e) => {
              setAdded(true);
              onAdd(e.currentTarget);
            }}
            className={btn}
          >
            {added ? addedLabel : addLabel}
          </button>
          <Link href={href} className={ghost}>
            {detailsLabel}
          </Link>
        </div>
      </div>
    </ChamferCard>
  );
}

/** All memberships in one compact list, each with its own add button. */
export function MembershipList({ items, addLabel, addedLabel, onAdd }: { items: Membership[]; addLabel: string; addedLabel: string; onAdd: (m: Membership, el: HTMLElement) => void }) {
  const [added, setAdded] = useState<string[]>([]);
  return (
    <ChamferCard size="sm" hover={false} className="motion-safe:animate-card-wipe">
      <ul className="divide-y divide-white/10 px-4 py-2">
        {items.map((m) => (
          <li key={m.slug} className="flex items-center justify-between gap-3 py-2.5">
            <div className="min-w-0">
              <p className="text-sm font-medium">{m.title}</p>
              <p className="text-sm">
                <span className="font-bold text-brand">{peso(m.price)}</span>
                <span className="text-mist"> {m.unit}</span>
                {m.savings && <span className="text-steel"> · {m.savings}</span>}
              </p>
            </div>
            <button
              type="button"
              disabled={added.includes(m.slug)}
              onClick={(e) => {
                setAdded((a) => [...a, m.slug]);
                onAdd(m, e.currentTarget);
              }}
              className={`${btn} shrink-0`}
            >
              {added.includes(m.slug) ? addedLabel : addLabel}
            </button>
          </li>
        ))}
      </ul>
    </ChamferCard>
  );
}

/** Product with an option picker (flavor, size, color) and add to cart. */
export function ProductOffer({ product, addLabel, addedLabel, detailsLabel, onAdd }: { product: Product; addLabel: string; addedLabel: string; detailsLabel: string; onAdd: (option: string | undefined, el: HTMLElement) => void }) {
  const [option, setOption] = useState(product.options?.values[0]);
  const [added, setAdded] = useState(false);
  return (
    <ChamferCard size="sm" hover={false} className="motion-safe:animate-card-wipe">
      <div className="flex gap-3 p-3">
        <ProductArt kind={product.art} color={product.color} className="size-20 shrink-0" />
        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="text-sm leading-tight font-bold">{product.name}</p>
          <p className="text-lg font-bold text-brand">{peso(product.price)}</p>
          {product.options && (
            <div className="flex flex-wrap gap-1.5" role="radiogroup" aria-label={product.options.label}>
              {product.options.values.map((v) => (
                <button
                  key={v}
                  type="button"
                  role="radio"
                  aria-checked={option === v}
                  onClick={() => setOption(v)}
                  className={`border px-2 py-1 text-xs transition-colors ${option === v ? "border-brand bg-brand" : "border-white/30 hover:border-white"}`}
                >
                  {v}
                </button>
              ))}
            </div>
          )}
          <div className="mt-1 flex flex-wrap gap-2">
            <button
              type="button"
              disabled={added}
              onClick={(e) => {
                setAdded(true);
                onAdd(option, e.currentTarget);
              }}
              className={btn}
            >
              {added ? addedLabel : addLabel}
            </button>
            <Link href={`/shop/${product.slug}`} className={ghost}>
              {detailsLabel}
            </Link>
          </div>
        </div>
      </div>
    </ChamferCard>
  );
}

export function CoachMini({ coach, profileLabel, bookLabel, onBook }: { coach: Coach; profileLabel: string; bookLabel: string; onBook: () => void }) {
  return (
    <ChamferCard size="sm" hover={false} className="motion-safe:animate-card-wipe">
      <div className="flex gap-3 p-3">
        <Image src={coach.image} alt="" width={112} height={112} className="size-14 shrink-0 rounded-full object-cover" />
        <div className="flex min-w-0 flex-col gap-1">
          <p className="text-sm font-bold">{coach.name}</p>
          <p className="text-xs text-mist">{coach.role}</p>
          <div className="mt-1.5 flex flex-wrap gap-2">
            <button type="button" onClick={onBook} className={btn}>
              {bookLabel}
            </button>
            <Link href={`/coaches/${coach.slug}`} className={ghost}>
              {profileLabel}
            </Link>
          </div>
        </div>
      </div>
    </ChamferCard>
  );
}
