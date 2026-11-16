# Jevonbaby storefront rebuild

A lighter, clearer storefront for [jevonbaby.com](https://jevonbaby.com), built with Next.js (App Router), TypeScript and Tailwind CSS.

## What it does

- **Home** leads straight to the wearable pump, then explains it in a few short sections.
- **Shop** groups the catalogue into the pump, feeding and storage, pump parts, and care.
- **Product pages** have a photo gallery, clear set and pack choices, and one add-to-cart button. The six funnel-insert sizes are one product with a size picker instead of six listings.
- **Cart** is a slide-in drawer (and a `/cart` page) stored in the browser. Checkout hands over to the store's own Shopify cart with the chosen items.

## Data

There is no backend. `npm run sync` reads the store's public product feed and writes `lib/catalog.json` (prices, variant ids, photo addresses). Titles, grouping and short descriptions are curated in `scripts/sync-catalog.mjs`. Photos are served from the store's Shopify CDN at the size each layout needs.

Prices are a snapshot from the last sync; the final price is whatever the store's checkout shows.

## Run it

```bash
npm install
npm run dev
```

Checks: `npm run lint`, `npm run typecheck`, `npm run build`.
