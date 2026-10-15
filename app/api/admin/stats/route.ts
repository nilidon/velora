import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/store";
import { computeStats } from "@/lib/stats";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const store = readStore();
  return NextResponse.json({
    stats: computeStats(store.leads, store.events),
    settings: store.settings,
  });
}
