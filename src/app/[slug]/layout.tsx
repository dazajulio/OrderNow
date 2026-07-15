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
      {/* Elegant Header */}
      <header className="w-full flex flex-col items-center justify-center py-6 border-b border-zinc-900 bg-zinc-950/90 backdrop-blur-md sticky top-0 z-50">
        {restaurant.logo_url ? (
          <img src={restaurant.logo_url} alt={restaurant.name} className="h-12 object-contain mb-2" />
        ) : (
          <div className="w-12 h-12 rounded-full brand-bg flex items-center justify-center mb-2 shadow-lg shadow-orange-500/20">
            <span className="text-xl font-bold text-white">
              {restaurant.name.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        <h1 className="text-xl font-bold text-white tracking-tight">{restaurant.name}</h1>
        <p className="text-xs text-zinc-500 tracking-widest uppercase mt-1">Powered by FoodTech SaaS</p>
      </header>
      
      <main className="w-full max-w-2xl mx-auto min-h-screen relative shadow-2xl shadow-black/50 bg-zinc-950 pb-32">
        {children}
      </main>
    </div>
  );
}
