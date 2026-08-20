import React from 'react';
import Card from '@/components/ui/Card';

export default function ProfitLossChart() {
    // Visual grafik visualisasi sederhana tanpa butuh library eksternal agar tidak crash
    const data = [
        { month: 'Mei', income: 60, expense: 30 },
        { month: 'Jun', income: 75, expense: 40 },
        { month: 'Jul', income: 90, expense: 45 },
        { month: 'Agu', income: 100, expense: 50 },
    ];

    return (
        <Card title="Visualisasi Arus Kas (Laba / Rugi)" description="Perbandingan Pemasukan (Hijau) vs Pengeluaran (Merah)">
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '24px', height: '180px', paddingTop: '20px' }}>
                {data.map((item, idx) => (
                    <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '100%', width: '100%', justifyContent: 'center' }}>
                            <div style={{ width: '16px', height: `${item.income}%`, backgroundColor: '#22c55e', borderRadius: '4px 4px 0 0' }} />
                            <div style={{ width: '16px', height: `${item.expense}%`, backgroundColor: '#ef4444', borderRadius: '4px 4px 0 0' }} />
                        </div>
                        <span style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>{item.month}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
}