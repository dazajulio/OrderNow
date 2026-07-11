'use client';

import { useRef, useEffect, useCallback } from 'react';
import {
  UtensilsCrossed,
  Beef,
  Fish,
  Salad,
  Pizza,
  Sandwich,
  Coffee,
  Wine,
  Beer,
  IceCream,
  Cake,
  Cookie,
  Soup,
  Egg,
  Flame,
  Leaf,
  Star,
  type LucideIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Category } from '@/types/database';

// ============================================================================
// ICON MAP — Maps icon string from DB to Lucide component
// ============================================================================

const iconMap: Record<string, LucideIcon> = {
  utensils: UtensilsCrossed,
  beef: Beef,
  fish: Fish,
  salad: Salad,
  pizza: Pizza,
  sandwich: Sandwich,
  coffee: Coffee,
  wine: Wine,
  beer: Beer,
  icecream: IceCream,
  cake: Cake,
  cookie: Cookie,
  soup: Soup,
  egg: Egg,
  flame: Flame,
  leaf: Leaf,
  star: Star,
};

// ============================================================================
// PROPS
// ============================================================================

interface CategoryNavProps {
  categories: Category[];
  activeId: string;
  onSelect: (id: string) => void;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function CategoryNav({ categories, activeId, onSelect }: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLButtonElement>>(new Map());

  // Scroll the active pill into view when activeId changes
  useEffect(() => {
    const activeButton = itemRefs.current.get(activeId);
    if (activeButton && scrollRef.current) {
      const container = scrollRef.current;
      const scrollLeft = activeButton.offsetLeft - container.offsetWidth / 2 + activeButton.offsetWidth / 2;
      container.scrollTo({ left: scrollLeft, behavior: 'smooth' });
    }
  }, [activeId]);

  const setItemRef = useCallback((id: string) => (el: HTMLButtonElement | null) => {
    if (el) {
      itemRefs.current.set(id, el);
    } else {
      itemRefs.current.delete(id);
    }
  }, []);

  if (categories.length === 0) return null;

  return (
    <nav
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm"
      role="tablist"
      aria-label="Category navigation"
    >
      <div
        ref={scrollRef}
        className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((category) => {
          const isActive = category.id === activeId;
          const IconComponent = category.icon ? iconMap[category.icon.toLowerCase()] : null;

          return (
            <button
              key={category.id}
              ref={setItemRef(category.id)}
              role="tab"
              aria-selected={isActive}
              onClick={() => onSelect(category.id)}
              className={cn(
                'flex items-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium',
                'transition-all duration-200 ease-out snap-start shrink-0',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
                isActive
                  ? 'text-white shadow-md scale-[1.02]'
                  : 'bg-gray-50 text-gray-600 hover:bg-gray-100 active:scale-95'
              )}
              style={
                isActive
                  ? {
                      backgroundColor: 'var(--brand-primary, #2563eb)',
                      boxShadow: '0 4px 14px color-mix(in srgb, var(--brand-primary, #2563eb) 40%, transparent)',
                    }
                  : undefined
              }
            >
              {IconComponent && (
                <IconComponent
                  className={cn('w-4 h-4 shrink-0', isActive ? 'text-white' : 'text-gray-400')}
                />
              )}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
