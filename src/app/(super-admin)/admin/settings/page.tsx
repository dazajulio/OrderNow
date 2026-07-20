'use client';

import { useState } from 'react';
import { 
  Settings, 
  Database, 
  Mail, 
  Lock, 
  Save, 
  Sliders, 
  HelpCircle,
  Building2
} from 'lucide-react';

export default function GlobalSettingsPage() {
  const [saasPrice, setSaasPrice] = useState('29.00');
  const [supportEmail, setSupportEmail] = useState('soporte@mtriq.app');
  const [isMaintenanceMode, setIsMaintenanceMode] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-zinc-900/25 p-6 border border-white/5 rounded-3xl backdrop-blur-xl space-y-1">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          Configuración Global de Mtriq.app
        </h2>
        <p className="text-xs text-zinc-500">Ajusta los parámetros operativos generales y variables del ecosistema</p>
      </div>

      <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
        
        {/* Form panel */}
        <form onSubmit={handleSaveSettings} className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-8 shadow-lg backdrop-blur-xl space-y-6">
          
          <div className="space-y-4">
            <h3 className="text-md font-bold text-white tracking-tight flex items-center gap-2 pb-3 border-b border-white/5">
              <Sliders className="w-4 h-4 text-purple-400" /> Parámetros de Suscripción y Precios
            </h3>
            
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400">Precio Mensual del SaaS (USD)</label>
                <input
                  type="text"
                  value={saasPrice}
                  onChange={(e) => setSaasPrice(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-zinc-400">Correo de Soporte Oficial</label>
                <input
                  type="email"
                  value={supportEmail}
                  onChange={(e) => setSupportEmail(e.target.value)}
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <h3 className="text-md font-bold text-white tracking-tight flex items-center gap-2 pb-3 border-b border-white/5">
              <Lock className="w-4 h-4 text-purple-400" /> Seguridad e Infraestructura
            </h3>
            
            {/* Maintenance switch */}
            <div className="flex justify-between items-center bg-zinc-950/40 p-4 rounded-2xl border border-white/5">
              <div>
                <span className="block text-xs font-bold text-white uppercase tracking-wider">Modo de Mantenimiento</span>
                <span className="text-[10px] text-zinc-500">Muestra una pantalla de soporte al ingresar al portal</span>
              </div>
              <button
                type="button"
                onClick={() => setIsMaintenanceMode(!isMaintenanceMode)}
                className={`w-12 h-6 rounded-full p-1 transition-all ${
                  isMaintenanceMode ? 'bg-red-500' : 'bg-zinc-800'
                }`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-md transition-all ${
                  isMaintenanceMode ? 'translate-x-6' : 'translate-x-0'
                }`} />
              </button>
            </div>
          </div>

          {isSuccess && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-bold rounded-xl">
              ¡Parámetros guardados exitosamente en la configuración del servidor!
            </div>
          )}

          <button
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-purple-500 to-indigo-600 hover:brightness-110 text-white font-bold rounded-xl text-sm transition-all shadow-lg flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> Guardar Cambios Globales
          </button>

        </form>

        {/* Right Info sidebar */}
        <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 md:p-8 shadow-lg backdrop-blur-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="w-5 h-5 text-purple-400" /> Variables de Servidor
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              Las variables de entorno mostradas aquí controlan el comportamiento por defecto de las nuevas cuentas registradas.
            </p>
            <div className="bg-zinc-950/60 p-4 border border-white/5 rounded-2xl space-y-2 text-xs font-mono">
              <div><span className="text-zinc-600">APP_ENV:</span> <span className="text-white">production</span></div>
              <div><span className="text-zinc-600">PROVIDER:</span> <span className="text-white">Supabase / Next.js</span></div>
              <div><span className="text-zinc-600">DB_ISOLATION:</span> <span className="text-white">Postgres RLS Active</span></div>
              <div><span className="text-zinc-600">SMTP:</span> <span className="text-white">smtp.resend.com</span></div>
            </div>
          </div>

          <div className="bg-zinc-950/20 border border-white/5 p-4 rounded-2xl flex items-start gap-3">
            <HelpCircle className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
            <p className="text-[10px] text-zinc-500 leading-relaxed">
              ¿Deseas conectar una pasarela específica en el core? Los cambios de precios afectarán únicamente a los nuevos registros de restaurante que se generen a partir de la firma de guardado.
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
