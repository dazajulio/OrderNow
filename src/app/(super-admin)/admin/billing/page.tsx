'use client';

import { useState } from 'react';
import { 
  CreditCard, 
  ArrowUpRight, 
  CheckCircle, 
  HelpCircle, 
  DollarSign, 
  Calendar, 
  Clock, 
  FileText 
} from 'lucide-react';

export default function BillingPage() {
  // Mock billing statements for visual structure
  const mockInvoices = [
    { id: 'INV-2026-001', date: '2026-07-20', amount: 29.00, status: 'paid', description: 'Licencia SaaS Mtriq - La Rustica Pizzería' },
    { id: 'INV-2026-002', date: '2026-07-15', amount: 29.00, status: 'paid', description: 'Licencia SaaS Mtriq - Burger Master' },
    { id: 'INV-2026-003', date: '2026-07-02', amount: 29.00, status: 'refunded', description: 'Reembolso por ajuste - Local Demo' },
  ];

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white shadow-sm/25 p-6 border border-gray-200 rounded-3xl backdrop-blur-xl space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Estado de Cuenta & Facturación SaaS
        </h2>
        <p className="text-xs text-gray-400">Monitoreo de ingresos de suscripciones y transacciones de Lemon Squeezy</p>
      </div>

      {/* Alert box - Pending Gateway setup */}
      <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 rounded-3xl p-6 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="space-y-1">
          <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">Integración en Desarrollo</span>
          <p className="text-sm text-gray-800">
            Esta sección se encuentra en modo de previsualización **esperando la activación de la pasarela de pagos**.
          </p>
          <p className="text-xs text-gray-400">
            Una vez enlacemos las APIs de cobro móvil y Lemon Squeezy, esta pantalla se alimentará de transacciones reales en producción.
          </p>
        </div>
        <div className="px-4 py-2 bg-amber-500/15 border border-amber-500/20 text-amber-400 rounded-xl text-xs font-bold uppercase tracking-wider">
          Pendiente Checkout
        </div>
      </div>

      {/* Visual Placeholder grid */}
      <div className="grid md:grid-cols-3 gap-6">
        
        {/* KPI 1 */}
        <div className="bg-white shadow-sm/40 border border-gray-200 rounded-3xl p-6 space-y-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Ventas Netas (Mes)</span>
          <p className="text-2xl font-black text-white">$58.00 USD</p>
          <span className="text-[10px] text-green-400 font-bold block flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" /> 2 Restaurantes activos
          </span>
        </div>

        {/* KPI 2 */}
        <div className="bg-white shadow-sm/40 border border-gray-200 rounded-3xl p-6 space-y-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Transacciones Procesadas</span>
          <p className="text-2xl font-black text-white">3 Facturas</p>
          <span className="text-[10px] text-gray-400 font-mono block">Ticket recurrente: $29.00/mes</span>
        </div>

        {/* KPI 3 */}
        <div className="bg-white shadow-sm/40 border border-gray-200 rounded-3xl p-6 space-y-2">
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">Comisión de Pasarela (Est.)</span>
          <p className="text-2xl font-black text-gray-400">$2.32 USD</p>
          <span className="text-[10px] text-gray-600 block">Basado en el fee de 4.0% de MoR</span>
        </div>

      </div>

      {/* Mock Billing history table */}
      <div className="bg-white shadow-sm/40 border border-gray-200 rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-bold text-white tracking-tight">Historial de Transacciones (Simulado)</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-gray-400 uppercase text-[9px] tracking-wider font-bold">
              <tr>
                <th className="px-6 py-4">ID Factura</th>
                <th className="px-6 py-4">Detalle</th>
                <th className="px-6 py-4 text-center">Fecha</th>
                <th className="px-6 py-4 text-right">Monto</th>
                <th className="px-6 py-4 text-center">Estatus</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-gray-800">
              {mockInvoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-white/[0.01] transition-colors">
                  <td className="px-6 py-4 font-mono font-bold text-orange-500 text-xs">
                    {inv.id}
                  </td>
                  <td className="px-6 py-4 font-semibold text-white">
                    {inv.description}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-500 font-mono text-xs">
                    {new Date(inv.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-right font-mono font-bold">
                    ${inv.amount.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-center">
                    {inv.status === 'paid' ? (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                        Pagado
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-gray-400 border border-gray-200">
                        Reembolsado
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
