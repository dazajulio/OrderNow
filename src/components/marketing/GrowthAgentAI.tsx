import { Brain, Cpu, Sparkles, Code, Play, CheckCircle2 } from 'lucide-react';

export function GrowthAgentAI() {
  return (
    <section className="py-24 bg-slate-950 text-white border-b border-zinc-900 relative overflow-hidden">
      {/* Decorative gradient glowing spots */}
      <div className="absolute top-1/4 left-1/4 w-[380px] h-[380px] rounded-full bg-orange-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[420px] h-[420px] rounded-full bg-indigo-500/5 blur-[150px] pointer-events-none" />

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_80%,transparent_100%)] opacity-[0.2] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-[1.15fr_0.85fr] gap-16 items-center relative z-10">
        
        {/* COLUMNA IZQUIERDA: EXPLICACION Y PODER DE IA */}
        <div>
          <div className="inline-flex items-center gap-2 bg-orange-500/15 text-orange-400 px-4 py-1.5 rounded-full text-xs font-bold w-fit mb-6 border border-orange-500/20 uppercase tracking-wider">
            <Brain className="w-3.5 h-3.5" />
            Estratega de Crecimiento Autónomo
          </div>

          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6 leading-tight">
            Tu restaurante con superpoderes:
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-orange-500">
              Agente IA de Crecimiento
            </span>
          </h2>

          <p className="text-lg text-zinc-300 mb-10 leading-relaxed max-w-xl">
            No solo gestionas pedidos; construyes una máquina de ventas que aprende sola. Nuestro Agente de IA analiza quién compra, qué compra y cuándo compra para ejecutar campañas de retención automáticas que tus clientes amarán.
          </p>

          {/* AI Blueprint Sections */}
          <div className="space-y-8 max-w-xl">
            
            {/* Persona & System Prompt */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-orange-400">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">1. Identidad de Crecimiento (System Prompt)</h3>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                  El agente opera como el &quot;Head of Growth&quot; del restaurante. Se comunica de forma empática, profesional y altamente personalizada. Si un cliente no ha comprado en 15 días, su lenguaje se adapta de inmediato ofreciéndole su plato favorito con un beneficio.
                </p>
              </div>
            </div>

            {/* Knowledge layers */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-orange-400">
                <Brain className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">2. Capas de Conocimiento Integradas</h3>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                  Se alimenta del historial transaccional en Supabase (CRM), catálogo de platos actuales y márgenes de utilidad reales. Esto le permite recomendar los agregados y combos que realmente dejen el mayor margen de dinero al restaurante, no solo los más baratos.
                </p>
              </div>
            </div>

            {/* Triggers and Automation */}
            <div className="flex gap-4">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0 text-orange-400">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">3. Ejecución en Tiempo Real (Edge Functions)</h3>
                <p className="text-zinc-400 text-sm mt-1 leading-relaxed">
                  Lanza disparadores automáticos sin intervención humana: recupera carritos abandonados a los 10 minutos, etiqueta a clientes de alto valor como &quot;VIP&quot; y activa promociones focalizadas los días de baja venta histórica.
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* COLUMNA DERECHA: CONSOLA DE ACCIÓN DE IA */}
        <div className="flex flex-col gap-4">
          
          {/* Main Agent Interface Mock */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-5 shadow-2xl relative overflow-hidden select-none">
            <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/10 rounded-full blur-xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
                <span className="text-[10px] font-black text-zinc-400 tracking-wider">Mtriq AI Engine v1.2</span>
              </div>
              <span className="text-[9px] text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">ESTRATEGA ACTIVO</span>
            </div>

            {/* Console Log Lines */}
            <div className="font-mono text-[10px] space-y-3.5">
              
              {/* Step 1 */}
              <div>
                <span className="text-zinc-500">[02:14:10]</span> <span className="text-emerald-400">INFO:</span> Analizando comportamiento de compra de <strong>Juan Pérez</strong>...
              </div>

              {/* Step 2 */}
              <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800">
                <p className="text-zinc-400 font-bold mb-1">Cálculo de Churn & Retención</p>
                <div className="grid grid-cols-2 gap-2 text-[9px] text-zinc-400">
                  <div>Media de visita: <strong>7 días</strong></div>
                  <div>Último pedido: <strong>Hace 16 días</strong></div>
                  <div className="col-span-2 text-orange-400 font-extrabold mt-1">⚠️ ESTADO: En Riesgo de Abandono</div>
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <span className="text-zinc-500">[02:14:11]</span> <span className="text-orange-400">ACCION:</span> Generando cupón dinámico automatizado...
                <div className="mt-1.5 ml-4 bg-zinc-950 border border-zinc-800/80 p-2 rounded text-zinc-400 leading-snug">
                  &quot;¡Hola Juan! Te extrañamos en Burger Grill. Tu plato favorito <strong>Burger Master</strong> te espera con un <strong>10% OFF</strong>. Canjea con un clic: mtriq.app/c/183j&quot;
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center gap-1.5 text-emerald-400">
                <Play className="w-3.5 h-3.5 fill-emerald-400/20 animate-pulse" />
                <span>Trigger ejecutado con éxito vía WhatsApp API.</span>
              </div>

            </div>
          </div>

          {/* Upsell Lógica Card */}
          <div className="bg-zinc-900/90 border border-zinc-800 rounded-2xl p-4 shadow-xl">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-orange-400" />
              Workflow de Upsell Automatizado (En Carrito)
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span><strong>Analiza:</strong> ¿Qué platos se agregaron al carrito?</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span><strong>Filtra:</strong> Busca complementarios de mayor margen.</span>
              </li>
              <li className="flex items-center gap-2 text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                <span><strong>Propone:</strong> Envia sugerencia inteligente en checkout.</span>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </section>
  );
}
