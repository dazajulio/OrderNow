'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { CheckCircle2, Loader2, Sparkles, ChefHat, UtensilsCrossed, QrCode } from 'lucide-react';
import { Suspense } from 'react';

function SuccessContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [slug, setSlug] = useState<string | null>(null);

  useEffect(() => {
    // Intentar obtener de URL primero
    const urlSlug = searchParams.get('slug');
    if (urlSlug) {
      setSlug(urlSlug);
      localStorage.removeItem('mtriq_pending_slug');
    } else {
      // Fallback: buscar en localStorage
      const localSlug = localStorage.getItem('mtriq_pending_slug');
      if (localSlug) {
        setSlug(localSlug);
        localStorage.removeItem('mtriq_pending_slug');
      }
    }
  }, [searchParams]);

  const [phase, setPhase] = useState<'activating' | 'ready'>('activating');
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!slug) return;

    // Fase 1: Esperar que el webhook active la cuenta (3 segundos)
    const activationTimer = setTimeout(() => {
      setPhase('ready');
    }, 3000);

    return () => clearTimeout(activationTimer);
  }, [slug]);

  useEffect(() => {
    if (phase !== 'ready' || !slug) return;

    // Fase 2: Countdown de 5 segundos antes del redirect automático
    if (countdown <= 0) {
      router.push(`/${slug}/welcome`);
      return;
    }

    const countdownTimer = setTimeout(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(countdownTimer);
  }, [phase, countdown, slug, router]);

  const steps = [
    { icon: ChefHat, label: 'Cuenta de restaurante creada', done: true },
    { icon: UtensilsCrossed, label: 'Ecosistema operativo inicializado', done: true },
    { icon: QrCode, label: 'Panel de gestión configurado', done: true },
    { icon: Sparkles, label: 'Licencia mensual activada', done: phase === 'ready' },
  ];

  if (!slug) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-slate-400 text-sm">
            Link inválido. Si acabas de pagar, revisa tu correo para acceder a tu cuenta.
          </p>
          <a
            href="/register"
            className="inline-block text-orange-500 hover:underline text-sm font-semibold"
          >
            ← Volver al inicio
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 relative overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-purple-500/5 rounded-full blur-[80px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-10">
          <span className="text-2xl font-black tracking-tight text-white">
            mtriq<span className="text-orange-500">.app</span>
          </span>
        </div>

        {/* Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl shadow-black/40">

          {/* Estado: Activando */}
          {phase === 'activating' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-orange-500/10 border border-orange-500/20 flex items-center justify-center mx-auto">
                <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-white">Activando tu restaurante...</h1>
                <p className="text-slate-400 text-sm">
                  Estamos configurando tu ecosistema operativo. Esto tarda solo unos segundos.
                </p>
              </div>
            </div>
          )}

          {/* Estado: Listo */}
          {phase === 'ready' && (
            <div className="text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-emerald-400" />
              </div>
              <div className="space-y-2">
                <h1 className="text-2xl font-black text-white">¡Todo listo! 🚀</h1>
                <p className="text-slate-400 text-sm">
                  Tu restaurante está activo. Te llevamos a tu dashboard en{' '}
                  <span className="text-orange-500 font-bold">{countdown}s</span>
                </p>
              </div>

              <button
                onClick={() => router.push(`/${slug}/welcome`)}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-12 text-sm transition-all shadow-[0_4px_20px_rgba(249,115,22,0.25)] active:scale-[0.99]"
              >
                Ir a mi Dashboard ahora →
              </button>
            </div>
          )}

          {/* Checklist de pasos */}
          <div className="mt-8 pt-6 border-t border-slate-800 space-y-3">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all duration-500 ${
                    step.done
                      ? 'bg-emerald-500/10 border border-emerald-500/20'
                      : 'bg-slate-800 border border-slate-700'
                  }`}>
                    {step.done ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Icon className="w-4 h-4 text-slate-500" />
                    )}
                  </div>
                  <span className={`text-sm font-medium transition-all duration-500 ${
                    step.done ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-slate-600 mt-6">
          ¿Algo salió mal?{' '}
          <a href="mailto:soporte@mtriq.app" className="text-slate-400 hover:text-orange-500 transition-colors">
            soporte@mtriq.app
          </a>
        </p>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-slate-950 flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-orange-500 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
