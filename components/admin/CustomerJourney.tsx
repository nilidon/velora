import type { JourneyStep } from "@/lib/stats";
import { pct } from "@/lib/stats";

export function CustomerJourney({ steps }: { steps: JourneyStep[] }) {
  const max = Math.max(...steps.map((s) => s.value), 0);

  return (
    <section className="mt-12 border border-white/10 bg-[#161311] p-6">
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#c09a59]">Path to a booked clean</p>
      <h2 className="font-serif mt-1 text-3xl">Customer journey</h2>
      <p className="mt-2 max-w-2xl text-sm text-white/45">
        {max
          ? "Where people drop off from the first visit to a finished job."
          : "This fills as people visit the site, start a quote, and book a clean."}
      </p>

      <div className="mt-8 space-y-4">
        {steps.map((step, i) => {
          const next = steps[i + 1];
          const width = max ? Math.max(step.value ? 4 : 0, (step.value / max) * 100) : 0;
          const continueRate = next ? pct(next.value, step.value) : null;
          return (
            <div key={step.key}>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <div className="text-sm text-white/85">{step.label}</div>
                  <div className="text-xs text-white/40">{step.hint}</div>
                </div>
                <div className="text-right">
                  <div className="font-serif text-2xl text-[#e8d5b0]">{step.value}</div>
                  {continueRate != null && (
                    <div className="text-[11px] text-white/35">
                      {step.value ? `${continueRate}% go on` : "—"}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 h-2 overflow-hidden bg-white/8">
                <div
                  className="h-full bg-[#c09a59] transition-[width]"
                  style={{ width: `${width}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
