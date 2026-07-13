'use client';

import { t } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Banknote, Loader2 } from 'lucide-react';

interface CheckoutFormProps {
  total: number;
  currency: string;
  onPayWithCard: () => void;
  onPayAtCounter: () => void;
  onPayWithTerminal: () => void;
  isProcessing: boolean;
  paymentMethod: 'stripe' | 'cash' | 'terminal' | null;
}

import { useEffect } from 'react';

export function CheckoutForm({
  total,
  currency,
  onPayWithCard,
  onPayAtCounter,
  onPayWithTerminal,
  isProcessing,
  paymentMethod
}: CheckoutFormProps) {
  
  useEffect(() => {
    if (paymentMethod === 'cash' || paymentMethod === 'terminal') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [paymentMethod]);

  if (paymentMethod === 'stripe') {
    return (
      <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in p-6 bg-zinc-900 rounded-3xl border border-zinc-800">
        <div className="text-center space-y-2 mb-8">
          <CreditCard className="w-12 h-12 text-zinc-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">Pago Seguro</h3>
          <p className="text-zinc-400">Total a pagar: {formatPrice(total, currency)}</p>
        </div>
        
        {/* Placeholder for Stripe Elements */}
        <div className="w-full h-48 bg-zinc-950 rounded-xl border border-zinc-800 flex items-center justify-center p-4 text-center">
          <p className="text-zinc-500 text-sm">
            [Stripe Elements Form load placeholder] <br/>
            (Requires Elements provider wrap in real implementation)
          </p>
        </div>

        <button
          disabled={isProcessing}
          className="w-full brand-bg hover:brightness-110 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex justify-center items-center gap-2"
        >
          {isProcessing ? <Loader2 className="w-5 h-5 animate-spin" /> : `Pagar ${formatPrice(total, currency)}`}
        </button>
      </div>
    );
  }

  if (paymentMethod === 'cash' || paymentMethod === 'terminal') {
    return (
      <div className="w-full max-w-md mx-auto text-center space-y-6 animate-fade-in p-8 bg-zinc-900 rounded-3xl border border-zinc-800">
        <div className="w-20 h-20 brand-bg rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20">
          {paymentMethod === 'cash' ? <Banknote className="w-10 h-10 text-white" /> : <CreditCard className="w-10 h-10 text-white" />}
        </div>
        <h3 className="text-2xl font-bold text-white">¡Pedido Confirmado!</h3>
        <p className="text-zinc-400 text-lg">
          {paymentMethod === 'cash' 
            ? 'Tu orden ha sido enviada a la cocina. Paga en caja.' 
            : 'Tu orden ha sido enviada a la cocina. El mesero traerá la terminal.'}
        </p>
        <div className="p-4 bg-zinc-950 rounded-xl border border-zinc-800 inline-block w-full">
          <p className="text-zinc-300">Total a pagar:</p>
          <p className="text-3xl font-bold brand-text mt-1">{formatPrice(total, currency)}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      <div className="p-6 bg-zinc-900/50 rounded-2xl border border-zinc-800/50 flex justify-between items-center">
        <span className="text-zinc-400 text-lg">Total del Pedido</span>
        <span className="text-2xl font-bold text-white">{formatPrice(total, currency)}</span>
      </div>

      <div className="space-y-4 pt-4">
        <button
          onClick={onPayWithCard}
          disabled={isProcessing}
          className="w-full brand-bg hover:brightness-110 text-white font-bold text-lg py-5 px-6 rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-between group"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6" />
            <span>{t('payWithCard')}</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
            &rarr;
          </div>
        </button>

        <button
          onClick={onPayWithTerminal}
          disabled={isProcessing}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg py-5 px-6 rounded-2xl border border-zinc-800 active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <CreditCard className="w-6 h-6 text-orange-400" />
            <span>Terminal en mesa</span>
          </div>
        </button>

        <button
          onClick={onPayAtCounter}
          disabled={isProcessing}
          className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-bold text-lg py-5 px-6 rounded-2xl border border-zinc-800 active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <Banknote className="w-6 h-6 text-zinc-400" />
            <span>{t('payAtCounter')}</span>
          </div>
        </button>
      </div>
    </div>
  );
}
