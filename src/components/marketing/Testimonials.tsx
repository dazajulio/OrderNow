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
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Restaurantes que ya escalaron</h2>
          <p className="text-zinc-400 text-lg">No lo decimos nosotros, lo dicen los tickets cerrados cada noche.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-8 flex flex-col">
              <div className="flex gap-1 mb-5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#FF6B00] text-[#FF6B00]" />
                ))}
              </div>
              <p className="text-zinc-300 mb-6 flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="text-white font-semibold">{t.name}</p>
                <p className="text-zinc-500 text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
