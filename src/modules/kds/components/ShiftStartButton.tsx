'use client';

// ============================================================================
// COMPONENTE: ShiftStartButton — Desbloqueo de audio para notificaciones
// ============================================================================
// Browsers require a user gesture before playing audio. This button creates
// an AudioContext and plays a short silent buffer to unlock autoplay. After
// that, the component exposes `playNewOrderSound` via ref so the parent
// KDSBoard can trigger notification sounds on new orders.
// ============================================================================

import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
  useEffect,
} from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { cn } from '@/lib/utils';

// ----------------------------------------------------------------------------
// Types
// ----------------------------------------------------------------------------

import { useKdsStore } from '@/modules/kds/stores/kds-store';

export interface ShiftStartButtonHandle {
  playNewOrderSound: () => void;
}

// ----------------------------------------------------------------------------
// Component
// ----------------------------------------------------------------------------

export const ShiftStartButton = forwardRef<ShiftStartButtonHandle>(
  function ShiftStartButton(_props, ref) {
    const { audioContext, isUnlocked, selectedTone, setAudioContext, setTone } = useKdsStore();
    const [isLoading, setIsLoading] = useState(false);

    // Initialize tone from localStorage on mount
    useEffect(() => {
      const savedTone = localStorage.getItem('kds_alarm_tone');
      if (savedTone) {
        setTone(savedTone);
      }
    }, [setTone]);

    const handleToneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setTone(e.target.value);
    };

    // ------------------------------------------------------------------
    // Unlock audio autoplay
    // ------------------------------------------------------------------
    const unlockAudio = useCallback(async () => {
      if (isUnlocked) {
        if (window.confirm('¿Seguro que deseas desactivar el turno y dejar de recibir alertas sonoras?')) {
          if (audioContext) {
            audioContext.close();
            setAudioContext(null);
          }
        }
        return;
      }
      setIsLoading(true);

      try {
        // Create AudioContext
        const AudioCtx =
          window.AudioContext ??
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        const ctx = new AudioCtx();
        
        // Play a short silent buffer to satisfy the autoplay policy
        const buffer = ctx.createBuffer(1, 1, 22050);
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.connect(ctx.destination);
        source.start(0);

        // Resume context if suspended
        if (ctx.state === 'suspended') {
          await ctx.resume();
        }

        setAudioContext(ctx);
      } catch (err) {
        console.error('[KDS] Error unlocking audio:', err);
      } finally {
        setIsLoading(false);
      }
    }, [isUnlocked, audioContext, setAudioContext]);

    // ------------------------------------------------------------------
    // Play the notification sound via Web Audio API Oscillator
    // ------------------------------------------------------------------
    const playNewOrderSound = useCallback(() => {
      if (!audioContext || audioContext.state !== 'running') return;

      try {
        // Ring 3 times
        const numRings = 3;
        for (let i = 0; i < numRings; i++) {
          const delay = i * 0.8; // 0.8 seconds between rings
          const startTime = audioContext.currentTime + delay;
          
          const oscillator = audioContext.createOscillator();
          const gainNode = audioContext.createGain();

          // Type of beep
          oscillator.type = selectedTone === 'digital-chime' ? 'square' : selectedTone === 'soft-alert' ? 'sine' : 'triangle';
          oscillator.frequency.setValueAtTime(selectedTone === 'digital-chime' ? 880 : 523.25, startTime); // A5 or C5

          if (selectedTone === 'new-order') {
            // Classic two-tone bell
            oscillator.frequency.setValueAtTime(523.25, startTime); // C5
            oscillator.frequency.setValueAtTime(659.25, startTime + 0.15); // E5
          }

          gainNode.gain.setValueAtTime(0, startTime);
          gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.05);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.5);

          oscillator.connect(gainNode);
          gainNode.connect(audioContext.destination);

          oscillator.start(startTime);
          oscillator.stop(startTime + 0.6);
        }
      } catch (err) {
        console.warn('[KDS] Could not play notification sound:', err);
      }
    }, [selectedTone, audioContext]);

    // Expose to parent via ref
    useImperativeHandle(ref, () => ({ playNewOrderSound }), [playNewOrderSound]);

    // ------------------------------------------------------------------
    // Render
    // ------------------------------------------------------------------
    return (
      <div className="flex items-center gap-3">
        {/* Tone Selector */}
        <div className="relative group/tone hidden sm:flex">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Music className="h-4 w-4 text-zinc-500" />
          </div>
          <select
            value={selectedTone}
            onChange={handleToneChange}
            className="appearance-none bg-zinc-900 border border-zinc-800 text-zinc-300 text-sm rounded-xl pl-9 pr-8 py-2.5 outline-none hover:bg-zinc-800 focus:ring-2 focus:ring-orange-500/50 transition-colors cursor-pointer"
          >
            <option value="new-order">Campana Clásica</option>
            <option value="digital-chime">Timbre Digital</option>
            <option value="soft-alert">Alerta Suave</option>
          </select>
        </div>

        <button
          type="button"
          onClick={unlockAudio}
          disabled={isLoading}
          className={cn(
            'group relative flex items-center gap-3 rounded-xl px-6 py-3.5 text-sm font-semibold transition-all duration-300',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20',
            isUnlocked
              ? 'cursor-default bg-emerald-950/50 text-emerald-400 border border-emerald-500/30'
              : 'cursor-pointer bg-zinc-800 text-zinc-200 border border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600 active:scale-[0.98]',
            isLoading && 'opacity-70 cursor-wait'
          )}
        >
          {/* Pulsing indicator when active */}
          {isUnlocked && (
            <span className="absolute -right-1 -top-1 flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
            </span>
          )}

          {/* Icon */}
          {isUnlocked ? (
            <Volume2 className="h-5 w-5 text-emerald-400" />
          ) : (
            <VolumeX className="h-5 w-5 text-zinc-400 group-hover:text-zinc-200 transition-colors" />
          )}

          {/* Label */}
          <span>
            {isLoading
              ? 'Activando…'
              : isUnlocked
                ? 'Turno Activo ✓'
                : 'Iniciar Turno'}
          </span>
        </button>
      </div>
    );
  }
);
