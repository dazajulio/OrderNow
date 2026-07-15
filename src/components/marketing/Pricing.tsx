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
    <section id="precios" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple y Transparente</h2>
          <p className="text-zinc-400 text-lg">Todos nuestros beneficios en Pro</p>
        </div>

        <div className="relative group mx-auto max-w-lg">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
          <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
            <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] text-white text-xs font-bold px-4 py-1.5 rounded-full">
              Más Elegido
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">{PLAN.name}</h3>
            <p className="text-zinc-500 text-sm mb-8">{PLAN.tagline}</p>
            
            <div className="flex items-center justify-center gap-1 mb-8">
              <span className="text-3xl text-zinc-500">$</span>
              <span className="text-6xl font-extrabold text-white">{PLAN.price}</span>
              <span className="text-zinc-500 mt-4">/mes</span>
            </div>
            
            <ul className="space-y-4 mb-10 text-left">
              {PLAN.features.map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <a href="#registro" className="w-full block">
              <button className="w-full bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:brightness-110 text-white font-bold h-14 rounded-xl text-lg transition-colors">
                Comenzar Prueba Gratuita
              </button>
            </a>
            <p className="text-sm text-zinc-600 mt-4">Cancela en cualquier momento. Sin tarjeta de crédito inicial.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
