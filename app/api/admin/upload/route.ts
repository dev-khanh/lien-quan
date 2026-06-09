import { NextRequest, NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth";
import { saveUpload } from "@/lib/upload";

export async function POST(request: NextRequest) {
  const { error } = await requireAdmin(request);
  if (error) return error;
  try {
    const form = await request.formData();
    const file = form.get("file");
    if (!(file instanceof File)) return NextResponse.json({ error: "Missing file" }, { status: 400 });
    const url = await saveUpload(file, "uploads/accounts");
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Upload failed" }, { status: 400 });
  }
}
