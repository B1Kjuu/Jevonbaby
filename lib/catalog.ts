import data from "./catalog.json";

export type CategoryId = "pump" | "feeding" | "parts" | "care";

export type ProductImage = { src: string; width: number; height: number; group?: string };

export type Variant = {
  id: string;
  label: string;
  note?: string;
  group?: string;
  price: number;
  compareAt: number | null;
  available: boolean;
};

export type Product = {
  slug: string;
  title: string;
  subtitle?: string;
  category: CategoryId;
  optionName?: string;
  blurb: string;
  details: string[];
  groupName?: string;
  groupValues?: string[];
  images: ProductImage[];
  variants: Variant[];
};

export const products = data.products as Product[];
export const syncedAt = data.syncedAt;

export const categories: { id: CategoryId; title: string; intro: string }[] = [
  { id: "pump", title: "The pump", intro: "Everything you need to start, in one box." },
  { id: "feeding", title: "Feeding & storage", intro: "Bottles, bags and adapters for pumping straight into storage." },
  { id: "parts", title: "Pump parts", intro: "Replacement parts and extra insert sizes." },
  { id: "care", title: "Care & cleaning", intro: "For washing up and feeling comfortable, at home or away." },
];

export const PUMP_SLUG = "wearable-breast-pump";

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function fromPrice(p: Product) {
  return Math.min(...p.variants.map((v) => v.price));
}

export function hasPriceRange(p: Product) {
  return new Set(p.variants.map((v) => v.price)).size > 1;
}

export function onSale(p: Product) {
  return p.variants.some((v) => v.compareAt);
}

const variantIndex = new Map(
  products.flatMap((p) => p.variants.map((v) => [v.id, { product: p, variant: v }] as const)),
);

export function findVariant(id: string) {
  return variantIndex.get(id);
}

export function variantName(v: Variant) {
  return [v.group, v.label].filter(Boolean).join(" · ");
}

export function money(cents: number) {
  return `S$${(cents / 100).toFixed(2)}`;
}
