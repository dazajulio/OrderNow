'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { CheckCircle2, Clock, ChefHat, PackageCheck, Banknote } from 'lucide-react';
import type { Order } from '@/types/database';

interface OrderStatusProps {
  orderId: string;
  restaurantId: string;
}

export function OrderStatus({ orderId, restaurantId }: OrderStatusProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    // 1. Cargar estado inicial
    async function fetchOrder() {
      const { data } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();
      
      if (data) setOrder(data);
      setIsLoading(false);
    }
    fetchOrder();

    // 2. Suscribirse a cambios en tiempo real
    const channel = supabase
      .channel(`order-tracker-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`
        },
        (payload) => {
          setOrder(payload.new as Order);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, supabase]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-12">
        <div className="w-8 h-8 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (!order) {
    return <div className="text-center text-zinc-500 p-6">No se encontró la orden.</div>;
  }

  const isPaid = order.payment_status === 'paid';

  const steps = [
    {
      id: 'pending',
      label: isPaid ? 'Orden Pagada' : 'Por Pagar',
      description: isPaid ? 'Hemos recibido tu orden y pago' : 'Acércate a caja o espera la terminal',
      icon: isPaid ? Clock : Banknote,
      isActive: order.status === 'pending',
      isCompleted: ['preparing', 'ready', 'delivered'].includes(order.status)
    },
    {
      id: 'preparing',
      label: 'En Preparación',
      description: 'Nuestros chefs están trabajando',
      icon: ChefHat,
      isActive: order.status === 'preparing',
      isCompleted: ['ready', 'delivered'].includes(order.status)
    },
    {
      id: 'ready',
      label: '¡Listo!',
      description: 'Tu pedido está listo para entregar',
      icon: PackageCheck,
      isActive: order.status === 'ready',
      isCompleted: order.status === 'delivered'
    }
  ];

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-8 animate-fade-in w-full max-w-md mx-auto shadow-2xl shadow-black">
      <div className="text-center mb-10">
        <p className="text-zinc-500 text-sm uppercase tracking-widest font-bold mb-1">Orden #</p>
        <h2 className="text-5xl font-black text-white">{order.order_number}</h2>
      </div>

      <div className="relative">
        {/* Line connection */}
        <div className="absolute left-8 top-8 bottom-8 w-1 bg-zinc-800 rounded-full -translate-x-1/2 z-0" />
        
        <div className="space-y-8 relative z-10">
          {steps.map((step, index) => {
            const Icon = step.icon;
            let iconColor = 'text-zinc-500';
            let bgColor = 'bg-zinc-900 border-2 border-zinc-800';
            
            if (step.isCompleted) {
              iconColor = 'text-green-500';
              bgColor = 'bg-green-500/10 border-2 border-green-500';
            } else if (step.isActive) {
              iconColor = 'text-orange-500';
              bgColor = 'brand-bg border-2 border-orange-500 text-white';
            }

            return (
              <div key={step.id} className="flex items-start gap-6">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors duration-500 ${bgColor}`}>
                  {step.isCompleted && !step.isActive ? (
                    <CheckCircle2 className="w-8 h-8 text-green-500" />
                  ) : (
                    <Icon className={`w-8 h-8 ${step.isActive ? 'text-white' : iconColor}`} />
                  )}
                </div>
                <div className="pt-2">
                  <h3 className={`text-xl font-bold ${step.isActive ? 'text-white' : step.isCompleted ? 'text-zinc-300' : 'text-zinc-600'}`}>
                    {step.label}
                  </h3>
                  <p className="text-zinc-500 text-sm mt-1">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
