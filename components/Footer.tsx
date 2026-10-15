import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";
import { services } from "@/lib/services";
import { areas } from "@/lib/areas";

export function Footer() {
  return (
    <footer className="bg-night text-cream/80">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-20 md:grid-cols-4">
        <div>
          <Image
            src="/photos/logo.png"
            alt="Velora Cleaning Services"
            width={180}
            height={163}
            className="h-16 w-auto"
          />
          <p className="mt-5 text-sm leading-7 text-cream/60">
            Spotless spaces, exceptional care — luxury-grade cleaning for homes,
            offices, and rentals across NYC.
          </p>
        </div>
        <div>
          <h3 className="text-[12px] tracking-[0.28em] text-gold">Pages</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            <li><Link href="/" className="hover:text-gold">Home</Link></li>
            <li><Link href="/about" className="hover:text-gold">About</Link></li>
            <li><Link href="/services" className="hover:text-gold">Services</Link></li>
            <li><Link href="/faq" className="hover:text-gold">FAQ</Link></li>
            <li><Link href="/testimonials" className="hover:text-gold">Reviews</Link></li>
            <li><Link href="/contact" className="hover:text-gold">Contact</Link></li>
            <li><Link href="/quote" className="hover:text-gold">Get a Quote</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="text-[12px] tracking-[0.28em] text-gold">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href={`/${s.slug}`} className="hover:text-gold">
                  {s.shortName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-[12px] tracking-[0.28em] text-gold">Find us</h3>
          <p className="mt-5 text-sm leading-7">
            {site.legalName}
            <br />
            {site.address}
          </p>
          <a href={site.phoneHref} className="mt-4 block text-gold">
            {site.phone}
          </a>
          <div className="mt-5 flex flex-wrap gap-3 text-sm">
            {areas.map((a) => (
              <Link key={a.slug} href={`/${a.slug}`} className="hover:text-gold">
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} Velora Cleaning Services®. All rights reserved.{" "}
        <Link href="/privacy-policy" className="underline hover:text-gold">
          Privacy Policy
        </Link>
      </div>
    </footer>
  );
}
