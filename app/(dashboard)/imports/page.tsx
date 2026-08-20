'use client';

import { useState, useEffect, useRef } from 'react';

interface ReceiptItem {
    name: string;
    price: number;
}

interface Receipt {
    id: string;
    fileName: string;
    fileUrl?: string;
    uploadDate: string;
    merchant: string;
    transactionDate: string;
    amount: number;
    status: 'SUCCESS' | 'PROCESSING' | 'FAILED';
    confidence: number;
    items: ReceiptItem[];
    isSynced?: boolean;
}

export default function ScanOCRPage() {
    const [receipts, setReceipts] = useState<Receipt[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // Drag & Drop & Upload State
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isScanning, setIsScanning] = useState(false);
    const [scanProgress, setScanProgress] = useState(0);

    // Modal Preview State
    const [activeReceipt, setActiveReceipt] = useState<Receipt | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        loadReceipts();
    }, []);

    const loadReceipts = () => {
        const saved = localStorage.getItem('ocr_receipts');
        if (saved) {
            try {
                setReceipts(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading receipts:', e);
            }
        } else {
            const initial: Receipt[] = [
                {
                    id: 'rec-1',
                    fileName: 'struk_kopi_janji_jiwa.jpg',
                    fileUrl: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=500&auto=format&fit=crop&q=60',
                    uploadDate: '2026-08-20',
                    merchant: 'Janji Jiwa Jiwa Group',
                    transactionDate: '2026-08-20',
                    amount: 48000,
                    status: 'SUCCESS',
                    confidence: 96,
                    items: [
                        { name: 'Kopi Kenangan Mantan (L)', price: 24000 },
                        { name: 'Americano Regular', price: 24000 }
                    ],
                    isSynced: true
                }
            ];
            setReceipts(initial);
            localStorage.setItem('ocr_receipts', JSON.stringify(initial));
        }
    };

    const saveReceipts = (updated: Receipt[]) => {
        setReceipts(updated);
        localStorage.setItem('ocr_receipts', JSON.stringify(updated));
    };

    const handleFileChange = (file: File | null) => {
        if (!file) return;
        if (file.size > 5 * 1024 * 1024) {
            alert('Ukuran file melebihi batas maksimal 5MB');
            return;
        }
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
    };

    const handleStartScan = () => {
        if (!selectedFile) return;

        setIsScanning(true);
        setScanProgress(0);

        const interval = setInterval(() => {
            setScanProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    finishScanProcess();
                    return 100;
                }
                return prev + 15;
            });
        }, 250);
    };

    const finishScanProcess = () => {
        const mockMerchants = ['Indomaret Toko', 'Alfamart Utama', 'SPBU Pertamina', 'Kopi Kenangan', 'Bahan Baku Supplier Budi'];
        const randomMerchant = mockMerchants[Math.floor(Math.random() * mockMerchants.length)];
        const randomAmount = Math.floor(Math.random() * 250000) + 15000;

        const newReceipt: Receipt = {
            id: Date.now().toString(),
            fileName: selectedFile?.name || 'struk_pembelian.jpg',
            fileUrl: previewUrl || undefined,
            uploadDate: new Date().toISOString().split('T')[0],
            merchant: randomMerchant,
            transactionDate: new Date().toISOString().split('T')[0],
            amount: randomAmount,
            status: 'SUCCESS',
            confidence: Math.floor(Math.random() * 10) + 90,
            items: [
                { name: 'Item Pembelian A', price: Math.round(randomAmount * 0.6) },
                { name: 'Item Pembelian B', price: Math.round(randomAmount * 0.4) }
            ],
            isSynced: false
        };

        const updated = [newReceipt, ...receipts];
        saveReceipts(updated);

        setIsScanning(false);
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = '';

        setActiveReceipt(newReceipt);
    };

    const syncToTransactions = (receipt: Receipt) => {
        const existingTx = localStorage.getItem('financial_transactions');
        let txList = [];
        if (existingTx) {
            try { txList = JSON.parse(existingTx); } catch (e) { }
        }

        const newTx = {
            id: Date.now().toString(),
            type: 'OUT',
            accountId: '1',
            accountName: 'Kas Utama Toko',
            category: 'Bahan Baku',
            amount: receipt.amount,
            description: `[OCR Struk] ${receipt.merchant}`,
            date: receipt.transactionDate,
        };

        localStorage.setItem('financial_transactions', JSON.stringify([newTx, ...txList]));

        const updatedReceipts = receipts.map(r => r.id === receipt.id ? { ...r, isSynced: true } : r);
        saveReceipts(updatedReceipts);
        alert('✅ Transaksi berhasil dicatat otomatis ke Pembukuan Transaksi!');
    };

    const handleDelete = (id: string) => {
        if (confirm('Hapus dokumen struk ini?')) {
            const updated = receipts.filter(r => r.id !== id);
            saveReceipts(updated);
            if (activeReceipt?.id === id) setActiveReceipt(null);
        }
    };

    const filteredReceipts = receipts.filter(
        (r) =>
            r.merchant.toLowerCase().includes(searchQuery.toLowerCase()) ||
            r.fileName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <style>{`
        .glass-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.03);
          transition: all 0.3s ease;
        }
        .dropzone-area {
          border: 2px dashed #cbd5e1;
          background-color: #f8fafc;
          border-radius: 16px;
          padding: 32px 20px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
        }
        .dropzone-area.dragging, .dropzone-area:hover {
          border-color: #0284c7;
          background-color: #f0f9ff;
        }
        .input-stylish {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #f8fafc;
          color: #0f172a;
          font-size: 13.5px;
          font-weight: 500;
          outline: none;
          box-sizing: border-box;
        }
        .btn-ai {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .btn-ai:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(2, 132, 199, 0.35);
        }
        .btn-ai:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .table-row:hover {
          background-color: #f8fafc;
        }
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(4px);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }
      `}</style>

            {/* HEADER SECTION */}
            <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
                    <span>⚡ AI OCR Scanner</span>
                </div>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
                    Import & Scan OCR Struk
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
                    Unggah foto nota atau struk belanja. Teknologi AI akan mengesktrak nama toko, tanggal, item, dan total belanja secara otomatis.
                </p>
            </div>

            {/* DRAG & DROP UPLOAD PANEL */}
            <div className="glass-panel" style={{ marginBottom: '28px' }}>
                <div
                    className={`dropzone-area ${isDragging ? 'dragging' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                    onDragLeave={() => setIsDragging(false)}
                    onDrop={(e) => {
                        e.preventDefault();
                        setIsDragging(false);
                        if (e.dataTransfer.files?.[0]) handleFileChange(e.dataTransfer.files[0]);
                    }}
                    onClick={() => fileInputRef.current?.click()}
                >
                    <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,application/pdf"
                        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                        style={{ display: 'none' }}
                    />

                    {previewUrl ? (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
                            <img
                                src={previewUrl}
                                alt="Receipt Preview"
                                style={{ maxHeight: '160px', borderRadius: '8px', border: '1px solid #cbd5e1', boxShadow: '0 4px 10px rgba(0,0,0,0.05)' }}
                            />
                            <div style={{ fontSize: '13px', fontWeight: '700', color: '#0f172a' }}>
                                📄 {selectedFile?.name} ({(selectedFile!.size / 1024).toFixed(1)} KB)
                            </div>
                            <span style={{ fontSize: '12px', color: '#0284c7', fontWeight: '600' }}>Klik atau tarik untuk mengganti file</span>
                        </div>
                    ) : (
                        <div>
                            <div style={{ fontSize: '42px', marginBottom: '10px' }}>🧾</div>
                            <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#0f172a', marginBottom: '4px' }}>
                                Pilih atau Tarik File Struk Pembelian
                            </h3>
                            <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0' }}>
                                Mendukung format JPG, PNG, WEBP, atau PDF (Maksimal 5MB)
                            </p>
                        </div>
                    )}
                </div>

                {/* SCAN ACTION BAR */}
                {selectedFile && (
                    <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        {isScanning ? (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: '#0284c7', marginBottom: '6px' }}>
                                    <span>🤖 AI sedang mengekstrak teks & nominal struk...</span>
                                    <span>{scanProgress}%</span>
                                </div>
                                <div style={{ width: '100%', height: '8px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
                                    <div
                                        style={{
                                            height: '100%',
                                            width: `${scanProgress}%`,
                                            backgroundColor: '#0284c7',
                                            transition: 'width 0.2s ease',
                                        }}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
                                <button
                                    type="button"
                                    onClick={() => { setSelectedFile(null); setPreviewUrl(null); }}
                                    style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}
                                >
                                    Batal
                                </button>
                                <button
                                    type="button"
                                    onClick={handleStartScan}
                                    className="btn-ai"
                                >
                                    ⚡ Upload & Scan AI
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* TABLE SECTION */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
                {/* Table Top Bar */}
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '400px' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Cari merchant atau nama file..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-stylish"
                            style={{ paddingLeft: '36px' }}
                        />
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                        Total Struk: <strong style={{ color: '#0f172a' }}>{filteredReceipts.length} Document</strong>
                    </div>
                </div>

                {/* Data Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', textTransform: 'uppercase', fontSize: '11.5px', letterSpacing: '0.5px' }}>
                                <th style={{ padding: '14px 24px' }}>Tanggal</th>
                                <th style={{ padding: '14px 20px' }}>Merchant / Nama Toko</th>
                                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Nominal Extracted</th>
                                <th style={{ padding: '14px 20px', textAlign: 'center' }}>Status OCR</th>
                                <th style={{ padding: '14px 24px', textAlign: 'center' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredReceipts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                                        <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📄</span>
                                        <p style={{ fontWeight: '600', color: '#475569' }}>Belum ada dokumen struk yang diunggah</p>
                                        <p style={{ fontSize: '12px' }}>Gunakan area dropzone di atas untuk mengunggah nota belanja</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredReceipts.map((r) => (
                                    <tr key={r.id} className="table-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                        <td style={{ padding: '16px 24px', fontWeight: '600', color: '#475569' }}>
                                            {r.transactionDate}
                                        </td>

                                        <td style={{ padding: '16px 20px', fontWeight: '700', color: '#0f172a' }}>
                                            <div>{r.merchant}</div>
                                            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                                                File: {r.fileName}
                                            </div>
                                        </td>

                                        <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: '800', color: '#0f172a', fontSize: '14.5px' }}>
                                            Rp {r.amount.toLocaleString('id-ID')}
                                        </td>

                                        <td style={{ padding: '16px 20px', textAlign: 'center' }}>
                                            <span style={{
                                                backgroundColor: '#f0fdf4',
                                                color: '#16a34a',
                                                padding: '4px 10px',
                                                borderRadius: '20px',
                                                fontSize: '11.5px',
                                                fontWeight: '700',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                ✓ Extracted ({r.confidence}%)
                                            </span>
                                        </td>

                                        <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => setActiveReceipt(r)}
                                                    style={{ backgroundColor: '#e0f2fe', color: '#0284c7', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                                                >
                                                    👁 Review
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(r.id)}
                                                    style={{ backgroundColor: '#fef2f2', color: '#dc2626', border: 'none', padding: '6px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                                                >
                                                    Hapus
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* MODAL PREVIEW DETAIL OCR */}
            {activeReceipt && (
                <div className="modal-overlay" onClick={() => setActiveReceipt(null)}>
                    <div
                        className="glass-panel"
                        style={{ width: '100%', maxWidth: '560px', padding: '28px', backgroundColor: '#ffffff', borderRadius: '20px' }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid #e2e8f0', paddingBottom: '14px' }}>
                            <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>
                                🔍 Hasil Ekstraksi AI Struk
                            </h3>
                            <button
                                onClick={() => setActiveReceipt(null)}
                                style={{ background: 'none', border: 'none', fontSize: '18px', cursor: 'pointer', color: '#64748b' }}
                            >
                                ✕
                            </button>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
                            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>MERCHANT</span>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>{activeReceipt.merchant}</div>
                            </div>

                            <div style={{ backgroundColor: '#f8fafc', padding: '12px', borderRadius: '10px', border: '1px solid #e2e8f0' }}>
                                <span style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>TANGGAL</span>
                                <div style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginTop: '2px' }}>{activeReceipt.transactionDate}</div>
                            </div>
                        </div>

                        {/* BREAKDOWN ITEM */}
                        <div style={{ marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '12.5px', fontWeight: '700', color: '#475569', textTransform: 'uppercase', marginBottom: '8px' }}>
                                Item Terdeteksi
                            </h4>
                            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '12px' }}>
                                {activeReceipt.items?.map((item, idx) => (
                                    <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', padding: '4px 0', borderBottom: idx !== activeReceipt.items.length - 1 ? '1px dashed #e2e8f0' : 'none' }}>
                                        <span style={{ color: '#334155', fontWeight: '500' }}>{item.name}</span>
                                        <span style={{ fontWeight: '700', color: '#0f172a' }}>Rp {item.price.toLocaleString('id-ID')}</span>
                                    </div>
                                ))}
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px', paddingTop: '8px', borderTop: '2px solid #cbd5e1', fontWeight: '800', fontSize: '15px', color: '#0284c7' }}>
                                    <span>GRAND TOTAL</span>
                                    <span>Rp {activeReceipt.amount.toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>

                        {/* ACTION BUTTONS */}
                        <div style={{ display: 'flex', gap: '10px' }}>
                            {activeReceipt.isSynced ? (
                                <button
                                    disabled
                                    style={{ width: '100%', backgroundColor: '#f0fdf4', color: '#16a34a', border: '1px solid #86efac', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '13.5px' }}
                                >
                                    ✓ Sudah Dicatat di Pembukuan
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        syncToTransactions(activeReceipt);
                                        setActiveReceipt(null);
                                    }}
                                    style={{ width: '100%', background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', color: '#ffffff', border: 'none', padding: '12px', borderRadius: '10px', fontWeight: '700', fontSize: '13.5px', cursor: 'pointer' }}
                                >
                                    ➕ Catat Otomatis ke Transaksi Keuangan
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}