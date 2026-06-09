import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  await prisma.$transaction([
    prisma.rentOrder.updateMany({ where: { accountId: params.id, status: "renting" }, data: { status: "completed" } }),
    prisma.account.update({ where: { id: params.id }, data: { status: "available", isVisible: true, currentRentEndsAt: null } })
  ]);
  return NextResponse.json({ ok: true });
}
