
'use client';

import { useState } from 'react';

export default function ReportsPage() {
    const [reportMode, setReportMode] = useState<'PER_CURRENCY' | 'COMBINED'>('PER_CURRENCY');

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f172a' }}>
                📈 Laporan Untung / Rugi
            </h1>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Ringkasan performa finansial usaha kamu.
            </p>

            {/* Mode Switcher */}
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button
                    onClick={() => setReportMode('PER_CURRENCY')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: reportMode === 'PER_CURRENCY' ? '#0f172a' : '#e2e8f0',
                        color: reportMode === 'PER_CURRENCY' ? '#fff' : '#334155',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Mode Per-Currency
                </button>
                <button
                    onClick={() => setReportMode('COMBINED')}
                    style={{
                        padding: '8px 16px',
                        backgroundColor: reportMode === 'COMBINED' ? '#0f172a' : '#e2e8f0',
                        color: reportMode === 'COMBINED' ? '#fff' : '#334155',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                    }}
                >
                    Mode Gabungan (Base Currency)
                </button>
            </div>

            {/* Ringkasan Laporan */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
                <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Total Uang Masuk</span>
                    <h2 style={{ fontSize: '24px', margin: '8px 0', color: '#16a34a' }}>Rp 5.000.000</h2>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Total Uang Keluar</span>
                    <h2 style={{ fontSize: '24px', margin: '8px 0', color: '#dc2626' }}>Rp 2.150.000</h2>
                </div>

                <div style={{ backgroundColor: '#fff', padding: '16px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                    <span style={{ fontSize: '14px', color: '#64748b' }}>Laba Bersih</span>
                    <h2 style={{ fontSize: '24px', margin: '8px 0', color: '#0284c7' }}>Rp 2.850.000</h2>
                </div>
            </div>
        </div>
    );
}