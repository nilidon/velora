import { SiteChrome } from "@/components/SiteChrome";
import { QuoteForm } from "@/components/QuoteForm";
import { HeroBand } from "@/components/HeroBand";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact",
  description: "Call, text, or request a quote. Velora responds within 15 minutes.",
};

export default function ContactPage() {
  return (
    <SiteChrome>
      <HeroBand src="/photos/hero-kitchen.jpg" alt="Contact Velora Cleaning">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[12px] tracking-[0.3em] text-gold">Get in touch</p>
            <h1 className="font-serif mt-3 text-5xl font-semibold">Call, text, or send the form</h1>
            <div className="mt-8 space-y-5 text-ink">
              <p>
                <span className="block text-xs uppercase tracking-widest text-gold">Phone</span>
                <a href={site.phoneHref} className="text-2xl text-ink">
                  {site.phone}
                </a>
              </p>
              <p>
                <span className="block text-xs uppercase tracking-widest text-gold">Hours</span>
                {site.hours}
              </p>
              <p>
                <span className="block text-xs uppercase tracking-widest text-gold">Studio</span>
                {site.address}
              </p>
            </div>
          </div>
          <QuoteForm tone="dark" />
        </div>
      </HeroBand>
    </SiteChrome>
  );
}
