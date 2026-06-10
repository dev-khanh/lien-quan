import { NextResponse } from "next/server";
import { expireRentals } from "@/lib/expire-rentals";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  await expireRentals();
  const accounts = await prisma.account.findMany({
    where: { isVisible: true, status: { not: "hidden" } },
    select: {
      id: true, name: true, slug: true, description: true, heroCount: true, skinCount: true, sssCount: true, collaborationCount: true,
      rank: true, winRate: true, reputation: true, battleCount: true, vipLevel: true, priceHourly: true, priceNight: true, priceDaily: true,
      status: true, thumbnailUrl: true, currentRentEndsAt: true, images: { orderBy: { sortOrder: "asc" } }, reviews: { where: { status: "approved" } }
    },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(accounts);
}
