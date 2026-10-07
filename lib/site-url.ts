const PRODUCTION_URL = "https://thueacclienquan.com";

// Production luôn dùng domain thật: NEXT_PUBLIC_APP_URL trỏ localhost (copy từ
// .env.example) từng làm canonical/sitemap/robots lộ localhost. Dev vẫn dùng env.
export function getSiteUrl() {
  const fromEnv = (process.env.NEXT_PUBLIC_APP_URL || "").trim().replace(/\/+$/, "");
  if (process.env.NODE_ENV !== "production") return fromEnv || "http://localhost:3000";
  return fromEnv && !/localhost|127\.0\.0\.1/.test(fromEnv) ? fromEnv : PRODUCTION_URL;
}
