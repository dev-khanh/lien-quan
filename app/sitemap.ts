import type { MetadataRoute } from "next";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";
import { featuredHeroes } from "@/lib/heroes";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://thueacclienquan.com";
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}/`, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/tin-tuc`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    ...featuredHeroes.map((hero) => ({
      url: `${baseUrl}/tuong/${hero.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];

  if (!hasDatabaseUrl()) return staticRoutes;

  const [accounts, posts] = await Promise.all([
    prisma.account.findMany({
      where: { isVisible: true, status: { not: "hidden" } },
      select: { slug: true, updatedAt: true }
    }),
    prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true }
    })
  ]);

  return [
    ...staticRoutes,
    ...accounts.map((account) => ({
      url: `${baseUrl}/acc/${account.slug}`,
      lastModified: account.updatedAt,
      changeFrequency: "daily" as const,
      priority: 0.9
    })),
    ...posts.map((post) => ({
      url: `${baseUrl}/tin-tuc/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6
    }))
  ];
}
