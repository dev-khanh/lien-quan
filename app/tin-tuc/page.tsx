import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Tin tức thuê ACC Liên Quân | Shop thuê ACC",
  description: "Kinh nghiệm thuê ACC Liên Quân, chọn acc nhiều skin SSS, thuê theo giờ, qua đêm và nhận acc nhanh qua Zalo.",
  alternates: { canonical: "/tin-tuc" }
};

export default async function NewsPage() {
  const posts = hasDatabaseUrl()
    ? await prisma.post.findMany({ where: { published: true }, orderBy: { updatedAt: "desc" } })
    : [];

  return (
    <main className="mx-auto max-w-[1100px] px-4 pb-24 pt-5 sm:px-6 lg:py-8">
      <Link href="/" className="mb-4 inline-block rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur">← Về trang chủ</Link>
      <section className="rounded-[24px] border border-[#fbd0e3] bg-white/[0.92] p-5 shadow-[0_18px_54px_rgba(236,63,150,0.18)] backdrop-blur-md">
        <h1 className="text-3xl font-black text-[#111827]">Tin tức thuê ACC Liên Quân</h1>
        <p className="mt-2 text-sm font-semibold text-slate-600">Cập nhật kinh nghiệm chọn ACC nhiều skin, thuê theo giờ, qua đêm và nhận acc nhanh.</p>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {posts.map((post) => (
            <Link key={post.id} href={`/tin-tuc/${post.slug}`} className="overflow-hidden rounded-[18px] border border-[#f3d6e6] bg-white transition hover:border-[#ec3f96]">
              {post.coverImageUrl && (
                <div className="relative aspect-video bg-[#fff5fb]">
                  <Image src={post.coverImageUrl} alt={post.title} fill unoptimized={post.coverImageUrl.startsWith("/")} className="object-cover" />
                </div>
              )}
              <div className="p-4">
                {post.category && <p className="text-xs font-black uppercase text-[#ec3f96]">{post.category}</p>}
                <h2 className="mt-1 text-xl font-black text-[#111827]">{post.title}</h2>
                {post.excerpt && <p className="mt-2 line-clamp-3 text-sm font-semibold leading-6 text-slate-600">{post.excerpt}</p>}
              </div>
            </Link>
          ))}
          {!posts.length && <p className="text-sm font-bold text-slate-600">Chưa có bài viết được xuất bản.</p>}
        </div>
      </section>
    </main>
  );
}
