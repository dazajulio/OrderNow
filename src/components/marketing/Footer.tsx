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
        <div className="flex gap-6 text-sm text-slate-400">
          <a href="#" className="hover:text-slate-700 transition-colors">Términos</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Privacidad</a>
          <a href="#" className="hover:text-slate-700 transition-colors">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
