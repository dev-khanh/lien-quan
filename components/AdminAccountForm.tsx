"use client";

import { useState } from "react";

const defaults = {
  name: "ACC NEW",
  slug: "acc-new",
  description: "Acc Liên Quân cho thuê.",
  heroCount: 100,
  skinCount: 250,
  sssCount: 5,
  collaborationCount: 3,
  rank: "Cao thủ",
  winRate: 60,
  reputation: 4.8,
  vipLevel: "VIP 5",
  priceHourly: 10000,
  priceNight: 59000,
  priceDaily: 109000,
  thumbnailUrl: "/account-samples/acc-sea.jpg",
  gameUsername: "",
  gamePassword: ""
};

export function AdminAccountForm() {
  const [message, setMessage] = useState("");
  async function submit(formData: FormData) {
    const images = String(formData.get("images") || "")
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
    const body = { ...Object.fromEntries(formData), images, status: "available", isVisible: true };
    const res = await fetch("/api/admin/accounts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    setMessage(res.ok ? "Đã tạo acc." : "Không tạo được acc.");
    if (res.ok) window.location.reload();
  }
  return (
    <form action={submit} className="mb-5 grid gap-3 rounded-lg bg-[#fff5fb] p-3 sm:grid-cols-2 lg:grid-cols-4">
      {Object.entries(defaults).map(([name, value]) => (
        <input key={name} name={name} defaultValue={value} placeholder={name} className="rounded-md border px-3 py-2 text-sm" />
      ))}
      <textarea name="images" placeholder="Mỗi dòng một URL ảnh chi tiết" className="min-h-20 rounded-md border px-3 py-2 text-sm sm:col-span-2 lg:col-span-4" />
      <button className="rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white sm:col-span-2 lg:col-span-4">Thêm acc</button>
      {message && <p className="text-sm font-bold text-[#ec3f96] sm:col-span-2 lg:col-span-4">{message}</p>}
    </form>
  );
}

export function HideAccountButton({ id }: { id: string }) {
  async function click() {
    const res = await fetch(`/api/admin/accounts/${id}`, { method: "DELETE" });
    if (res.ok) window.location.reload();
  }
  return <button onClick={click} className="rounded-md bg-red-600 px-3 py-2 text-xs font-black text-white">Ẩn</button>;
}
