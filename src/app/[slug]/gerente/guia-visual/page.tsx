import React from 'react';
import { Camera, Image as ImageIcon, CheckCircle2, XCircle, AlertTriangle, TrendingUp } from 'lucide-react';

export default function GuiaVisualPage() {
  return (
    <div className="p-6 md:p-12 max-w-5xl mx-auto font-sans">
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <Camera className="w-8 h-8 text-orange-500" />
          <h1 className="text-3xl font-bold text-gray-900">Guía Visual de Glubbi</h1>
        </div>
        <p className="text-gray-500 text-lg">Optimiza tus fotos para vender más. Una buena foto aumenta la conversión hasta un 30%.</p>
      </div>

      {/* Requisitos Técnicos */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
        <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2 mb-4">
          <ImageIcon className="w-5 h-5 text-blue-500" /> Requisitos Técnicos Obligatorios
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-50 p-4 rounded-xl">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Formato</span>
            <p className="font-semibold text-slate-700">PNG o JPG</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Resolución</span>
            <p className="font-semibold text-slate-700">Mínimo 992 × 676 px</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Peso Máximo</span>
            <p className="font-semibold text-slate-700">1 MB</p>
          </div>
          <div className="bg-slate-50 p-4 rounded-xl">
            <span className="block text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">Orientación</span>
            <p className="font-semibold text-slate-700">Horizontal</p>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-black text-slate-800 mb-6">Mejores Prácticas</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* DOs */}
        <div className="space-y-6">
          <div className="bg-emerald-50 rounded-2xl p-6 border border-emerald-100">
            <h3 className="text-emerald-800 font-black text-lg mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-6 h-6 text-emerald-500" /> CÓMO HACERLO BIEN
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>Iluminación:</strong> Usa luz natural o brillante. Evita el flash directo para que no haya reflejos feos ni sombras duras.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>Fondo:</strong> Utiliza fondos neutros (madera, blanco, colores sólidos) o ligeramente desenfocados para que tu comida sea la protagonista absoluta.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>Ángulo:</strong> Tomas frontales para platos con capas (como hamburguesas) y un ángulo de 45° (como si estuvieras sentado en la mesa a punto de comer) para platos servidos.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 mt-2 shrink-0" />
                <p className="text-sm text-emerald-900 leading-relaxed">
                  <strong>Proporción:</strong> El plato debe ocupar al menos el 80% de la imagen. A la gente le gusta ver lo que va a comer.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* DONTs */}
        <div className="space-y-6">
          <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
            <h3 className="text-red-800 font-black text-lg mb-4 flex items-center gap-2">
              <XCircle className="w-6 h-6 text-red-500" /> LO QUE DEBES EVITAR
            </h3>
            
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <p className="text-sm text-red-900 leading-relaxed">
                  <strong>Sin Marcas de Agua:</strong> No le pongas el logo de tu restaurante ni tu número de teléfono encima a la foto. 
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <p className="text-sm text-red-900 leading-relaxed">
                  <strong>Cero Textos:</strong> No agregues cintas de "PROMO" o precios escritos en la imagen. La app ya tiene sus propios stickers para eso.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <p className="text-sm text-red-900 leading-relaxed">
                  <strong>Colages o bordes:</strong> No unas varias fotos en una sola imagen (collage) ni le agregues marcos decorativos de colores. Mantén la estética limpia.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-red-500 mt-2 shrink-0" />
                <p className="text-sm text-red-900 leading-relaxed">
                  <strong>Fotos de mala calidad:</strong> Fotos borrosas, tomadas de lejos, muy oscuras, o descargadas de internet que no coinciden con lo que vendes.
                </p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-8 bg-blue-50 border border-blue-100 rounded-2xl p-6 flex items-start gap-4">
        <TrendingUp className="w-8 h-8 text-blue-500 shrink-0 mt-1" />
        <div>
          <h4 className="text-blue-900 font-bold mb-1">Regla de Oro en Glubbi</h4>
          <p className="text-sm text-blue-800 leading-relaxed">
            Las imágenes son revisadas periódicamente por nuestro sistema. Aquellos restaurantes que cumplen al 100% con estas normativas fotográficas obtienen mejor posicionamiento algorítmico en las búsquedas de los clientes dentro del Marketplace.
          </p>
        </div>
      </div>

    </div>
  );
}
