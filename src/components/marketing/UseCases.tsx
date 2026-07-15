import { Clock, Sparkles, Users, Zap } from 'lucide-react';

export function UseCases() {
  return (
    <section id="casos" className="py-24 bg-black border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Un sistema, dos velocidades</h2>
          <p className="text-zinc-400 text-lg">
            Mtriq.app se adapta al ritmo real de tu operación — sin importar si vendes en 90 segundos o en 90 minutos.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* FAST FOOD */}
          <div className="relative rounded-3xl border border-[#FF6B00]/20 bg-gradient-to-b from-[#FF6B00]/[0.08] to-transparent p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#FF6B00]/15 flex items-center justify-center">
                <Zap className="w-6 h-6 text-[#FF6B00]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Fast Food</h3>
            </div>
            <p className="text-zinc-400 mb-8">
              Alta rotación, decisiones en segundos. Cada fricción de más es una fila de más.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>KDS con tiempos de preparación en vivo y alertas de tickets demorados.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Zap className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Pedido y pago en el mismo flujo QR — sin esperar a un mesero.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Sparkles className="w-5 h-5 text-[#FF6B00] shrink-0 mt-0.5" />
                <span>Upsell automático de combos e IA en el momento exacto del pedido.</span>
              </li>
            </ul>
          </div>

          {/* CASUAL DINING */}
          <div className="relative rounded-3xl border border-[#2FA8FF]/20 bg-gradient-to-b from-[#2FA8FF]/[0.08] to-transparent p-8 md:p-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#2FA8FF]/15 flex items-center justify-center">
                <Users className="w-6 h-6 text-[#2FA8FF]" />
              </div>
              <h3 className="text-2xl font-bold text-white">Casual Dining</h3>
            </div>
            <p className="text-zinc-400 mb-8">
              Experiencia y ticket promedio. La tecnología trabaja detrás de escena, no en la mesa.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-300">
                <Users className="w-5 h-5 text-[#2FA8FF] shrink-0 mt-0.5" />
                <span>Gestión de mesas y llamados de mesero en tiempo real desde el kiosko.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Sparkles className="w-5 h-5 text-[#2FA8FF] shrink-0 mt-0.5" />
                <span>CRM con historial de visitas para reconocer a tus clientes frecuentes.</span>
              </li>
              <li className="flex items-start gap-3 text-zinc-300">
                <Clock className="w-5 h-5 text-[#2FA8FF] shrink-0 mt-0.5" />
                <span>Reportes de rotación de mesas y horas pico para ajustar tu staffing.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
