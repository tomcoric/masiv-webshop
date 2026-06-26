# Masiva — webshop za namještaj od masivnog drveta

Premium webshop za prodaju namještaja od masivnog drveta, namijenjen hrvatskom tržištu (jezik: hrvatski, valuta: EUR). Trenutno je u **fazi vizualnog prototipa** — gotova je početna stranica u pravom Next.js okruženju. Backend (baza, košarica, checkout, admin) dodaje se u sljedećim fazama.

## Tehnologije

- **Next.js 16** (App Router) + **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- (slijedi) Prisma + PostgreSQL, autentifikacija, S3 storage, payment provider adapter, email predlošci

## Pokretanje (lokalno, Windows + VSCode)

Preduvjet: **Node.js 20+** (provjeri s `node -v`).

1. Otvori folder `D:\Projects\Web Shop` u VSCode.
2. Otvori terminal (Terminal → New Terminal) i pokreni:

   ```bash
   npm install
   ```

3. Pokreni razvojni server:

   ```bash
   npm run dev
   ```

4. Otvori preglednik na `http://localhost:3000`.

> Napomena: tijekom prototipa fotografije se učitavaju s dobavljačeve stranice (Gutekunst), pa je za prikaz slika potreban internet. Prije produkcije zamjenjuju se vlastitim fotografijama.

## Korisne naredbe

| Naredba | Opis |
| --- | --- |
| `npm run dev` | Razvojni server s hot-reloadom |
| `npm run build` | Produkcijski build |
| `npm run start` | Pokretanje produkcijskog builda |
| `npm run format` | Formatiranje koda (Prettier) |

## Struktura projekta

```
Web Shop/
├─ app/                  # Next.js App Router
│  ├─ layout.tsx         # Glavni layout, fontovi, meta podaci
│  ├─ page.tsx           # Početna stranica
│  └─ globals.css        # Dizajn sustav (Tailwind v4 tokeni)
├─ components/           # Dijeljene komponente (header, footer)
├─ lib/                  # Podaci i pomoćne funkcije
│  └─ products.ts        # Demo proizvodi i kategorije
├─ prototip-pocetna.html # Statički prototip (referenca)
├─ next.config.ts
├─ package.json
└─ .env.example          # Predložak environment varijabli
```

## Što slijedi (plan po fazama)

1. ✅ Dizajn sustav i početna stranica
2. ⏳ Katalog proizvoda + filteri + stranica proizvoda
3. ⏳ Košarica
4. ⏳ Checkout (uplata po ponudi + adapter za kartice)
5. ⏳ Baza (Prisma + PostgreSQL) i narudžbe
6. ⏳ Admin panel
7. ⏳ Email predlošci
8. ⏳ SEO, testovi, završni audit

## Prije objave (mora popuniti vlasnik trgovine)

- Stvarni poslovni podaci (naziv tvrtke, OIB, adresa, IBAN za uplate)
- Stvarne fotografije i opisi proizvoda te konačne cijene
- Pravne stranice (Uvjeti kupnje, Privatnost, Kolačići, Reklamacije)
- Pristupni podaci za bazu, email i payment provider (u `.env`)
