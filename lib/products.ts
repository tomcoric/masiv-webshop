// ── Demo podaci za prototip ──
// Slike su privremeno s dobavljača (Gutekunst). Cijene su orijentacijske.
// U fazi backenda ovo zamjenjuje Prisma + PostgreSQL.

export type Badge = "Najprodavanije" | "Akcija" | "Novo" | "Po narudžbi";

export interface Product {
  id: string;
  slug: string;
  name: string;
  collection: string;
  category: string;
  description: string;
  price: number; // EUR
  oldPrice?: number;
  badge?: Badge;
  image: string;
  alt: string;
}

export interface Category {
  slug: string;
  name: string;
  tag: string;
  image: string;
  alt: string;
}

export const categories: Category[] = [
  {
    slug: "cardiff",
    name: "Cardiff",
    tag: "Stolovi",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/05/Cardiff_Eiche_Hell_Tisch250x110_Stuhl_Paris_002.jpg",
    alt: "Kolekcija Cardiff — blagovaonski stol od svijetlog hrasta",
  },
  {
    slug: "curve",
    name: "Curve",
    tag: "Stolovi",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2025/01/gutekunst2024_10_005-scaled.jpg",
    alt: "Kolekcija Curve — masivni drveni stol",
  },
  {
    slug: "modula",
    name: "Modula",
    tag: "Stolovi",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2025/10/Modula_Milieu-scaled.jpg",
    alt: "Kolekcija Modula — blagovaonski namještaj",
  },
  {
    slug: "monte",
    name: "Monte",
    tag: "Klupe i kutne klupe",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/06/monte_3_0_hauptaufnahme_borke_freischwinger_schwarz.jpg",
    alt: "Kolekcija Monte — kutna klupa",
  },
];

export const products: Product[] = [
  {
    id: "1",
    slug: "stol-cardiff-hrast-250",
    name: "Stol Cardiff Hrast 250×110",
    collection: "Cardiff",
    category: "Stolovi",
    description:
      "Masivni hrast, svijetla uljena obrada. Stabilna konstrukcija za cijelu obitelj.",
    price: 1890,
    badge: "Najprodavanije",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/05/Cardiff_Eiche_Hell_Tisch250x110_Stuhl_Paris_002.jpg",
    alt: "Blagovaonski stol Cardiff hrast 250x110",
  },
  {
    id: "2",
    slug: "stol-curve-hrast-200",
    name: "Stol Curve Hrast 200",
    collection: "Curve",
    category: "Stolovi",
    description:
      "Masivno drvo i prirodne linije — moderan blagovaonski stol mekih rubova.",
    price: 1490,
    oldPrice: 1690,
    badge: "Akcija",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2025/01/gutekunst2024_10_005-scaled.jpg",
    alt: "Blagovaonski stol Curve hrast 200",
  },
  {
    id: "3",
    slug: "kutna-klupa-monte",
    name: "Kutna klupa Monte",
    collection: "Monte",
    category: "Klupe i kutne klupe",
    description:
      "Rješenje za svaki prostor — kutna klupa u cm-rasteru po vašoj mjeri.",
    price: 1450,
    badge: "Po narudžbi",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2021/06/monte_3_0_hauptaufnahme_borke_freischwinger_schwarz.jpg",
    alt: "Kutna klupa Monte",
  },
  {
    id: "4",
    slug: "stol-modula-hrast-200",
    name: "Stol Modula Hrast 200",
    collection: "Modula",
    category: "Stolovi",
    description: "Prirodno, stilsko i ugodno — stol koji čini srce blagovaone.",
    price: 1590,
    badge: "Novo",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2025/10/Modula_Milieu-scaled.jpg",
    alt: "Blagovaonski stol Modula",
  },
  {
    id: "5",
    slug: "stol-sydney-180",
    name: "Stol Sydney 180 (drvo + metal)",
    collection: "Sydney",
    category: "Stolovi",
    description:
      "Spoj masivnog drveta i metala — robustan, industrijski elegantan stol.",
    price: 1290,
    image:
      "https://www.gutekunst.de/wp-content/uploads/2024/03/gutekunst2024_03_001-scaled.jpg",
    alt: "Blagovaonski stol Sydney drvo i metal",
  },
  {
    id: "6",
    slug: "stol-ariva-hrast-220",
    name: "Stol Ariva Hrast 220",
    collection: "Ariva",
    category: "Stolovi",
    description:
      "Lakoća koja poziva na zadržavanje — profinjen masivni stol za druženje.",
    price: 1740,
    badge: "Novo",
    image:
      "https://www.gutekunst.de/wp-content/uploads/2025/10/Ariva_Milieu-scaled.jpg",
    alt: "Blagovaonski stol Ariva",
  },
];

export function formatEur(value: number): string {
  return new Intl.NumberFormat("hr-HR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(value);
}
