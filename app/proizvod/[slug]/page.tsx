import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductDetail } from "@/components/product-detail";
import { getProductBySlug, getRelated, products } from "@/lib/products";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Proizvod nije pronađen" };
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: [product.images[0]],
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelated(product);

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-[1240px] px-5 py-8 md:py-12">
        <nav aria-label="Putanja" className="mb-6 text-xs text-muted">
          <Link href="/" className="hover:text-ink">
            Početna
          </Link>{" "}
          /{" "}
          <Link href="/trgovina" className="hover:text-ink">
            Trgovina
          </Link>{" "}
          /{" "}
          <Link href={`/trgovina?kategorija=${encodeURIComponent(product.category)}`} className="hover:text-ink">
            {product.category}
          </Link>{" "}
          / <span className="text-ink">{product.name}</span>
        </nav>

        <ProductDetail product={product} related={related} />
      </main>
      <SiteFooter />
    </>
  );
}
