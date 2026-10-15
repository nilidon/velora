import { SiteChrome } from "@/components/SiteChrome";
import { QuoteForm } from "@/components/QuoteForm";
import { TrustBar } from "@/components/TrustBar";
import { HeroBand } from "@/components/HeroBand";
import { getService } from "@/lib/services";

export const metadata = {
  title: "Request a Quote",
  description: "Get an instant cleaning price range and a callback within 15 minutes.",
};

export default async function QuotePage({
  searchParams,
}: {
  searchParams: Promise<{ service?: string }>;
}) {
  const { service } = await searchParams;
  const matched = service ? getService(service) : undefined;
  return (
    <SiteChrome>
      <HeroBand
        src={matched?.photo || "/photos/hero-kitchen.jpg"}
        alt={matched?.name || "Request a Velora quote"}
      >
        <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-2">
          <div>
            <p className="text-[12px] tracking-[0.3em] text-gold">Free estimate</p>
            <h1 className="font-serif mt-3 text-5xl font-semibold">See your range. Book the slot.</h1>
            <p className="mt-5 text-lg text-ink-soft">
              Two steps. We call you with a firm number.
            </p>
            <div className="mt-8">
              <TrustBar />
            </div>
          </div>
          <QuoteForm defaultService={service || ""} tone="dark" />
        </div>
      </HeroBand>
    </SiteChrome>
  );
}
