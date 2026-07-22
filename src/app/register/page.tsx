'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CheckCircle2, 
  Loader2, 
  Building2, 
  User, 
  Phone, 
  MapPin, 
  Lock, 
  Mail, 
  Globe, 
  Sparkles,
  ChevronRight,
  TrendingUp,
  Brain,
  ChefHat,
  Bell,
  Layers,
  Printer,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

export default function RegisterPage() {
  const router = useRouter();
  
  // Registration Flow Step: 'details' | 'redirecting'
  const [step, setStep] = useState<'details' | 'redirecting'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [checkoutUrl, setCheckoutUrl] = useState('');

  // Form State
  const [formData, setFormData] = useState({
    restaurantName: '',
    contactName: '',
    phone: '',
    address: '',
    email: '',
    password: '',
    instagram: '',
    facebook: '',
    tiktok: '',
  });


  // Unique generated slug to show at the end
  const [registeredSlug, setRegisteredSlug] = useState('');

  // Form handlers
  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmitDetails = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    
    // Quick validation
    if (
      !formData.restaurantName || 
      !formData.contactName || 
      !formData.phone || 
      !formData.address || 
      !formData.email || 
      !formData.password
    ) {
      setErrorMsg('Por favor completa todos los campos requeridos.');
      return;
    }

    if (formData.password.length < 6) {
      setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setIsLoading(true);
    setStep('redirecting');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error || 'Hubo un error al registrar el restaurante.');
      }

      setRegisteredSlug(result.slug);
      setCheckoutUrl(result.checkoutUrl);

      // Redirigir automáticamente a Lemon Squeezy para pagar
      window.location.href = result.checkoutUrl;

    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Ocurrió un error inesperado. Inténtalo de nuevo.');
      setStep('details');
      setIsLoading(false);
    }
  };

  const benefits = [
    {
      icon: Layers,
      title: 'Panel Administrativo Central',
      description: 'Control de ventas, comandas de mesa y administración del menú en tiempo real.',
      color: 'text-orange-500 bg-orange-500/10 border-orange-500/20'
    },
    {
      icon: Brain,
      title: 'Agente de Crecimiento IA',
      description: 'Crea campañas inteligentes autónomas para incrementar tus ventas recurrentes un 23%.',
      color: 'text-purple-500 bg-purple-500/10 border-purple-500/20'
    },
    {
      icon: Globe,
      title: 'Sistema de Delivery Integrado',
      description: 'Tu propia web de domicilios activa las 24/7 sin pagar comisiones de apps externas.',
      color: 'text-cyan-500 bg-cyan-500/10 border-cyan-500/20'
    },
    {
      icon: TrendingUp,
      title: 'Presencia en Glubbi App',
      description: 'Aparece en el catálogo B2C exclusivo de clientes para atraer tráfico orgánico.',
      color: 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20'
    },
    {
      icon: ChefHat,
      title: 'Kitchen Display System (KDS)',
      description: 'Pantalla digital de cocina reactiva que organiza pedidos por tiempos y prioridades.',
      color: 'text-amber-500 bg-amber-500/10 border-amber-500/20'
    },
    {
      icon: Bell,
      title: 'Llamador de Mesero Digital',
      description: 'Botón de llamada física en mesa notificado de forma instantánea al personal de servicio.',
      color: 'text-rose-500 bg-rose-500/10 border-rose-500/20'
    },
    {
      icon: Printer,
      title: 'Comanda Duplicada Directa',
      description: 'Impresión inteligente por separado: ticket limpio para cocina y ticket detallado para caja.',
      color: 'text-blue-500 bg-blue-500/10 border-blue-500/20'
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-600 font-sans flex flex-col justify-between relative overflow-hidden selection:bg-orange-500/10">
      
      {/* Background Liquid Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px] pointer-events-none" />
      
      {/* Header / Logo */}
      <header className="relative z-20 max-w-7xl mx-auto px-6 w-full py-6 flex items-center justify-between border-b border-slate-200/60">
        <Link href="/" className="flex items-center gap-2 bg-white border border-slate-200 rounded-full pl-3 pr-4 py-1.5 shadow-sm hover:shadow-md hover:bg-slate-50 transition-all select-none">
          <img src="/logo-mtriq.png" alt="Mtriq Logo" className="w-5 h-5 object-contain" />
          <span className="text-sm font-black tracking-tight text-slate-900">
            mtriq<span className="text-orange-500">.app</span>
          </span>
        </Link>
        <span className="text-xs text-slate-400 font-medium">SaaS Multi-tenant v1.1</span>
      </header>

      {/* Main Grid */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 w-full py-10 grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-stretch flex-1">
        
        {/* LEFT COLUMN: Registration & Multi-step Form */}
        <div className="bg-white border border-slate-200/80 p-6 md:p-10 rounded-3xl flex flex-col justify-start gap-y-6 shadow-xl shadow-slate-200/40 relative overflow-hidden">
          
          {/* Progress Indicators */}
          <div className="flex items-center gap-2 mb-2 select-none">
            <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              step === 'details' 
                ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' 
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}>
              1. Datos del local
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className={`text-xs font-bold px-3 py-1 rounded-full border transition-all ${
              step === 'redirecting' 
                ? 'bg-orange-500/10 text-orange-600 border-orange-500/20' 
                : 'bg-slate-100 text-slate-400 border-slate-200'
            }`}>
              2. Pago seguro
            </span>
            <ChevronRight className="w-4 h-4 text-slate-300" />
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-slate-100 text-slate-400 border-slate-200">
              3. Activación
            </span>
          </div>

          {/* Visual Process Flow (Steps Graphics) */}
          {step !== 'success' && (
            <div className="grid grid-cols-3 gap-3 bg-gradient-to-r from-orange-50/40 via-white to-purple-50/40 p-4 rounded-2xl border border-orange-100/60 text-center select-none animate-fade-in shadow-sm">
              <div className="space-y-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                  step === 'details' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-400 border border-slate-200/80'
                }`}>
                  🏢
                </div>
                <span className={`block text-[10px] font-bold uppercase tracking-wider ${step === 'details' ? 'text-slate-800' : 'text-slate-400'}`}>1. Configura</span>
                <span className="block text-[8.5px] text-slate-400 leading-tight">Nombre y contacto</span>
              </div>
              <div className="space-y-1 border-x border-orange-100/50">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mx-auto text-xs font-bold transition-all ${
                  step === 'redirecting' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'bg-slate-100 text-slate-400 border border-slate-200/80'
                }`}>
                  💳
                </div>
                <span className={`block text-[10px] font-bold uppercase tracking-wider ${step === 'redirecting' ? 'text-slate-800' : 'text-slate-400'}`}>2. Activa</span>
                <span className="block text-[8.5px] text-slate-400 leading-tight">$29/mes cancelable</span>
              </div>
              <div className="space-y-1">
                <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-400 border border-slate-200/80 flex items-center justify-center mx-auto text-xs font-bold">
                  🚀
                </div>
                <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">3. Despega</span>
                <span className="block text-[8.5px] text-slate-400 leading-tight">Accede al Dashboard</span>
              </div>
            </div>
          )}

          {/* Form Content */}
          <div className="w-full">
            
            {/* STEP 1: Details */}
            {step === 'details' && (
              <form onSubmit={handleSubmitDetails} className="space-y-5">
                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Crea tu cuenta de Restaurante</h1>
                  <p className="text-slate-400 text-sm">Completa el formulario. Te redirigimos al pago seguro en segundos.</p>
                </div>

                {errorMsg && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-xs font-semibold">
                    {errorMsg}
                  </div>
                )}

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-orange-500" /> Nombre del local *
                    </label>
                    <input 
                      name="restaurantName" 
                      value={formData.restaurantName}
                      onChange={handleFormChange}
                      required 
                      placeholder="Ej: Tu Restaurante" 
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-orange-500" /> Nombre de contacto *
                    </label>
                    <input 
                      name="contactName" 
                      value={formData.contactName}
                      onChange={handleFormChange}
                      required 
                      placeholder="Ej: Tu Nombre Completo" 
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-orange-500" /> Teléfono *
                    </label>
                    <input 
                      name="phone" 
                      value={formData.phone}
                      onChange={handleFormChange}
                      required 
                      placeholder="Ej: +1 555-0199" 
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-500" /> Dirección del local *
                    </label>
                    <input 
                      name="address" 
                      value={formData.address}
                      onChange={handleFormChange}
                      required 
                      placeholder="Ej: Av. Principal N° 124" 
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Auth Details */}
                <div className="pt-2 border-t border-slate-100 grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-orange-500" /> Email de acceso *
                    </label>
                    <input 
                      type="email"
                      name="email" 
                      value={formData.email}
                      onChange={handleFormChange}
                      required 
                      placeholder="ejemplo@correo.com" 
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Lock className="w-3.5 h-3.5 text-orange-500" /> Contraseña *
                    </label>
                    <input 
                      type="password"
                      name="password" 
                      value={formData.password}
                      onChange={handleFormChange}
                      required 
                      placeholder="Mínimo 6 caracteres" 
                      className="w-full bg-slate-50/60 border border-slate-200 rounded-xl px-4 py-3 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-colors text-sm"
                    />
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-2 border-t border-slate-100 space-y-3">
                  <label className="text-xs font-bold text-slate-700 block">Redes Sociales (Opcional)</label>
                  <div className="grid sm:grid-cols-3 gap-3">
                    <div className="relative">
                      <InstagramIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input 
                        name="instagram" 
                        value={formData.instagram}
                        onChange={handleFormChange}
                        placeholder="Instagram" 
                        className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-xs"
                      />
                    </div>
                    <div className="relative">
                      <FacebookIcon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input 
                        name="facebook" 
                        value={formData.facebook}
                        onChange={handleFormChange}
                        placeholder="Facebook" 
                        className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-xs"
                      />
                    </div>
                    <div className="relative">
                      <span className="text-[10px] font-black text-slate-400 absolute left-3.5 top-3.5">🎵</span>
                      <input 
                        name="tiktok" 
                        value={formData.tiktok}
                        onChange={handleFormChange}
                        placeholder="TikTok" 
                        className="w-full bg-slate-50/60 border border-slate-200 rounded-xl pl-10 pr-3 py-2.5 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-orange-500 transition-colors text-xs"
                      />
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-4 flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl h-14 text-base transition-all shadow-[0_4px_20px_rgba(249,115,22,0.2)] active:scale-[0.99] disabled:opacity-60"
                >
                  {isLoading ? (
                    <><Loader2 className="w-5 h-5 animate-spin" /> Creando cuenta...</>
                  ) : (
                    <>Continuar al pago seguro <ChevronRight className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            )}

            {/* STEP 2: Redirecting to Lemon Squeezy */}
            {step === 'redirecting' && (
              <div className="text-center space-y-8 py-8 animate-fade-in">
                <div className="w-20 h-20 bg-orange-500/10 border border-orange-500/20 rounded-full flex items-center justify-center mx-auto">
                  <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
                </div>

                <div className="space-y-2">
                  <h1 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">Redirigiendo al pago seguro...</h1>
                  <p className="text-slate-500 text-sm max-w-xs mx-auto">
                    Tu cuenta ha sido creada. Te llevamos a Lemon Squeezy para completar tu suscripción de $29/mes.
                  </p>
                </div>

                <div className="bg-orange-50/60 border border-orange-100 rounded-2xl p-4 text-left space-y-2 text-xs text-slate-600 max-w-sm mx-auto">
                  <div className="flex items-center gap-2 font-semibold text-slate-800">
                    <ShieldCheck className="w-4 h-4 text-orange-500" /> Pago 100% seguro
                  </div>
                  <p>Procesado por <strong>Lemon Squeezy</strong>. Mtriq nunca almacena datos de tu tarjeta.</p>
                </div>

                {checkoutUrl && (
                  <a
                    href={checkoutUrl}
                    className="inline-flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-semibold underline underline-offset-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Haz clic aquí si no fuiste redirigido
                  </a>
                )}
              </div>
            )}

            {/* STEP 3: Handled by /success page after payment */}

          </div>

          <div className="mt-8 pt-4 border-t border-slate-200/60 flex justify-between items-center text-xs text-slate-400 select-none">
            <span>Mtriq Secure Checkout</span>
            <span>Garantía de Cancelación 24/7</span>
          </div>

        </div>

        {/* RIGHT COLUMN: Ecosystem Checklist & Benefits */}
        <div className="bg-slate-50/40 border border-slate-200/80 p-6 md:p-10 rounded-3xl flex flex-col justify-between shadow-lg relative overflow-hidden">
          
          <div className="space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 bg-orange-500/10 text-orange-600 border border-orange-500/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
                <Sparkles className="w-3.5 h-3.5" /> Todo incluido
              </div>
              <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight leading-tight">
                Accede al Ecosistema Completo de Crecimiento
              </h2>
              <p className="text-sm text-slate-500 mt-2">
                Con tu suscripción mensual, tu negocio se impulsa con herramientas avanzadas sin comisiones ocultas.
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon;
                return (
                  <div key={index} className="flex gap-4 p-4 bg-white border border-slate-200/60 rounded-2xl shadow-sm hover:shadow hover:border-slate-300 transition-all duration-150 group">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 border ${benefit.color} group-hover:scale-105 transition-transform`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <h3 className="text-sm font-bold text-slate-900">{benefit.title}</h3>
                      <p className="text-xs text-slate-500 leading-relaxed">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-8 p-4 bg-white rounded-2xl border border-orange-200/60 shadow-sm select-none">
            <span className="text-lg font-black text-slate-800 block mb-1">Monto único de $29/mes</span>
            <p className="text-xs text-slate-500 leading-relaxed">
              No es contrato obligatorio. Puedes no renovar el mes si así lo decides. Tienes total flexibilidad y control sobre tu suscripción.
            </p>
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-20 py-6 border-t border-slate-200/60 text-center text-xs text-slate-400 w-full select-none">
        &copy; {new Date().getFullYear()} Mtriq.app. Todos los derechos reservados.
      </footer>
    </div>
  );
}
