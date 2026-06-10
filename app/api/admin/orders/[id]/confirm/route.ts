import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { expireRentals } from "@/lib/expire-rentals";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  await expireRentals();
  const order = await prisma.rentOrder.findUnique({ where: { id: params.id }, include: { account: true } });
  if (!order || order.status !== "pending" || order.account.status !== "available") {
    return NextResponse.json({ error: "Không thể xác nhận đơn này." }, { status: 409 });
  }
  const startTime = new Date();
  const endTime = new Date(startTime.getTime() + order.durationHours * 60 * 60 * 1000);
  const updated = await prisma.$transaction([
    prisma.rentOrder.update({ where: { id: order.id }, data: { status: "renting", startTime, endTime } }),
    prisma.account.update({ where: { id: order.accountId }, data: { status: "renting", currentRentEndsAt: endTime } })
  ]);
  return NextResponse.json(updated[0]);
}
