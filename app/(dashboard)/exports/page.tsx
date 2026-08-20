'use client';

import { useState } from 'react';

export default function ExportsPage() {
    const [format, setFormat] = useState('PDF');
    const [pdfTemplate, setPdfTemplate] = useState('SIMPLE');
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = (e: React.FormEvent) => {
        e.preventDefault();
        setIsExporting(true);

        setTimeout(() => {
            alert(`Berhasil membuat file export berformat ${format}`);
            setIsExporting(false);
        }, 1200);
    };

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f172a' }}>
                📥 Unduh & Export Laporan
            </h1>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Pilih format berkas laporan untuk keperluan KUR, pajak, atau arsip internal.
            </p>

            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    maxWidth: '500px',
                }}
            >
                <form onSubmit={handleExport} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Format Berkas</label>
                        <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="PDF">PDF Document (.pdf)</option>
                            <option value="CSV">CSV Data (.csv)</option>
                            <option value="XLSX">Excel Spreadsheet (.xlsx)</option>
                            <option value="JSON">JSON (.json)</option>
                            <option value="XML">XML (.xml)</option>
                        </select>
                    </div>

                    {format === 'PDF' && (
                        <div>
                            <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Template PDF</label>
                            <select
                                value={pdfTemplate}
                                onChange={(e) => setPdfTemplate(e.target.value)}
                                style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                            >
                                <option value="SIMPLE">Standar Sederhana</option>
                                <option value="KUR">Ringkas untuk Pengajuan KUR</option>
                                <option value="DETAILED">Detail Lengkap dengan Audit Log</option>
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={isExporting}
                        style={{
                            padding: '10px',
                            backgroundColor: '#0f172a',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        {isExporting ? 'Memproses Berkas...' : '⚡ Generate & Download'}
                    </button>
                </form>
            </div>
        </div>
    );
}