import { NextResponse } from "next/server";
import { isAuthed } from "@/lib/auth";
import { readStore } from "@/lib/store";

export async function GET() {
  if (!(await isAuthed())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ leads: readStore().leads });
}
