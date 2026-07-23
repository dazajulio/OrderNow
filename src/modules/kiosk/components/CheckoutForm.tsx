'use client';

import { t } from '@/lib/i18n';
import { formatPrice } from '@/lib/utils';
import { CreditCard, Banknote, Loader2 } from 'lucide-react';

interface PaymentMethodItem {
  id: string;
  title: string;
  details: string;
  logoUrl: string;
}

interface CheckoutFormProps {
  total: number;
  currency: string;
  onSelectPayment: (method: PaymentMethodItem | { id: string; title: string; details: string; logoUrl: string }, verificationNotes?: string) => void;
  isProcessing: boolean;
  paymentMethod: any | null; // Selected method object
  paymentMethods: PaymentMethodItem[];
  isWaiter?: boolean;
  tables?: any[];
  selectedTableId?: string;
  onTableChange?: (tableId: string) => void;
}

import { useEffect, useState } from 'react';

export function CheckoutForm({
  total,
  currency,
  onSelectPayment,
  isProcessing,
  paymentMethod,
  paymentMethods = [],
  isWaiter = false,
  tables = [],
  selectedTableId = '',
  onTableChange
}: CheckoutFormProps) {
  const [verificationMethod, setVerificationMethod] = useState<any | null>(null);
  const [bcvRate, setBcvRate] = useState<number>(0);
  const [isFetchingRate, setIsFetchingRate] = useState(false);
  const [pmReference, setPmReference] = useState('');
  const [pmAmount, setPmAmount] = useState('');
  const [pmDate, setPmDate] = useState('');
  const [pmBank, setPmBank] = useState('');
  const [pmCedula, setPmCedula] = useState('');
  
  useEffect(() => {
    if (paymentMethod) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [paymentMethod]);

  const handleMethodClick = async (method: any) => {
    if (method.id === 'default') {
      onSelectPayment(method);
      return;
    }
    setVerificationMethod(method);
    setIsFetchingRate(true);
    try {
      const res = await fetch('https://ve.dolarapi.com/v1/dolares/oficial');
      const data = await res.json();
      if (data.promedio) {
        setBcvRate(data.promedio);
      }
    } catch (err) {
      console.error('Error fetching BCV rate', err);
    }
    setIsFetchingRate(false);
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pmReference || !pmAmount || !pmDate || !pmBank || !pmCedula) return;
    
    const verificationNotes = `Validación: Ref: ${pmReference} | Monto: Bs.${pmAmount} | Fecha: ${pmDate} | Banco: ${pmBank} | CI/RIF: ${pmCedula}`;
    onSelectPayment(verificationMethod, verificationNotes);
  };

  if (paymentMethod) {
    return (
      <div className="w-full max-w-md mx-auto text-center space-y-6 animate-fade-in p-8 bg-white shadow-sm rounded-3xl border border-gray-200">
        <div className="w-20 h-20 brand-bg rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/20 overflow-hidden bg-white border border-gray-100 p-2">
          {paymentMethod.logoUrl ? (
             <img src={paymentMethod.logoUrl} alt={paymentMethod.title} className="w-full h-full object-contain" />
          ) : (
            <CreditCard className="w-10 h-10 text-orange-500" />
          )}
        </div>
        <h3 className="text-2xl font-bold text-gray-900">¡Pedido Confirmado!</h3>
        <p className="text-gray-500 text-lg">
          Tu orden ha sido enviada a la cocina.
        </p>
        <div className="p-4 bg-slate-50 rounded-xl border border-gray-200 inline-block w-full text-left space-y-2 mt-4">
          <p className="text-gray-800 text-center">Total a pagar:</p>
          <p className="text-3xl font-bold brand-text mt-1 text-center">{formatPrice(total, currency)}</p>
          <hr className="border-gray-200 my-4" />
          <p className="font-bold text-slate-800">Método: {paymentMethod.title}</p>
          {paymentMethod.details && (
            <div className="text-sm text-slate-600 whitespace-pre-wrap bg-white p-3 rounded-lg border border-gray-200 mt-2">
              {paymentMethod.details}
            </div>
          )}
          <p className="text-xs text-amber-600 mt-4 text-center">
            * El pedido no se entregará hasta confirmar el pago en caja.
          </p>
        </div>
      </div>
    );
  }

  if (verificationMethod) {
    return (
      <form onSubmit={handleVerificationSubmit} className="w-full max-w-md mx-auto space-y-6 animate-fade-in text-left">
        <div className="space-y-2 mb-2">
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Validar Pago</h1>
          <p className="text-slate-500 text-sm">Realiza tu pago en <strong>{verificationMethod.title}</strong> y registra los datos abajo para procesar tu orden.</p>
        </div>

        <div className="bg-orange-50 border border-orange-200 rounded-2xl p-5 space-y-3">
          <div className="flex justify-between items-center border-b border-orange-200/50 pb-3">
            <span className="text-slate-600 text-sm font-bold">Monto a pagar ({formatPrice(total, currency)}):</span>
            <span className="text-xl font-black text-orange-600 flex items-center gap-2">
              {isFetchingRate && <Loader2 className="w-4 h-4 animate-spin" />}
              Bs. {bcvRate ? (bcvRate * total).toLocaleString('es-VE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : 'Calculando...'}
            </span>
          </div>
          
          <div className="text-sm text-slate-700 pt-1">
            <p className="font-bold mb-1">Datos para realizar el pago:</p>
            <div className="bg-white/60 p-3 rounded-lg border border-orange-200/50 whitespace-pre-wrap">
              {verificationMethod.details || 'No hay detalles registrados.'}
            </div>
          </div>
          
          <div className="text-xs text-orange-600/80 font-semibold pt-2 text-center">
            Tasa oficial BCV referencial: Bs. {bcvRate ? bcvRate.toLocaleString('es-VE', { minimumFractionDigits: 4 }) : '...'} / USD
          </div>
        </div>

        <div className="space-y-4 bg-white p-5 rounded-2xl border border-gray-200 shadow-sm">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">Número de Referencia (Últimos 6 dígitos) *</label>
            <input 
              value={pmReference}
              onChange={e => setPmReference(e.target.value)}
              required 
              placeholder="Ej: 849201" 
              className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Monto Exacto (Bs) *</label>
              <input 
                value={pmAmount}
                onChange={e => setPmAmount(e.target.value)}
                required 
                placeholder="Ej: 1058.50" 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Fecha del Pago *</label>
              <input 
                type="date"
                value={pmDate}
                onChange={e => setPmDate(e.target.value)}
                required 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Banco Emisor *</label>
              <input 
                value={pmBank}
                onChange={e => setPmBank(e.target.value)}
                required 
                placeholder="Ej: Banesco" 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">Cédula / RIF Origen *</label>
              <input 
                value={pmCedula}
                onChange={e => setPmCedula(e.target.value)}
                required 
                placeholder="Ej: V-12345678" 
                className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <button 
            type="submit"
            disabled={isProcessing || !pmReference || !pmAmount || !pmDate || !pmBank || !pmCedula}
            className="w-full flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-14 text-base transition-all shadow-[0_4px_20px_rgba(249,115,22,0.2)] active:scale-[0.99] disabled:opacity-60 disabled:pointer-events-none"
          >
            {isProcessing ? <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</> : 'YA REALICÉ EL PAGO'}
          </button>
          <button 
            type="button"
            onClick={() => setVerificationMethod(null)}
            disabled={isProcessing}
            className="w-full text-center text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
          >
            Elegir otro método
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in">
      
      {/* Table Selector for Waiter */}
      {isWaiter && tables.length > 0 && (
        <div className="p-6 bg-white shadow-sm rounded-3xl border border-gray-200 space-y-3">
          <label className="block text-sm font-bold text-gray-500 uppercase tracking-wider">
            Mesa Destino del Pedido
          </label>
          <select 
            value={selectedTableId}
            onChange={(e) => onTableChange?.(e.target.value)}
            className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-slate-900 font-bold text-base focus:ring-2 focus:ring-orange-500/50 outline-none"
          >
            {tables.map((t: any) => {
              const cleanLabel = t.label?.startsWith('Mesero:') || t.label?.startsWith('Delivery:') ? null : t.label;
              return (
                <option key={t.id} value={t.id}>
                  {cleanLabel || `Mesa ${t.table_number}`}
                </option>
              );
            })}
          </select>
        </div>
      )}

      <div className="p-6 bg-slate-50 rounded-2xl border border-gray-200/50 flex justify-between items-center">
        <span className="text-gray-600 text-lg">Total del Pedido</span>
        <span className="text-2xl font-bold text-gray-900">{formatPrice(total, currency)}</span>
      </div>

      <div className="space-y-4 pt-4">
        {paymentMethods.length === 0 ? (
          <button
            onClick={() => onSelectPayment({ id: 'default', title: 'Efectivo / Caja', details: 'Pagar directamente en la caja.', logoUrl: '' })}
            disabled={isProcessing}
            className="w-full bg-white shadow-sm hover:bg-slate-100 text-gray-900 font-bold text-lg py-5 px-6 rounded-2xl border border-gray-200 active:scale-[0.98] transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <Banknote className="w-6 h-6 text-gray-500" />
              <span>Pago en Caja (Efectivo/Tarjeta)</span>
            </div>
            {isProcessing && <Loader2 className="w-5 h-5 animate-spin text-gray-400" />}
          </button>
        ) : (
          paymentMethods.map(pm => (
            <button
              key={pm.id}
              onClick={() => handleMethodClick(pm)}
              disabled={isProcessing}
              className="w-full bg-white shadow-sm hover:bg-slate-100 text-gray-900 font-bold text-lg py-5 px-6 rounded-2xl border border-gray-200 active:scale-[0.98] transition-all flex items-center justify-between group text-left"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className="w-10 h-10 rounded-lg overflow-hidden flex items-center justify-center shrink-0">
                  {pm.logoUrl ? (
                    <img src={pm.logoUrl} alt={pm.title} className="w-full h-full object-contain" />
                  ) : (
                    <CreditCard className="w-6 h-6 text-orange-400" />
                  )}
                </div>
                <div className="flex-1">
                  <span className="block">{pm.title}</span>
                </div>
              </div>
              <div className="shrink-0">
                {isProcessing ? <Loader2 className="w-5 h-5 animate-spin text-gray-400" /> : <span className="text-gray-300 group-hover:text-orange-500">&rarr;</span>}
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}
