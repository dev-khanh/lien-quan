import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const order = await prisma.rentOrder.findUnique({ where: { id: params.id } });
  if (!order) return NextResponse.json({ error: "Not found" }, { status: 404 });
  await prisma.$transaction([
    prisma.rentOrder.update({ where: { id: order.id }, data: { status: "completed" } }),
    prisma.account.update({ where: { id: order.accountId }, data: { status: "available", currentRentEndsAt: null } })
  ]);
  return NextResponse.json({ ok: true });
}
