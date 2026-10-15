import { Star } from "lucide-react";
import { reviews } from "@/lib/reviews";
import { site } from "@/lib/site";

export function ReviewStrip({ limit = 3 }: { limit?: number }) {
  return (
    <section className="bg-cream px-5 py-24">
      <div className="mx-auto max-w-6xl">
        <p className="text-[12px] tracking-[0.3em] text-gold">Google Reviews</p>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 className="font-serif text-4xl font-medium sm:text-5xl">What our clients say</h2>
          <a href={site.googleReviews} className="text-sm text-gold">
            {site.rating} on Google →
          </a>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {reviews.slice(0, limit).map((r) => (
            <blockquote key={r.name + r.service} className="rounded-3xl bg-white p-8 shadow-soft">
              <div className="flex gap-1 text-gold">
                {Array.from({ length: r.stars }).map((_, i) => (
                  <Star key={i} size={14} fill="currentColor" />
                ))}
              </div>
              <p className="mt-5 text-[15px] leading-7 text-ink-soft">“{r.text}”</p>
              <footer className="mt-6 text-sm">
                <strong className="font-medium text-ink">{r.name}</strong>
                <span className="text-ink-soft"> · {r.area} · {r.service}</span>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
