// Builds lib/catalog.json from the store's public Shopify product feed.
// Prices, variant ids and photos come from the feed; titles, grouping and
// short descriptions are curated below. Run: npm run sync
import { writeFile } from "node:fs/promises";

const FEED = "https://jevonbaby.com/products.json?limit=250";

const REPLACE_NOTE =
  "Made only for the Jevonbaby wearable pump. BPA-free and safe for UV sterilising.";

/** @type {Array<Record<string, any>>} */
const defs = [
  {
    slug: "wearable-breast-pump",
    from: ["wearable-breast-pump"],
    title: "Jevonbaby Wearable Breast Pump",
    category: "pump",
    optionName: "Choose your set",
    maxImages: 8,
    blurb:
      "A cord-free, hands-free pump that sits inside your bra and collects straight into a bottle or a storage bag.",
    details: [
      "Hospital-grade suction with 3 modes and 9 levels",
      "Pumps directly into a bottle or a ready-to-store milk bag",
      "Six insert sizes in the box: 13, 15, 17, 19, 21 and 24mm",
      "USB-C charging, with auto shut-off after 30 minutes",
    ],
  },
  {
    slug: "breast-milk-storage-bags",
    from: ["breast-milk-storage-bag"],
    title: "Breast Milk Storage Bags",
    subtitle: "30 bags per box",
    category: "feeding",
    optionName: "Pack size",
    blurb:
      "Ready-to-store bags you pump straight into. Screw on the cap, then store or feed with no pouring in between.",
    details: [
      "Horizontal, ready-to-store design",
      "Gamma-ray sterilised",
      "Pump directly into the bag with the bag adapter",
    ],
  },
  {
    slug: "ppsu-bottles",
    from: ["ppsu-bottles"],
    title: "PPSU Bottles",
    subtitle: "2 bottles per box",
    category: "feeding",
    optionName: "Pack size",
    blurb:
      "Pump into it, store in it, then add a teat and feed from it. One bottle for the whole routine.",
    details: [
      "Fits the Jevonbaby pump for direct pumping",
      "Turns into a feeding bottle with the teat",
      "Durable PPSU",
    ],
  },
  {
    slug: "teat-with-cap",
    from: ["teat-with-cap-size-s", "teat-with-cap-size-m"],
    groupName: "Flow",
    groupValues: ["Slow flow, 0+ months", "Medium flow, 3+ months"],
    title: "Teat with Cap",
    subtitle: "2 per box",
    category: "feeding",
    optionName: "Pack size",
    blurb:
      "Soft, BPA-free silicone teats for narrow-neck bottles, with a cap that keeps them clean between feeds.",
    details: ["Narrow neck", "BPA-free silicone", "Cap included"],
  },
  {
    slug: "wide-neck-bottle-adapters",
    from: [
      "jevonbaby-wide-neck-bottle-adapters-type-a",
      "jevonbaby-wide-neck-bottle-adapters-type-p",
    ],
    groupName: "Fits",
    groupValues: ["Philips Avent (Type A)", "Pigeon & MAM (Type P)"],
    title: "Wide-Neck Bottle Adapters",
    subtitle: "2 per box",
    category: "feeding",
    blurb:
      "Connect the pump to the wide-neck bottles you already own and pump straight into them.",
    details: [
      "Type A fits Philips Avent wide-neck bottles",
      "Type P fits Pigeon and MAM wide-neck bottles",
      "No transferring milk between containers",
    ],
  },
  {
    slug: "milk-storage-bag-adapters",
    from: ["milk-storage-bag-adapters"],
    title: "Milk Storage Bag Adapters",
    subtitle: "2 per box",
    category: "feeding",
    blurb: "Lets the pump collect directly into milk storage bags.",
    details: [REPLACE_NOTE],
  },
  {
    slug: "silicone-breast-milk-collector",
    from: ["silicone-breast-milk-collector"],
    title: "Silicone Breast Milk Collector",
    subtitle: "2 per box",
    category: "feeding",
    optionName: "Pack size",
    blurb:
      "A one-piece silicone collector that catches let-down while you feed or pump on the other side.",
    details: ["One-piece silicone design", "Portable and discreet"],
  },
  {
    slug: "funnel-inserts",
    from: [13, 15, 17, 19, 21, 24].map((mm) => `funnel-inserts-2-pieces-${mm}mm`),
    groupName: "Size",
    groupValues: ["13mm", "15mm", "17mm", "19mm", "21mm", "24mm"],
    title: "Funnel Inserts",
    subtitle: "2 per box",
    category: "parts",
    optionName: "Pack size",
    blurb:
      "Soft silicone inserts in six sizes, so the pump fits you comfortably and keeps its suction.",
    details: ["Soft, non-sticky silicone", REPLACE_NOTE],
  },
  {
    slug: "breast-shield",
    from: ["breast-shields"],
    title: "Breast Shield",
    subtitle: "28mm, 1 piece",
    category: "parts",
    blurb: "The 28mm shield that holds your funnel insert in place.",
    details: [REPLACE_NOTE],
  },
  {
    slug: "valves",
    from: ["valves"],
    title: "Valves",
    subtitle: "2 per box",
    category: "parts",
    blurb: "Keeps milk flowing one way, into the bottle or bag, with no backflow.",
    details: [REPLACE_NOTE],
  },
  {
    slug: "diaphragms",
    from: ["diaphragms"],
    title: "Diaphragms",
    subtitle: "2 per box",
    category: "parts",
    blurb: "Seals the pump into a closed system so milk stays away from the motor.",
    details: [REPLACE_NOTE],
  },
  {
    slug: "dust-cover-silicone-flange",
    from: ["dust-cover-silicone-flange"],
    title: "Dust Cover & Silicone Flange",
    subtitle: "24mm",
    category: "parts",
    blurb: "A replacement 24mm flange with a dust cover.",
    details: [REPLACE_NOTE],
  },
  {
    slug: "cleanpod",
    from: ["cleanpod-portable-wash-basin"],
    title: "CleanPod",
    subtitle: "Portable wash basin & storage bag",
    category: "care",
    optionName: "Choose your set",
    blurb:
      "Carries your pump parts closed, then opens into a wash basin so they never touch a shared sink.",
    details: [
      "Compact when closed, expands into a reusable basin",
      "For work, travel, shopping trips and hotels",
    ],
  },
  {
    slug: "travel-bottle-brush",
    from: ["travel-bottle-brush"],
    title: "Travel Bottle Brush",
    category: "care",
    optionName: "Choose your set",
    blurb: "A compact cleaning kit for bottles and pump parts at home, at work or on a trip.",
    details: ["Fits in a pumping or baby bag"],
  },
  {
    slug: "hot-cold-therapy-pads",
    from: ["breast-relief-hot-cold-therapy-pads-2-pieces"],
    title: "Hot & Cold Therapy Pads",
    subtitle: "2 per box",
    category: "care",
    optionName: "Pack size",
    blurb: "Use cold to ease swelling and engorgement, or warm before a session to help let-down.",
    details: ["Reusable, for hot or cold use"],
  },
];

const cents = (s) => (s == null ? null : Math.round(parseFloat(s) * 100));
const tidy = (s) => s.replace(/\s+/g, " ").trim();

function variantLabel(slug, title) {
  const t = tidy(title);
  if (t === "Default Title") return { label: "" };
  if (slug === "wearable-breast-pump") {
    const m = t.match(/^(.+?) \((.+)\)$/);
    if (m) return { label: m[1], note: m[2].replace(/^Free /, "Includes free ") };
  }
  const i = t.indexOf(": ");
  if (i > 0) return { label: t.slice(0, i), note: t.slice(i + 2) };
  return { label: t };
}

const res = await fetch(FEED, { headers: { "user-agent": "Mozilla/5.0" } });
if (!res.ok) throw new Error(`Feed returned ${res.status}`);
const feed = (await res.json()).products;
const byHandle = new Map(feed.map((p) => [p.handle, p]));

const products = defs.map((def) => {
  const { from, maxImages = 5, groupName, groupValues, ...rest } = def;
  const sources = from.map((h) => {
    const p = byHandle.get(h);
    if (!p) throw new Error(`Missing product in feed: ${h}`);
    return p;
  });
  const grouped = sources.length > 1;
  const images = [];
  const variants = [];
  sources.forEach((p, si) => {
    const group = grouped ? groupValues[si] : undefined;
    p.images.slice(0, grouped ? 2 : maxImages).forEach((img) => {
      images.push({ src: img.src, width: img.width, height: img.height, group });
    });
    for (const v of p.variants) {
      const price = cents(v.price);
      const compareAt = cents(v.compare_at_price);
      variants.push({
        id: String(v.id),
        ...variantLabel(def.slug, v.title),
        group,
        price,
        compareAt: compareAt && compareAt > price ? compareAt : null,
        available: v.available,
      });
    }
  });
  return {
    ...rest,
    groupName: grouped ? groupName : undefined,
    groupValues: grouped ? groupValues : undefined,
    images,
    variants,
  };
});

const out = { syncedAt: new Date().toISOString().slice(0, 10), products };
await writeFile(new URL("../lib/catalog.json", import.meta.url), JSON.stringify(out, null, 1) + "\n");
console.log(`Wrote ${products.length} products from ${feed.length} feed items.`);
