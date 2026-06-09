import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { setAdminCookie, signAdminToken, verifyPassword } from "@/lib/auth";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin || !(await verifyPassword(password, admin.passwordHash))) {
    return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  }
  const response = NextResponse.json({ id: admin.id, email: admin.email, name: admin.name });
  setAdminCookie(response, signAdminToken({ sub: admin.id, email: admin.email, name: admin.name }));
  return response;
}
