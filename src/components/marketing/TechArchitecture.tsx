import { Cpu, Terminal, Shield, Zap, GitBranch, Database } from 'lucide-react';

export function TechArchitecture() {
  return (
    <section className="py-24 bg-zinc-950 text-white relative overflow-hidden">
      {/* Subtle backdrop glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-indigo-500/20 uppercase tracking-wider">
            <Cpu className="w-3.5 h-3.5" />
            Stack de Desarrollo
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Arquitectura técnica robusta,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              diseñada para velocidad extrema.
            </span>
          </h2>
          <p className="text-lg text-zinc-400 mt-6 leading-relaxed">
            Glubbi está construido sobre tecnologías de vanguardia para asegurar tiempos de respuesta en milisegundos, aislamiento completo de datos y escalabilidad ilimitada.
          </p>
        </div>

        {/* Technical Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Tech 1: Next.js */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 mb-5 border border-zinc-700">
              <Zap className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Next.js (App Router) + Turbopack</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Carga instantánea de la interfaz del menú digital. La experiencia del usuario se siente nativa, optimizando las tasas de conversión y evitando el rebote de clientes.
            </p>
          </div>

          {/* Tech 2: Realtime DB */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 mb-5 border border-zinc-700">
              <Database className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Supabase Realtime PostgreSQL</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Toda la comunicación de sala a cocina ocurre mediante WebSockets en tiempo real. Los pedidos ingresados se reflejan instantáneamente en el tablero del gerente.
            </p>
          </div>

          {/* Tech 3: Security */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 mb-5 border border-zinc-700">
              <Shield className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Row Level Security (RLS)</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Aseguramos la privacidad absoluta de los datos transaccionales, inventarios y clientes de cada restaurante directamente en el esquema de base de datos PostgreSQL.
            </p>
          </div>

          {/* Tech 4: Edge Functions */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 mb-5 border border-zinc-700">
              <GitBranch className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">Vercel Edge Functions</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Las automatizaciones del Agente de IA y las integraciones de pago se procesan en servidores Edge cercanos al usuario, eliminando retardos de red.
            </p>
          </div>

          {/* Tech 5: Tailored CSS */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 mb-5 border border-zinc-700">
              <Terminal className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">TailwindCSS & Global CSS Variables</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Una arquitectura visual unificada que permite cargar temas en modo oscuro y claro al instante sin agregar peso al paquete JS final.
            </p>
          </div>

          {/* Tech 6: Print Services */}
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6">
            <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-300 mb-5 border border-zinc-700">
              <Cpu className="w-5 h-5 text-indigo-400" />
            </div>
            <h3 className="font-bold text-lg text-white mb-2">API de Impresión Integrada</h3>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Lógica optimizada para disparar copias de comanda directas a cocina y caja sin depender de costosos sistemas POS cerrados.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
