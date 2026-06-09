"use client";

import { useState } from "react";

export function ReviewForm({ accountId }: { accountId: string }) {
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    setMessage(res.ok ? "Đã gửi đánh giá, chờ shop duyệt." : "Không gửi được đánh giá.");
  }
  return (
    <form action={submit} className="space-y-3 rounded-[22px] border border-[#f3d6e6] bg-white p-4 shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
      <input type="hidden" name="accountId" value={accountId} />
      <input name="customerName" required placeholder="Tên của bạn" className="w-full rounded-md border px-3 py-2" />
      <select name="rating" className="w-full rounded-md border px-3 py-2">
        {[5, 4, 3, 2, 1].map((rating) => <option key={rating} value={rating}>{rating} sao</option>)}
      </select>
      <textarea name="comment" required placeholder="Bình luận" className="min-h-24 w-full rounded-md border px-3 py-2" />
      <button className="rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white">Gửi đánh giá</button>
      {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
    </form>
  );
}
