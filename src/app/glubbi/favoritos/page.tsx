'use client';

import React from 'react';
import { Heart, Search } from 'lucide-react';
import Link from 'next/link';

export default function GlubbiFavoritos() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans px-4 pt-6">
      <div className="mb-6">
        <h1 className="text-2xl font-black text-slate-800 tracking-tight">Tus Favoritos</h1>
        <p className="text-sm text-slate-500 mt-1">Los restaurantes que más amas, a un toque de distancia.</p>
      </div>

      <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm px-6">
        <div className="w-20 h-20 rounded-full bg-rose-50 flex items-center justify-center mb-6">
          <Heart className="w-10 h-10 text-rose-300" />
        </div>
        <h2 className="text-xl font-bold text-slate-800 mb-2">Aún no tienes favoritos</h2>
        <p className="text-sm text-slate-500 mb-8 max-w-xs">
          Explora los restaurantes de Glubbi y marca el corazón en los que más te gusten para guardarlos aquí.
        </p>
        
        <Link 
          href="/glubbi"
          className="bg-orange-500 text-white font-bold py-3 px-8 rounded-2xl shadow-md active:scale-95 transition-transform flex items-center gap-2"
        >
          <Search className="w-5 h-5" /> Explorar Restaurantes
        </Link>
      </div>
    </div>
  );
}
