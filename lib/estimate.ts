export type EstimateInput = {
  serviceSlug: string;
  bedrooms: number;
  bathrooms: number;
  sqft?: number;
  frequency?: string;
};

const BASE: Record<string, number> = {
  "residential-apartment-cleaning": 145,
  "recurring-cleaning": 135,
  "deep-cleaning-services": 245,
  "move-in-move-out-cleaning": 295,
  "airbnb-short-term-rental-cleaning": 165,
  "post-construction-cleaning": 490,
  "after-renovation-cleanup": 385,
  "office-commercial-cleaning": 185,
  "window-cleaning": 155,
  "outdoor-house-washing": 275,
  "custom-cleaning-services": 210,
};

const FREQUENCY: Record<string, number> = {
  weekly: 0.78,
  "bi-weekly": 0.86,
  monthly: 0.94,
  "one-time": 1,
};

export function calcEstimate(input: EstimateInput) {
  const base = BASE[input.serviceSlug] ?? 180;
  const beds = Math.max(0, input.bedrooms || 1);
  const baths = Math.max(0, input.bathrooms || 1);
  const extraBeds = Math.max(0, beds - 1) * 45;
  const extraBaths = Math.max(0, baths - 1) * 35;
  const sqft = input.sqft && input.sqft > 800 ? (input.sqft - 800) * 0.12 : 0;
  const freq = FREQUENCY[input.frequency || "one-time"] ?? 1;
  const mid = Math.round((base + extraBeds + extraBaths + sqft) * freq);
  const low = Math.round(mid * 0.9);
  const high = Math.round(mid * 1.18);
  return { low, mid, high };
}

export function formatMoney(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}
