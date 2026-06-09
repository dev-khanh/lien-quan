import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const [totalAccounts, rentingAccounts, availableAccounts, pendingOrders, todayRevenue, monthRevenue] = await Promise.all([
    prisma.account.count(),
    prisma.account.count({ where: { status: "renting" } }),
    prisma.account.count({ where: { status: "available", isVisible: true } }),
    prisma.rentOrder.count({ where: { status: "pending" } }),
    prisma.rentOrder.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ["renting", "completed"] }, startTime: { gte: startToday } } }),
    prisma.rentOrder.aggregate({ _sum: { totalPrice: true }, where: { status: { in: ["renting", "completed"] }, startTime: { gte: startMonth } } })
  ]);
  return NextResponse.json({
    totalAccounts,
    rentingAccounts,
    availableAccounts,
    pendingOrders,
    todayRevenue: todayRevenue._sum.totalPrice || 0,
    monthRevenue: monthRevenue._sum.totalPrice || 0
  });
}
