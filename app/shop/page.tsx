import type { Metadata } from "next";
import ProductCard from "@/components/ProductCard";
import { categories, products } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Shop",
  description: "The Jevonbaby wearable pump, feeding and storage, replacement parts, and care accessories.",
};

export default function Shop() {
  return (
    <div className="wrap py-8 sm:py-12">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Shop</h1>
      <nav aria-label="Categories" className="sticky top-16 z-20 -mx-4 mt-4 bg-cream/95 px-4 py-3 backdrop-blur">
        <ul className="flex gap-2 overflow-x-auto">
          {categories.map((c) => (
            <li key={c.id} className="shrink-0">
              <a
                href={`#${c.id}`}
                className="block rounded-full border border-line bg-white px-4 py-2.5 text-[15px] font-medium hover:border-plum hover:bg-lilac"
              >
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {categories.map((c) => {
        const items = products.filter((p) => p.category === c.id);
        return (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`} className="scroll-mt-36 pt-8">
            <h2 id={`${c.id}-title`} className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {c.title}
            </h2>
            <p className="mt-1 text-ink-soft">{c.intro}</p>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
