import { redirect } from "next/navigation";
import { AdminAccountForm, HideAccountButton } from "@/components/AdminAccountForm";
import { AdminNav } from "@/components/AdminNav";
import { getAdminFromCookies } from "@/lib/auth";
import { money } from "@/lib/format";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminAccountsPage() {
  if (!getAdminFromCookies()) redirect("/pt-admin/login");
  const accounts = await prisma.account.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <main className="mx-auto max-w-7xl px-4 py-6">
      <AdminNav />
      <section className="rounded-lg bg-white p-4 shadow-game">
        <h1 className="mb-4 text-2xl font-black text-purple-950">Quản lý acc</h1>
        <AdminAccountForm />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead><tr className="border-b"><th className="p-2">Acc</th><th>SSS</th><th>HT</th><th>VIP</th><th>Giá giờ</th><th>Trạng thái</th><th></th></tr></thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id} className="border-b">
                  <td className="p-2 font-black">{account.name}</td>
                  <td>{account.sssCount}</td>
                  <td>{account.collaborationCount}</td>
                  <td>{account.vipLevel}</td>
                  <td>{money(account.priceHourly)}</td>
                  <td>{account.status}</td>
                  <td><HideAccountButton id={account.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
