"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatEur, hasVariants, type Product, type Badge } from "@/lib/products";

function badgeClass(badge: Badge): string {
  switch (badge) {
    case "Akcija":
      return "bg-sale";
    case "Novo":
      return "bg-forest";
    case "Po narudžbi":
      return "bg-wood";
    default:
      return "bg-ink";
  }
}

function defaultVariants(p: Product): string[] {
  const v: string[] = [];
  if (p.woodOptions.length) v.push(p.woodOptions[0].label);
  if (p.finishOptions.length) v.push(p.finishOptions[0].label);
  if (p.sizeOptions.length) v.push(p.sizeOptions[0].label);
  return v;
}

export function ProductCard({ product: p }: { product: Product }) {
  const href = `/proizvod/${p.slug}`;
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  function quickAdd() {
    add({
      slug: p.slug,
      name: p.name,
      image: p.images[0],
      variants: defaultVariants(p),
      unitPrice: p.basePrice,
      qty: 1,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1800);
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-sm border border-line bg-white transition hover:-translate-y-1 hover:shadow-[0_14px_36px_rgba(60,45,25,0.10)]">
      <Link href={href} className="relative block aspect-square overflow-hidden bg-sand">
        {p.badge && (
          <span
            className={`absolute left-2.5 top-2.5 z-10 rounded-sm px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-white ${badgeClass(
              p.badge,
            )}`}
          >
            {p.badge}
          </span>
        )}
        <Image
          src={p.images[0]}
          alt={p.name}
          fill
          sizes="(max-width:768px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-3.5">
        <span className="text-[11px] uppercase tracking-[0.14em] text-muted">
          Kolekcija {p.collection}
        </span>
        <h3 className="mb-1 mt-0.5 text-lg font-semibold">
          <Link href={href} className="transition hover:text-wooddeep">
            {p.name}
          </Link>
        </h3>
        <p className="mb-3 flex-1 text-[12.5px] font-light text-inksoft">{p.shortDescription}</p>
        <div className="mb-3 flex items-baseline gap-2">
          <span className="text-[17px] font-semibold">
            {hasVariants(p) ? "od " : ""}
            {formatEur(p.basePrice)}
          </span>
          {p.oldPrice && (
            <span className="text-[13px] text-muted line-through">{formatEur(p.oldPrice)}</span>
          )}
        </div>
        <button
          onClick={quickAdd}
          className="w-full rounded-sm border border-ink bg-cream py-2.5 text-center text-[13px] font-medium tracking-wide transition hover:bg-ink hover:text-cream"
        >
          {added ? "Dodano ✓" : "Dodaj u košaricu"}
        </button>
        <Link
          href={href}
          className="mt-2 text-center text-[12px] text-muted underline-offset-2 transition hover:text-ink hover:underline"
        >
          Pogledaj proizvod
        </Link>
      </div>
    </article>
  );
}
