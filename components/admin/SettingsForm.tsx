"use client";

import { useState } from "react";
import type { SiteSettings } from "@/lib/types";

export function SettingsForm({ initial }: { initial: SiteSettings }) {
  const [form, setForm] = useState(initial);
  const [saved, setSaved] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/admin/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 1600);
  }

  return (
    <form onSubmit={submit} className="mt-4 max-w-md space-y-4">
      <label className="block text-xs uppercase tracking-widest text-white/50">
        Callback SLA (minutes)
        <input
          className="mt-1 w-full border border-white/15 bg-[#0c0b0a] px-3 py-2 text-sm text-white"
          type="number"
          value={form.responseMinutes}
          onChange={(e) => setForm({ ...form, responseMinutes: Number(e.target.value) })}
        />
      </label>
      <label className="block text-xs uppercase tracking-widest text-white/50">
        Public phone
        <input
          className="mt-1 w-full border border-white/15 bg-[#0c0b0a] px-3 py-2 text-sm text-white"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
      </label>
      <button
        type="submit"
        className="bg-[#c09a59] px-5 py-2 text-xs font-semibold tracking-[0.14em] uppercase text-white"
      >
        {saved ? "Saved" : "Save settings"}
      </button>
    </form>
  );
}
