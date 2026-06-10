"use client";

import { useState } from "react";
import Image from "next/image";

export function RentForm({ accountId, disabled = false, disabledMessage = "ACC này đang được thuê, vui lòng chọn ACC khác." }: { accountId: string; disabled?: boolean; disabledMessage?: string }) {
  const [message, setMessage] = useState("");
  const [billPreview, setBillPreview] = useState<string | null>(null);
  async function submit(formData: FormData) {
    setMessage("Đang gửi...");
    const res = await fetch("/api/rent-orders", { method: "POST", body: formData });
    const data = await res.json();
    setMessage(res.ok ? "Đã tạo đơn. Shop sẽ xác nhận thanh toán trước khi giao acc." : data.error || "Có lỗi xảy ra.");
  }
  return (
    <form action={submit} className="space-y-3 rounded-[22px] border border-[#f3d6e6] bg-white p-4 shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
      {disabled && <p className="rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-red-600">{disabledMessage}</p>}
      <input type="hidden" name="accountId" value={accountId} />
      <label className="block">
        <span className="mb-1 block text-sm font-black text-[#111827]">Tên khách</span>
        <input name="customerName" required disabled={disabled} placeholder="Nhập tên của bạn" className="w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96] focus:ring-4 focus:ring-pink-100" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-black text-[#111827]">Số điện thoại</span>
        <input name="phone" required disabled={disabled} placeholder="Nhập số điện thoại" className="w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96] focus:ring-4 focus:ring-pink-100" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-black text-[#111827]">Zalo/Facebook</span>
        <input name="contact" required disabled={disabled} placeholder="Link hoặc số Zalo/Facebook" className="w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96] focus:ring-4 focus:ring-pink-100" />
      </label>
      <label className="block">
        <span className="mb-1 block text-sm font-black text-[#111827]">Gói thuê</span>
        <select name="packageType" disabled={disabled} className="w-full rounded-md border border-[#f3d6e6] bg-white px-3 py-2 outline-none focus:border-[#ec3f96] focus:ring-4 focus:ring-pink-100">
          <option value="hourly">Theo giờ</option>
          <option value="night">Qua đêm</option>
          <option value="daily">Theo ngày</option>
        </select>
      </label>
      <div className="rounded-2xl border border-dashed border-[#ffaad0] bg-[#fff7fb] p-3">
        <span className="mb-2 block text-sm font-black text-[#111827]">Upload bill thanh toán</span>
        <label className={`inline-flex cursor-pointer items-center justify-center rounded-xl bg-[#ec3f96] px-4 py-2 text-sm font-black text-white shadow-[0_10px_20px_rgba(236,63,150,0.22)] ${disabled ? "pointer-events-none opacity-50" : ""}`}>
          Chọn ảnh bill từ máy
          <input
            name="bill"
            type="file"
            disabled={disabled}
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={(event) => {
              const file = event.target.files?.[0];
              setBillPreview(file ? URL.createObjectURL(file) : null);
            }}
          />
        </label>
        <p className="mt-2 text-xs font-semibold text-slate-500">Hỗ trợ JPG, PNG, WEBP tối đa 5MB</p>
        {billPreview && (
          <div className="relative mt-3 aspect-video overflow-hidden rounded-xl border border-[#f3d6e6] bg-white">
            <Image src={billPreview} alt="Ảnh preview bill thanh toán" fill unoptimized className="object-contain" />
          </div>
        )}
      </div>
      <button disabled={disabled} className="w-full rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">Gửi đơn thuê</button>
      {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
    </form>
  );
}
