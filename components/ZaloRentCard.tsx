"use client";

import { Copy, MessageCircle } from "lucide-react";
import { useState } from "react";
import { CountdownTimer } from "@/components/CountdownTimer";
import { money } from "@/lib/format";

type ZaloRentCardProps = {
  account: {
    name: string;
    status: "available" | "renting" | "maintenance" | "hidden";
    priceHourly: number;
    priceNight: number;
    priceDaily: number;
    currentRentEndsAt: string | null;
  };
  zaloHref: string;
  rentalGuide?: string | null;
};

const statusLabel = {
  available: "Sẵn sàng",
  renting: "Đang thuê",
  maintenance: "Bảo trì",
  hidden: "Ẩn"
};

export function ZaloRentCard({ account, zaloHref, rentalGuide }: ZaloRentCardProps) {
  const [message, setMessage] = useState("");
  const available = account.status === "available";
  const renting = account.status === "renting";
  const copyText = `Em muốn thuê ${account.name}. Giá: ${money(account.priceHourly)}/giờ, ${money(account.priceNight)}/đêm, ${money(account.priceDaily)}/ngày. Shop kiểm tra giúp em acc còn trống không.`;

  async function copyMessage() {
    await navigator.clipboard.writeText(copyText);
    setMessage("Đã copy nội dung, hãy dán vào Zalo để nhắn shop.");
    window.setTimeout(() => setMessage(""), 3000);
  }

  return (
    <section className="rounded-[24px] border border-[#f3d6e6] bg-white p-5 shadow-[0_16px_38px_rgba(236,63,150,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-xl font-black text-[#111827]">Thuê ACC qua Zalo</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
            {rentalGuide || "Nhấn nút bên dưới để liên hệ shop qua Zalo. Admin sẽ kiểm tra acc còn trống, xác nhận thanh toán và gửi thông tin đăng nhập."}
          </p>
        </div>
        <span className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${available ? "bg-emerald-100 text-emerald-700" : renting ? "bg-red-100 text-red-700" : "bg-orange-100 text-orange-700"}`}>
          {statusLabel[account.status]}
        </span>
      </div>

      <div className="mt-4 rounded-2xl border border-[#f3d6e6] bg-[#fff7fb] p-4">
        <p className="text-sm font-black text-[#111827]">{account.name}</p>
        <div className="mt-3 grid gap-2">
          <span className="rounded-full bg-amber-100 px-3 py-2 text-sm font-black text-orange-700">{money(account.priceHourly)} / giờ</span>
          <span className="rounded-full bg-amber-100 px-3 py-2 text-sm font-black text-orange-700">{money(account.priceNight)} / đêm</span>
          <span className="rounded-full bg-amber-100 px-3 py-2 text-sm font-black text-orange-700">{money(account.priceDaily)} / ngày</span>
        </div>
        {renting && account.currentRentEndsAt && (
          <div className="mt-3">
            <CountdownTimer endAt={account.currentRentEndsAt} variant="bar" />
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-2">
        {available ? (
          <a href={zaloHref} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-[#0068ff] px-4 text-sm font-black uppercase text-white shadow-[0_14px_26px_rgba(0,104,255,0.24)]">
            <MessageCircle className="h-5 w-5" />
            Thuê qua Zalo
          </a>
        ) : (
          <button disabled className="h-12 cursor-not-allowed rounded-xl bg-slate-200 px-4 text-sm font-black uppercase text-slate-500">
            {renting ? "Đang được thuê" : "ACC đang bảo trì"}
          </button>
        )}
        <button type="button" onClick={copyMessage} className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-[#f3d6e6] bg-white px-4 text-sm font-black uppercase text-[#ec3f96]">
          <Copy className="h-4 w-4" />
          Copy nội dung nhắn Zalo
        </button>
      </div>
      {message && <p className="mt-3 rounded-xl bg-emerald-50 px-3 py-2 text-sm font-bold text-emerald-700">{message}</p>}
    </section>
  );
}
