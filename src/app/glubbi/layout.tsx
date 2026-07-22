import { BottomNav } from '@/modules/glubbi/components/BottomNav';

export default function GlubbiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen bg-gray-50 max-w-md mx-auto shadow-2xl overflow-hidden">
      {children}
      <BottomNav />
    </div>
  );
}
