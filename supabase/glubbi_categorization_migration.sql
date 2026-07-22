-- Agregar la columna glubbi_type a la tabla de restaurantes
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS glubbi_type TEXT DEFAULT 'Restaurantes';

-- Comentarios
COMMENT ON COLUMN restaurants.glubbi_type IS 'Clasificación principal para Glubbi (Restaurantes, Mercado, Farmacia)';
