import { Bot, LineChart, QrCode, Smartphone, Zap } from 'lucide-react';

export function Ecosystem() {
  return (
    <section id="ecosistema" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">El Ecosistema Definitivo</h2>
          <p className="text-zinc-400 text-lg">
            Diseñado modularmente para adaptarse desde un local casual hasta una cadena de fast food en rápida expansión.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
            <div className="w-14 h-14 bg-[#FF6B00]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-7 h-7 text-[#FF6B00]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Menú QR &amp; NFC</h3>
            <p className="text-zinc-500">Experiencia de pedido nativa en el móvil del cliente sin descargar apps. Upsell integrado y fricción cero.</p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
            <div className="w-14 h-14 bg-[#2FA8FF]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-7 h-7 text-[#2FA8FF]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">KDS Inteligente</h3>
            <p className="text-zinc-500">Kitchen Display System en tiempo real. Elimina los tickets de papel y optimiza los tiempos de preparación.</p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
            <div className="w-14 h-14 bg-[#FF3D71]/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-7 h-7 text-[#FF3D71]" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Motor de IA</h3>
            <p className="text-zinc-500">Recomendaciones personalizadas basadas en el historial del cliente y predicción de demanda para inventarios.</p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-xl font-bold text-white mb-3">Analítica y CRM</h3>
            <p className="text-zinc-500">Conoce a tus clientes, sus platos favoritos y su frecuencia. Construye campañas de retención automáticas.</p>
          </div>

          <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group md:col-span-2 lg:col-span-2 relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10">
              <Zap className="w-64 h-64 text-[#2FA8FF] -mr-10 -mb-10" />
            </div>
            <div className="relative z-10">
              <h3 className="text-3xl font-bold text-white mb-4">Arquitectura Serverless</h3>
              <p className="text-zinc-400 max-w-md">
                Infraestructura alojada en Vercel &amp; Supabase, capaz de escalar para soportar ráfagas de miles de pedidos por segundo sin latencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
