import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Help",
  description: "Answers about Jevonbaby pumping, delivery, warranty, and support.",
};

const faqs = [
  {
    question: "How do I choose the right insert size?",
    answer:
      "The pump includes six inserts from 13mm to 24mm. Start with the size that fits comfortably around your nipple without pinching, then adjust if suction feels uncomfortable.",
  },
  {
    question: "How long does delivery take?",
    answer: "Orders are usually processed in 1–2 business days and delivered in 2–4 days.",
  },
  {
    question: "What is covered by the warranty?",
    answer: "The pump includes a 12-month warranty with 1:1 replacement support if something goes wrong.",
  },
];

export default function HelpPage() {
  return (
    <div className="wrap max-w-3xl py-8 sm:py-12">
      <p className="text-sm font-semibold uppercase tracking-widest text-plum">Support</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight sm:text-5xl">How can we help?</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-soft">
        Helpful answers for choosing, using, and caring for your Jevonbaby pump.
      </p>

      <section id="faqs" aria-labelledby="faq-title" className="scroll-mt-24 mt-12">
        <h2 id="faq-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Frequently asked questions
        </h2>
        <div className="mt-5 divide-y divide-line rounded-3xl bg-white px-5 sm:px-8">
          {faqs.map((faq) => (
            <article key={faq.question} className="py-5">
              <h3 className="font-semibold">{faq.question}</h3>
              <p className="mt-2 text-ink-soft">{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" aria-labelledby="contact-title" className="scroll-mt-24 mt-12 rounded-3xl bg-lilac p-6 sm:p-8">
        <h2 id="contact-title" className="text-2xl font-semibold tracking-tight">
          Contact us
        </h2>
        <p className="mt-2 text-ink-soft">
          Need help with sizing, setup, or an order? We are happy to help.
        </p>
        <a className="btn btn-primary mt-5" href="mailto:hello@jevonbaby.com">
          Email support
        </a>
      </section>

      <section id="story" aria-labelledby="story-title" className="scroll-mt-24 mt-12">
        <h2 id="story-title" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          Our story
        </h2>
        <p className="mt-3 text-ink-soft">
          Jevonbaby makes simple, comfortable pumping essentials for parents who need more flexibility in their
          day. Explore the{" "}
          <Link href="/shop" className="font-semibold text-plum underline-offset-4 hover:underline">
            full collection
          </Link>{" "}
          to find the pump and accessories that suit your routine.
        </p>
      </section>
    </div>
  );
}
