'use client';

import React from 'react';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import Button from '@/components/ui/Button';

interface OcrPreviewProps {
    data: {
        merchant: string;
        date: string;
        total: number;
        items: string[];
    } | null;
    onSave: () => void;
}

export default function OcrPreview({ data, onSave }: OcrPreviewProps) {
    if (!data) return null;

    return (
        <Card title="Hasil Pemindaian AI-OCR" action={<StatusBadge label="Akurasi 98%" type="success" />}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    <strong>Toko/Vendor:</strong> {data.merchant}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    <strong>Tanggal:</strong> {data.date}
                </p>
                <p style={{ margin: 0, fontSize: '14px' }}>
                    <strong>Total Belanja:</strong> Rp {data.total.toLocaleString('id-ID')}
                </p>
                <div style={{ marginTop: '8px' }}>
                    <strong style={{ fontSize: '13px', color: '#475569' }}>Rincian Barang:</strong>
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px', fontSize: '13px', color: '#334155' }}>
                        {data.items.map((item, idx) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul>
                </div>
            </div>
            <Button variant="success" onClick={onSave} style={{ width: '100%', marginTop: '12px' }}>
                ✅ Konfirmasi & Simpan Transaksi
            </Button>
        </Card>
    );
}