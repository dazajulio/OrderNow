import Link from 'next/link';
import { Cpu } from 'lucide-react';

export default function PlatformSelector() {
  return (
    <div className="min-h-screen bg-[#0B0C10] text-zinc-300 font-sans flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 w-full max-w-md bg-zinc-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-md text-center space-y-8">
        <div className="flex items-center justify-center gap-2">
          <img src="/logo-mtriq.png" alt="Mtriq Logo" className="w-8 h-8 object-contain" />
          <span className="text-2xl font-bold tracking-tight text-white">mtriq<span className="text-[#FF6B00]">.app</span></span>
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Plataforma Mtriq</h2>
          <p className="text-zinc-500 text-sm">Selecciona el módulo al que deseas acceder</p>
        </div>

        <div className="flex flex-col gap-4">
          <Link 
            href="/gerente/kitchen" 
            className="w-full py-4 bg-zinc-800 hover:bg-zinc-700/80 text-white font-semibold rounded-xl transition-all border border-white/5 active:scale-[0.98]"
          >
            Panel de Administración (Gerente)
          </Link>
          <Link 
            href="/burger-palace/mesa/1" 
            className="w-full py-4 bg-gradient-to-r from-cyan-500 to-purple-600 hover:brightness-110 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-cyan-500/10"
          >
            Kiosko de Autoservicio (Demo)
          </Link>
        </div>

        <div className="pt-4 border-t border-white/5">
          <Link href="/" className="text-sm text-zinc-500 hover:text-white transition-colors">
            &larr; Volver a la Landing Page
          </Link>
        </div>
      </div>
    </div>
  );
}
