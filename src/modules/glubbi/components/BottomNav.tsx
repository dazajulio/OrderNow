'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Tag, Heart, User } from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Inicio', href: '/glubbi', icon: Home },
    { name: 'Ofertas', href: '/glubbi/ofertas', icon: Tag },
    { name: 'Favoritos', href: '/glubbi/favoritos', icon: Heart },
    { name: 'Cuenta', href: '/glubbi/cuenta', icon: User },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-6 py-3 flex justify-between items-center z-50 pb-safe">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link 
            key={item.name} 
            href={item.href}
            className={`flex flex-col items-center gap-1 ${isActive ? 'text-orange-500' : 'text-gray-400 hover:text-gray-600'} transition-colors`}
          >
            <Icon className={`w-6 h-6 ${isActive ? 'fill-orange-500/10' : ''}`} strokeWidth={isActive ? 2.5 : 2} />
            <span className={`text-[10px] font-medium ${isActive ? 'font-bold' : ''}`}>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
