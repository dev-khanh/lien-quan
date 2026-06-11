"use client";

import Link from "next/link";
import { BarChart3, FileText, LogOut, MessageSquare, Package, Settings, ShoppingCart } from "lucide-react";

const links = [
  { href: "/pt-admin/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/pt-admin/accounts", label: "Quản lý ACC", icon: Package },
  { href: "/pt-admin/orders", label: "Đơn thuê", icon: ShoppingCart },
  { href: "/pt-admin/reviews", label: "Đánh giá", icon: MessageSquare },
  { href: "/pt-admin/posts", label: "Tin tức", icon: FileText },
  { href: "/pt-admin/settings", label: "Cài đặt", icon: Settings }
];

export function AdminNav() {
  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    window.location.href = "/pt-admin/login";
  }

  return (
    <nav className="mb-5 rounded-[18px] border border-[#f3d6e6] bg-white p-3 shadow-[0_10px_24px_rgba(236,63,150,0.10)]">
      <div className="flex flex-wrap items-center gap-2 text-sm font-black">
        {links.map(({ href, label, icon: Icon }) => (
          <Link key={href} className="inline-flex items-center gap-2 rounded-md border border-[#f3d6e6] bg-[#fff7fb] px-3 py-2 text-[#ec3f96]" href={href}>
            <Icon className="h-4 w-4" />
            {label}
          </Link>
        ))}
        <button type="button" onClick={logout} className="ml-auto inline-flex items-center gap-2 rounded-md bg-red-600 px-3 py-2 text-white">
          <LogOut className="h-4 w-4" />
          Đăng xuất
        </button>
      </div>
    </nav>
  );
}
