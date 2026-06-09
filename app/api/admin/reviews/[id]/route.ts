import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const { status } = await request.json();
  if (!["approved", "rejected"].includes(status)) return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  const review = await prisma.review.update({ where: { id: params.id }, data: { status } });
  return NextResponse.json(review);
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  await prisma.review.delete({ where: { id: params.id } });
  return NextResponse.json({ ok: true });
}
