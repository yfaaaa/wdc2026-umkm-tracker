import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc' }}>
      {/* Sidebar Kiri */}
      <Sidebar />

      {/* Konten Utama Kanan */}
      <main style={{ flex: 1, padding: '32px', color: '#0f172a', overflowY: 'auto' }}>
        {children}
      </main>
    </div>
  );
}