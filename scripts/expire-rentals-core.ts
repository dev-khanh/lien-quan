import { prisma } from "@/lib/prisma";

export async function expireRentals() {
  const now = new Date();
  const expired = await prisma.rentOrder.findMany({
    where: { status: "renting", endTime: { lte: now } },
    select: { id: true, accountId: true }
  });
  if (expired.length === 0) return { completedOrders: 0, releasedAccounts: 0 };
  const orderIds = expired.map((order) => order.id);
  const accountIds = [...new Set(expired.map((order) => order.accountId))];
  const [orders, accounts] = await prisma.$transaction([
    prisma.rentOrder.updateMany({ where: { id: { in: orderIds } }, data: { status: "completed" } }),
    prisma.account.updateMany({
      where: { id: { in: accountIds }, orders: { none: { status: "renting", endTime: { gt: now } } } },
      data: { status: "available", currentRentEndsAt: null }
    })
  ]);
  return { completedOrders: orders.count, releasedAccounts: accounts.count };
}
