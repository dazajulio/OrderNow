import Link from 'next/link';
import { ArrowRight, Flame, QrCode, Timer, TrendingUp, Wifi } from 'lucide-react';
import { ParallaxOrbs } from './ParallaxOrbs';

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-36 overflow-hidden">
      <ParallaxOrbs />

      {/* Grid técnico de fondo */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 40%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* ── COLUMNA IZQUIERDA: COPY ── */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-orange-400 mb-8 animate-fade-in-up">
            <Flame className="w-3.5 h-3.5" />
            Hecho para Fast Food &amp; Casual Dining
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-7 leading-[1.05] animate-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            La infraestructura digital
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF8A3D] via-[#FF6B00] to-[#FF3D71]">
              para escalar tu restaurante
            </span>
          </h1>

          <p
            className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-zinc-400 mb-10 animate-fade-in-up"
            style={{ animationDelay: '160ms' }}
          >
            Mtriq.app une Menú Digital, Pedidos QR/NFC, Kitchen Display System, CRM
            y Analítica con IA en un solo ecosistema. De la mesa a la cocina en
            segundos — para que tu restaurante opere como una cadena, aunque tengas un solo local.
          </p>

          <div
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 mb-12 animate-fade-in-up"
            style={{ animationDelay: '240ms' }}
          >
            <a href="#registro" className="w-full sm:w-auto">
              <button className="group flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:brightness-110 text-white font-bold rounded-full px-8 w-full sm:w-auto h-14 text-lg transition-all shadow-xl shadow-orange-500/25">
                Prueba Gratis 14 Días
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </a>
            <Link href="/burger-palace" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button className="w-full border border-white/15 text-white hover:bg-white/5 rounded-full px-8 h-14 text-lg transition-colors">
                Ver Demo en Vivo
              </button>
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '320ms' }}
          >
            <p className="text-xs uppercase tracking-widest text-zinc-600 mb-3">
              Restaurantes que ya operan sin fricción
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-zinc-500 font-bold text-sm">
              <span>BURGER PALACE</span>
              <span>TACO FIERA</span>
              <span>POLLO REAL</span>
              <span>PASTA LAB</span>
              <span className="hidden sm:inline">+500 más</span>
            </div>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: MOCKUP DEL PRODUCTO ── */}
        <div className="relative hidden lg:block h-[520px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Ticket KDS flotante */}
          <div className="absolute top-0 right-4 w-72 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-sm p-5 rotate-[4deg] hover:rotate-0 transition-transform duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-orange-400 uppercase tracking-wider">Mesa 07</span>
              <span className="flex items-center gap-1 text-xs text-emerald-400">
                <Timer className="w-3.5 h-3.5" /> 02:14
              </span>
            </div>
            <div className="space-y-2">
              {['2x Burger Master', '1x Papas Trufadas', '1x Limonada Rosa'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-zinc-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <button className="mt-4 w-full bg-orange-500/10 text-orange-400 text-xs font-bold rounded-lg py-2 border border-orange-500/20">
              MARCAR LISTO
            </button>
          </div>

          {/* Mockup teléfono - Menú QR */}
          <div className="absolute bottom-0 left-2 w-56 rounded-[2rem] bg-zinc-900 border-4 border-zinc-800 shadow-2xl p-3 -rotate-[6deg] hover:rotate-0 transition-transform duration-500">
            <div className="rounded-[1.4rem] overflow-hidden bg-gradient-to-b from-zinc-950 to-black p-4 h-80">
              <div className="flex items-center gap-2 mb-4">
                <QrCode className="w-4 h-4 text-[#2FA8FF]" />
                <span className="text-[10px] text-zinc-500 uppercase tracking-wider">Menú Digital</span>
              </div>
              <div className="space-y-3">
                {[
                  { name: 'Burger Master', price: '$12.99' },
                  { name: 'Chicken Crispy', price: '$9.50' },
                  { name: 'Papas Trufadas', price: '$5.99' },
                ].map((p) => (
                  <div key={p.name} className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2.5">
                    <span className="text-xs text-zinc-200 font-medium">{p.name}</span>
                    <span className="text-xs text-orange-400 font-bold">{p.price}</span>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full bg-[#FF6B00] text-white text-xs font-bold rounded-xl py-2.5">
                Agregar al pedido
              </button>
            </div>
          </div>

          {/* Badge IA flotante */}
          <div className="absolute top-40 left-0 rounded-2xl bg-zinc-900/90 border border-[#2FA8FF]/20 shadow-2xl backdrop-blur-sm px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#2FA8FF]/10 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-[#2FA8FF]" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">+23% ticket promedio</p>
              <p className="text-[10px] text-zinc-500">Upsell con IA</p>
            </div>
          </div>

          {/* Badge tiempo real */}
          <div className="absolute bottom-24 right-0 rounded-2xl bg-zinc-900/90 border border-white/10 shadow-2xl backdrop-blur-sm px-4 py-3 flex items-center gap-2">
            <Wifi className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-semibold text-zinc-300">Sincronizado en tiempo real</span>
          </div>
        </div>
      </div>
    </section>
  );
}
