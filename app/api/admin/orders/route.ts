import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { expireRentals } from "@/lib/expire-rentals";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  await expireRentals();
  const orders = await prisma.rentOrder.findMany({ include: { account: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(orders);
}
