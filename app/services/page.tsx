import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { CtaBand } from "@/components/CtaBand";
import { HeroBand } from "@/components/HeroBand";
import { services } from "@/lib/services";
import { formatMoney } from "@/lib/estimate";

export const metadata = {
  title: "Staten Island Cleaning Services",
  description:
    "Airbnb turnovers, recurring house cleaning, move-outs, post-construction, and more across Staten Island and NYC.",
};

export default function ServicesPage() {
  return (
    <SiteChrome>
      <HeroBand src="/photos/hero-kitchen.jpg" alt="Velora cleaning services">
        <div className="mx-auto max-w-3xl">
          <p className="text-[12px] tracking-[0.3em] text-gold">What We Offer</p>
          <h1 className="font-serif mt-4 text-5xl font-semibold">
            Staten Island Cleaning Services
          </h1>
          <p className="mt-5 text-lg leading-8 text-ink-soft">
            A complete suite of luxury-grade cleaning — tailored to homes, businesses, and rentals.
          </p>
        </div>
      </HeroBand>
      <section className="bg-cream px-5 py-20">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          {services.map((s) => (
            <article key={s.slug} className="overflow-hidden rounded-3xl bg-white shadow-soft">
              <div className="relative h-56">
                <Image src={s.photo} alt={s.name} fill className="object-cover" sizes="50vw" />
              </div>
              <div className="p-8">
                <p className="text-[12px] tracking-[0.2em] text-gold">
                  From {formatMoney(s.startingAt)}
                </p>
                <h2 className="font-serif mt-2 text-3xl">{s.name}</h2>
                <p className="mt-3 leading-7 text-ink-soft">{s.subhead}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <Link href={`/${s.slug}`} className="btn-gold !px-5 !py-2.5 text-sm">
                    Learn More
                  </Link>
                  <Link href={`/quote?service=${s.slug}`} className="btn-ghost !px-5 !py-2.5 text-sm">
                    Request a Quote
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand />
    </SiteChrome>
  );
}
