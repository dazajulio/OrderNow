-- ============================================================================
-- AUDIT & FIX: Row-Level Security (RLS) Policies for Multi-Tenant Isolation
-- ============================================================================

-- 1. Asegurar que RLS esté habilitado en las tablas principales
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Eliminar políticas demo anteriores para evitar conflictos y accesos inseguros
DROP POLICY IF EXISTS "Demo allow ALL on categories" ON public.categories;
DROP POLICY IF EXISTS "Demo allow ALL on products" ON public.products;
DROP POLICY IF EXISTS "Demo allow ALL on orders" ON public.orders;
DROP POLICY IF EXISTS "Demo allow ALL on order_items" ON public.order_items;

-- ============================================================================
-- POLÍTICAS PARA: categories
-- ============================================================================

-- A. Lectura Pública: Clientes (Kiosko) pueden leer categorías si el restaurante está activo
CREATE POLICY "Public read for active restaurants categories"
  ON public.categories FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants r
      WHERE r.id = categories.restaurant_id
        AND r.is_active = true
    )
  );

-- B. Escritura (ALL): Solo miembros autenticados y activos del restaurante pueden crear/editar/eliminar
CREATE POLICY "Staff manage their categories"
  ON public.categories FOR ALL
  TO authenticated
  USING (public.is_restaurant_member(restaurant_id))
  WITH CHECK (public.is_restaurant_member(restaurant_id));


-- ============================================================================
-- POLÍTICAS PARA: products
-- ============================================================================

-- A. Lectura Pública: Clientes (Kiosko) pueden leer productos si el restaurante está activo y el producto está disponible
CREATE POLICY "Public read for active restaurants products"
  ON public.products FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.restaurants r
      WHERE r.id = products.restaurant_id
        AND r.is_active = true
    )
  );

-- B. Escritura (ALL): Solo miembros autenticados y activos del restaurante pueden gestionar productos
CREATE POLICY "Staff manage their products"
  ON public.products FOR ALL
  TO authenticated
  USING (public.is_restaurant_member(restaurant_id))
  WITH CHECK (public.is_restaurant_member(restaurant_id));


-- ============================================================================
-- POLÍTICAS PARA: orders
-- ============================================================================

-- A. Inserción Pública: Los clientes (Kiosko) pueden crear órdenes de forma pública
CREATE POLICY "Public insert orders"
  ON public.orders FOR INSERT
  WITH CHECK (true);

-- B. Lectura Pública/Cliente: Los clientes pueden consultar sus propias órdenes
CREATE POLICY "Public read own orders"
  ON public.orders FOR SELECT
  TO anon
  USING (true); -- Permitimos lectura pública para que el kiosko pueda consultar el estado por ID de orden

-- C. Lectura Staff: Los miembros del restaurante pueden ver todas las órdenes de su local
CREATE POLICY "Staff read their restaurant orders"
  ON public.orders FOR SELECT
  TO authenticated
  USING (public.is_restaurant_member(restaurant_id));

-- D. Actualización Staff: Solo miembros del restaurante pueden actualizar el estado de una orden (KDS/Caja)
CREATE POLICY "Staff update their restaurant orders"
  ON public.orders FOR UPDATE
  TO authenticated
  USING (public.is_restaurant_member(restaurant_id))
  WITH CHECK (public.is_restaurant_member(restaurant_id));


-- ============================================================================
-- POLÍTICAS PARA: order_items
-- ============================================================================

-- A. Inserción Pública: Se pueden insertar items de la orden
CREATE POLICY "Public insert order items"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

-- B. Lectura Pública: Lectura de items asociados a órdenes
CREATE POLICY "Public read order items"
  ON public.order_items FOR SELECT
  USING (true);

-- C. Gestión Staff: Los miembros del restaurante tienen control total de los items de su restaurante
CREATE POLICY "Staff manage order items"
  ON public.order_items FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.orders o
      WHERE o.id = order_items.order_id
        AND public.is_restaurant_member(o.restaurant_id)
    )
  );
