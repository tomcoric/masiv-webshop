// ── Demo katalog za prototip ──
// Slike su privremeno s dobavljača (Gutekunst). Cijene su orijentacijske.
// U fazi backenda ovo zamjenjuje Prisma + PostgreSQL.

export type Badge = "Najprodavanije" | "Akcija" | "Novo" | "Po narudžbi";
export type Category = "Stolovi" | "Stolice" | "Klupe" | "Kutne klupe";
export type Availability = "Na zalihi" | "Po narudžbi";

export interface VariantOption {
  label: string;
  delta: number; // doplata u EUR na osnovnu cijenu
}

export interface Spec {
  label: string;
  value: string;
}

export interface Faq {
  q: string;
  a: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: Category;
  woodType: string; // za filter: Hrast | Dimljeni hrast | Orah | Hrast + metal
  shortDescription: string;
  description: string;
  basePrice: number;
  oldPrice?: number;
  badge?: Badge;
  availability: Availability;
  deliveryTime: string;
  bestsellerRank?: number; // niže = prodavanije
  newnessOrder: number; // više = novije
  images: string[];
  woodOptions: VariantOption[];
  finishOptions: VariantOption[];
  sizeOptions: VariantOption[];
  specs: Spec[];
  material: string;
  care: string;
  warranty: string;
  faq: Faq[];
}

// ── Zajedničke skupine varijanti ──
const WOODS: VariantOption[] = [
  { label: "Hrast", delta: 0 },
  { label: "Dimljeni hrast", delta: 140 },
  { label: "Orah", delta: 320 },
];

const FINISHES: VariantOption[] = [
  { label: "Prirodno ulje", delta: 0 },
  { label: "Bijelo ulje", delta: 60 },
  { label: "Tamno ulje", delta: 60 },
];

const TABLE_SIZES: VariantOption[] = [
  { label: "180 × 100 cm", delta: 0 },
  { label: "200 × 100 cm", delta: 150 },
  { label: "220 × 110 cm", delta: 320 },
  { label: "250 × 110 cm", delta: 520 },
];

const COMMON_CARE =
  "Površinu redovito brišite mekom, blago navlaženom krpom. Povremeno obnovite zaštitu prirodnim uljem za drvo. Izbjegavajte dugotrajno izlaganje izravnom suncu i izvorima topline.";

const COMMON_WARRANTY = "2 godine jamstva na izradu i materijal.";

const COMMON_FAQ: Faq[] = [
  {
    q: "Je li ovo pravo masivno drvo?",
    a: "Da. Svi naši komadi izrađeni su od masivnog drveta, bez furnira i iverice.",
  },
  {
    q: "Mogu li dobiti uzorak boje/obrade?",
    a: "Možemo poslati uzorak završne obrade na upit prije narudžbe.",
  },
  {
    q: "Kako teče dostava velikih komada?",
    a: "Veće komade dostavljamo na adresu uz mogućnost unosa u prostor po dogovoru.",
  },
];

function tableSpecs(extra: Spec[] = []): Spec[] {
  return [
    { label: "Materijal", value: "Masivno drvo, uljena obrada" },
    { label: "Debljina ploče", value: "4 cm" },
    { label: "Oblik rubova", value: "Ravni rub" },
    ...extra,
  ];
}

export const products: Product[] = [
  {
    id: "1",
    slug: "stol-cardiff",
    name: "Blagovaonski stol Cardiff",
    collection: "Cardiff",
    category: "Stolovi",
    woodType: "Hrast",
    shortDescription: "Masivni hrast, svijetla uljena obrada. Stabilan stol za cijelu obitelj.",
    description:
      "Cardiff je klasičan blagovaonski stol od masivnog hrasta s čistim linijama i robusnom konstrukcijom. Svijetla uljena obrada ističe prirodnu teksturu drva i ugodna je na dodir. Dostupan u više dimenzija — od kompaktnih do velikih obiteljskih stolova.",
    basePrice: 1690,
    badge: "Najprodavanije",
    availability: "Na zalihi",
    deliveryTime: "4–6 tjedana",
    bestsellerRank: 1,
    newnessOrder: 6,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/05/Cardiff_Eiche_Hell_Tisch250x110_Stuhl_Paris_002.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2021/06/Cardiff_Raeuchereiche_Tisch300x110_001.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2021/06/Cardiff_Nussbaum_Tisch200x100_Sessel_NewYork_Leder_Creme_002.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: TABLE_SIZES,
    specs: tableSpecs([{ label: "Nosivost", value: "Visoka, masivna podnožja" }]),
    material: "Masivni hrast (FSC), prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "2",
    slug: "stol-curve",
    name: "Blagovaonski stol Curve",
    collection: "Curve",
    category: "Stolovi",
    woodType: "Hrast",
    shortDescription: "Masivno drvo i prirodne linije — moderan stol mekih rubova.",
    description:
      "Curve spaja masivno drvo i meke, zaobljene rubove u suvremen blagovaonski stol koji unosi toplinu u prostor. Idealan za moderne i prirodne interijere.",
    basePrice: 1490,
    oldPrice: 1690,
    badge: "Akcija",
    availability: "Na zalihi",
    deliveryTime: "4–6 tjedana",
    bestsellerRank: 3,
    newnessOrder: 7,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2025/01/gutekunst2024_10_005-scaled.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2025/01/gutekunst2024_10_006-scaled.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: TABLE_SIZES,
    specs: tableSpecs([{ label: "Rub", value: "Zaobljeni rub" }]),
    material: "Masivni hrast, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "3",
    slug: "stol-modula",
    name: "Blagovaonski stol Modula",
    collection: "Modula",
    category: "Stolovi",
    woodType: "Hrast",
    shortDescription: "Prirodno, stilsko i ugodno — stol koji čini srce blagovaone.",
    description:
      "Modula je svestran blagovaonski stol jednostavnih linija koji se uklapa u različite stilove uređenja. Masivna izrada osigurava dugotrajnost i stabilnost.",
    basePrice: 1590,
    badge: "Novo",
    availability: "Na zalihi",
    deliveryTime: "5–7 tjedana",
    bestsellerRank: 5,
    newnessOrder: 10,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2025/10/Modula_Milieu-scaled.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2025/01/gutekunst2024_10_007-scaled.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: TABLE_SIZES,
    specs: tableSpecs(),
    material: "Masivni hrast, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "4",
    slug: "stol-sydney",
    name: "Blagovaonski stol Sydney (drvo + metal)",
    collection: "Sydney",
    category: "Stolovi",
    woodType: "Hrast + metal",
    shortDescription: "Spoj masivnog drveta i metala — robustan, industrijski elegantan.",
    description:
      "Sydney spaja masivnu drvenu ploču s metalnim podnožjem za upečatljiv, industrijski elegantan izgled. Stabilan i izdržljiv, savršen za moderne blagovaone.",
    basePrice: 1290,
    availability: "Na zalihi",
    deliveryTime: "4–6 tjedana",
    bestsellerRank: 4,
    newnessOrder: 8,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2024/03/gutekunst2024_03_001-scaled.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2024/04/gutekunst2024_04_043-scaled.jpg",
    ],
    woodOptions: [
      { label: "Hrast", delta: 0 },
      { label: "Dimljeni hrast", delta: 140 },
    ],
    finishOptions: [
      { label: "Prirodno ulje", delta: 0 },
      { label: "Tamno ulje", delta: 60 },
    ],
    sizeOptions: [
      { label: "160 × 90 cm", delta: 0 },
      { label: "180 × 90 cm", delta: 120 },
      { label: "200 × 100 cm", delta: 260 },
    ],
    specs: tableSpecs([{ label: "Podnožje", value: "Praškasto lakiran metal" }]),
    material: "Masivni hrast + metalno podnožje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "5",
    slug: "stol-ariva",
    name: "Blagovaonski stol Ariva",
    collection: "Ariva",
    category: "Stolovi",
    woodType: "Hrast",
    shortDescription: "Lakoća koja poziva na zadržavanje — profinjen masivni stol.",
    description:
      "Ariva odiše lakoćom i profinjenošću. Tanji profil ploče i elegantna podnožja čine ga skladnim u prostoru, a masivna izrada jamči trajnost.",
    basePrice: 1740,
    badge: "Novo",
    availability: "Na zalihi",
    deliveryTime: "5–7 tjedana",
    bestsellerRank: 6,
    newnessOrder: 11,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2025/10/Ariva_Milieu-scaled.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2023/01/gutekunst_2023_01_001.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2023/01/gutekunst_2023_01_002.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: TABLE_SIZES,
    specs: tableSpecs(),
    material: "Masivni hrast, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "6",
    slug: "stol-tacoma-orah",
    name: "Blagovaonski stol Tacoma Orah",
    collection: "Tacoma",
    category: "Stolovi",
    woodType: "Orah",
    shortDescription: "Topli orah i elegantni detalji za posebnu blagovaonu.",
    description:
      "Tacoma u masivnom orahu donosi topli, tamniji ton i bogatu teksturu. Komad za one koji žele da stol bude središnja točka prostora.",
    basePrice: 1990,
    availability: "Po narudžbi",
    deliveryTime: "6–8 tjedana",
    bestsellerRank: 7,
    newnessOrder: 9,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/06/Cardiff_Nussbaum_Tisch200x100_Sessel_NewYork_Leder_Creme_002.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2023/10/gutekunst2023_10_004-scaled.jpg",
    ],
    woodOptions: [
      { label: "Orah", delta: 0 },
      { label: "Dimljeni hrast", delta: -120 },
    ],
    finishOptions: [
      { label: "Prirodno ulje", delta: 0 },
      { label: "Tamno ulje", delta: 60 },
    ],
    sizeOptions: TABLE_SIZES,
    specs: tableSpecs([{ label: "Vrsta drveta", value: "Masivni orah" }]),
    material: "Masivni orah, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "7",
    slug: "stol-orbit",
    name: "Blagovaonski stol Orbit",
    collection: "Orbit",
    category: "Stolovi",
    woodType: "Hrast",
    shortDescription: "Savršen sklad dizajna i udobnosti.",
    description:
      "Orbit je pažljivo uravnotežen blagovaonski stol koji spaja dizajn i udobnost. Masivni hrast i čista forma čine ga bezvremenskim izborom.",
    basePrice: 1390,
    availability: "Na zalihi",
    deliveryTime: "4–6 tjedana",
    bestsellerRank: 2,
    newnessOrder: 5,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2023/10/gutekunst2023_10_002-scaled.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2023/10/gutekunst2023_10_007-scaled.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: TABLE_SIZES,
    specs: tableSpecs(),
    material: "Masivni hrast, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "8",
    slug: "stolica-paris",
    name: "Stolica Paris",
    collection: "Paris",
    category: "Stolice",
    woodType: "Hrast",
    shortDescription: "Udobna drvena stolica čistih linija.",
    description:
      "Stolica Paris od masivnog drveta nudi udobnost i izdržljivost uz minimalistički dizajn koji se uklapa uz sve naše stolove.",
    basePrice: 290,
    availability: "Na zalihi",
    deliveryTime: "3–5 tjedana",
    bestsellerRank: 8,
    newnessOrder: 3,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/05/Cardiff_Eiche_Hell_Tisch250x110_Stuhl_Paris_002.jpg",
    ],
    woodOptions: [
      { label: "Hrast", delta: 0 },
      { label: "Orah", delta: 60 },
    ],
    finishOptions: FINISHES,
    sizeOptions: [],
    specs: [
      { label: "Materijal", value: "Masivno drvo" },
      { label: "Visina sjedala", value: "47 cm" },
    ],
    material: "Masivno drvo, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "9",
    slug: "stolica-new-york",
    name: "Stolica New York (eko koža)",
    collection: "New York",
    category: "Stolice",
    woodType: "Hrast",
    shortDescription: "Tapecirana stolica s drvenim ili metalnim nogama.",
    description:
      "New York je tapecirana stolica presvučena kvalitetnom eko kožom, dostupna s drvenim nogama. Spaja udobnost i elegantan izgled.",
    basePrice: 320,
    badge: "Novo",
    availability: "Na zalihi",
    deliveryTime: "3–5 tjedana",
    bestsellerRank: 9,
    newnessOrder: 4,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/06/Cardiff_Nussbaum_Tisch200x100_Sessel_NewYork_Leder_Creme_002.jpg",
    ],
    woodOptions: [
      { label: "Hrast", delta: 0 },
      { label: "Orah", delta: 60 },
    ],
    finishOptions: [
      { label: "Eko koža krem", delta: 0 },
      { label: "Eko koža smeđa", delta: 0 },
      { label: "Tkanina antracit", delta: -20 },
    ],
    sizeOptions: [],
    specs: [
      { label: "Presvlaka", value: "Eko koža / tkanina" },
      { label: "Noge", value: "Masivno drvo" },
    ],
    material: "Masivno drvo, eko koža.",
    care: "Presvlaku čistite mekom krpom; drvene dijelove njegujte uljem za drvo.",
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "10",
    slug: "stolica-borke",
    name: "Stolica Borke (Freischwinger)",
    collection: "Borke",
    category: "Stolice",
    woodType: "Hrast",
    shortDescription: "Konzolna stolica koja lebdi — moderan naglasak uz stol.",
    description:
      "Borke je konzolna (Freischwinger) stolica s blagim njihanjem koje pridonosi udobnosti. Suvremen naglasak uz masivne drvene stolove.",
    basePrice: 270,
    availability: "Na zalihi",
    deliveryTime: "3–5 tjedana",
    bestsellerRank: 10,
    newnessOrder: 2,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/06/monte_3_0_hauptaufnahme_borke_freischwinger_schwarz.jpg",
    ],
    woodOptions: [{ label: "Hrast", delta: 0 }],
    finishOptions: [
      { label: "Crna", delta: 0 },
      { label: "Antracit", delta: 0 },
    ],
    sizeOptions: [],
    specs: [
      { label: "Tip", value: "Konzolna (Freischwinger)" },
      { label: "Okvir", value: "Metalni, praškasto lakiran" },
    ],
    material: "Metalni okvir, presvlaka.",
    care: "Brišite mekom krpom; izbjegavajte agresivna sredstva.",
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "11",
    slug: "klupa-cardiff",
    name: "Klupa Cardiff",
    collection: "Cardiff",
    category: "Klupe",
    woodType: "Hrast",
    shortDescription: "Masivna drvena klupa — više mjesta, topao ugođaj.",
    description:
      "Klupa Cardiff od masivnog hrasta savršeno se uklapa uz istoimeni stol. Idealna za obiteljska okupljanja kad treba više mjesta za sjedenje.",
    basePrice: 690,
    availability: "Na zalihi",
    deliveryTime: "4–6 tjedana",
    bestsellerRank: 11,
    newnessOrder: 1,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2023/10/gutekunst2023_10_005-scaled.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: [
      { label: "160 cm", delta: 0 },
      { label: "180 cm", delta: 70 },
      { label: "200 cm", delta: 140 },
    ],
    specs: [
      { label: "Materijal", value: "Masivno drvo, uljena obrada" },
      { label: "Dubina sjedala", value: "35 cm" },
    ],
    material: "Masivni hrast, prirodno ulje.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "12",
    slug: "kutna-klupa-monte",
    name: "Kutna klupa Monte",
    collection: "Monte",
    category: "Kutne klupe",
    woodType: "Hrast",
    shortDescription: "Rješenje za svaki kutak — kutna klupa u standardnim dimenzijama.",
    description:
      "Monte je kutna klupa koja iskorištava prostor uz zid i u kutu. Dostupna u standardnim dimenzijama prikladnima za većinu blagovaonskih niša.",
    basePrice: 1450,
    badge: "Po narudžbi",
    availability: "Po narudžbi",
    deliveryTime: "6–8 tjedana",
    bestsellerRank: 12,
    newnessOrder: 12,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/06/monte_3_0_hauptaufnahme_borke_freischwinger_schwarz.jpg",
      "https://www.gutekunst.de/wp-content/uploads/2021/12/16895_21_Eckbankgruppe-scaled.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: [
      { label: "180 × 140 cm", delta: 0 },
      { label: "200 × 160 cm", delta: 180 },
    ],
    specs: [
      { label: "Materijal", value: "Masivno drvo + tapecirano sjedalo" },
      { label: "Izvedba", value: "Lijeva ili desna" },
    ],
    material: "Masivno drvo, tapecirano sjedalo.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
  {
    id: "13",
    slug: "kutna-klupa-smart-corner",
    name: "Kutna klupa Smart Corner",
    collection: "Smart Corner",
    category: "Kutne klupe",
    woodType: "Hrast",
    shortDescription: "Mala stelna dubina, najmanje kutne mjere — idealna za kuhinju.",
    description:
      "Smart Corner je moderna kuhinjska kutna klupa male stelne dubine i kompaktnih kutnih mjera, savršena za manje prostore.",
    basePrice: 1290,
    availability: "Po narudžbi",
    deliveryTime: "6–8 tjedana",
    bestsellerRank: 13,
    newnessOrder: 13,
    images: [
      "https://www.gutekunst.de/wp-content/uploads/2021/12/16895_21_Eckbankgruppe-scaled.jpg",
    ],
    woodOptions: WOODS,
    finishOptions: FINISHES,
    sizeOptions: [
      { label: "160 × 120 cm", delta: 0 },
      { label: "180 × 140 cm", delta: 150 },
    ],
    specs: [
      { label: "Materijal", value: "Masivno drvo + tapecirano sjedalo" },
      { label: "Stelna dubina", value: "Mala" },
    ],
    material: "Masivno drvo, tapecirano sjedalo.",
    care: COMMON_CARE,
    warranty: COMMON_WARRANTY,
    faq: COMMON_FAQ,
  },
];

// ── Pomoćne funkcije ──
export const CATEGORIES: Category[] = ["Stolovi", "Stolice", "Klupe", "Kutne klupe"];

export const WOOD_TYPES: string[] = ["Hrast", "Dimljeni hrast", "Orah", "Hrast + metal"];

export const AVAILABILITIES: Availability[] = ["Na zalihi", "Po narudžbi"];

export function formatEur(value: number): string {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function hasVariants(p: Product): boolean {
  return p.sizeOptions.length > 0 || p.woodOptions.length > 1 || p.finishOptions.length > 1;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getRelated(product: Product, limit = 3): Product[] {
  return products
    .filter((p) => p.slug !== product.slug && p.category === product.category)
    .slice(0, limit);
}

export function priceBounds(): { min: number; max: number } {
  const prices = products.map((p) => p.basePrice);
  return { min: Math.min(...prices), max: Math.max(...prices) };
}
