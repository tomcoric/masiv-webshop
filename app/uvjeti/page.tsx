import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Uvjeti kupnje",
  description: "Uvjeti kupnje u Masiva webshopu.",
};

export default function TermsPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[760px] px-5 py-12 md:py-16">
        <h1 className="text-[clamp(28px,6vw,40px)]">Uvjeti kupnje</h1>
        <div className="mt-3 rounded-sm bg-cream2 px-4 py-3 text-sm text-muted">
          Placeholder sadržaj — vlasnik trgovine popunjava stvarnim poslovnim podacima i pravno
          provjerenim tekstom prije objave. Ovo nije pravno verificiran dokument.
        </div>
        <div className="mt-8 space-y-6 font-light text-inksoft">
          <section>
            <h2 className="text-xl font-normal text-ink">1. Opće odredbe</h2>
            <p className="mt-2">
              Ovi uvjeti kupnje primjenjuju se na kupnju proizvoda putem webshopa Masiva. Prodavatelj
              je [naziv tvrtke, OIB, adresa].
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">2. Naručivanje i sklapanje ugovora</h2>
            <p className="mt-2">
              Narudžba se smatra zaprimljenom kada kupac dovrši postupak na blagajni. Ugovor se
              sklapa potvrdom narudžbe.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">3. Cijene i plaćanje</h2>
            <p className="mt-2">
              Sve cijene iskazane su u eurima (EUR) s uključenim PDV-om. Načini plaćanja navedeni su
              na blagajni.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">4. Dostava i rok isporuke</h2>
            <p className="mt-2">
              Rokovi isporuke navedeni su uz svaki proizvod. Uvjete dostave [popuniti] definira
              prodavatelj.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">5. Pravo na jednostrani raskid ugovora</h2>
            <p className="mt-2">
              Kupac ima pravo na raskid ugovora u skladu sa Zakonom o zaštiti potrošača. [Popuniti
              detalje i obrazac.]
            </p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
