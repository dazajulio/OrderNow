-- Agregar columnas para GLUBBI en la tabla restaurants
ALTER TABLE restaurants
ADD COLUMN IF NOT EXISTS is_glubbi_active BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS cover_image_url TEXT,
ADD COLUMN IF NOT EXISTS glubbi_category TEXT,
ADD COLUMN IF NOT EXISTS rating NUMERIC(3,2) DEFAULT 5.0,
ADD COLUMN IF NOT EXISTS estimated_time TEXT DEFAULT '30-45 min';

-- Comentarios explicativos (opcional)
COMMENT ON COLUMN restaurants.is_glubbi_active IS 'Determina si el restaurante aparece en el marketplace de Glubbi';
COMMENT ON COLUMN restaurants.cover_image_url IS 'URL de la imagen de portada para la tarjeta de Glubbi';
COMMENT ON COLUMN restaurants.glubbi_category IS 'Categoría para los filtros de Glubbi (ej. Burgers, Sushi)';
COMMENT ON COLUMN restaurants.rating IS 'Calificación del restaurante a mostrar en Glubbi';
COMMENT ON COLUMN restaurants.estimated_time IS 'Rango de tiempo de entrega estimado';
