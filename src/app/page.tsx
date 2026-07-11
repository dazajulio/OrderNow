import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl text-center space-y-8">
        {/* Logo / Brand */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-600 mb-4">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          </div>
          <h1 className="text-4xl font-bold tracking-tight">
            FoodTech <span className="text-orange-500">SaaS</span>
          </h1>
          <p className="text-zinc-400 text-lg">
            Plataforma de Pedidos Móviles para Restaurantes
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid gap-4 sm:grid-cols-2 mt-12">
          <Link
            href="/admin/kitchen"
            className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-300"
          >
            <div className="text-2xl mb-3">🖥️</div>
            <h2 className="text-lg font-semibold mb-1 group-hover:text-orange-400 transition-colors">
              Dashboard Admin
            </h2>
            <p className="text-zinc-500 text-sm">
              Cocina · Menú · Códigos QR
            </p>
          </Link>

          <Link
            href="/burger-palace/mesa/1"
            className="group p-6 rounded-2xl border border-zinc-800 bg-zinc-900/50 hover:border-orange-500/50 hover:bg-zinc-900 transition-all duration-300"
          >
            <div className="text-2xl mb-3">📱</div>
            <h2 className="text-lg font-semibold mb-1 group-hover:text-orange-400 transition-colors">
              Kiosko Demo
            </h2>
            <p className="text-zinc-500 text-sm">
              Burger Palace · Mesa 1
            </p>
          </Link>
        </div>

        {/* Footer */}
        <p className="text-zinc-600 text-xs mt-12">
          Multi-Tenant SaaS · Next.js · Supabase · Stripe
        </p>
      </div>
    </div>
  );
}
