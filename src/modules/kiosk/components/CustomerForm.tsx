'use client';

import { useState } from 'react';
import { User, Mail, Phone, ChevronRight, MapPin, Compass } from 'lucide-react';
import { isValidEmail } from '@/lib/utils';
import { t } from '@/lib/i18n';

interface CustomerData {
  name: string;
  email: string;
  phone?: string;
  address?: string;
  reference?: string;
}

interface CustomerFormProps {
  onSubmit: (data: CustomerData) => void;
  isLoading?: boolean;
  isDelivery?: boolean;
}

export function CustomerForm({ onSubmit, isLoading, isDelivery = false }: CustomerFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [errors, setErrors] = useState<{name?: string; email?: string; phone?: string; address?: string; reference?: string}>({});

  const validate = () => {
    const newErrors: {name?: string; email?: string; phone?: string; address?: string; reference?: string} = {};
    if (!name.trim()) newErrors.name = 'Requerido';
    if (!email.trim()) newErrors.email = 'Requerido';
    else if (!isValidEmail(email)) newErrors.email = 'Email inválido';
    
    if (isDelivery) {
      if (!phone.trim()) newErrors.phone = 'Teléfono requerido para delivery';
      if (!address.trim()) newErrors.address = 'Dirección exacta requerida';
      if (!reference.trim()) newErrors.reference = 'Punto de referencia requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSubmit({ 
        name, 
        email, 
        phone: phone || undefined, 
        address: isDelivery ? address : undefined, 
        reference: isDelivery ? reference : undefined 
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto space-y-5 animate-fade-in">
      <div className="space-y-4">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1.5 ml-1">
            {t('name')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (errors.name) setErrors({...errors, name: undefined});
              }}
              className={`block w-full pl-11 pr-4 py-3.5 bg-white shadow-sm border rounded-xl text-slate-900 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all ${
                errors.name ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Ej. Tu Nombre Completo"
              disabled={isLoading}
            />
          </div>
          {errors.name && <p className="text-xs text-red-400 mt-1 ml-1">{errors.name}</p>}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-medium text-gray-500 mb-1.5 ml-1">
            {t('email')} <span className="text-red-400">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors({...errors, email: undefined});
              }}
              className={`block w-full pl-11 pr-4 py-3.5 bg-white shadow-sm border rounded-xl text-slate-900 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all ${
                errors.email ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="tu@correo.com"
              disabled={isLoading}
            />
          </div>
          {errors.email && <p className="text-xs text-red-400 mt-1 ml-1">{errors.email}</p>}
        </div>

        {/* Phone Field */}
        <div className="pt-2">
          <div className="flex justify-between items-end mb-1.5 ml-1 mr-1">
            <label className="block text-sm font-medium text-gray-500">
              {t('phone')} {isDelivery && <span className="text-red-400">*</span>}
            </label>
            {!isDelivery && (
              <span className="text-xs bg-slate-100 text-gray-800 px-2 py-0.5 rounded-full">
                {t('optional')}
              </span>
            )}
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="tel"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                if (errors.phone) setErrors({...errors, phone: undefined});
              }}
              className={`block w-full pl-11 pr-4 py-3.5 bg-white shadow-sm border rounded-xl text-slate-900 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              }`}
              placeholder="Ej. +58 412 123 4567"
              disabled={isLoading}
            />
          </div>
          {errors.phone && <p className="text-xs text-red-400 mt-1 ml-1">{errors.phone}</p>}
          {!isDelivery && (
            <p className="text-xs text-gray-400 mt-2 ml-1">
              ✨ {t('affiliatePrompt')}
            </p>
          )}
        </div>

        {/* Delivery Address fields */}
        {isDelivery && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5 ml-1">
                Dirección Exacta de Entrega <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute top-3.5 left-4 pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <textarea
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (errors.address) setErrors({...errors, address: undefined});
                  }}
                  className={`block w-full pl-11 pr-4 py-3.5 bg-white shadow-sm border rounded-xl text-slate-900 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all min-h-[80px] ${
                    errors.address ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Ej. Calle 3, Casa #15-A, Sector Las Tapias"
                  disabled={isLoading}
                />
              </div>
              {errors.address && <p className="text-xs text-red-400 mt-1 ml-1">{errors.address}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-500 mb-1.5 ml-1">
                Punto de Referencia <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Compass className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => {
                    setReference(e.target.value);
                    if (errors.reference) setErrors({...errors, reference: undefined});
                  }}
                  className={`block w-full pl-11 pr-4 py-3.5 bg-white shadow-sm border rounded-xl text-slate-900 placeholder-zinc-500 focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500 transition-all ${
                    errors.reference ? 'border-red-500' : 'border-gray-200'
                  }`}
                  placeholder="Ej. A 50 metros del Centro Comercial Rodeo Plaza"
                  disabled={isLoading}
                />
              </div>
              {errors.reference && <p className="text-xs text-red-400 mt-1 ml-1">{errors.reference}</p>}
            </div>
          </>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full mt-6 brand-bg hover:brightness-110 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
        ) : (
          <>
            Continuar al Pago
            <ChevronRight className="w-5 h-5" />
          </>
        )}
      </button>
    </form>
  );
}
