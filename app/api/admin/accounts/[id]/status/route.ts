import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  const { status } = await request.json();
  if (!["available", "renting", "maintenance", "hidden"].includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  const account = await prisma.account.update({
    where: { id: params.id },
    data: { status, isVisible: status !== "hidden", currentRentEndsAt: status === "available" || status === "hidden" ? null : undefined }
  });
  await prisma.accountUpdateLog.create({ data: { accountId: params.id, adminId: admin.id, action: "status", changes: { status } } });
  return NextResponse.json(account);
}
