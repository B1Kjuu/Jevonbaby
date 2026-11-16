// Shopify's CDN resizes and re-encodes images when given a width.
export default function shopifyLoader({ src, width }: { src: string; width: number }) {
  if (!src.startsWith("http")) return src;
  const url = new URL(src);
  url.searchParams.set("width", String(width));
  return url.toString();
}
