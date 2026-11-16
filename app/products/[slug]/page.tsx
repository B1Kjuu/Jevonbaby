import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import ProductPurchase from "@/components/ProductPurchase";
import Testimonials from "@/components/Testimonials";
import { PUMP_SLUG, categories, getProduct, products } from "@/lib/catalog";
import { PUMP_REVIEW_COUNT, inTheBox, promises } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  if (!product) return {};
  return { title: product.title, description: product.blurb };
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  const isPump = product.slug === PUMP_SLUG;
  const category = categories.find((c) => c.id === product.category)!;
  const related = products
    .filter((p) => p.slug !== product.slug && p.category === (isPump ? "feeding" : product.category))
    .slice(0, 4);

  return (
    <div className="wrap py-6 sm:py-10">
      <nav aria-label="Breadcrumb" className="mb-5 text-sm text-ink-soft">
        <ol className="flex flex-wrap gap-x-2">
          <li>
            <Link href="/shop" className="underline-offset-4 hover:underline">
              Shop
            </Link>
            <span aria-hidden="true"> /</span>
          </li>
          <li>
            <Link href={`/shop#${category.id}`} className="underline-offset-4 hover:underline">
              {category.title}
            </Link>
          </li>
        </ol>
      </nav>

      <ProductPurchase product={product}>
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{product.title}</h1>
        {product.subtitle && <p className="mt-1 text-ink-soft">{product.subtitle}</p>}
        {isPump && <p className="mt-2 text-sm text-ink-soft">{PUMP_REVIEW_COUNT} customer reviews</p>}
        <p className="mt-4 text-lg text-ink-soft">{product.blurb}</p>
        <ul className="mt-4 space-y-1.5">
          {product.details.map((d) => (
            <li key={d} className="flex gap-2">
              <span aria-hidden="true" className="text-plum">
                ✓
              </span>
              {d}
            </li>
          ))}
        </ul>
      </ProductPurchase>

      <section aria-label="Our promises" className="mt-12">
        <ul className="grid gap-4 rounded-3xl bg-white p-6 sm:grid-cols-3 sm:p-8">
          {promises.map((p) => (
            <li key={p.title}>
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-sm text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {isPump && (
        <>
          <section aria-labelledby="box" className="mt-14">
            <h2 id="box" className="text-2xl font-semibold tracking-tight sm:text-3xl">
              What is in the box
            </h2>
            <ul className="mt-5 grid gap-x-6 gap-y-2 text-ink-soft sm:grid-cols-2 lg:grid-cols-3">
              {inTheBox.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-plum">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-soft">The double set includes two of everything.</p>
          </section>
          <section aria-labelledby="reviews" className="mt-14">
            <h2 id="reviews" className="mb-5 text-2xl font-semibold tracking-tight sm:text-3xl">
              What mums say
            </h2>
            <Testimonials />
          </section>
        </>
      )}

      {related.length > 0 && (
        <section aria-labelledby="related" className="mt-14">
          <h2 id="related" className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {isPump ? "Goes with the pump" : `More in ${category.title.toLowerCase()}`}
          </h2>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
