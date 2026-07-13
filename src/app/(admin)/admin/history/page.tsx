import { OrderHistoryBoard } from '@/modules/history/components/OrderHistoryBoard';
import { ClipboardList } from 'lucide-react';

export const metadata = {
  title: 'Registro Histórico - Admin',
};

export default function HistoryAdminPage() {
  // En producción, este ID vendría del tenant autenticado
  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID || '';

  return (
    <div className="p-6 md:p-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <ClipboardList className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">Registro Histórico</h1>
        </div>
        <p className="text-zinc-400 text-lg">Pedidos completados y cancelados.</p>
      </div>

      <OrderHistoryBoard restaurantId={restaurantId} />
    </div>
  );
}
