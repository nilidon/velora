"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { site } from "@/lib/site";
import { services } from "@/lib/services";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="absolute top-0 z-40 w-full">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <Link href="/" className="shrink-0" onClick={() => setOpen(false)}>
          <Image
            src="/photos/logo.png"
            alt="Velora Cleaning Services"
            width={220}
            height={200}
            className="h-16 w-auto drop-shadow-sm lg:h-20"
            priority
          />
        </Link>

        <nav className="hidden items-center gap-8 text-[13px] font-medium text-ink/80 lg:flex">
          <Link href="/" className="transition-colors hover:text-gold">
            Home
          </Link>
          <div className="relative group/nav">
            <Link href="/services" className="transition-colors hover:text-gold">
              Services
            </Link>
            <div className="invisible absolute left-1/2 top-full z-50 mt-3 w-72 -translate-x-1/2 rounded-2xl border border-black/5 bg-cream/95 p-3 opacity-0 shadow-card backdrop-blur transition group-hover/nav:visible group-hover/nav:opacity-100">
              {services.slice(0, 8).map((s) => (
                <Link
                  key={s.slug}
                  href={`/${s.slug}`}
                  className="block rounded-xl px-3 py-2 text-[13px] text-ink/75 hover:bg-gold/10 hover:text-gold"
                >
                  {s.shortName}
                </Link>
              ))}
              <Link
                href="/services"
                className="mt-1 block border-t border-gold/20 px-3 py-2 text-[13px] text-gold"
              >
                All services →
              </Link>
            </div>
          </div>
          <Link href="/about" className="transition-colors hover:text-gold">
            About
          </Link>
          <Link href="/testimonials" className="transition-colors hover:text-gold">
            Reviews
          </Link>
          <Link href="/faq" className="transition-colors hover:text-gold">
            FAQ
          </Link>
          <Link href="/contact" className="transition-colors hover:text-gold">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <a
            href={site.phoneHref}
            className="hidden items-center gap-2 text-sm text-ink/80 hover:text-gold md:flex"
          >
            <Phone size={16} />
            {site.phone}
          </a>
          <Link href="/quote" className="hidden btn-gold !px-6 !py-2.5 text-sm md:inline-flex">
            Book Now
          </Link>
          <button
            type="button"
            className="rounded-full border border-ink/15 p-2 text-ink lg:hidden"
            aria-label="Open menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-black/5 bg-cream/95 px-5 py-6 shadow-soft backdrop-blur lg:hidden">
          <div className="flex flex-col gap-4 text-ink">
            {[
              ["/", "Home"],
              ["/services", "Services"],
              ["/about", "About"],
              ["/testimonials", "Reviews"],
              ["/faq", "FAQ"],
              ["/contact", "Contact"],
              ["/quote", "Get a Quote"],
            ].map(([href, label]) => (
              <Link key={href} href={href} onClick={() => setOpen(false)} className="text-sm">
                {label}
              </Link>
            ))}
            <a href={site.phoneHref} className="text-gold">
              Call {site.phone}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
