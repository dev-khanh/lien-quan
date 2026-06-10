import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { getShopSettings } from "@/lib/settings";
import { shopSettingsSchema } from "@/lib/validators";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const settings = await getShopSettings();
  return NextResponse.json(settings);
}

export async function PUT(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  try {
    const parsed = shopSettingsSchema.parse(await request.json());
    const settings = await prisma.shopSettings.upsert({
      where: { id: "default" },
      create: { id: "default", ...parsed },
      update: parsed
    });
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid settings" }, { status: 400 });
  }
}
