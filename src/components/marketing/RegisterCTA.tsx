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
    <section id="registro" className="py-24 relative overflow-hidden bg-white">
      <div
        className="absolute inset-0 bg-gradient-to-b from-orange-500/[0.02] via-transparent to-transparent pointer-events-none"
        aria-hidden="true"
      />
      <div className="relative max-w-2xl mx-auto px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 tracking-tight mb-6">Empieza tu Prueba Gratuita</h2>
          <p className="text-slate-600 text-lg">
            14 días sin costo. Nuestro equipo configura tu menú inicial y te contacta para el onboarding.
          </p>
        </div>

        {status === 'success' ? (
          <div className="flex flex-col items-center text-center gap-4 bg-emerald-50/50 border border-emerald-100 rounded-3xl p-10 shadow-sm shadow-emerald-50/20">
            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            <h3 className="text-xl font-bold text-slate-900">¡Solicitud recibida!</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              En menos de 24 horas un especialista de onboarding se pondrá en contacto contigo para activar tu cuenta.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-10 space-y-5 shadow-sm shadow-slate-100/50"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="restaurantName" className="block text-sm font-medium text-slate-600 mb-2">
                  Nombre del restaurante
                </label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  required
                  placeholder="Ej: Tu Restaurante"
                  className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="contactName" className="block text-sm font-medium text-slate-600 mb-2">
                  Tu nombre
                </label>
                <input
                  id="contactName"
                  name="contactName"
                  required
                  placeholder="Ej: Tu Nombre Completo"
                  className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-600 mb-2">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="tu@restaurante.com"
                  className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-slate-600 mb-2">
                  Teléfono <span className="text-slate-400">(opcional)</span>
                </label>
                <input
                  id="phone"
                  name="phone"
                  placeholder="+1 555 123 4567"
                  className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-slate-600 mb-2">
                Tipo de negocio
              </label>
              <select
                id="businessType"
                name="businessType"
                defaultValue="fast_food"
                className="w-full rounded-xl bg-white border border-slate-200 px-4 py-3 text-slate-800 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
              >
                <option value="fast_food">Fast Food</option>
                <option value="casual_dining">Casual Dining</option>
                <option value="other">Otro</option>
              </select>
            </div>

            {status === 'error' && (
              <p className="text-red-500 text-xs font-semibold">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold rounded-xl h-14 text-lg transition-all shadow-md shadow-orange-500/20 active:scale-[0.98]"
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
            <p className="text-center text-xs text-slate-400 mt-2">
              Sin tarjeta de crédito inicial. Cancela cuando quieras.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
