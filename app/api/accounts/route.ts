import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  const accounts = await prisma.account.findMany({
    where: { isVisible: true, status: { not: "hidden" } },
    include: { images: { orderBy: { sortOrder: "asc" } }, reviews: { where: { status: "approved" } } },
    orderBy: { createdAt: "desc" }
  });
  return NextResponse.json(accounts);
}
