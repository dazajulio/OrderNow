import { createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { KDSBoard } from '@/modules/kds/components/KDSBoard';

interface CocinaPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function CocinaPage({ params }: CocinaPageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  
  // Validate that the restaurant exists with the given slug
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('slug', slug)
    .single();

  if (!restaurant) {
    notFound();
  }

  return (
    <main className="h-full w-full overflow-hidden bg-white">
      <KDSBoard restaurantId={restaurant.id} />
    </main>
  );
}
