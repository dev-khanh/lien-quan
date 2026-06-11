import type { Metadata, Viewport } from "next";
import { AnimatedPublicBackground } from "@/components/AnimatedPublicBackground";
import { FloatingZaloButton } from "@/components/FloatingZaloButton";
import { getShopSettings, getZaloHref } from "@/lib/settings";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Shop thuê ACC Liên Quân nhiều skin SSS, giá rẻ",
  description: "Danh sách acc Liên Quân nhiều skin đẹp, thuê theo giờ, đêm, ngày. Thông tin đăng nhập chỉ mở sau khi admin xác nhận thanh toán.",
  alternates: { canonical: "/" },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "Thuê ACC",
    statusBarStyle: "black-translucent"
  },
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" }
    ],
    apple: "/icons/apple-touch-icon.png"
  },
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

export const viewport: Viewport = {
  themeColor: "#ec3f96"
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getShopSettings();
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>
        <AnimatedPublicBackground />
        {children}
        <FloatingZaloButton zaloHref={getZaloHref(settings)} />
      </body>
    </html>
  );
}
