import { redirect } from "next/navigation";
import { AdminLoginForm } from "@/components/AdminLoginForm";
import { getAdminFromCookies } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function PtAdminLoginPage() {
  if (getAdminFromCookies()) redirect("/pt-admin");
  return <AdminLoginForm />;
}
