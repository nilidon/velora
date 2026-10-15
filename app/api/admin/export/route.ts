import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/store";

export async function GET() {
  if (!(await isAuthed())) return new NextResponse("Unauthorized", { status: 401 });
  const { leads } = readStore();
  const headers = [
    "createdAt",
    "status",
    "name",
    "phone",
    "service",
    "estimateLow",
    "estimateHigh",
    "bookedValue",
    "utmSource",
    "utmCampaign",
    "landingPage",
  ];
  const lines = [
    headers.join(","),
    ...leads.map((l) =>
      headers
        .map((h) => `"${String((l as Record<string, unknown>)[h] ?? "").replace(/"/g, '""')}"`)
        .join(","),
    ),
  ];
  return new NextResponse(lines.join("\n"), {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition": "attachment; filename=velora-leads.csv",
    },
  });
}
