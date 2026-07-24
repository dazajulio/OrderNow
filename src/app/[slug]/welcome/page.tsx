import { createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChefHat, QrCode, Settings, ArrowRight, Image as ImageIcon } from 'lucide-react';

interface WelcomePageProps {
  params: Promise<{ slug: string }>;
}

export const dynamic = 'force-dynamic';

export default async function WelcomePage({ params }: WelcomePageProps) {
  const { slug } = await params;
  const supabase = await createServerSupabaseClient();
  
  // Validate that the restaurant exists
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id, name, logo_url')
    .eq('slug', slug)
    .single();

  if (!restaurant) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6 relative overflow-hidden text-slate-200">
      
      {/* High Impact Dark Hero Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Deep dark mesh gradient effect */}
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-orange-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[20%] right-[20%] w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-4xl relative z-10 space-y-12 animate-fade-in pt-8 pb-12">
        
        {/* Header Section */}
        <div className="text-center space-y-6 flex flex-col items-center">
          <div className="w-28 h-28 rounded-[2rem] bg-slate-900 border border-slate-800 shadow-2xl flex items-center justify-center overflow-hidden ring-4 ring-slate-900/50">
            {restaurant.logo_url ? (
              <img src={restaurant.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500">
                <ImageIcon className="w-10 h-10 mb-1" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-center leading-tight">Tu Logo<br/>Aquí</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white">
              Bienvenido a <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{restaurant.name}</span>
            </h1>
            <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
              Tu ecosistema operativo ha sido desplegado. Este es tu portal maestro para gestionar y operar tu restaurante al máximo nivel.
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Main Action (Gerente) - Span full width on md */}
          <Link 
            href={`/${slug}/gerente`}
            className="md:col-span-2 group relative bg-slate-900/50 backdrop-blur-xl border border-orange-500/30 rounded-[2rem] p-8 shadow-2xl hover:bg-slate-900/80 transition-all duration-500 overflow-hidden transform hover:-translate-y-1"
          >
            {/* Glowing orb behind the card */}
            <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-[80px] -translate-y-1/2 pointer-events-none group-hover:bg-orange-500/30 transition-colors" />
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 relative z-10">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/25">
                <Settings className="w-10 h-10 text-white" />
              </div>
              
              <div className="flex-1 space-y-3 pr-8">
                <h2 className="text-3xl font-bold text-white tracking-tight">Panel de Gerente</h2>
                <p className="text-slate-400 text-base leading-relaxed">
                  Configura la base de tu negocio. Sube tu menú, ajusta tus finanzas, crea los códigos QR de tus mesas y visualiza tus reportes de ventas.
                </p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center gap-2 text-white font-bold bg-white/10 hover:bg-white/20 px-6 py-4 rounded-xl backdrop-blur-sm transition-colors border border-white/5">
                Entrar a Configurar <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Secondary Action 1 (KDS) */}
          <Link 
            href={`/${slug}/cocina`}
            className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-8 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full transition-all group-hover:bg-blue-500/10 pointer-events-none" />
            
            <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ChefHat className="w-7 h-7 text-blue-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Monitor de Cocina</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              El corazón operativo (KDS). Visualiza y gestiona las comandas entrantes en tiempo real desde la cocina.
            </p>
            <span className="text-blue-400 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
              Abrir Monitor <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Secondary Action 2 (Kiosko) */}
          <Link 
            href={`/${slug}`}
            className="group relative bg-slate-900/40 backdrop-blur-md border border-slate-800/60 rounded-[2rem] p-8 hover:bg-slate-900/60 hover:border-slate-700 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-bl-full transition-all group-hover:bg-emerald-500/10 pointer-events-none" />
            
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Kiosko Digital</h3>
            <p className="text-slate-400 text-sm mb-8 leading-relaxed">
              El menú inteligente. La interfaz que verán tus clientes al escanear el QR para realizar sus pedidos y pagos.
            </p>
            <span className="text-emerald-400 font-semibold text-sm flex items-center gap-1.5 group-hover:gap-2 transition-all">
              Ver Menú Público <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
        
        {/* Footer info */}
        <div className="text-center pt-10">
          <p className="text-sm text-slate-500 font-light">
            Guarda este portal maestro en tus favoritos: <br/>
            <span className="font-mono text-slate-300 font-medium mt-2 inline-block">glubbi.app/{slug}/welcome</span>
          </p>
        </div>

      </div>
    </div>
  );
}
