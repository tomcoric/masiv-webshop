"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import {
  CATEGORIES,
  WOOD_TYPES,
  AVAILABILITIES,
  priceBounds,
  formatEur,
  type Product,
  type Category,
} from "@/lib/products";

type Sort = "preporuceno" | "najnovije" | "cijena-asc" | "cijena-desc" | "najprodavanije";

const SORT_LABELS: Record<Sort, string> = {
  preporuceno: "Preporučeno",
  najnovije: "Najnovije",
  "cijena-asc": "Cijena: niža → viša",
  "cijena-desc": "Cijena: viša → niža",
  najprodavanije: "Najprodavanije",
};

export function CatalogClient({
  products,
  initialCategory,
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const bounds = priceBounds();
  const validInitial =
    initialCategory && (CATEGORIES as string[]).includes(initialCategory) ? [initialCategory] : [];

  const [search, setSearch] = useState("");
  const [cats, setCats] = useState<string[]>(validInitial);
  const [woods, setWoods] = useState<string[]>([]);
  const [avails, setAvails] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(bounds.max);
  const [sort, setSort] = useState<Sort>("preporuceno");
  const [filtersOpen, setFiltersOpen] = useState(false);

  function toggle(list: string[], setList: (v: string[]) => void, value: string) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  const filtered = useMemo(() => {
    let r = products.filter((p) => {
      if (cats.length && !cats.includes(p.category)) return false;
      if (woods.length && !woods.includes(p.woodType)) return false;
      if (avails.length && !avails.includes(p.availability)) return false;
      if (p.basePrice > maxPrice) return false;
      if (search.trim()) {
        const q = search.toLowerCase();
        const hay = `${p.name} ${p.collection} ${p.shortDescription}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    switch (sort) {
      case "najnovije":
        r = [...r].sort((a, b) => b.newnessOrder - a.newnessOrder);
        break;
      case "cijena-asc":
        r = [...r].sort((a, b) => a.basePrice - b.basePrice);
        break;
      case "cijena-desc":
        r = [...r].sort((a, b) => b.basePrice - a.basePrice);
        break;
      case "najprodavanije":
        r = [...r].sort((a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99));
        break;
      default:
        break;
    }
    return r;
  }, [products, cats, woods, avails, maxPrice, search, sort]);

  const activeCount = cats.length + woods.length + avails.length + (maxPrice < bounds.max ? 1 : 0);

  function reset() {
    setCats([]);
    setWoods([]);
    setAvails([]);
    setMaxPrice(bounds.max);
    setSearch("");
  }

  const filters = (
    <div className="space-y-7">
      <FilterGroup title="Kategorija">
        {CATEGORIES.map((c) => (
          <Check key={c} label={c} checked={cats.includes(c)} onChange={() => toggle(cats, setCats, c)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Vrsta drveta">
        {WOOD_TYPES.map((w) => (
          <Check key={w} label={w} checked={woods.includes(w)} onChange={() => toggle(woods, setWoods, w)} />
        ))}
      </FilterGroup>
      <FilterGroup title="Dostupnost">
        {AVAILABILITIES.map((a) => (
          <Check
            key={a}
            label={a}
            checked={avails.includes(a)}
            onChange={() => toggle(avails, setAvails, a)}
          />
        ))}
      </FilterGroup>
      <FilterGroup title="Cijena">
        <div className="px-1">
          <input
            type="range"
            min={bounds.min}
            max={bounds.max}
            step={50}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            aria-label="Maksimalna cijena"
            className="w-full accent-wood"
          />
          <div className="mt-1 flex justify-between text-xs text-inksoft">
            <span>{formatEur(bounds.min)}</span>
            <span>do {formatEur(maxPrice)}</span>
          </div>
        </div>
      </FilterGroup>
      {activeCount > 0 && (
        <button onClick={reset} className="text-sm text-wood underline-offset-2 hover:underline">
          Poništi filtere ({activeCount})
        </button>
      )}
    </div>
  );

  return (
    <div className="grid gap-8 md:grid-cols-[260px_1fr]">
      {/* Desktop filteri */}
      <aside className="hidden md:block">{filters}</aside>

      <div>
        {/* Toolbar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFiltersOpen(true)}
              className="inline-flex items-center gap-2 rounded-sm border border-ink px-4 py-2 text-sm md:hidden"
            >
              Filteri{activeCount > 0 ? ` (${activeCount})` : ""}
            </button>
            <span className="text-sm text-muted">{filtered.length} proizvoda</span>
          </div>
          <label className="flex items-center gap-2 text-sm">
            <span className="text-muted">Sortiraj:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-sm border border-line bg-white px-3 py-2 text-sm"
            >
              {(Object.keys(SORT_LABELS) as Sort[]).map((s) => (
                <option key={s} value={s}>
                  {SORT_LABELS[s]}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Pretraga */}
        <input
          type="search"
          placeholder="Pretraži proizvode…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Pretraga proizvoda"
          className="mb-6 w-full rounded-sm border border-line bg-white px-4 py-3 text-sm"
        />

        {filtered.length === 0 ? (
          <div className="rounded-sm border border-line bg-white p-10 text-center">
            <p className="text-inksoft">Nema proizvoda za odabrane filtere.</p>
            <button onClick={reset} className="mt-3 text-sm text-wood hover:underline">
              Poništi filtere
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 lg:grid-cols-3 lg:gap-6">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobilni drawer filtera */}
      {filtersOpen && (
        <div className="fixed inset-0 z-[60] md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setFiltersOpen(false)} />
          <div className="absolute inset-y-0 left-0 flex w-[85%] max-w-sm flex-col bg-cream">
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <span className="font-serif text-xl">Filteri</span>
              <button onClick={() => setFiltersOpen(false)} aria-label="Zatvori" className="text-2xl leading-none">
                ×
              </button>
            </div>
            <div className="flex-1 overflow-y-auto px-5 py-5">{filters}</div>
            <div className="border-t border-line p-4">
              <button
                onClick={() => setFiltersOpen(false)}
                className="w-full rounded-sm bg-ink py-3 text-sm font-medium text-cream"
              >
                Prikaži {filtered.length} proizvoda
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function Check({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2.5 text-sm text-inksoft">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-wood" />
      {label}
    </label>
  );
}
