import { createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

interface SlugLayoutProps {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: SlugLayoutProps): Promise<Metadata> {
  const supabase = await createServerSupabaseClient();
  const targetId = process.env.NEXT_PUBLIC_RESTAURANT_ID || 'a12bc706-ffc2-4959-ba03-58ebecada86a';
  
  const { data } = await supabase
    .from('restaurants')
    .select('name')
    .eq('id', targetId)
    .eq('is_active', true)
    .single();

  const restaurant = data as { name: string } | null;

  return {
    title: restaurant ? `${restaurant.name} - Pedidos Móviles` : 'Restaurante no encontrado',
  };
}

export default async function SlugLayout({ children, params }: SlugLayoutProps) {
  const supabase = await createServerSupabaseClient();
  const targetId = process.env.NEXT_PUBLIC_RESTAURANT_ID || 'a12bc706-ffc2-4959-ba03-58ebecada86a';
 
  const { data } = await supabase
    .from('restaurants')
    .select('id, name, logo_url, brand_color_primary, brand_color_secondary')
    .eq('id', targetId)
    .eq('is_active', true)
    .single();

  const restaurant = data as any;

  if (!restaurant) {
    notFound();
  }

  // Inject CSS variables for white-label styling
  const brandStyle = {
    '--brand-primary': restaurant.brand_color_primary,
    '--brand-secondary': restaurant.brand_color_secondary || '#1A1A2E',
  } as React.CSSProperties;

  return (
    <div 
      className="min-h-screen bg-zinc-950 text-white selection:bg-brand-primary/30"
      style={brandStyle}
    >
      <main className="w-full max-w-2xl mx-auto min-h-screen relative shadow-2xl shadow-black/50 bg-zinc-950 pb-32">
        {children}
      </main>
    </div>
  );
}
