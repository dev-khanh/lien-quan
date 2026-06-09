"use client";

import { useState } from "react";

export function RentForm({ accountId, disabled = false, disabledMessage = "ACC này đang được thuê, vui lòng chọn ACC khác." }: { accountId: string; disabled?: boolean; disabledMessage?: string }) {
  const [message, setMessage] = useState("");
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
      <input name="customerName" required disabled={disabled} placeholder="Tên khách" className="w-full rounded-md border px-3 py-2" />
      <input name="phone" required disabled={disabled} placeholder="Số điện thoại" className="w-full rounded-md border px-3 py-2" />
      <input name="contact" required disabled={disabled} placeholder="Zalo/Facebook" className="w-full rounded-md border px-3 py-2" />
      <select name="packageType" disabled={disabled} className="w-full rounded-md border px-3 py-2">
        <option value="hourly">Theo giờ</option>
        <option value="night">Qua đêm</option>
        <option value="daily">Theo ngày</option>
      </select>
      <input name="bill" type="file" disabled={disabled} accept="image/jpeg,image/png,image/webp" className="w-full rounded-md border bg-white px-3 py-2 text-sm" />
      <button disabled={disabled} className="w-full rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white disabled:cursor-not-allowed disabled:bg-slate-300">Gửi đơn thuê</button>
      {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
    </form>
  );
}
