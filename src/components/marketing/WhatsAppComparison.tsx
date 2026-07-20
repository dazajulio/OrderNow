import { XCircle, CheckCircle2, LayoutDashboard, Zap, ShieldAlert, BarChart3 } from 'lucide-react';

export function WhatsAppComparison() {
  return (
    <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Header Section */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-xs font-bold mb-6 border border-red-100 uppercase tracking-wider">
            <ShieldAlert className="w-3.5 h-3.5" />
            La realidad del mercado
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight">
            El 90% de los restaurantes
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-orange-500">
              operan a ciegas por WhatsApp. Tú no.
            </span>
          </h2>
          <p className="text-lg text-slate-600 mt-6 leading-relaxed">
            Atender pedidos por chat manual es la forma más rápida de perder ventas. ¿Te suena familiar?
          </p>
        </div>

        {/* COMPARATIVE GRAPHS GRID */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-16">
          
          {/* LADO DE WHATSAPP (EL DOLOR) */}
          <div className="bg-rose-50/50 border border-rose-100 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-rose-200 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-black text-rose-700">El Caos de WhatsApp</span>
                <span className="text-3xl">❌</span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-3.5 items-start">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-rose-900 block font-bold text-base mb-0.5">Tasa de abandono alta</strong>
                    Clientes esperando más de 10 minutos una respuesta básica de menú o precios.
                  </p>
                </div>
                <div className="flex gap-3.5 items-start">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-rose-900 block font-bold text-base mb-0.5">Menú en PDF que nadie lee</strong>
                    Archivos pesados de 20MB obsoletos que requieren hacer zoom continuo para leerlos.
                  </p>
                </div>
                <div className="flex gap-3.5 items-start">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-rose-900 block font-bold text-base mb-0.5">Respuestas tardías</strong>
                    Mesas desatendidas porque el personal está ocupado respondiendo el teléfono de la sucursal.
                  </p>
                </div>
                <div className="flex gap-3.5 items-start">
                  <XCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-rose-900 block font-bold text-base mb-0.5">Caos administrativo</strong>
                    Comandas en trozos de papel arrugados, cuentas mal sumadas y tickets perdidos.
                  </p>
                </div>
              </div>
            </div>

            {/* Chat Mockup Graphic */}
            <div className="mt-8 bg-white border border-rose-100 rounded-2xl p-4 flex flex-col gap-2 shadow-sm">
              <div className="flex gap-2 items-start">
                <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px]">👨</div>
                <div className="bg-slate-100 rounded-lg p-2 max-w-[80%] text-[10px] text-slate-700">
                  Hola, ¿tienen la Burger Master? ¿Me mandan el PDF del menú?
                </div>
              </div>
              <div className="flex gap-2 items-start justify-end">
                <div className="bg-emerald-100 rounded-lg p-2 max-w-[80%] text-[10px] text-slate-700">
                  Hola! Disculpe la demora. Sí, claro, aquí va el archivo de 18MB... 📎
                </div>
                <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center text-[10px] text-white">🍔</div>
              </div>
              <p className="text-[9px] text-rose-500 text-center font-bold mt-2">⏳ 14 minutos transcurridos — Cliente frustrado</p>
            </div>
          </div>

          {/* LADO DE MTRIQ (LA SOLUCION) */}
          <div className="bg-orange-50/40 border border-orange-100 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group hover:border-orange-200 transition-colors">
            <div>
              <div className="flex items-center justify-between mb-8">
                <span className="text-2xl font-black text-orange-600">Automatización Mtriq</span>
                <span className="text-3xl">✅</span>
              </div>

              <div className="space-y-5">
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-orange-950 block font-bold text-base mb-0.5">Automatización total</strong>
                    El menú interactivo responde inmediatamente cargándose en menos de 1 segundo.
                  </p>
                </div>
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-orange-950 block font-bold text-base mb-0.5">Control de comandas KDS</strong>
                    Recibe la orden directamente en tu dashboard, sin pasos intermedios ni transcripción.
                  </p>
                </div>
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-orange-950 block font-bold text-base mb-0.5">Pagos integrados al instante</strong>
                    Procesa cobros en mesa o pasarela y envía la orden confirmada directo a cocina.
                  </p>
                </div>
                <div className="flex gap-3.5 items-start">
                  <CheckCircle2 className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <p className="text-slate-700 text-sm leading-relaxed">
                    <strong className="text-orange-950 block font-bold text-base mb-0.5">Base de datos de por vida</strong>
                    Cada orden guarda la ficha del cliente de forma segura para remarketing inteligente.
                  </p>
                </div>
              </div>
            </div>

            {/* Mtriq Active Order Graphic */}
            <div className="mt-8 bg-white border border-orange-100 rounded-2xl p-4 flex justify-between items-center shadow-sm">
              <div className="flex gap-3 items-center">
                <div className="w-9 h-9 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold text-sm">
                  #05
                </div>
                <div>
                  <p className="text-[10px] font-extrabold text-slate-800">Mesa 5: Pedido Recibido</p>
                  <p className="text-[8px] text-slate-500">1x Burger Master, 1x Papas Trufadas</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 border border-emerald-100 px-1.5 py-0.5 rounded">PAGADO (STRIPE)</span>
                <span className="text-[8px] text-slate-400">⚡ Enviado a cocina</span>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM FEATURE: TU DASHBOARD DE COMANDO */}
        <div className="bg-slate-900 rounded-[2rem] p-8 md:p-12 text-white flex flex-col lg:flex-row gap-12 items-center relative overflow-hidden shadow-2xl">
          <div className="absolute right-0 bottom-0 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex-1">
            <div className="flex items-center gap-2 text-orange-400 font-bold text-sm mb-4">
              <LayoutDashboard className="w-4 h-4" />
              CONSOLA CENTRALIZADA
            </div>
            <h3 className="text-2xl md:text-3xl font-black mb-4 tracking-tight leading-tight">
              Tu Dashboard de Comando
            </h3>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
              Controla cada pedido en tiempo real. Sin errores de transcripción, sin perder clientes por lentitud en la atención ni malentendidos telefónicos. Si puedes leer un pedido, puedes vender el doble.
            </p>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-zinc-800/50 border border-zinc-700/40 p-4 rounded-xl">
                <p className="text-zinc-400 text-[10px] font-bold uppercase">Precisión en Pedidos</p>
                <p className="text-2xl font-bold text-white mt-1">100%</p>
                <p className="text-[9px] text-zinc-500 mt-1">Cero errores de transcripción</p>
              </div>
              <div className="bg-zinc-800/50 border border-zinc-700/40 p-4 rounded-xl">
                <p className="text-zinc-400 text-[10px] font-bold uppercase">Velocidad Promedio</p>
                <p className="text-2xl font-bold text-orange-400 mt-1">&lt; 3 seg</p>
                <p className="text-[9px] text-zinc-500 mt-1">Desde mesa hasta KDS de cocina</p>
              </div>
            </div>
          </div>

          {/* Simple Visual Console Graphic */}
          <div className="w-full lg:w-[380px] bg-slate-950 border border-zinc-800 rounded-2xl p-4 flex flex-col gap-3.5 shadow-inner">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-[10px] font-black text-zinc-400 tracking-wider">CONSOLA REALTIME</span>
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </div>

            <div className="space-y-2">
              {/* Order Row 1 */}
              <div className="flex items-center justify-between bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                <div className="flex gap-2 items-center">
                  <span className="text-[9px] font-extrabold bg-orange-500/10 text-orange-400 px-1.5 py-0.5 rounded">Mesa 10</span>
                  <span className="text-[9.5px] text-zinc-300">1x Smash Cheeseburger</span>
                </div>
                <span className="text-[8px] text-zinc-500">Recibido hace 12s</span>
              </div>
              {/* Order Row 2 */}
              <div className="flex items-center justify-between bg-zinc-900/60 p-2.5 rounded-lg border border-zinc-800/60">
                <div className="flex gap-2 items-center">
                  <span className="text-[9px] font-extrabold bg-blue-500/10 text-blue-400 px-1.5 py-0.5 rounded">Mesa 02</span>
                  <span className="text-[9.5px] text-zinc-300">2x Limonada Rosa, 1x Papas</span>
                </div>
                <span className="text-[8px] text-zinc-500">Recibido hace 1m</span>
              </div>
            </div>

            <div className="flex gap-3 justify-between mt-1 pt-2 border-t border-zinc-900">
              <div className="flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-[9px] text-zinc-400">Total hoy: <strong>$1,245.00</strong></span>
              </div>
              <div className="flex items-center gap-1">
                <Zap className="w-3.5 h-3.5 text-orange-500" />
                <span className="text-[9px] text-zinc-400">Conversión: <strong>+35%</strong></span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
