export function AdminNav() {
  return (
    <nav className="mb-5 flex flex-wrap items-center gap-2 text-sm font-black">
      <a className="rounded-md bg-white px-3 py-2 text-purple-900" href="/admin">Dashboard</a>
      <a className="rounded-md bg-white px-3 py-2 text-purple-900" href="/admin/accounts">Acc</a>
      <a className="rounded-md bg-white px-3 py-2 text-purple-900" href="/admin/orders">Đơn thuê</a>
      <a className="rounded-md bg-white px-3 py-2 text-purple-900" href="/admin/reviews">Review</a>
      <a className="rounded-md bg-white/15 px-3 py-2 text-white" href="/">Trang chủ</a>
    </nav>
  );
}
