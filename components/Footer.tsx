import Link from "next/link";
import { categories, syncedAt } from "@/lib/catalog";
import { STORE_URL } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="wrap grid gap-8 py-12 sm:grid-cols-3">
        <div>
          <p className="text-lg font-semibold">Jevonbaby</p>
          <p className="mt-2 max-w-xs text-sm text-white/70">Wearable pumping for busy days.</p>
        </div>
        <nav aria-label="Shop">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Shop</p>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/shop#${c.id}`} className="hover:underline">
                  {c.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Help">
          <p className="text-sm font-semibold uppercase tracking-wide text-white/60">Help</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href={`${STORE_URL}/pages/faqs`} className="hover:underline">
                FAQs
              </a>
            </li>
            <li>
              <a href={`${STORE_URL}/pages/contact`} className="hover:underline">
                Contact
              </a>
            </li>
            <li>
              <a href={`${STORE_URL}/pages/about-us`} className="hover:underline">
                Our story
              </a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/15">
        <p className="wrap py-4 text-xs text-white/60">
          Prices in SGD, last synced from the store on {syncedAt}. Checkout is completed on jevonbaby.com.
        </p>
      </div>
    </footer>
  );
}
