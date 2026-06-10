import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { expireRentals } from "@/lib/expire-rentals";
import { prisma } from "@/lib/prisma";

const packageHours = { hourly: 1, night: 8, daily: 24, custom: 1 };

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  await expireRentals();
  const body = await request.json();
  const rawPackageType = ["hourly", "night", "daily", "custom"].includes(body.packageType) ? body.packageType as keyof typeof packageHours : "hourly";
  const packageType = rawPackageType === "custom" ? "hourly" : rawPackageType;
  const endTime = body.endTime ? new Date(body.endTime) : new Date(Date.now() + packageHours[packageType] * 60 * 60 * 1000);
  if (Number.isNaN(endTime.getTime()) || endTime <= new Date()) return NextResponse.json({ error: "Thời gian kết thúc không hợp lệ." }, { status: 400 });
  const account = await prisma.account.findUnique({ where: { id: params.id } });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });
  const price = packageType === "daily" ? account.priceDaily : packageType === "night" ? account.priceNight : account.priceHourly;
  await prisma.$transaction([
    prisma.rentOrder.create({
      data: {
        accountId: account.id,
        customerName: body.customerName || "Admin set",
        phone: body.phone || "N/A",
        contact: body.contact || "Admin",
        packageType,
        durationHours: Math.max(1, Math.ceil((endTime.getTime() - Date.now()) / 3_600_000)),
        totalPrice: price,
        status: "renting",
        startTime: new Date(),
        endTime,
        adminNote: body.adminNote || null
      }
    }),
    prisma.account.update({ where: { id: account.id }, data: { status: "renting", isVisible: true, currentRentEndsAt: endTime } })
  ]);
  return NextResponse.json({ ok: true });
}
