/**
 * Layout exclusivo para el KDS / Monitor de Cocina.
 * Reemplaza el layout padre del kiosco (max-w-2xl / móvil)
 * con un contenedor de pantalla completa pensado para escritorio.
 */

export default function CocinaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-screen overflow-hidden bg-slate-50">
      {children}
    </div>
  );
}
