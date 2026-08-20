import React from 'react';
import Card from '@/components/ui/Card';

export default function SummaryCards() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            <Card title="Total Pemasukan">
                <h2 style={{ margin: '8px 0 0 0', color: '#16a34a' }}>Rp 12.450.000</h2>
                <span style={{ fontSize: '12px', color: '#16a34a' }}>↑ 12% dari bulan lalu</span>
            </Card>
            <Card title="Total Pengeluaran">
                <h2 style={{ margin: '8px 0 0 0', color: '#dc2626' }}>Rp 5.200.000</h2>
                <span style={{ fontSize: '12px', color: '#dc2626' }}>↓ 4% dari bulan lalu</span>
            </Card>
            <Card title="Laba Bersih">
                <h2 style={{ margin: '8px 0 0 0', color: '#0284c7' }}>Rp 7.250.000</h2>
                <span style={{ fontSize: '12px', color: '#64748b' }}>Estimasi bersih</span>
            </Card>
        </div>
    );
}