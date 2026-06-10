export type FeaturedHero = {
  slug: string;
  name: string;
  role: string;
  badge: string;
  description: string;
  avatarUrl: string;
  splashUrl: string;
  featuredOrder: number;
  skins: Array<{
    name: string;
    badge: string;
    thumbnailUrl: string;
    splashUrl: string;
  }>;
  skills: Array<{
    name: string;
    description: string;
    iconUrl: string;
  }>;
};

const heroBase = "/heroes";

export const featuredHeroes: FeaturedHero[] = [
  {
    slug: "aya",
    name: "Aya",
    role: "Trợ thủ",
    badge: "Skin hot",
    description: "Aya là trợ thủ linh hoạt, được nhiều người chơi yêu thích nhờ khả năng bám đồng đội, bảo kê và tạo đột biến trong giao tranh.",
    avatarUrl: `${heroBase}/aya.jpg`,
    splashUrl: `${heroBase}/aya.jpg`,
    featuredOrder: 1,
    skins: [
      { name: "Aya mặc định", badge: "A", thumbnailUrl: `${heroBase}/aya.jpg`, splashUrl: `${heroBase}/aya.jpg` },
      { name: "Aya MC Sóc nhỏ", badge: "SSS", thumbnailUrl: `${heroBase}/aya.jpg`, splashUrl: `${heroBase}/aya.jpg` },
      { name: "Aya Hỏa Hồ Tiên Ngư", badge: "Hữu hạn", thumbnailUrl: `${heroBase}/aya.jpg`, splashUrl: `${heroBase}/aya.jpg` }
    ],
    skills: [
      { name: "Linh hồn sóc nhỏ", description: "Dưới 40% máu, Aya biến thành sóc nhỏ trong thời gian ngắn, khó bị chọn làm mục tiêu và có thể xoay chuyển giao tranh.", iconUrl: `${heroBase}/aya.jpg` },
      { name: "Nốt nhạc ánh sáng", description: "Aya phóng năng lượng gây sát thương và làm chậm, hỗ trợ đồng đội bắt mục tiêu.", iconUrl: `${heroBase}/aya.jpg` },
      { name: "Rừng sâu bảo hộ", description: "Aya nhập vào đồng đội, tạo giáp và tăng khả năng sống sót trong giao tranh.", iconUrl: `${heroBase}/aya.jpg` }
    ]
  },
  {
    slug: "aoi",
    name: "Aoi",
    role: "Sát thủ",
    badge: "Được thuê nhiều",
    description: "Aoi nổi bật với độ cơ động cao, khả năng áp sát nhanh và dồn sát thương mạnh.",
    avatarUrl: `${heroBase}/aoi.jpeg`,
    splashUrl: `${heroBase}/aoi.jpeg`,
    featuredOrder: 2,
    skins: [
      { name: "Aoi mặc định", badge: "A", thumbnailUrl: `${heroBase}/aoi.jpeg`, splashUrl: `${heroBase}/aoi.jpeg` },
      { name: "Aoi tiệc bãi biển", badge: "S+", thumbnailUrl: `${heroBase}/aoi.jpeg`, splashUrl: `${heroBase}/aoi.jpeg` }
    ],
    skills: [
      { name: "Long trảo", description: "Aoi sử dụng long trảo để cơ động qua địa hình và tiếp cận mục tiêu nhanh.", iconUrl: `${heroBase}/aoi.jpeg` },
      { name: "Trảm long", description: "Gây sát thương mạnh lên kẻ địch trong phạm vi và tạo áp lực lớn khi bắt lẻ.", iconUrl: `${heroBase}/aoi.jpeg` }
    ]
  },
  {
    slug: "billow",
    name: "Billow",
    role: "Đấu sĩ",
    badge: "Skin SSS",
    description: "Billow có tạo hình cuốn hút, bộ kỹ năng giàu nhịp độ và thường xuất hiện trong các acc nhiều skin đẹp.",
    avatarUrl: `${heroBase}/billow.jpg`,
    splashUrl: `${heroBase}/billow.jpg`,
    featuredOrder: 3,
    skins: [
      { name: "Billow mặc định", badge: "A", thumbnailUrl: `${heroBase}/billow.jpg`, splashUrl: `${heroBase}/billow.jpg` },
      { name: "Billow tuyệt sắc", badge: "SSS", thumbnailUrl: `${heroBase}/billow.jpg`, splashUrl: `${heroBase}/billow.jpg` }
    ],
    skills: [
      { name: "Hải lưu", description: "Billow lướt theo hướng chỉ định, tạo nhịp tấn công nhanh và gây sát thương diện rộng.", iconUrl: `${heroBase}/billow.jpg` },
      { name: "Sóng dữ", description: "Tung đòn kết liễu mạnh, phù hợp khi đối thủ thấp máu hoặc mất vị trí.", iconUrl: `${heroBase}/billow.jpg` }
    ]
  },
  {
    slug: "dieu-thuyen",
    name: "Điêu Thuyền",
    role: "Pháp sư",
    badge: "Skin SSS",
    description: "Điêu Thuyền có nhiều trang phục đẹp, khả năng khống chế tốt và rất được khách thuê acc quan tâm.",
    avatarUrl: `${heroBase}/dieu-thuyen.jpg`,
    splashUrl: `${heroBase}/dieu-thuyen.jpg`,
    featuredOrder: 4,
    skins: [
      { name: "Điêu Thuyền mặc định", badge: "A", thumbnailUrl: `${heroBase}/dieu-thuyen.jpg`, splashUrl: `${heroBase}/dieu-thuyen.jpg` },
      { name: "Điêu Thuyền tuyệt sắc", badge: "SSS", thumbnailUrl: `${heroBase}/dieu-thuyen.jpg`, splashUrl: `${heroBase}/dieu-thuyen.jpg` }
    ],
    skills: [
      { name: "Băng đăng", description: "Tạo vùng băng gây sát thương và làm chậm, mở đường cho combo khống chế.", iconUrl: `${heroBase}/dieu-thuyen.jpg` },
      { name: "Bão tuyết", description: "Gây sát thương phép diện rộng, đặc biệt mạnh trong giao tranh tổng.", iconUrl: `${heroBase}/dieu-thuyen.jpg` }
    ]
  },
  {
    slug: "helen",
    name: "Helen",
    role: "Trợ thủ",
    badge: "Skin hot",
    description: "Helen là trợ thủ hồi phục mạnh, dễ chơi và thường được yêu thích trong các acc nhiều tướng hỗ trợ.",
    avatarUrl: `${heroBase}/helen.jpg`,
    splashUrl: `${heroBase}/helen.jpg`,
    featuredOrder: 5,
    skins: [
      { name: "Helen mặc định", badge: "A", thumbnailUrl: `${heroBase}/helen.jpg`, splashUrl: `${heroBase}/helen.jpg` },
      { name: "Helen dễ thương", badge: "S+", thumbnailUrl: `${heroBase}/helen.jpg`, splashUrl: `${heroBase}/helen.jpg` }
    ],
    skills: [
      { name: "Ánh sáng chữa lành", description: "Helen hồi phục và bảo kê đồng đội trong giao tranh kéo dài.", iconUrl: `${heroBase}/helen.jpg` },
      { name: "Giai điệu thiên thần", description: "Tăng khả năng sống sót cho cả đội khi giao tranh tổng.", iconUrl: `${heroBase}/helen.jpg` }
    ]
  },
  {
    slug: "nakroth",
    name: "Nakroth",
    role: "Sát thủ",
    badge: "Được thuê nhiều",
    description: "Nakroth là sát thủ cơ động cao, thường được người chơi kỹ năng lựa chọn để leo rank.",
    avatarUrl: `${heroBase}/nakroth.jpg`,
    splashUrl: `${heroBase}/nakroth.jpg`,
    featuredOrder: 6,
    skins: [
      { name: "Nakroth mặc định", badge: "A", thumbnailUrl: `${heroBase}/nakroth.jpg`, splashUrl: `${heroBase}/nakroth.jpg` },
      { name: "Nakroth chiến binh", badge: "Hữu hạn", thumbnailUrl: `${heroBase}/nakroth.jpg`, splashUrl: `${heroBase}/nakroth.jpg` }
    ],
    skills: [
      { name: "Bồi thẩm đoàn", description: "Nakroth lướt nhanh, gây sát thương và tạo lợi thế khi áp sát mục tiêu.", iconUrl: `${heroBase}/nakroth.jpg` },
      { name: "Gươm hành quyết", description: "Combo sát thương mạnh, phù hợp bắt chủ lực và rút lui nhanh.", iconUrl: `${heroBase}/nakroth.jpg` }
    ]
  }
].sort((a, b) => a.featuredOrder - b.featuredOrder);

export function getHeroBySlug(slug: string) {
  return featuredHeroes.find((hero) => hero.slug === slug);
}
