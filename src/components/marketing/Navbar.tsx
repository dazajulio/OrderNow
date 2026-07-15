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
          ? 'bg-[#0B0C10]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF8A3D] to-[#FF3D71] flex items-center justify-center shadow-lg shadow-orange-500/20">
            <Flame className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            mtriq<span className="text-[#FF6B00]">.app</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          <a href="#ecosistema" className="hover:text-white transition-colors">Ecosistema</a>
          <a href="#casos" className="hover:text-white transition-colors">Casos de Uso</a>
          <a href="#precios" className="hover:text-white transition-colors">Precios</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
          <Link href="/admin" className="hover:text-white transition-colors">Login Admin</Link>
        </div>

        <a href="#registro">
          <button className="bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:brightness-110 text-white font-semibold rounded-full px-6 py-2 text-sm transition-all shadow-lg shadow-orange-500/20">
            Prueba Gratis
          </button>
        </a>
      </div>
    </nav>
  );
}
