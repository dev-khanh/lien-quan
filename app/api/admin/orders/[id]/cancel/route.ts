import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const order = await prisma.rentOrder.update({ where: { id: params.id }, data: { status: "cancelled" } });
  return NextResponse.json(order);
}
