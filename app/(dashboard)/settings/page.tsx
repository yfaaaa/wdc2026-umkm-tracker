'use client';

import { useState } from 'react';

export default function SettingsPage() {
    const [baseCurrency, setBaseCurrency] = useState('IDR');
    const [ocrThreshold, setOcrThreshold] = useState('80');
    const [enableSSE, setEnableSSE] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f172a' }}>
                ⚙️ Pengaturan Aplikasi
            </h1>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Konfigurasi preferensi bisnis dan sistem pembukuan.
            </p>

            {saved && (
                <div style={{ backgroundColor: '#dcfce7', color: '#15803d', padding: '10px', borderRadius: '4px', marginBottom: '16px' }}>
                    ✔ Pengaturan berhasil disimpan!
                </div>
            )}

            <div
                style={{
                    backgroundColor: '#fff',
                    padding: '20px',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0',
                    maxWidth: '500px',
                }}
            >
                <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Base Currency Bisnis</label>
                        <select
                            value={baseCurrency}
                            onChange={(e) => setBaseCurrency(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="IDR">IDR - Indonesian Rupiah</option>
                            <option value="USD">USD - US Dollar</option>
                            <option value="SGD">SGD - Singapore Dollar</option>
                            <option value="MYR">MYR - Malaysian Ringgit</option>
                            <option value="EUR">EUR - Euro</option>
                            <option value="CNY">CNY - Chinese Yuan</option>
                            <option value="AUD">AUD - Australian Dollar</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '14px', marginBottom: '6px' }}>Quota Threshold OCR (%)</label>
                        <input
                            type="number"
                            value={ocrThreshold}
                            onChange={(e) => setOcrThreshold(e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        />
                    </div>

                    <div>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                            <input
                                type="checkbox"
                                checked={enableSSE}
                                onChange={(e) => setEnableSSE(e.target.checked)}
                            />
                            <span style={{ fontSize: '14px' }}>Aktifkan Real-Time Multi-Device Sync (SSE)</span>
                        </label>
                    </div>

                    <button
                        type="submit"
                        style={{
                            padding: '10px',
                            backgroundColor: '#0284c7',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontWeight: 'bold',
                        }}
                    >
                        Simpan Pengaturan
                    </button>
                </form>
            </div>
        </div>
    );
}