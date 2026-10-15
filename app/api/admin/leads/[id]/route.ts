import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { updateLead } from "@/lib/store";
import type { LeadStatus } from "@/lib/types";

const STATUSES: LeadStatus[] = ["new", "contacted", "quoted", "booked", "completed", "lost"];

export async function PATCH(req: Request, ctx: { params: Promise<{ id: string }> }) {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { id } = await ctx.params;
  const body = await req.json();
  const patch: Record<string, unknown> = {};
  if (body.status && STATUSES.includes(body.status)) patch.status = body.status;
  if (typeof body.adminNotes === "string") patch.adminNotes = body.adminNotes;
  if (body.bookedValue !== undefined) patch.bookedValue = Number(body.bookedValue) || 0;
  const lead = updateLead(id, patch);
  if (!lead) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ lead });
}
