import { ShieldCheck } from 'lucide-react';

const PROBLEMS = [
  {
    title: 'Procesos lentos y sin digitalizar',
    body: 'La falta de respuestas rápidas y la ausencia de procesos ágiles te hacen perder ventas y clientes cada día.',
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
    <section className="py-24 bg-slate-50 border-y border-slate-100 relative">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-8">
            Por qué los restaurantes tradicionales fallan al escalar
          </h2>
          <div className="space-y-6">
            {PROBLEMS.map((p) => (
              <div key={p.title} className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center shrink-0 border border-red-100">
                  <span className="text-red-500 text-sm font-bold">✕</span>
                </div>
                <div>
                  <h3 className="text-slate-900 font-semibold text-lg">{p.title}</h3>
                  <p className="text-slate-600 text-sm mt-1 leading-relaxed">{p.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-orange-500/5 to-cyan-500/5 blur-3xl rounded-full" />
          <div className="relative bg-white border border-slate-100 p-8 rounded-3xl shadow-xl shadow-slate-200/50">
            <h3 className="text-2xl font-bold text-slate-900 mb-6">
              La solución mtriq<span className="text-orange-500">.app</span>
            </h3>
            <ul className="space-y-4">
              {SOLUTIONS.map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700 text-sm">
                  <ShieldCheck className="w-5 h-5 text-orange-500 shrink-0" />
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
