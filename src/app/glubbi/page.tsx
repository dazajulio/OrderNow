'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Restaurant } from '@/types/database';
import { Search, MapPin, Clock, Star, ChevronRight, Menu, Bell } from 'lucide-react';
import Link from 'next/link';

export default function GlubbiMarketplace() {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');

  const categories = ['Todos', 'Burgers', 'Sushi', 'Pizza', 'Saludable', 'Postres', 'Bebidas'];

  useEffect(() => {
    async function loadRestaurants() {
      const supabase = createClient();
      const { data } = await supabase
        .from('restaurants')
        .select('*')
        .eq('is_active', true)
        .eq('is_glubbi_active', true)
        .order('name');
        
      if (data) setRestaurants(data as Restaurant[]);
      setIsLoading(false);
    }
    loadRestaurants();
  }, []);

  const filteredRestaurants = restaurants.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Todos' || r.glubbi_category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      {/* App Header */}
      <div className="bg-white px-4 pt-6 pb-4 sticky top-0 z-50 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Menu className="w-6 h-6 text-gray-700" />
            <div className="flex flex-col ml-1">
              <span className="text-xs text-orange-500 font-bold uppercase tracking-wider">Entregar en</span>
              <div className="flex items-center text-sm font-semibold text-slate-800">
                <MapPin className="w-4 h-4 mr-1 text-slate-400" />
                <span>Mi Ubicación Actual</span>
                <ChevronRight className="w-4 h-4 ml-0.5" />
              </div>
            </div>
          </div>
          <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center relative">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-orange-500 rounded-full border-2 border-white"></span>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-none rounded-2xl leading-5 bg-slate-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white transition-colors sm:text-sm shadow-inner"
            placeholder="¿Qué se te antoja hoy?"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Categories Horizontal Scroll */}
      <div className="px-4 py-4 overflow-x-auto whitespace-nowrap custom-scrollbar">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeCategory === cat 
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20' 
                  : 'bg-white text-gray-600 border border-gray-200 hover:bg-slate-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="px-4 mb-6">
        <div className="w-full bg-gradient-to-r from-orange-500 to-rose-500 rounded-2xl p-6 text-white shadow-lg shadow-orange-500/20 relative overflow-hidden">
          <div className="relative z-10 w-2/3">
            <span className="bg-white/20 px-2 py-1 rounded text-xs font-bold uppercase tracking-wide">Promo Glubbi</span>
            <h2 className="text-2xl font-black mt-2 leading-tight">Envío Gratis en tu primer pedido</h2>
            <button className="mt-4 bg-white text-orange-600 font-bold px-4 py-2 rounded-xl text-sm shadow-sm active:scale-95 transition-transform">
              Ver restaurantes
            </button>
          </div>
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        </div>
      </div>

      {/* Restaurants List */}
      <div className="px-4">
        <h2 className="text-lg font-bold text-slate-900 mb-4">
          {activeCategory === 'Todos' ? 'Restaurantes Destacados' : `Restaurantes de ${activeCategory}`}
        </h2>
        
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-full h-64 bg-slate-200 rounded-2xl animate-pulse"></div>
            ))}
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12 px-4 bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="text-4xl mb-4">🛵</div>
            <h3 className="text-lg font-bold text-slate-800 mb-2">No hay resultados</h3>
            <p className="text-gray-500 text-sm">No encontramos restaurantes que coincidan con tu búsqueda en este momento.</p>
          </div>
        ) : (
          <div className="space-y-5">
            {filteredRestaurants.map(restaurant => (
              <Link 
                href={`/${restaurant.slug}/mesa/delivery?glubbi=true`}
                key={restaurant.id}
              >
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden cursor-pointer active:scale-[0.98] transition-transform">
                  <div className="relative h-40 w-full bg-slate-100">
                    {restaurant.cover_image_url ? (
                      <img src={restaurant.cover_image_url} alt={restaurant.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-tr from-slate-200 to-slate-100 flex items-center justify-center">
                        <span className="text-slate-400 font-medium">Sin portada</span>
                      </div>
                    )}
                    
                    {/* Time Badge */}
                    <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-xl shadow-sm flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-700" />
                      <span className="text-xs font-bold text-slate-800">{restaurant.estimated_time || '30-45 min'}</span>
                    </div>
                  </div>
                  
                  <div className="p-4 relative">
                    {/* Logo superpuesto */}
                    <div className="absolute -top-10 left-4 w-16 h-16 bg-white rounded-full p-1 shadow-md">
                      {restaurant.logo_url ? (
                        <img src={restaurant.logo_url} alt="logo" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <div 
                          className="w-full h-full rounded-full flex items-center justify-center text-white font-bold text-xl"
                          style={{ backgroundColor: restaurant.brand_color_primary }}
                        >
                          {restaurant.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-6">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg text-slate-900">{restaurant.name}</h3>
                          <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1.5">
                            {restaurant.glubbi_category || 'Comida'} • Envío $0
                          </p>
                        </div>
                        <div className="flex items-center gap-1 bg-orange-50 px-2 py-1 rounded-lg">
                          <Star className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                          <span className="text-sm font-bold text-orange-600">{restaurant.rating || '5.0'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
