"use client";

export function ConfirmOrderButton({ id }: { id: string }) {
  async function click() {
    const res = await fetch(`/api/admin/orders/${id}/confirm`, { method: "POST" });
    if (res.ok) window.location.reload();
    else alert("Không xác nhận được đơn.");
  }
  return <button onClick={click} className="rounded-md bg-green-600 px-3 py-2 text-sm font-black text-white">Xác nhận</button>;
}

export function ReviewModeration({ id }: { id: string }) {
  async function update(status: "approved" | "rejected") {
    const res = await fetch(`/api/admin/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    });
    if (res.ok) window.location.reload();
  }
  return (
    <span className="inline-flex gap-2">
      <button onClick={() => update("approved")} className="rounded-md bg-green-600 px-3 py-2 text-sm font-black text-white">Duyệt</button>
      <button onClick={() => update("rejected")} className="rounded-md bg-red-600 px-3 py-2 text-sm font-black text-white">Từ chối</button>
    </span>
  );
}
