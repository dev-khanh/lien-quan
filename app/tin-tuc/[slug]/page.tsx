import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  if (!hasDatabaseUrl()) return {};
  const post = await prisma.post.findFirst({ where: { slug: params.slug, published: true } });
  if (!post) return {};
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt || "Tin tức thuê ACC Liên Quân nhiều skin SSS, giá rẻ.";
  return {
    title,
    description,
    alternates: { canonical: `/tin-tuc/${post.slug}` },
    openGraph: {
      title,
      description,
      url: `/tin-tuc/${post.slug}`,
      images: post.coverImageUrl ? [{ url: post.coverImageUrl, alt: post.title }] : undefined,
      type: "article",
      locale: "vi_VN"
    }
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const post = hasDatabaseUrl()
    ? await prisma.post.findFirst({ where: { slug: params.slug, published: true } })
    : null;
  if (!post) notFound();

  return (
    <main className="mx-auto max-w-[900px] px-4 pb-24 pt-5 sm:px-6 lg:py-8">
      <Link href="/tin-tuc" className="mb-4 inline-block rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm font-bold text-white backdrop-blur">← Tin tức</Link>
      <article className="overflow-hidden rounded-[24px] border border-[#fbd0e3] bg-white/[0.94] shadow-[0_18px_54px_rgba(236,63,150,0.18)] backdrop-blur-md">
        {post.coverImageUrl && (
          <div className="relative aspect-video bg-[#fff5fb]">
            <Image src={post.coverImageUrl} alt={post.title} fill unoptimized={post.coverImageUrl.startsWith("/")} className="object-cover" priority />
          </div>
        )}
        <div className="p-5 sm:p-7">
          {post.category && <p className="text-xs font-black uppercase tracking-[0.18em] text-[#ec3f96]">{post.category}</p>}
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#111827]">{post.title}</h1>
          {post.excerpt && <p className="mt-3 text-base font-semibold leading-7 text-slate-600">{post.excerpt}</p>}
          <div className="mt-6 whitespace-pre-line text-base font-medium leading-8 text-slate-700">{post.content}</div>
        </div>
      </article>
    </main>
  );
}
