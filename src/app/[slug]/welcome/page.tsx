import { createServerSupabaseClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChefHat, QrCode, Settings, ArrowRight, Store, Image as ImageIcon } from 'lucide-react';
import { HeaderLogo } from '@/components/shared/HeaderLogo'; // If available, or create locally.

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
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 relative overflow-hidden">
      {/* Background Blobs for elegance */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-4xl relative z-10 space-y-12 animate-fade-in">
        
        {/* Header Section */}
        <div className="text-center space-y-6 flex flex-col items-center">
          <div className="w-24 h-24 rounded-3xl bg-white border border-gray-100 shadow-xl shadow-gray-200/50 flex items-center justify-center overflow-hidden">
            {restaurant.logo_url ? (
              <img src={restaurant.logo_url} alt="Logo" className="w-full h-full object-contain p-2" />
            ) : (
              <div className="flex flex-col items-center justify-center text-gray-300">
                <ImageIcon className="w-8 h-8 mb-1" />
                <span className="text-[10px] font-medium uppercase tracking-widest text-center leading-tight">Tu Logo<br/>Aquí</span>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <h1 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tight">
              ¡Bienvenido a <span className="text-orange-500">{restaurant.name}</span>!
            </h1>
            <p className="text-gray-500 text-lg max-w-xl mx-auto">
              Tu ecosistema gastronómico está listo. Hemos preparado tu portal maestro para que tengas el control total de tu operación.
            </p>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Main Action (Gerente) - Span full width on md */}
          <Link 
            href={`/${slug}/gerente/settings`}
            className="md:col-span-2 group relative bg-white border border-orange-200 rounded-3xl p-8 shadow-2xl shadow-orange-500/10 hover:shadow-orange-500/20 transition-all duration-300 overflow-hidden transform hover:-translate-y-1"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/5 rounded-bl-full transition-all group-hover:bg-orange-500/10" />
            <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider animate-pulse">
              Paso 1 Recomendado
            </div>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-orange-500 flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                <Settings className="w-8 h-8 text-white" />
              </div>
              
              <div className="flex-1 space-y-2">
                <h2 className="text-2xl font-bold text-slate-900">Panel de Configuración</h2>
                <p className="text-gray-500">
                  Entra aquí primero. Sube tu menú, configura tus mesas, ajusta tus datos financieros y prepara todo para recibir a tus clientes.
                </p>
              </div>
              
              <div className="flex items-center gap-2 text-orange-500 font-bold bg-orange-50 px-5 py-3 rounded-xl group-hover:bg-orange-500 group-hover:text-white transition-colors">
                Entrar al Panel <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Secondary Action 1 (KDS) */}
          <Link 
            href={`/${slug}/cocina`}
            className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ChefHat className="w-6 h-6 text-blue-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Monitor de Cocina (KDS)</h3>
            <p className="text-gray-500 text-sm mb-6">
              Pantalla para recibir comandas en tiempo real. Ábrela en una tableta en tu cocina.
            </p>
            <span className="text-blue-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Abrir Monitor <ArrowRight className="w-4 h-4" />
            </span>
          </Link>

          {/* Secondary Action 2 (Kiosko) */}
          <Link 
            href={`/${slug}`}
            className="group bg-white border border-gray-200 rounded-3xl p-8 hover:border-emerald-300 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <QrCode className="w-6 h-6 text-emerald-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Kiosko Digital / Menú</h3>
            <p className="text-gray-500 text-sm mb-6">
              El portal de tus clientes. Donde escanearán el código QR y realizarán sus pedidos.
            </p>
            <span className="text-emerald-500 font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
              Ver Menú <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
        
        {/* Footer info */}
        <div className="text-center pt-8">
          <p className="text-xs text-gray-400">
            Puedes regresar a este portal en cualquier momento ingresando a <span className="font-mono text-gray-600 bg-gray-100 px-1 py-0.5 rounded">mtriq.app/{slug}/welcome</span>
          </p>
        </div>

      </div>
    </div>
  );
}
