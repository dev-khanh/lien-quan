import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";

export async function GET(request: NextRequest) {
  const { admin, error } = await requireAdmin(request);
  if (error) return error;
  return NextResponse.json({ id: admin.id, email: admin.email, name: admin.name, role: admin.role });
}
