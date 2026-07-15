import { Flame } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0B0C10] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF8A3D] to-[#FF3D71] flex items-center justify-center">
            <Flame className="w-3.5 h-3.5 text-white" strokeWidth={2.5} />
          </div>
          <span className="text-xl font-bold tracking-tight text-white">
            mtriq<span className="text-[#FF6B00]">.app</span>
          </span>
        </div>
        <p className="text-zinc-600 text-sm">
          © {new Date().getFullYear()} Metriq App. Todos los derechos reservados.
        </p>
        <div className="flex gap-6 text-sm text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">Términos</a>
          <a href="#" className="hover:text-white transition-colors">Privacidad</a>
          <a href="#" className="hover:text-white transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
