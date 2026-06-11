import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { saveUpload } from "@/lib/upload";
import { reviewSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      const parsed = reviewSchema.parse(await request.json());
      const review = await prisma.review.create({ data: parsed });
      return NextResponse.json(review, { status: 201 });
    }
    const form = await request.formData();
    const parsed = reviewSchema.parse({
      accountId: form.get("accountId"),
      orderId: form.get("orderId"),
      customerName: form.get("customerName"),
      rating: form.get("rating"),
      comment: form.get("comment")
    });
    const files = form.getAll("images").filter((file): file is File => file instanceof File && file.size > 0).slice(0, 3);
    const urls = await Promise.all(files.map((file) => saveUpload(file, "uploads/reviews")));
    const review = await prisma.review.create({
      data: {
        ...parsed,
        images: { create: urls.map((url, sortOrder) => ({ url, sortOrder })) }
      }
    });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
