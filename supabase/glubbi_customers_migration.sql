-- Crear tabla para los clientes de GLUBBI
CREATE TABLE IF NOT EXISTS glubbi_customers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Comentarios
COMMENT ON TABLE glubbi_customers IS 'Tabla de registro de clientes de la App Glubbi';

-- RLS (Row Level Security)
ALTER TABLE glubbi_customers ENABLE ROW LEVEL SECURITY;

-- Políticas
-- Permitir inserción abierta para que cualquiera pueda registrarse desde la app
CREATE POLICY "Enable insert for everyone on glubbi_customers"
ON glubbi_customers
FOR INSERT
WITH CHECK (true);

-- Permitir lectura (opcional, dependiendo de si el usuario necesita consultar sus propios datos)
-- Como solo guardamos un ID en el dispositivo local, podemos usar el email como clave de consulta
CREATE POLICY "Enable select for users based on email"
ON glubbi_customers
FOR SELECT
USING (true); -- Permitimos lectura pública por simplicidad de la demo (en prod se puede asegurar mejor)
