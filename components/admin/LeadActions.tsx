"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Lead, LeadStatus } from "@/lib/types";

const statuses: LeadStatus[] = ["new", "contacted", "quoted", "booked", "completed", "lost"];

export function LeadActions({ lead }: { lead: Lead }) {
  const router = useRouter();
  const [notes, setNotes] = useState(lead.adminNotes);
  const [value, setValue] = useState(String(lead.bookedValue || ""));
  const [copied, setCopied] = useState("");

  async function patch(body: Record<string, unknown>) {
    await fetch(`/api/admin/leads/${lead.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    router.refresh();
  }

  function copy(label: string, text: string) {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(""), 1500);
  }

  const sms = `Hi ${lead.name.split(" ")[0]}, this is Velora. We can do your ${lead.service.toLowerCase()} for about $${lead.estimateLow}–$${lead.estimateHigh}. Want us to lock ${lead.preferredDate || "a time this week"}?`;
  const email = `Hi ${lead.name},\n\nThanks for requesting a quote for ${lead.service}. Based on what you sent, the range is $${lead.estimateLow}–$${lead.estimateHigh}. Reply with a preferred day and we will confirm the crew.\n\nVelora Cleaning\n(718) 887-1649`;

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[11px] tracking-[0.16em] uppercase text-white/40">Move the deal</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {statuses.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => patch({ status: s })}
              className={`px-3 py-1.5 text-xs uppercase tracking-wider ${
                lead.status === s ? "bg-[#c09a59] text-white" : "border border-white/15 text-white/70"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.16em] uppercase text-white/40">Won value</p>
        <div className="mt-2 flex gap-2">
          <input
            className="w-32 border border-white/15 bg-[#0c0b0a] px-3 py-2 text-sm"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="275"
          />
          <button
            type="button"
            onClick={() => patch({ bookedValue: Number(value) || 0 })}
            className="border border-[#c09a59]/40 px-3 py-2 text-xs uppercase tracking-wider text-[#c09a59]"
          >
            Save
          </button>
        </div>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.16em] uppercase text-white/40">Owner notes</p>
        <textarea
          className="mt-2 min-h-28 w-full border border-white/15 bg-[#0c0b0a] px-3 py-2 text-sm"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <button
          type="button"
          onClick={() => patch({ adminNotes: notes })}
          className="mt-2 border border-white/20 px-3 py-2 text-xs uppercase tracking-wider"
        >
          Save notes
        </button>
      </div>

      <div>
        <p className="text-[11px] tracking-[0.16em] uppercase text-white/40">Close-the-lead scripts</p>
        <div className="mt-3 space-y-3">
          <div className="border border-white/10 p-3 text-sm text-white/70">
            <div className="flex justify-between text-xs uppercase tracking-wider text-[#c09a59]">
              SMS
              <button type="button" onClick={() => copy("sms", sms)}>
                {copied === "sms" ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2">{sms}</p>
          </div>
          <div className="border border-white/10 p-3 text-sm whitespace-pre-wrap text-white/70">
            <div className="flex justify-between text-xs uppercase tracking-wider text-[#c09a59]">
              Email
              <button type="button" onClick={() => copy("email", email)}>
                {copied === "email" ? "Copied" : "Copy"}
              </button>
            </div>
            <p className="mt-2">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
