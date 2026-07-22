'use client';

import { useState, useEffect } from 'react';
import { Lock, ChevronRight } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

export function GerentePinGuard({ children, restaurantId }: { children: React.ReactNode, restaurantId: string }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // States for first login
  const [isFirstLogin, setIsFirstLogin] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  // States for returning login
  const [expectedPin, setExpectedPin] = useState('');
  const [enteredPin, setEnteredPin] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const supabase = createClient();

  useEffect(() => {
    if (!restaurantId) return;

    // Check if there's already an active session for this restaurant
    const sessionKey = `gerente_auth_${restaurantId}`;
    if (sessionStorage.getItem(sessionKey) === 'true') {
      setIsAuthenticated(true);
      setIsLoading(false);
      return;
    }

    async function checkAuthStatus() {
      const { data, error } = await supabase
        .from('restaurants')
        .select('admin_pin, super_admin_password, is_first_login')
        .eq('id', restaurantId)
        .single();
        
      if (data) {
        setIsFirstLogin(data.is_first_login === true);
        setExpectedPin(data.admin_pin || data.super_admin_password || '');
      }
      setIsLoading(false);
    }
    
    checkAuthStatus();
  }, [restaurantId, supabase]);

  const handleCreatePin = async () => {
    if (newPin.length < 4) {
      setErrorMsg('La clave debe tener al menos 4 números.');
      return;
    }
    if (newPin !== confirmPin) {
      setErrorMsg('Las claves no coinciden.');
      return;
    }
    
    setIsSaving(true);
    setErrorMsg('');

    let { error } = await supabase
      .from('restaurants')
      .update({
        admin_pin: newPin,
        super_admin_password: newPin,
        is_first_login: false
      } as any)
      .eq('id', restaurantId);

    if (error && error.message && error.message.includes('admin_pin')) {
      const fallback = await supabase
        .from('restaurants')
        .update({
          super_admin_password: newPin,
          is_first_login: false
        } as any)
        .eq('id', restaurantId);
      error = fallback.error;
    }

    setIsSaving(false);
    if (error) {
      setErrorMsg('Error al guardar: ' + error.message);
    } else {
      sessionStorage.setItem(`gerente_auth_${restaurantId}`, 'true');
      setIsAuthenticated(true);
    }
  };

  const handleLogin = () => {
    if (enteredPin === expectedPin) {
      sessionStorage.setItem(`gerente_auth_${restaurantId}`, 'true');
      setIsAuthenticated(true);
    } else {
      setErrorMsg('Clave incorrecta.');
      setEnteredPin('');
    }
  };

  if (isLoading) {
    return <div className="fixed inset-0 bg-slate-50 z-[100] flex items-center justify-center"><div className="w-8 h-8 border-4 border-gray-200 border-t-orange-500 rounded-full animate-spin" /></div>;
  }

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-sm bg-white border border-gray-200 rounded-[2rem] shadow-2xl p-8 animate-scale-in text-center relative overflow-hidden">
        
        {/* Subtle background element */}
        <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/10 rounded-full blur-[30px] pointer-events-none" />

        <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto text-orange-500 border border-orange-100 mb-6 relative z-10 shadow-sm">
          <Lock className="w-8 h-8" />
        </div>
        
        {isFirstLogin ? (
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Configura tu Clave</h3>
              <p className="text-sm text-gray-500">
                Mantén tu clave segura. Puedes cambiarla cuando quieras desde los ajustes del panel.
              </p>
            </div>

            <div className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Clave de Gerente (Mín. 4 números)</label>
                <input 
                  type="password"
                  value={newPin}
                  onChange={(e) => {
                    setNewPin(e.target.value.replace(/\D/g, ''));
                    setErrorMsg('');
                  }}
                  placeholder="Ej: 5678"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-slate-900 text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Confirmar Clave</label>
                <input 
                  type="password"
                  value={confirmPin}
                  onChange={(e) => {
                    setConfirmPin(e.target.value.replace(/\D/g, ''));
                    setErrorMsg('');
                  }}
                  placeholder="Ej: 5678"
                  className="w-full bg-slate-50 border border-gray-200 rounded-xl py-3 px-4 text-slate-900 text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                />
              </div>
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm font-semibold">{errorMsg}</p>
            )}

            <button 
              onClick={handleCreatePin}
              disabled={isSaving || newPin.length < 4 || newPin !== confirmPin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-[0.98]"
            >
              <span>{isSaving ? 'Guardando...' : 'Crear Clave y Entrar'}</span>
              {!isSaving && <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        ) : (
          <div className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold text-slate-900">Panel Privado</h3>
              <p className="text-sm text-gray-500">
                Ingresa tu clave de Gerente para acceder a la configuración de este restaurante.
              </p>
            </div>

            <div className="space-y-4">
              <input 
                type="password"
                value={enteredPin}
                onChange={(e) => {
                  setEnteredPin(e.target.value.replace(/\D/g, ''));
                  setErrorMsg('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleLogin();
                }}
                placeholder="****"
                className="w-full bg-slate-50 border border-gray-200 rounded-xl py-4 px-4 text-slate-900 text-center font-mono text-2xl tracking-[0.5em] focus:outline-none focus:ring-2 focus:ring-orange-500 transition-shadow"
                autoFocus
              />
            </div>

            {errorMsg && (
              <p className="text-red-500 text-sm font-semibold">{errorMsg}</p>
            )}

            <button 
              onClick={handleLogin}
              disabled={enteredPin.length < 4}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 shadow-lg shadow-orange-500/20 active:scale-[0.98]"
            >
              <span>Acceder al Panel</span>
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
