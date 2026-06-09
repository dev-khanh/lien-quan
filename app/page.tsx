import { AccountCard } from "@/components/AccountCard";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const accounts = await prisma.account.findMany({
    where: { isVisible: true, status: { not: "hidden" } },
    orderBy: [{ status: "asc" }, { createdAt: "desc" }]
  });
  return (
    <main className="mx-auto max-w-7xl px-3 py-5 sm:px-5">
      <header className="mb-5 flex flex-col gap-2 text-white sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-amber-200">Shop thuê acc Liên Quân</p>
          <h1 className="text-3xl font-black sm:text-5xl">Thuê acc skin xịn, vào game nhanh</h1>
        </div>
        <a href="/admin" className="w-fit rounded-md bg-white/15 px-3 py-2 text-sm font-bold backdrop-blur">Admin</a>
      </header>
      <section className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {accounts.map((account) => <AccountCard key={account.id} account={account} />)}
      </section>
    </main>
  );
}
