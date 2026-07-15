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
    a: 'Sí. La arquitectura es multi-tenant: cada sucursal tiene su propio slug y datos aislados, pero el plan Business te da una analítica maestra que las une todas.',
  },
  {
    q: '¿Qué pasa con mis datos si cancelo?',
    a: 'Tus datos son tuyos. Puedes exportar tu historial de pedidos, clientes y catálogo en cualquier momento, incluso antes de cancelar.',
  },
  {
    q: '¿Hay permanencia mínima o contrato forzoso?',
    a: 'Ninguno. Todos los planes son mensuales y puedes cancelar cuando quieras desde tu panel de administración.',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
          <p className="text-zinc-400 text-lg">Todo lo que necesitas saber antes de empezar.</p>
        </div>

        <div className="space-y-3">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q} className="border border-white/10 rounded-2xl bg-zinc-900/40 overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className="text-white font-semibold">{item.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform ${isOpen ? 'rotate-180 text-[#FF6B00]' : ''}`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-5 text-zinc-400 animate-fade-in">
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
