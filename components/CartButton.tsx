"use client";

import { cart, summarise, useCart } from "./cart-store";

export default function CartButton() {
  const { lines } = useCart();
  const { count } = summarise(lines);
  return (
    <button
      type="button"
      onClick={cart.open}
      className="inline-flex h-11 shrink-0 items-center gap-2 rounded-full bg-ink px-3.5 text-[15px] font-medium text-white hover:bg-plum-dark sm:px-4"
      aria-label={`Open cart, ${count} ${count === 1 ? "item" : "items"}`}
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 8h12l-1 12H7L6 8Z" />
        <path d="M9 8V6a3 3 0 0 1 6 0v2" />
      </svg>
      <span aria-hidden="true" className="hidden sm:inline">
        Cart
      </span>
      <span
        aria-hidden="true"
        className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1 text-xs font-semibold text-ink"
      >
        {count}
      </span>
    </button>
  );
}
