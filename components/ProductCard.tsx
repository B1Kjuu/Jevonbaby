import Image from "next/image";
import Link from "next/link";
import Price from "./Price";
import { type Product, fromPrice, hasPriceRange, onSale } from "@/lib/catalog";

export default function ProductCard({ product }: { product: Product }) {
  const price = fromPrice(product);
  const cheapest = product.variants.find((v) => v.price === price);
  const img = product.images[0];
  return (
    <li className="group relative flex flex-col">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-lilac">
        <Image
          src={img.src}
          alt=""
          fill
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 33vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        {onSale(product) && (
          <span className="absolute left-2 top-2 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-sale">
            Sale
          </span>
        )}
      </div>
      <h3 className="mt-3 font-semibold leading-snug">
        <Link href={`/products/${product.slug}`} className="after:absolute after:inset-0 hover:underline">
          {product.title}
        </Link>
      </h3>
      {product.subtitle && <p className="text-sm text-ink-soft">{product.subtitle}</p>}
      <Price
        price={price}
        compareAt={cheapest?.compareAt}
        from={hasPriceRange(product)}
        className="mt-1 text-[15px]"
      />
    </li>
  );
}
