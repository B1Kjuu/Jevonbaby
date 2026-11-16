import { testimonials } from "@/lib/site";

export default function Testimonials() {
  return (
    <ul className="grid gap-4 md:grid-cols-3">
      {testimonials.map((t) => (
        <li key={t.name}>
          <figure className="flex h-full flex-col rounded-3xl border border-line bg-white p-6">
            <p className="font-semibold">{t.title}</p>
            <blockquote className="mt-2 flex-1 text-ink-soft">“{t.quote}”</blockquote>
            <figcaption className="mt-4 text-sm font-medium">
              {t.name}, {t.place}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}
