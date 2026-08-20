'use client';

import { useState } from 'react';

interface OcrItem {
    id: string;
    merchantName: string;
    amount: number;
    status: 'PROCESSING' | 'PENDING_REVIEW' | 'APPROVED';
    createdAt: string;
}

export default function ImportsPage() {
    const [file, setFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);
    const [items, setItems] = useState<OcrItem[]>([
        {
            id: '1',
            merchantName: 'Toko Bahan Baku Jaya',
            amount: 250000,
            status: 'PENDING_REVIEW',
            createdAt: new Date().toISOString(),
        },
    ]);

    const handleUpload = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file) return;

        setUploading(true);

        // Simulasi upload
        setTimeout(() => {
            const newItem: OcrItem = {
                id: Date.now().toString(),
                merchantName: file.name.replace(/\.[^/.]+$/, ''),
                amount: 150000,
                status: 'PENDING_REVIEW',
                createdAt: new Date().toISOString(),
            };
            setItems([newItem, ...items]);
            setFile(null);
            setUploading(false);
        }, 1000);
    };

    const handleApprove = (id: string) => {
        setItems(
            items.map((item) =>
                item.id === id ? { ...item, status: 'APPROVED' } : item
            )
        );
    };

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f172a' }}>
                📷 Import & Scan OCR Struk
            </h1>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Unggah foto nota/struk belanja untuk dicatat otomatis ke pembukuan.
            </p>

            {/* Form Upload */}
            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    marginBottom: '24px',
                }}
            >
                <h3 style={{ margin: '0 0 12px 0', fontSize: '16px' }}>Upload File Struk</h3>
                <form onSubmit={handleUpload} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] || null)}
                    />
                    <button
                        type="submit"
                        disabled={!file || uploading}
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#0f766e',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                        }}
                    >
                        {uploading ? 'Memproses OCR...' : 'Upload & Scan'}
                    </button>
                </form>
            </div>

            {/* Daftar Dokumen */}
            <h3 style={{ fontSize: '18px', marginBottom: '12px' }}>Daftar Dokumen OCR</h3>
            <table style={{ width: '100%', borderCollapse: 'collapse', backgroundColor: '#fff', border: '1px solid #e2e8f0' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f1f5f9', textAlign: 'left' }}>
                        <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Tanggal</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Merchant / Nama File</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Nominal</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0' }}>Status</th>
                        <th style={{ padding: '10px', borderBottom: '1px solid #e2e8f0', textAlign: 'center' }}>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map((item) => (
                        <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                            <td style={{ padding: '10px' }}>{new Date(item.createdAt).toLocaleDateString('id-ID')}</td>
                            <td style={{ padding: '10px' }}><strong>{item.merchantName}</strong></td>
                            <td style={{ padding: '10px' }}>Rp {item.amount.toLocaleString('id-ID')}</td>
                            <td style={{ padding: '10px' }}>
                                <span
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        fontSize: '12px',
                                        fontWeight: 'bold',
                                        backgroundColor: item.status === 'APPROVED' ? '#dcfce7' : '#fef9c3',
                                        color: item.status === 'APPROVED' ? '#15803d' : '#a16207',
                                    }}
                                >
                                    {item.status}
                                </span>
                            </td>
                            <td style={{ padding: '10px', textAlign: 'center' }}>
                                {item.status === 'PENDING_REVIEW' && (
                                    <button
                                        onClick={() => handleApprove(item.id)}
                                        style={{
                                            padding: '4px 10px',
                                            backgroundColor: '#0284c7',
                                            color: '#fff',
                                            border: 'none',
                                            borderRadius: '4px',
                                            cursor: 'pointer',
                                        }}
                                    >
                                        Setujui & Simpan
                                    </button>
                                )}
                                {item.status === 'APPROVED' && <span style={{ color: '#16a34a' }}>✔ Terkomit</span>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}