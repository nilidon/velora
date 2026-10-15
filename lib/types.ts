export type LeadStatus =
  | "new"
  | "contacted"
  | "quoted"
  | "booked"
  | "completed"
  | "lost";

export type LeadChannel = "form" | "call" | "sms";

export type Lead = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: LeadStatus;
  channel: LeadChannel;
  name: string;
  phone: string;
  email: string;
  address: string;
  zip: string;
  service: string;
  serviceSlug: string;
  frequency: string;
  bedrooms: number;
  bathrooms: number;
  sqft: string;
  preferredDate: string;
  notes: string;
  estimateLow: number;
  estimateHigh: number;
  bookedValue: number;
  landingPage: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  adminNotes: string;
};

export type AnalyticsEvent = {
  id: string;
  ts: string;
  name:
    | "page_view"
    | "form_start"
    | "form_submit"
    | "call_click"
    | "sms_click"
    | "quote_cta"
    | "estimate_view";
  path: string;
  landingPage: string;
  serviceSlug: string;
  referrer: string;
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  gclid: string;
  visitorId?: string;
  sessionId?: string;
  device?: string;
  meta?: Record<string, string | number>;
};

export type SiteSettings = {
  responseMinutes: number;
  phone: string;
  smsPhone: string;
  estimateMarkup: number;
};

export type StoreData = {
  leads: Lead[];
  events: AnalyticsEvent[];
  settings: SiteSettings;
};
