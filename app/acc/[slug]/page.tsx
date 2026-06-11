import AccountDetailPage, { generateMetadata as generateAccountMetadata } from "@/app/accounts/[id]/page";

export { dynamic } from "@/app/accounts/[id]/page";

export function generateMetadata({ params }: { params: { slug: string } }) {
  return generateAccountMetadata({ params: { id: params.slug } });
}

export default function AccountSlugPage({ params }: { params: { slug: string } }) {
  return AccountDetailPage({ params: { id: params.slug } });
}
