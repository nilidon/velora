import Link from "next/link";
import { notFound } from "next/navigation";
import { readStore } from "@/lib/store";
import { formatMoney } from "@/lib/estimate";
import { LeadActions } from "@/components/admin/LeadActions";
import { slaLabel, timeAgo } from "@/lib/utils";

export default async function LeadDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { leads, settings } = readStore();
  const lead = leads.find((l) => l.id === id);
  if (!lead) notFound();
  const sla = lead.status === "new" ? slaLabel(lead.createdAt, settings.responseMinutes) : null;

  return (
    <div>
      <Link href="/admin/leads" className="text-sm text-[#c09a59]">
        ← Pipeline
      </Link>
      <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-4xl">{lead.name}</h1>
          <p className="mt-1 text-white/55">
            {lead.service} · {timeAgo(lead.createdAt)}
          </p>
          {sla && (
            <p className={`mt-2 text-sm ${sla.late ? "text-red-400" : "text-emerald-400"}`}>
              {sla.text}
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <a
            href={`tel:${lead.phone}`}
            className="bg-[#c09a59] px-4 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-white"
          >
            Call
          </a>
          <a
            href={`sms:${lead.phone}`}
            className="border border-white/20 px-4 py-2 text-xs tracking-[0.12em] uppercase"
          >
            Text
          </a>
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="space-y-4 border border-white/10 bg-[#161311] p-6 text-sm">
          {[
            ["Phone", lead.phone],
            ["Email", lead.email || "—"],
            ["Address", lead.address || "—"],
            ["Frequency", lead.frequency],
            ["Beds / baths", `${lead.bedrooms} / ${lead.bathrooms}`],
            ["Sq ft", lead.sqft || "—"],
            ["Preferred", lead.preferredDate || "—"],
            [
              "Estimate",
              lead.estimateLow
                ? `${formatMoney(lead.estimateLow)}–${formatMoney(lead.estimateHigh)}`
                : "—",
            ],
            ["Won value", lead.bookedValue ? formatMoney(lead.bookedValue) : "—"],
            ["Landing page", lead.landingPage || "—"],
            ["Source", lead.utmSource || lead.referrer || "direct"],
            ["Campaign", lead.utmCampaign || "—"],
            ["Keyword", lead.utmTerm || "—"],
            ["GCLID", lead.gclid || "—"],
            ["Channel", lead.channel],
          ].map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-white/5 pb-2">
              <span className="text-white/40">{k}</span>
              <span className="text-right">{v}</span>
            </div>
          ))}
          {lead.notes && (
            <div>
              <div className="text-white/40">Client notes</div>
              <p className="mt-1">{lead.notes}</p>
            </div>
          )}
        </div>
        <LeadActions lead={lead} />
      </div>
    </div>
  );
}
