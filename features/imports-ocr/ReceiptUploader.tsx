'use client';

import React, { useState } from 'react';
import Button from '@/components/ui/Button';

interface UploaderProps {
    onUploadSuccess: (mockData: any) => void;
}

export default function ReceiptUploader({ onUploadSuccess }: UploaderProps) {
    const [isScanning, setIsScanning] = useState(false);

    const handleSimulateScan = () => {
        setIsScanning(true);
        setTimeout(() => {
            setIsScanning(false);
            onUploadSuccess({
                merchant: 'Toko Bahan Baku Jaya',
                date: '2026-08-19',
                total: 155000,
                items: ['Tepung Terigu 5kg', 'Minyak Goreng 2L', 'Gula Pasir 1kg'],
            });
        }, 1500);
    };

    return (
        <div
            style={{
                border: '2px dashed #cbd5e1',
                borderRadius: '8px',
                padding: '32px',
                textAlign: 'center',
                backgroundColor: '#f8fafc',
            }}
        >
            <div style={{ fontSize: '40px', marginBottom: '8px' }}>📷</div>
            <h3 style={{ margin: '0 0 8px 0', color: '#0f172a' }}>Upload Struk Belanja</h3>
            <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: '#64748b' }}>
                Sistem AI-OCR akan membaca nominal dan barang dari foto secara otomatis.
            </p>
            <Button onClick={handleSimulateScan} isLoading={isScanning}>
                {isScanning ? 'Menganalisis Struk...' : 'Pilih Foto Struk / Scan'}
            </Button>
        </div>
    );
}