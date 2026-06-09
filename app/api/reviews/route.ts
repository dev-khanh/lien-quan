import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { reviewSchema } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    const parsed = reviewSchema.parse(await request.json());
    const review = await prisma.review.create({ data: parsed });
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: error instanceof Error ? error.message : "Invalid request" }, { status: 400 });
  }
}
