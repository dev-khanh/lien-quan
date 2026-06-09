"use client";

import { useState } from "react";

export function RentForm({ accountId }: { accountId: string }) {
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    setMessage("Đang gửi...");
    const res = await fetch("/api/rent-orders", { method: "POST", body: formData });
    const data = await res.json();
    setMessage(res.ok ? "Đã tạo đơn. Shop sẽ xác nhận thanh toán trước khi giao acc." : data.error || "Có lỗi xảy ra.");
  }
  return (
    <form action={submit} className="space-y-3 rounded-[22px] border border-[#f3d6e6] bg-white p-4 shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
      <input type="hidden" name="accountId" value={accountId} />
      <input name="customerName" required placeholder="Tên khách" className="w-full rounded-md border px-3 py-2" />
      <input name="phone" required placeholder="Số điện thoại" className="w-full rounded-md border px-3 py-2" />
      <input name="contact" required placeholder="Zalo/Facebook" className="w-full rounded-md border px-3 py-2" />
      <select name="packageType" className="w-full rounded-md border px-3 py-2">
        <option value="hourly">Theo giờ</option>
        <option value="night">Qua đêm</option>
        <option value="daily">Theo ngày</option>
      </select>
      <input name="bill" type="file" accept="image/jpeg,image/png,image/webp" className="w-full rounded-md border bg-white px-3 py-2 text-sm" />
      <button className="w-full rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white">Gửi đơn thuê</button>
      {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
    </form>
  );
}
