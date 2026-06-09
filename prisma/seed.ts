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
    thumbnailUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=900&q=80"
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
    priceHourly: 12000,
    priceNight: 69000,
    priceDaily: 129000,
    thumbnailUrl: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=900&q=80"
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
    priceHourly: 10000,
    priceNight: 59000,
    priceDaily: 109000,
    thumbnailUrl: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=900&q=80"
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
    priceHourly: 20000,
    priceNight: 99000,
    priceDaily: 189000,
    thumbnailUrl: "https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&w=900&q=80"
  }
];

async function main() {
  await prisma.admin.upsert({
    where: { email: "admin@lienquan.local" },
    update: {},
    create: { email: "admin@lienquan.local", name: "Admin", passwordHash: await hashPassword("Admin@123") }
  });

  for (const acc of samples) {
    await prisma.account.upsert({
      where: { slug: acc.slug },
      update: acc,
      create: {
        ...acc,
        description: "Acc Liên Quân nhiều skin đẹp, thuê nhanh sau khi admin xác nhận thanh toán.",
        gameUsernameEnc: encryptSecret(`${acc.slug}_login`),
        gamePasswordEnc: encryptSecret("secret-demo"),
        images: {
          create: [
            { url: acc.thumbnailUrl, alt: `${acc.name} avatar`, sortOrder: 0 },
            { url: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?auto=format&fit=crop&w=900&q=80", alt: "Kho skin", sortOrder: 1 },
            { url: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?auto=format&fit=crop&w=900&q=80", alt: "Rank", sortOrder: 2 }
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
