import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CatalogClient } from "@/components/catalog-client";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Trgovina — namještaj od masivnog drveta",
  description:
    "Pregledajte stolove, stolice, klupe i kutne klupe od masivnog drveta. Filtrirajte po kategoriji, vrsti drveta i cijeni. Dostava u cijeloj Hrvatskoj.",
};

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ kategorija?: string }>;
}) {
  const sp = await searchParams;
  const initialCategory = typeof sp.kategorija === "string" ? sp.kategorija : undefined;

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-10 md:py-14">
        <nav aria-label="Putanja" className="mb-4 text-xs text-muted">
          <a href="/" className="hover:text-ink">
            Početna
          </a>{" "}
          / <span className="text-ink">Trgovina</span>
        </nav>
        <header className="mb-8 max-w-2xl">
          <h1 className="text-[clamp(28px,6vw,42px)]">Trgovina</h1>
          <p className="mt-2 font-light text-inksoft">
            Masivni hrast, dimljeni hrast i orah — stolovi, stolice, klupe i kutne klupe s
            prirodnom uljenom obradom. Cijene su orijentacijske; konačna cijena ovisi o odabranoj
            dimenziji i obradi.
          </p>
        </header>
        <CatalogClient products={products} initialCategory={initialCategory} />
      </main>
      <SiteFooter />
    </>
  );
}
