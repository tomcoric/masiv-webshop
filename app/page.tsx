import Image from "next/image";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/products";

const CATEGORY_TILES = [
  {
    name: "Stolovi",
    href: "/trgovina?kategorija=Stolovi",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/05/Cardiff_Eiche_Hell_Tisch250x110_Stuhl_Paris_002.jpg",
    alt: "Blagovaonski stolovi od masivnog drveta",
  },
  {
    name: "Stolice",
    href: "/trgovina?kategorija=Stolice",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/06/Cardiff_Nussbaum_Tisch200x100_Sessel_NewYork_Leder_Creme_002.jpg",
    alt: "Drvene i tapecirane stolice",
  },
  {
    name: "Klupe",
    href: "/trgovina?kategorija=Klupe",
    image: "https://www.gutekunst.de/wp-content/uploads/2023/10/gutekunst2023_10_005-scaled.jpg",
    alt: "Masivne drvene klupe",
  },
  {
    name: "Kutne klupe",
    href: "/trgovina?kategorija=Kutne klupe",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/12/16895_21_Eckbankgruppe-scaled.jpg",
    alt: "Kutne klupe za blagovaonu i kuhinju",
  },
];

const VALUES = [
  ["Masivno drvo", "Bez furnira i iverice — pravi masiv hrasta i oraha, uljene površine ugodne na dodir."],
  ["Kvalitetna izrada", "Provjereni stolarski spojevi i strogi standardi kvalitete u svakom komadu."],
  ["Dugotrajnost", "Namještaj koji se prenosi s generacije na generaciju, ne mijenja se svake sezone."],
  ["Standardne veličine", "Provjerene dimenzije koje odgovaraju većini prostora — odaberete ih kroz jednostavan izbornik."],
  ["Dostava na adresu", "Sigurna dostava velikih komada u cijeloj Hrvatskoj, uz unos u prostor."],
  ["Procijenjeni rok izrade", "Jasan rok isporuke za svaki komad — bez skrivenih iznenađenja."],
];

const STEPS = [
  ["Odabir drva", "Biramo masivni hrast i orah provjerenog porijekla."],
  ["Obrada", "Drvo se suši i priprema uz strogu kontrolu kvalitete."],
  ["Ručna izrada", "Spojevi i detalji dovršeni iskusnom rukom majstora."],
  ["Završna obrada", "Prirodno ulje koje ističe teksturu i štiti površinu."],
  ["Dostava", "Sigurna dostava i unos u vaš prostor po dogovoru."],
];

const REVIEWS = [
  ["„Stol je još ljepši uživo. Masiv se osjeti čim ga dotakneš.”", "Ivana M.", "Zagreb"],
  ["„Odabrali smo veću dimenziju stola i stigao je točno na vrijeme.”", "Marko P.", "Split"],
  ["„Dostava i unos u stan bez ijedne ogrebotine. Preporuka.”", "Petra K.", "Rijeka"],
];

export default function HomePage() {
  const featured = [...products]
    .sort((a, b) => (a.bestsellerRank ?? 99) - (b.bestsellerRank ?? 99))
    .slice(0, 6);

  return (
    <>
      <SiteHeader />

      <div className="bg-ink px-4 py-2.5 text-center text-[12.5px] tracking-wide text-cream">
        Besplatna dostava na adresu za narudžbe iznad <strong className="font-semibold">900&nbsp;€</strong>
        &nbsp;·&nbsp; Masivni hrast i orah
      </div>

      <main>
        {/* HERO */}
        <section className="relative flex min-h-[86vh] items-end">
          <Image
            src="https://www.gutekunst.de/wp-content/uploads/2023/10/gutekunst2023_10_001-scaled.jpg"
            alt="Blagovaona s masivnim drvenim stolom"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/60" />
          <div className="relative mx-auto w-full max-w-[1240px] px-5 pb-14">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-white/85">
              Masivno drvo · Schwarzwald kvaliteta
            </span>
            <h1 className="mt-3 max-w-2xl text-[clamp(38px,9vw,68px)] font-semibold text-white drop-shadow">
              Namještaj koji ostaje generacijama.
            </h1>
            <p className="mb-7 mt-4 max-w-lg text-[clamp(15px,4vw,18px)] font-light text-white/90">
              Ručno odabran masiv, prirodni materijali i dizajn stvoren za stvaran dom.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <Link
                href="/trgovina"
                className="inline-flex items-center rounded-sm border border-white bg-white px-6 py-3.5 text-sm font-medium text-ink transition hover:bg-transparent hover:text-white"
              >
                Pogledaj kolekciju
              </Link>
              <Link
                href="#kategorije"
                className="inline-flex items-center rounded-sm border border-white px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
              >
                Istraži kolekcije
              </Link>
            </div>
          </div>
        </section>

        {/* KATEGORIJE */}
        <section id="kategorije" className="py-16 md:py-22">
          <div className="mx-auto max-w-[1240px] px-5">
            <SectionHead
              eyebrow="Kategorije"
              title="Blagovaona od masivnog drveta"
              text="Stolovi, stolice, klupe i kutne klupe iz pažljivo biranih kolekcija — hrast, dimljeni hrast i orah, sve s prirodnom uljenom obradom."
            />
            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
              {CATEGORY_TILES.map((c) => (
                <Link
                  key={c.name}
                  href={c.href}
                  className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-sand"
                >
                  <Image
                    src={c.image}
                    alt={c.alt}
                    fill
                    sizes="(max-width:768px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-4 text-white">
                    <h3 className="text-xl text-white">{c.name}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ZAŠTO MASIVA */}
        <section className="bg-cream2 py-16 md:py-22">
          <div className="mx-auto max-w-[1240px] px-5">
            <SectionHead eyebrow="Zašto Masiva" title="Stvoreno da traje" />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10">
              {VALUES.map(([h, p], i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 flex-none items-center justify-center rounded-full border border-wood text-wood">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-xl">{h}</h4>
                    <p className="text-sm font-light text-inksoft">{p}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* PROIZVODI */}
        <section id="proizvodi" className="py-16 md:py-22">
          <div className="mx-auto max-w-[1240px] px-5">
            <SectionHead
              eyebrow="Najprodavanije"
              title="Izdvojeno iz kolekcija"
              text="Orijentacijske cijene — konačna cijena ovisi o odabranoj dimenziji i obradi."
            />
            <div className="grid grid-cols-2 gap-x-3.5 gap-y-5 md:grid-cols-3 md:gap-6">
              {featured.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
            <div className="mt-9 text-center">
              <Link
                href="/trgovina"
                className="inline-flex items-center rounded-sm border border-ink px-6 py-3.5 text-sm font-medium transition hover:bg-ink hover:text-cream"
              >
                Pogledaj cijeli katalog
              </Link>
            </div>
          </div>
        </section>

        {/* LIFESTYLE */}
        <section className="py-16 md:py-22">
          <div className="mx-auto max-w-[1240px] px-5">
            <div className="grid overflow-hidden rounded-sm bg-ink text-cream md:grid-cols-2">
              <div className="relative min-h-[280px]">
                <Image
                  src="https://www.gutekunst.de/wp-content/uploads/2025/12/Gutekunst_Milieu2_neu-scaled.jpeg"
                  alt="Uređen dom s masivnim drvenim namještajem"
                  fill
                  sizes="(max-width:768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-7 md:p-12">
                <span className="text-xs font-medium uppercase tracking-[0.22em] text-sand">
                  Izrađeno za vaš dom
                </span>
                <h2 className="mt-2 text-[clamp(26px,6vw,38px)] text-cream">Toplina drveta u srcu doma</h2>
                <p className="mb-6 mt-4 font-light text-cream/80">
                  Stol za kojim se okuplja obitelj, klupa koja prati svaki blagdan. Masiva donosi
                  prirodu u dom — komade koji s vremenom postaju ljepši.
                </p>
                <Link
                  href="/trgovina"
                  className="inline-flex w-fit items-center rounded-sm border border-white px-6 py-3.5 text-sm font-medium text-white transition hover:bg-white hover:text-ink"
                >
                  Istraži kolekcije
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* PROCES */}
        <section id="proces" className="bg-cream2 py-16 md:py-22">
          <div className="mx-auto max-w-[1240px] px-5">
            <SectionHead eyebrow="Proces izrade" title="Od stabla do vašeg doma" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
              {STEPS.map(([h, p], i) => (
                <div key={i} className="rounded-sm border border-line bg-white p-6">
                  <div className="mb-1.5 font-serif text-3xl font-bold text-sand">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <h4 className="mb-1 text-xl">{h}</h4>
                  <p className="text-[13.5px] font-light text-inksoft">{p}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RECENZIJE */}
        <section className="py-16 md:py-22">
          <div className="mx-auto max-w-[1240px] px-5">
            <SectionHead
              eyebrow="Povjerenje kupaca"
              title="Što kažu naši kupci"
              text="Prikazane recenzije su primjeri za prototip i zamijenit će se stvarnim recenzijama kupaca."
            />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {REVIEWS.map(([quote, who, city], i) => (
                <div key={i} className="rounded-sm border border-line bg-white p-6">
                  <div className="mb-2.5 tracking-[3px] text-wood">★★★★★</div>
                  <p className="mb-3.5 font-light italic text-inksoft">{quote}</p>
                  <div className="text-[13px] font-semibold">
                    {who} <span className="font-normal text-muted">· {city}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="bg-cream2 py-16 text-center md:py-22">
          <div className="mx-auto max-w-xl px-5">
            <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">
              Ostanite u kontaktu
            </span>
            <h2 className="mt-2 text-[clamp(28px,6vw,42px)]">Inspiracija za dom</h2>
            <p className="mt-3 font-light text-inksoft">
              Novi komadi, akcije i savjeti za njegu masivnog drveta — povremeno, bez spama.
            </p>
            <form className="mx-auto mt-5 flex max-w-md flex-wrap gap-2.5">
              <input
                type="email"
                placeholder="Vaša e-mail adresa"
                aria-label="E-mail"
                className="min-w-[200px] flex-1 rounded-sm border border-line bg-white px-4 py-3.5 text-sm"
              />
              <button
                type="submit"
                className="rounded-sm border border-ink bg-ink px-6 py-3.5 text-sm font-medium text-cream transition hover:bg-wooddeep"
              >
                Pretplati se
              </button>
            </form>
          </div>
        </section>
      </main>

      <SiteFooter />
    </>
  );
}

function SectionHead({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="text-xs font-medium uppercase tracking-[0.22em] text-muted">{eyebrow}</span>
      <h2 className="mt-2.5 text-[clamp(28px,6vw,42px)]">{title}</h2>
      {text && <p className="mt-3 font-light text-inksoft">{text}</p>}
    </div>
  );
}
