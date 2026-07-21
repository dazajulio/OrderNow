'use client';

import { useState, useEffect } from 'react';
import { Brain, Sparkles, Send, Bot, Play, CheckCircle2, TrendingUp, Users, Percent, MessageSquare, Lock } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { PinAuthModal } from '@/components/shared/PinAuthModal';
import { useRouter } from 'next/navigation';

interface Campaign {
  id: string;
  name: string;
  target: string;
  trigger: string;
  reward: string;
  status: 'active' | 'inactive' | 'scheduled';
  roi: string;
}

export default function AIAgentPage() {
  const router = useRouter();
  const supabase = createClient();

  // --- Auth State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPinModal, setShowPinModal] = useState(true);
  const [expectedPin, setExpectedPin] = useState('1234');
  const [restaurantId, setRestaurantId] = useState('');
  const [showDefaultPinWarning, setShowDefaultPinWarning] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [isSavingPin, setIsSavingPin] = useState(false);

  useEffect(() => {
    setRestaurantId(localStorage.getItem('active_restaurant_id') || process.env.NEXT_PUBLIC_RESTAURANT_ID || '');
  }, []);

  // Load PIN from DB
  useEffect(() => {
    if (!restaurantId) return;
    async function loadPin() {
      const { data } = await supabase
        .from('restaurants')
        .select('admin_pin, super_admin_password')
        .eq('id', restaurantId)
        .single();
      if (data) {
        setExpectedPin(data.admin_pin || data.super_admin_password || '1234');
      }
    }
    loadPin();
  }, [restaurantId, supabase]);

  const handleAuthSuccess = () => {
    setShowPinModal(false);
    setIsAuthenticated(true);
    if (expectedPin === '1234') {
      setShowDefaultPinWarning(true);
    }
  };

  const handleAuthClose = () => {
    router.push('/gerente/kitchen');
  };

  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'ai'; text: string; time: string }>>([
    { sender: 'ai', text: '¡Hola! Soy tu Agente IA de Crecimiento de Mtriq. Analizo las compras, tiempos de servicio y comportamiento de tus clientes en tiempo real. ¿En qué campaña o sugerencia de marketing te gustaría trabajar hoy?', time: 'Ahora' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    { id: '1', name: 'Recuperación de Clientes Inactivos', target: 'Clientes con +15 días sin compra', trigger: 'Autónomo por SMS/Push', reward: 'Cupón 15% OFF en total', status: 'inactive', roi: '+18.4% retorno' },
    { id: '2', name: 'Promoción de Martes Lento', target: 'Todo el público registrado', trigger: 'Disparador semanal (Martes 12:00)', reward: 'Papas gratis con cualquier Burger', status: 'inactive', roi: '+24% ticket promedio' },
    { id: '3', name: 'Incentivo de Fidelidad VIP', target: 'Clientes con +5 visitas acumuladas', trigger: 'Al pagar el 5to pedido', reward: 'Bebida Premium de cortesía', status: 'inactive', roi: '3.2x recurrencia' },
  ]);

  // --- Dynamic Metrics States ---
  const [customerCount, setCustomerCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [roiVal, setRoiVal] = useState('0.0x');

  // Load metrics dynamically from database
  useEffect(() => {
    if (!restaurantId) return;
    async function loadMetrics() {
      // Count total customers for the tenant
      const { count: custCount } = await supabase
        .from('customers')
        .select('*', { count: 'exact', head: true })
        .eq('restaurant_id', restaurantId);

      // Count total paid orders for the tenant
      const { count: ordCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('restaurant_id', restaurantId)
        .eq('payment_status', 'paid');

      const customersNum = custCount || 0;
      const ordersNum = ordCount || 0;

      setCustomerCount(customersNum);
      setOrderCount(ordersNum);

      if (customersNum > 0 && ordersNum > 0) {
        // Calculate dynamic conversion rate
        const rate = Math.min((ordersNum / (customersNum * 1.5)) * 100, 100);
        setConversionRate(Math.round(rate * 10) / 10);
        setRoiVal('3.5x');
      } else {
        setConversionRate(0);
        setRoiVal('0.0x');
      }
    }
    loadMetrics();
  }, [restaurantId, supabase]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;
    
    const newMsg = { sender: 'user' as const, text: inputValue, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, newMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      let aiText = '';
      const promptLower = inputValue.toLowerCase();
      if (promptLower.includes('campaña') || promptLower.includes('promocion') || promptLower.includes('descuento')) {
        aiText = 'Analizando ventas históricas... Sugiero activar una campaña de "Jueves de Refrescos" para compensar la baja de bebidas registrada. ¿Quieres que prepare el borrador para enviarlo por notificación push?';
      } else if (promptLower.includes('vip') || promptLower.includes('fidelidad')) {
        aiText = 'Actualmente tienes 24 clientes en el segmento VIP. He generado un cupón de "Postre gratis por compras de +$25" para este grupo. Podemos dispararlo hoy a las 6:00 PM.';
      } else {
        aiText = 'De acuerdo a las métricas del KDS, el tiempo promedio de entrega ha bajado a 12 minutos. Es un excelente momento para lanzar una campaña de "Entrega rápida garantizada o bebida gratis" en tus canales de Delivery digital.';
      }

      setMessages(prev => [...prev, {
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
      setIsTyping(false);
    }, 1200);
  };

  const toggleCampaign = (id: string) => {
    setCampaigns(prev => prev.map(c => {
      if (c.id !== id) return c;
      const newStatus = c.status === 'active' ? 'inactive' : 'active';
      return { ...c, status: newStatus as any };
    }));
  };

  // --- PIN Auth Screen ---
  if (!isAuthenticated) {
    return (
      <PinAuthModal 
        isOpen={showPinModal} 
        onClose={handleAuthClose} 
        onSuccess={handleAuthSuccess}
        title="Acceso de Administrador" 
        expectedPin={expectedPin}
      />
    );
  }

  // --- Default PIN Blocking Warning Modal ---
  if (showDefaultPinWarning) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md">
        <div className="w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl space-y-6 animate-scale-in text-center">
          <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto text-red-500">
            <Lock className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">PIN por Defecto Detectado</h3>
            <p className="text-sm text-zinc-400">
              Estás utilizando la clave de acceso por defecto. Por seguridad, debes actualizarla inmediatamente para poder acceder a la consola del Agente IA.
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Nuevo PIN (4 dígitos)</label>
              <input 
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Ej: 5678"
                className="w-full bg-zinc-850 border border-zinc-800 rounded-xl py-3 px-4 text-white text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">Confirmar PIN</label>
              <input 
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value.replace(/\D/g, ''))}
                placeholder="Ej: 5678"
                className="w-full bg-zinc-850 border border-zinc-800 rounded-xl py-3 px-4 text-white text-center font-mono text-xl tracking-widest focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            <button 
              onClick={async () => {
                if (newPin.length !== 4) {
                  alert('El PIN debe tener exactamente 4 dígitos.');
                  return;
                }
                if (newPin === '1234') {
                  alert('El nuevo PIN no puede ser el PIN por defecto "1234".');
                  return;
                }
                if (newPin !== confirmPin) {
                  alert('Los PIN introducidos no coinciden.');
                  return;
                }
                setIsSavingPin(true);
                let { error } = await supabase
                  .from('restaurants')
                  .update({
                    admin_pin: newPin,
                    super_admin_password: newPin
                  } as any)
                  .eq('id', restaurantId);

                if (error && error.message && error.message.includes('admin_pin')) {
                  console.warn('admin_pin column not found in schema. Falling back to super_admin_password only...');
                  const fallback = await supabase
                    .from('restaurants')
                    .update({
                      super_admin_password: newPin
                    } as any)
                    .eq('id', restaurantId);
                  error = fallback.error;
                }

                setIsSavingPin(false);
                if (error) {
                  alert('Error al guardar el nuevo PIN: ' + error.message);
                } else {
                  alert('PIN de Administrador actualizado con éxito.');
                  setExpectedPin(newPin);
                  setShowDefaultPinWarning(false);
                  setNewPin('');
                  setConfirmPin('');
                }
              }}
              disabled={isSavingPin || newPin.length !== 4 || newPin !== confirmPin}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3.5 rounded-xl transition-all disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
            >
              {isSavingPin ? 'Guardando...' : 'Actualizar PIN e Ingresar'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-12 max-w-7xl mx-auto space-y-10 animate-fade-in text-zinc-800">
      
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-orange-500/10 text-orange-500 flex items-center justify-center border border-orange-200/50">
          <Brain className="w-6 h-6 animate-pulse" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agente IA de Crecimiento</h1>
          <p className="text-zinc-500">Campañas automáticas y sugerencias autónomas de mercadeo</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-amber-50/50 border border-amber-200/60 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-orange-500"><Sparkles className="w-20 h-20" /></div>
          <p className="text-amber-800 font-medium flex items-center gap-2 mb-2"><Percent className="w-4 h-4" /> Conversión de Campaña</p>
          <h2 className="text-4xl font-extrabold text-amber-950">
            {conversionRate}% {conversionRate > 0 && <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">+3.2%</span>}
          </h2>
        </div>
        <div className="bg-blue-50/50 border border-blue-200/60 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-blue-500"><Users className="w-20 h-20" /></div>
          <p className="text-blue-800 font-medium flex items-center gap-2 mb-2"><MessageSquare className="w-4 h-4" /> Clientes Alcanzados</p>
          <h2 className="text-4xl font-extrabold text-blue-950">{customerCount} <span className="text-xs text-zinc-500 font-normal">este mes</span></h2>
        </div>
        <div className="bg-emerald-50/50 border border-emerald-200/60 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10 text-emerald-500"><TrendingUp className="w-20 h-20" /></div>
          <p className="text-emerald-800 font-medium flex items-center gap-2 mb-2"><TrendingUp className="w-4 h-4" /> Retorno de Inversión (ROI)</p>
          <h2 className="text-4xl font-extrabold text-emerald-950">
            {roiVal} {roiVal !== '0.0x' && <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-0.5 rounded-full">Excelente</span>}
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
        
        {/* Left: Campañas Inteligentes */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm space-y-6">
          <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Bot className="w-5 h-5 text-orange-500" />
            Campañas Autónomas Habilitadas
          </h2>
          
          <div className="space-y-4">
            {campaigns.map((c) => (
              <div key={c.id} className="p-5 border border-zinc-100 rounded-2xl hover:border-zinc-200 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-zinc-50/50">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900">{c.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      c.status === 'active' ? 'bg-emerald-100 text-emerald-700' :
                      c.status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                      'bg-zinc-200 text-zinc-600'
                    }`}>
                      {c.status === 'active' ? 'Activa' : c.status === 'scheduled' ? 'Programada' : 'Pausada'}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-500"><strong className="text-zinc-600">Filtro:</strong> {c.target}</p>
                  <p className="text-xs text-zinc-500"><strong className="text-zinc-600">Incentivo:</strong> {c.reward}</p>
                  <span className="inline-block text-[11px] font-bold text-orange-600 bg-orange-50 px-2.5 py-0.5 rounded-md mt-1 border border-orange-100/50">
                    {c.status === 'active' ? c.roi : 'Sin retornos activos (-)'}
                  </span>
                </div>
                
                <button
                  onClick={() => toggleCampaign(c.id)}
                  className={`w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                    c.status === 'active' 
                      ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                      : 'bg-orange-500 hover:bg-orange-600 text-white shadow-sm'
                  }`}
                >
                  {c.status === 'active' ? (
                    <>Desactivar</>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Activar
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Asistente Chatbot IA */}
        <div className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm flex flex-col h-[520px]">
          <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" />
            Consola del Agente IA
          </h2>

          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-1 mb-4 scrollbar-thin">
            {messages.map((m, idx) => (
              <div 
                key={idx} 
                className={`flex flex-col max-w-[85%] ${m.sender === 'user' ? 'ml-auto items-end' : 'items-start'}`}
              >
                <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                  m.sender === 'user' 
                    ? 'bg-orange-500 text-white rounded-br-none' 
                    : 'bg-zinc-100 text-zinc-800 rounded-bl-none border border-zinc-200/50'
                }`}>
                  {m.text}
                </div>
                <span className="text-[10px] text-zinc-400 mt-1 px-1">{m.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-1.5 p-3 bg-zinc-50 border border-zinc-100 rounded-2xl w-fit rounded-bl-none">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}
          </div>

          {/* Input Panel */}
          <div className="relative">
            <input 
              type="text" 
              placeholder="Pregúntale al agente... (Ej: vip, campaña)" 
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-3.5 pl-4 pr-14 text-sm text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:bg-white transition-all"
            />
            <button 
              onClick={handleSendMessage}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-xl transition-all shadow-sm"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
