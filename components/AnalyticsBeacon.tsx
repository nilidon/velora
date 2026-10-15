"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

type EventName =
  | "page_view"
  | "form_start"
  | "form_submit"
  | "call_click"
  | "sms_click"
  | "quote_cta"
  | "estimate_view";

function ids() {
  let visitorId = localStorage.getItem("velora_vid");
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem("velora_vid", visitorId);
  }

  const now = Date.now();
  let session: { id: string; landing: string; at: number } | null = null;
  try {
    session = JSON.parse(sessionStorage.getItem("velora_session") || "null");
  } catch {
    session = null;
  }
  if (!session?.id || now - session.at > 30 * 60 * 1000) {
    session = { id: crypto.randomUUID(), landing: window.location.pathname, at: now };
  } else {
    session.at = now;
  }
  sessionStorage.setItem("velora_session", JSON.stringify(session));

  const w = window.innerWidth;
  const device = w < 768 ? "mobile" : w < 1024 ? "tablet" : "desktop";

  return {
    visitorId,
    sessionId: session.id,
    landingPage: session.landing,
    device,
  };
}

function payload(name: EventName, extra: Record<string, string> = {}) {
  const params = new URLSearchParams(window.location.search);
  const who = ids();
  return {
    name,
    path: window.location.pathname,
    landingPage: who.landingPage,
    serviceSlug: extra.serviceSlug || "",
    referrer: document.referrer,
    utmSource: params.get("utm_source") || "",
    utmMedium: params.get("utm_medium") || "",
    utmCampaign: params.get("utm_campaign") || "",
    utmTerm: params.get("utm_term") || "",
    utmContent: params.get("utm_content") || "",
    gclid: params.get("gclid") || "",
    visitorId: who.visitorId,
    sessionId: who.sessionId,
    device: who.device,
    ...extra,
  };
}

const lastPageView = { path: "", at: 0 };

export function track(name: EventName, extra: Record<string, string> = {}) {
  if (typeof window === "undefined") return;
  if (window.location.pathname.startsWith("/admin")) return;
  if (name === "page_view") {
    const now = Date.now();
    const path = window.location.pathname;
    if (lastPageView.path === path && now - lastPageView.at < 1500) return;
    lastPageView.path = path;
    lastPageView.at = now;
  }
  fetch("/api/track", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload(name, extra)),
    keepalive: true,
  }).catch(() => {});
}

export function AnalyticsBeacon() {
  const path = usePathname();
  const search = useSearchParams();

  useEffect(() => {
    if (path.startsWith("/admin")) return;
    track("page_view");
  }, [path, search]);

  return null;
}
