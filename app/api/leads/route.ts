import { NextResponse } from "next/server";
import { addLead } from "@/lib/store";
import { uid } from "@/lib/utils";
import { getService } from "@/lib/services";
import type { Lead } from "@/lib/types";

export async function POST(req: Request) {
  const body = await req.json();
  const name = String(body.name || "").trim();
  const phone = String(body.phone || "").trim();
  const serviceSlug = String(body.serviceSlug || "");
  if (!name || !phone || !serviceSlug) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }
  const service = getService(serviceSlug);
  const now = new Date().toISOString();
  const lead: Lead = {
    id: uid("ld"),
    createdAt: now,
    updatedAt: now,
    status: "new",
    channel: body.channel === "call" || body.channel === "sms" ? body.channel : "form",
    name,
    phone,
    email: String(body.email || ""),
    address: String(body.address || ""),
    zip: String(body.zip || ""),
    service: service?.name || serviceSlug,
    serviceSlug,
    frequency: String(body.frequency || "one-time"),
    bedrooms: Number(body.bedrooms) || 0,
    bathrooms: Number(body.bathrooms) || 0,
    sqft: String(body.sqft || ""),
    preferredDate: String(body.preferredDate || ""),
    notes: String(body.notes || ""),
    estimateLow: Number(body.estimateLow) || 0,
    estimateHigh: Number(body.estimateHigh) || 0,
    bookedValue: 0,
    landingPage: String(body.landingPage || ""),
    referrer: String(body.referrer || ""),
    utmSource: String(body.utmSource || ""),
    utmMedium: String(body.utmMedium || ""),
    utmCampaign: String(body.utmCampaign || ""),
    utmTerm: String(body.utmTerm || ""),
    utmContent: String(body.utmContent || ""),
    gclid: String(body.gclid || ""),
    adminNotes: "",
  };
  addLead(lead);
  return NextResponse.json({ ok: true, id: lead.id, estimate: { low: lead.estimateLow, high: lead.estimateHigh } });
}
