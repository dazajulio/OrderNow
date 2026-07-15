'use client';

import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

const FAQS = [
  {
    q: '¿Necesito comprar hardware especial?',
    a: 'No. Mtriq.app funciona con lo que ya tienes: cualquier celular o tablet para el KDS, y códigos QR imprimibles para las mesas. No hay terminales propietarias que comprar.',
  },
  {
    q: '¿Cuánto tarda la puesta en marcha?',
    a: 'La mayoría de los restaurantes están operando su menú digital y KDS en menos de 48 horas. Nuestro equipo de onboarding carga tu menú inicial por ti.',
  },
  {
    q: '¿Puedo tener varias sucursales con el mismo panel?',
    a: 'Sí. La arquitectura es de alto rendimiento: cada sucursal tiene su propio slug y datos aislados, permitiéndote gestionar múltiples sucursales de forma unificada desde tu panel.',
  },
  {
    q: '¿Qué pasa con mis datos si cancelo?',
    a: 'Tus datos son tuyos. Puedes exportar tu historial de pedidos, clientes y catálogo en cualquier momento, incluso antes de cancelar.',
  },
  {
    q: '¿Hay permanencia mínima o contrato forzoso?',
    a: 'Ninguno. La suscripción al Plan Pro es mensual y puedes cancelar cuando quieras directamente desde tu panel de administración.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Preguntas Frecuentes</h2>
          <p className="text-slate-600 text-lg">Todo lo que necesitas saber antes de empezar.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border border-slate-100 rounded-2xl bg-slate-50/50 overflow-hidden shadow-sm shadow-slate-100/10">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-slate-50"
                >
                  <span className="text-slate-900 font-semibold">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-orange-500' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-slate-600 text-sm leading-relaxed animate-fade-in">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
