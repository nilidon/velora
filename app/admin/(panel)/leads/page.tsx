import Link from "next/link";
import { readStore } from "@/lib/store";
import { formatMoney } from "@/lib/estimate";
import { slaLabel, timeAgo } from "@/lib/utils";
import type { LeadStatus } from "@/lib/types";

const cols: LeadStatus[] = ["new", "contacted", "quoted", "booked", "completed", "lost"];

export default function LeadsPage() {
  const { leads, settings } = readStore();

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] tracking-[0.2em] uppercase text-[#c09a59]">Pipeline</p>
          <h1 className="font-serif mt-1 text-4xl">Leads</h1>
        </div>
        <a
          href="/api/admin/export"
          className="border border-[#c09a59]/40 px-4 py-2 text-xs tracking-[0.14em] uppercase text-[#c09a59]"
        >
          Export CSV
        </a>
      </div>
      <p className="mt-3 max-w-2xl text-sm text-white/50">
        Speed is the product. A new lead that sits 20 minutes is a lost job. Move them as you call.
      </p>

      <div className="mt-8 flex min-h-[calc(100vh-240px)] gap-3 overflow-x-auto pb-8">
        {cols.map((status) => {
          const list = leads.filter((l) => l.status === status);
          return (
            <div
              key={status}
              className="flex w-[220px] shrink-0 flex-col border border-white/10 bg-[#161311]"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-3 py-3 text-[11px] tracking-[0.14em] uppercase text-white/45">
                <span>{status}</span>
                <span>{list.length}</span>
              </div>
              <div className="flex flex-1 flex-col gap-3 p-3">
                {list.length ? (
                  list.map((l) => {
                    const sla = status === "new" ? slaLabel(l.createdAt, settings.responseMinutes) : null;
                    return (
                      <Link
                        key={l.id}
                        href={`/admin/leads/${l.id}`}
                        className="block border border-white/10 bg-[#0e0c0a] p-3 hover:border-[#c09a59]/50"
                      >
                        <div className="text-sm font-medium">{l.name}</div>
                        <div className="mt-1 truncate text-xs text-white/45">{l.service}</div>
                        <div className="mt-2 text-xs text-[#e8d5b0]">
                          {l.estimateLow
                            ? `${formatMoney(l.estimateLow)}–${formatMoney(l.estimateHigh)}`
                            : "No range"}
                        </div>
                        <div className="mt-1 text-[11px] text-white/35">{timeAgo(l.createdAt)}</div>
                        {sla && (
                          <div className={`mt-1 text-[11px] ${sla.late ? "text-red-400" : "text-emerald-400"}`}>
                            {sla.text}
                          </div>
                        )}
                        {(l.utmCampaign || l.utmSource) && (
                          <div className="mt-2 truncate text-[10px] uppercase tracking-wider text-[#c09a59]/80">
                            {l.utmSource}/{l.utmCampaign || "organic"}
                          </div>
                        )}
                      </Link>
                    );
                  })
                ) : (
                  <p className="px-1 py-6 text-xs text-white/30">None yet</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
