import { Star } from 'lucide-react';

const TESTIMONIALS = [
  {
    quote:
      'Redujimos los errores de comanda casi a cero desde que el mesero ya no transcribe nada a mano. El KDS solo se lee y se marca.',
    name: 'Marcos Iturria',
    role: 'Dueño · Taco Fiera',
  },
  {
    quote:
      'El upsell con IA solo en el primer mes ya se pagó la suscripción. Nuestro ticket promedio subió sin que el mesero tuviera que ofrecer nada.',
    name: 'Daniela Roca',
    role: 'Gerente General · Pollo Real',
  },
  {
    quote:
      'Migramos 6 locales en una semana. El slug por restaurante hizo que cada sucursal tuviera su propio menú sin tocar una línea de código.',
    name: 'Federico Salas',
    role: 'Director de Operaciones · Pasta Lab',
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Restaurantes que ya escalaron</h2>
          <p className="text-slate-600 text-lg">No lo decimos nosotros, lo dicen los tickets cerrados cada noche.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-slate-50 border border-slate-100 rounded-3xl p-8 flex flex-col shadow-sm shadow-slate-100/30">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <p className="text-slate-700 text-sm mb-6 flex-1 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-slate-900 font-semibold">{t.name}</p>
                <p className="text-slate-500 text-xs mt-0.5">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
