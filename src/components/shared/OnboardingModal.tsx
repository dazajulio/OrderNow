'use client';

import { useState } from 'react';
import { Lock, Building2, Utensils, Sparkles, ChevronRight, ShieldCheck, Phone, MapPin } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

interface OnboardingModalProps {
  isOpen: boolean;
  restaurantId: string;
  restaurantName: string;
  slug: string;
  onComplete: () => void;
}

export function OnboardingModal({ isOpen, restaurantId, restaurantName, slug, onComplete }: OnboardingModalProps) {
  const router = useRouter();
  const supabase = createClient();
  const [step, setStep] = useState(1);
  const [isSaving, setIsSaving] = useState(false);

  // Step 1: PIN
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  // Step 2: Fiscal
  const [taxId, setTaxId] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  if (!isOpen) return null;

  const handleNextStep1 = async () => {
    if (pin.length !== 4) {
      alert('El PIN debe tener exactamente 4 dígitos.');
      return;
    }
    if (pin === '1234') {
      alert('Por seguridad, elige un PIN diferente al PIN por defecto (1234).');
      return;
    }
    if (pin !== confirmPin) {
      alert('Los PIN no coinciden.');
      return;
    }

    setIsSaving(true);
    let { error } = await supabase
      .from('restaurants')
      .update({
        admin_pin: pin,
        super_admin_password: pin
      } as any)
      .eq('id', restaurantId);

    if (error && error.message && error.message.includes('admin_pin')) {
      console.warn('admin_pin column not found in schema. Falling back to super_admin_password only...');
      const fallback = await supabase
        .from('restaurants')
        .update({
          super_admin_password: pin
        } as any)
        .eq('id', restaurantId);
      error = fallback.error;
    }

    setIsSaving(false);
    if (error) {
      alert('Error al guardar el PIN: ' + error.message);
    } else {
      setStep(2);
    }
  };

  const handleNextStep2 = async () => {
    if (!taxId.trim() || !phone.trim() || !address.trim()) {
      alert('Por favor completa todos los datos solicitados.');
      return;
    }

    setIsSaving(true);
    const { error } = await supabase
      .from('restaurants')
      .update({
        tax_id: taxId.trim(),
        phone: phone.trim(),
        address: address.trim()
      } as any)
      .eq('id', restaurantId);

    setIsSaving(false);
    if (error) {
      alert('Error al guardar los datos fiscales: ' + error.message);
    } else {
      setStep(3);
    }
  };

  const handleFinish = async () => {
    setIsSaving(true);
    const { error } = await supabase
      .from('restaurants')
      .update({
        is_first_login: false
      } as any)
      .eq('id', restaurantId);

    setIsSaving(false);
    if (error) {
      alert('Error al finalizar el asistente: ' + error.message);
    } else {
      onComplete();
      router.push(`/${slug}/gerente/menu`);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-zinc-950/95 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-scale-in flex flex-col">
        
        {/* Progress Bar */}
        <div className="h-1.5 w-full bg-zinc-800 flex">
          <div className={`h-full bg-orange-500 transition-all duration-500 ${
            step === 1 ? 'w-1/3' : step === 2 ? 'w-2/3' : 'w-full'
          }`} />
        </div>

        {/* Modal Content */}
        <div className="p-8 flex-1 flex flex-col justify-between min-h-[420px]">
          
          {/* STEP 1: PIN ACCESS CHANGE */}
          {step === 1 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto text-orange-500 border border-orange-500/20">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Configura tu PIN de Seguridad</h3>
                <p className="text-sm text-zinc-400">
                  Para proteger tu panel y el Agente IA, debes actualizar la clave predeterminada.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Nuevo PIN (4 dígitos)</label>
                  <input 
                    type="password"
                    maxLength={4}
                    value={pin}
                    onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ej: 5678"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-white text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Confirmar PIN</label>
                  <input 
                    type="password"
                    maxLength={4}
                    value={confirmPin}
                    onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                    placeholder="Ej: 5678"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 px-4 text-white text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              <button 
                onClick={handleNextStep1}
                disabled={isSaving || pin.length !== 4 || pin !== confirmPin}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
              >
                <span>Siguiente Paso</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: FISCAL DATA */}
          {step === 2 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center">
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto text-orange-500 border border-orange-500/20">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold text-white">Datos de tu Negocio</h3>
                <p className="text-sm text-zinc-400">
                  Ingresa el identificador fiscal y contacto de {restaurantName}.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Identificador Fiscal (RIF / NIT)</label>
                  <div className="relative">
                    <ShieldCheck className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type="text"
                      placeholder="Ej: J-12345678-9"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Teléfono Comercial</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type="text"
                      placeholder="Ej: +58 412-1234567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-1">Dirección Física</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 w-4 h-4 text-zinc-500" />
                    <input 
                      type="text"
                      placeholder="Calle, Edificio, Local..."
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl py-3 pl-10 pr-4 text-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>
              </div>

              <button 
                onClick={handleNextStep2}
                disabled={isSaving || !taxId.trim() || !phone.trim() || !address.trim()}
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20"
              >
                <span>Guardar y Continuar</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 3: WELCOME AND GO TO MENU */}
          {step === 3 && (
            <div className="space-y-6 flex-1 flex flex-col justify-center text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto text-green-500 border border-green-500/20 animate-pulse">
                <Sparkles className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-2xl font-bold text-white">¡Configuración Exitosa!</h3>
                <p className="text-sm text-zinc-400 max-w-sm mx-auto">
                  Tu restaurante ha sido configurado y protegido correctamente. Hemos cargado una selección de platos de demostración por defecto para que los pruebes.
                </p>
                <div className="inline-flex items-center gap-1.5 bg-zinc-800/80 border border-zinc-700 px-3 py-1.5 rounded-full text-xs font-semibold text-zinc-300 mt-2">
                  <Utensils className="w-3.5 h-3.5 text-orange-500" />
                  <span>Kiosco inicializado con platos demo</span>
                </div>
              </div>

              <button 
                onClick={handleFinish}
                disabled={isSaving}
                className="w-full mt-8 bg-gradient-to-r from-orange-500 to-amber-500 hover:brightness-110 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-orange-500/20"
              >
                {isSaving ? 'Finalizando...' : 'Ir a Personalizar Menú'}
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
