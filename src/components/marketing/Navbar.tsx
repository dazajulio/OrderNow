'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-md border-b border-slate-100 shadow-sm shadow-slate-100/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo-mtriq.png" alt="Mtriq Logo" className="w-8 h-8 object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            mtriq<span className="text-orange-500">.app</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#ecosistema" className="hover:text-slate-900 transition-colors">Ecosistema</a>
          <a href="#casos" className="hover:text-slate-900 transition-colors">Casos de Uso</a>
          <a href="#precios" className="hover:text-slate-900 transition-colors">Precios</a>
          <a href="#faq" className="hover:text-slate-900 transition-colors">FAQ</a>
        </div>

        <a href="#registro">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-6 py-2 text-sm transition-all shadow-md shadow-orange-500/10 active:scale-[0.98]">
            Prueba Gratis
          </button>
        </a>
      </div>
    </nav>
  );
}
