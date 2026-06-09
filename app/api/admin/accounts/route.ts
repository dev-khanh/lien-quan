import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { encryptSecret } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { accountSchema } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const accounts = await prisma.account.findMany({ include: { images: true }, orderBy: { createdAt: "desc" } });
  return NextResponse.json(accounts);
}

export async function POST(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  try {
    const parsed = accountSchema.parse(await request.json());
    const account = await prisma.account.create({
      data: {
        ...parsed,
        gameUsernameEnc: encryptSecret(parsed.gameUsername),
        gamePasswordEnc: encryptSecret(parsed.gamePassword),
        images: { create: parsed.images?.map((url, sortOrder) => ({ url, sortOrder })) || [] }
      }
    });
    await prisma.accountUpdateLog.create({ data: { accountId: account.id, adminId: admin.id, action: "create", changes: parsed } });
    return NextResponse.json(account, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid request" }, { status: 400 });
  }
}
