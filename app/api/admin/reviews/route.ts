import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const reviews = await prisma.review.findMany({ include: { account: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(reviews);
}
