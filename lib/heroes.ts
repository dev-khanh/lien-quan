export type HeroSkin = {
  name: string;
  slug: string;
  badge?: string | null;
  thumbnailUrl: string;
  splashUrl: string;
  logoUrl?: string | null;
};

export type FeaturedHero = {
  slug: string;
  name: string;
  role: string;
  badge?: string | null;
  description: string;
  avatarUrl: string;
  splashUrl: string;
  featuredOrder: number;
  skins: HeroSkin[];
  skills: Array<{ name: string; description: string; iconUrl: string }>;
};

const heroBase = "/heroes";

export const featuredHeroes: FeaturedHero[] = [
  {
    slug: "aya",
    name: "Aya",
    role: "Trợ thủ",
    badge: "Skin hot",
    description:
      "Aya là trợ thủ linh hoạt, được nhiều người chơi yêu thích nhờ khả năng bám đồng đội, bảo kê và tạo đột biến trong giao tranh.",
    avatarUrl: `${heroBase}/aya/aya.jpg`,
    splashUrl: `${heroBase}/aya/aya.jpg`,
    featuredOrder: 1,
    skins: [
      { name: "Aya", slug: "aya", badge: "A", thumbnailUrl: `${heroBase}/aya/aya.jpg`, splashUrl: `${heroBase}/aya/aya.jpg`, logoUrl: null },
      { name: "Aya Cinnamoroll's Dream", slug: "aya-cinnamorolls-dream", badge: "Collab", thumbnailUrl: `${heroBase}/aya/aya-cinnamorolls-dream.jpg`, splashUrl: `${heroBase}/aya/aya-cinnamorolls-dream.jpg`, logoUrl: `${heroBase}/aya/logo-cinamo.png` },
      { name: "Aya Công Chúa Cầu Vồng", slug: "aya-cong-chua-cau-vong", badge: "Premium", thumbnailUrl: `${heroBase}/aya/aya-cong-chua-cau-vong-bg.jpg`, splashUrl: `${heroBase}/aya/aya-cong-chua-cau-vong-bg.jpg`, logoUrl: `${heroBase}/aya/logo-cong-chua-cau-vong.png` },
      { name: "Aya Điệp Viên Ký Ức", slug: "aya-diep-vien-ky-uc", badge: "Premium", thumbnailUrl: `${heroBase}/aya/aya-diep-vien-ky-uc.jpg`, splashUrl: `${heroBase}/aya/aya-diep-vien-ky-uc.jpg`, logoUrl: `${heroBase}/aya/logo-diep-vien.png` },
      { name: "Aya Hỏa Hồ Tiên Ngư", slug: "aya-hoa-ho-tien-ngu", badge: "S+", thumbnailUrl: `${heroBase}/aya/aya-hoa-ho-tiên-ngu.jpg`, splashUrl: `${heroBase}/aya/aya-hoa-ho-tiên-ngu.jpg`, logoUrl: `${heroBase}/aya/logo-hoa-ho-tien-ngu.png` },
      { name: "Aya Hoạt Náo Viên", slug: "aya-hoat-nao-vien", badge: "Premium", thumbnailUrl: `${heroBase}/aya/aya-hoat-nao-vien.jpg`, splashUrl: `${heroBase}/aya/aya-hoat-nao-vien.jpg`, logoUrl: `${heroBase}/aya/logo-hoat-nao-vien.png` },
      { name: "Aya MC Sóc Nhỏ", slug: "aya-mc-soc-nho", badge: "Limited", thumbnailUrl: `${heroBase}/aya/aya-mc-soc-nho.jpg`, splashUrl: `${heroBase}/aya/aya-mc-soc-nho.jpg`, logoUrl: `${heroBase}/aya/logo-soc-nho.png` },
      { name: "Aya Thủy Thủ", slug: "aya-thuy-thu", badge: "Premium", thumbnailUrl: `${heroBase}/aya/aya-thuy-thu.jpg`, splashUrl: `${heroBase}/aya/aya-thuy-thu.jpg`, logoUrl: `${heroBase}/aya/logo-thuy-thu.png` }
    ],
    skills: [
      {
        name: "Linh hồn sóc nhỏ",
        description:
          "Dưới 40% máu, Aya biến thành sóc nhỏ trong 5 giây, không bị chọn làm mục tiêu và nhận bộ chiêu thức mới.",
        iconUrl: `${heroBase}/aya/chiu-1.png`
      },
      {
        name: "Nốt nhạc ánh sáng",
        description:
          "Bắn ra quang cầu gây sát thương phép và làm chậm kẻ địch đồng thời khiến địch lộ diện.",
        iconUrl: `${heroBase}/aya/chiu-2.png`
      },
      {
        name: "Rừng sâu bảo hộ",
        description:
          "Aya bay đến biến thành lớp giáp ảo bảo vệ đồng đội chỉ định. Nếu đã trong trạng thái giáp ảo, Aya lập tức tạo thêm lá chắn cho đồng đội. Kéo chiêu để nhảy ra khỏi đồng đội.",
        iconUrl: `${heroBase}/aya/chiu-3.png`
      },
      {
        name: "Khúc nhạc rừng sâu",
        description:
          "Tạo pháp trận quanh đồng đội có lá chắn linh hồn giúp đồng đội tăng tốc chạy và gây sát thương lên địch trong phạm vi khiến địch bị biến hình.",
        iconUrl: `${heroBase}/aya/chiu-4.png`
      }
    ]
  },

  {
    slug: "aoi",
    name: "Aoi",
    role: "Sát thủ",
    badge: "Được thuê nhiều",
    description: "Aoi nổi bật với độ cơ động cao...",
    avatarUrl: `${heroBase}/aoi.jpeg`,
    splashUrl: `${heroBase}/aoi.jpeg`,
    featuredOrder: 2,
    skins: [{ name: "Aoi mặc định", slug: "aoi", thumbnailUrl: `${heroBase}/aoi.jpeg`, splashUrl: `${heroBase}/aoi.jpeg` }],
    skills: [{ name: "Long trảo", description: "", iconUrl: `${heroBase}/aoi.jpeg` }]
  }
];

export function getHeroBySlug(slug: string) {
  return featuredHeroes.find((h) => h.slug === slug);
}
