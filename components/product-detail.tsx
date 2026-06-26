"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { ProductCard } from "@/components/product-card";
import { formatEur, type Product, type VariantOption } from "@/lib/products";

export function ProductDetail({ product: p, related }: { product: Product; related: Product[] }) {
  const [activeImg, setActiveImg] = useState(0);
  const [wood, setWood] = useState(p.woodOptions[0]?.label ?? "");
  const [finish, setFinish] = useState(p.finishOptions[0]?.label ?? "");
  const [size, setSize] = useState(p.sizeOptions[0]?.label ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const delta = (opts: VariantOption[], label: string) =>
    opts.find((o) => o.label === label)?.delta ?? 0;

  const unitPrice = useMemo(() => {
    return (
      p.basePrice +
      delta(p.woodOptions, wood) +
      delta(p.finishOptions, finish) +
      delta(p.sizeOptions, size)
    );
  }, [p, wood, finish, size]);

  const showWood = p.woodOptions.length > 1;
  const showFinish = p.finishOptions.length > 1;
  const showSize = p.sizeOptions.length > 0;

  return (
    <>
      <div className="grid gap-8 md:grid-cols-2 md:gap-12">
        {/* Galerija */}
        <div>
          <div className="relative aspect-square overflow-hidden rounded-sm bg-sand">
            {p.badge && (
              <span className="absolute left-3 top-3 z-10 rounded-sm bg-ink px-2.5 py-1 text-[10.5px] font-medium uppercase tracking-[0.08em] text-white">
                {p.badge}
              </span>
            )}
            <Image
              src={p.images[activeImg]}
              alt={p.name}
              fill
              priority
              sizes="(max-width:768px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          {p.images.length > 1 && (
            <div className="mt-3 flex gap-3">
              {p.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  aria-label={`Slika ${i + 1}`}
                  className={`relative aspect-square w-20 overflow-hidden rounded-sm border ${
                    i === activeImg ? "border-ink" : "border-line"
                  }`}
                >
                  <Image src={img} alt="" fill sizes="80px" className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info + varijante */}
        <div>
          <span className="text-[11px] uppercase tracking-[0.16em] text-muted">
            Kolekcija {p.collection}
          </span>
          <h1 className="mt-1 text-[clamp(26px,5vw,38px)]">{p.name}</h1>

          <div className="mt-3 flex items-baseline gap-3">
            <span className="text-2xl font-semibold">{formatEur(unitPrice)}</span>
            {p.oldPrice && (
              <span className="text-base text-muted line-through">{formatEur(p.oldPrice)}</span>
            )}
          </div>
          <div className="mt-1 flex items-center gap-3 text-sm text-inksoft">
            <span
              className={`inline-flex items-center gap-1.5 ${
                p.availability === "Na zalihi" ? "text-forest" : "text-wood"
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-current" />
              {p.availability}
            </span>
            <span className="text-muted">· Rok isporuke: {p.deliveryTime}</span>
          </div>

          <p className="mt-5 font-light text-inksoft">{p.shortDescription}</p>

          {/* Varijante */}
          <div className="mt-6 space-y-4">
            {showWood && (
              <Selector label="Vrsta drveta" value={wood} onChange={setWood} options={p.woodOptions} base={p.basePrice} />
            )}
            {showFinish && (
              <Selector label="Završna obrada / boja" value={finish} onChange={setFinish} options={p.finishOptions} base={p.basePrice} />
            )}
            {showSize && (
              <Selector label="Dimenzije" value={size} onChange={setSize} options={p.sizeOptions} base={p.basePrice} />
            )}
          </div>

          {/* Količina + košarica */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-sm border border-line">
              <button
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                aria-label="Smanji količinu"
                className="px-3.5 py-2.5 text-lg leading-none hover:bg-cream2"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{qty}</span>
              <button
                onClick={() => setQty((q) => q + 1)}
                aria-label="Povećaj količinu"
                className="px-3.5 py-2.5 text-lg leading-none hover:bg-cream2"
              >
                +
              </button>
            </div>
            <button
              onClick={() => setAdded(true)}
              className="flex-1 rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
            >
              Dodaj u košaricu — {formatEur(unitPrice * qty)}
            </button>
          </div>
          {added && (
            <p className="mt-3 rounded-sm bg-cream2 px-4 py-3 text-sm text-inksoft">
              Košarica i naplata dolaze u sljedećoj fazi izrade. Za upit ili narudžbu javite se na{" "}
              <span className="font-medium text-ink">info@masiva.hr</span>.
            </p>
          )}

          {/* Brze prednosti */}
          <ul className="mt-6 space-y-2 border-t border-line pt-5 text-sm text-inksoft">
            <li>✓ Masivno drvo, uljena obrada</li>
            <li>✓ Dostava na adresu u cijeloj Hrvatskoj</li>
            <li>✓ {p.warranty}</li>
          </ul>
        </div>
      </div>

      {/* Detalji */}
      <div className="mt-14 grid gap-10 md:grid-cols-2">
        <Section title="Opis">
          <p className="font-light text-inksoft">{p.description}</p>
        </Section>
        <Section title="Specifikacije">
          <dl className="divide-y divide-line text-sm">
            {p.specs.map((s, i) => (
              <div key={i} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted">{s.label}</dt>
                <dd className="text-right text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Section>
        <Section title="Materijali">
          <p className="font-light text-inksoft">{p.material}</p>
        </Section>
        <Section title="Održavanje">
          <p className="font-light text-inksoft">{p.care}</p>
        </Section>
        <Section title="Dostava i rok isporuke">
          <p className="font-light text-inksoft">
            Procijenjeni rok izrade i isporuke: {p.deliveryTime}. Veće komade dostavljamo na adresu uz
            mogućnost unosa u prostor po dogovoru.
          </p>
        </Section>
        <Section title="Jamstvo">
          <p className="font-light text-inksoft">{p.warranty}</p>
        </Section>
      </div>

      {/* FAQ */}
      <div className="mt-14">
        <h2 className="mb-5 text-2xl">Često postavljana pitanja</h2>
        <div className="divide-y divide-line border-y border-line">
          {p.faq.map((f, i) => (
            <div key={i}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                aria-expanded={openFaq === i}
                className="flex w-full items-center justify-between gap-4 py-4 text-left"
              >
                <span className="font-medium">{f.q}</span>
                <span className="text-xl leading-none text-muted">{openFaq === i ? "−" : "+"}</span>
              </button>
              {openFaq === i && <p className="pb-4 font-light text-inksoft">{f.a}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Slični proizvodi */}
      {related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 text-2xl">Slični proizvodi</h2>
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 md:grid-cols-3 md:gap-6">
            {related.map((r) => (
              <ProductCard key={r.id} product={r} />
            ))}
          </div>
        </div>
      )}

      {/* Sticky mobilni CTA */}
      <div className="fixed inset-x-0 bottom-0 z-40 flex items-center justify-between gap-3 border-t border-line bg-cream px-4 py-3 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] md:hidden">
        <div className="text-sm font-semibold">{formatEur(unitPrice * qty)}</div>
        <button
          onClick={() => setAdded(true)}
          className="flex-1 rounded-sm bg-ink py-3 text-center text-sm font-medium text-cream"
        >
          Dodaj u košaricu
        </button>
      </div>
      <div className="h-16 md:hidden" />
    </>
  );
}

function Selector({
  label,
  value,
  onChange,
  options,
  base,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: VariantOption[];
  base: number;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.1em] text-ink">
        {label}
      </span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-sm border border-line bg-white px-3 py-2.5 text-sm"
      >
        {options.map((o) => (
          <option key={o.label} value={o.label}>
            {o.label}
            {o.delta > 0 ? ` (+${formatEur(o.delta)})` : o.delta < 0 ? ` (−${formatEur(-o.delta)})` : ""}
          </option>
        ))}
      </select>
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 text-xl">{title}</h2>
      {children}
    </section>
  );
}
