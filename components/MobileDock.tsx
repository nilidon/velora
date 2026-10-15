"use client";

import Link from "next/link";
import { MessageSquare, Phone } from "lucide-react";
import { site } from "@/lib/site";
import { track } from "@/components/AnalyticsBeacon";

export function MobileDock() {
  return (
    <div className="fixed bottom-4 left-4 right-4 z-40 grid grid-cols-3 overflow-hidden rounded-full bg-white/95 shadow-card backdrop-blur md:hidden">
      <a
        href={site.smsHref}
        onClick={() => track("sms_click")}
        className="flex flex-col items-center gap-0.5 py-3 text-[11px] text-ink"
      >
        <MessageSquare size={16} className="text-gold" />
        Text
      </a>
      <Link
        href="/quote"
        onClick={() => track("quote_cta")}
        className="flex flex-col items-center justify-center bg-gold py-3 text-[11px] font-medium text-white"
      >
        Free Quote
      </Link>
      <a
        href={site.phoneHref}
        onClick={() => track("call_click")}
        className="flex flex-col items-center gap-0.5 py-3 text-[11px] text-ink"
      >
        <Phone size={16} className="text-gold" />
        Call
      </a>
    </div>
  );
}
