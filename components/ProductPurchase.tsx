"use client";

import Image from "next/image";
import { useState } from "react";
import Price from "./Price";
import Quantity from "./Quantity";
import { cart } from "./cart-store";
import { type Product, money } from "@/lib/catalog";

const optionCard =
  "block cursor-pointer rounded-2xl border-[1.5px] border-line bg-white px-4 py-3 transition-colors hover:border-plum peer-checked:border-plum peer-checked:bg-lilac peer-focus-visible:outline-3 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-plum";

export default function ProductPurchase({
  product,
  children,
}: {
  product: Product;
  children?: React.ReactNode;
}) {
  const [group, setGroup] = useState(product.groupValues?.[0]);
  const [pick, setPick] = useState(0);
  const [qty, setQty] = useState(1);
  const [shot, setShot] = useState(0);

  const variants = product.variants.filter((v) => v.group === group);
  const variant = variants[Math.min(pick, variants.length - 1)];
  const images = product.images.filter((i) => i.group === group);
  const main = images[Math.min(shot, images.length - 1)];

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-3xl bg-lilac">
          <Image
            key={main.src}
            src={main.src}
            alt={`${product.title}${group ? `, ${group}` : ""}, photo ${shot + 1} of ${images.length}`}
            fill
            priority
            sizes="(min-width: 1024px) 540px, 100vw"
            className="object-cover"
          />
        </div>
        {images.length > 1 && (
          <ul className="mt-3 flex gap-2 overflow-x-auto p-1" aria-label="Product photos">
            {images.map((img, i) => (
              <li key={img.src} className="shrink-0">
                <button
                  type="button"
                  onClick={() => setShot(i)}
                  aria-label={`Show photo ${i + 1}`}
                  aria-current={i === shot}
                  className={`block overflow-hidden rounded-xl border-2 ${i === shot ? "border-plum" : "border-transparent"}`}
                >
                  <Image src={img.src} alt="" width={64} height={64} className="h-16 w-16 bg-lilac object-cover" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div>
        {children}
        <p className="mt-4 text-2xl" aria-live="polite">
          <Price price={variant.price} compareAt={variant.compareAt} />
        </p>
        {variant.compareAt && (
          <p className="text-sm text-sale">You save {money(variant.compareAt - variant.price)}</p>
        )}

        <form
          className="mt-6 space-y-6"
          onSubmit={(e) => {
            e.preventDefault();
            cart.add(variant.id, qty);
            setQty(1);
          }}
        >
          {product.groupValues && (
            <fieldset>
              <legend className="mb-2 font-semibold">{product.groupName}</legend>
              <div className="flex flex-wrap gap-2">
                {product.groupValues.map((g) => (
                  <label key={g}>
                    <input
                      type="radio"
                      name="group"
                      className="peer sr-only"
                      checked={g === group}
                      onChange={() => {
                        setGroup(g);
                        setShot(0);
                      }}
                    />
                    <span className={`${optionCard} rounded-full! py-2.5 font-medium`}>{g}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          {variants.length > 1 && (
            <fieldset>
              <legend className="mb-2 font-semibold">{product.optionName ?? "Options"}</legend>
              <div className="space-y-2">
                {variants.map((v, i) => (
                  <label key={v.id} className="block">
                    <input
                      type="radio"
                      name="variant"
                      className="peer sr-only"
                      checked={v.id === variant.id}
                      onChange={() => setPick(i)}
                    />
                    <span className={`${optionCard} flex items-start justify-between gap-4`}>
                      <span>
                        <span className="block font-semibold">{v.label}</span>
                        {v.note && <span className="block text-sm text-ink-soft">{v.note}</span>}
                      </span>
                      <Price price={v.price} compareAt={v.compareAt} className="shrink-0 justify-end text-right" />
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="flex flex-wrap items-center gap-3">
            <Quantity value={qty} onChange={setQty} label="Quantity" />
            <button type="submit" className="btn btn-primary min-w-48 flex-1" disabled={!variant.available}>
              {variant.available ? `Add to cart · ${money(variant.price * qty)}` : "Sold out"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
