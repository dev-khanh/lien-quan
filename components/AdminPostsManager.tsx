"use client";

import { useState } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImageUrl: string | null;
  category: string | null;
  metaTitle: string | null;
  metaDescription: string | null;
  published: boolean;
};

const emptyPost: Post = {
  id: "",
  title: "",
  slug: "",
  excerpt: "",
  content: "",
  coverImageUrl: "",
  category: "",
  metaTitle: "",
  metaDescription: "",
  published: false
};

function slugify(value: string) {
  return value.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/đ/g, "d").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export function AdminPostsManager({ posts }: { posts: Post[] }) {
  const [items, setItems] = useState(posts);
  const [editing, setEditing] = useState<Post>(emptyPost);
  const [message, setMessage] = useState("");

  async function save() {
    setMessage("");
    const body = { ...editing, slug: editing.slug || slugify(editing.title) };
    const res = await fetch(editing.id ? `/api/admin/posts/${editing.id}` : "/api/admin/posts", {
      method: editing.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) {
      setMessage(data.error || "Không lưu được bài viết.");
      return;
    }
    setItems((current) => editing.id ? current.map((post) => post.id === data.id ? data : post) : [data, ...current]);
    setEditing(emptyPost);
    setMessage("Đã lưu bài viết.");
  }

  async function remove(id: string) {
    if (!window.confirm("Xóa bài viết này?")) return;
    const res = await fetch(`/api/admin/posts/${id}`, { method: "DELETE" });
    if (res.ok) setItems((current) => current.filter((post) => post.id !== id));
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[0.95fr_1.05fr]">
      <section className="rounded-lg border border-[#f3d6e6] bg-white p-5 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
        <h1 className="text-2xl font-black text-[#111827]">Tin tức / Bài viết</h1>
        <div className="mt-4 space-y-3">
          {items.map((post) => (
            <article key={post.id} className="rounded-lg border border-[#f3d6e6] p-3">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-black text-[#111827]">{post.title}</p>
                  <p className="text-xs font-bold text-slate-500">/{post.slug} · {post.published ? "Published" : "Draft"}</p>
                </div>
                <div className="flex gap-2">
                  <button type="button" onClick={() => setEditing(post)} className="rounded-md border border-[#f3d6e6] px-3 py-1 text-xs font-black text-[#ec3f96]">Sửa</button>
                  <button type="button" onClick={() => remove(post.id)} className="rounded-md bg-red-600 px-3 py-1 text-xs font-black text-white">Xóa</button>
                </div>
              </div>
            </article>
          ))}
          {!items.length && <p className="text-sm font-bold text-slate-600">Chưa có bài viết.</p>}
        </div>
      </section>

      <section className="rounded-lg border border-[#f3d6e6] bg-white p-5 shadow-[0_10px_24px_rgba(236,63,150,0.08)]">
        <h2 className="text-xl font-black text-[#111827]">{editing.id ? "Sửa bài viết" : "Tạo bài viết"}</h2>
        <div className="mt-4 grid gap-3">
          <Field label="Title" value={editing.title} onChange={(value) => setEditing({ ...editing, title: value, slug: editing.slug || slugify(value) })} />
          <Field label="Slug" value={editing.slug} onChange={(value) => setEditing({ ...editing, slug: slugify(value) })} />
          <Field label="Category" value={editing.category || ""} onChange={(value) => setEditing({ ...editing, category: value })} />
          <Field label="Cover image URL" value={editing.coverImageUrl || ""} onChange={(value) => setEditing({ ...editing, coverImageUrl: value })} />
          <TextArea label="Excerpt" value={editing.excerpt || ""} onChange={(value) => setEditing({ ...editing, excerpt: value })} rows={3} />
          <TextArea label="Content" value={editing.content} onChange={(value) => setEditing({ ...editing, content: value })} rows={10} />
          <Field label="Meta title" value={editing.metaTitle || ""} onChange={(value) => setEditing({ ...editing, metaTitle: value })} />
          <TextArea label="Meta description" value={editing.metaDescription || ""} onChange={(value) => setEditing({ ...editing, metaDescription: value })} rows={3} />
          <label className="inline-flex items-center gap-2 text-sm font-black text-slate-700">
            <input type="checkbox" checked={editing.published} onChange={(event) => setEditing({ ...editing, published: event.target.checked })} />
            Published
          </label>
          <div className="flex gap-2">
            <button type="button" onClick={save} className="rounded-md bg-[#ec3f96] px-5 py-3 font-black text-white">Lưu bài viết</button>
            <button type="button" onClick={() => setEditing(emptyPost)} className="rounded-md border border-[#f3d6e6] px-5 py-3 font-black text-[#ec3f96]">Làm mới</button>
          </div>
          {message && <p className="text-sm font-bold text-[#ec3f96]">{message}</p>}
        </div>
      </section>
    </div>
  );
}

function Field({ label, value, onChange }: { label: string; value: string; onChange: (value: string) => void }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <input value={value} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96]" />
    </label>
  );
}

function TextArea({ label, value, onChange, rows }: { label: string; value: string; onChange: (value: string) => void; rows: number }) {
  return (
    <label className="text-sm font-bold text-slate-700">
      {label}
      <textarea value={value} rows={rows} onChange={(event) => onChange(event.target.value)} className="mt-1 w-full rounded-md border border-[#f3d6e6] px-3 py-2 outline-none focus:border-[#ec3f96]" />
    </label>
  );
}
