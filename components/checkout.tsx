"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCart, type CartItem } from "@/lib/cart";
import { formatEur } from "@/lib/products";

const schema = z.object({
  firstName: z.string().min(2, "Unesite ime"),
  lastName: z.string().min(2, "Unesite prezime"),
  email: z.string().email("Unesite ispravan e-mail"),
  phone: z.string().min(6, "Unesite broj telefona"),
  company: z.string().optional(),
  oib: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{11}$/.test(v), "OIB mora imati 11 znamenki"),
  address: z.string().min(3, "Unesite adresu i kućni broj"),
  city: z.string().min(2, "Unesite grad"),
  zip: z.string().min(4, "Unesite poštanski broj"),
  country: z.string().min(2, "Unesite državu"),
  note: z.string().optional(),
  delivery: z.enum(["adresa", "osobno", "dogovor"]),
  payment: z.enum(["uplata"]),
  terms: z.boolean().refine((v) => v === true, "Morate prihvatiti uvjete kupnje i privatnost"),
});

type FormData = z.infer<typeof schema>;

const STEPS = ["Podaci", "Dostava", "Plaćanje", "Pregled"];

const DELIVERY_LABELS: Record<string, string> = {
  adresa: "Dostava na adresu",
  osobno: "Osobno preuzimanje",
  dogovor: "Dostava po dogovoru (veliki komadi)",
};

interface Order {
  number: string;
  items: CartItem[];
  subtotal: number;
  data: FormData;
}

export function Checkout() {
  const { items, subtotal, clear, ready } = useCart();
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<Order | null>(null);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: {
      country: "Hrvatska",
      delivery: "adresa",
      payment: "uplata",
      terms: false,
    },
  });

  async function next() {
    const fieldsByStep: (keyof FormData)[][] = [
      ["firstName", "lastName", "email", "phone", "oib", "address", "city", "zip", "country"],
      ["delivery"],
      ["payment"],
    ];
    const valid = await trigger(fieldsByStep[step]);
    if (valid) setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function onSubmit(data: FormData) {
    const number = `MAS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrder({ number, items, subtotal, data });
    clear();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (!ready) {
    return <div className="py-20 text-center text-muted">Učitavanje…</div>;
  }

  // Potvrda narudžbe
  if (order) {
    return <Confirmation order={order} />;
  }

  if (items.length === 0) {
    return (
      <div className="rounded-sm border border-line bg-white px-6 py-16 text-center">
        <h1 className="text-2xl">Košarica je prazna</h1>
        <p className="mt-2 font-light text-inksoft">Dodajte proizvode prije nastavka na blagajnu.</p>
        <Link
          href="/trgovina"
          className="mt-6 inline-flex rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
        >
          Idi u trgovinu
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px]">
      <div>
        {/* Stepper */}
        <ol className="mb-8 flex flex-wrap gap-x-2 gap-y-2 text-sm">
          {STEPS.map((label, i) => (
            <li key={label} className="flex items-center gap-2">
              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full text-[12px] ${
                  i === step
                    ? "bg-ink text-cream"
                    : i < step
                      ? "bg-wood text-white"
                      : "border border-line text-muted"
                }`}
              >
                {i + 1}
              </span>
              <span className={i === step ? "font-medium text-ink" : "text-muted"}>{label}</span>
              {i < STEPS.length - 1 && <span className="mx-1 text-line">—</span>}
            </li>
          ))}
        </ol>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Korak 1: Podaci */}
          {step === 0 && (
            <fieldset className="space-y-4">
              <legend className="mb-2 text-xl">Podaci kupca</legend>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Ime" error={errors.firstName?.message}>
                  <input className="inp" {...register("firstName")} />
                </Field>
                <Field label="Prezime" error={errors.lastName?.message}>
                  <input className="inp" {...register("lastName")} />
                </Field>
                <Field label="E-mail" error={errors.email?.message}>
                  <input type="email" className="inp" {...register("email")} />
                </Field>
                <Field label="Telefon" error={errors.phone?.message}>
                  <input type="tel" className="inp" {...register("phone")} />
                </Field>
                <Field label="Naziv tvrtke (opcionalno)" error={errors.company?.message}>
                  <input className="inp" {...register("company")} />
                </Field>
                <Field label="OIB tvrtke (opcionalno)" error={errors.oib?.message}>
                  <input className="inp" {...register("oib")} />
                </Field>
              </div>
              <Field label="Adresa i kućni broj" error={errors.address?.message}>
                <input className="inp" {...register("address")} />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Grad" error={errors.city?.message}>
                  <input className="inp" {...register("city")} />
                </Field>
                <Field label="Poštanski broj" error={errors.zip?.message}>
                  <input className="inp" {...register("zip")} />
                </Field>
                <Field label="Država" error={errors.country?.message}>
                  <input className="inp" {...register("country")} />
                </Field>
              </div>
              <Field label="Napomena uz narudžbu (opcionalno)" error={errors.note?.message}>
                <textarea rows={3} className="inp" {...register("note")} />
              </Field>
            </fieldset>
          )}

          {/* Korak 2: Dostava */}
          {step === 1 && (
            <fieldset className="space-y-3">
              <legend className="mb-2 text-xl">Način dostave</legend>
              <Radio name="delivery" value="adresa" register={register} title="Dostava na adresu" desc="Sigurna dostava na vašu adresu u cijeloj Hrvatskoj." />
              <Radio name="delivery" value="osobno" register={register} title="Osobno preuzimanje" desc="Preuzimanje u našem prostoru po dogovoru." />
              <Radio name="delivery" value="dogovor" register={register} title="Dostava po dogovoru" desc="Za velike komade namještaja — termin i uvjeti po dogovoru." />
            </fieldset>
          )}

          {/* Korak 3: Plaćanje */}
          {step === 2 && (
            <fieldset className="space-y-3">
              <legend className="mb-2 text-xl">Način plaćanja</legend>
              <Radio
                name="payment"
                value="uplata"
                register={register}
                title="Bankovna uplata / plaćanje po ponudi"
                desc="Nakon narudžbe šaljemo ponudu s podacima za uplatu. Narudžba se izrađuje po zaprimljenoj uplati."
              />
              <div className="rounded-sm border border-dashed border-line bg-cream2/50 p-4 text-sm text-muted">
                <span className="font-medium text-inksoft">Kartično plaćanje</span> — uskoro.
                Pripremljen je modularni adapter za spajanje kartičnog pružatelja usluge.
              </div>
            </fieldset>
          )}

          {/* Korak 4: Pregled */}
          {step === 3 && (
            <fieldset className="space-y-5">
              <legend className="mb-2 text-xl">Pregled narudžbe</legend>
              <div className="rounded-sm border border-line bg-white p-4 text-sm">
                <p className="font-medium">Provjerite podatke prije slanja.</p>
                <p className="mt-2 text-inksoft">
                  Stavke, dostava i način plaćanja prikazani su u sažetku desno (na mobitelu ispod).
                </p>
              </div>
              <label className="flex items-start gap-3 text-sm">
                <input type="checkbox" className="mt-0.5 h-4 w-4 accent-wood" {...register("terms")} />
                <span className="text-inksoft">
                  Prihvaćam{" "}
                  <Link href="/uvjeti" className="text-wood underline underline-offset-2" target="_blank">
                    uvjete kupnje
                  </Link>{" "}
                  i{" "}
                  <Link href="/privatnost" className="text-wood underline underline-offset-2" target="_blank">
                    politiku privatnosti
                  </Link>
                  .
                </span>
              </label>
              {errors.terms && <p className="text-sm text-sale">{errors.terms.message}</p>}
            </fieldset>
          )}

          {/* Navigacija */}
          <div className="mt-8 flex items-center justify-between gap-3">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                className="rounded-sm border border-ink px-5 py-3 text-sm font-medium transition hover:bg-ink hover:text-cream"
              >
                Natrag
              </button>
            ) : (
              <Link href="/kosarica" className="text-sm text-wood hover:underline">
                ← Natrag na košaricu
              </Link>
            )}

            {step < STEPS.length - 1 ? (
              <button
                type="button"
                onClick={next}
                className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
              >
                Dalje
              </button>
            ) : (
              <button
                type="submit"
                className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
              >
                Pošalji narudžbu
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Sažetak */}
      <aside className="h-fit rounded-sm border border-line bg-white p-6">
        <h2 className="text-xl">Vaša narudžba</h2>
        <div className="mt-4 space-y-3">
          {items.map((it) => (
            <div key={it.key} className="flex gap-3">
              <div className="relative aspect-square w-14 flex-none overflow-hidden rounded-sm bg-sand">
                <Image src={it.image} alt={it.name} fill sizes="56px" className="object-cover" />
              </div>
              <div className="flex-1 text-sm">
                <div className="font-medium leading-tight">{it.name}</div>
                {it.variants.length > 0 && (
                  <div className="text-[12px] text-muted">{it.variants.join(" · ")}</div>
                )}
                <div className="text-[12px] text-muted">Količina: {it.qty}</div>
              </div>
              <div className="text-sm font-medium">{formatEur(it.unitPrice * it.qty)}</div>
            </div>
          ))}
        </div>
        <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
          <div className="flex justify-between">
            <dt className="text-inksoft">Međuzbroj</dt>
            <dd className="font-medium">{formatEur(subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-inksoft">Dostava</dt>
            <dd className="text-inksoft">{subtotal >= 900 ? "Besplatno" : "Po dogovoru"}</dd>
          </div>
        </dl>
        <div className="mt-3 flex items-baseline justify-between border-t border-line pt-3">
          <span className="font-semibold">Ukupno</span>
          <span className="text-lg font-semibold">{formatEur(subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}

function Confirmation({ order }: { order: Order }) {
  const { data } = order;
  return (
    <div className="mx-auto max-w-2xl">
      <div className="rounded-sm border border-line bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-forest text-white">
          <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 12l5 5L20 6" />
          </svg>
        </div>
        <h1 className="mt-4 text-2xl">Hvala na narudžbi!</h1>
        <p className="mt-2 font-light text-inksoft">
          Vaša narudžba je zaprimljena. Broj narudžbe:
        </p>
        <p className="mt-1 text-lg font-semibold">{order.number}</p>
      </div>

      <div className="mt-6 rounded-sm border border-line bg-cream2 p-5 text-sm text-inksoft">
        <p className="font-medium text-ink">Podaci za uplatu (primjer — popunjava vlasnik trgovine)</p>
        <div className="mt-2 space-y-1">
          <p>Primatelj: Masiva [naziv tvrtke]</p>
          <p>IBAN: HR00 0000 0000 0000 0000 0</p>
          <p>Iznos: {formatEur(order.subtotal)}</p>
          <p>Poziv na broj: {order.number}</p>
        </div>
      </div>

      <div className="mt-6 rounded-sm border border-line bg-white p-5">
        <h2 className="text-lg">Sažetak</h2>
        <div className="mt-3 divide-y divide-line text-sm">
          {order.items.map((it) => (
            <div key={it.key} className="flex justify-between gap-3 py-2">
              <span>
                {it.name}
                {it.variants.length > 0 ? ` (${it.variants.join(", ")})` : ""} × {it.qty}
              </span>
              <span className="font-medium">{formatEur(it.unitPrice * it.qty)}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex justify-between border-t border-line pt-3 font-semibold">
          <span>Ukupno</span>
          <span>{formatEur(order.subtotal)}</span>
        </div>
        <div className="mt-4 text-sm text-inksoft">
          <p>
            Dostava: {DELIVERY_LABELS[data.delivery]} · Plaćanje: bankovna uplata / po ponudi
          </p>
          <p className="mt-1">
            Kontakt: {data.firstName} {data.lastName}, {data.email}, {data.phone}
          </p>
        </div>
      </div>

      <p className="mt-4 rounded-sm bg-cream2 px-4 py-3 text-[13px] text-muted">
        Napomena: automatski e-mail potvrde i spremanje narudžbe u bazu aktiviraju se s backendom u
        sljedećoj fazi. Za sada je ovo prikaz toka narudžbe.
      </p>

      <div className="mt-6 text-center">
        <Link
          href="/trgovina"
          className="inline-flex rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
        >
          Nastavi kupnju
        </Link>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[12px] font-semibold uppercase tracking-[0.08em] text-ink">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-[12px] text-sale">{error}</span>}
    </label>
  );
}

function Radio({
  name,
  value,
  register,
  title,
  desc,
}: {
  name: "delivery" | "payment";
  value: string;
  register: ReturnType<typeof useForm<FormData>>["register"];
  title: string;
  desc: string;
}) {
  return (
    <label className="flex cursor-pointer items-start gap-3 rounded-sm border border-line bg-white p-4 transition hover:border-ink">
      <input type="radio" value={value} className="mt-1 h-4 w-4 accent-wood" {...register(name)} />
      <span>
        <span className="block font-medium">{title}</span>
        <span className="block text-sm text-inksoft">{desc}</span>
      </span>
    </label>
  );
}
