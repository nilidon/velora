"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BarChart3, Inbox, LayoutDashboard, LogOut, Settings } from "lucide-react";
import { cx } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/leads", label: "Leads", icon: Inbox },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Tools & settings", icon: Settings },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const router = useRouter();

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-[#0e0c0a] text-[#f6efe6]">
      <aside className="fixed inset-y-0 left-0 z-20 hidden w-60 border-r border-white/10 bg-[#0e0c0a] px-4 py-6 md:block">
        <div className="px-2 font-serif text-xl tracking-[0.18em] uppercase">Velora</div>
        <div className="px-2 text-[11px] tracking-[0.16em] uppercase text-[#c09a59]">
          Command
        </div>
        <nav className="mt-8 space-y-1">
          {links.map(({ href, label, icon: Icon }) => {
            const active = href === "/admin" ? path === "/admin" : path.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cx(
                  "flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm",
                  active ? "bg-[#c09a59]/15 text-[#c09a59]" : "text-white/70 hover:bg-white/5",
                )}
              >
                <Icon size={16} />
                {label}
              </Link>
            );
          })}
        </nav>
        <button
          type="button"
          onClick={logout}
          className="absolute bottom-6 left-4 flex items-center gap-2 text-sm text-white/50 hover:text-white"
        >
          <LogOut size={14} />
          Sign out
        </button>
      </aside>
      <div className="flex min-h-screen flex-1 flex-col md:pl-60">
        <header className="flex items-center justify-between border-b border-white/10 px-5 py-4 md:hidden">
          <span className="font-serif tracking-[0.16em] uppercase">Velora</span>
          <div className="flex gap-3 text-xs">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="text-[#c09a59]">
                {l.label}
              </Link>
            ))}
          </div>
        </header>
        <div className="flex-1 px-5 py-8 md:px-10">{children}</div>
      </div>
    </div>
  );
}
