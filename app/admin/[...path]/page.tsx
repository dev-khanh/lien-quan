import { redirect } from "next/navigation";

export default function AdminCompatibilityPage({ params }: { params: { path: string[] } }) {
  redirect(`/pt-admin/${params.path.join("/")}`);
}
