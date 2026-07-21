'use client';

import { useEffect, useState } from 'react';
import { MenuToggle } from '@/modules/menu/components/MenuToggle';
import { UtensilsCrossed } from 'lucide-react';

export default function MenuAdminPage() {
  const [restaurantId, setRestaurantId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const id = localStorage.getItem('active_restaurant_id') || process.env.NEXT_PUBLIC_RESTAURANT_ID || '';
    setRestaurantId(id);
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="p-12 flex justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <UtensilsCrossed className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Gestión de Menú</h1>
        </div>
        <p className="text-gray-500 text-lg">Activa o desactiva productos al instante (Modo 86).</p>
      </div>

      {restaurantId ? (
        <MenuToggle restaurantId={restaurantId} />
      ) : (
        <p className="text-gray-400 text-sm">Registra un restaurante para ver su menú.</p>
      )}
    </div>
  );
}
