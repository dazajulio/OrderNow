import { ShieldCheck } from 'lucide-react';

const PLANS = [
  {
    name: 'Starter',
    price: '19',
    tagline: 'Un local, todo lo esencial.',
    features: [
      'Kiosko Menú Digital + QR ilimitados',
      'Kitchen Display System (KDS)',
      '1 sucursal',
      'Soporte por email',
    ],
    highlighted: false,
  },
  {
    name: 'Pro',
    price: '29',
    tagline: 'El más elegido por fast food y casual dining.',
    features: [
      'Todo lo de Starter',
      'CRM y base de datos de clientes',
      'Upsell con Inteligencia Artificial',
      'Panel Administrativo Multi-Sucursal',
      'Soporte prioritario 24/7',
    ],
    highlighted: true,
  },
  {
    name: 'Business',
    price: '59',
    tagline: 'Cadenas y franquicias en expansión.',
    features: [
      'Todo lo de Pro',
      'Analítica maestra multi-tienda',
      'Onboarding y migración asistida',
      'Soporte dedicado + SLA',
    ],
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="precios" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple y Transparente</h2>
          <p className="text-zinc-400 text-lg">Elige el plan que acompaña el tamaño real de tu operación.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 ${
                plan.highlighted
                  ? 'bg-zinc-900 border-2 border-[#FF6B00] shadow-2xl shadow-orange-500/10 md:-translate-y-4'
                  : 'bg-zinc-900/50 border border-white/10'
              }`}
            >
              {plan.highlighted && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] text-white text-xs font-bold px-4 py-1.5 rounded-full">
                  Más Popular
                </span>
              )}
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-zinc-500 text-sm mb-6 h-10">{plan.tagline}</p>
              <div className="flex items-center gap-1 mb-8">
                <span className="text-2xl text-zinc-500">$</span>
                <span className="text-5xl font-extrabold text-white">{plan.price}</span>
                <span className="text-zinc-500 mt-3">/mes</span>
              </div>

              <ul className="space-y-3 mb-8 text-left">
                {plan.features.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-zinc-300 text-sm">
                    <ShieldCheck
                      className={`w-4 h-4 shrink-0 mt-0.5 ${plan.highlighted ? 'text-[#FF6B00]' : 'text-[#2FA8FF]'}`}
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <a href="#registro">
                <button
                  className={`w-full h-12 rounded-xl font-bold transition-colors ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:brightness-110 text-white'
                      : 'bg-white/5 hover:bg-white/10 text-white border border-white/10'
                  }`}
                >
                  Comenzar Prueba Gratuita
                </button>
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-sm text-zinc-600 mt-10">
          Cancela en cualquier momento. Sin tarjeta de crédito inicial.
        </p>
      </div>
    </section>
  );
}
