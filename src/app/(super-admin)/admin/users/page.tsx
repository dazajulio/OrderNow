'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { 
  Users, 
  Search, 
  Building2, 
  MapPin, 
  ShieldCheck, 
  ShieldAlert, 
  UserCheck, 
  Filter, 
  Briefcase 
} from 'lucide-react';

export default function UsersPage() {
  const supabase = createClient();

  const [members, setMembers] = useState<any[]>([]);
  const [restaurants, setRestaurants] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // --- Filters State ---
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  // --- Load Data ---
  async function loadData() {
    setIsLoading(true);
    
    // Fetch restaurants for dropdown
    const { data: restData } = await supabase.from('restaurants').select('id, name');
    if (restData) {
      setRestaurants(restData);
    }

    try {
      // 1. Try secure RPC to get members with email addresses
      const { data, error } = await supabase.rpc('get_super_admin_members');
      
      if (!error && data) {
        setMembers(data);
      } else {
        throw new Error(error?.message || 'RPC returned error');
      }
    } catch (err) {
      console.warn('get_super_admin_members RPC failed. Using fallback queries.', err);
      
      // 2. Fallback: Query restaurant_members directly (emails will be hidden)
      const { data, error } = await supabase
        .from('restaurant_members')
        .select(`
          id,
          user_id,
          display_name,
          role,
          is_active,
          created_at,
          restaurant_id,
          restaurants (
            name,
            address
          )
        `) as any;

      if (!error && data) {
        const mapped = data.map((m: any) => ({
          member_id: m.id,
          user_id: m.user_id,
          display_name: m.display_name,
          email: '🔐 Oculto (Corre SQL Setup)',
          role: m.role,
          is_active: m.is_active,
          created_at: m.created_at,
          restaurant_id: m.restaurant_id,
          restaurant_name: m.restaurants?.name || 'Desconocido',
          restaurant_address: m.restaurants?.address || ''
        }));
        setMembers(mapped);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    loadData();
  }, []);

  // --- Helper to extract city from address ---
  const extractCity = (address: string) => {
    if (!address) return 'N/A';
    const parts = address.split(',');
    // Often city is the last part or second to last
    if (parts.length > 1) {
      return parts[parts.length - 1].trim();
    }
    return address.substring(0, 15);
  };

  // --- Filter Logic ---
  const filteredMembers = members.filter(m => {
    const matchesSearch = 
      m.display_name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      m.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRestaurant = selectedRestaurantId === '' || m.restaurant_id === selectedRestaurantId;
    const matchesRole = selectedRole === '' || m.role === selectedRole;
    
    const matchesCity = cityFilter === '' || 
      (m.restaurant_address && m.restaurant_address.toLowerCase().includes(cityFilter.toLowerCase()));

    return matchesSearch && matchesRestaurant && matchesRole && matchesCity;
  });

  return (
    <div className="space-y-6 font-sans">
      
      {/* Header */}
      <div className="bg-white shadow-md p-6 border border-gray-200 rounded-3xl backdrop-blur-xl space-y-1">
        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
          Control Global de Usuarios
        </h2>
        <p className="text-xs text-gray-400">Lista y filtra los gerentes y operarios registrados en todas las cuentas</p>
      </div>

      {/* Filters Bar */}
      <div className="bg-white shadow-md border border-gray-200 rounded-3xl p-6 shadow-lg backdrop-blur-xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Search */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Buscar por nombre o correo</label>
          <div className="relative">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50/60 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

        {/* Restaurant Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filtrar por Restaurante</label>
          <div className="relative">
            <Building2 className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <select
              value={selectedRestaurantId}
              onChange={(e) => setSelectedRestaurantId(e.target.value)}
              className="w-full bg-slate-50/60 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="">Todos los locales</option>
              {restaurants.map(r => (
                <option key={r.id} value={r.id}>{r.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Role Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filtrar por Rol</label>
          <div className="relative">
            <Briefcase className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-slate-50/60 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-orange-500 appearance-none cursor-pointer"
            >
              <option value="">Todos los roles</option>
              <option value="owner">Dueño (Owner)</option>
              <option value="manager">Gerente (Manager)</option>
              <option value="kitchen">Cocina (Kitchen)</option>
              <option value="cashier">Cajero (Cashier)</option>
              <option value="staff">Personal (Staff)</option>
            </select>
          </div>
        </div>

        {/* City Filter */}
        <div className="space-y-1.5">
          <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Filtrar por Ciudad / Dirección</label>
          <div className="relative">
            <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Ej: Bogotá, Mérida..."
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              className="w-full bg-slate-50/60 border border-gray-200 rounded-xl py-2 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-orange-500"
            />
          </div>
        </div>

      </div>

      {/* Users Table */}
      <div className="bg-white shadow-md border border-gray-200 rounded-3xl overflow-hidden shadow-lg backdrop-blur-xl">
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-3 border-gray-200 border-t-purple-500 rounded-full animate-spin mx-auto mb-4" />
            <span className="text-gray-400 text-xs font-bold uppercase tracking-wider">Cargando personal...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-gray-400 uppercase text-[9px] tracking-wider font-bold">
                <tr>
                  <th className="px-6 py-4">Usuario</th>
                  <th className="px-6 py-4">Correo Electrónico</th>
                  <th className="px-6 py-4">Rol</th>
                  <th className="px-6 py-4">Restaurante</th>
                  <th className="px-6 py-4">Ciudad (Sede)</th>
                  <th className="px-6 py-4 text-center">Estatus</th>
                  <th className="px-6 py-4 text-center">Fecha de Alta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-gray-800">
                {filteredMembers.map((member) => {
                  let roleLabel = member.role;
                  let roleColor = 'bg-slate-100 text-gray-500 border-gray-200';
                  
                  if (member.role === 'owner') {
                    roleLabel = 'Propietario';
                    roleColor = 'bg-orange-500/10 text-orange-500 border-orange-500/20';
                  } else if (member.role === 'manager') {
                    roleLabel = 'Gerente';
                    roleColor = 'bg-blue-500/10 text-blue-400 border-blue-500/20';
                  } else if (member.role === 'kitchen') {
                    roleLabel = 'Cocina';
                    roleColor = 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                  } else if (member.role === 'cashier') {
                    roleLabel = 'Caja';
                    roleColor = 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
                  }

                  return (
                    <tr key={member.member_id} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-orange-500/20 to-orange-500/20 flex items-center justify-center text-xs font-bold text-gray-900 border border-gray-200">
                          {member.display_name.substring(0, 2).toUpperCase()}
                        </div>
                        {member.display_name}
                      </td>
                      <td className="px-6 py-4 font-mono text-gray-500 text-xs">
                        {member.email}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded border text-[10px] font-bold uppercase tracking-wider ${roleColor}`}>
                          {roleLabel}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-semibold text-gray-800">
                        {member.restaurant_name}
                      </td>
                      <td className="px-6 py-4 text-gray-500 font-mono text-xs">
                        {extractCity(member.restaurant_address)}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {member.is_active ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                            Activo
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-500/10 text-red-400 border border-red-500/20">
                            Inactivo
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-gray-400 font-mono text-xs">
                        {new Date(member.created_at).toLocaleDateString()}
                      </td>
                    </tr>
                  );
                })}
                {filteredMembers.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-gray-400">
                      No se encontraron usuarios que coincidan con los filtros.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}
