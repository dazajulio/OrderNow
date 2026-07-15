'use client';

import { CheckCircle2, Loader2 } from 'lucide-react';
import { useState } from 'react';

export function RegisterCTA() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    const form = new FormData(e.currentTarget);
    const payload = {
      restaurantName: form.get('restaurantName'),
      contactName: form.get('contactName'),
      email: form.get('email'),
      phone: form.get('phone'),
      businessType: form.get('businessType'),
    };

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.error || 'Algo salió mal.');
      setStatus('success');
    } catch (err: any) {
      setStatus('error');
      setErrorMsg(err.message || 'No pudimos enviar tu solicitud. Intenta de nuevo.');
    }
  }

  return (
    <section id="registro" className="py-24 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-gradient-to-b from-[#FF6B00]/10 via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Empieza tu Prueba Gratuita</h2>
          <p className="text-zinc-400 text-lg">
            14 días sin costo. Nuestro equipo configura tu menú inicial y te contacta para el onboarding.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center gap-4 bg-zinc-900/60 border border-emerald-500/20 rounded-3xl p-10">
            <CheckCircle2 className="w-12 h-12 text-emerald-400" />
            <h3 className="text-xl font-bold text-white">¡Solicitud recibida!</h3>
            <p className="text-zinc-400">
              En menos de 24 horas un especialista de onboarding se pondrá en contacto contigo para activar tu cuenta.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-zinc-900/60 border border-white/10 rounded-3xl p-6 md:p-10 space-y-5 backdrop-blur-sm"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-zinc-400 mb-2">
                  Nombre del restaurante
                </label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  required
                  placeholder="Burger Palace"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-zinc-400 mb-2">
                  Tu nombre
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  placeholder="Julio Daza"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-zinc-400 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@restaurante.com"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-zinc-400 mb-2">
                  Teléfono <span className="text-zinc-600">(opcional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="+1 555 123 4567"
                  className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-zinc-400 mb-2">
                Tipo de negocio
              </label>
              <select
                id="businessType"
                name="businessType"
                defaultValue="fast_food"
                className="w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#FF6B00] transition-colors"
              >
                <option value="fast_food">Fast Food</option>
                <option value="casual_dining">Casual Dining</option>
                <option value="other">Otro</option>
              </select>
            </div>

            {status === 'error' && (
              <p className="text-red-400 text-sm">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:brightness-110 disabled:opacity-60 text-white font-bold rounded-xl h-14 text-lg transition-all shadow-xl shadow-orange-500/20"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Comenzar Prueba Gratuita'
              )}
            </button>
            <p className="text-center text-xs text-zinc-600">
              Sin tarjeta de crédito inicial. Cancela cuando quieras.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
