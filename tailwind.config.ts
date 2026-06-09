import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        game: "0 12px 30px rgba(94, 24, 106, 0.16)"
      }
    }
  },
  plugins: []
};

export default config;
