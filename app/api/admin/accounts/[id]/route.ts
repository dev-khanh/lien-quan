import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { encryptSecret } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { accountSchema } from "@/lib/validators";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  try {
    const parsed = accountSchema.parse(await request.json());
    const account = await prisma.account.update({
      where: { id: params.id },
      data: {
        ...parsed,
        gameUsernameEnc: parsed.gameUsername ? encryptSecret(parsed.gameUsername) : undefined,
        gamePasswordEnc: parsed.gamePassword ? encryptSecret(parsed.gamePassword) : undefined,
        images: { deleteMany: {}, create: parsed.images?.map((url, sortOrder) => ({ url, sortOrder })) || [] }
      }
    });
    await prisma.accountUpdateLog.create({ data: { accountId: account.id, adminId: admin.id, action: "update", changes: parsed } });
    return NextResponse.json(account);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  await prisma.account.update({ where: { id: params.id }, data: { status: "hidden", isVisible: false } });
  await prisma.accountUpdateLog.create({ data: { accountId: params.id, adminId: admin.id, action: "hide", changes: { isVisible: false } } });
  return NextResponse.json({ ok: true });
}
