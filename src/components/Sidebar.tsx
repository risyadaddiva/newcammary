"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/pos", label: "POS", icon: "☕" },
  { href: "/inventory", label: "Inventory", icon: "📦" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-stone-950 border-r border-stone-800 flex flex-col min-h-screen">
      <div className="p-6 border-b border-stone-800">
        <h1 className="text-xl font-bold text-amber-100">
          Coffee New Cammary
        </h1>
        <p className="text-xs text-stone-500 mt-1">Point of Sales</p>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-amber-900/40 text-amber-100"
                  : "text-stone-400 hover:bg-stone-900 hover:text-stone-200"
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <div className="p-4 border-t border-stone-800">
        <button
          onClick={() => signOut({ callbackUrl: "/login" })}
          className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-sm font-medium text-stone-400 hover:bg-stone-900 hover:text-red-400 transition-colors cursor-pointer"
        >
          <span>🚪</span>
          Logout
        </button>
      </div>
    </aside>
  );
}
