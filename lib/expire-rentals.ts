import { prisma } from "@/lib/prisma";

export async function expireRentals() {
  const now = new Date();
  const expired = await prisma.rentOrder.findMany({
    where: { status: "renting", endTime: { lte: now } },
    select: { id: true, accountId: true }
  });
  const orderIds = expired.map((order) => order.id);
  const accountIds = [...new Set(expired.map((order) => order.accountId))];
  const [orders, accountsFromOrders, staleAccounts] = await prisma.$transaction([
    orderIds.length
      ? prisma.rentOrder.updateMany({ where: { id: { in: orderIds } }, data: { status: "completed" } })
      : prisma.rentOrder.updateMany({ where: { id: { in: [] } }, data: { status: "completed" } }),
    prisma.account.updateMany({
      where: { id: { in: accountIds }, orders: { none: { status: "renting", endTime: { gt: now } } } },
      data: { status: "available", currentRentEndsAt: null }
    }),
    prisma.account.updateMany({
      where: {
        status: "renting",
        currentRentEndsAt: { lte: now },
        orders: { none: { status: "renting", endTime: { gt: now } } }
      },
      data: { status: "available", currentRentEndsAt: null }
    })
  ]);
  return { completedOrders: orders.count, releasedAccounts: accountsFromOrders.count + staleAccounts.count };
}
