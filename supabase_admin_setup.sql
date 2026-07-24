-- ============================================================================
-- glubbi.app — SCRIPT DE CONFIGURACIÓN Y OPTIMIZACIÓN DEL PANEL SUPER-ADMIN
-- ============================================================================
-- Ejecuta este script completo en el SQL Editor de tu Dashboard de Supabase.
-- ============================================================================

-- ----------------------------------------------------------------------------
-- 1. CAMBIOS EN TABLA: restaurants (Agregar license_code por defecto si falta)
-- ----------------------------------------------------------------------------
-- Asegurar que la columna existe (ya existe en el esquema original)
ALTER TABLE public.restaurants ADD COLUMN IF NOT EXISTS license_code TEXT UNIQUE;
ALTER TABLE public.restaurants ADD COLUMN IF NOT EXISTS license_valid_until TIMESTAMPTZ;

-- ----------------------------------------------------------------------------
-- LEMON SQUEEZY: Columnas de suscripción
-- Ejecutar para habilitar el tracking de pagos recurrentes
-- ----------------------------------------------------------------------------
ALTER TABLE public.restaurants ADD COLUMN IF NOT EXISTS subscription_id TEXT;
ALTER TABLE public.restaurants ADD COLUMN IF NOT EXISTS subscription_status TEXT DEFAULT 'inactive';
ALTER TABLE public.restaurants ADD COLUMN IF NOT EXISTS subscription_renews_at TIMESTAMPTZ;

-- Índice para que el webhook pueda buscar por subscription_id eficientemente
CREATE INDEX IF NOT EXISTS idx_restaurants_subscription_id
  ON public.restaurants (subscription_id)
  WHERE subscription_id IS NOT NULL;


-- ----------------------------------------------------------------------------
-- 2. FUNCIÓN Y TRIGGER: Auto-generar Código de Licencia al registrar restaurante
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.generate_license_code()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
DECLARE
  random_chars TEXT;
  unique_code TEXT;
  is_duplicate BOOLEAN;
BEGIN
  -- Solo generar si no viene un código de licencia especificado
  IF NEW.license_code IS NULL THEN
    LOOP
      -- Genera 6 caracteres alfanuméricos aleatorios en mayúsculas
      random_chars := upper(substring(md5(random()::text) from 1 for 6));
      unique_code := 'GLB-' || random_chars;
      
      -- Verificar duplicidad
      SELECT EXISTS(SELECT 1 FROM public.restaurants WHERE license_code = unique_code) INTO is_duplicate;
      
      IF NOT is_duplicate THEN
        EXIT;
      END IF;
    END LOOP;
    
    NEW.license_code := unique_code;
    
    -- Si no tiene fecha de vencimiento, otorgar 1 año por defecto
    IF NEW.license_valid_until IS NULL THEN
      NEW.license_valid_until := now() + INTERVAL '1 year';
    END IF;
  END IF;
  
  RETURN NEW;
END;
$$;

-- Crear el trigger antes de la inserción
DROP TRIGGER IF EXISTS trg_generate_restaurant_license ON public.restaurants;
CREATE TRIGGER trg_generate_restaurant_license
  BEFORE INSERT ON public.restaurants
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_license_code();

-- ----------------------------------------------------------------------------
-- 3. FUNCIÓN SEGURA (SECURITY DEFINER): Obtener miembros de restaurantes con su email de auth.users
-- ----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.get_super_admin_members()
RETURNS TABLE (
  member_id UUID,
  user_id UUID,
  display_name TEXT,
  email TEXT,
  role TEXT,
  is_active BOOLEAN,
  created_at TIMESTAMPTZ,
  restaurant_id UUID,
  restaurant_name TEXT,
  restaurant_address TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER -- Ejecuta con privilegios de administrador para saltarse RLS en auth.users
AS $$
BEGIN
  -- Medida de seguridad: Validar que el JWT pertenezca al correo del Super Administrador
  IF (auth.jwt() ->> 'email') != 'dazajulio@gmail.com' THEN
    RAISE EXCEPTION 'Acceso denegado: Permisos insuficientes para ver la lista global de usuarios.';
  END IF;

  RETURN QUERY
  SELECT 
    rm.id,
    rm.user_id,
    rm.display_name,
    au.email::TEXT,
    rm.role,
    rm.is_active,
    rm.created_at,
    rm.restaurant_id,
    r.name,
    r.address
  FROM public.restaurant_members rm
  JOIN public.restaurants r ON rm.restaurant_id = r.id
  JOIN auth.users au ON rm.user_id = au.id;
END;
$$;

COMMENT ON FUNCTION public.get_super_admin_members() IS 'Exprime los datos de usuarios incluyendo su email de auth.users solo si quien consulta es dazajulio@gmail.com.';

-- ----------------------------------------------------------------------------
-- 4. POBLAR CÓDIGOS DE LICENCIA DE RESTAURANTES EXISTENTES QUE ESTÉN VACÍOS
-- ----------------------------------------------------------------------------
DO $$
DECLARE
  r RECORD;
  random_chars TEXT;
  unique_code TEXT;
BEGIN
  FOR r IN SELECT id FROM public.restaurants WHERE license_code IS NULL LOOP
    LOOP
      random_chars := upper(substring(md5(random()::text) from 1 for 6));
      unique_code := 'GLB-' || random_chars;
      IF NOT EXISTS(SELECT 1 FROM public.restaurants WHERE license_code = unique_code) THEN
        EXIT;
      END IF;
    END LOOP;
    
    UPDATE public.restaurants 
    SET license_code = unique_code, 
        license_valid_until = now() + INTERVAL '1 year' 
    WHERE id = r.id;
  END LOOP;
END $$;

-- ----------------------------------------------------------------------------
-- 5. SEMBRAR TRANSACCIONES OPERATIVAS DE EJEMPLO (MOCK DATA)
-- ----------------------------------------------------------------------------
-- Crear clientes ficticios vinculados al restaurante demo (Burger Palace)
INSERT INTO public.customers (id, restaurant_id, name, email, phone, visit_count)
VALUES 
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Sofía Rodríguez', 'sofia.rod@gmail.com', '+58 414-1234567', 4),
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Carlos Mendoza', 'carlos.mendoza@outlook.com', '+58 412-9876543', 2),
  ('e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'María Alejandra', 'malejandra@gmail.com', '+58 424-5551212', 1)
ON CONFLICT (restaurant_id, email) DO NOTHING;

-- Crear órdenes ficticias para poblar la analítica operativa
INSERT INTO public.orders (id, restaurant_id, table_id, customer_id, status, total_amount, payment_method, payment_status, created_at)
VALUES
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.tables WHERE restaurant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' LIMIT 1), 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'delivered', 28.50, 'stripe', 'paid', now() - INTERVAL '5 days'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.tables WHERE restaurant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' LIMIT 1), 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'delivered', 15.99, 'cash', 'paid', now() - INTERVAL '4 days'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.tables WHERE restaurant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' OFFSET 1 LIMIT 1), 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a03', 'delivered', 42.00, 'stripe', 'paid', now() - INTERVAL '2 days'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.tables WHERE restaurant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' OFFSET 2 LIMIT 1), 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'delivered', 22.50, 'stripe', 'paid', now() - INTERVAL '1 days'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.tables WHERE restaurant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' LIMIT 1), 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a01', 'ready', 32.50, 'stripe', 'paid', now() - INTERVAL '2 hours'),
  (uuid_generate_v4(), 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', (SELECT id FROM public.tables WHERE restaurant_id = 'a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11' OFFSET 1 LIMIT 1), 'e4eebc99-9c0b-4ef8-bb6d-6bb9bd380a02', 'pending', 18.50, 'cash', 'pending', now())
ON CONFLICT DO NOTHING;
