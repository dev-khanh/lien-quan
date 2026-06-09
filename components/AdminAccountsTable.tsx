"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Eye, EyeOff, Pencil, Search, Trash2, Wrench } from "lucide-react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { money } from "@/lib/format";

type AdminAccount = {
  id: string;
  slug: string;
  name: string;
  thumbnailUrl: string;
  heroCount: number;
  skinCount: number;
  sssCount: number;
  collaborationCount: number;
  vipLevel: string;
  priceHourly: number;
  priceNight: number;
  priceDaily: number;
  status: "available" | "renting" | "maintenance" | "hidden";
  currentRentEndsAt: string | null;
};

type StatusFilter = "all" | AdminAccount["status"];
type SortKey = "newest" | "sss" | "vip" | "skin" | "priceDay";

const statusLabels = {
  available: "Sẵn sàng",
  renting: "Đang thuê",
  maintenance: "Bảo trì",
  hidden: "Ẩn"
};

const statusClass = {
  available: "bg-green-100 text-green-700",
  renting: "bg-red-100 text-red-700",
  maintenance: "bg-orange-100 text-orange-700",
  hidden: "bg-slate-100 text-slate-600"
};

function vipNumber(value: string) {
  return Number(value.match(/\d+/)?.[0] || 0);
}

export function AdminAccountsTable({ accounts }: { accounts: AdminAccount[] }) {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [sort, setSort] = useState<SortKey>("newest");

  const rows = useMemo(() => {
    let result = accounts;
    const normalizedQuery = query.trim().toLowerCase();
    if (normalizedQuery) result = result.filter((account) => account.name.toLowerCase().includes(normalizedQuery));
    if (status !== "all") result = result.filter((account) => account.status === status);
    if (sort === "sss") result = [...result].sort((a, b) => b.sssCount - a.sssCount);
    if (sort === "vip") result = [...result].sort((a, b) => vipNumber(b.vipLevel) - vipNumber(a.vipLevel));
    if (sort === "skin") result = [...result].sort((a, b) => b.skinCount - a.skinCount);
    if (sort === "priceDay") result = [...result].sort((a, b) => b.priceDaily - a.priceDaily);
    return result;
  }, [accounts, query, sort, status]);

  async function patch(id: string, path: string, body?: unknown) {
    const res = await fetch(`/api/admin/accounts/${id}/${path}`, {
      method: "PATCH",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });
    if (res.ok) window.location.reload();
    else alert((await res.json().catch(() => null))?.error || "Không cập nhật được ACC.");
  }

  async function setRenting(id: string) {
    const endTime = window.prompt("Nhập thời gian kết thúc dạng YYYY-MM-DDTHH:mm", "");
    if (!endTime) return;
    await patch(id, "set-renting", { endTime, packageType: "hourly", customerName: "Admin set", phone: "N/A", contact: "Admin" });
  }

  async function remove(id: string) {
    if (!window.confirm("Xóa ACC này? Hành động này không thể hoàn tác.")) return;
    const res = await fetch(`/api/admin/accounts/${id}`, { method: "DELETE" });
    if (res.ok) window.location.reload();
    else alert("Không xóa được ACC.");
  }

  return (
    <section className="rounded-lg border border-[#f3d6e6] bg-white p-4 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <Link href="/pt-admin/accounts/create" className="rounded-md bg-[#ec3f96] px-4 py-2 text-sm font-black text-white">+ Thêm ACC</Link>
        <label className="relative min-w-60 flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ec3f96]" />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search theo tên ACC" className="h-10 w-full rounded-md border border-[#f3d6e6] pl-10 pr-3 text-sm font-semibold" />
        </label>
        <select value={status} onChange={(event) => setStatus(event.target.value as StatusFilter)} className="h-10 rounded-md border border-[#f3d6e6] px-3 text-sm font-bold">
          <option value="all">Tất cả</option>
          <option value="available">Sẵn sàng</option>
          <option value="renting">Đang thuê</option>
          <option value="maintenance">Bảo trì</option>
          <option value="hidden">Ẩn</option>
        </select>
        <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)} className="h-10 rounded-md border border-[#f3d6e6] px-3 text-sm font-bold">
          <option value="newest">Mới nhất</option>
          <option value="sss">SSS cao</option>
          <option value="vip">VIP cao</option>
          <option value="skin">Tổng Skin cao</option>
          <option value="priceDay">Giá ngày cao</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[1180px] text-left text-sm">
          <thead>
            <tr className="border-b bg-[#fff7fb] text-xs uppercase text-slate-500">
              <th className="p-2">ACC</th><th>Skin SSS</th><th>Skin hợp tác</th><th>VIP</th><th>Tổng Skin</th><th>Tướng</th><th>Giá giờ</th><th>Giá đêm</th><th>Giá ngày</th><th>Trạng thái</th><th>Còn lại</th><th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((account) => (
              <tr key={account.id} className="border-b align-middle">
                <td className="p-2">
                  <div className="flex items-center gap-3">
                    <Image src={account.thumbnailUrl} alt={account.name} width={64} height={46} unoptimized className="h-12 w-16 rounded-md object-cover" />
                    <span className="font-black">{account.name}</span>
                  </div>
                </td>
                <td>{account.sssCount}</td>
                <td>{account.collaborationCount}</td>
                <td>{account.vipLevel}</td>
                <td>{account.skinCount}</td>
                <td>{account.heroCount}</td>
                <td>{money(account.priceHourly)}</td>
                <td>{money(account.priceNight)}</td>
                <td>{money(account.priceDaily)}</td>
                <td><span className={`rounded-full px-2 py-1 text-xs font-black ${statusClass[account.status]}`}>{statusLabels[account.status]}</span></td>
                <td>{account.status === "renting" && account.currentRentEndsAt ? <CountdownTimer endAt={account.currentRentEndsAt} /> : "-"}</td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    <Link href={`/accounts/${account.slug}`} className="rounded-md border border-[#f3d6e6] p-2 text-[#ec3f96]" title="Xem"><Eye className="h-4 w-4" /></Link>
                    <Link href={`/pt-admin/accounts/${account.id}/edit`} className="rounded-md border border-[#f3d6e6] p-2 text-[#ec3f96]" title="Sửa"><Pencil className="h-4 w-4" /></Link>
                    <button onClick={() => setRenting(account.id)} className="rounded-md bg-red-600 px-2 py-1 text-xs font-black text-white">Set đang thuê</button>
                    <button onClick={() => patch(account.id, "set-available")} className="rounded-md bg-green-600 px-2 py-1 text-xs font-black text-white">Sẵn sàng</button>
                    <button onClick={() => patch(account.id, "set-maintenance")} className="rounded-md bg-orange-500 p-2 text-white" title="Bảo trì"><Wrench className="h-4 w-4" /></button>
                    {account.status === "hidden" ? (
                      <button onClick={() => patch(account.id, "show")} className="rounded-md bg-slate-700 p-2 text-white" title="Hiện"><Eye className="h-4 w-4" /></button>
                    ) : (
                      <button onClick={() => patch(account.id, "hide")} className="rounded-md bg-slate-500 p-2 text-white" title="Ẩn"><EyeOff className="h-4 w-4" /></button>
                    )}
                    <button onClick={() => remove(account.id)} className="rounded-md bg-red-700 p-2 text-white" title="Xóa"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
