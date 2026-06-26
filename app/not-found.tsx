import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="mx-auto flex min-h-[60vh] max-w-[1240px] flex-col items-center justify-center px-5 py-20 text-center">
        <span className="font-serif text-6xl font-bold text-sand">404</span>
        <h1 className="mt-3 text-3xl">Stranica nije pronađena</h1>
        <p className="mt-3 max-w-md font-light text-inksoft">
          Tražena stranica ne postoji ili je premještena. Vratite se na početnu ili istražite našu
          trgovinu.
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="rounded-sm bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-wooddeep"
          >
            Početna
          </Link>
          <Link
            href="/trgovina"
            className="rounded-sm border border-ink px-6 py-3 text-sm font-medium transition hover:bg-ink hover:text-cream"
          >
            Trgovina
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
