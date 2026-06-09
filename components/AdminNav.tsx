export function AdminNav() {
  return (
    <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm font-black">
      <a className="rounded-md bg-white px-3 py-2 text-[#ec3f96]" href="/pt-admin">Dashboard</a>
      <a className="rounded-md bg-white px-3 py-2 text-[#ec3f96]" href="/pt-admin/accounts">Acc</a>
      <a className="rounded-md bg-white px-3 py-2 text-[#ec3f96]" href="/pt-admin/orders">Đơn thuê</a>
      <a className="rounded-md bg-white px-3 py-2 text-[#ec3f96]" href="/pt-admin/reviews">Review</a>
    </nav>
  );
}
