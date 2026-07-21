/**
 * Layout del Kiosko público de mesa.
 * Aplica el contenedor móvil centrado (max-w-2xl) que antes
 * estaba en el layout padre [slug]/layout.tsx.
 * Solo aplica a las rutas /[slug]/mesa/[tableId].
 */

export default function MesaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="w-full max-w-2xl mx-auto min-h-screen relative shadow-2xl shadow-black/50 bg-slate-50 pb-32">
      {children}
    </main>
  );
}
