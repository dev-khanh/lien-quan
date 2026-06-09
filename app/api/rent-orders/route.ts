import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { rentalHours } from "@/lib/format";
import { saveUpload } from "@/lib/upload";
import { rentOrderSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const form = await request.formData();
    const parsed = rentOrderSchema.parse({
      accountId: form.get("accountId"),
      customerName: form.get("customerName"),
      phone: form.get("phone"),
      contact: form.get("contact"),
      packageType: form.get("packageType")
    });
    const account = await prisma.account.findUnique({ where: { id: parsed.accountId } });
    if (!account || !account.isVisible || account.status !== "available") {
      return NextResponse.json({ error: "Acc không sẵn sàng để thuê." }, { status: 409 });
    }
    const bill = form.get("bill");
    const billImageUrl = bill instanceof File && bill.size > 0 ? await saveUpload(bill, "uploads/bills") : null;
    const totalPrice =
      parsed.packageType === "daily" ? account.priceDaily : parsed.packageType === "night" ? account.priceNight : account.priceHourly;
    const order = await prisma.rentOrder.create({
      data: { ...parsed, durationHours: rentalHours(parsed.packageType), totalPrice, billImageUrl }
    });
    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
