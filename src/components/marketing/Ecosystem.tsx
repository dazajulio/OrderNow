import { Bot, LineChart, QrCode, Smartphone, Zap } from 'lucide-react';

export function Ecosystem() {
  return (
    <section id="ecosistema" className="py-24 relative overflow-hidden bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">El Ecosistema Definitivo</h2>
          <p className="text-slate-600 text-lg">
            Diseñado modularmente para adaptarse desde un local casual hasta una cadena de fast food en rápida expansión.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-slate-100/60 transition-all duration-300 group shadow-sm shadow-slate-100/40">
            <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-7 h-7 text-orange-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Menú QR &amp; NFC</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Experiencia de pedido nativa en el móvil del cliente sin descargar apps. Upsell integrado y fricción cero.</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-slate-100/60 transition-all duration-300 group shadow-sm shadow-slate-100/40">
            <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Smartphone className="w-7 h-7 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">KDS Inteligente</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Kitchen Display System en tiempo real. Elimina los tickets de papel y optimiza los tiempos de preparación.</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-slate-100/60 transition-all duration-300 group shadow-sm shadow-slate-100/40">
            <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Bot className="w-7 h-7 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Motor de IA</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Recomendaciones personalizadas basadas en el historial del cliente y predicción de demanda para inventarios.</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-slate-100/60 transition-all duration-300 group shadow-sm shadow-slate-100/40">
            <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <LineChart className="w-7 h-7 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Analítica y CRM</h3>
            <p className="text-slate-600 text-sm leading-relaxed">Conoce a tus clientes, sus platos favoritos y su frecuencia. Construye campañas de retención automáticas.</p>
          </div>

          <div className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:bg-slate-100/60 transition-all duration-300 group md:col-span-2 lg:col-span-2 relative overflow-hidden shadow-sm shadow-slate-100/40">
            <div className="absolute right-0 bottom-0 opacity-5">
              <Zap className="w-64 h-64 text-blue-500 -mr-10 -mb-10" />
            </div>
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Arquitectura Serverless</h3>
              <p className="text-slate-600 text-sm leading-relaxed max-w-md">
                Infraestructura alojada en Vercel &amp; Supabase, capaz de escalar para soportar ráfagas de miles de pedidos por segundo sin latencia.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
