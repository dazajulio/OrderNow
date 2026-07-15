import Link from 'next/link';
import { ArrowRight, Flame, QrCode, Timer, TrendingUp, Wifi } from 'lucide-react';
import { ParallaxOrbs } from './ParallaxOrbs';

export function Hero() {
  return (
    <section className="relative pt-40 pb-24 md:pt-52 md:pb-36 overflow-hidden bg-white">
      <ParallaxOrbs />

      {/* Grid sutil de fondo (patrón de puntos de cuadrícula clara) */}
      <div
        className="absolute inset-0 opacity-[0.4] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#E2E8F0 1.5px, transparent 1.5px)',
          backgroundSize: '32px 32px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, black 60%, transparent 100%)',
        }}
        aria-hidden="true"
      />

      <div className="relative max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.1fr_0.9fr] gap-16 items-center">
        {/* ── COLUMNA IZQUIERDA: COPY ── */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 border border-slate-200/50 text-sm font-medium text-slate-700 mb-8 animate-fade-in-up">
            <Flame className="w-3.5 h-3.5 text-orange-500 fill-orange-500/20" />
            Hecho para Fast Food &amp; Casual Dining
          </div>

          <h1
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight mb-7 leading-[1.05] animate-fade-in-up"
            style={{ animationDelay: '80ms' }}
          >
            Opera tu restaurante como una cadena.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
              Escala con inteligencia.
            </span>
          </h1>

          <p
            className="max-w-xl mx-auto lg:mx-0 text-lg md:text-xl text-slate-600 mb-10 leading-relaxed animate-fade-in-up"
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
              <button className="group flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full px-8 w-full sm:w-auto h-14 text-lg transition-all shadow-lg shadow-orange-500/20 active:scale-[0.98]">
                Prueba Gratis 14 Días
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
            </a>
            <Link href="/burger-palace" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <button className="w-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-full px-8 h-14 text-lg transition-colors shadow-sm active:scale-[0.98]">
                Ver Demo en Vivo
              </button>
            </Link>
          </div>

          {/* Trust strip */}
          <div
            className="animate-fade-in-up"
            style={{ animationDelay: '320ms' }}
          >
            <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-3">
              Restaurantes que ya operan sin fricción
            </p>
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-slate-400 font-bold text-sm grayscale opacity-60 hover:opacity-100 transition-all duration-300">
              <span>BURGER PALACE</span>
              <span>TACO FIERA</span>
              <span>POLLO REAL</span>
              <span>PASTA LAB</span>
              <span className="hidden sm:inline text-slate-400/80 font-normal">+500 más</span>
            </div>
          </div>
        </div>

        {/* ── COLUMNA DERECHA: MOCKUP DEL PRODUCTO ── */}
        <div className="relative hidden lg:block h-[520px] animate-fade-in-up" style={{ animationDelay: '200ms' }}>
          {/* Ticket KDS flotante */}
          <div className="absolute top-0 right-4 w-72 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200/80 p-5 rotate-[4deg] hover:rotate-0 transition-all duration-500">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold text-orange-500 uppercase tracking-wider">Mesa 07</span>
              <span className="flex items-center gap-1 text-xs text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <Timer className="w-3.5 h-3.5" /> 02:14
              </span>
            </div>
            <div className="space-y-2">
              {['2x Burger Master', '1x Papas Trufadas', '1x Limonada Rosa'].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-4 w-full bg-orange-50 text-orange-600 text-xs font-bold rounded-lg py-2 border border-orange-200 hover:bg-orange-100 transition-colors text-center">
              MARCAR LISTO
            </div>
          </div>

          {/* Mockup teléfono - Menú QR */}
          <div className="absolute bottom-0 left-2 w-56 rounded-[2rem] bg-slate-900 border-4 border-slate-800 shadow-2xl p-3 -rotate-[6deg] hover:rotate-0 transition-transform duration-500">
            <div className="rounded-[1.4rem] overflow-hidden bg-slate-50 p-4 h-80 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <QrCode className="w-4 h-4 text-orange-500" />
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider font-semibold">Menú Digital</span>
                </div>
                <div className="space-y-2">
                  {[
                    { name: 'Burger Master', price: '$12.99' },
                    { name: 'Chicken Crispy', price: '$9.50' },
                    { name: 'Papas Trufadas', price: '$5.99' },
                  ].map((p) => (
                    <div key={p.name} className="flex items-center justify-between rounded-xl bg-white border border-slate-100 px-3 py-2 shadow-sm">
                      <span className="text-[10px] text-slate-800 font-medium truncate max-w-[90px]">{p.name}</span>
                      <span className="text-[10px] text-orange-500 font-bold">{p.price}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold rounded-xl py-2.5 shadow-md shadow-orange-500/10 text-center cursor-pointer">
                Agregar al pedido
              </div>
            </div>
          </div>

          {/* Badge IA flotante */}
          <div className="absolute top-40 left-0 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200 p-4 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-50 flex items-center justify-center shrink-0">
              <TrendingUp className="w-4 h-4 text-orange-500" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-800 leading-tight">+23% ticket prom.</p>
              <p className="text-[10px] text-slate-400">Upsell con IA</p>
            </div>
          </div>

          {/* Badge tiempo real */}
          <div className="absolute bottom-24 right-0 rounded-2xl bg-white border border-slate-100 shadow-xl shadow-slate-200 px-4 py-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-semibold text-slate-600">Sincronizado en tiempo real</span>
          </div>
        </div>
      </div>
    </section>
  );
}
