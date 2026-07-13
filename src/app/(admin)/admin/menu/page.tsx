import { MenuToggle } from '@/modules/menu/components/MenuToggle';
import { UtensilsCrossed } from 'lucide-react';

export const metadata = {
  title: 'Gestión de Menú - Admin',
};

export default function MenuAdminPage() {
  // En producción, este ID vendría del tenant autenticado
  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID || '';

  return (
    <div className="p-6 md:p-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <UtensilsCrossed className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">Gestión de Menú</h1>
        </div>
        <p className="text-zinc-400 text-lg">Activa o desactiva productos al instante (Modo 86).</p>
      </div>

      <MenuToggle restaurantId={restaurantId} />
    </div>
  );
}
