import type { AnalyticsEvent, Lead } from "./types";

const TZ = "America/New_York";

export function dayKey(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(iso));
}

export function todayKey() {
  return dayKey(new Date().toISOString());
}

export function inRange(iso: string, days: number) {
  return Date.now() - new Date(iso).getTime() <= days * 86400000;
}

export function pct(n: number, d: number) {
  if (!d) return 0;
  return Math.round((n / d) * 1000) / 10;
}

function uniquePeople(events: AnalyticsEvent[], names?: AnalyticsEvent["name"][]) {
  const allow = names ? new Set(names) : null;
  const ids = new Set<string>();
  let fallback = 0;
  for (const e of events) {
    if (allow && !allow.has(e.name)) continue;
    if (e.visitorId) ids.add(e.visitorId);
    else fallback += 1;
  }
  return ids.size || fallback;
}

function sourceLabel(e: AnalyticsEvent) {
  if (e.utmSource) return e.utmSource;
  if (e.gclid) return "google ads";
  if (!e.referrer) return "direct";
  try {
    return new URL(e.referrer).hostname.replace(/^www\./, "") || "referral";
  } catch {
    return "referral";
  }
}

export type JourneyStep = {
  key: string;
  label: string;
  hint: string;
  value: number;
};

export function computeStats(leads: Lead[], events: AnalyticsEvent[], days = 21) {
  const recentLeads = leads.filter((l) => inRange(l.createdAt, days));
  const recentEvents = events.filter((e) => inRange(e.ts, days));
  const today = todayKey();
  const todayEvents = recentEvents.filter((e) => dayKey(e.ts) === today);
  const todayLeads = recentLeads.filter((l) => dayKey(l.createdAt) === today);

  const views = recentEvents.filter((e) => e.name === "page_view");
  const starts = recentEvents.filter((e) => e.name === "form_start");
  const submits = recentEvents.filter((e) => e.name === "form_submit");
  const calls = recentEvents.filter((e) => e.name === "call_click");
  const sms = recentEvents.filter((e) => e.name === "sms_click");
  const ctas = recentEvents.filter((e) => e.name === "quote_cta");
  const estimates = recentEvents.filter((e) => e.name === "estimate_view");

  const visitors = uniquePeople(views);
  const visitorsToday = uniquePeople(todayEvents.filter((e) => e.name === "page_view"));

  const sessions = new Map<string, { views: number; converted: boolean }>();
  for (const e of recentEvents) {
    const id = e.sessionId || e.visitorId || e.id;
    const row = sessions.get(id) || { views: 0, converted: false };
    if (e.name === "page_view") row.views += 1;
    if (
      e.name === "form_start" ||
      e.name === "form_submit" ||
      e.name === "call_click" ||
      e.name === "sms_click" ||
      e.name === "quote_cta"
    ) {
      row.converted = true;
    }
    sessions.set(id, row);
  }
  const sessionCount = sessions.size;
  const bounced = [...sessions.values()].filter((s) => s.views <= 1 && !s.converted).length;
  const engagedPeople = [...sessions.values()].filter((s) => s.views >= 2 || s.converted).length;

  const booked = recentLeads.filter((l) => l.status === "booked" || l.status === "completed");
  const completed = recentLeads.filter((l) => l.status === "completed");
  const contactedPlus = recentLeads.filter((l) =>
    ["contacted", "quoted", "booked", "completed"].includes(l.status),
  );
  const quotedPlus = recentLeads.filter((l) => ["quoted", "booked", "completed"].includes(l.status));
  const pipeline = recentLeads
    .filter((l) => ["new", "contacted", "quoted", "booked"].includes(l.status))
    .reduce((sum, l) => sum + (l.bookedValue || l.estimateHigh || 0), 0);
  const won = leads
    .filter((l) => l.status === "completed" || l.status === "booked")
    .reduce((sum, l) => sum + (l.bookedValue || 0), 0);

  const byPage = new Map<string, { views: number; visitors: Set<string>; leads: number; calls: number }>();
  for (const e of recentEvents) {
    const key = e.path || e.landingPage || "/";
    const row = byPage.get(key) || { views: 0, visitors: new Set<string>(), leads: 0, calls: 0 };
    if (e.visitorId) row.visitors.add(e.visitorId);
    if (e.name === "page_view") row.views += 1;
    if (e.name === "form_submit") row.leads += 1;
    if (e.name === "call_click" || e.name === "sms_click") row.calls += 1;
    byPage.set(key, row);
  }

  const bySource = new Map<string, { views: number; visitors: Set<string>; leads: number }>();
  for (const e of recentEvents) {
    const key = sourceLabel(e);
    const row = bySource.get(key) || { views: 0, visitors: new Set<string>(), leads: 0 };
    if (e.visitorId) row.visitors.add(e.visitorId);
    if (e.name === "page_view") row.views += 1;
    if (e.name === "form_submit") row.leads += 1;
    bySource.set(key, row);
  }

  const byCampaign = new Map<string, { views: number; leads: number; calls: number }>();
  for (const e of recentEvents) {
    const key = e.utmCampaign || "(organic / none)";
    const row = byCampaign.get(key) || { views: 0, leads: 0, calls: 0 };
    if (e.name === "page_view") row.views += 1;
    if (e.name === "form_submit") row.leads += 1;
    if (e.name === "call_click") row.calls += 1;
    byCampaign.set(key, row);
  }

  const byDevice = new Map<string, { views: number; visitors: Set<string>; leads: number }>();
  for (const e of recentEvents) {
    const key = e.device || "unknown";
    const row = byDevice.get(key) || { views: 0, visitors: new Set<string>(), leads: 0 };
    if (e.visitorId) row.visitors.add(e.visitorId);
    if (e.name === "page_view") row.views += 1;
    if (e.name === "form_submit") row.leads += 1;
    byDevice.set(key, row);
  }

  const daily = new Map<string, { views: number; visitors: Set<string>; leads: number }>();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    daily.set(dayKey(d.toISOString()), { views: 0, visitors: new Set<string>(), leads: 0 });
  }
  for (const e of recentEvents) {
    const row = daily.get(dayKey(e.ts));
    if (!row) continue;
    if (e.visitorId) row.visitors.add(e.visitorId);
    if (e.name === "page_view") row.views += 1;
    if (e.name === "form_submit") row.leads += 1;
  }
  for (const l of recentLeads) {
    const row = daily.get(dayKey(l.createdAt));
    if (row && l.channel !== "form") row.leads += 1;
  }

  const journey: JourneyStep[] = [
    { key: "visitors", label: "Visited the site", hint: "Unique people", value: visitors },
    { key: "engaged", label: "Looked around", hint: "Two or more pages, or a tap", value: engagedPeople },
    {
      key: "cta",
      label: "Clicked quote, call, or text",
      hint: "Showed buying intent",
      value: uniquePeople(recentEvents, ["quote_cta", "call_click", "sms_click"]),
    },
    {
      key: "form",
      label: "Started the estimate",
      hint: "Began the quote form",
      value: uniquePeople(starts),
    },
    {
      key: "estimate",
      label: "Saw a price range",
      hint: "Got numbers on screen",
      value: uniquePeople(estimates),
    },
    { key: "lead", label: "Became a lead", hint: "Form, call, or text captured", value: recentLeads.length },
    { key: "contacted", label: "You talked to them", hint: "Moved past new", value: contactedPlus.length },
    { key: "quoted", label: "Got a firm quote", hint: "Quoted, booked, or done", value: quotedPlus.length },
    { key: "booked", label: "Booked a clean", hint: "On the calendar", value: booked.length },
    { key: "completed", label: "Job completed", hint: "Finished work", value: completed.length },
  ];

  return {
    days,
    views: views.length,
    viewsToday: todayEvents.filter((e) => e.name === "page_view").length,
    visitors,
    visitorsToday,
    sessions: sessionCount,
    pagesPerSession: sessionCount ? Math.round((views.length / sessionCount) * 10) / 10 : 0,
    bounceRate: pct(bounced, sessionCount),
    formStarts: starts.length,
    formSubmits: submits.length,
    calls: calls.length,
    sms: sms.length,
    quoteCtas: ctas.length,
    estimates: estimates.length,
    leads: recentLeads.length,
    leadsToday: todayLeads.length,
    booked: booked.length,
    completed: completed.length,
    newLeads: leads.filter((l) => l.status === "new").length,
    closeRate: pct(booked.length, recentLeads.length),
    visitorToLead: pct(recentLeads.length, visitors),
    viewToLead: pct(submits.length, views.length),
    startToSubmit: pct(submits.length, starts.length),
    viewToStart: pct(starts.length, views.length),
    pipeline,
    won,
    byPage: [...byPage.entries()]
      .map(([path, row]) => ({
        path,
        views: row.views,
        visitors: row.visitors.size || row.views,
        leads: row.leads,
        calls: row.calls,
        rate: pct(row.leads, row.views),
      }))
      .sort((a, b) => b.views - a.views),
    bySource: [...bySource.entries()]
      .map(([source, row]) => ({
        source,
        views: row.views,
        visitors: row.visitors.size || row.views,
        leads: row.leads,
        rate: pct(row.leads, row.visitors.size || row.views),
      }))
      .sort((a, b) => b.visitors - a.visitors),
    byCampaign: [...byCampaign.entries()]
      .map(([campaign, row]) => ({
        campaign,
        ...row,
        rate: pct(row.leads, row.views),
      }))
      .sort((a, b) => b.leads - a.leads || b.views - a.views),
    byDevice: [...byDevice.entries()]
      .map(([device, row]) => ({
        device,
        views: row.views,
        visitors: row.visitors.size || row.views,
        leads: row.leads,
        rate: pct(row.leads, row.visitors.size || row.views),
      }))
      .sort((a, b) => b.visitors - a.visitors),
    daily: [...daily.entries()].map(([date, row]) => ({
      date,
      views: row.views,
      visitors: row.visitors.size,
      leads: row.leads,
    })),
    journey,
  };
}
