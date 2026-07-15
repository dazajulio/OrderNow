'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Building2, CreditCard, Activity, ArrowUpRight, Lock, Key, Mail, ShieldAlert } from 'lucide-react';

export default function SuperAdminDashboard() {
  const supabase = createClient();
  
  // --- Authentication State ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // --- Dashboard Data State ---
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const restaurantId = process.env.NEXT_PUBLIC_RESTAURANT_ID || 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11';

  // --- Session persistence ---
  useEffect(() => {
    const isLogged = sessionStorage.getItem('mtriq_super_admin_logged');
    if (isLogged === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // --- Load dashboard data ---
  useEffect(() => {
    if (!isAuthenticated) return;

    async function loadData() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('restaurants')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setRestaurants(data);
      }
      setIsLoading(false);
    }

    loadData();
  }, [isAuthenticated]);

  // --- Handle Login ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoggingIn(true);

    if (email.trim().toLowerCase() !== 'dazajulio@gmail.com') {
      setErrorMsg('Usuario o contraseña incorrectos.');
      setIsLoggingIn(false);
      return;
    }

    try {
      // Fetch password from database
      const { data, error } = await supabase
        .from('restaurants')
        .select('super_admin_password')
        .eq('id', restaurantId)
        .single() as any;

      // Fallback default password is 'admin1234'
      const correctPassword = (!error && data && data.super_admin_password) 
        ? data.super_admin_password 
        : 'admin1234';

      if (password === correctPassword) {
        sessionStorage.setItem('mtriq_super_admin_logged', 'true');
        setIsAuthenticated(true);
      } else {
        setErrorMsg('Usuario o contraseña incorrectos.');
      }
    } catch (err) {
      // In case the column is completely missing and supabase client throws, fallback check
      if (password === 'admin1234') {
        sessionStorage.setItem('mtriq_super_admin_logged', 'true');
        setIsAuthenticated(true);
      } else {
        setErrorMsg('Usuario o contraseña incorrectos.');
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  // --- Render Login Gate ---
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
        {/* Background glow */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 w-full max-w-md bg-zinc-900/60 border border-white/5 p-8 rounded-3xl backdrop-blur-md space-y-8 shadow-2xl">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 bg-orange-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <Lock className="w-6 h-6 text-orange-500" />
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">Acceso Restringido</h2>
            <p className="text-zinc-500 text-sm">Ingresa las credenciales autorizadas del Super-Admin</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Correo Electrónico</label>
              <div className="relative">
                <Mail className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ejemplo@correo.com"
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 mb-2">Contraseña</label>
              <div className="relative">
                <Key className="absolute left-4 top-3.5 w-5 h-5 text-zinc-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-zinc-950/60 border border-white/5 rounded-xl py-3.5 pl-12 pr-4 text-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm"
                  required
                />
              </div>
            </div>

            {errorMsg && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs font-semibold text-red-400">
                <ShieldAlert className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full py-4 mt-6 bg-gradient-to-r from-[#FF8A3D] to-[#FF6B00] hover:brightness-110 text-white font-bold rounded-xl transition-all active:scale-[0.98] shadow-lg shadow-orange-500/10 text-sm disabled:opacity-50"
            >
              {isLoggingIn ? 'Verificando...' : 'Iniciar Sesión'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // --- Render Dashboard ---
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0C10] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin" />
      </div>
    );
  }

  const activeRestaurants = restaurants.filter(r => r.is_active);

  return (
    <div className="min-h-screen bg-[#0B0C10] text-zinc-300 p-8 font-sans space-y-8 animate-fade-in-up">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Visión Global</h2>
          <p className="text-zinc-400">Métricas principales de mtriq.app</p>
        </div>
        <button
          onClick={() => {
            sessionStorage.removeItem('mtriq_super_admin_logged');
            setIsAuthenticated(false);
          }}
          className="px-4 py-2 border border-white/10 hover:bg-white/5 text-zinc-400 hover:text-white rounded-xl text-sm font-semibold transition-all"
        >
          Cerrar Sesión
        </button>
      </div>

      {/* ── METRICS CARDS ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Building2 className="w-6 h-6 text-purple-400" />
            </div>
            <span className="flex items-center text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
              +12% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium mb-1">Tenants Activos</h3>
          <p className="text-3xl font-bold text-white">{activeRestaurants.length}</p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-cyan-500/10 rounded-xl">
              <CreditCard className="w-6 h-6 text-cyan-400" />
            </div>
            <span className="flex items-center text-xs font-medium text-green-400 bg-green-500/10 px-2 py-1 rounded-full">
              +5% <ArrowUpRight className="w-3 h-3 ml-1" />
            </span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium mb-1">MRR (Ingreso Recurrente)</h3>
          <p className="text-3xl font-bold text-white">
            ${(activeRestaurants.length * 29).toLocaleString()}
          </p>
        </div>

        <div className="bg-zinc-900/50 border border-white/5 rounded-2xl p-6 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <span className="flex items-center text-xs font-medium text-zinc-400 bg-white/5 px-2 py-1 rounded-full">
              Estable
            </span>
          </div>
          <h3 className="text-zinc-400 text-sm font-medium mb-1">Carga del Sistema</h3>
          <p className="text-3xl font-bold text-white">99.9%</p>
        </div>
      </div>

      {/* ── RECENT TENANTS TABLE ── */}
      <div className="bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Últimos Restaurantes Afiliados</h3>
          <button className="text-sm text-purple-400 hover:text-purple-300 font-medium">Ver todos</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-zinc-400 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="px-6 py-4 font-medium">Restaurante</th>
                <th className="px-6 py-4 font-medium">Identificación (Slug)</th>
                <th className="px-6 py-4 font-medium">Estatus</th>
                <th className="px-6 py-4 font-medium">Fecha de Alta</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {restaurants.slice(0, 5).map((tenant) => (
                <tr key={tenant.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                    {tenant.logo_url ? (
                      <img src={tenant.logo_url} alt={tenant.name} className="w-8 h-8 rounded-lg object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-lg bg-zinc-800 flex items-center justify-center text-xs font-bold">
                        {tenant.name.substring(0,2).toUpperCase()}
                      </div>
                    )}
                    {tenant.name}
                  </td>
                  <td className="px-6 py-4 font-mono text-zinc-400">{tenant.slug}</td>
                  <td className="px-6 py-4">
                    {tenant.is_active ? (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span>
                        Activo
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-500/10 text-red-400">
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
                        Inactivo
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-zinc-500">
                    {new Date(tenant.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {restaurants.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                    No hay restaurantes registrados aún.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
