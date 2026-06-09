export function money(value: number) {
  return `${new Intl.NumberFormat("vi-VN", { maximumFractionDigits: 0 }).format(value)}đ`;
}

export function rentalHours(packageType: "hourly" | "night" | "daily") {
  if (packageType === "night") return 10;
  if (packageType === "daily") return 24;
  return 1;
}
