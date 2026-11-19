"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItemKind = "product" | "program" | "class" | "membership";

export type CartItem = {
  /** Unique per product + option, e.g. "whey-protein:Chocolate". */
  id: string;
  slug: string;
  kind: CartItemKind;
  name: string;
  detail?: string;
  price: number;
  qty: number;
  href: string;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  ready: boolean;
  lastAdded: CartItem | null;
  add: (item: Omit<CartItem, "qty">, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  dismissToast: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "hm-cart";

// Browser storage can be unavailable (private mode, blocked cookies), so every access is guarded.
function load(): CartItem[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

function save(items: CartItem[]) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch {
    /* ignore */
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);
  const [lastAdded, setLastAdded] = useState<CartItem | null>(null);

  useEffect(() => {
    setItems(load());
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) save(items);
  }, [items, ready]);

  useEffect(() => {
    if (!lastAdded) return;
    const t = setTimeout(() => setLastAdded(null), 4000);
    return () => clearTimeout(t);
  }, [lastAdded]);

  const add = useCallback<CartContextValue["add"]>((item, qty = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      // Memberships, programs and classes are one-per-order.
      const single = item.kind !== "product";
      if (existing) {
        return prev.map((i) => (i.id === item.id ? { ...i, qty: single ? 1 : Math.min(i.qty + qty, 20) } : i));
      }
      return [...prev, { ...item, qty: single ? 1 : qty }];
    });
    setLastAdded({ ...item, qty });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setItems((prev) => (qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty: Math.min(qty, 20) } : i))));
  }, []);

  const remove = useCallback((id: string) => setItems((prev) => prev.filter((i) => i.id !== id)), []);
  const clear = useCallback(() => setItems([]), []);
  const dismissToast = useCallback(() => setLastAdded(null), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      ready,
      lastAdded,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.price * i.qty, 0),
      add,
      setQty,
      remove,
      clear,
      dismissToast,
    }),
    [items, ready, lastAdded, add, setQty, remove, clear, dismissToast],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
