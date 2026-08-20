'use client';

import { useState, useEffect } from 'react';

interface Transaction {
    id: string;
    type: 'IN' | 'OUT' | 'TRANSFER';
    accountId: string;
    accountName?: string;
    category?: string;
    amount: number;
    description?: string;
    date: string;
}

export default function LaporanPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [currencyMode, setCurrencyMode] = useState<'BASE' | 'PER_CURRENCY'>('BASE');

    useEffect(() => {
        loadTransactions();
    }, []);

    const loadTransactions = () => {
        const saved = localStorage.getItem('financial_transactions');
        if (saved) {
            try {
                setTransactions(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading transactions for report:', e);
            }
        }
    };

    // Kalkulasi Keuangan Real-Time
    const totalIncome = transactions
        .filter((t) => t?.type === 'IN')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalExpense = transactions
        .filter((t) => t?.type === 'OUT')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const netProfit = totalIncome - totalExpense;

    // Kalkulasi Profit Margin Ratio (% Efisiensi)
    const profitMargin = totalIncome > 0 ? Math.round((netProfit / totalIncome) * 100) : 0;

    // Status Kesehatan Bisnis
    const getHealthStatus = () => {
        if (netProfit > 0) return { label: 'UNTUNG (PROFIT)', color: '#16a34a', bg: '#f0fdf4', border: '#86efac' };
        if (netProfit < 0) return { label: 'RUGI (LOSS)', color: '#dc2626', bg: '#fef2f2', border: '#fca5a5' };
        return { label: 'IMPAS (BREAKEVEN)', color: '#2563eb', bg: '#eff6ff', border: '#93c5fd' };
    };

    const health = getHealthStatus();

    // Filter daftar transaksi hanya untuk Pemasukan & Pengeluaran (abaikan Transfer)
    const reportTransactions = transactions.filter((t) => t?.type === 'IN' || t?.type === 'OUT');

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <style>{`
        .glass-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.03);
        }
        .mode-btn {
          padding: 8px 16px;
          font-size: 13px;
          font-weight: 700;
          border-radius: 8px;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .mode-btn.active {
          background-color: #0f172a;
          color: #ffffff;
          border-color: #0f172a;
        }
        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 20px;
          flex: 1;
          min-width: 220px;
        }
        .table-row:hover {
          background-color: #f8fafc;
        }
      `}</style>

            {/* HEADER SECTION */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📈 Laporan Untung / Rugi
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
                    Ringkasan performa finansial dan analisis margin keuntungan usaha kamu secara real-time.
                </p>
            </div>

            {/* CURRENCY MODE TOGGLE */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
                <button
                    className={`mode-btn ${currencyMode === 'PER_CURRENCY' ? 'active' : ''}`}
                    onClick={() => setCurrencyMode('PER_CURRENCY')}
                >
                    Mode Per-Currency
                </button>
                <button
                    className={`mode-btn ${currencyMode === 'BASE' ? 'active' : ''}`}
                    onClick={() => setCurrencyMode('BASE')}
                >
                    Mode Gabungan (Base Currency)
                </button>
            </div>

            {/* TOP KPI CARDS */}
            <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '24px' }}>
                {/* Total Uang Masuk */}
                <div className="kpi-card">
                    <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '600' }}>Total Uang Masuk</span>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', marginTop: '6px' }}>
                        Rp {totalIncome.toLocaleString('id-ID')}
                    </div>
                </div>

                {/* Total Uang Keluar */}
                <div className="kpi-card">
                    <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '600' }}>Total Uang Keluar</span>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: '#dc2626', marginTop: '6px' }}>
                        Rp {totalExpense.toLocaleString('id-ID')}
                    </div>
                </div>

                {/* Laba Bersih */}
                <div className="kpi-card" style={{ borderLeft: netProfit >= 0 ? '4px solid #16a34a' : '4px solid #dc2626' }}>
                    <span style={{ fontSize: '12.5px', color: '#64748b', fontWeight: '600' }}>Laba Bersih (Net Profit)</span>
                    <div style={{ fontSize: '24px', fontWeight: '800', color: netProfit >= 0 ? '#16a34a' : '#dc2626', marginTop: '6px' }}>
                        Rp {netProfit.toLocaleString('id-ID')}
                    </div>
                </div>
            </div>

            {/* ANALYTICS SECTION CARDS */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '16px', marginBottom: '28px' }}>

                {/* Profit Margin Ratio */}
                <div className="glass-panel">
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📊 Profit Margin Ratio
                    </h3>
                    <div style={{ fontSize: '28px', fontWeight: '800', color: profitMargin >= 0 ? '#16a34a' : '#dc2626' }}>
                        {profitMargin}% <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '500' }}>dari total pemasukan</span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '8px' }}>
                        Persentase efisiensi usaha dalam menghasilkan keuntungan dari omzet.
                    </p>
                </div>

                {/* Status Kesehatan Bisnis */}
                <div className="glass-panel">
                    <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📑 Status Kesehatan Bisnis
                    </h3>
                    <div style={{ marginBottom: '8px' }}>
                        <span style={{
                            backgroundColor: health.bg,
                            color: health.color,
                            border: `1px solid ${health.border}`,
                            padding: '6px 14px',
                            borderRadius: '20px',
                            fontSize: '13px',
                            fontWeight: '800',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}>
                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: health.color }} />
                            {health.label}
                        </span>
                    </div>
                    <p style={{ fontSize: '12px', color: '#64748b', marginTop: '10px' }}>
                        Dihitung otomatis dari selisih seluruh arus kas masuk dan keluar.
                    </p>
                </div>
            </div>

            {/* DETAIL TABLE SECTION */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                <div style={{ padding: '20px 24px', borderBottom: '1px solid #e2e8f0', backgroundColor: '#ffffff' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        📑 Rincian Pemasukan & Pengeluaran
                    </h3>
                </div>

                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', fontSize: '12px' }}>
                                <th style={{ padding: '14px 24px' }}>Tanggal</th>
                                <th style={{ padding: '14px 20px' }}>Keterangan Transaksi</th>
                                <th style={{ padding: '14px 20px' }}>Tipe</th>
                                <th style={{ padding: '14px 24px', textAlign: 'right' }}>Nominal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {reportTransactions.length === 0 ? (
                                <tr>
                                    <td colSpan={4} style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                                        <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📊</span>
                                        <p style={{ fontWeight: '600', color: '#475569' }}>Belum ada data transaksi pemasukan/pengeluaran</p>
                                    </td>
                                </tr>
                            ) : (
                                reportTransactions.map((tx) => {
                                    const isIN = tx.type === 'IN';

                                    return (
                                        <tr key={tx.id} className="table-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 24px', color: '#475569', fontWeight: '600', whiteSpace: 'nowrap' }}>
                                                {tx.date || '-'}
                                            </td>

                                            <td style={{ padding: '16px 20px', fontWeight: '600', color: '#0f172a' }}>
                                                <div>{tx.description || tx.category || 'Transaksi'}</div>
                                                <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                                                    {tx.accountName || 'Kas Utama'}
                                                </div>
                                            </td>

                                            <td style={{ padding: '16px 20px' }}>
                                                <span style={{
                                                    color: isIN ? '#16a34a' : '#dc2626',
                                                    fontWeight: '700',
                                                    fontSize: '12.5px',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '6px'
                                                }}>
                                                    <span style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        backgroundColor: isIN ? '#16a34a' : '#dc2626'
                                                    }} />
                                                    {isIN ? 'Pemasukan' : 'Pengeluaran'}
                                                </span>
                                            </td>

                                            <td style={{
                                                padding: '16px 24px',
                                                textAlign: 'right',
                                                fontWeight: '800',
                                                fontSize: '14px',
                                                color: isIN ? '#16a34a' : '#0f172a',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                Rp {Number(tx.amount || 0).toLocaleString('id-ID')}
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}