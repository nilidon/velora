import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE = "velora_admin";

function secret() {
  return process.env.ADMIN_SESSION_SECRET || "dev-only-change-me";
}

function sign(value: string) {
  return createHmac("sha256", secret()).update(value).digest("hex");
}

export function checkPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD || "velora2026";
  const a = Buffer.from(password);
  const b = Buffer.from(expected);
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function createSession() {
  const exp = Date.now() + 7 * 24 * 60 * 60 * 1000;
  const payload = `ok.${exp}`;
  const token = `${payload}.${sign(payload)}`;
  const jar = await cookies();
  jar.set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(exp),
  });
}

export async function clearSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}

export async function isAuthed() {
  const jar = await cookies();
  const raw = jar.get(COOKIE)?.value;
  if (!raw) return false;
  const parts = raw.split(".");
  if (parts.length !== 3) return false;
  const [ok, exp, sig] = parts;
  const payload = `${ok}.${exp}`;
  const expected = sign(payload);
  try {
    const good = timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
    return good && ok === "ok" && Number(exp) > Date.now();
  } catch {
    return false;
  }
}
