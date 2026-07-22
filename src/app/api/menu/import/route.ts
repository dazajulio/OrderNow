import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  try {
    const { restaurantId, items } = await request.json();

    if (!restaurantId || !items || !Array.isArray(items)) {
      return NextResponse.json({ success: false, error: 'Datos inválidos' }, { status: 400 });
    }

    const supabaseAdmin = createAdminClient();

    // 1. Obtener categorías existentes del restaurante
    const { data: existingCategories, error: catError } = await supabaseAdmin
      .from('categories')
      .select('id, name')
      .eq('restaurant_id', restaurantId);

    if (catError) throw catError;

    const categoryMap = new Map<string, string>();
    existingCategories?.forEach(c => categoryMap.set(c.name.trim().toLowerCase(), c.id));

    // 2. Procesar e insertar nuevas categorías si es necesario
    const uniqueIncomingCategories = Array.from(new Set(items.map((i: any) => i.Categoria?.trim()).filter(Boolean)));
    
    let orderIndexCat = existingCategories?.length || 0;

    for (const catName of uniqueIncomingCategories) {
      const normalizedName = String(catName).trim().toLowerCase();
      if (!categoryMap.has(normalizedName)) {
        // Create new category
        const { data: newCat, error: insertCatError } = await supabaseAdmin
          .from('categories')
          .insert({
            restaurant_id: restaurantId,
            name: String(catName).trim(),
            order_index: orderIndexCat++
          })
          .select('id')
          .single();

        if (insertCatError) throw insertCatError;
        categoryMap.set(normalizedName, newCat.id);
      }
    }

    // 3. Obtener productos existentes para establecer el order_index y evitar duplicados básicos
    const { data: existingProducts, error: prodError } = await supabaseAdmin
      .from('products')
      .select('id, name, order_index')
      .eq('restaurant_id', restaurantId);

    if (prodError) throw prodError;

    const existingProductNames = new Set(existingProducts?.map(p => p.name.trim().toLowerCase()));
    let orderIndexProd = existingProducts?.length ? Math.max(...existingProducts.map(p => p.order_index)) + 1 : 0;

    // 4. Preparar inserción de productos
    const productsToInsert = [];

    for (const item of items) {
      const catName = String(item.Categoria || '').trim().toLowerCase();
      const prodName = String(item.Nombre || '').trim();
      const normalizedProdName = prodName.toLowerCase();
      
      const priceStr = String(item.Precio || '0').replace(',', '.');
      const price = parseFloat(priceStr);

      if (!catName || !prodName || isNaN(price)) continue; // Saltamos filas inválidas

      // Evitamos duplicados exactos por nombre (opcional, pero buena práctica en imports)
      if (existingProductNames.has(normalizedProdName)) continue;

      const categoryId = categoryMap.get(catName);
      if (!categoryId) continue;

      productsToInsert.push({
        restaurant_id: restaurantId,
        category_id: categoryId,
        name: prodName,
        description: item.Descripcion || null,
        base_price: price,
        image_url: item.Url_Imagen || null,
        is_available: true,
        order_index: orderIndexProd++,
      });

      existingProductNames.add(normalizedProdName); // Añadir para no duplicar dentro del mismo batch
    }

    if (productsToInsert.length > 0) {
      const { error: insertProdError } = await supabaseAdmin
        .from('products')
        .insert(productsToInsert);

      if (insertProdError) throw insertProdError;
    }

    return NextResponse.json({ 
      success: true, 
      importedCount: productsToInsert.length,
      message: `${productsToInsert.length} productos importados con éxito.`
    });

  } catch (error: any) {
    console.error('Import error:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Error importando el menú' }, 
      { status: 500 }
    );
  }
}
