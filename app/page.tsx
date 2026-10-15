import Image from "next/image";
import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar } from "@/components/TrustBar";
import { ReviewStrip } from "@/components/ReviewStrip";
import { CtaBand } from "@/components/CtaBand";
import { ClientLogos } from "@/components/ClientLogos";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";
import { site } from "@/lib/site";

export default function Home() {
  return (
    <SiteChrome>
      <section className="bg-cream">
        <div className="relative md:min-h-[100svh]">
          <div className="absolute inset-0 hidden md:block">
            <Image
              src="/photos/hero-kitchen.jpg"
              alt=""
              fill
              priority
              quality={90}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-cream/80 via-cream/40 to-cream/15" />
          </div>

          <div className="relative z-10 mx-auto max-w-6xl px-5 pb-10 pt-28 md:grid md:min-h-[100svh] md:grid-cols-[1.15fr_0.85fr] md:items-center md:gap-12 md:pb-16 md:pt-32">
            <div className="text-center md:text-left">
              <p className="font-script text-[36px] leading-none text-gold italic sm:text-5xl">
                Velora
              </p>
              <p className="mt-2 text-[12px] tracking-[0.4em] text-ink-soft md:mt-3 md:text-[13px]">
                — Cleaning Services —
              </p>
              <h1 className="font-serif mt-4 text-[2.15rem] font-semibold leading-[1.08] md:mt-6 md:text-6xl lg:text-7xl">
                Staten Island
                <br />
                Cleaning Services
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-[15px] leading-7 text-ink-soft md:mx-0 md:mt-6 md:text-lg md:leading-8">
                Elevated, eco-friendly cleaning for homes, apartments & offices across
                Staten Island and the greater NYC area.
              </p>
              <div className="mt-8 hidden flex-wrap gap-3 md:flex">
                <Link href="/quote" className="btn-gold">
                  Get a Free Quote
                </Link>
                <Link href="/services" className="btn-ghost">
                  View Services
                </Link>
              </div>
              <div className="mt-8 hidden md:block">
                <TrustBar />
              </div>
            </div>

            <div className="mt-6 text-left md:mt-0">
              <QuoteForm compact />
            </div>

            <div className="mt-8 md:hidden">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[2rem] shadow-card">
                <Image
                  src="/photos/hero-kitchen.jpg"
                  alt="Luxury clean Staten Island kitchen"
                  fill
                  quality={90}
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />

      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="text-[12px] tracking-[0.3em] text-gold">About Velora</p>
              <h2 className="font-serif mt-3 text-4xl font-medium sm:text-5xl">
                Staten Island’s premier luxury cleaning company
              </h2>
              <div className="gold-rule mt-6" />
              <p className="mt-6 text-lg leading-8 text-ink-soft">
                Born and based on Staten Island, we bring hospitality-grade care to every
                home, office, and rental we serve — from St. George to Tottenville and
                across the greater NYC area.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {[
                  ["Premium Quality", "Eco-friendly, top-tier products for a spotless finish."],
                  ["Trusted & Insured", "Fully bonded, licensed, and insured for peace of mind."],
                  ["Client-Focused", "Plans designed around your space and schedule."],
                ].map(([t, d]) => (
                  <div key={t}>
                    <h3 className="font-serif text-xl">{t}</h3>
                    <p className="mt-2 text-sm leading-6 text-ink-soft">{d}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="mt-8 inline-block text-gold">
                Learn More About Us →
              </Link>
            </div>
            <div className="relative min-h-[380px] overflow-hidden rounded-3xl shadow-soft">
              <Image
                src="/photos/residential.jpg"
                alt="A Velora-cleaned home"
                fill
                className="object-cover"
                sizes="50vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream-deep px-5 py-24">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] tracking-[0.3em] text-gold">What We Offer</p>
          <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
            <h2 className="font-serif max-w-xl text-4xl font-medium sm:text-5xl">
              Our Staten Island Cleaning Services
            </h2>
            <Link href="/services" className="text-sm text-gold">
              View All Services →
            </Link>
          </div>
          <p className="mt-4 text-ink-soft">
            Trusted by Staten Island homeowners, businesses, and property professionals
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/${s.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-soft transition duration-300 hover:-translate-y-1 hover:shadow-card"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={s.photo}
                    alt={s.name}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl text-gold">{s.shortName}</h3>
                  <p className="mt-2 text-sm leading-6 text-ink-soft">{s.cardLine}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="text-[12px] tracking-[0.3em] text-gold">Areas We Serve</p>
          <h2 className="font-serif mt-3 text-4xl font-medium sm:text-5xl">
            Cleaning across the NYC area
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-ink-soft">
            Based in Staten Island and serving the entire New York metro — from Manhattan
            high-rises to Brooklyn brownstones and beyond.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-3">
            {areas.map((a) => (
              <Link
                key={a.slug}
                href={`/${a.slug}`}
                className="rounded-full border border-gold/30 bg-white px-6 py-2.5 text-sm shadow-soft hover:border-gold"
              >
                {a.name}
              </Link>
            ))}
          </div>
          <div className="mt-14 grid grid-cols-2 gap-8 sm:grid-cols-4">
            {[
              [site.clients, "Happy clients"],
              [site.jobs, "Cleans completed"],
              [site.rating, "Google rating"],
              ["24/7", "Booking line"],
            ].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-4xl text-gold">{n}</div>
                <div className="mt-1 text-sm text-ink-soft">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ReviewStrip />
      <CtaBand />
    </SiteChrome>
  );
}
