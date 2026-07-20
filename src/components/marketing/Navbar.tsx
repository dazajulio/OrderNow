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
        <Link href="/#home" className="flex items-center gap-2 bg-white border border-slate-200/80 rounded-full pl-3 pr-4 py-1.5 shadow-sm hover:shadow-md transition-all active:scale-95 duration-200 select-none">
          <img src="/logo-mtriq.png" alt="Mtriq Logo" className="w-6 h-6 object-contain" />
          <span className="text-base font-black tracking-tight text-slate-900">
            mtriq<span className="text-orange-500">.app</span>
          </span>
        </Link>

        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors duration-300 ${scrolled ? 'text-slate-600' : 'text-slate-300'}`}>
          <a href="#ecosistema" className={`transition-colors ${scrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>Ecosistema</a>
          <a href="#casos" className={`transition-colors ${scrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>Casos de Uso</a>
          <a href="#precios" className={`transition-colors ${scrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>Precios</a>
          <a href="#faq" className={`transition-colors ${scrolled ? 'hover:text-slate-900' : 'hover:text-white'}`}>FAQ</a>
        </div>

        <Link href="/register">
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-full px-6 py-2 text-sm transition-all shadow-md shadow-orange-500/10 active:scale-[0.98]">
            Regístrate
          </button>
        </Link>
      </div>
    </nav>
  );
}
