'use client';

import { useState, useEffect } from 'react';
import { Lock, X, Delete } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PinAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  title?: string;
  expectedPin?: string; // Por defecto '1234'
}

export function PinAuthModal({
  isOpen,
  onClose,
  onSuccess,
  title = 'Ingrese PIN de Autorización',
  expectedPin = '1234'
}: PinAuthModalProps) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPin('');
      setError(false);
    }
  }, [isOpen]);

  // Handle pin input
  const handleInput = (digit: string) => {
    if (pin.length >= 4) return;
    const newPin = pin + digit;
    setPin(newPin);
    setError(false);

    // Check if complete
    if (newPin.length === 4) {
      if (newPin === expectedPin) {
        setTimeout(onSuccess, 150); // Pequeño delay visual
      } else {
        setError(true);
        setTimeout(() => setPin(''), 500); // Limpiar y agitar
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
    setError(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-sm bg-zinc-900 border border-zinc-800 rounded-3xl shadow-2xl overflow-hidden animate-scale-in">
        
        {/* Header */}
        <div className="p-6 text-center border-b border-zinc-800/80">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-zinc-400 hover:text-white rounded-full hover:bg-zinc-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="w-12 h-12 mx-auto bg-zinc-800 rounded-full flex items-center justify-center mb-3 text-orange-500">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          <p className="text-sm text-zinc-400 mt-1">Nivel de Seguridad Administrativo</p>
        </div>

        {/* PIN Display */}
        <div className="p-6 pb-2">
          <div className={`flex justify-center gap-4 ${error ? 'animate-shake' : ''}`}>
            {[0, 1, 2, 3].map((i) => (
              <div 
                key={i}
                className={cn(
                  'w-14 h-16 rounded-xl flex items-center justify-center text-2xl font-bold transition-all',
                  pin[i] 
                    ? 'bg-zinc-800 text-white border-2 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.2)]' 
                    : 'bg-zinc-950 text-transparent border border-zinc-800',
                  error && 'border-red-500/50 shadow-[0_0_15px_rgba(239,68,68,0.2)] bg-red-500/10'
                )}
              >
                {pin[i] ? '•' : ''}
              </div>
            ))}
          </div>
          {error && <p className="text-red-400 text-sm text-center mt-3 animate-fade-in">PIN incorrecto</p>}
        </div>

        {/* Numpad */}
        <div className="p-6 pt-4">
          <div className="grid grid-cols-3 gap-3">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
              <button
                key={num}
                onClick={() => handleInput(num.toString())}
                className="h-14 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xl font-semibold text-white transition-colors active:scale-95"
              >
                {num}
              </button>
            ))}
            <div />
            <button
              onClick={() => handleInput('0')}
              className="h-14 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-xl font-semibold text-white transition-colors active:scale-95"
            >
              0
            </button>
            <button
              onClick={handleDelete}
              className="h-14 rounded-xl bg-zinc-800/50 hover:bg-zinc-700 text-zinc-400 hover:text-white flex items-center justify-center transition-colors active:scale-95"
            >
              <Delete className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
