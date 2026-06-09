"use client";

import Image from "next/image";
import type React from "react";
import { useMemo, useState } from "react";

type AccountFormValue = {
  id?: string;
  name: string;
  slug: string;
  description: string | null;
  heroCount: number;
  skinCount: number;
  sssCount: number;
  collaborationCount: number;
  battleCount?: number;
  rank: string;
  winRate: number;
  reputation: number;
  vipLevel: string;
  priceHourly: number;
  priceNight: number;
  priceDaily: number;
  status: "available" | "renting" | "maintenance" | "hidden";
  thumbnailUrl: string;
  images: Array<{ id?: string; url: string }>;
  gameUsername?: string | null;
  gamePassword?: string | null;
  loginNote?: string | null;
  adminNote?: string | null;
};

const emptyAccount: AccountFormValue = {
  name: "",
  slug: "",
  description: "",
  heroCount: 0,
  skinCount: 0,
  sssCount: 0,
  collaborationCount: 0,
  battleCount: 0,
  rank: "",
  winRate: 0,
  reputation: 5,
  vipLevel: "VIP 1",
  priceHourly: 0,
  priceNight: 0,
  priceDaily: 0,
  status: "available",
  thumbnailUrl: "",
  images: [],
  gameUsername: "",
  gamePassword: "",
  loginNote: "",
  adminNote: ""
};

function fieldValue(formData: FormData, name: string) {
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

export function AdminAccountForm({ account }: { account?: AccountFormValue }) {
  const initial = account || emptyAccount;
  const [thumbnailUrl, setThumbnailUrl] = useState(initial.thumbnailUrl);
  const [thumbnailPreview, setThumbnailPreview] = useState(initial.thumbnailUrl);
  const [detailImages, setDetailImages] = useState(initial.images.map((image) => image.url));
  const [detailPreviews, setDetailPreviews] = useState(initial.images.map((image) => image.url));
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const editing = Boolean(account?.id);

  const title = useMemo(() => editing ? "Sửa ACC" : "Thêm ACC", [editing]);

  async function chooseThumbnail(files: FileList | null) {
    const file = files?.[0];
    if (!file) return;
    setMessage("");
    try {
      setThumbnailPreview(URL.createObjectURL(file));
      setThumbnailUrl(await uploadFile(file));
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload thất bại.");
    }
  }

  async function chooseDetailImages(files: FileList | null) {
    if (!files?.length) return;
    setMessage("");
    try {
      const selected = Array.from(files);
      setDetailPreviews((current) => [...current, ...selected.map((file) => URL.createObjectURL(file))]);
      const uploaded = await Promise.all(selected.map(uploadFile));
      setDetailImages((current) => [...current, ...uploaded]);
    } catch (err) {
      setMessage(err instanceof Error ? err.message : "Upload thất bại.");
    }
  }

  function removeDetail(index: number) {
    setDetailImages((current) => current.filter((_, itemIndex) => itemIndex !== index));
    setDetailPreviews((current) => current.filter((_, itemIndex) => itemIndex !== index));
  }

  async function submit(formData: FormData) {
    setSaving(true);
    setMessage("");
    const body = {
      name: fieldValue(formData, "name"),
      slug: fieldValue(formData, "slug"),
      description: fieldValue(formData, "description"),
      status: fieldValue(formData, "status"),
      heroCount: fieldValue(formData, "heroCount"),
      skinCount: fieldValue(formData, "skinCount"),
      sssCount: fieldValue(formData, "sssCount"),
      collaborationCount: fieldValue(formData, "collaborationCount"),
      battleCount: fieldValue(formData, "battleCount"),
      rank: fieldValue(formData, "rank"),
      winRate: fieldValue(formData, "winRate"),
      reputation: fieldValue(formData, "reputation"),
      vipLevel: fieldValue(formData, "vipLevel"),
      priceHourly: fieldValue(formData, "priceHourly"),
      priceNight: fieldValue(formData, "priceNight"),
      priceDaily: fieldValue(formData, "priceDaily"),
      thumbnailUrl,
      images: detailImages,
      gameUsername: fieldValue(formData, "gameUsername"),
      gamePassword: fieldValue(formData, "gamePassword"),
      loginNote: fieldValue(formData, "loginNote"),
      adminNote: fieldValue(formData, "adminNote")
    };
    if (!thumbnailUrl) {
      setSaving(false);
      setMessage("Ảnh đại diện ACC là bắt buộc.");
      return;
    }
    const res = await fetch(editing ? `/api/admin/accounts/${account?.id}` : "/api/admin/accounts", {
      method: editing ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json().catch(() => ({}));
    setSaving(false);
    if (!res.ok) {
      setMessage(data.error || "Không lưu được ACC.");
      return;
    }
    window.location.href = "/pt-admin/accounts";
  }

  return (
    <form action={submit} className="space-y-5 rounded-lg border border-[#f3d6e6] bg-white p-5 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
      <div className="flex items-center justify-between gap-3">
        <h1 className="text-2xl font-black text-[#111827]">{title}</h1>
        <a href="/pt-admin/accounts" className="rounded-md border border-[#f3d6e6] px-4 py-2 text-sm font-black text-[#ec3f96]">Hủy</a>
      </div>

      <section className="grid gap-3 md:grid-cols-2">
        <h2 className="md:col-span-2 text-lg font-black text-[#ec3f96]">Thông tin cơ bản</h2>
        <Field name="name" label="Tên ACC" defaultValue={initial.name} placeholder="VD: ACC SSS VIP 8" />
        <Field name="slug" label="Slug" defaultValue={initial.slug} placeholder="acc-sss-vip-8" />
        <label className="md:col-span-2 text-sm font-bold text-slate-700">Mô tả
          <textarea name="description" defaultValue={initial.description || ""} placeholder="Mô tả điểm mạnh của ACC" className="mt-1 min-h-24 w-full rounded-md border border-[#f3d6e6] px-3 py-2" />
        </label>
        <Select name="status" label="Trạng thái" defaultValue={initial.status} options={[["available", "Sẵn sàng"], ["renting", "Đang thuê"], ["maintenance", "Bảo trì"], ["hidden", "Ẩn"]]} />
      </section>

      <section className="grid gap-3 md:grid-cols-4">
        <h2 className="md:col-span-4 text-lg font-black text-[#ec3f96]">Thông số ACC</h2>
        <Field name="skinCount" label="Tổng Skin" type="number" defaultValue={initial.skinCount} />
        <Field name="sssCount" label="Skin SSS" type="number" defaultValue={initial.sssCount} />
        <Field name="collaborationCount" label="Skin hợp tác" type="number" defaultValue={initial.collaborationCount} />
        <Field name="rank" label="Rank" defaultValue={initial.rank} placeholder="Cao thủ" />
        <Field name="reputation" label="Uy tín hiện tại" type="number" step="0.1" defaultValue={initial.reputation} />
        <Field name="vipLevel" label="VIP" defaultValue={initial.vipLevel} placeholder="VIP 8" />
        <Field name="winRate" label="Tỷ lệ thắng (%)" type="number" defaultValue={initial.winRate} />
        <Field name="heroCount" label="Tướng" type="number" defaultValue={initial.heroCount} />
        <Field name="battleCount" label="Số trận" type="number" defaultValue={initial.battleCount || 0} />
      </section>

      <section className="grid gap-3 md:grid-cols-3">
        <h2 className="md:col-span-3 text-lg font-black text-[#ec3f96]">Giá thuê</h2>
        <Field name="priceHourly" label="Giá theo giờ" type="number" defaultValue={initial.priceHourly} />
        <Field name="priceNight" label="Giá qua đêm" type="number" defaultValue={initial.priceNight} />
        <Field name="priceDaily" label="Giá theo ngày" type="number" defaultValue={initial.priceDaily} />
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-black text-[#ec3f96]">Ảnh</h2>
        <div className="rounded-lg border border-[#f3d6e6] bg-[#fff7fb] p-4">
          <p className="mb-2 text-sm font-black text-slate-700">Ảnh đại diện ACC</p>
          <input type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => chooseThumbnail(event.target.files)} className="block w-full text-sm" />
          {thumbnailPreview && (
            <div className="mt-3 w-56 overflow-hidden rounded-lg border border-[#f3d6e6] bg-white">
              <Image src={thumbnailPreview} alt="Preview thumbnail" width={320} height={220} unoptimized className="h-36 w-full object-cover" />
              <button type="button" onClick={() => { setThumbnailUrl(""); setThumbnailPreview(""); }} className="w-full bg-red-600 px-3 py-2 text-sm font-black text-white">Xóa ảnh</button>
            </div>
          )}
        </div>
        <div className="rounded-lg border border-[#f3d6e6] bg-[#fff7fb] p-4">
          <p className="mb-2 text-sm font-black text-slate-700">Ảnh chi tiết ACC</p>
          <input type="file" accept="image/png,image/jpeg,image/webp" multiple onChange={(event) => chooseDetailImages(event.target.files)} className="block w-full text-sm" />
          <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {detailPreviews.map((url, index) => (
              <div key={`${url}-${index}`} className="overflow-hidden rounded-lg border border-[#f3d6e6] bg-white">
                <Image src={url} alt="Preview chi tiết" width={320} height={200} unoptimized className="h-28 w-full object-cover" />
                <button type="button" onClick={() => removeDetail(index)} className="w-full bg-red-600 px-3 py-2 text-xs font-black text-white">Xóa ảnh</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-3 md:grid-cols-2">
        <h2 className="md:col-span-2 text-lg font-black text-[#ec3f96]">Thông tin đăng nhập game</h2>
        <Field name="gameUsername" label="Tài khoản game" defaultValue={initial.gameUsername || ""} placeholder="Chỉ admin thấy" />
        <Field name="gamePassword" label="Mật khẩu game" defaultValue={initial.gamePassword || ""} placeholder="Chỉ admin thấy" />
        <Field name="loginNote" label="Ghi chú đăng nhập" defaultValue={initial.loginNote || ""} placeholder="VD: Đăng nhập bằng Garena" />
        <Field name="adminNote" label="Ghi chú nội bộ" defaultValue={initial.adminNote || ""} placeholder="Ghi chú cho admin" />
      </section>

      <button disabled={saving} className="rounded-md bg-[#ec3f96] px-5 py-3 font-black text-white disabled:opacity-60">{saving ? "Đang lưu..." : "Lưu ACC"}</button>
      {message && <p className="text-sm font-bold text-red-600">{message}</p>}
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

function Select({ label, options, ...props }: React.SelectHTMLAttributes<HTMLSelectElement> & { label: string; options: Array<[string, string]> }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <select {...props} className="mt-1 w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96]">
        {options.map(([value, labelText]) => <option key={value} value={value}>{labelText}</option>)}
      </select>
    </label>
  );
}
