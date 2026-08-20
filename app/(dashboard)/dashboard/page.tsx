'use client';

export default function DashboardPage() {
  return (
    <div>
      <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#0f172a', marginBottom: '8px' }}>
        📊 Ringkasan Keuangan Toko
      </h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        Selamat datang kembali! Berikut kondisi arus kas bisnis kamu hari ini.
      </p>

      {/* Grid Kartu Ringkasan */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Total Saldo Kas</span>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#0284c7', marginTop: '4px' }}>
            Rp 25.070.000
          </h2>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Pemasukan Bulan Ini</span>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#16a34a', marginTop: '4px' }}>
            + Rp 2.250.000
          </h2>
        </div>

        <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <span style={{ fontSize: '13px', color: '#64748b' }}>Pengeluaran Bulan Ini</span>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#dc2626', marginTop: '4px' }}>
            - Rp 685.000
          </h2>
        </div>
      </div>
    </div>
  );
}