'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { useGlubbiStore } from '@/modules/glubbi/stores/glubbi-store';

export default function GlubbiLogin() {
  const router = useRouter();
  const { customer, setCustomer } = useGlubbiStore();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
  });

  useEffect(() => {
    // Si ya tiene sesión, redirigir al home
    if (customer) {
      router.replace('/glubbi');
    }
  }, [customer, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const supabase = createClient();
    
    // Primero, revisamos si el email ya existe
    const { data: existing } = await supabase
      .from('glubbi_customers')
      .select('*')
      .eq('email', formData.email)
      .single();

    if (existing) {
      // Si existe, iniciamos sesión
      setCustomer(existing as any);
      router.replace('/glubbi');
      return;
    }

    // Si no existe, creamos el usuario
    const { data: newUser, error } = await supabase
      .from('glubbi_customers')
      .insert([formData])
      .select()
      .single();

    if (error) {
      console.error(error);
      alert('Error al registrar. Intenta nuevamente.');
      setIsLoading(false);
      return;
    }

    setCustomer(newUser as any);
    router.replace('/glubbi');
  };

  if (customer) return null; // Evitar render mientras redirige

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 relative overflow-hidden">
      {/* Fondo decorativo */}
      <div className="absolute top-[-20%] left-[-20%] w-[140%] h-[60%] bg-gradient-to-br from-orange-500 to-rose-500 rounded-b-[100%] opacity-10 z-0"></div>

      <div className="w-full max-w-sm relative z-10">
        <div className="text-center mb-10">
          <img src="/logo-glubbi.png" alt="Glubbi" className="h-16 mx-auto mb-6 object-contain" />
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Bienvenido a <br/>GLUBBI</h1>
          <p className="text-gray-500 mt-2 text-sm">Regístrate para descubrir los mejores restaurantes cerca de ti.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Nombre</label>
              <input 
                required 
                type="text" 
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800"
                value={formData.first_name}
                onChange={e => setFormData({...formData, first_name: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Apellido</label>
              <input 
                required 
                type="text" 
                className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800"
                value={formData.last_name}
                onChange={e => setFormData({...formData, last_name: e.target.value})}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Correo Electrónico</label>
            <input 
              required 
              type="email" 
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1 uppercase tracking-wider">Celular</label>
            <input 
              required 
              type="tel" 
              className="w-full bg-slate-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-all text-slate-800"
              value={formData.phone}
              onChange={e => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="w-full mt-6 bg-orange-500 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-500/30 hover:bg-orange-600 active:scale-[0.98] transition-all disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              'Ingresar a Glubbi'
            )}
          </button>
        </form>
        
        <p className="text-center text-xs text-gray-400 mt-6">
          Al ingresar aceptas nuestros Términos y Políticas de Privacidad.
        </p>
      </div>
    </div>
  );
}
