import { ShieldCheck } from 'lucide-react';

const PROBLEMS = [
  {
    title: 'Sistemas desconectados',
    body: 'Un software para caja, otro para pedidos, otro para inventario. El caos operativo destruye tus márgenes.',
  },
  {
    title: 'Cero conocimiento del cliente',
    body: 'No sabes quiénes compran, con qué frecuencia ni cómo hacer que vuelvan de manera automatizada.',
  },
  {
    title: 'Errores de comanda a mano',
    body: 'Papelitos perdidos, pedidos mal transcritos y meseros corriendo entre la sala y la cocina.',
  },
];

const SOLUTIONS = [
  'Todo integrado en un solo ecosistema Cloud.',
  'Flujo sin fricción: desde la mesa hasta la cocina.',
  'Analítica avanzada para la toma de decisiones.',
  'Optimización de up-selling mediante Inteligencia Artificial.',
];

export function ProblemSolution() {
  return (
    <section className="py-24 bg-black border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Por qué los restaurantes tradicionales fallan al escalar
          </h2>
          <div className="space-y-6">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-xl font-bold">✕</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{p.title}</h3>
                  <p className="text-zinc-500">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B00]/20 to-[#2FA8FF]/20 blur-3xl rounded-full" />
          <div className="relative bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
            <h3 className="text-2xl font-bold text-white mb-6">
              La solución mtriq<span className="text-[#FF6B00]">.app</span>
            </h3>
            <ul className="space-y-4">
              {SOLUTIONS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-zinc-300">
                  <ShieldCheck className="w-5 h-5 text-[#FF6B00] shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
