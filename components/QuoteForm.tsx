"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { services } from "@/lib/services";
import { calcEstimate, formatMoney } from "@/lib/estimate";
import { track } from "@/components/AnalyticsBeacon";

type Props = {
  defaultService?: string;
  compact?: boolean;
  tone?: "dark" | "light";
};

const field =
  "mt-1.5 w-full rounded-xl border border-black/8 bg-cream px-3.5 py-2.5 text-ink placeholder:text-ink-soft/50";

export function QuoteForm({ defaultService = "", compact = false }: Props) {
  const [step, setStep] = useState(1);
  const [started, setStarted] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [form, setForm] = useState({
    serviceSlug: defaultService,
    bedrooms: 2,
    bathrooms: 1,
    sqft: "",
    frequency: defaultService === "recurring-cleaning" ? "bi-weekly" : "one-time",
    name: "",
    phone: "",
    email: "",
    address: "",
    zip: "",
    preferredDate: "",
    notes: "",
  });

  const estimate = useMemo(() => {
    if (!form.serviceSlug) return null;
    return calcEstimate({
      serviceSlug: form.serviceSlug,
      bedrooms: Number(form.bedrooms) || 1,
      bathrooms: Number(form.bathrooms) || 1,
      sqft: form.sqft ? Number(form.sqft) : undefined,
      frequency: form.frequency,
    });
  }, [form.serviceSlug, form.bedrooms, form.bathrooms, form.sqft, form.frequency]);

  function markStart() {
    if (started) return;
    setStarted(true);
    track("form_start", { serviceSlug: form.serviceSlug });
  }

  async function submit() {
    setError("");
    if (!form.name.trim() || !form.phone.trim() || !form.serviceSlug) {
      setError("Name, phone, and service are required so we can call you back.");
      return;
    }
    setBusy(true);
    try {
      const params = new URLSearchParams(window.location.search);
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          channel: "form",
          landingPage: window.location.pathname,
          referrer: document.referrer,
          utmSource: params.get("utm_source") || "",
          utmMedium: params.get("utm_medium") || "",
          utmCampaign: params.get("utm_campaign") || "",
          utmTerm: params.get("utm_term") || "",
          utmContent: params.get("utm_content") || "",
          gclid: params.get("gclid") || "",
          estimateLow: estimate?.low || 0,
          estimateHigh: estimate?.high || 0,
        }),
      });
      if (!res.ok) throw new Error("failed");
      track("form_submit", { serviceSlug: form.serviceSlug });
      const gtag = (window as Window & { gtag?: (...args: unknown[]) => void }).gtag;
      if (gtag) {
        gtag("event", "conversion", { send_to: "AW-18052291246" });
        gtag("event", "generate_lead", { currency: "USD", value: estimate?.mid || 0 });
      }
      setSent(true);
    } catch {
      setError("Something went wrong. Call or text us and we will quote you now.");
    } finally {
      setBusy(false);
    }
  }

  if (sent) {
    return (
      <div className="rounded-3xl bg-white p-8 shadow-card">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gold text-white">
          <Check size={18} />
        </div>
        <h3 className="font-serif mt-5 text-3xl">You’re on the list.</h3>
        <p className="mt-3 text-sm leading-7 text-ink-soft">
          We typically call within 15 minutes during the day. Keep your phone close.
        </p>
      </div>
    );
  }

  return (
    <form
      className={
        compact
          ? "rounded-3xl bg-white/95 p-5 shadow-card backdrop-blur sm:p-8"
          : "rounded-3xl bg-white/95 p-6 shadow-card backdrop-blur sm:p-8"
      }
      onSubmit={(e) => {
        e.preventDefault();
        if (step === 1) {
          if (!form.serviceSlug) {
            setError("Pick a service to see your range.");
            return;
          }
          track("estimate_view", { serviceSlug: form.serviceSlug });
          setStep(2);
          return;
        }
        submit();
      }}
    >
      <p className="text-[12px] tracking-[0.28em] text-gold">Free estimate</p>
      <h3 className="font-serif mt-1.5 text-[26px] leading-tight md:text-[28px]">
        {compact ? "Get your price range" : "Request a quote"}
      </h3>
      <p className="mt-1 text-sm text-ink-soft">
        Step {step} of 2 — {step === 1 ? "your space" : "how we reach you"}
      </p>

      {step === 1 && (
        <div className={compact ? "mt-4 space-y-3" : "mt-6 space-y-3.5"}>
          <label className="block text-[13px] text-ink-soft">
            Service
            <select
              className={field}
              value={form.serviceSlug}
              onChange={(e) => {
                markStart();
                setForm({ ...form, serviceSlug: e.target.value });
              }}
            >
              <option value="">Choose a service</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
          </label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[13px] text-ink-soft">
              Bedrooms
              <input
                className={field}
                type="number"
                min={0}
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: Number(e.target.value) })}
              />
            </label>
            <label className="block text-[13px] text-ink-soft">
              Bathrooms
              <input
                className={field}
                type="number"
                min={0}
                value={form.bathrooms}
                onChange={(e) => setForm({ ...form, bathrooms: Number(e.target.value) })}
              />
            </label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block text-[13px] text-ink-soft">
              Sq ft
              <input
                className={field}
                value={form.sqft}
                onChange={(e) => setForm({ ...form, sqft: e.target.value })}
                placeholder="Optional"
              />
            </label>
            <label className="block text-[13px] text-ink-soft">
              Frequency
              <select
                className={field}
                value={form.frequency}
                onChange={(e) => setForm({ ...form, frequency: e.target.value })}
              >
                <option value="one-time">One-time</option>
                <option value="weekly">Weekly</option>
                <option value="bi-weekly">Bi-weekly</option>
                <option value="monthly">Monthly</option>
                <option value="per-turnover">Per turnover</option>
              </select>
            </label>
          </div>
          {estimate && (
            <div className="rounded-2xl bg-cream-deep/80 px-5 py-4">
              <div className="text-[12px] tracking-[0.2em] text-gold">Estimated range</div>
              <div className="font-serif mt-1 text-3xl text-ink">
                {formatMoney(estimate.low)}–{formatMoney(estimate.high)}
              </div>
              <p className="mt-1 text-xs text-ink-soft">
                Final price confirmed on the call.
              </p>
            </div>
          )}
        </div>
      )}

      {step === 2 && (
        <div className="mt-6 space-y-3.5">
          {estimate && (
            <p className="font-serif text-xl text-gold">
              {formatMoney(estimate.low)}–{formatMoney(estimate.high)}
            </p>
          )}
          <label className="block text-[13px] text-ink-soft">
            Full name
            <input
              className={field}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label className="block text-[13px] text-ink-soft">
            Phone
            <input
              className={field}
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              required
            />
          </label>
          <label className="block text-[13px] text-ink-soft">
            Email
            <input
              className={field}
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="Optional"
            />
          </label>
          <label className="block text-[13px] text-ink-soft">
            Neighborhood
            <input
              className={field}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="New Dorp, SI"
            />
          </label>
          <label className="block text-[13px] text-ink-soft">
            Preferred day
            <input
              className={field}
              value={form.preferredDate}
              onChange={(e) => setForm({ ...form, preferredDate: e.target.value })}
              placeholder="This Saturday"
            />
          </label>
          <label className="block text-[13px] text-ink-soft">
            Notes
            <textarea
              className={`${field} min-h-20`}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="Pets, lockbox, checkout time…"
            />
          </label>
        </div>
      )}

      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}

      <div className="mt-6 flex gap-3">
        {step === 2 && (
          <button
            type="button"
            onClick={() => setStep(1)}
            className="flex-1 rounded-full border border-ink/15 px-4 py-3 text-sm"
          >
            Back
          </button>
        )}
        <button
          type="submit"
          disabled={busy}
          className="btn-gold flex-1 !py-3 text-sm disabled:opacity-60"
        >
          {busy ? "Sending…" : step === 1 ? "See my range" : "Request my quote"}
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>
      <p className="mt-4 text-center text-xs text-ink-soft">
        We call within 15 minutes · Licensed & insured
      </p>
    </form>
  );
}
