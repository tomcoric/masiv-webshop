"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  key: string; // slug + varijante (jedinstvena konfiguracija)
  slug: string;
  name: string;
  image: string;
  variants: string[];
  unitPrice: number;
  qty: number;
}

export interface AddInput {
  slug: string;
  name: string;
  image: string;
  variants: string[];
  unitPrice: number;
  qty?: number;
}

interface CartContextValue {
  items: CartItem[];
  add: (input: AddInput) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  count: number;
  subtotal: number;
  ready: boolean;
}

const STORAGE_KEY = "masiva_cart_v1";

const CartContext = createContext<CartContextValue | null>(null);

function makeKey(slug: string, variants: string[]): string {
  return [slug, ...variants].join("|");
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [ready, setReady] = useState(false);

  // Učitaj iz localStorage na klijentu
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {
      // ignoriraj nevažeći sadržaj
    }
    setReady(true);
  }, []);

  // Spremi pri svakoj promjeni (nakon inicijalnog učitavanja)
  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      // ignoriraj
    }
  }, [items, ready]);

  function add(input: AddInput) {
    const key = makeKey(input.slug, input.variants);
    const qty = input.qty ?? 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          slug: input.slug,
          name: input.name,
          image: input.image,
          variants: input.variants,
          unitPrice: input.unitPrice,
          qty,
        },
      ];
    });
  }

  function remove(key: string) {
    setItems((prev) => prev.filter((i) => i.key !== key));
  }

  function setQty(key: string, qty: number) {
    setItems((prev) =>
      prev.map((i) => (i.key === key ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  }

  function clear() {
    setItems([]);
  }

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.unitPrice * i.qty, 0), [items]);

  const value: CartContextValue = { items, add, remove, setQty, clear, count, subtotal, ready };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart se mora koristiti unutar <CartProvider>");
  return ctx;
}
