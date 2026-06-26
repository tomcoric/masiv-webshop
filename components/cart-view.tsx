"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatEur } from "@/lib/products";

const FREE_SHIPPING_THRESHOLD = 900;

export function CartView() {
  const { items, remove, setQty, subtotal, ready } = useCart();
  const [promo, setPromo] = useState("");
  const [promoNote, setPromoNote] = useState("");

  if (!ready) {
    return <div className="py-20 text-center text-muted">Učitavanje košarice…</div>;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-line bg-white px-6 py-16 text-center">
        <h1 className="text-2xl">Vaša košarica je prazna</h1>
        <p className="mt-2 font-light text-inksoft">
          Istražite naše kolekcije od masivnog drveta i dodajte proizvode u košaricu.
        </p>
        <Link
          href="/trgovina"
          className="mt-6 inline-flex rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
        >
          Idi u trgovinu
        </Link>
      </div>
    );
  }

  const freeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      {/* Stavke */}
      <div className="divide-y divide-line border-y border-line">
        {items.map((it) => (
          <div key={it.key} className="flex gap-4 py-5">
            <Link
              href={`/proizvod/${it.slug}`}
              className="relative aspect-square w-24 flex-none overflow-hidden rounded-sm bg-sand sm:w-28"
            >
              <Image src={it.image} alt={it.name} fill sizes="112px" className="object-cover" />
            </Link>
            <div className="flex flex-1 flex-col">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">
                    <Link href={`/proizvod/${it.slug}`} className="hover:text-wooddeep">
                      {it.name}
                    </Link>
                  </h3>
                  {it.variants.length > 0 && (
                    <p className="mt-0.5 text-[12.5px] text-muted">{it.variants.join(" · ")}</p>
                  )}
                </div>
                <button
                  onClick={() => remove(it.key)}
                  aria-label="Ukloni proizvod"
                  className="text-sm text-muted transition hover:text-sale"
                >
                  Ukloni
                </button>
              </div>

              <div className="mt-auto flex items-center justify-between pt-3">
                <div className="flex items-center rounded-sm border border-line">
                  <button
                    onClick={() => setQty(it.key, it.qty - 1)}
                    aria-label="Smanji količinu"
                    className="px-3 py-1.5 text-base leading-none hover:bg-cream2"
                  >
                    −
                  </button>
                  <span className="w-9 text-center text-sm">{it.qty}</span>
                  <button
                    onClick={() => setQty(it.key, it.qty + 1)}
                    aria-label="Povećaj količinu"
                    className="px-3 py-1.5 text-base leading-none hover:bg-cream2"
                  >
                    +
                  </button>
                </div>
                <div className="text-right">
                  <div className="font-semibold">{formatEur(it.unitPrice * it.qty)}</div>
                  {it.qty > 1 && (
                    <div className="text-[12px] text-muted">{formatEur(it.unitPrice)} / kom</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Sažetak */}
      <aside className="h-fit rounded-sm border border-line bg-white p-6">
        <h2 className="text-xl">Sažetak narudžbe</h2>

        <div className="mt-4">
          <label className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink">
            Promo kod
          </label>
          <div className="flex gap-2">
            <input
              value={promo}
              onChange={(e) => setPromo(e.target.value)}
              placeholder="Unesite kod"
              className="min-w-0 flex-1 rounded-sm border border-line bg-cream px-3 py-2 text-sm"
            />
            <button
              onClick={() => setPromoNote("Promo kodovi će biti dostupni uskoro.")}
              className="rounded-sm border border-ink px-3 py-2 text-sm transition hover:bg-ink hover:text-cream"
            >
              Primijeni
            </button>
          </div>
          {promoNote && <p className="mt-1.5 text-[12px] text-muted">{promoNote}</p>}
        </div>

        <dl className="mt-5 space-y-2.5 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-inksoft">Međuzbroj</dt>
            <dd className="font-medium">{formatEur(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-inksoft">Dostava</dt>
            <dd className="text-right text-inksoft">
              {freeShipping ? "Besplatno" : "Izračun na blagajni"}
            </dd>
          </div>
          {!freeShipping && (
            <p className="text-[12px] text-muted">
              Besplatna dostava za narudžbe iznad {formatEur(FREE_SHIPPING_THRESHOLD)}.
            </p>
          )}
        </dl>

        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="text-base font-semibold">Ukupno</span>
          <span className="text-xl font-semibold">{formatEur(subtotal)}</span>
        </div>
        <p className="mt-1 text-[12px] text-muted">PDV uključen. Trošak dostave dodaje se na blagajni.</p>

        <Link
          href="/blagajna"
          className="mt-5 block w-full rounded-sm bg-ink py-3 text-center text-sm font-medium text-cream transition hover:bg-wooddeep"
        >
          Nastavi na blagajnu
        </Link>
        <Link
          href="/trgovina"
          className="mt-3 block text-center text-sm text-wood underline-offset-2 hover:underline"
        >
          Nastavi kupnju
        </Link>
      </aside>
    </div>
  );
}
