import Link from 'next/link';
import { ArrowRight, Bot, Cpu, LineChart, QrCode, ShieldCheck, Smartphone, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-zinc-300 font-sans selection:bg-cyan-500/30">
      
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 inset-x-0 z-50 border-b border-white/5 bg-[#0A0A0B]/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold tracking-tight text-white">mtriq<span className="text-cyan-400">.app</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#ecosistema" className="hover:text-cyan-400 transition-colors">Ecosistema</a>
            <a href="#pricing" className="hover:text-cyan-400 transition-colors">Precios</a>
            <Link href="/admin" className="text-zinc-500 hover:text-white transition-colors">Login Admin</Link>
          </div>
          <Link href="#registro">
            <Button className="bg-cyan-500 hover:bg-cyan-400 text-black font-semibold rounded-full px-6">
              Empezar Ahora
            </Button>
          </Link>
        </div>
      </nav>

      {/* ── HERO SECTION ── */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/20 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="relative max-w-7xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-cyan-400 mb-8 animate-fade-in-up">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-pulse"></span>
            El sistema operativo para restaurantes de la nueva era
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 leading-[1.1] animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            Escala tu restaurante con <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              Inteligencia Artificial
            </span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-zinc-400 mb-10 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
            Mtriq.app centraliza tu Menú Digital, Pedidos QR/NFC, Kitchen Display System (KDS) y CRM en un ecosistema impulsado por datos. Todo bajo control, en tiempo real.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
            <Button size="lg" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-full px-8 w-full sm:w-auto h-14 text-lg">
              Prueba Gratis
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/10 text-white hover:bg-white/5 rounded-full px-8 w-full sm:w-auto h-14 text-lg">
              Ver Demo
            </Button>
          </div>
        </div>
      </section>

      {/* ── PROBLEMA / SOLUCIÓN ── */}
      <section className="py-24 bg-black border-y border-white/5 relative">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Por qué los restaurantes tradicionales fallan al escalar</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-xl font-bold">X</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Sistemas desconectados</h3>
                  <p className="text-zinc-500">Un software para caja, otro para pedidos, otro para inventario. El caos operativo destruye tus márgenes.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center shrink-0">
                  <span className="text-red-500 text-xl font-bold">X</span>
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">Cero conocimiento del cliente</h3>
                  <p className="text-zinc-500">No sabes quiénes compran, con qué frecuencia ni cómo hacer que vuelvan de manera automatizada.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 blur-3xl rounded-full" />
            <div className="relative bg-zinc-900/50 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
              <h3 className="text-2xl font-bold text-white mb-6">La Solución mtriq<span className="text-cyan-400">.app</span></h3>
              <ul className="space-y-4">
                {[
                  "Todo integrado en un solo ecosistema Cloud.",
                  "Flujo sin fricción: desde la mesa hasta la cocina.",
                  "Analítica avanzada para la toma de decisiones.",
                  "Optimización de up-selling mediante Inteligencia Artificial."
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── EL ECOSISTEMA ── */}
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
              <div className="w-14 h-14 bg-cyan-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <QrCode className="w-7 h-7 text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Menú QR & NFC</h3>
              <p className="text-zinc-500">Experiencia de pedido nativa en el móvil del cliente sin descargar apps. Upsell integrado y fricción cero.</p>
            </div>
            
            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
              <div className="w-14 h-14 bg-purple-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Smartphone className="w-7 h-7 text-purple-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">KDS Inteligente</h3>
              <p className="text-zinc-500">Kitchen Display System en tiempo real. Elimina los tickets de papel y optimiza los tiempos de preparación.</p>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
              <div className="w-14 h-14 bg-blue-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Bot className="w-7 h-7 text-blue-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Motor de IA</h3>
              <p className="text-zinc-500">Recomendaciones personalizadas basadas en el historial del cliente y predicción de demanda para inventarios.</p>
            </div>

            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <LineChart className="w-7 h-7 text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Analítica y CRM</h3>
              <p className="text-zinc-500">Conoce a tus clientes, sus platos favoritos y su frecuencia. Construye campañas de retención automáticas.</p>
            </div>
            
            <div className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl hover:bg-zinc-900/80 transition-colors group md:col-span-2 lg:col-span-2 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                <Zap className="w-64 h-64 text-cyan-400 -mr-10 -mb-10" />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-bold text-white mb-4">Arquitectura Serverless</h3>
                <p className="text-zinc-400 max-w-md">
                  Infraestructura alojada en Vercel & Supabase, capaz de escalar para soportar ráfagas de miles de pedidos por segundo sin latencia.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24 bg-black border-y border-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple y Transparente</h2>
            <p className="text-zinc-400 text-lg">Un único plan con todo incluido para hacer escalar tu operación.</p>
          </div>

          <div className="relative group mx-auto max-w-lg">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
            <div className="relative bg-zinc-900 border border-white/10 rounded-3xl p-8 md:p-12 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">Plan Pro</h3>
              <div className="flex items-center justify-center gap-1 mb-8">
                <span className="text-3xl text-zinc-500">$</span>
                <span className="text-6xl font-extrabold text-white">29</span>
                <span className="text-zinc-500 mt-4">/mes</span>
              </div>
              
              <ul className="space-y-4 mb-10 text-left">
                {[
                  "Kiosko Menú Digital + QR ilimitados",
                  "Kitchen Display System (KDS)",
                  "Panel Administrativo Multi-Sucursal",
                  "CRM Básico y Base de datos de clientes",
                  "Soporte prioritario 24/7",
                  "Sin comisiones ocultas por venta"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <Button className="w-full bg-white hover:bg-zinc-200 text-black font-bold h-14 rounded-xl text-lg">
                Comenzar Prueba Gratuita
              </Button>
              <p className="text-sm text-zinc-600 mt-4">Cancela en cualquier momento. Sin tarjeta de crédito inicial.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0A0A0B] py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Cpu className="w-6 h-6 text-cyan-400" />
            <span className="text-xl font-bold tracking-tight text-white">mtriq<span className="text-cyan-400">.app</span></span>
          </div>
          <p className="text-zinc-600 text-sm">
            © {new Date().getFullYear()} Metriq App. Todos los derechos reservados.
          </p>
          <div className="flex gap-6 text-sm text-zinc-500">
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Contacto</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
