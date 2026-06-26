import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  title: "Politika privatnosti",
  description: "Politika privatnosti Masiva webshopa.",
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[760px] px-5 py-12 md:py-16">
        <h1 className="text-[clamp(28px,6vw,40px)]">Politika privatnosti</h1>
        <div className="mt-3 rounded-sm bg-cream2 px-4 py-3 text-sm text-muted">
          Placeholder sadržaj — vlasnik trgovine popunjava stvarnim podacima (voditelj obrade,
          kontakt, svrhe obrade) prije objave. Ovo nije pravno verificiran dokument.
        </div>
        <div className="mt-8 space-y-6 font-light text-inksoft">
          <section>
            <h2 className="text-xl font-normal text-ink">1. Voditelj obrade</h2>
            <p className="mt-2">[Naziv tvrtke, adresa, OIB, kontakt e-mail.]</p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">2. Koje podatke prikupljamo</h2>
            <p className="mt-2">
              Podatke koje unesete pri narudžbi (ime, adresa, e-mail, telefon) koristimo isključivo za
              obradu i isporuku narudžbe te komunikaciju s vama.
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">3. Pravna osnova i čuvanje</h2>
            <p className="mt-2">
              Podatke obrađujemo radi izvršenja ugovora i ispunjenja zakonskih obveza. [Popuniti
              razdoblja čuvanja.]
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">4. Vaša prava</h2>
            <p className="mt-2">
              Imate pravo na pristup, ispravak i brisanje podataka te prigovor u skladu s GDPR-om.
              Zahtjev šaljete na [kontakt e-mail].
            </p>
          </section>
          <section>
            <h2 className="text-xl font-normal text-ink">5. Kolačići</h2>
            <p className="mt-2">Webshop koristi nužne kolačiće za rad košarice. [Popuniti detalje.]</p>
          </section>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
