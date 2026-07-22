'use client';

import React from 'react';
import CouponCard from '@/modules/glubbi/components/CouponCard';
import { Tag, TicketPercent, Info } from 'lucide-react';

export default function GlubbiOfertas() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Ofertas y Cupones</h1>
        <p className="text-sm text-slate-500 mt-1">Aprovecha los mejores descuentos en tu zona.</p>
      </div>

      {/* Tarjeta grande de Bienvenida */}
      <CouponCard />

      {/* Otras ofertas secundarias */}
      <div className="mt-8">
        <h3 className="text-lg font-bold text-slate-800 mb-4">Más Promociones</h3>
        
        <div className="space-y-3">
          <div className="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <Tag className="w-6 h-6" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-slate-800 text-sm">Martes de 2x1</h4>
              <p className="text-xs text-slate-500">En hamburguesas seleccionadas</p>
            </div>
            <button className="text-orange-500 font-bold text-sm bg-orange-50 px-3 py-1.5 rounded-lg">Ver</button>
          </div>

          <div className="bg-white rounded-2xl p-4 flex items-center shadow-sm border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
              <TicketPercent className="w-6 h-6" />
            </div>
            <div className="ml-4 flex-1">
              <h4 className="font-bold text-slate-800 text-sm">20% OFF en Sushi</h4>
              <p className="text-xs text-slate-500">Pagando con tarjeta aliada</p>
            </div>
            <button className="text-orange-500 font-bold text-sm bg-orange-50 px-3 py-1.5 rounded-lg">Ver</button>
          </div>
        </div>
      </div>
      
      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-start gap-3">
        <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-700 leading-relaxed">
          Los cupones se aplican automáticamente en la pantalla de pago al finalizar tu orden. Solo se puede usar un cupón por pedido.
        </p>
      </div>
    </div>
  );
}
