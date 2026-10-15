import Link from "next/link";
import { readStore } from "@/lib/store";
import { computeStats } from "@/lib/stats";
import { formatMoney } from "@/lib/estimate";
import { slaLabel, timeAgo } from "@/lib/utils";
import { CustomerJourney } from "@/components/admin/CustomerJourney";

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 border border-white/10 px-4 py-8 text-center text-sm text-white/40">{children}</p>;
}

export default function AdminHome() {
  const store = readStore();
  const stats = computeStats(store.leads, store.events);
  const newest = store.leads.slice(0, 8);
  const maxViews = Math.max(...stats.daily.map((d) => d.views), 0);
  const maxLeads = Math.max(...stats.daily.map((d) => d.leads), 0);
  const hasTraffic = stats.views > 0 || stats.leads > 0;

  const cards = [
    [String(stats.visitors), "Visitors", `${stats.visitorsToday} today · last ${stats.days} days`],
    [String(stats.views), "Page views", `${stats.pagesPerSession} pages / visit`],
    [String(stats.leads), "Leads", `${stats.leadsToday} today`],
    [`${stats.visitorToLead}%`, "Visitor → lead", "Conversion rate"],
    [String(stats.newLeads), "Waiting on you", "New leads still unworked"],
    [formatMoney(stats.pipeline), "Open pipeline", "Quoted + booked value in play"],
    [`${stats.bounceRate}%`, "Bounce rate", "Left after one page"],
    [`${stats.closeRate}%`, "Lead → booked", "Close rate on captured leads"],
  ] as const;

  const pulses = [
    [`${stats.viewToStart}%`, "View → form start"],
    [`${stats.startToSubmit}%`, "Form start → submit"],
    [String(stats.calls), "Call taps"],
    [String(stats.sms), "Text taps"],
    [String(stats.quoteCtas), "Quote button taps"],
    [String(stats.formStarts), "Forms started"],
    [String(stats.sessions), "Sessions"],
    [String(stats.booked), "Booked"],
  ] as const;

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#c09a59]">Last {stats.days} days</p>
      <h1 className="font-serif mt-1 text-4xl">Analysis</h1>
      <p className="mt-2 max-w-2xl text-sm text-white/55">
        Visitors, conversion, and the path to a booked clean. These numbers are live from the site.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(([n, l, s]) => (
          <div key={l} className="border border-white/10 bg-[#161311] p-5">
            <div className="font-serif text-3xl text-[#e8d5b0]">{n}</div>
            <div className="mt-1 text-sm">{l}</div>
            <div className="mt-2 text-xs text-white/40">{s}</div>
          </div>
        ))}
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {pulses.map(([n, l]) => (
          <div key={l} className="border border-white/10 px-4 py-3 text-sm">
            <span className="text-[#c09a59]">{n}</span> <span className="text-white/50">{l}</span>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-white/10 bg-[#161311] p-5">
        <h2 className="text-sm tracking-[0.14em] uppercase text-white/60">
          Visitors vs leads · {stats.days} days
        </h2>
        {hasTraffic ? (
          <div className="mt-4 flex h-44 items-end gap-1">
            {stats.daily.map((d) => (
              <div
                key={d.date}
                className="flex flex-1 flex-col items-center justify-end gap-1"
                title={`${d.date}: ${d.views} views, ${d.visitors} visitors, ${d.leads} leads`}
              >
                <div
                  className="w-full bg-[#c09a59]/80"
                  style={{ height: maxViews ? `${(d.views / maxViews) * 100}%` : "0%" }}
                />
                <div
                  className="w-full bg-white/35"
                  style={{ height: maxLeads ? `${Math.max(d.leads ? 6 : 0, (d.leads / maxLeads) * 40)}%` : "0%" }}
                />
              </div>
            ))}
          </div>
        ) : (
          <Empty>No visits yet. The chart fills in as people land on the site.</Empty>
        )}
        <div className="mt-3 flex gap-4 text-[11px] uppercase tracking-widest text-white/35">
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-3 bg-[#c09a59]/80" /> Views
          </span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-2 w-3 bg-white/35" /> Leads
          </span>
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl">Recent leads</h2>
            <Link href="/admin/leads" className="text-sm text-[#c09a59]">
              All leads →
            </Link>
          </div>
          {newest.length ? (
            <div className="mt-4 divide-y divide-white/10 border border-white/10">
              {newest.map((l) => {
                const sla = l.status === "new" ? slaLabel(l.createdAt, store.settings.responseMinutes) : null;
                return (
                  <Link key={l.id} href={`/admin/leads/${l.id}`} className="block px-4 py-4 hover:bg-white/5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="font-medium">{l.name}</div>
                        <div className="text-sm text-white/50">
                          {l.service} · {l.utmCampaign || l.utmSource || "direct"}
                        </div>
                      </div>
                      <div className="text-right text-xs">
                        <div className="uppercase text-[#c09a59]">{l.status}</div>
                        <div className="text-white/40">{timeAgo(l.createdAt)}</div>
                        {sla && (
                          <div className={sla.late ? "text-red-400" : "text-emerald-400"}>{sla.text}</div>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : (
            <Empty>No leads yet. Form submits and call-ins will land here.</Empty>
          )}
        </div>

        <div>
          <h2 className="font-serif text-2xl">Pages that convert</h2>
          {stats.byPage.length ? (
            <div className="mt-4 space-y-3">
              {stats.byPage.slice(0, 8).map((row) => (
                <div key={row.path} className="flex items-center justify-between border border-white/10 px-4 py-3 text-sm">
                  <div className="min-w-0">
                    <div className="truncate text-white/80">{row.path}</div>
                    <div className="text-xs text-white/35">
                      {row.visitors} visitors · {row.views} views
                    </div>
                  </div>
                  <span className="shrink-0 pl-3 text-[#c09a59]">
                    {row.leads} leads · {row.rate}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Empty>No page data yet.</Empty>
          )}
        </div>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">Where they came from</h2>
          {stats.bySource.length ? (
            <div className="mt-4 space-y-2">
              {stats.bySource.slice(0, 8).map((row) => (
                <div key={row.source} className="flex justify-between border border-white/10 px-4 py-3 text-sm">
                  <span>{row.source}</span>
                  <span className="text-white/50">
                    {row.visitors} visitors · <span className="text-[#c09a59]">{row.leads} leads ({row.rate}%)</span>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Empty>Sources show after the first visit.</Empty>
          )}
        </div>
        <div>
          <h2 className="font-serif text-2xl">Devices</h2>
          {stats.byDevice.length ? (
            <div className="mt-4 space-y-2">
              {stats.byDevice.map((row) => (
                <div key={row.device} className="flex justify-between border border-white/10 px-4 py-3 text-sm">
                  <span className="capitalize">{row.device}</span>
                  <span className="text-white/50">
                    {row.visitors} visitors · <span className="text-[#c09a59]">{row.leads} leads</span>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Empty>Phone vs desktop splits after the first visit.</Empty>
          )}
        </div>
      </div>

      <CustomerJourney steps={stats.journey} />
    </div>
  );
}
