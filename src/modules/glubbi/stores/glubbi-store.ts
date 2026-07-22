import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GlubbiCustomer {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface GlubbiState {
  customer: GlubbiCustomer | null;
  setCustomer: (customer: GlubbiCustomer) => void;
  clearCustomer: () => void;
}

export const useGlubbiStore = create<GlubbiState>()(
  persist(
    (set) => ({
      customer: null,
      setCustomer: (customer) => set({ customer }),
      clearCustomer: () => set({ customer: null }),
    }),
    {
      name: 'glubbi-session',
    }
  )
);
