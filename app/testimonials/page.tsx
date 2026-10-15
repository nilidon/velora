import { SiteChrome } from "@/components/SiteChrome";
import { ReviewStrip } from "@/components/ReviewStrip";
import { CtaBand } from "@/components/CtaBand";
import { HeroBand } from "@/components/HeroBand";

export const metadata = {
  title: "Reviews",
  description: "What Staten Island homeowners, hosts, and contractors say about Velora.",
};

export default function TestimonialsPage() {
  return (
    <SiteChrome>
      <HeroBand src="/photos/residential.jpg" alt="A Velora-cleaned home">
        <div className="mx-auto max-w-3xl">
          <p className="text-[12px] tracking-[0.3em] text-gold">Google Reviews</p>
          <h1 className="font-serif mt-3 text-5xl font-semibold">What our clients say</h1>
          <p className="mt-4 text-lg text-ink-soft">
            Real reviews from Staten Island homeowners, hosts, and contractors.
          </p>
        </div>
      </HeroBand>
      <ReviewStrip limit={6} />
      <CtaBand />
    </SiteChrome>
  );
}
