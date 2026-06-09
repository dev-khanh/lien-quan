import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function AdminSettingsPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="rounded-lg border border-[#f3d6e6] bg-white p-5 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
        <h1 className="text-2xl font-black text-[#111827]">Cài đặt</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">Khu vực cấu hình shop, liên hệ và thanh toán.</p>
      </section>
    </main>
  );
}
