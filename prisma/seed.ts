import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../lib/auth";
import { encryptSecret } from "../lib/crypto";

const prisma = new PrismaClient();

const samples = [
  {
    name: "ACC SEA",
    slug: "acc-sea",
    heroCount: 118,
    skinCount: 420,
    sssCount: 12,
    collaborationCount: 8,
    rank: "Cao thủ 38 sao",
    winRate: 68.5,
    reputation: 4.9,
    vipLevel: "VIP 7",
    priceHourly: 15000,
    priceNight: 79000,
    priceDaily: 149000,
    thumbnailUrl: "/account-samples/acc-sea.jpg",
    status: "renting" as const
  },
  {
    name: "ACC ACE",
    slug: "acc-ace",
    heroCount: 112,
    skinCount: 365,
    sssCount: 9,
    collaborationCount: 6,
    rank: "Chiến tướng",
    winRate: 64.2,
    reputation: 4.8,
    vipLevel: "VIP 6",
    priceHourly: 25000,
    priceNight: 130000,
    priceDaily: 300000,
    thumbnailUrl: "/account-samples/acc-ace.jpg",
    status: "renting" as const
  },
  {
    name: "ACC COBE",
    slug: "acc-cobe",
    heroCount: 109,
    skinCount: 288,
    sssCount: 7,
    collaborationCount: 5,
    rank: "Tinh anh",
    winRate: 61.7,
    reputation: 4.7,
    vipLevel: "VIP 5",
    priceHourly: 25000,
    priceNight: 125000,
    priceDaily: 250000,
    thumbnailUrl: "/account-samples/acc-cobe.jpg",
    status: "renting" as const
  },
  {
    name: "ACC TÍM",
    slug: "acc-tim",
    heroCount: 120,
    skinCount: 510,
    sssCount: 18,
    collaborationCount: 11,
    rank: "Thách đấu",
    winRate: 72.3,
    reputation: 5,
    vipLevel: "VIP 8",
    priceHourly: 45000,
    priceNight: 230000,
    priceDaily: 500000,
    thumbnailUrl: "/account-samples/acc-tim.jpg",
    status: "available" as const
  },
  {
    name: "ACC NÂU",
    slug: "acc-nau",
    heroCount: 128,
    skinCount: 1030,
    sssCount: 17,
    collaborationCount: 13,
    rank: "Thách đấu",
    winRate: 59.6,
    reputation: 5,
    vipLevel: "VIP 10",
    priceHourly: 35000,
    priceNight: 175000,
    priceDaily: 350000,
    thumbnailUrl: "/account-samples/acc-nau.jpg",
    status: "renting" as const
  }
];

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@lienquan.local" },
    update: {},
    create: { email: "admin@lienquan.local", name: "Admin", passwordHash: await hashPassword("Admin@123") }
  });

  for (const acc of samples) {
    const currentRentEndsAt = acc.status === "renting" ? new Date(Date.now() + (90 + Math.floor(Math.random() * 540)) * 60 * 1000) : null;
    await prisma.account.upsert({
      where: { slug: acc.slug },
      update: {
        ...acc,
        currentRentEndsAt,
        images: {
          deleteMany: {},
          create: [
            { url: acc.thumbnailUrl, alt: `${acc.name} preview`, sortOrder: 0 },
            { url: "/account-samples/acc-sea.jpg", alt: "Kho skin Liên Quân", sortOrder: 1 },
            { url: "/account-samples/acc-ace.jpg", alt: "Kho skin SSS", sortOrder: 2 }
          ]
        }
      },
      create: {
        ...acc,
        currentRentEndsAt,
        description: "Acc Liên Quân nhiều skin đẹp, thuê nhanh sau khi admin xác nhận thanh toán.",
        gameUsernameEnc: encryptSecret(`${acc.slug}_login`),
        gamePasswordEnc: encryptSecret("secret-demo"),
        images: {
          create: [
            { url: acc.thumbnailUrl, alt: `${acc.name} preview`, sortOrder: 0 },
            { url: "/account-samples/acc-sea.jpg", alt: "Kho skin Liên Quân", sortOrder: 1 },
            { url: "/account-samples/acc-ace.jpg", alt: "Kho skin SSS", sortOrder: 2 }
          ]
        }
      }
    });
  }
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
