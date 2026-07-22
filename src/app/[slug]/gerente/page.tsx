import { redirect } from 'next/navigation';

export default async function GerenteIndexPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  redirect(`/${slug}/gerente/settings`);
}
