'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { OrderWithItems } from '@/types/database';
import { formatPrice, formatElapsedTime } from '@/lib/utils';
import { Search, MapPin, User, Hash, Clock } from 'lucide-react';

interface OrderHistoryBoardProps {
  restaurantId: string;
}

export function OrderHistoryBoard({ restaurantId }: OrderHistoryBoardProps) {
  const [orders, setOrders] = useState<OrderWithItems[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const supabase = createClient();

  useEffect(() => {
    async function loadHistory() {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (*),
          table:tables (*),
          customer:customers (*)
        `)
        .eq('restaurant_id', restaurantId)
        .in('status', ['delivered', 'cancelled'])
        .order('created_at', { ascending: false })
        .limit(100); // For demo purposes, just the last 100

      if (data) setOrders(data as OrderWithItems[]);
      setIsLoading(false);
    }
    loadHistory();
  }, [restaurantId, supabase]);

  const filteredOrders = orders.filter(o => 
    o.order_number.toString().includes(search) || 
    (o.customer?.name || '').toLowerCase().includes(search.toLowerCase()) ||
    (o.table?.label || '').toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
        <input 
          type="text" 
          placeholder="Buscar por número de orden, cliente o mesa..." 
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-white shadow-sm border border-gray-200 rounded-2xl py-4 pl-14 pr-6 text-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
        />
      </div>

      {/* Orders Table/List */}
      <div className="bg-white shadow-sm border border-gray-200 rounded-2xl overflow-hidden">
        {filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-400">
            No se encontraron pedidos en el historial.
          </div>
        ) : (
          <div className="divide-y divide-gray-200/50">
            {filteredOrders.map(order => (
              <div key={order.id} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-100/20 transition-colors">
                
                {/* Info block */}
                <div className="flex items-start gap-4">
                  <div className="bg-slate-100 rounded-xl p-3 flex flex-col items-center justify-center min-w-[4rem]">
                    <span className="text-xs text-gray-500">#</span>
                    <span className="text-xl font-bold text-white">{order.order_number}</span>
                  </div>
                  
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                        order.status === 'delivered' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {order.status === 'delivered' ? 'Entregado' : 'Cancelado'}
                      </span>
                      <span className="text-gray-400 text-sm flex items-center">
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        {new Date(order.created_at).toLocaleString()}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      {order.table && (
                        <span className="flex items-center">
                          <MapPin className="w-3.5 h-3.5 mr-1" />
                          {order.table.label || `Mesa ${order.table.table_number}`}
                        </span>
                      )}
                      {order.customer && (
                        <span className="flex items-center">
                          <User className="w-3.5 h-3.5 mr-1" />
                          {order.customer.name}
                        </span>
                      )}
                    </div>

                    {order.notes && order.notes.includes('[Origen: Delivery]') && (
                      <div className="text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg p-2.5 mt-2 space-y-0.5 max-w-md">
                        <div><strong className="text-blue-300">Dirección:</strong> {order.notes.match(/Dirección:\s*([^|]+)/)?.[1]?.trim() || 'N/A'}</div>
                        <div><strong className="text-blue-300">Teléfono:</strong> {order.notes.match(/Teléfono:\s*([^|]+)/)?.[1]?.trim() || 'N/A'}</div>
                        <div><strong className="text-blue-300">Referencia:</strong> {order.notes.match(/Referencia:\s*([^|]+)/)?.[1]?.trim() || 'N/A'}</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Items Summary & Total */}
                <div className="flex flex-col sm:items-end gap-2 sm:max-w-xs">
                  <span className="text-xl font-bold text-white">{formatPrice(order.total_amount, 'USD')}</span>
                  <p className="text-sm text-gray-500 line-clamp-2 text-left sm:text-right">
                    {order.order_items.map(item => `${item.quantity}x ${item.product_name}`).join(', ')}
                  </p>
                  {order.payment_method && (
                    <span className="text-xs px-2 py-1 bg-slate-100 text-gray-800 rounded-md">
                      Pago: {order.payment_method === 'stripe' ? 'Tarjeta' : (order.payment_method as any) === 'terminal' ? 'Terminal' : 'Efectivo'}
                    </span>
                  )}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
