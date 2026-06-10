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
      { name: "Aya Hỏa Hồ Tiên Ngư", slug: "aya-hoa-ho-tien-ngu", badge: "S+", thumbnailUrl: `${heroBase}/aya/aya-hoa-ho-tien-ngu.jpg`, splashUrl: `${heroBase}/aya/aya-hoa-ho-tien-ngu.jpg`, logoUrl: `${heroBase}/aya/logo-hoa-ho-tien-ngu.png` },
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
    description:
      "Aoi là sát thủ cơ động, có khả năng áp sát, bay nhảy và dồn sát thương mạnh trong giao tranh.",
    avatarUrl: `${heroBase}/aio/aoi.png`,
    splashUrl: `${heroBase}/aio/aoi.png`,
    featuredOrder: 2,
    skins: [
      {
        name: "Aoi",
        slug: "aoi",
        badge: "A",
        thumbnailUrl: `${heroBase}/aio/aoi.png`,
        splashUrl: `${heroBase}/aio/aoi.png`,
        logoUrl: null
      },
      {
        name: "Aoi Sát Thủ",
        slug: "aoi-sat-thu",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/aio/aoi-sat-thu.png`,
        splashUrl: `${heroBase}/aio/aoi-sat-thu.png`,
        logoUrl: `${heroBase}/aio/logo-sat-thu.png`
      },
      {
        name: "Aoi Sát Thủ Dạ Ưng",
        slug: "aoi-sat-thu-da-ung",
        badge: "Limited",
        thumbnailUrl: `${heroBase}/aio/aoi-sat-thu-da-ung.jpg`,
        splashUrl: `${heroBase}/aio/aoi-sat-thu-da-ung.jpg`,
        logoUrl: `${heroBase}/aio/logo-sat-thu-da-ung.png`
      },
      {
        name: "Aoi Tiệc Bãi Biển",
        slug: "aoi-tiec-bai-bien",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/aio/aoi-tiec-bai-bien.jpg`,
        splashUrl: `${heroBase}/aio/aoi-tiec-bai-bien.jpg`,
        logoUrl: `${heroBase}/aio/logo-tiec-bai-bien.png`
      },
      {
        name: "Aoi Hoàng kim công chúa",
        slug: "aoi-hoang-kim-cong-chua",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/aio/aoi-hoang-kim-cong-chua.jpg`,
        splashUrl: `${heroBase}/aio/aoi-hoang-kim-cong-chua.jpg`,
        logoUrl: `${heroBase}/aio/logo-cong-chua.png`
      },
      {
        name: "Aoi Lam Hải Quận Chúa",
        slug: "aoi-hai-quan",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/aio/aoi-hai-quan.jpg`,
        splashUrl: `${heroBase}/aio/aoi-hai-quan.jpg`,
        logoUrl: `${heroBase}/aio/logo-hai-quan.png`
      },
      {
        name: "Aoi Tiểu thư Mafia",
        slug: "aoi-mafia",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/aio/aoi-mafia.jpg`,
        splashUrl: `${heroBase}/aio/aoi-mafia.jpg`,
        logoUrl: `${heroBase}/aio/logo-mafia.png`
      },
      {
        name: "Aoi Quán quân",
        slug: "aoi-fmvp",
        badge: "Limited",
        thumbnailUrl: `${heroBase}/aio/aoi-fmvp.jpg`,
        splashUrl: `${heroBase}/aio/aoi-fmvp.jpg`,
        logoUrl: `${heroBase}/aio/logo-fmvp.png`
      },
      {
        name: "Aoi Mikasa Ackermann",
        slug: "aoi-mikasa-ackermann",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/aio/aoi-mikasa-ackermann.jpg`,
        splashUrl: `${heroBase}/aio/aoi-mikasa-ackermann.jpg`,
        logoUrl: `${heroBase}/aio/logo-mikasa.png`
      }
    ],
    skills: [
      {
        name: "Long Lực",
        description:
          "Sau mỗi lần tung chiêu, Aoi sẽ tích lũy 1 lần Long lực (tối đa 4 lần) đồng thời cường hóa đòn đánh thường kế thành đột kích khiến đòn này được tăng tầm đánh và tốc đánh - gây sát thương vật lý lên mục tiêu. Đòn đánh thường thứ 4 nhất định sẽ gây chí mạng và khiến bản thân giảm hồi chiêu.",
        iconUrl: `${heroBase}/aio/chiu-1.png`
      },
      {
        name: "Long Trảm",
        description:
          "Aoi tung trảo đột kích về phía trước và gây sát thương vật lý lên kẻ địch trong phạm vi. Đánh trúng địch giúp bản thân được hồi máu. Trạng thái phi hành: Aoi bổ nhào xuống vị trí chỉ định gây sát thương vật lý và hất tung tất cả các mục tiêu trong phạm vi. Đánh trúng kẻ địch giúp bản thân nhận lá chắn.",
        iconUrl: `${heroBase}/aio/chiu-2.png`
      },
      {
        name: "Long Trảo",
        description:
          "Aoi phóng trảo vào chướng ngại vật, dùng nút di chuyển tiến vào trạng thái Xung kích hoặc Phi hành. Có thể dự bị 2 lần chịu ảnh hưởng hồi chiêu; Khi xung kích và phi hành, bản thân Aoi được miễn khống.",
        iconUrl: `${heroBase}/aio/chiu-3.png`
      },
      {
        name: "Long Diệt",
        description:
          "Aoi bay lên trời không bị chọn làm mục tiêu, cắm long trảo vào kẻ địch và gây sát thương vật lý đồng thời làm chậm. Sau đó trong thoáng chốc, Aoi lướt về phía sau đồng thời thu hồi song trảo và gây máu mục tiêu đã mất thành sát thương vật lý lên phạm vi lớn.",
        iconUrl: `${heroBase}/aio/chiu-4.png`
      }
    ]
  },
  {
    slug: "billow",
    name: "Billow",
    role: "Đấu sĩ",
    badge: "Được thuê nhiều",
    description:
      "Billow là đấu sĩ cơ động, có khả năng truy kích, hồi phục và gây sát thương mạnh trong giao tranh.",
    avatarUrl: `${heroBase}/billow/billow.jpg`,
    splashUrl: `${heroBase}/billow/billow.jpg`,
    featuredOrder: 3,
    skins: [
      {
        name: "Billow",
        slug: "billow",
        badge: "A",
        thumbnailUrl: `${heroBase}/billow/billow.jpg`,
        splashUrl: `${heroBase}/billow/billow.jpg`,
        logoUrl: null
      },
      {
        name: "Billow Thiên Tướng Đô Ách",
        slug: "billow-thien-tuong-do-ach",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/billow/billow-thien-tuong-do-ach.jpg`,
        splashUrl: `${heroBase}/billow/billow-thien-tuong-do-ach.jpg`,
        logoUrl: `${heroBase}/billow/logo-thien-tuong.png`
      },
      {
        name: "Billow T-Rex Bất Bại",
        slug: "billow-t-rex-bat-bai",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/billow/billow-t-rex-bat-bai.jpg`,
        splashUrl: `${heroBase}/billow/billow-t-rex-bat-bai.jpg`,
        logoUrl: `${heroBase}/billow/logo-bat-bai.png`
      }
    ],
    skills: [
      {
        name: "Cuồng thú săn mồi",
        description: "Billow gây thêm sát thương chuẩn lên những mục tiêu máu thấp.",
        iconUrl: `${heroBase}/billow/chiu-1.png`
      },
      {
        name: "Độn thủy tiềm hành",
        description:
          "Billow lướt về phía trước và nhảy xuống nước. Suốt thời gian này tướng nhận được hiệu ứng tăng tốc chạy đồng thời tăng thêm tốc chạy khi xung quanh có mục tiêu thấp máu. Trong vùng sông, trạng thái Hải quái không giới hạn thời gian. Trạng thái Hải quái: Lướt theo hướng chỉ định và gây sát thương.",
        iconUrl: `${heroBase}/billow/chiu-2.png`
      },
      {
        name: "Cuồng bạo truy kích",
        description:
          "Billow tấn công mục tiêu lân cận gây sát thương, khi trúng địch sẽ nhận được dấu ấn và cường hóa đòn đánh thường cùng hồi máu. Ngoài ra còn sử dụng dấu ấn để truy kích kẻ địch đồng thời hồi máu. Trạng thái Hải quái: Lướt về hướng chỉ định và gây sát thương.",
        iconUrl: `${heroBase}/billow/chiu-3.png`
      },
      {
        name: "Nộ hải sa ngư",
        description:
          "Billow làm chậm mục tiêu rồi lướt về phía trước đẩy lùi kẻ địch đến điểm cuối đồng thời gây sát thương. Trạng thái Hải quái: Lập tức lướt về phía trước và đẩy lùi nạn nhân kèm theo gây sát thương.",
        iconUrl: `${heroBase}/billow/chiu-4.png`
      }
    ]
  },
  {
    slug: "dieu-thuyen",
    name: "Điêu Thuyền",
    role: "Pháp sư",
    badge: "Được thuê nhiều",
    description:
      "Điêu Thuyền là pháp sư khống chế mạnh, có khả năng làm chậm, đóng băng và gây sát thương diện rộng.",
    avatarUrl: `${heroBase}/dieu-thuyen/dieu-thuyen.jpg`,
    splashUrl: `${heroBase}/dieu-thuyen/dieu-thuyen.jpg`,
    featuredOrder: 4,
    skins: [
      {
        name: "Điêu Thuyền",
        slug: "dieu-thuyen",
        badge: "A",
        thumbnailUrl: `${heroBase}/dieu-thuyen/dieu-thuyen.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/dieu-thuyen.jpg`,
        logoUrl: null
      },
      {
        name: "Điêu Thuyền Đỗ Quyên",
        slug: "dieu-thuyen-do-quyen",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/do-quyen.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/do-quyen.jpg`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-do-quyen.png`
      },
      {
        name: "Điêu Thuyền Hoa Hậu",
        slug: "dieu-thuyen-hoa-hau",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/hoa-hau.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/hoa-hau.jpg`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-hoa-hau.png`
      },
      {
        name: "Điêu Thuyền Moon",
        slug: "dieu-thuyen-moon",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/moon.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/moon.jpg`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-moon.png`
      },
      {
        name: "Điêu Thuyền Nguyệt Thành",
        slug: "dieu-thuyen-nguyet-thanh",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/nguyet-thanh.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/nguyet-thanh.jpg`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-nguyet-thanh.png`
      },
      {
        name: "Điêu Thuyền Phù Thủy",
        slug: "dieu-thuyen-phu-thuy",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/phu-thuy.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/phu-thuy.jpg`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-phu-thuy.png`
      },
      {
        name: "Điêu Thuyền Wave",
        slug: "dieu-thuyen-wave",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/wave.jpg`,
        splashUrl: `${heroBase}/dieu-thuyen/wave.jpg`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-wave.png`
      },
      {
        name: "Điêu Thuyền Bãi Biển",
        slug: "dieu-thuyen-bai-bien",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/dieu-thuyen/bai-bien.png`,
        splashUrl: `${heroBase}/dieu-thuyen/bai-bien.png`,
        logoUrl: `${heroBase}/dieu-thuyen/logo-bai-bien.png`
      }
    ],
    skills: [
      {
        name: "Nữ hoàng băng tuyết",
        description:
          "Nội tại: Nếu trong một thời gian không bị công kích hay khống chế, Điêu Thuyền sẽ nhận được một lớp lá chắn giúp chặn hoàn toàn một kỹ năng, bao gồm cả sát thương và hiệu ứng khống chế.",
        iconUrl: `${heroBase}/dieu-thuyen/chiu-1.png`
      },
      {
        name: "Sương giá",
        description:
          "Điêu Thuyền tung phép thuật băng giá lên một vùng chỉ định, gây sát thương phép và làm chậm 50% tốc chạy của các kẻ địch trúng chiêu.",
        iconUrl: `${heroBase}/dieu-thuyen/chiu-2.png`
      },
      {
        name: "Tuyết liên",
        description:
          "Điêu Thuyền tạo bông sen băng gây sát thương phép và đóng băng các kẻ địch trúng chiêu trong 2.5 giây. Điêu Thuyền có thể tích trữ tối đa 2 đóa Tuyết liên. Nếu mục tiêu trúng chiêu liên tục 2 lần trong 5 giây sẽ phải chịu đóng băng ít hơn ở lần thứ 2. Đặc biệt, những nạn nhân bị đóng băng sẽ phải chịu thêm sát thương phép từ mọi nguồn sát thương của Điêu Thuyền.",
        iconUrl: `${heroBase}/dieu-thuyen/chiu-3.png`
      },
      {
        name: "Bão tuyết",
        description:
          "Điêu Thuyền gọi ra một trận bão tuyết tấn công những kẻ thù trong phạm vi, gây sát thương phép và làm chậm tốc chạy của nạn nhân. Đồng thời, cô được tăng thêm giáp. Chiêu thức này cần niệm chiêu để thực hiện, tối đa kéo dài 5.3 giây, tuy nhiên sau 0.6 giây đầu nếu di chuyển hoặc ấn chiêu lần nữa thì có thể hủy.",
        iconUrl: `${heroBase}/dieu-thuyen/chiu-4.png`
      }
    ]
  },
  {
    slug: "helen",
    name: "Helen",
    role: "Trợ thủ",
    badge: "Được thuê nhiều",
    description:
      "Helen là trợ thủ hồi phục, có khả năng tăng tốc, hồi máu và bảo vệ đồng đội trong giao tranh.",
    avatarUrl: `${heroBase}/helen/helen.jpg`,
    splashUrl: `${heroBase}/helen/helen.jpg`,
    featuredOrder: 5,
    skins: [
      {
        name: "Helen",
        slug: "helen",
        badge: "A",
        thumbnailUrl: `${heroBase}/helen/helen.jpg`,
        splashUrl: `${heroBase}/helen/helen.jpg`,
        logoUrl: null
      },
      {
        name: "Helen Bé Hoa Xuân",
        slug: "helen-be-hoa-xuan",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/helen/helen-be-hoa-xuan.jpg`,
        splashUrl: `${heroBase}/helen/helen-be-hoa-xuan.jpg`,
        logoUrl: `${heroBase}/helen/logo-be-hoa-xuan.png`
      },
      {
        name: "Helen Cổ Tích",
        slug: "helen-co-tich",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/helen/helen-co-tich.jpg`,
        splashUrl: `${heroBase}/helen/helen-co-tich.jpg`,
        logoUrl: `${heroBase}/helen/logo-co-tich.png`
      },
      {
        name: "Helen Hồng Liên Tiên Tử",
        slug: "helen-hong-lien-tien-tu",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/helen/helen-hong-lien-tien-tu.jpg`,
        splashUrl: `${heroBase}/helen/helen-hong-lien-tien-tu.jpg`,
        logoUrl: `${heroBase}/helen/logo-hong-lien-tien-tu.png`
      },
      {
        name: "Helen Hotgirl Trà Sữa",
        slug: "helen-hotgirl-tra-sua",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/helen/helen-hotgirl-tra-sua.jpg`,
        splashUrl: `${heroBase}/helen/helen-hotgirl-tra-sua.jpg`,
        logoUrl: `${heroBase}/helen/logo-hotgirl.png`
      },
      {
        name: "Helen Ngủ Trong Rừng",
        slug: "helen-ngu-trong-rung",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/helen/helen-ngu-trong-rung.jpg`,
        splashUrl: `${heroBase}/helen/helen-ngu-trong-rung.jpg`,
        logoUrl: `${heroBase}/helen/logo-ngu-trong-rung.png`
      },
      {
        name: "Helen Trợ Lý Nghệ Sĩ",
        slug: "helen-tro-ly-nghe-si",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/helen/helen-tro-ly-nghe-si.jpg`,
        splashUrl: `${heroBase}/helen/helen-tro-ly-nghe-si.jpg`,
        logoUrl: `${heroBase}/helen/logo-tro-ly-nghe-si.png`
      }
    ],
    skills: [
      {
        name: "Thanh cao",
        description:
          "Helen chịu sát thương thì bản thân sẽ được tăng tốc chạy và hồi máu, cách một khoảng thời gian cố định sẽ được kích hoạt 1 lần.",
        iconUrl: `${heroBase}/helen/chiu-1.png`
      },
      {
        name: "Ánh sáng thần thánh",
        description:
          "Helen được tăng tốc chạy đồng thời liên tục hồi máu cho bản thân và các đồng minh lân cận.",
        iconUrl: `${heroBase}/helen/chiu-2.png`
      },
      {
        name: "Linh hoa thánh khiết",
        description:
          "Helen bắn ra 1 đóa linh hoa nảy giữa các mục tiêu và gây sát thương phép cùng hiệu ứng làm choáng.",
        iconUrl: `${heroBase}/helen/chiu-3.png`
      },
      {
        name: "Kết giới sinh mệnh",
        description:
          "Helen hồi máu cho đồng đội lân cận thấp máu nhất và tăng giáp cùng giáp phép.",
        iconUrl: `${heroBase}/helen/chiu-4.png`
      }
    ]
  },
  {
    slug: "nakroth",
    name: "Nakroth",
    role: "Sát thủ",
    badge: "Được thuê nhiều",
    description:
      "Nakroth là sát thủ cơ động cao, có khả năng lướt nhiều lần, hất tung và truy kích mục tiêu cực mạnh.",
    avatarUrl: `${heroBase}/nakroth/nakroth.jpg`,
    splashUrl: `${heroBase}/nakroth/nakroth.jpg`,
    featuredOrder: 6,
    skins: [
      {
        name: "Nakroth",
        slug: "nakroth",
        badge: "A",
        thumbnailUrl: `${heroBase}/nakroth/nakroth.jpg`,
        splashUrl: `${heroBase}/nakroth/nakroth.jpg`,
        logoUrl: null
      },
      {
        name: "Nakroth Quán Quân",
        slug: "nakroth-quan-quan",
        badge: "Limited",
        thumbnailUrl: `${heroBase}/nakroth/nakroth-quan-quan.jpg`,
        splashUrl: `${heroBase}/nakroth/nakroth-quan-quan.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-quan-quan.png`
      },
      {
        name: "Nakroth Chiến Thương",
        slug: "nakroth-chien-thuong",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/chien-thuong.jpg`,
        splashUrl: `${heroBase}/nakroth/chien-thuong.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-chien-thuong.png`
      },
      {
        name: "Nakroth Hỏa Ngục",
        slug: "nakroth-hoa-nguc",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/hoa-nguc.jpg`,
        splashUrl: `${heroBase}/nakroth/hoa-nguc.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-hoa-nguc.png`
      },
      {
        name: "Nakroth Khiêu Chiến",
        slug: "nakroth-khieu-chien",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/khieu-chien.jpg`,
        splashUrl: `${heroBase}/nakroth/khieu-chien.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-khieu-chien.png`
      },
      {
        name: "Nakroth Killua",
        slug: "nakroth-killua",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/killua.jpg`,
        splashUrl: `${heroBase}/nakroth/killua.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-killua.png`
      },
      {
        name: "Nakroth Levi",
        slug: "nakroth-levi",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/levi.jpg`,
        splashUrl: `${heroBase}/nakroth/levi.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-levi.png`
      },
      {
        name: "Nakroth Liệp Đế",
        slug: "nakroth-liep-de",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/liep-de.jpg`,
        splashUrl: `${heroBase}/nakroth/liep-de.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-liep-de.png`
      },
      {
        name: "Nakroth Quang Sứ",
        slug: "nakroth-quang-su",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/quang-su.jpg`,
        splashUrl: `${heroBase}/nakroth/quang-su.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-quang-su.png`
      },
      {
        name: "Nakroth Siêu Việt",
        slug: "nakroth-sieu-viet",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/sieu-viet.jpg`,
        splashUrl: `${heroBase}/nakroth/sieu-viet.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-sieu-viet.png`
      },
      {
        name: "Nakroth Thư Nguyền Vệ Thần",
        slug: "nakroth-thu-nguyen-ve-than",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/thu-nguyen-ve-than.jpg`,
        splashUrl: `${heroBase}/nakroth/thu-nguyen-ve-than.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-thu-nguyen-ve-than.png`
      },
      {
        name: "Nakroth Tia Chớp",
        slug: "nakroth-tia-chop",
        badge: "Premium",
        thumbnailUrl: `${heroBase}/nakroth/tia-chop.jpg`,
        splashUrl: `${heroBase}/nakroth/tia-chop.jpg`,
        logoUrl: `${heroBase}/nakroth/logo-tia-chop.png`
      }
    ],
    skills: [
      {
        name: "Thẩm phán oai nghiêm",
        description:
          "Nội tại: Mỗi đòn đánh thường thứ 4 sẽ hất văng mục tiêu. Tung chiêu trúng địch hoặc dùng Nguồn cơn rắc rối sẽ tăng tốc đánh.",
        iconUrl: `${heroBase}/nakroth/chiu-1.png`
      },
      {
        name: "Bồi thẩm đoàn",
        description:
          "Nakroth xông về phía trước, hất văng mục tiêu gây sát thương vật lý. Kỹ năng này có thể tung ra một lần nữa miễn phí trong vòng 5 giây.",
        iconUrl: `${heroBase}/nakroth/chiu-2.png`
      },
      {
        name: "Nguồn cơn rắc rối",
        description:
          "Nakroth biến về phía sau và biến đòn tấn công vật lý tiếp theo của mình trong 3 giây thành đòn quét gây sát thương vật lý.",
        iconUrl: `${heroBase}/nakroth/chiu-3.png`
      },
      {
        name: "Gươm hành quyết",
        description:
          "Nakroth vung lưỡi gươm của mình lên những kẻ thù trong phạm vi gây sát thương vật lý mỗi lần. Hắn không thể bị khống chế. Đòn đánh cuối cùng sẽ hất văng kẻ địch.",
        iconUrl: `${heroBase}/nakroth/chiu-4.png`
      }
    ]
  }
];

export function getHeroBySlug(slug: string) {
  return featuredHeroes.find((h) => h.slug === slug);
}
