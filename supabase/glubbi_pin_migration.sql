-- Agregar la columna PIN a la tabla de clientes de GLUBBI
ALTER TABLE glubbi_customers
ADD COLUMN IF NOT EXISTS pin VARCHAR(6);

-- Si hay usuarios existentes, se les puede establecer un PIN por defecto o dejarlos NULL temporalmente
-- COMMENT ON COLUMN glubbi_customers.pin IS 'PIN de seguridad de 6 dígitos para iniciar sesión';
