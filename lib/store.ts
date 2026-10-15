import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import path from "path";
import type { AnalyticsEvent, Lead, SiteSettings, StoreData } from "./types";

const DIR = path.join(process.cwd(), "data");
const FILE = path.join(DIR, "store.json");

function empty(): StoreData {
  return {
    leads: [],
    events: [],
    settings: {
      responseMinutes: 15,
      phone: "(718) 887-1649",
      smsPhone: "+17188871649",
      estimateMarkup: 0,
    },
  };
}

export function readStore(): StoreData {
  try {
    if (!existsSync(FILE)) {
      const blank = empty();
      writeStore(blank);
      return blank;
    }
    const raw = readFileSync(FILE, "utf8");
    const parsed = JSON.parse(raw) as StoreData;
    return {
      leads: parsed.leads || [],
      events: parsed.events || [],
      settings: { ...empty().settings, ...parsed.settings },
    };
  } catch {
    return empty();
  }
}

export function writeStore(data: StoreData) {
  if (!existsSync(DIR)) mkdirSync(DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(data, null, 2));
}

export function addLead(lead: Lead) {
  const store = readStore();
  store.leads.unshift(lead);
  writeStore(store);
  return lead;
}

export function updateLead(id: string, patch: Partial<Lead>) {
  const store = readStore();
  const idx = store.leads.findIndex((l) => l.id === id);
  if (idx === -1) return null;
  store.leads[idx] = {
    ...store.leads[idx],
    ...patch,
    id,
    updatedAt: new Date().toISOString(),
  };
  writeStore(store);
  return store.leads[idx];
}

export function addEvent(event: AnalyticsEvent) {
  const store = readStore();
  store.events.push(event);
  if (store.events.length > 4000) {
    store.events = store.events.slice(-3000);
  }
  writeStore(store);
  return event;
}

export function saveSettings(settings: Partial<SiteSettings>) {
  const store = readStore();
  store.settings = { ...store.settings, ...settings };
  writeStore(store);
  return store.settings;
}
