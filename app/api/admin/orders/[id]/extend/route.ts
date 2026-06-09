import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const minutesByType = { hour: 60, night: 10 * 60, day: 24 * 60 };

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const body = await request.json();
  const order = await prisma.rentOrder.findUnique({ where: { id: params.id } });
  if (!order || !order.endTime) return NextResponse.json({ error: "Không thể gia hạn đơn này." }, { status: 400 });
  const minutes = body.customMinutes ? Number(body.customMinutes) : minutesByType[body.type as keyof typeof minutesByType] || 60;
  const endTime = new Date(order.endTime.getTime() + minutes * 60_000);
  await prisma.$transaction([
    prisma.rentOrder.update({ where: { id: order.id }, data: { endTime } }),
    prisma.account.update({ where: { id: order.accountId }, data: { currentRentEndsAt: endTime, status: "renting" } })
  ]);
  return NextResponse.json({ ok: true, endTime });
}
