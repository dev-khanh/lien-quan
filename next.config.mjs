/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["*.ngrok-free.dev"],
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "placehold.co" }
    ]
  }
};

export default nextConfig;
