"use client";

import { useState } from "react";
import Image from "next/image";

export function ReviewForm({ accountId }: { accountId: string }) {
  const [message, setMessage] = useState("");
  const [previews, setPreviews] = useState<string[]>([]);
  const [files, setFiles] = useState<File[]>([]);

  function chooseImages(fileList: FileList | null) {
    const selected = Array.from(fileList || []).slice(0, 3);
    const allowed = new Set(["image/jpeg", "image/png", "image/webp"]);
    const invalid = selected.find((file) => !allowed.has(file.type) || file.size > 5 * 1024 * 1024);
    if (invalid) {
      setMessage("Ảnh đánh giá chỉ hỗ trợ JPG, PNG, WEBP và tối đa 5MB mỗi ảnh.");
      return;
    }
    setFiles(selected);
    setPreviews(selected.map((file) => URL.createObjectURL(file)));
  }

  async function submit(formData: FormData) {
    files.forEach((file) => formData.append("images", file));
    const res = await fetch("/api/reviews", {
      method: "POST",
      body: formData
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
      <div className="rounded-xl border border-dashed border-[#f3d6e6] bg-[#fff7fb] p-3">
        <p className="mb-2 text-sm font-black text-[#111827]">Ảnh đánh giá (không bắt buộc)</p>
        <label className="inline-flex cursor-pointer rounded-lg bg-[#ec3f96] px-4 py-2 text-sm font-black text-white">
          Chọn ảnh
          <input type="file" accept="image/jpeg,image/png,image/webp" multiple className="sr-only" onChange={(event) => chooseImages(event.target.files)} />
        </label>
        <p className="mt-2 text-xs font-semibold text-slate-500">Tối đa 3 ảnh, mỗi ảnh 5MB.</p>
        {previews.length > 0 && (
          <div className="mt-3 grid grid-cols-3 gap-2">
            {previews.map((preview, index) => (
              <div key={preview} className="overflow-hidden rounded-lg border border-[#f3d6e6] bg-white">
                <div className="relative aspect-square">
                  <Image src={preview} alt={`Preview đánh giá ${index + 1}`} fill unoptimized className="object-cover" />
                </div>
                <button type="button" onClick={() => {
                  setFiles((current) => current.filter((_, itemIndex) => itemIndex !== index));
                  setPreviews((current) => current.filter((_, itemIndex) => itemIndex !== index));
                }} className="w-full bg-red-600 py-1 text-xs font-black text-white">Xóa</button>
              </div>
            ))}
          </div>
        )}
      </div>
      <button className="rounded-md bg-[#ec3f96] px-4 py-2 font-black text-white">Gửi đánh giá</button>
      {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
    </form>
  );
}
