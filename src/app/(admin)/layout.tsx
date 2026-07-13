'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { ChefHat, UtensilsCrossed, QrCode, ClipboardList, BarChart3 } from 'lucide-react';
import { WaiterNotificationBell } from './components/WaiterNotificationBell';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [restaurantName, setRestaurantName] = useState('Cargando...');
  const [restaurantLogo, setRestaurantLogo] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRestaurant() {
      const supabase = createClient();
      const { data } = await supabase
        .from('restaurants')
        .select('name, logo_url')
        .eq('is_active', true)
        .single();
      
      if (data) {
        setRestaurantName(data.name);
        setRestaurantLogo(data.logo_url);
      } else {
        setRestaurantName('Dashboard');
      }
    }
    fetchRestaurant();
  }, []);

  const links = [
    { href: '/admin/kitchen', label: 'Cocina', icon: ChefHat },
    { href: '/admin/menu', label: 'Menú', icon: UtensilsCrossed },
    { href: '/admin/history', label: 'Registro', icon: ClipboardList },
    { href: '/admin/settings', label: 'Administrador', icon: BarChart3 },
    { href: '/admin/qr', label: 'Códigos QR', icon: QrCode },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 flex flex-col md:flex-row">
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 border-r border-zinc-800 bg-zinc-950 p-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-xl bg-orange-500 flex items-center justify-center shadow-lg shadow-orange-500/20 overflow-hidden shrink-0">
            {restaurantLogo ? (
              <img src={restaurantLogo} alt="Logo" className="w-full h-full object-cover" />
            ) : (
              <ChefHat className="w-6 h-6 text-white" />
            )}
          </div>
          <div className="min-w-0">
            <h1 className="font-bold text-white text-lg leading-tight truncate">{restaurantName}</h1>
            <span className="text-xs text-zinc-500 truncate block">Dashboard</span>
          </div>
        </div>
        
        <nav className="space-y-2 flex-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'bg-orange-500/10 text-orange-500 font-medium' 
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-orange-500' : 'text-zinc-500'}`} />
                {link.label}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-zinc-900 min-h-screen overflow-y-auto pb-20 md:pb-0 relative">
        <WaiterNotificationBell />
        {children}
      </main>

      {/* Bottom Nav (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 border-t border-zinc-800 bg-zinc-950 pb-safe z-50">
        <nav className="flex justify-around p-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center p-2 rounded-lg min-w-[72px] ${
                  isActive ? 'text-orange-500' : 'text-zinc-400'
                }`}
              >
                <Icon className="w-6 h-6 mb-1" />
                <span className="text-[10px] font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
