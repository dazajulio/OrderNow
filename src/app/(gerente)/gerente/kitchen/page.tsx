'use client';

// ============================================================================
// PÁGINA: /gerente/kitchen — Kitchen Display System
// ============================================================================

import { useEffect, useState } from 'react';
import { KDSBoard } from '@/modules/kds/components/KDSBoard';

export default function KitchenPage() {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('active_restaurant_id') || process.env.NEXT_PUBLIC_RESTAURANT_ID || '';
    setRestaurantId(id);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!restaurantId) {
    return (
      <div className="flex h-screen items-center justify-center bg-zinc-950">
        <div className="text-center space-y-3">
          <p className="text-lg font-semibold text-zinc-300">
            Configuración requerida
          </p>
          <p className="text-sm text-zinc-500 max-w-md">
            Define la variable de entorno{' '}
            <code className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-300">
              NEXT_PUBLIC_RESTAURANT_ID
            </code>{' '}
            o regístrate para conectar el KDS a tu restaurante.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="h-screen overflow-hidden bg-white">
      <KDSBoard restaurantId={restaurantId} />
    </main>
  );
}
