'use client';

import { useState, useEffect } from 'react';
import type { Category } from '@/types/database';
import { X, Plus, Trash2 } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaved: () => void;
  restaurantId: string;
  categories: Category[];
  productToEdit?: any;
}

interface ModifierInput {
  name: string;
  extra_price: number;
}

interface GroupInput {
  name: string;
  is_required: boolean;
  min_selections: number;
  max_selections: number;
  modifiers: ModifierInput[];
}

export function ProductFormModal({
  isOpen,
  onClose,
  onSaved,
  restaurantId,
  categories,
  productToEdit
}: ProductFormModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [groups, setGroups] = useState<GroupInput[]>([]);

  // Use useEffect to reset state when modal opens or productToEdit changes
  useEffect(() => {
    if (isOpen) {
      if (productToEdit) {
        setName(productToEdit.name || '');
        setDescription(productToEdit.description || '');
        setPrice(productToEdit.base_price || 0);
        setCategoryId(productToEdit.category_id || (categories[0]?.id || ''));
        setImageUrl(productToEdit.image_url || '');
        
        // Map groups
        if (productToEdit.modifier_groups) {
          const mappedGroups = productToEdit.modifier_groups.map((g: any) => ({
            name: g.name,
            is_required: g.is_required,
            min_selections: g.min_selections,
            max_selections: g.max_selections,
            modifiers: (g.modifiers || []).map((m: any) => ({
              name: m.name,
              extra_price: m.extra_price
            }))
          }));
          setGroups(mappedGroups);
        } else {
          setGroups([]);
        }
      } else {
        setName('');
        setDescription('');
        setPrice(0);
        setCategoryId(categories[0]?.id || '');
        setImageUrl('');
        setGroups([]);
      }
    }
  }, [isOpen, productToEdit, categories]);

  if (!isOpen) return null;

  const addGroup = () => {
    setGroups([...groups, { name: '', is_required: false, min_selections: 0, max_selections: 1, modifiers: [] }]);
  };

  const removeGroup = (idx: number) => {
    setGroups(groups.filter((_, i) => i !== idx));
  };

  const addModifier = (groupIdx: number) => {
    const newGroups = [...groups];
    newGroups[groupIdx].modifiers.push({ name: '', extra_price: 0 });
    setGroups(newGroups);
  };

  const removeModifier = (groupIdx: number, modIdx: number) => {
    const newGroups = [...groups];
    newGroups[groupIdx].modifiers = newGroups[groupIdx].modifiers.filter((_, i) => i !== modIdx);
    setGroups(newGroups);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const supabase = createClient();

    try {
      let productId = '';

      if (productToEdit) {
        // 1A. Update Product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .update({
            category_id: categoryId,
            name,
            description,
            base_price: price,
            image_url: imageUrl || null,
          })
          .eq('id', productToEdit.id)
          .select()
          .single();

        if (productError) throw productError;
        productId = productData.id;

        // Delete existing modifier groups (Cascade deletes modifiers)
        await supabase.from('modifier_groups').delete().eq('product_id', productId);
      } else {
        // 1B. Create Product
        const { data: productData, error: productError } = await supabase
          .from('products')
          .insert({
            restaurant_id: restaurantId,
            category_id: categoryId,
            name,
            description,
            base_price: price,
            image_url: imageUrl || null,
            is_available: true,
            is_featured: false
          })
          .select()
          .single();

        if (productError) throw productError;
        productId = productData.id;
      }

      // 2. Create Modifier Groups and Modifiers
      for (const group of groups) {
        const { data: groupData, error: groupError } = await supabase
          .from('modifier_groups')
          .insert({
            restaurant_id: restaurantId,
            product_id: productId,
            name: group.name,
            is_required: group.is_required,
            min_selections: group.min_selections,
            max_selections: group.max_selections
          })
          .select()
          .single();

        if (groupError) throw groupError;

        if (group.modifiers.length > 0) {
          const modifiersToInsert = group.modifiers.map(m => ({
            group_id: groupData.id,
            name: m.name,
            extra_price: m.extra_price
          }));

          const { error: modError } = await supabase
            .from('modifiers')
            .insert(modifiersToInsert);

          if (modError) throw modError;
        }
      }

      onSaved();
      onClose();
    } catch (error) {
      console.error('Error creating product:', error);
      alert('Error al crear el producto');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex justify-center items-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-zinc-900 w-full max-w-2xl rounded-2xl border border-zinc-800 max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        <div className="flex items-center justify-between p-6 border-b border-zinc-800">
          <h2 className="text-xl font-bold text-white">{productToEdit ? 'Editar Plato' : 'Añadir Nuevo Plato'}</h2>
          <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* Basic Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Información Básica</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Nombre del plato *</label>
                <input required type="text" value={name} onChange={e => setName(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Categoría *</label>
                <select required value={categoryId} onChange={e => setCategoryId(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none">
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-zinc-400 mb-1">Descripción</label>
              <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" rows={2} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-zinc-400 mb-1">Precio Base ($) *</label>
                <input required type="number" step="0.01" min="0" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>
              <div>
                <label className="block text-sm text-zinc-400 mb-1">URL de Imagen (Opcional)</label>
                <input type="url" placeholder="https://..." value={imageUrl} onChange={e => setImageUrl(e.target.value)} className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-primary outline-none" />
              </div>
            </div>
          </div>

          <div className="h-px bg-zinc-800 my-8" />

          {/* Modifiers */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">Grupos de Modificadores</h3>
              <button type="button" onClick={addGroup} className="flex items-center text-sm font-medium text-brand-primary hover:brightness-110">
                <Plus className="w-4 h-4 mr-1" />
                Añadir Grupo
              </button>
            </div>

            {groups.length === 0 && (
              <p className="text-zinc-500 text-sm">No hay grupos de modificadores. (Ej. "Elige tu término", "Extras").</p>
            )}

            {groups.map((group, groupIdx) => (
              <div key={groupIdx} className="bg-zinc-950/50 border border-zinc-800 rounded-xl p-4 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="grid grid-cols-2 gap-3 flex-1 mr-4">
                    <input required placeholder="Nombre del grupo (Ej. Salsas)" value={group.name} onChange={e => {
                      const newGroups = [...groups]; newGroups[groupIdx].name = e.target.value; setGroups(newGroups);
                    }} className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white" />
                    
                    <div className="flex items-center space-x-2">
                      <label className="text-xs text-zinc-400">Min. Selecciones</label>
                      <input type="number" min="0" value={group.min_selections} onChange={e => {
                        const newGroups = [...groups]; newGroups[groupIdx].min_selections = parseInt(e.target.value); 
                        newGroups[groupIdx].is_required = parseInt(e.target.value) > 0;
                        setGroups(newGroups);
                      }} className="w-16 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-white text-center" />
                    </div>
                    <div className="flex items-center space-x-2">
                      <label className="text-xs text-zinc-400">Max. Selecciones</label>
                      <input type="number" min="1" value={group.max_selections} onChange={e => {
                        const newGroups = [...groups]; newGroups[groupIdx].max_selections = parseInt(e.target.value); setGroups(newGroups);
                      }} className="w-16 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-1 text-white text-center" />
                    </div>
                  </div>
                  <button type="button" onClick={() => removeGroup(groupIdx)} className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="pl-4 border-l-2 border-zinc-800 space-y-2">
                  {group.modifiers.map((mod, modIdx) => (
                    <div key={modIdx} className="flex items-center space-x-2">
                      <input required placeholder="Opcion (Ej. Queso Cheddar)" value={mod.name} onChange={e => {
                        const newGroups = [...groups]; newGroups[groupIdx].modifiers[modIdx].name = e.target.value; setGroups(newGroups);
                      }} className="flex-1 bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-white text-sm" />
                      
                      <div className="flex items-center">
                        <span className="text-zinc-500 mr-2 text-sm">+$</span>
                        <input type="number" step="0.01" min="0" value={mod.extra_price} onChange={e => {
                          const newGroups = [...groups]; newGroups[groupIdx].modifiers[modIdx].extra_price = parseFloat(e.target.value); setGroups(newGroups);
                        }} className="w-20 bg-zinc-900 border border-zinc-800 rounded-lg px-2 py-2 text-white text-sm text-center" />
                      </div>
                      
                      <button type="button" onClick={() => removeModifier(groupIdx, modIdx)} className="p-1.5 text-red-500 hover:bg-red-500/10 rounded-md">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <button type="button" onClick={() => addModifier(groupIdx)} className="text-xs text-zinc-400 hover:text-white flex items-center mt-2">
                    <Plus className="w-3 h-3 mr-1" /> Añadir Opción
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>

        <div className="p-6 border-t border-zinc-800 flex justify-end gap-3 bg-zinc-900">
          <button type="button" onClick={onClose} disabled={isSubmitting} className="px-6 py-3 rounded-xl font-medium text-zinc-300 hover:bg-zinc-800 transition-colors">
            Cancelar
          </button>
          <button type="button" onClick={handleSubmit} disabled={isSubmitting} className="brand-bg px-6 py-3 rounded-xl font-bold text-white hover:brightness-110 transition-colors flex items-center disabled:opacity-50">
            {isSubmitting ? 'Guardando...' : productToEdit ? 'Guardar Cambios' : 'Crear Plato'}
          </button>
        </div>
      </div>
    </div>
  );
}
