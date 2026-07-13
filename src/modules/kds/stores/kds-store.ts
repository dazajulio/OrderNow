import { create } from 'zustand';

interface KdsState {
  audioContext: AudioContext | null;
  isUnlocked: boolean;
  selectedTone: string;
  setAudioContext: (ctx: AudioContext | null) => void;
  setTone: (tone: string) => void;
}

export const useKdsStore = create<KdsState>((set) => ({
  audioContext: null,
  isUnlocked: false,
  selectedTone: 'new-order',
  setAudioContext: (ctx) => set({ audioContext: ctx, isUnlocked: !!ctx }),
  setTone: (tone) => {
    set({ selectedTone: tone });
    if (typeof window !== 'undefined') {
      localStorage.setItem('kds_alarm_tone', tone);
    }
  },
}));
