import Image from "next/image";
import { SiteChrome } from "@/components/SiteChrome";
import { CtaBand } from "@/components/CtaBand";
import { HeroBand } from "@/components/HeroBand";
import { ClientLogos } from "@/components/ClientLogos";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Velora",
  description: "Staten Island’s luxury cleaning company — licensed, insured, hospitality-grade.",
};

export default function AboutPage() {
  return (
    <SiteChrome>
      <HeroBand src="/photos/hero-kitchen.jpg" alt="Velora luxury kitchen clean">
        <div className="mx-auto max-w-3xl">
          <p className="text-[12px] tracking-[0.2em] uppercase text-gold">About us</p>
          <h1 className="font-serif mt-3 text-5xl">Where passion meets precision</h1>
          <p className="mt-5 text-lg text-cream/75">
            Luxury-grade cleaning for spaces that deserve the very best — born and based on Staten Island.
          </p>
        </div>
      </HeroBand>
      <section className="bg-cream px-5 py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
          <div className="relative min-h-[320px] overflow-hidden rounded-3xl shadow-soft">
            <Image
              src="/photos/residential.jpg"
              alt="Residential cleaning by Velora"
              fill
              className="object-cover"
              sizes="50vw"
            />
          </div>
          <div className="leading-8 text-ink-soft">
            <p>
              Velora Cleaning Services started with a simple belief: every space should feel like a
              sanctuary. What began as a one-person operation is now the crew homeowners, hosts, and
              contractors call when a generic maid service will not cut it.
            </p>
            <p className="mt-6">
              We fill the gap between cheap and careless, and hotel-level care. Post-construction,
              Airbnb turnovers, move-outs, and recurring homes all get the same standard — because
              one sloppy job costs more than the invoice.
            </p>
            <div className="mt-12 grid grid-cols-2 gap-6 text-ink">
              {[
                [site.clients, "Happy clients"],
                [site.jobs, "Cleans completed"],
                ["5★", "Average rating"],
                ["100%", "Satisfaction"],
              ].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-3xl">{n}</div>
                  <div className="mt-1 text-sm text-ink-soft">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <ClientLogos />
      <CtaBand />
    </SiteChrome>
  );
}
