"use client";

import Image from "next/image";
import Link from "next/link";
import Quantity from "./Quantity";
import { cart, checkoutUrl, summarise, useCart } from "./cart-store";
import { findVariant, money, variantName } from "@/lib/catalog";

export default function CartContents({ onNavigate }: { onNavigate?: () => void }) {
  const { lines } = useCart();
  const { total, saved } = summarise(lines);

  if (lines.length === 0) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-4 py-12 text-center">
        <p className="text-lg font-semibold">Your cart is empty</p>
        <p className="max-w-xs text-ink-soft">Start with the pump, or pick up parts and accessories.</p>
        <Link href="/shop" onClick={onNavigate} className="btn btn-primary">
          Browse the shop
        </Link>
      </div>
    );
  }

  return (
    <>
      <ul className="flex-1 divide-y divide-line overflow-y-auto">
        {lines.map((line) => {
          const hit = findVariant(line.id);
          if (!hit) return null;
          const { product, variant } = hit;
          const img = product.images.find((i) => !i.group || i.group === variant.group) ?? product.images[0];
          const name = variantName(variant);
          return (
            <li key={line.id} className="flex gap-3 py-4">
              <Image
                src={img.src}
                alt=""
                width={80}
                height={80}
                className="h-20 w-20 shrink-0 rounded-xl bg-lilac object-cover"
              />
              <div className="min-w-0 flex-1">
                <Link
                  href={`/products/${product.slug}`}
                  onClick={onNavigate}
                  className="font-semibold leading-snug hover:underline"
                >
                  {product.title}
                </Link>
                {name && <p className="text-sm text-ink-soft">{name}</p>}
                <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                  <Quantity
                    value={line.qty}
                    min={0}
                    onChange={(n) => cart.setQty(line.id, n)}
                    label={`Quantity for ${product.title}${name ? `, ${name}` : ""}`}
                  />
                  <p className="font-semibold tabular-nums">{money(variant.price * line.qty)}</p>
                </div>
                <button
                  type="button"
                  onClick={() => cart.setQty(line.id, 0)}
                  className="mt-1 py-1 text-sm text-ink-soft underline hover:text-ink"
                >
                  Remove<span className="sr-only"> {product.title}</span>
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <div className="border-t border-line pt-4">
        {saved > 0 && (
          <p className="flex justify-between text-sm text-sale">
            <span>You save</span>
            <span className="tabular-nums">{money(saved)}</span>
          </p>
        )}
        <p className="flex justify-between text-lg font-semibold">
          <span>Subtotal</span>
          <span className="tabular-nums">{money(total)}</span>
        </p>
        <p className="mt-1 text-sm text-ink-soft">Shipping and final price are confirmed at checkout.</p>
        <a href={checkoutUrl(lines)} className="btn btn-primary mt-4 w-full">
          Checkout on jevonbaby.com
        </a>
      </div>
    </>
  );
}
