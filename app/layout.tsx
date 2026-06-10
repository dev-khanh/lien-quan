import type { Metadata } from "next";
import { AnimatedPublicBackground } from "@/components/AnimatedPublicBackground";
import { FloatingZaloButton } from "@/components/FloatingZaloButton";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Shop thuê ACC Liên Quân nhiều skin SSS, giá rẻ",
  description: "Danh sách acc Liên Quân nhiều skin đẹp, thuê theo giờ, đêm, ngày. Thông tin đăng nhập chỉ mở sau khi admin xác nhận thanh toán.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shop thuê ACC Liên Quân nhiều skin SSS, giá rẻ",
    description: "Danh sách acc Liên Quân nhiều skin đẹp, thuê theo giờ, đêm, ngày. Xác nhận nhanh qua Zalo.",
    url: "/",
    siteName: "Shop thuê ACC Liên Quân",
    images: [{ url: "/backgrounds/lien-quan-hero-bg.png", width: 2048, height: 1024, alt: "Shop thuê ACC Liên Quân nhiều skin SSS" }],
    locale: "vi_VN",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AnimatedPublicBackground />
        {children}
        <FloatingZaloButton />
      </body>
    </html>
  );
}
