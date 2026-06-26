import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Masiva — Namještaj od masivnog drveta",
    template: "%s | Masiva",
  },
  description:
    "Masiva — premium namještaj od masivnog drveta stvoren za generacije. Ručno odabran masiv, prirodni materijali i dizajn za stvaran dom. Dostava u cijeloj Hrvatskoj.",
  openGraph: {
    title: "Masiva — Namještaj od masivnog drveta",
    description:
      "Premium namještaj od masivnog drveta stvoren za generacije. Dostava u cijeloj Hrvatskoj.",
    locale: "hr_HR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hr" className={`${cormorant.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
