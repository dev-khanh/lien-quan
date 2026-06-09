"use client";

import { useState } from "react";

export function AdminLoginForm() {
  const [error, setError] = useState("");
  async function submit(formData: FormData) {
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    if (res.ok) window.location.href = "/pt-admin/dashboard";
    else setError("Email hoặc mật khẩu không đúng.");
  }
  return (
    <main className="grid min-h-screen place-items-center bg-[#fff5fb] px-4">
      <form action={submit} className="w-full max-w-sm space-y-3 rounded-[22px] border border-[#f3d6e6] bg-white p-5 shadow-[0_12px_32px_rgba(236,63,150,0.12)]">
        <h1 className="text-2xl font-black text-[#111827]">PT Admin</h1>
        <label className="block text-sm font-bold text-slate-700">
          Email admin
          <input name="email" type="email" defaultValue="admin@lienquan.local" className="mt-1 w-full rounded-md border px-3 py-2" />
        </label>
        <label className="block text-sm font-bold text-slate-700">
          Mật khẩu
          <input name="password" type="password" placeholder="Nhập mật khẩu admin" className="mt-1 w-full rounded-md border px-3 py-2" />
        </label>
        <button className="w-full rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white">Đăng nhập</button>
        {error && <p className="text-sm font-bold text-red-600">{error}</p>}
      </form>
    </main>
  );
}
