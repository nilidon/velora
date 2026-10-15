import Link from "next/link";
import { site } from "@/lib/site";

export function CtaBand() {
  return (
    <section className="bg-cream-deep px-5 py-24 text-center">
      <p className="font-script text-3xl text-gold italic">Ready for a spotless space?</p>
      <h2 className="font-serif mx-auto mt-3 max-w-2xl text-4xl font-medium sm:text-5xl">
        Get your free, no-obligation quote today.
      </h2>
      <p className="mx-auto mt-4 max-w-md text-ink-soft">
        We typically respond within 15 minutes.
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link href="/quote" className="btn-gold">
          Request a Free Quote
        </Link>
        <a href={site.phoneHref} className="btn-ghost">
          Call {site.phone}
        </a>
      </div>
    </section>
  );
}
