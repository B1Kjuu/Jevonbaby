import Image from "next/image";
import Link from "next/link";
import CartButton from "./CartButton";
import { LOGO_URL } from "@/lib/site";
import { PUMP_SLUG } from "@/lib/catalog";

export default function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur">
      <div className="wrap flex h-16 items-center gap-2 sm:gap-6">
        <Link href="/" className="shrink-0" aria-label="Jevonbaby home">
          <Image src={LOGO_URL} alt="Jevonbaby" width={160} height={33} unoptimized priority className="h-5 w-auto sm:h-7" />
        </Link>
        <nav aria-label="Main" className="ml-auto flex items-center text-[15px] font-medium sm:gap-2">
          <Link href={`/products/${PUMP_SLUG}`} className="rounded-full px-2.5 py-2 hover:bg-lilac sm:px-3">
            The pump
          </Link>
          <Link href="/shop" className="rounded-full px-2.5 py-2 hover:bg-lilac sm:px-3">
            Shop
          </Link>
        </nav>
        <CartButton />
      </div>
    </header>
  );
}
