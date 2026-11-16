"use client";

import { useSyncExternalStore } from "react";
import { findVariant } from "@/lib/catalog";

export type Line = { id: string; qty: number };
type State = { lines: Line[]; open: boolean };

const KEY = "jevonbaby-cart-v1";
const SERVER: State = { lines: [], open: false };
export const MAX_QTY = 20;

let state: State = SERVER;
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) ?? "[]") as Line[];
    const lines = raw.filter((l) => findVariant(l.id) && Number.isInteger(l.qty) && l.qty > 0);
    if (lines.length) state = { ...state, lines };
  } catch {
    // unreadable storage: start with an empty cart
  }
}

function set(next: State) {
  state = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(state.lines));
  } catch {
    // storage unavailable: the cart lasts for this page view only
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function snapshot() {
  load();
  return state;
}

export function useCart() {
  return useSyncExternalStore(subscribe, snapshot, () => SERVER);
}

export const cart = {
  add(id: string, qty = 1) {
    load();
    const found = state.lines.find((l) => l.id === id);
    const lines = found
      ? state.lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
      : [...state.lines, { id, qty: Math.min(MAX_QTY, qty) }];
    set({ lines, open: true });
  },
  setQty(id: string, qty: number) {
    const lines =
      qty <= 0
        ? state.lines.filter((l) => l.id !== id)
        : state.lines.map((l) => (l.id === id ? { ...l, qty: Math.min(MAX_QTY, qty) } : l));
    set({ ...state, lines });
  },
  open: () => set({ ...state, open: true }),
  close: () => {
    if (state.open) set({ ...state, open: false });
  },
};

export function summarise(lines: Line[]) {
  let count = 0;
  let total = 0;
  let saved = 0;
  for (const l of lines) {
    const hit = findVariant(l.id);
    if (!hit) continue;
    count += l.qty;
    total += hit.variant.price * l.qty;
    if (hit.variant.compareAt) saved += (hit.variant.compareAt - hit.variant.price) * l.qty;
  }
  return { count, total, saved };
}

// Shopify cart permalink: opens the store's own cart with these items in it.
export function checkoutUrl(lines: Line[]) {
  return `https://jevonbaby.com/cart/${lines.map((l) => `${l.id}:${l.qty}`).join(",")}`;
}
