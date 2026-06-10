"use client";

import Image from "next/image";
import { useState } from "react";

type SettingsValue = {
  shopName: string;
  zaloPhone: string | null;
  zaloUrl: string | null;
  facebookUrl: string | null;
  rentalGuide: string | null;
  bankInfo: string | null;
  paymentQrUrl: string | null;
};

function value(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

async function uploadFile(file: File) {
  const form = new FormData();
  form.append("file", file);
  const res = await fetch("/api/admin/upload", { method: "POST", body: form });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Upload thất bại.");
  return String(data.url);
}

export function AdminSettingsForm({ settings }: { settings: SettingsValue }) {
  const [paymentQrUrl, setPaymentQrUrl] = useState(settings.paymentQrUrl || "");
  const [paymentQrPreview, setPaymentQrPreview] = useState(settings.paymentQrUrl || "");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);

  async function chooseQr(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setMessage("");
    try {
      setPaymentQrPreview(URL.createObjectURL(file));
      setPaymentQrUrl(await uploadFile(file));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload thất bại.");
    }
  }

  async function submit(formData: FormData) {
    setSaving(true);
    setMessage("");
    const body = {
      shopName: value(formData, "shopName"),
      zaloPhone: value(formData, "zaloPhone") || null,
      zaloUrl: value(formData, "zaloUrl") || null,
      facebookUrl: value(formData, "facebookUrl") || null,
      rentalGuide: value(formData, "rentalGuide") || null,
      bankInfo: value(formData, "bankInfo") || null,
      paymentQrUrl: paymentQrUrl || null
    };
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    setMessage(res.ok ? "Đã lưu cài đặt." : data.error || "Không lưu được cài đặt.");
  }

  return (
    <form action={submit} className="space-y-5 rounded-lg border border-[#f3d6e6] bg-white p-5 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
      <div>
        <h1 className="text-2xl font-black text-[#111827]">Cài đặt shop</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">Thông tin này dùng cho nút thuê qua Zalo ngoài public.</p>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        <Field name="shopName" label="Tên shop" defaultValue={settings.shopName} />
        <Field name="zaloPhone" label="Số Zalo" defaultValue={settings.zaloPhone || ""} placeholder="VD: 0901234567" />
        <Field name="zaloUrl" label="Link Zalo" defaultValue={settings.zaloUrl || ""} placeholder="https://zalo.me/..." />
        <Field name="facebookUrl" label="Link Facebook" defaultValue={settings.facebookUrl || ""} placeholder="https://facebook.com/..." />
      </div>
      <label className="block text-sm font-bold text-slate-700">
        Nội dung hướng dẫn thuê
        <textarea name="rentalGuide" defaultValue={settings.rentalGuide || ""} className="mt-1 min-h-28 w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96]" />
      </label>
      <label className="block text-sm font-bold text-slate-700">
        Thông tin ngân hàng
        <textarea name="bankInfo" defaultValue={settings.bankInfo || ""} className="mt-1 min-h-28 w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96]" />
      </label>
      <div className="rounded-lg border border-[#f3d6e6] bg-[#fff7fb] p-4">
        <p className="mb-2 text-sm font-black text-slate-700">QR thanh toán</p>
        <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => chooseQr(event.target.files)} className="block w-full text-sm" />
        {paymentQrPreview && (
          <div className="mt-3 w-56 overflow-hidden rounded-lg border border-[#f3d6e6] bg-white">
            <Image src={paymentQrPreview} alt="Preview QR thanh toán" width={320} height={320} unoptimized className="h-56 w-full object-contain" />
            <button type="button" onClick={() => { setPaymentQrUrl(""); setPaymentQrPreview(""); }} className="w-full bg-red-600 px-3 py-2 text-sm font-black text-white">Xóa QR</button>
          </div>
        )}
      </div>
      <button disabled={saving} className="rounded-md bg-[#ec3f96] px-5 py-3 font-black text-white disabled:opacity-60">{saving ? "Đang lưu..." : "Lưu cài đặt"}</button>
      {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
    </form>
  );
}

function Field({ label, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input {...props} className="mt-1 w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96]" />
    </label>
  );
}
