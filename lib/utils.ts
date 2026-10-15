export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function uid(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 10)}${Date.now().toString(36)}`;
}

export function readUtms(search: URLSearchParams | Record<string, string>) {
  const get = (key: string) =>
    search instanceof URLSearchParams
      ? search.get(key) || ""
      : search[key] || "";
  return {
    utmSource: get("utm_source"),
    utmMedium: get("utm_medium"),
    utmCampaign: get("utm_campaign"),
    utmTerm: get("utm_term"),
    utmContent: get("utm_content"),
    gclid: get("gclid"),
  };
}

export function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export function slaLabel(iso: string, minutes = 15) {
  const elapsed = Date.now() - new Date(iso).getTime();
  const remain = minutes * 60000 - elapsed;
  if (remain <= 0) return { text: "SLA missed", late: true };
  const m = Math.ceil(remain / 60000);
  return { text: `${m}m left to reply`, late: false };
}
