"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setError("Wrong password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0c0b0a] px-5 text-[#f6efe6]">
      <form onSubmit={submit} className="w-full max-w-sm border border-[#c09a59]/30 bg-[#161311] p-8">
        <div className="font-serif text-center text-3xl tracking-[0.2em] uppercase">Velora</div>
        <p className="mt-2 text-center text-xs tracking-[0.18em] uppercase text-[#c09a59]">
          Owner command
        </p>
        <label className="mt-8 block text-xs uppercase tracking-widest">
          Password
          <input
            type="password"
            className="mt-2 w-full border border-white/15 bg-[#0c0b0a] px-3 py-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoFocus
          />
        </label>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <button
          type="submit"
          className="mt-6 w-full bg-[#c09a59] py-3 text-sm font-semibold tracking-[0.14em] uppercase text-white"
        >
          Enter
        </button>
      </form>
    </div>
  );
}
