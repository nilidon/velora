import { readStore } from "@/lib/store";
import { SettingsForm } from "@/components/admin/SettingsForm";

const scripts = [
  {
    title: "Missed-call text",
    body: "Hi, this is Velora Cleaning. Sorry we missed you — reply with your address and the type of clean (Airbnb, move-out, deep, recurring) and we will send a range in a few minutes.",
  },
  {
    title: "After estimate, no book",
    body: "Quick follow-up from Velora. We still have a Saturday morning crew if you want the clean this week. Want me to hold it?",
  },
  {
    title: "Ask for Google review",
    body: "Thanks again for booking Velora. If the home looks the way it should, a Google review helps the next Staten Island neighbor find us: https://share.google/5ZM42DMwtUEigvJ43",
  },
  {
    title: "Recurring upsell after one-time",
    body: "Your deep clean is done. If you want the same team every other Tuesday, I can lock a recurring rate below the one-time price. Interested?",
  },
];

export default function SettingsPage() {
  const { settings } = readStore();
  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#c09a59]">Owner tools</p>
      <h1 className="font-serif mt-1 text-4xl">Settings & scripts</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/50">
        Follow-up is where cleaning companies make their margin. Copy a script, send it, mark the lead.
      </p>

      <div className="mt-10 border border-white/10 bg-[#161311] p-6">
        <h2 className="font-serif text-2xl">Operations</h2>
        <SettingsForm initial={settings} />
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-2xl">Money scripts</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {scripts.map((s) => (
            <article key={s.title} className="border border-white/10 p-5">
              <h3 className="text-sm tracking-[0.12em] uppercase text-[#c09a59]">{s.title}</h3>
              <p className="mt-3 text-sm leading-6 text-white/70">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
