import Sidebar from '@/components/layout/Sidebar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        minHeight: '100vh',
        width: '100%',
        backgroundColor: '#f8fafc',
        color: '#0f172a',
      }}
    >
      <Sidebar />
      <main
        style={{
          flex: 1,
          padding: '32px',
          overflowY: 'auto',
          minWidth: 0,
        }}
      >
        {children}
      </main>
    </div>
  );
}