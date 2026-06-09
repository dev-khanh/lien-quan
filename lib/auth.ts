import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_COOKIE = "admin_token";

export type AdminToken = { sub: string; email: string; name: string };

function jwtSecret() {
  return process.env.JWT_SECRET || "dev-jwt-secret";
}

export async function hashPassword(password: string) {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string) {
  return bcrypt.compare(password, hash);
}

export function signAdminToken(payload: AdminToken) {
  return jwt.sign(payload, jwtSecret(), { expiresIn: "7d" });
}

export function setAdminCookie(response: NextResponse, token: string) {
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7
  });
}

export function getAdminFromRequest(request: NextRequest): AdminToken | null {
  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, jwtSecret()) as AdminToken;
  } catch {
    return null;
  }
}

export function getAdminFromCookies(): AdminToken | null {
  const token = cookies().get(ADMIN_COOKIE)?.value;
  if (!token) return null;
  try {
    return jwt.verify(token, jwtSecret()) as AdminToken;
  } catch {
    return null;
  }
}

export async function requireAdmin(request: NextRequest) {
  const token = getAdminFromRequest(request);
  if (!token) return { admin: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  const admin = await prisma.admin.findUnique({ where: { id: token.sub } });
  if (!admin) return { admin: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  return { admin, error: null };
}
