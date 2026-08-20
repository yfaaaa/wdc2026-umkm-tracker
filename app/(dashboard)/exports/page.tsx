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

export default function ExportBerkasPage() {
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [businessName, setBusinessName] = useState('KOPI ENAK');
    const [fileFormat, setFileFormat] = useState<'pdf' | 'excel' | 'csv'>('pdf');
    const [templateType, setTemplateType] = useState('standar');
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        // Load Transaksi
        const savedTx = localStorage.getItem('financial_transactions');
        if (savedTx) {
            try {
                setTransactions(JSON.parse(savedTx));
            } catch (e) {
                console.error('Error loading transactions:', e);
            }
        }

        // Load Nama Bisnis/Profil jika ada
        const savedProfile = localStorage.getItem('user_profile');
        if (savedProfile) {
            try {
                const parsed = JSON.parse(savedProfile);
                if (parsed.businessName) setBusinessName(parsed.businessName);
            } catch (e) { }
        }
    };

    // Kalkulasi Ringkasan Data Real-time
    const totalTransactions = transactions.length;

    const totalIncome = transactions
        .filter((t) => t?.type === 'IN')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const totalExpense = transactions
        .filter((t) => t?.type === 'OUT')
        .reduce((sum, t) => sum + Number(t.amount || 0), 0);

    const netProfit = totalIncome - totalExpense;

    // Fungsi Export Berkas (CSV / Excel / PDF)
    const handleGenerateAndDownload = () => {
        setIsGenerating(true);

        setTimeout(() => {
            if (fileFormat === 'csv' || fileFormat === 'excel') {
                // Export CSV / Excel Format Data
                const headers = ['ID Transaksi', 'Tanggal', 'Tipe', 'Kategori', 'Akun Kas', 'Keterangan', 'Nominal (IDR)'];
                const rows = transactions.map((t) => [
                    t.id,
                    t.date,
                    t.type === 'IN' ? 'Pemasukan' : t.type === 'OUT' ? 'Pengeluaran' : 'Transfer',
                    `"${t.category || ''}"`,
                    `"${t.accountName || ''}"`,
                    `"${t.description || ''}"`,
                    t.amount,
                ]);

                const csvContent =
                    'data:text/csv;charset=utf-8,\uFEFF' +
                    [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

                const encodedUri = encodeURI(csvContent);
                const link = document.createElement('a');
                link.setAttribute('href', encodedUri);
                link.setAttribute(
                    'download',
                    `Laporan_Keuangan_${businessName.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.${fileFormat === 'excel' ? 'csv' : 'csv'}`
                );
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } else {
                // Format PDF (Memicu Print Preview Dialog Browser)
                window.print();
            }

            setIsGenerating(false);
        }, 600);
    };

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
        .input-stylish {
          width: 100%;
          padding: 11px 14px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #ffffff;
          color: #0f172a;
          font-size: 13.5px;
          font-weight: 600;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .input-stylish:focus {
          border-color: #0284c7;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
        }
        .btn-generate {
          width: 100%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          border: none;
          padding: 14px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .btn-generate:hover {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          transform: translateY(-1px);
        }
        .btn-generate:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px 0;
          border-bottom: 1px dashed #e2e8f0;
          font-size: 13.5px;
        }
        .summary-row:last-child {
          border-bottom: none;
        }

        @media print {
          body * {
            visibility: hidden;
          }
          .printable-area, .printable-area * {
            visibility: visible;
          }
          .printable-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
        }
      `}</style>

            {/* HEADER SECTION */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    📑 Unduh & Export Laporan
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
                    Pilih format berkas laporan untuk keperluan KUR, pajak, atau arsip internal.
                </p>
            </div>

            {/* GRID CONTAINER FORM & SUMMARY */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', alignItems: 'start' }}>

                {/* LEFT CARD: EXPORT FORM */}
                <div className="glass-panel">
                    <form onSubmit={(e) => { e.preventDefault(); handleGenerateAndDownload(); }} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                        {/* SELECT FORMAT BERKAS */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                                Format Berkas
                            </label>
                            <select
                                value={fileFormat}
                                onChange={(e) => setFileFormat(e.target.value as any)}
                                className="input-stylish"
                            >
                                <option value="pdf">PDF Document (.pdf)</option>
                                <option value="excel">Excel Spreadsheet (.xlsx)</option>
                                <option value="csv">CSV Raw Data (.csv)</option>
                            </select>
                        </div>

                        {/* SELECT TEMPLATE & KEPERLUAN */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '8px' }}>
                                Template & Keperluan
                            </label>
                            <select
                                value={templateType}
                                onChange={(e) => setTemplateType(e.target.value)}
                                className="input-stylish"
                            >
                                <option value="standar">Standar Sederhana</option>
                                <option value="kur">Pengajuan KUR / Bank</option>
                                <option value="pajak">Laporan Pajak UMKM</option>
                                <option value="audit">Arsip Internal Audit</option>
                            </select>
                        </div>

                        {/* BUTTON DOWNLOAD */}
                        <button
                            type="submit"
                            disabled={isGenerating}
                            className="btn-generate"
                            style={{ marginTop: '10px' }}
                        >
                            {isGenerating ? '⌛ Memproses Berkas...' : '⚡ Generate & Download'}
                        </button>
                    </form>
                </div>

                {/* RIGHT CARD: SUMMARY PREVIEW */}
                <div className="glass-panel printable-area">
                    <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🎯 Ringkasan Data Yang Akan Diexport
                    </h3>

                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', border: '1px solid #f1f5f9', padding: '4px 16px', marginBottom: '18px' }}>
                        <div className="summary-row">
                            <span style={{ color: '#64748b', fontWeight: '600' }}>Entitas Bisnis:</span>
                            <span style={{ fontWeight: '800', color: '#0f172a', textTransform: 'uppercase' }}>{businessName}</span>
                        </div>

                        <div className="summary-row">
                            <span style={{ color: '#64748b', fontWeight: '600' }}>Jumlah Transaksi:</span>
                            <span style={{ fontWeight: '800', color: '#0f172a' }}>{totalTransactions} Transaksi</span>
                        </div>

                        <div className="summary-row">
                            <span style={{ color: '#64748b', fontWeight: '600' }}>Total Pemasukan:</span>
                            <span style={{ fontWeight: '800', color: '#16a34a' }}>Rp {totalIncome.toLocaleString('id-ID')}</span>
                        </div>

                        <div className="summary-row">
                            <span style={{ color: '#64748b', fontWeight: '600' }}>Total Pengeluaran:</span>
                            <span style={{ fontWeight: '800', color: '#dc2626' }}>Rp {totalExpense.toLocaleString('id-ID')}</span>
                        </div>

                        <div className="summary-row" style={{ paddingTop: '14px', marginTop: '4px', borderTop: '2px solid #e2e8f0' }}>
                            <span style={{ color: '#0f172a', fontWeight: '800' }}>Estimasi Laba Bersih:</span>
                            <span style={{ fontWeight: '800', fontSize: '15px', color: netProfit >= 0 ? '#16a34a' : '#dc2626' }}>
                                Rp {netProfit.toLocaleString('id-ID')}
                            </span>
                        </div>
                    </div>

                    {/* INFO ALERT BOX */}
                    <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '14px 16px', display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '16px' }}>💡</span>
                        <p style={{ fontSize: '12px', color: '#475569', margin: '0', lineHeight: '1.5', fontWeight: '500' }}>
                            <strong>Info:</strong> Berkas yang diunduh mencakup seluruh rekaman arus kas terkini dan aman disimpan secara lokal di perangkat kamu.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
}