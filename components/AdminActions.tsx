"use client";

export function ConfirmOrderButton({ id }: { id: string }) {
  async function click() {
    const res = await fetch(`/api/admin/orders/${id}/confirm`, { method: "POST" });
    if (res.ok) window.location.reload();
    else alert("Không xác nhận được đơn.");
  }
  return <button onClick={click} className="rounded-md bg-green-600 px-3 py-2 text-sm font-black text-white">Xác nhận</button>;
}

export function OrderActions({ id, status }: { id: string; status: string }) {
  async function patch(action: string, body?: unknown) {
    const res = await fetch(`/api/admin/orders/${id}/${action}`, {
      method: action === "confirm" ? "POST" : "PATCH",
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined
    });
    if (res.ok) window.location.reload();
    else alert("Không cập nhật được đơn.");
  }

  async function extend() {
    const type = window.prompt("Gia hạn: hour, night, day", "hour");
    if (!type) return;
    await patch("extend", { type });
  }

  return (
    <span className="inline-flex flex-wrap gap-2">
      {status === "pending" && <button onClick={() => patch("confirm")} className="rounded-md bg-green-600 px-3 py-2 text-sm font-black text-white">Xác nhận thanh toán</button>}
      {status === "pending" && <button onClick={() => patch("cancel")} className="rounded-md bg-red-600 px-3 py-2 text-sm font-black text-white">Hủy đơn</button>}
      {status === "renting" && <button onClick={() => patch("complete")} className="rounded-md bg-slate-700 px-3 py-2 text-sm font-black text-white">Kết thúc thuê</button>}
      {status === "renting" && <button onClick={extend} className="rounded-md bg-[#ec3f96] px-3 py-2 text-sm font-black text-white">Gia hạn</button>}
    </span>
  );
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
  async function remove() {
    if (!window.confirm("Xóa review này?")) return;
    const res = await fetch(`/api/admin/reviews/${id}`, { method: "DELETE" });
    if (res.ok) window.location.reload();
  }
  return (
    <span className="inline-flex gap-2">
      <button onClick={() => update("approved")} className="rounded-md bg-green-600 px-3 py-2 text-sm font-black text-white">Duyệt</button>
      <button onClick={() => update("rejected")} className="rounded-md bg-red-600 px-3 py-2 text-sm font-black text-white">Từ chối</button>
      <button onClick={remove} className="rounded-md bg-slate-700 px-3 py-2 text-sm font-black text-white">Xóa</button>
    </span>
  );
}
