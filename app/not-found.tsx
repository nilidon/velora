import Link from "next/link";
import { SiteChrome } from "@/components/SiteChrome";
import { HeroBand } from "@/components/HeroBand";

export default function NotFound() {
  return (
    <SiteChrome>
      <HeroBand src="/photos/hero-kitchen.jpg" alt="Velora kitchen">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="font-serif text-5xl font-semibold">That page is gone</h1>
          <p className="mx-auto mt-4 max-w-md text-ink-soft">
            The quote form is still right here. Tell us the job and we will price it.
          </p>
          <Link
            href="/quote"
            className="mt-8 inline-block bg-gold px-6 py-3 text-sm tracking-[0.14em] uppercase text-white"
          >
            Get a quote
          </Link>
        </div>
      </HeroBand>
    </SiteChrome>
  );
}
