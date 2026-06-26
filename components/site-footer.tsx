import Link from "next/link";

export function SiteFooter() {
  return (
    <footer id="kontakt" className="bg-ink pt-14 pb-7 text-sm font-light text-cream/75">
      <div className="mx-auto max-w-[1240px] px-5">
        <div className="mb-9 grid grid-cols-2 gap-x-5 gap-y-8 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div>
            <span className="mb-3 inline-block font-serif text-2xl font-bold tracking-[0.18em] text-cream">
              MAS<span className="text-wood">I</span>VA
            </span>
            <p className="max-w-xs text-cream/70">
              Namještaj od masivnog drveta stvoren za generacije. Premium masiv za hrvatski dom.
            </p>
          </div>

          <FooterCol
            title="Trgovina"
            links={[
              ["#proizvodi", "Stolovi"],
              ["#proizvodi", "Stolice i klupe"],
              ["#proizvodi", "Kutne klupe"],
              ["#pomjeri", "Po mjeri"],
            ]}
          />
          <FooterCol
            title="Pomoć"
            links={[
              ["#", "Dostava i rokovi"],
              ["#", "Načini plaćanja"],
              ["#", "Povrat i reklamacije"],
              ["#", "Česta pitanja"],
            ]}
          />
          <FooterCol
            title="Kontakt"
            links={[
              ["#", "info@masiva.hr"],
              ["#", "+385 1 000 0000"],
              ["#", "Instagram"],
              ["#", "Facebook"],
            ]}
          />
        </div>

        <div className="flex flex-wrap justify-between gap-2.5 border-t border-white/10 pt-5 text-xs text-cream/55">
          <span>© 2026 Masiva. Sva prava pridržana.</span>
          <span>Uvjeti kupnje · Privatnost · Kolačići</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="mb-3.5 font-sans text-[13px] font-semibold uppercase tracking-[0.12em] text-cream">
        {title}
      </h4>
      {links.map(([href, label], i) => (
        <Link key={i} href={href} className="block py-1.5 text-cream/70 transition hover:text-white">
          {label}
        </Link>
      ))}
    </div>
  );
}
