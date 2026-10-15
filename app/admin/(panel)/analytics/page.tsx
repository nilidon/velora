import { readStore } from "@/lib/store";
import { computeStats } from "@/lib/stats";
import { CustomerJourney } from "@/components/admin/CustomerJourney";

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="mt-4 border border-white/10 px-4 py-8 text-center text-sm text-white/40">{children}</p>;
}

export default function AnalyticsPage() {
  const store = readStore();
  const stats = computeStats(store.leads, store.events);

  return (
    <div>
      <p className="text-[11px] tracking-[0.2em] uppercase text-[#c09a59]">Last {stats.days} days</p>
      <h1 className="font-serif mt-1 text-4xl">Analytics</h1>
      <p className="mt-3 max-w-2xl text-sm text-white/50">
        Visitors, ads, and pages — only real traffic. Kill campaigns with views and no leads.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          [String(stats.visitors), "Unique visitors"],
          [String(stats.views), "Page views"],
          [`${stats.visitorToLead}%`, "Visitor → lead"],
          [`${stats.viewToLead}%`, "View → form submit"],
        ].map(([n, l]) => (
          <div key={l} className="border border-white/10 bg-[#161311] p-5">
            <div className="font-serif text-3xl text-[#e8d5b0]">{n}</div>
            <div className="mt-1 text-sm text-white/55">{l}</div>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="font-serif text-2xl">Campaigns</h2>
        {stats.byCampaign.length ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-[11px] tracking-[0.14em] uppercase text-white/40">
                <tr>
                  <th className="pb-3">Campaign</th>
                  <th className="pb-3">Views</th>
                  <th className="pb-3">Leads</th>
                  <th className="pb-3">Calls</th>
                  <th className="pb-3">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {stats.byCampaign.map((row) => (
                  <tr key={row.campaign} className="border-t border-white/10">
                    <td className="py-3">{row.campaign}</td>
                    <td>{row.views}</td>
                    <td className="text-[#c09a59]">{row.leads}</td>
                    <td>{row.calls}</td>
                    <td>{row.rate}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <Empty>No campaign tags yet. They appear when ads send utm_campaign.</Empty>
        )}
      </div>

      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-2xl">Sources</h2>
          {stats.bySource.length ? (
            <div className="mt-4 space-y-2">
              {stats.bySource.map((row) => (
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
          <h2 className="font-serif text-2xl">Landing pages</h2>
          {stats.byPage.length ? (
            <div className="mt-4 space-y-2">
              {stats.byPage.map((row) => (
                <div key={row.path} className="flex justify-between border border-white/10 px-4 py-3 text-sm">
                  <span className="truncate pr-4">{row.path}</span>
                  <span className="shrink-0 text-[#c09a59]">
                    {row.leads}/{row.views} · {row.rate}%
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <Empty>No page data yet.</Empty>
          )}
        </div>
      </div>

      <CustomerJourney steps={stats.journey} />
    </div>
  );
}
