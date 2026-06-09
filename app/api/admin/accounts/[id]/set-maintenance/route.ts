import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const account = await prisma.account.update({ where: { id: params.id }, data: { status: "maintenance", isVisible: true } });
  return NextResponse.json(account);
}
