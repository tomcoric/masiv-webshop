"use client";

import { useState } from "react";
import Link from "next/link";

const NAV = [
  { href: "#kategorije", label: "Blagovaona" },
  { href: "#proizvodi", label: "Stolovi" },
  { href: "#proizvodi", label: "Stolice i klupe" },
  { href: "#pomjeri", label: "Po mjeri" },
  { href: "#proces", label: "O nama" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between px-5">
        <Link href="/" className="font-serif text-[26px] font-bold tracking-[0.18em]">
          MAS<span className="text-wood">I</span>VA
        </Link>

        <nav className="hidden gap-8 text-sm text-inksoft md:flex">
          {NAV.map((item, i) => (
            <Link key={i} href={item.href} className="py-1.5 transition hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Pretraga" className="text-ink">
            <SearchIcon />
          </button>
          <button aria-label="Korisnički račun" className="hidden text-ink sm:block">
            <UserIcon />
          </button>
          <button aria-label="Košarica" className="relative text-ink">
            <BagIcon />
            <span className="absolute -right-2.5 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-wood text-[10px] text-white">
              0
            </span>
          </button>
          <button
            aria-label="Izbornik"
            aria-expanded={open}
            className="text-ink md:hidden"
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      {open && (
        <div className="flex flex-col border-t border-line bg-cream px-5 pb-4 md:hidden">
          {NAV.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              className="border-b border-line py-3 text-[15px]"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}
function UserIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
    </svg>
  );
}
function BagIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6 7h15l-1.5 11H7.5L6 7z" />
      <path d="M9 7a3 3 0 016 0" />
    </svg>
  );
}
function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
