import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thuê Acc Liên Quân",
  description: "Website thuê tài khoản game Liên Quân responsive với admin dashboard."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
