'use client';

import { useCartStore } from '@/modules/kiosk/stores/cart-store';
import { formatPrice } from '@/lib/utils';
import { t } from '@/lib/i18n';
import { X, Trash2, ShoppingBag, Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
  currency: string;
}

export function CartDrawer({ isOpen, onClose, onCheckout, currency }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotal, getItemCount } = useCartStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-white/60 backdrop-blur-sm transition-opacity animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 flex flex-col bg-slate-50 rounded-t-3xl shadow-2xl transition-transform duration-300 ease-out h-[85vh] max-h-[85vh] ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Drag handle area */}
        <div className="w-full pt-4 pb-2 flex justify-center items-center" onClick={onClose}>
          <div className="w-12 h-1.5 bg-slate-100 rounded-full" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-6 pb-4 border-b border-gray-200/50">
          <h2 className="text-xl font-bold flex items-center gap-2 text-white">
            <ShoppingBag className="w-5 h-5 brand-text" />
            {t('cart')} <span className="text-gray-400 text-base font-normal">({getItemCount()})</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-white rounded-full bg-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4 opacity-70">
              <div className="w-20 h-20 rounded-full bg-white shadow-sm flex items-center justify-center">
                <ShoppingBag className="w-10 h-10 text-gray-600" />
              </div>
              <p className="text-lg text-gray-500">{t('emptyCart')}</p>
              <button onClick={onClose} className="brand-text font-medium mt-4">
                {t('continueShopping')}
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.id} className="flex gap-4">
                  {/* Quantity Controls */}
                  <div className="flex flex-col items-center justify-between bg-white shadow-sm rounded-full py-1 w-10">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-800 hover:text-white active:scale-95"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                    <span className="font-semibold text-sm">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="w-8 h-8 flex items-center justify-center text-gray-800 hover:text-white active:scale-95"
                    >
                      {item.quantity <= 1 ? <Trash2 className="w-4 h-4 text-red-400" /> : <Minus className="w-4 h-4" />}
                    </button>
                  </div>
                  
                  {/* Item Details */}
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-base leading-tight">
                        {item.product.name}
                      </h4>
                      <span className="font-semibold text-white whitespace-nowrap ml-4">
                        {formatPrice(item.subtotal, currency)}
                      </span>
                    </div>
                    
                    {/* Modifiers */}
                    {item.selectedModifiers && item.selectedModifiers.length > 0 && (
                      <div className="mt-1 space-y-1">
                        {item.selectedModifiers.map((modGroup, idx) => (
                          <div key={idx} className="text-xs text-gray-500 leading-tight">
                            <span className="font-medium text-gray-400">{modGroup.group}: </span>
                            {modGroup.items.map(i => i.name).join(', ')}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 border-t border-gray-200/80 bg-slate-50 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.5)]">
            <div className="flex justify-between items-center mb-6">
              <span className="text-lg font-medium text-gray-500">{t('total')}</span>
              <span className="text-2xl font-bold text-gray-900">
                {formatPrice(getTotal(), currency)}
              </span>
            </div>
            
            <button
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full brand-bg hover:brightness-110 text-gray-900 font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all"
            >
              {t('checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
