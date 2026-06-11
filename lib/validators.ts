import { z } from "zod";

export const accountSchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().optional().nullable(),
  heroCount: z.coerce.number().int().min(0),
  skinCount: z.coerce.number().int().min(0),
  sssCount: z.coerce.number().int().min(0),
  collaborationCount: z.coerce.number().int().min(0),
  rank: z.string().min(1),
  winRate: z.coerce.number().min(0).max(100),
  reputation: z.coerce.number().min(0).max(5),
  battleCount: z.coerce.number().int().min(0).optional(),
  vipLevel: z.string().min(1),
  priceHourly: z.coerce.number().int().min(1000),
  priceNight: z.coerce.number().int().min(1000),
  priceDaily: z.coerce.number().int().min(1000),
  thumbnailUrl: z.string().min(1),
  isFeatured: z.coerce.boolean().optional(),
  featuredImageUrl: z.string().url().or(z.string().startsWith("/")).optional().nullable(),
  featuredOrder: z.coerce.number().int().min(0).optional().nullable(),
  status: z.enum(["available", "renting", "maintenance", "hidden"]).optional(),
  isVisible: z.coerce.boolean().optional(),
  images: z.array(z.string().url().or(z.string().startsWith("/"))).optional(),
  gameUsername: z.string().optional().nullable(),
  gamePassword: z.string().optional().nullable(),
  loginNote: z.string().optional().nullable(),
  adminNote: z.string().optional().nullable()
});

export const rentOrderSchema = z.object({
  accountId: z.string().min(1),
  customerName: z.string().min(2).max(80),
  phone: z.string().min(8).max(20),
  contact: z.string().min(2).max(120),
  packageType: z.enum(["hourly", "night", "daily"])
});

export const reviewSchema = z.object({
  accountId: z.string().min(1),
  orderId: z.string().optional().nullable(),
  customerName: z.string().min(2).max(80),
  rating: z.coerce.number().int().min(1).max(5),
  comment: z.string().min(1).max(500)
});

export const shopSettingsSchema = z.object({
  shopName: z.string().min(2).max(120),
  zaloPhone: z.string().max(30).optional().nullable(),
  zaloUrl: z.string().url().optional().or(z.literal("")).nullable(),
  facebookUrl: z.string().url().optional().or(z.literal("")).nullable(),
  rentalGuide: z.string().max(2000).optional().nullable(),
  bankInfo: z.string().max(2000).optional().nullable(),
  paymentQrUrl: z.string().url().or(z.string().startsWith("/")).optional().or(z.literal("")).nullable()
});

export const postSchema = z.object({
  title: z.string().min(3).max(180),
  slug: z.string().min(2).max(180).regex(/^[a-z0-9-]+$/),
  excerpt: z.string().max(500).optional().nullable(),
  content: z.string().min(10),
  coverImageUrl: z.string().url().or(z.string().startsWith("/")).optional().or(z.literal("")).nullable(),
  category: z.string().max(80).optional().nullable(),
  metaTitle: z.string().max(180).optional().nullable(),
  metaDescription: z.string().max(300).optional().nullable(),
  published: z.coerce.boolean().optional()
});
