import { prisma } from "@/lib/prisma";

const defaultSettings = {
  id: "default",
  shopName: "Shop thuê ACC Liên Quân",
  zaloPhone: "",
  zaloUrl: "",
  facebookUrl: "",
  rentalGuide: "Liên hệ shop để kiểm tra acc, nhận hướng dẫn thanh toán và thông tin đăng nhập.",
  bankInfo: "",
  paymentQrUrl: ""
};

export async function getShopSettings() {
  const settings = await prisma.shopSettings.upsert({
    where: { id: "default" },
    update: {},
    create: defaultSettings
  });
  return settings;
}

export function getZaloHref(settings: { zaloUrl?: string | null; zaloPhone?: string | null }) {
  const zaloUrl = settings.zaloUrl?.trim();
  if (zaloUrl) return zaloUrl;
  const phone = settings.zaloPhone?.replace(/\D/g, "");
  return phone ? `https://zalo.me/${phone}` : "https://zalo.me";
}
