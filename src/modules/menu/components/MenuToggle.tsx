'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Product, Category } from '@/types/database';
import { formatPrice } from '@/lib/utils';
import { Search, UtensilsCrossed, Plus } from 'lucide-react';
import { ProductFormModal } from './ProductFormModal';
import { DragDropContext, Droppable, DropResult } from '@hello-pangea/dnd';
import { ProductRow } from './ProductRow';

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
    if (prods) {
      // Ensure products are sorted by order_index
      const sorted = [...prods].sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
      setProducts(sorted);
    }
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
      .update({ is_available: newValue } as any)
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
      .update({ is_available: newValue } as any)
      .eq('id', modifierId);

    if (error) {
      console.error(error);
    }
  };

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;
    if (source.droppableId !== destination.droppableId) return; // Only allow reorder inside same category

    const categoryId = source.droppableId;
    const categoryProducts = products.filter(p => p.category_id === categoryId).sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
    const otherProducts = products.filter(p => p.category_id !== categoryId);

    // Reorder array
    const [movedItem] = categoryProducts.splice(source.index, 1);
    categoryProducts.splice(destination.index, 0, movedItem);

    // Update index locally
    const updatedCategoryProducts = categoryProducts.map((p, index) => ({
      ...p,
      order_index: index,
    }));

    setProducts([...otherProducts, ...updatedCategoryProducts]);

    // Persist to db (fire and forget for snappy UX)
    for (let i = 0; i < updatedCategoryProducts.length; i++) {
      const prod = updatedCategoryProducts[i];
      supabase.from('products').update({ order_index: i } as any).eq('id', prod.id).then(({ error }) => {
        if (error) console.error('Failed to save order for', prod.id, error);
      });
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading && products.length === 0) {
    return <div className="p-8 flex justify-center"><div className="w-8 h-8 border-4 border-zinc-800 border-t-orange-500 rounded-full animate-spin"></div></div>;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
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
          className="brand-bg hover:brightness-110 text-white rounded-2xl px-6 py-4 font-bold flex items-center justify-center transition-all w-full sm:w-auto flex-shrink-0 whitespace-nowrap shadow-lg shadow-orange-500/20"
        >
          <Plus className="w-5 h-5 mr-2" />
          Añadir Plato
        </button>
      </div>

      {/* Categories */}
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="space-y-8">
          {categories.map(category => {
            const categoryProducts = filteredProducts
              .filter(p => p.category_id === category.id)
              .sort((a, b) => (a.order_index || 0) - (b.order_index || 0));
              
            if (categoryProducts.length === 0) return null;

            return (
              <div key={category.id} className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="bg-zinc-800/50 px-6 py-5 flex items-center gap-3 border-b border-zinc-800">
                  <UtensilsCrossed className="w-5 h-5 text-orange-500" />
                  <h2 className="text-xl font-bold text-white">{category.name}</h2>
                  <span className="ml-auto text-sm text-zinc-500 font-medium">{categoryProducts.length} productos</span>
                </div>
                
                <Droppable droppableId={category.id}>
                  {(provided) => (
                    <div 
                      {...provided.droppableProps} 
                      ref={provided.innerRef}
                      className="divide-y divide-zinc-800/50 min-h-[50px]"
                    >
                      {categoryProducts.map((product, index) => (
                        <ProductRow 
                          key={product.id}
                          product={product}
                          index={index}
                          onEdit={(prod) => {
                            setProductToEdit(prod);
                            setIsModalOpen(true);
                          }}
                          onDelete={deleteProduct}
                          onToggleProduct={toggleProduct}
                          onToggleModifier={toggleModifier}
                        />
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            );
          })}
        </div>
      </DragDropContext>

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
