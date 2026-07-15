import { ShieldCheck } from 'lucide-react';

const PLAN = {
  name: 'Plan Pro',
  price: '29',
  tagline: 'El más elegido por fast food y casual dining.',
  features: [
    'CRM y base de datos de clientes',
    'Upsell con Inteligencia Artificial',
    'Panel Administrativo Multi-Sucursal',
    'Kiosko Menú Digital + QR ilimitados',
    'Kitchen Display System (KDS)',
    '1 sucursal',
    'Soporte por email',
  ],
};

export function Pricing() {
  return (
    <section id="precios" className="py-24 bg-slate-50 border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Simple y Transparente</h2>
          <p className="text-slate-600 text-lg">Todos nuestros beneficios en Pro</p>
        </div>

        <div className="relative mx-auto max-w-lg">
          {/* Sombra sutil de acento para la tarjeta destacada */}
          <div className="absolute -inset-1 bg-orange-500/10 rounded-3xl blur-lg pointer-events-none" />
          
          <div className="relative bg-white border border-slate-100 rounded-3xl p-8 md:p-12 text-center shadow-xl shadow-slate-200/50">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-md shadow-orange-500/20">
              Más Elegido
            </span>
            <h3 className="text-2xl font-bold text-slate-900 mb-2">{PLAN.name}</h3>
            <p className="text-slate-500 text-sm mb-8">{PLAN.tagline}</p>
            
            <div className="flex items-center justify-center gap-1 mb-8">
              <span className="text-3xl text-slate-400 font-semibold">$</span>
              <span className="text-6xl font-extrabold text-slate-900 tracking-tight">{PLAN.price}</span>
              <span className="text-slate-400 mt-4 font-medium">/mes</span>
            </div>
            
            <ul className="space-y-4 mb-10 text-left">
              {PLAN.features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                  <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a href="#registro" className="w-full block">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold h-14 rounded-xl text-lg transition-all shadow-md shadow-orange-500/10 active:scale-[0.98]">
                Comenzar Prueba Gratuita
              </button>
            </a>
            <p className="text-xs text-slate-400 mt-4">Cancela en cualquier momento. Sin tarjeta de crédito inicial.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
