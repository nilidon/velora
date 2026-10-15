import { NextResponse } from "next/server";
import { addEvent } from "@/lib/store";
import { uid } from "@/lib/utils";
import type { AnalyticsEvent } from "@/lib/types";

const NAMES: AnalyticsEvent["name"][] = [
  "page_view",
  "form_start",
  "form_submit",
  "call_click",
  "sms_click",
  "quote_cta",
  "estimate_view",
];

export async function POST(req: Request) {
  const body = await req.json().catch(() => ({}));
  if (!NAMES.includes(body.name)) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
  const path = String(body.path || "");
  if (path.startsWith("/admin")) {
    return NextResponse.json({ ok: true, skipped: true });
  }
  addEvent({
    id: uid("ev"),
    ts: new Date().toISOString(),
    name: body.name,
    path: String(body.path || "").slice(0, 200),
    landingPage: String(body.landingPage || body.path || "").slice(0, 200),
    serviceSlug: String(body.serviceSlug || ""),
    referrer: String(body.referrer || "").slice(0, 300),
    utmSource: String(body.utmSource || ""),
    utmMedium: String(body.utmMedium || ""),
    utmCampaign: String(body.utmCampaign || ""),
    utmTerm: String(body.utmTerm || ""),
    utmContent: String(body.utmContent || ""),
    gclid: String(body.gclid || ""),
    visitorId: String(body.visitorId || "").slice(0, 80),
    sessionId: String(body.sessionId || "").slice(0, 80),
    device: String(body.device || "").slice(0, 20),
  });
  return NextResponse.json({ ok: true });
}
