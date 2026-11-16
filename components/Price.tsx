import { money } from "@/lib/catalog";

export default function Price({
  price,
  compareAt,
  from = false,
  className = "",
}: {
  price: number;
  compareAt?: number | null;
  from?: boolean;
  className?: string;
}) {
  return (
    <span className={`inline-flex flex-wrap items-baseline gap-x-2 ${className}`}>
      <span className={compareAt ? "font-semibold text-sale" : "font-semibold"}>
        {from && <span className="font-normal text-ink-soft">From </span>}
        {compareAt ? <span className="sr-only">Sale price </span> : null}
        {money(price)}
      </span>
      {compareAt ? (
        <span className="text-[0.85em] text-ink-soft">
          <span className="sr-only">Regular price </span>
          <s>{money(compareAt)}</s>
        </span>
      ) : null}
    </span>
  );
}
