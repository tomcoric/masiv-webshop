import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { Checkout } from "@/components/checkout";

export const metadata: Metadata = {
  title: "Blagajna",
  description: "Dovršite narudžbu — podaci, dostava i plaćanje.",
};

export default function CheckoutPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-10 md:py-14">
        <nav aria-label="Putanja" className="mb-4 text-xs text-muted">
          <a href="/" className="hover:text-ink">
            Početna
          </a>{" "}
          /{" "}
          <a href="/kosarica" className="hover:text-ink">
            Košarica
          </a>{" "}
          / <span className="text-ink">Blagajna</span>
        </nav>
        <h1 className="mb-8 text-[clamp(28px,6vw,42px)]">Blagajna</h1>
        <Checkout />
      </main>
      <SiteFooter />
    </>
  );
}
