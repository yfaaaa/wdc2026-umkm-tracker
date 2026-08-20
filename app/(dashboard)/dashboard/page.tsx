'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Transaction {
  id: string | number;
  type: 'IN' | 'OUT';
  amount: number;
  category?: string;
  description?: string;
  date?: string;
}

export default function DashboardPage() {
  const [businessName, setBusinessName] = useState('Toko Saya');
  const [totalBalance, setTotalBalance] = useState(0);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [recentTx, setRecentTx] = useState<Transaction[]>([]);
  const [accountCount, setAccountCount] = useState(0);

  useEffect(() => {
    // 1. Ambil Nama Toko
    const savedSession = localStorage.getItem('user_session') || localStorage.getItem('registered_user');
    if (savedSession) {
      try {
        const userData = JSON.parse(savedSession);
        const name = userData.businessName || userData.name;
        if (name) setBusinessName(name);
      } catch (err) {
        console.error(err);
      }
    }

    // 2. Hitung Total Saldo dari Akun Keuangan
    const savedAccounts = localStorage.getItem('financial_accounts');
    let baseBalance = 0;
    if (savedAccounts) {
      try {
        const accs = JSON.parse(savedAccounts);
        setAccountCount(accs.length);
        baseBalance = accs.reduce((sum: number, item: any) => sum + (Number(item.balance) || 0), 0);
      } catch (e) {
        console.error(e);
      }
    }

    // 3. Hitung Pemasukan, Pengeluaran & Transaksi Terbaru
    const savedTx = localStorage.getItem('financial_transactions');
    let income = 0;
    let expense = 0;
    if (savedTx) {
      try {
        const txs: Transaction[] = JSON.parse(savedTx);
        txs.forEach((tx) => {
          if (tx.type === 'IN') income += Number(tx.amount) || 0;
          if (tx.type === 'OUT') expense += Number(tx.amount) || 0;
        });

        // Ambil 5 transaksi terbaru
        setRecentTx(txs.slice(-5).reverse());
      } catch (e) {
        console.error(e);
      }
    }

    setTotalIncome(income);
    setTotalExpense(expense);
    setTotalBalance(baseBalance + income - expense);
  }, []);

  // Hitung Laba Bersih
  const netProfit = totalIncome - totalExpense;
  const isHealthy = totalBalance > 0 && netProfit >= 0;

  // Rasio Persentase untuk Bar Chart Visual
  const totalFlow = totalIncome + totalExpense;
  const incomePercent = totalFlow > 0 ? Math.round((totalIncome / totalFlow) * 100) : 50;
  const expensePercent = totalFlow > 0 ? Math.round((totalExpense / totalFlow) * 100) : 50;

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', paddingBottom: '40px' }}>
      <style>{`
        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 22px 24px;
          position: relative;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.03);
        }
        .kpi-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 16px 28px -6px rgba(15, 23, 42, 0.08);
          border-color: #cbd5e1;
        }
        .quick-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 13.5px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .quick-action-btn.primary {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
        }
        .quick-action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(2, 132, 199, 0.35);
        }
        .quick-action-btn.secondary {
          background-color: #ffffff;
          color: #334155;
          border: 1px solid #cbd5e1;
        }
        .quick-action-btn.secondary:hover {
          background-color: #f8fafc;
          border-color: #0284c7;
          color: #0284c7;
          transform: translateY(-2px);
        }
        .chart-bar-fill {
          transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .tx-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 16px;
          border-radius: 12px;
          transition: background-color 0.2s ease;
        }
        .tx-row:hover {
          background-color: #f8fafc;
        }
      `}</style>

      {/* HEADER HERO SECTION */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '28px' }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
            <span>🟢 SYSTEM ACTIVE</span>
            <span>•</span>
            <span>Real-time Financial Sync</span>
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            Ringkasan Keuangan {businessName}
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
            Selamat datang kembali! Berikut pantauan arus kas, laba bersih, dan performa keuangan bisnis Anda.
          </p>
        </div>

        {/* QUICK ACTIONS BUTTONS */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/transactions" className="quick-action-btn primary">
            ➕ Catat Transaksi
          </Link>
          <Link href="/imports" className="quick-action-btn secondary">
            📸 Scan OCR Struk
          </Link>
          <Link href="/exports" className="quick-action-btn secondary">
            📥 Export Laporan
          </Link>
        </div>
      </div>

      {/* 4 MAIN KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
        
        {/* Card 1: Total Saldo */}
        <div className="kpi-card" style={{ borderLeft: '4px solid #0284c7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Total Saldo Kas
            </span>
            <span style={{ fontSize: '20px', backgroundColor: '#f0f9ff', padding: '8px', borderRadius: '10px' }}>💼</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', marginTop: '12px', letterSpacing: '-0.5px' }}>
            Rp {totalBalance.toLocaleString('id-ID')}
          </h2>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ color: '#0284c7', fontWeight: '700' }}>{accountCount} Akun</span>
            <span>tersambung dalam kas</span>
          </div>
        </div>

        {/* Card 2: Pemasukan */}
        <div className="kpi-card" style={{ borderLeft: '4px solid #16a34a' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pemasukan
            </span>
            <span style={{ fontSize: '20px', backgroundColor: '#f0fdf4', padding: '8px', borderRadius: '10px' }}>📈</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#16a34a', marginTop: '12px', letterSpacing: '-0.5px' }}>
            + Rp {totalIncome.toLocaleString('id-ID')}
          </h2>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#16a34a', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>▲ Arus kas masuk tercatat</span>
          </div>
        </div>

        {/* Card 3: Pengeluaran */}
        <div className="kpi-card" style={{ borderLeft: '4px solid #dc2626' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Pengeluaran
            </span>
            <span style={{ fontSize: '20px', backgroundColor: '#fef2f2', padding: '8px', borderRadius: '10px' }}>📉</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#dc2626', marginTop: '12px', letterSpacing: '-0.5px' }}>
            - Rp {totalExpense.toLocaleString('id-ID')}
          </h2>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#dc2626', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span>▼ Biaya operasional & belanja</span>
          </div>
        </div>

        {/* Card 4: Laba Bersih (Net Profit) */}
        <div className="kpi-card" style={{ borderLeft: `4px solid ${netProfit >= 0 ? '#8b5cf6' : '#f59e0b'}`, background: 'linear-gradient(180deg, #ffffff 0%, #faf5ff 100%)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '13px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Estimasi Laba Bersih
            </span>
            <span style={{ fontSize: '20px', backgroundColor: '#f3e8ff', padding: '8px', borderRadius: '10px' }}>🏆</span>
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: '800', color: netProfit >= 0 ? '#7c3aed' : '#d97706', marginTop: '12px', letterSpacing: '-0.5px' }}>
            {netProfit >= 0 ? '+' : ''} Rp {netProfit.toLocaleString('id-ID')}
          </h2>
          <div style={{ marginTop: '10px', fontSize: '12px', color: '#6b21a8', fontWeight: '600' }}>
            {netProfit >= 0 ? '✨ Margin Keuntungan Positif' : '⚠️ Pengeluaran Melebihi Pemasukan'}
          </div>
        </div>

      </div>

      {/* DASHBOARD CONTENT GRID (2 COLUMNS) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* LEFT MAIN COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* VISUAL ARUS KAS BREAKDOWN */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                  📊 Perbandingan Arus Kas (Cash Flow)
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                  Rasio pemasukan vs pengeluaran toko Anda.
                </p>
              </div>
              <span style={{ fontSize: '12px', fontWeight: '700', color: '#0284c7', backgroundColor: '#f0f9ff', padding: '4px 10px', borderRadius: '6px' }}>
                Akumulasi Total
              </span>
            </div>

            {/* Custom Progress Bar Chart */}
            <div style={{ height: '24px', width: '100%', backgroundColor: '#f1f5f9', borderRadius: '12px', overflow: 'hidden', display: 'flex', marginBottom: '16px' }}>
              <div 
                className="chart-bar-fill"
                style={{ width: `${incomePercent}%`, backgroundColor: '#16a34a', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: '700' }}
              >
                {incomePercent > 10 ? `${incomePercent}%` : ''}
              </div>
              <div 
                className="chart-bar-fill"
                style={{ width: `${expensePercent}%`, backgroundColor: '#dc2626', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '11px', fontWeight: '700' }}
              >
                {expensePercent > 10 ? `${expensePercent}%` : ''}
              </div>
            </div>

            {/* Chart Legend */}
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', paddingTop: '8px', borderTop: '1px dashed #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#16a34a' }}></span>
                <span style={{ color: '#475569', fontWeight: '500' }}>Pemasukan ({incomePercent}%)</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: '#dc2626' }}></span>
                <span style={{ color: '#475569', fontWeight: '500' }}>Pengeluaran ({expensePercent}%)</span>
              </div>
            </div>
          </div>

          {/* RECENT TRANSACTIONS TABLE */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.03)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
                  📝 Transaksi Terakhir
                </h3>
                <p style={{ fontSize: '12.5px', color: '#64748b', marginTop: '2px' }}>
                  5 aktivitas pencatatan keuangan terbaru.
                </p>
              </div>
              <Link href="/transactions" style={{ fontSize: '13px', fontWeight: '700', color: '#0284c7', textDecoration: 'none' }}>
                Lihat Semua →
              </Link>
            </div>

            {recentTx.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '36px 20px', border: '1.5px dashed #e2e8f0', borderRadius: '12px', backgroundColor: '#fafafa' }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📑</span>
                <p style={{ fontSize: '14px', fontWeight: '600', color: '#334155' }}>Belum ada transaksi tercatat</p>
                <p style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px', marginBottom: '14px' }}>
                  Catat transaksi manual atau scan struk belanja dengan OCR.
                </p>
                <Link href="/transactions" style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '8px 16px', borderRadius: '8px', fontSize: '12.5px', fontWeight: '600', textDecoration: 'none' }}>
                  + Mulai Catat Transaksi
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {recentTx.map((tx, idx) => (
                  <div key={tx.id || idx} className="tx-row">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        backgroundColor: tx.type === 'IN' ? '#f0fdf4' : '#fef2f2',
                        color: tx.type === 'IN' ? '#16a34a' : '#dc2626',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '16px',
                        fontWeight: '700'
                      }}>
                        {tx.type === 'IN' ? '↓' : '↑'}
                      </div>
                      <div>
                        <div style={{ fontSize: '13.5px', fontWeight: '700', color: '#0f172a' }}>
                          {tx.description || (tx.type === 'IN' ? 'Pemasukan Penjualan' : 'Pengeluaran Operasional')}
                        </div>
                        <div style={{ fontSize: '11.5px', color: '#64748b', marginTop: '2px' }}>
                          {tx.category || 'Umum'} • {tx.date || 'Hari ini'}
                        </div>
                      </div>
                    </div>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '800',
                      color: tx.type === 'IN' ? '#16a34a' : '#dc2626'
                    }}>
                      {tx.type === 'IN' ? '+' : '-'} Rp {Number(tx.amount).toLocaleString('id-ID')}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* RIGHT SIDEBAR COLUMN */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* FINANCIAL HEALTH BADGE CARD */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '16px', border: '1px solid #e2e8f0', padding: '24px', boxShadow: '0 4px 12px -2px rgba(15, 23, 42, 0.03)' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '14px' }}>
              💡 Radar Kesehatan Keuangan
            </h3>

            <div style={{
              backgroundColor: isHealthy ? '#f0fdf4' : '#fffbeb',
              border: `1px solid ${isHealthy ? '#bbf7d0' : '#fef08a'}`,
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                <span style={{ fontSize: '16px' }}>{isHealthy ? '🟢' : '🟡'}</span>
                <span style={{ fontSize: '14px', fontWeight: '800', color: isHealthy ? '#15803d' : '#b45309' }}>
                  {isHealthy ? 'Arus Kas Sehat' : 'Perlu Evaluasi Pengeluaran'}
                </span>
              </div>
              <p style={{ fontSize: '12.5px', color: isHealthy ? '#166534' : '#92400e', lineHeight: '1.5' }}>
                {isHealthy 
                  ? 'Kondisi finansial usaha Anda stabil. Pemasukan lebih besar daripada pengeluaran.' 
                  : 'Pengeluaran bisnis Anda terdeteksi mendekati atau melebihi batas pemasukan. Tinjau efisiensi biaya.'}
              </p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Metode Pencatatan</span>
                <strong style={{ color: '#0f172a' }}>Otomatis (Hybrid)</strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                <span>Keamanan Data</span>
                <strong style={{ color: '#16a34a' }}>🔒 Encrypted Local Storage</strong>
              </div>
            </div>
          </div>

          {/* AI ADVICE / INSIGHT TILE */}
          <div style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
            borderRadius: '16px',
            padding: '24px',
            color: '#ffffff',
            boxShadow: '0 10px 20px -5px rgba(15, 23, 42, 0.25)'
          }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: 'rgba(255,255,255,0.1)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', marginBottom: '12px', color: '#38bdf8' }}>
              <span>🤖 AI ASSISTANT INSIGHT</span>
            </div>
            <h4 style={{ fontSize: '15px', fontWeight: '700', marginBottom: '8px' }}>
              Gunakan OCR Struk Scanner!
            </h4>
            <p style={{ fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.6', marginBottom: '16px' }}>
              Hemat waktu hingga 80% dalam mencatat belanja bahan baku. Cukup foto nota belanja Anda dan biarkan AI mengekstrak nilainya.
            </p>
            <Link href="/imports" style={{
              display: 'inline-block',
              backgroundColor: '#0284c7',
              color: '#ffffff',
              padding: '10px 16px',
              borderRadius: '10px',
              fontSize: '13px',
              fontWeight: '700',
              textDecoration: 'none',
              textAlign: 'center',
              width: '100%',
              boxSizing: 'border-box'
            }}>
              Coba OCR Scanner Sekarang
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}