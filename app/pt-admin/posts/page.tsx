import { redirect } from "next/navigation";
import { AdminNav } from "@/components/AdminNav";
import { AdminPostsManager } from "@/components/AdminPostsManager";
import { getAdminFromCookies } from "@/lib/auth";
import { hasDatabaseUrl } from "@/lib/env";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminPostsPage() {
  const admin = getAdminFromCookies();
  if (!admin) redirect("/pt-admin/login");
  const posts = hasDatabaseUrl() ? await prisma.post.findMany({ orderBy: { updatedAt: "desc" } }) : [];

  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <AdminPostsManager posts={posts} />
    </main>
  );
}
