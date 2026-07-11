'use client';

import { useState } from 'react';
import { Plus, Star } from 'lucide-react';
import { cn, formatPrice } from '@/lib/utils';
import { t } from '@/lib/i18n';
import type { Product } from '@/types/database';

// ============================================================================
// PROPS
// ============================================================================

interface ProductCardProps {
  product: Product;
  onAdd: (product: Product) => void;
  currency: string;
}

// ============================================================================
// COMPONENT
// ============================================================================

export default function ProductCard({ product, onAdd, currency }: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleAdd = () => {
    onAdd(product);
  };

  return (
    <article
      className={cn(
        'group relative bg-white rounded-2xl overflow-hidden',
        'shadow-sm hover:shadow-lg transition-shadow duration-300',
        'border border-gray-100'
      )}
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        {product.image_url && !imageError ? (
          <>
            {/* Blur placeholder */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 animate-pulse" />
            )}
            <img
              src={product.image_url}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
              className={cn(
                'w-full h-full object-cover transition-all duration-500',
                'group-hover:scale-105',
                imageLoaded ? 'opacity-100' : 'opacity-0'
              )}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
            <span className="text-4xl opacity-30">🍽️</span>
          </div>
        )}

        {/* Popular Badge */}
        {product.is_featured && (
          <div
            className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold text-white shadow-lg"
            style={{ backgroundColor: 'var(--brand-primary, #2563eb)' }}
          >
            <Star className="w-3 h-3 fill-current" />
            <span>Popular</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-3.5">
        {/* Name */}
        <h3 className="text-[15px] font-bold text-gray-900 leading-tight">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="mt-1 text-xs text-gray-500 leading-relaxed line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price + Add Button Row */}
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="text-base font-bold text-gray-900">
            {formatPrice(product.base_price, currency)}
          </span>

          <button
            onClick={handleAdd}
            className={cn(
              'flex items-center gap-1.5 rounded-full px-4 py-2',
              'text-xs font-semibold text-white',
              'transition-all duration-200',
              'active:scale-95 hover:brightness-110',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1',
              'shadow-md'
            )}
            style={{
              backgroundColor: 'var(--brand-primary, #2563eb)',
              boxShadow: '0 4px 12px color-mix(in srgb, var(--brand-primary, #2563eb) 35%, transparent)',
            }}
            aria-label={`${t('addToCart')}: ${product.name}`}
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span>{t('upsellAdd')}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
