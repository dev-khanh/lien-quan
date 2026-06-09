import type { Metadata } from "next";
import { AnimatedPublicBackground } from "@/components/AnimatedPublicBackground";
import { FloatingZaloButton } from "@/components/FloatingZaloButton";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thuê Acc Liên Quân",
  description: "Website thuê tài khoản game Liên Quân responsive với admin dashboard."
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
