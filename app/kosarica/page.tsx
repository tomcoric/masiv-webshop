import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Košarica",
  description: "Vaša košarica — pregled odabranih proizvoda od masivnog drveta.",
};

export default function CartPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-10 md:py-14">
        <nav aria-label="Putanja" className="mb-4 text-xs text-muted">
          <a href="/" className="hover:text-ink">
            Početna
          </a>{" "}
          / <span className="text-ink">Košarica</span>
        </nav>
        <h1 className="mb-8 text-[clamp(28px,6vw,42px)]">Košarica</h1>
        <CartView />
      </main>
      <SiteFooter />
    </>
  );
}
