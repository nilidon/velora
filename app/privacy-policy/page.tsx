import { SiteChrome } from "@/components/SiteChrome";

export const metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <SiteChrome>
      <section className="bg-cream px-5 pb-20 pt-32">
        <div className="mx-auto max-w-3xl leading-8 text-ink-soft">
          <h1 className="font-serif text-4xl text-ink">Privacy Policy</h1>
          <p className="mt-6">
            Velora Cleaning Services LLC collects the information you submit on quote forms
            (name, phone, email, address, job details) so we can price and schedule your clean.
            We also record anonymous site events — page views, form starts, call and text taps —
            so we know which ads and pages produce jobs.
          </p>
          <p className="mt-4">
            We do not sell your information. Form data is stored for operations and may be shared
            with our scheduling staff only. Advertising pixels (Google Ads / Analytics) may collect
            standard usage data. You can request deletion by calling (718) 887-1649.
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
