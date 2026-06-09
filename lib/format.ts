export function money(value: number) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND", maximumFractionDigits: 0 }).format(value);
}

export function rentalHours(packageType: "hourly" | "night" | "daily") {
  if (packageType === "night") return 10;
  if (packageType === "daily") return 24;
  return 1;
}
