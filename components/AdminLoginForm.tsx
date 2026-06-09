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
    if (res.ok) window.location.href = "/admin";
    else setError("Email hoặc mật khẩu không đúng.");
  }
  return (
    <main className="grid min-h-screen place-items-center px-4">
      <form action={submit} className="w-full max-w-sm space-y-3 rounded-lg bg-white p-5 shadow-game">
        <h1 className="text-2xl font-black text-purple-950">Admin login</h1>
        <input name="email" type="email" defaultValue="admin@lienquan.local" className="w-full rounded-md border px-3 py-2" />
        <input name="password" type="password" placeholder="Mật khẩu" className="w-full rounded-md border px-3 py-2" />
        <button className="w-full rounded-md bg-purple-700 px-4 py-2 font-black text-white">Đăng nhập</button>
        {error && <p className="text-sm font-bold text-red-600">{error}</p>}
      </form>
    </main>
  );
}
