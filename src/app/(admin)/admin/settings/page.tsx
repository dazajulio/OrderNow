'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { BarChart3, Building2, Save, Lock } from 'lucide-react';
import type { Product } from '@/types/database';

export default function SettingsAdminPage() {
  const [restaurant, setRestaurant] = useState<any>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [upsell1, setUpsell1] = useState('');
  const [upsell2, setUpsell2] = useState('');
  
  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID || '';

  useEffect(() => {
    async function loadSettings() {
      const supabase = createClient();
      
      const { data: restData } = await supabase
        .from('restaurants')
        .select('*')
        .eq('id', restaurantId)
        .single();
        
      if (restData) {
        setRestaurant(restData);
        setUpsell1(restData.upsell_item_1_id || '');
        setUpsell2(restData.upsell_item_2_id || '');
      }
      
      const { data: prodData } = await supabase
        .from('products')
        .select('*')
        .eq('restaurant_id', restaurantId)
        .eq('is_available', true);
        
      if (prodData) {
        setProducts(prodData as Product[]);
      }
      
      setIsLoading(false);
    }
    
    loadSettings();
  }, [restaurantId]);

  const saveSettings = async () => {
    setIsSaving(true);
    const supabase = createClient();
    
    await supabase
      .from('restaurants')
      .update({
        upsell_item_1_id: upsell1 || null,
        upsell_item_2_id: upsell2 || null
      } as any)
      .eq('id', restaurantId);
      
    setIsSaving(false);
    alert('Configuración guardada correctamente.');
  };

  if (isLoading) {
    return <div className="p-12 flex justify-center"><div className="w-8 h-8 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"/></div>;
  }

  return (
    <div className="p-6 md:p-12">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-white">Administrador</h1>
        </div>
        <p className="text-zinc-400 text-lg">Configuración del negocio y opciones del Kiosco.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Venta Sugerida */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl h-fit">
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <span className="text-orange-500">💰</span> Venta Sugerida (Upsell)
          </h2>
          <p className="text-zinc-400 text-sm mb-6">
            Selecciona los 2 productos que se ofrecerán al cliente justo antes de finalizar su pago en el kiosco.
          </p>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Producto Sugerido 1</label>
              <select 
                value={upsell1} 
                onChange={(e) => setUpsell1(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">-- Seleccionar producto --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (${p.base_price})</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-zinc-400 mb-2">Producto Sugerido 2</label>
              <select 
                value={upsell2} 
                onChange={(e) => setUpsell2(e.target.value)}
                className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value="">-- Seleccionar producto --</option>
                {products.map(p => (
                  <option key={p.id} value={p.id}>{p.name} (${p.base_price})</option>
                ))}
              </select>
            </div>
            
            <button 
              onClick={saveSettings}
              disabled={isSaving}
              className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              {isSaving ? 'Guardando...' : 'Guardar Configuración'}
            </button>
          </div>
        </div>

        {/* Datos del Negocio (Solo Lectura) */}
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 shadow-xl relative overflow-hidden group">
          <div className="absolute top-4 right-4 bg-zinc-800 text-zinc-400 px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            <Lock className="w-3 h-3" /> Solo lectura
          </div>
          
          <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-orange-500" /> Datos del Negocio
          </h2>
          
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-white rounded-xl overflow-hidden flex items-center justify-center">
                <img src={restaurant?.logo_url || '/logo.svg'} alt="Logo" className="w-full h-full object-contain p-1" />
              </div>
              <div>
                <p className="text-sm text-zinc-500">Nombre de la Empresa</p>
                <p className="text-lg font-bold text-white">{restaurant?.name || 'Cargando...'}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <p className="text-xs text-zinc-500 mb-1">Identificación Fiscal</p>
                <p className="text-sm font-medium text-white">{restaurant?.tax_id || 'No registrada'}</p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <p className="text-xs text-zinc-500 mb-1">Teléfono</p>
                <p className="text-sm font-medium text-white">{restaurant?.phone || 'No registrado'}</p>
              </div>
            </div>
            
            <div className="bg-zinc-800/50 p-4 rounded-xl">
              <p className="text-xs text-zinc-500 mb-1">Dirección</p>
              <p className="text-sm font-medium text-white">{restaurant?.address || 'No registrada'}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <p className="text-xs text-zinc-500 mb-1">Licencia de Uso</p>
                <p className="text-sm font-mono text-orange-400 truncate" title={restaurant?.license_code}>
                  {restaurant?.license_code || 'No registrada'}
                </p>
              </div>
              <div className="bg-zinc-800/50 p-4 rounded-xl">
                <p className="text-xs text-zinc-500 mb-1">Fecha de Corte</p>
                <p className="text-sm font-medium text-white">
                  {restaurant?.license_valid_until 
                    ? new Date(restaurant.license_valid_until).toLocaleDateString() 
                    : 'No registrada'}
                </p>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  );
}
