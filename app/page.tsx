import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import Testimonials from "@/components/Testimonials";
import { PUMP_SLUG, fromPrice, getProduct, money, products } from "@/lib/catalog";
import { HERO_IMAGE, PUMP_REVIEW_COUNT, inTheBox, promises } from "@/lib/site";

const features = [
  { title: "Hands-free and cordless", text: "It sits inside your bra, with no tubes and no wall socket." },
  { title: "Straight into storage", text: "Collect into a bottle or a milk bag. Cap it and it is ready for the fridge." },
  { title: "Hospital-grade suction", text: "Three modes and nine levels, so you can find what works for you." },
  { title: "Six sizes in the box", text: "Soft silicone inserts from 13mm to 24mm for a comfortable fit." },
  { title: "Quiet and slim", text: "A low-profile shape and a quiet motor for pumping around other people." },
  { title: "Charges by USB-C", text: "Up to 5–6 sessions per charge, with auto shut-off after 30 minutes." },
];

const steps = [
  { title: "Pick your size", text: "Choose the insert that fits you from the six in the box." },
  { title: "Wear it and start", text: "Slip the pump into your bra, then pick massage, stimulation or expression." },
  { title: "Cap and store", text: "Milk goes straight into the bottle or bag. Cap it and carry on with your day." },
];

export default function Home() {
  const pump = getProduct(PUMP_SLUG)!;
  const pumpHref = `/products/${PUMP_SLUG}`;
  const essentials = ["breast-milk-storage-bags", "ppsu-bottles", "cleanpod", "funnel-inserts"].map(
    (slug) => products.find((p) => p.slug === slug)!,
  );

  return (
    <>
      <section className="bg-lilac">
        <div className="wrap grid items-center gap-8 py-10 md:grid-cols-2 md:py-16">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-plum">Wearable breast pump</p>
            <h1 className="mt-3 text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              Pump on your terms.
            </h1>
            <p className="mt-4 max-w-md text-lg text-ink-soft">
              A cord-free pump that slips into your bra and collects straight into a bottle or storage bag, so
              pumping fits around your day.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link href={pumpHref} className="btn btn-primary">
                Shop the pump · from {money(fromPrice(pump))}
              </Link>
              <a href="#how" className="btn btn-ghost">
                How it works
              </a>
            </div>
            <p className="mt-5 text-sm text-ink-soft">
              {PUMP_REVIEW_COUNT} customer reviews · 12-month warranty · Delivery in 2–4 days
            </p>
          </div>
          <div className="relative mx-auto aspect-square w-full max-w-md md:max-w-none">
            <Image
              src={HERO_IMAGE}
              alt="The Jevonbaby wearable breast pump"
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-contain"
            />
          </div>
        </div>
      </section>

      <section className="wrap py-14 sm:py-20" aria-labelledby="why">
        <h2 id="why" className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
          Made for days that do not stop for pumping
        </h2>
        <ul className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="border-t-2 border-lilac-deep pt-4">
              <h3 className="text-lg font-semibold">{f.title}</h3>
              <p className="mt-1 text-ink-soft">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section id="how" className="bg-white py-14 sm:py-20" aria-labelledby="how-title">
        <div className="wrap">
          <h2 id="how-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-3xl bg-lilac p-6">
                <span
                  aria-hidden="true"
                  className="grid h-10 w-10 place-items-center rounded-full bg-plum font-semibold text-white"
                >
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-ink-soft">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wrap py-14 sm:py-20" aria-labelledby="box">
        <div className="grid items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative aspect-square overflow-hidden rounded-3xl bg-lilac">
            <Image
              src={pump.images[0].src}
              alt="Everything included with the Jevonbaby pump"
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <h2 id="box" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Everything in one box
            </h2>
            <ul className="mt-5 grid gap-x-6 gap-y-2 text-ink-soft sm:grid-cols-2">
              {inTheBox.map((item) => (
                <li key={item} className="flex gap-2">
                  <span aria-hidden="true" className="text-plum">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link href={pumpHref} className="btn btn-primary mt-7">
              See the pump
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-lilac py-14 sm:py-20" aria-labelledby="reviews">
        <div className="wrap">
          <h2 id="reviews" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            What mums say
          </h2>
          <div className="mt-8">
            <Testimonials />
          </div>
        </div>
      </section>

      <section className="wrap py-14 sm:py-20" aria-labelledby="essentials">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <h2 id="essentials" className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Add the essentials
          </h2>
          <Link href="/shop" className="font-semibold text-plum underline-offset-4 hover:underline">
            Shop everything
          </Link>
        </div>
        <ul className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
          {essentials.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </ul>
      </section>

      <section className="wrap" aria-label="Our promises">
        <ul className="grid gap-4 rounded-3xl bg-white p-6 sm:grid-cols-3 sm:p-8">
          {promises.map((p) => (
            <li key={p.title}>
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm text-ink-soft">{p.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
