'use client';

import { useEffect, useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Bell } from 'lucide-react';

interface WaiterCall {
  id: string;
  table_id: string;
  status: string;
  tables?: { name: string; number: string };
}

export function WaiterNotificationBell() {
  const [calls, setCalls] = useState<WaiterCall[]>([]);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Fallback to process.env
  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID || '';

  const playSound = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      const playChime = (startTime: number) => {
        const osc = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, startTime); // A5
        osc.frequency.exponentialRampToValueAtTime(440, startTime + 0.5);
        
        gainNode.gain.setValueAtTime(0, startTime);
        gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 1);
        
        osc.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        
        osc.start(startTime);
        osc.stop(startTime + 1);
      };

      // Play two chimes
      playChime(audioCtx.currentTime);
      playChime(audioCtx.currentTime + 0.3);
      
    } catch (e) {
      console.log('Audio blocked', e);
    }
  };

  useEffect(() => {
    if (!restaurantId) return;
    const supabase = createClient();

    // Cargar llamadas pendientes iniciales
    const loadCalls = async () => {
      const { data } = await supabase
        .from('waiter_calls')
        .select('*, tables(name, number)')
        .eq('restaurant_id', restaurantId)
        .eq('status', 'pending');
        
      if (data && data.length > 0) {
         // Transform data
         setCalls(data as unknown as WaiterCall[]);
      }
    };
    
    loadCalls();

    const channel = supabase
      .channel('waiter-calls')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'waiter_calls',
          filter: `restaurant_id=eq.${restaurantId}`
        },
        async (payload) => {
          if (payload.new.status === 'pending') {
             // Fetch table info
             const { data: tableData } = await supabase
               .from('tables')
               .select('name, number')
               .eq('id', payload.new.table_id)
               .single();
               
             const newCall: WaiterCall = {
                id: payload.new.id,
                table_id: payload.new.table_id,
                status: payload.new.status,
                tables: tableData as { name: string; number: string }
             };
             
             setCalls(prev => [...prev, newCall]);
             playSound();
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'waiter_calls',
          filter: `restaurant_id=eq.${restaurantId}`
        },
        (payload) => {
          if (payload.new.status === 'resolved') {
             setCalls(prev => prev.filter(c => c.id !== payload.new.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [restaurantId]);

  const acceptCall = async (callId: string) => {
    const supabase = createClient();
    // Update local state optimistically
    setCalls(prev => prev.filter(c => c.id !== callId));
    
    // Update DB
    await supabase
      .from('waiter_calls')
      .update({ status: 'resolved', resolved_at: new Date().toISOString() })
      .eq('id', callId);
  };

  if (calls.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-zinc-900 border-2 border-orange-500 rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl shadow-orange-500/20 transform animate-bounce-in">
        <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Bell className="w-10 h-10 text-orange-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">¡Llamado de Mesero!</h2>
        <p className="text-xl text-zinc-300 mb-8">
          La {calls[0].tables?.name || `Mesa ${calls[0].tables?.number || 'Desconocida'}`} requiere atención.
        </p>
        
        <button 
          onClick={() => acceptCall(calls[0].id)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-lg transition-colors active:scale-95 shadow-lg shadow-orange-500/30"
        >
          Aceptar
        </button>
        
        {calls.length > 1 && (
          <p className="text-sm text-zinc-500 mt-4">
            + {calls.length - 1} llamado(s) pendiente(s)
          </p>
        )}
      </div>
    </div>
  );
}
