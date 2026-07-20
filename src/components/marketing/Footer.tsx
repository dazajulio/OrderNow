import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-slate-50 py-12 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-2">
          <img src="/logo-mtriq.png" alt="Mtriq Logo" className="w-7 h-7 object-contain" />
          <span className="text-xl font-bold tracking-tight text-slate-900">
            mtriq<span className="text-orange-500">.app</span>
          </span>
        </div>
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Metriq App. Todos los derechos reservados.
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-slate-400 items-center justify-center md:justify-end">
          <Link href="/terminos" className="hover:text-slate-700 transition-colors">Términos</Link>
          <Link href="/privacidad" className="hover:text-slate-700 transition-colors">Privacidad</Link>
          <a href="#registro" className="hover:text-slate-700 transition-colors">Contacto</a>
          <span className="text-slate-200">|</span>
          <a 
            href="https://mtriq.app" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="hover:bg-slate-800 transition-colors font-bold text-white text-xs tracking-wider uppercase bg-[#0f1627] px-4.5 py-1.5 rounded-full border border-slate-800 shadow-sm"
          >
            POWERED BY MTRIQ.APP
          </a>
        </div>
      </div>
    </footer>
  );
}
