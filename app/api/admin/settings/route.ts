import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { saveSettings } from "@/lib/store";

export async function POST(req: Request) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json();
  const settings = saveSettings({
    responseMinutes: Number(body.responseMinutes) || 15,
    phone: String(body.phone || ""),
    smsPhone: String(body.smsPhone || ""),
    estimateMarkup: Number(body.estimateMarkup) || 0,
  });
  return NextResponse.json({ settings });
}
