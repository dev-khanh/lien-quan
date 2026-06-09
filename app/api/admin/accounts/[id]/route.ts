import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { decryptSecret, encryptSecret } from "@/lib/crypto";
import { prisma } from "@/lib/prisma";
import { accountSchema } from "@/lib/validators";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  const account = await prisma.account.findUnique({ where: { id: params.id }, include: { images: { orderBy: { sortOrder: "asc" } } } });
  if (!account) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({
    ...account,
    gameUsername: decryptSecret(account.gameUsernameEnc),
    gamePassword: decryptSecret(account.gamePasswordEnc)
  });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  try {
    const parsed = accountSchema.parse(await request.json());
    const { gameUsername, gamePassword, images, ...accountData } = parsed;
    const before = await prisma.account.findUnique({ where: { id: params.id } });
    const account = await prisma.account.update({
      where: { id: params.id },
      data: {
        ...accountData,
        isVisible: accountData.status !== "hidden",
        gameUsernameEnc: gameUsername ? encryptSecret(gameUsername) : undefined,
        gamePasswordEnc: gamePassword ? encryptSecret(gamePassword) : undefined,
        images: { deleteMany: {}, create: images?.map((url, sortOrder) => ({ url, sortOrder })) || [] }
      }
    });
    await prisma.accountUpdateLog.create({ data: { accountId: account.id, adminId: admin.id, action: "update", changes: parsed } });
    if (before) {
      const tracked = ["skinCount", "sssCount", "heroCount", "collaborationCount", "vipLevel", "priceDaily"] as const;
      await Promise.all(tracked.flatMap((fieldName) => {
        const oldValue = String(before[fieldName]);
        const newValue = String(account[fieldName]);
        return oldValue === newValue ? [] : prisma.accountUpdateLog.create({
          data: { accountId: account.id, adminId: admin.id, action: "field_update", changes: { fieldName, oldValue, newValue }, fieldName, oldValue, newValue }
        });
      }));
    }
    return NextResponse.json(account);
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Invalid request" }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  await prisma.account.delete({ where: { id: params.id } });
  await prisma.accountUpdateLog.create({ data: { accountId: params.id, adminId: admin.id, action: "delete", changes: { deleted: true } } }).catch(() => null);
  return NextResponse.json({ ok: true });
}
