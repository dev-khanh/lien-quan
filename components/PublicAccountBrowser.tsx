"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { AccountCard } from "@/components/AccountCard";

export type PublicAccount = {
  id: string;
  slug: string;
  name: string;
  thumbnailUrl: string;
  sssCount: number;
  collaborationCount: number;
  vipLevel: string;
  priceHourly: number;
  priceNight: number;
  priceDaily: number;
  status: "available" | "renting" | "maintenance" | "hidden";
  currentRentEndsAt: string | null;
};

type FilterKey = "all" | "available" | "renting" | "sss" | "collaboration" | "vip";

const filters: Array<[FilterKey, string]> = [
  ["all", "Tất cả"],
  ["available", "Sẵn sàng"],
  ["renting", "Đang thuê"],
  ["sss", "Skin SSS"],
  ["collaboration", "Skin hợp tác"],
  ["vip", "VIP cao"]
];

function vipNumber(value: string) {
  return Number(value.match(/\d+/)?.[0] || 0);
}

export function PublicAccountBrowser({ accounts }: { accounts: PublicAccount[] }) {
  const [filter, setFilter] = useState<FilterKey>("all");
  const [query, setQuery] = useState("");

  const visibleAccounts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    let result = accounts.filter((account) => account.status !== "hidden");
    if (normalizedQuery) result = result.filter((account) => account.name.toLowerCase().includes(normalizedQuery));
    if (filter === "available") result = result.filter((account) => account.status === "available");
    if (filter === "renting") result = result.filter((account) => account.status === "renting");
    if (filter === "sss") result = [...result].sort((a, b) => b.sssCount - a.sssCount);
    if (filter === "collaboration") result = [...result].sort((a, b) => b.collaborationCount - a.collaborationCount);
    if (filter === "vip") result = [...result].sort((a, b) => vipNumber(b.vipLevel) - vipNumber(a.vipLevel));
    return result;
  }, [accounts, filter, query]);

  return (
    <>
      <section className="mb-6 rounded-[22px] border border-[#fbd0e3] bg-white/[0.90] p-4 shadow-[0_14px_38px_rgba(236,63,150,0.16)] backdrop-blur-md">
        <label className="relative mb-4 block">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#ec3f96]" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Tìm tên ACC"
            className="h-12 w-full rounded-full border border-[#f3d6e6] bg-white/[0.96] pl-10 pr-4 text-sm font-semibold text-[#111827] outline-none transition placeholder:text-slate-400 focus:border-[#ec3f96] focus:shadow-[0_0_0_4px_rgba(236,63,150,0.08)]"
          />
        </label>
        <div className="flex flex-wrap gap-3">
          {filters.map(([key, label]) => {
            const active = filter === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setFilter(key)}
                className={`rounded-full border px-5 py-2.5 text-sm font-black transition ${active ? "border-[#ec3f96] bg-[#ec3f96] text-white shadow-[0_10px_22px_rgba(236,63,150,0.24)]" : "border-[#f3d6e6] bg-white text-[#ec3f96] hover:border-[#ec3f96]"}`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </section>

      {visibleAccounts.length ? (
        <section className="grid grid-cols-1 gap-6 min-[560px]:grid-cols-2 lg:grid-cols-3">
          {visibleAccounts.map((account, index) => <AccountCard key={account.id} account={account} priority={index < 3} />)}
        </section>
      ) : (
        <section className="rounded-[20px] border border-[#f3d6e6] bg-white p-8 text-center font-black text-[#ec3f96]">
          Chưa có ACC phù hợp.
        </section>
      )}
    </>
  );
}
