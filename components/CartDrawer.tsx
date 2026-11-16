"use client";

import { useEffect, useRef } from "react";
import CartContents from "./CartContents";
import { cart, summarise, useCart } from "./cart-store";

export default function CartDrawer() {
  const { open, lines } = useCart();
  const ref = useRef<HTMLDialogElement>(null);
  const { count } = summarise(lines);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
  }, [open]);

  return (
    <dialog
      ref={ref}
      className="cart-drawer"
      aria-labelledby="cart-title"
      onClose={cart.close}
      onClick={(e) => {
        if (e.target === ref.current) cart.close();
      }}
    >
      <div className="flex h-full flex-col p-5">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h2 id="cart-title" className="text-xl font-semibold">
            Your cart {count > 0 && <span className="font-normal text-ink-soft">({count})</span>}
          </h2>
          <button
            type="button"
            onClick={cart.close}
            className="grid h-11 w-11 place-items-center rounded-full hover:bg-lilac"
            aria-label="Close cart"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
        <CartContents onNavigate={cart.close} />
      </div>
    </dialog>
  );
}
