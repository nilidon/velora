import { SiteChrome } from "@/components/SiteChrome";
import { CtaBand } from "@/components/CtaBand";
import { HeroBand } from "@/components/HeroBand";

const faqs = [
  {
    q: "What areas do you serve?",
    a: "Staten Island first — then Manhattan, Brooklyn, Queens, the Bronx, and nearby New Jersey when the job is a fit.",
  },
  {
    q: "Are you insured and bonded?",
    a: "Yes. Fully licensed, bonded, and insured. Every cleaner is background-checked.",
  },
  {
    q: "Do you bring supplies?",
    a: "Yes. Eco-friendly, professional-grade products unless you ask us to use yours.",
  },
  {
    q: "How fast is a quote?",
    a: "The site gives you a range instantly. A person typically calls within 15 minutes to lock the number and the slot.",
  },
  {
    q: "Can I book recurring service?",
    a: "Weekly, bi-weekly, or monthly. Recurring is how most clients save — and how we keep the same team in your home.",
  },
  {
    q: "What is the cancellation policy?",
    a: "24 hours notice and we move you at no charge. Same-day cancels may hold a small booking fee so the crew is not left unpaid.",
  },
  {
    q: "Do you handle Airbnb turnovers?",
    a: "Yes — same-day, listing-photo resets, restocking, and damage reports. It is one of our highest-volume services.",
  },
];

export const metadata = {
  title: "FAQ",
  description: "Answers before you book Velora Cleaning on Staten Island.",
};

export default function FaqPage() {
  return (
    <SiteChrome>
      <HeroBand src="/photos/deep-clean.jpg" alt="Deep cleaning by Velora">
        <div className="mx-auto max-w-3xl">
          <p className="text-[12px] tracking-[0.3em] text-gold">Answers</p>
          <h1 className="font-serif mt-3 text-5xl font-semibold">Frequently asked questions</h1>
        </div>
      </HeroBand>
      <section className="bg-cream px-5 py-16">
        <div className="mx-auto max-w-3xl space-y-4">
          {faqs.map((f) => (
            <details key={f.q} className="rounded-2xl bg-white p-6 shadow-soft">
              <summary className="cursor-pointer font-medium">{f.q}</summary>
              <p className="mt-3 leading-7 text-ink-soft">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
      <CtaBand />
    </SiteChrome>
  );
}
