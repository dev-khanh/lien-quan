import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  const account = await prisma.account.findFirst({
    where: { OR: [{ id: params.id }, { slug: params.id }], isVisible: true, status: { not: "hidden" } },
    select: {
      id: true, name: true, slug: true, description: true, heroCount: true, skinCount: true, sssCount: true, collaborationCount: true,
      rank: true, winRate: true, reputation: true, battleCount: true, vipLevel: true, priceHourly: true, priceNight: true, priceDaily: true,
      status: true, thumbnailUrl: true, currentRentEndsAt: true,
      images: { orderBy: { sortOrder: "asc" } },
      reviews: { where: { status: "approved" }, orderBy: { createdAt: "desc" } }
    }
  });
  if (!account) return NextResponse.json({ error: "Account not found" }, { status: 404 });
  return NextResponse.json(account);
}
