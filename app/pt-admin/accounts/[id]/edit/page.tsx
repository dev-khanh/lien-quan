import { redirect } from "next/navigation";
import { AdminAccountForm } from "@/components/AdminAccountForm";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { decryptSecret } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function EditAccountPage({ params }: { params: { id: string } }) {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  const account = await prisma.account.findUnique({ where: { id: params.id }, include: { images: { orderBy: { sortOrder: "asc" } } } });
  if (!account) redirect("/pt-admin/accounts");
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <AdminAccountForm
        account={{
          id: account.id,
          name: account.name,
          slug: account.slug,
          description: account.description,
          heroCount: account.heroCount,
          skinCount: account.skinCount,
          sssCount: account.sssCount,
          collaborationCount: account.collaborationCount,
          battleCount: account.battleCount,
          rank: account.rank,
          winRate: account.winRate,
          reputation: account.reputation,
          vipLevel: account.vipLevel,
          priceHourly: account.priceHourly,
          priceNight: account.priceNight,
          priceDaily: account.priceDaily,
          status: account.status,
          thumbnailUrl: account.thumbnailUrl,
          images: account.images.map((image) => ({ id: image.id, url: image.url })),
          gameUsername: decryptSecret(account.gameUsernameEnc),
          gamePassword: decryptSecret(account.gamePasswordEnc),
          loginNote: account.loginNote,
          adminNote: account.adminNote
        }}
      />
    </main>
  );
}
