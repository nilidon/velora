import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Check } from "lucide-react";
import { SiteChrome } from "@/components/SiteChrome";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar } from "@/components/TrustBar";
import { ReviewStrip } from "@/components/ReviewStrip";
import { CtaBand } from "@/components/CtaBand";
import { HeroBand } from "@/components/HeroBand";
import { getService, services } from "@/lib/services";
import { getArea, areas } from "@/lib/areas";
import { formatMoney } from "@/lib/estimate";
import { neighborhoods } from "@/lib/site";

export function generateStaticParams() {
  return [...services, ...areas].map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  const area = getArea(slug);
  if (service) {
    return { title: service.seoTitle, description: service.seoDescription };
  }
  if (area) {
    return { title: area.seoTitle, description: area.seoDescription };
  }
  return {};
}

export default async function SlugPage({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  const area = getArea(slug);
  if (service) return <ServicePage service={service} />;
  if (area) return <AreaPage area={area} />;
  notFound();
}

function ServicePage({ service }: { service: NonNullable<ReturnType<typeof getService>> }) {
  return (
    <SiteChrome>
      <HeroBand src={service.photo} alt={service.name}>
        <div className="mx-auto grid max-w-6xl items-start gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className="text-[12px] tracking-[0.3em] text-gold">
              {service.eyebrow} · Staten Island & NYC
            </p>
            <h1 className="font-serif mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              {service.headline}
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-ink-soft">{service.subhead}</p>
            <p className="font-serif mt-6 text-3xl text-gold">
              From {formatMoney(service.startingAt)}
            </p>
            <div className="mt-8">
              <TrustBar />
            </div>
            <ul className="mt-8 space-y-2.5 text-sm text-ink">
              {service.includes.slice(0, 4).map((item) => (
                <li key={item} className="flex gap-2">
                  <Check size={16} className="mt-0.5 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <QuoteForm defaultService={service.slug} compact />
        </div>
      </HeroBand>

      <section className="bg-cream px-5 py-24">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-2">
          <div>
            <p className="text-[12px] tracking-[0.3em] text-gold">What’s included</p>
            <h2 className="font-serif mt-3 text-4xl font-medium">The Velora standard</h2>
            <div className="gold-rule mt-5" />
            <ul className="mt-8 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 border-b border-gold/15 py-3">
                  <Check size={18} className="text-gold" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-5">
            {service.checklist.map((block) => (
              <div key={block.title} className="rounded-3xl bg-white p-7 shadow-soft">
                <h3 className="font-serif text-2xl">{block.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-ink-soft">
                  {block.items.map((item) => (
                    <li key={item}>— {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream-deep px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-[12px] tracking-[0.3em] text-gold">Ideal for</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {service.idealFor.map((item) => (
              <span key={item} className="rounded-full bg-white px-5 py-2 text-sm shadow-soft">
                {item}
              </span>
            ))}
          </div>
          <p className="mt-12 text-[12px] tracking-[0.3em] text-gold">Neighborhoods</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-soft">
            {neighborhoods.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className="font-serif text-4xl font-medium">Common questions</h2>
          <div className="mt-8 space-y-4">
            {service.faqs.map((f) => (
              <details key={f.q} className="rounded-2xl bg-white p-6 shadow-soft">
                <summary className="cursor-pointer font-medium">{f.q}</summary>
                <p className="mt-3 text-sm leading-7 text-ink-soft">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-medium">Explore other services</h2>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {services
              .filter((s) => s.slug !== service.slug)
              .slice(0, 4)
              .map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="group overflow-hidden rounded-3xl bg-white shadow-soft hover:shadow-card"
                >
                  <div className="relative h-32">
                    <Image src={s.photo} alt={s.name} fill className="object-cover" sizes="25vw" />
                  </div>
                  <span className="block px-4 py-4 font-serif text-lg">{s.shortName}</span>
                </Link>
              ))}
          </div>
        </div>
      </section>
      <ReviewStrip />
      <CtaBand />
    </SiteChrome>
  );
}

function AreaPage({ area }: { area: NonNullable<ReturnType<typeof getArea>> }) {
  return (
    <SiteChrome>
      <HeroBand src="/photos/hero-kitchen.jpg" alt={`Cleaning services in ${area.name}`}>
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[12px] tracking-[0.3em] text-gold">NYC</p>
            <h1 className="font-serif mt-3 text-5xl font-semibold">{area.headline}</h1>
            <p className="mt-5 text-lg leading-8 text-ink-soft">{area.subhead}</p>
            <div className="mt-8">
              <TrustBar />
            </div>
          </div>
          <QuoteForm compact />
        </div>
      </HeroBand>
      <section className="bg-cream px-5 py-20">
        <div className="mx-auto max-w-6xl">
          <p className="max-w-2xl leading-7 text-ink-soft">{area.blurb}</p>
          <h2 className="font-serif mt-10 text-3xl">Neighborhoods we serve</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {area.neighborhoods.map((n) => (
              <span key={n} className="rounded-full bg-white px-5 py-2 text-sm shadow-soft">
                {n}
              </span>
            ))}
          </div>
          <h2 className="font-serif mt-14 text-3xl">Services available in {area.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.slice(0, 6).map((s) => (
              <Link key={s.slug} href={`/${s.slug}`} className="overflow-hidden rounded-3xl bg-white shadow-soft hover:shadow-card">
                <div className="relative h-36">
                  <Image src={s.photo} alt={s.name} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h3 className="font-serif text-xl text-gold">{s.shortName}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{s.cardLine}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </SiteChrome>
  );
}
