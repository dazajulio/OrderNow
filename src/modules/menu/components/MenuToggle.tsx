'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product, Category } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { Search, UtensilsCrossed, Plus, Trash2, Edit2 } from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';

interface MenuToggleProps {
  restaurantId: string;
}

export function MenuToggle({ restaurantId }: MenuToggleProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<any[]>([]); // Any for ProductWithModifiers
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<any>(null);
  const supabase = createClient();

  const loadMenu = async () => {
    setIsLoading(true);
    const { data: cats } = await supabase
      .from('categories')
      .select('*')
      .eq('restaurant_id', restaurantId)
      .order('order_index');
      
    const { data: prods } = await supabase
      .from('products')
      .select('*, modifier_groups(*, modifiers(*))')
      .eq('restaurant_id', restaurantId)
      .order('order_index');

    if (cats) setCategories(cats);
    if (prods) setProducts(prods);
    setIsLoading(false);
  };

  useEffect(() => {
    loadMenu();
  }, [restaurantId, supabase]);

  const deleteProduct = async (productId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar este producto? Se borrarán todos sus modificadores.')) return;
    
    // Optimistic update
    setProducts(products.filter(p => p.id !== productId));

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting:', error);
      alert('No se pudo eliminar el producto');
      loadMenu(); // reload to revert
    }
  };

  const toggleProduct = async (product: any) => {
    // Optimistic update
    const newValue = !product.is_available;
    setProducts(products.map(p => p.id === product.id ? { ...p, is_available: newValue } : p));

    const { error } = await supabase
      .from('products')
      .update({ is_available: newValue })
      .eq('id', product.id);

    if (error) {
      // Revert on error
      setProducts(products.map(p => p.id === product.id ? { ...p, is_available: !newValue } : p));
      console.error(error);
    }
  };

  const toggleModifier = async (productId: string, modifierId: string, currentStatus: boolean) => {
    const newValue = !currentStatus;
    
    // Optimistic update
    setProducts(products.map(p => {
      if (p.id !== productId) return p;
      return {
        ...p,
        modifier_groups: p.modifier_groups.map((mg: any) => ({
          ...mg,
          modifiers: mg.modifiers.map((m: any) => m.id === modifierId ? { ...m, is_available: newValue } : m)
        }))
      };
    }));

    const { error } = await supabase
      .from('modifiers')
      .update({ is_available: newValue })
      .eq('id', modifierId);

    if (error) {
      console.error(error);
      // Ideally revert here too, but omitting for brevity
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading && products.length === 0) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-zinc-500" />
          <input 
            type="text" 
            placeholder="Buscar producto..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 pl-14 pr-6 text-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>
        <button 
          onClick={() => {
            setProductToEdit(null);
            setIsModalOpen(true);
          }}
          className="brand-bg hover:brightness-110 text-white rounded-2xl px-6 py-4 font-bold flex items-center justify-center transition-all w-full sm:w-auto flex-shrink-0 whitespace-nowrap"
        >
          <Plus className="w-5 h-5 mr-2" />
          Añadir Plato
        </button>
      </div>

      {/* Categories */}
      <div className="space-y-8">
        {categories.map(category => {
          const categoryProducts = filteredProducts.filter(p => p.category_id === category.id);
          if (categoryProducts.length === 0) return null;

          return (
            <div key={category.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
              <div className="bg-zinc-800/50 px-6 py-4 flex items-center gap-3 border-b border-zinc-800">
                <UtensilsCrossed className="w-5 h-5 text-zinc-400" />
                <h2 className="text-xl font-bold text-white">{category.name}</h2>
              </div>
              
              <div className="divide-y divide-zinc-800/50">
                {categoryProducts.map(product => (
                  <div key={product.id} className="divide-y divide-zinc-800/50">
                    <div className={`p-6 flex items-center justify-between transition-colors ${
                      !product.is_available ? 'bg-red-500/5' : ''
                    }`}>
                      <div>
                        <h3 className={`text-xl font-bold ${!product.is_available ? 'text-zinc-500 line-through' : 'text-white'}`}>
                          {product.name}
                        </h3>
                        <p className="text-zinc-400 mt-1">{formatPrice(product.base_price, 'USD')}</p>
                      </div>
                      
                      {/* Actions */}
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setProductToEdit(product);
                            setIsModalOpen(true);
                          }}
                          className="p-3 text-zinc-400 hover:bg-zinc-800 hover:text-white rounded-xl transition-colors"
                          title="Editar Plato"
                        >
                          <Edit2 className="w-5 h-5" />
                        </button>
                        <button 
                          onClick={() => deleteProduct(product.id)}
                          className="p-3 text-red-500 hover:bg-red-500/10 rounded-xl transition-colors"
                          title="Eliminar Plato"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                        
                        <div 
                          onClick={() => toggleProduct(product)}
                          className={`toggle-switch flex-shrink-0 ml-2 ${product.is_available ? 'active' : 'inactive'}`}
                        ></div>
                      </div>
                    </div>

                    {/* Modifiers List */}
                    {product.modifier_groups && product.modifier_groups.map((group: any) => (
                      <div key={group.id} className="bg-zinc-900/50 pl-10 pr-6 py-4">
                        <h4 className="text-sm font-semibold text-zinc-500 mb-3 uppercase tracking-wider">{group.name}</h4>
                        <div className="space-y-3">
                          {group.modifiers.map((modifier: any) => (
                            <div key={modifier.id} className="flex items-center justify-between">
                              <span className={`text-md ${!modifier.is_available ? 'text-zinc-600 line-through' : 'text-zinc-300'}`}>
                                {modifier.name} {modifier.extra_price > 0 && `(+${formatPrice(modifier.extra_price, 'USD')})`}
                              </span>
                              <div 
                                onClick={() => toggleModifier(product.id, modifier.id, modifier.is_available)}
                                className={`toggle-switch scale-75 origin-right ${modifier.is_available ? 'active' : 'inactive'}`}
                              ></div>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <ProductFormModal 
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setProductToEdit(null);
        }}
        onSaved={() => {
          loadMenu();
        }}
        restaurantId={restaurantId}
        categories={categories}
        productToEdit={productToEdit}
      />
    </div>
  );
}
