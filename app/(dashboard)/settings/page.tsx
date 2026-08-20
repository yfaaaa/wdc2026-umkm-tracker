'use client';

import { useState, useEffect } from 'react';

interface AppSettings {
    businessName: string;
    baseCurrency: string;
    ocrThreshold: number;
    enableSseSync: boolean;
}

export default function SettingsPage() {
    const [businessName, setBusinessName] = useState('KOPI ENAK');
    const [baseCurrency, setBaseCurrency] = useState('IDR');
    const [ocrThreshold, setOcrThreshold] = useState(80);
    const [enableSseSync, setEnableSseSync] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        loadSettings();
    }, []);

    const loadSettings = () => {
        const saved = localStorage.getItem('app_settings');
        if (saved) {
            try {
                const config: AppSettings = JSON.parse(saved);
                setBusinessName(config.businessName || 'KOPI ENAK');
                setBaseCurrency(config.baseCurrency || 'IDR');
                setOcrThreshold(config.ocrThreshold ?? 80);
                setEnableSseSync(!!config.enableSseSync);
            } catch (e) {
                console.error('Error loading settings:', e);
            }
        } else {
            // Sync dengan profile bisnis jika ada
            const profileSaved = localStorage.getItem('user_profile');
            if (profileSaved) {
                try {
                    const parsed = JSON.parse(profileSaved);
                    if (parsed.businessName) setBusinessName(parsed.businessName);
                } catch (e) { }
            }
        }
    };

    const handleSaveSettings = (e: React.FormEvent) => {
        e.preventDefault();

        const config: AppSettings = {
            businessName,
            baseCurrency,
            ocrThreshold: Number(ocrThreshold),
            enableSseSync,
        };

        localStorage.setItem('app_settings', JSON.stringify(config));

        // Update profil global agar nama toko sinkron di seluruh halaman
        const userProfile = { businessName };
        localStorage.setItem('user_profile', JSON.stringify(userProfile));

        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000);
    };

    const handleResetData = () => {
        const confirmed = confirm(
            '⚠️ PERINGATAN BUKAN MAIN-MAIN:\n\nApakah Anda yakin ingin MENGHAPUS SELURUH DATA pembukuan (Transaksi, Akun Kas, dan Struk OCR)?\nData yang dihapus tidak dapat dikembalikan!'
        );

        if (confirmed) {
            const secondConfirm = prompt(
                'Ketik "HAPUS" untuk mengonfirmasi pembersihan total seluruh data:'
            );

            if (secondConfirm === 'HAPUS') {
                localStorage.removeItem('financial_transactions');
                localStorage.removeItem('financial_accounts');
                localStorage.removeItem('ocr_receipts');
                localStorage.removeItem('app_settings');
                localStorage.removeItem('user_profile');

                alert('✅ Seluruh data pembukuan berhasil dibersihkan!');
                window.location.reload();
            } else {
                alert('❌ Pembatalan reset data.');
            }
        }
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
        .btn-save {
          width: 100%;
          background-color: #0284c7;
          color: #ffffff;
          border: none;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.2);
        }
        .btn-save:hover {
          background-color: #0369a1;
          transform: translateY(-1px);
        }
        .btn-danger {
          width: 100%;
          background-color: #fef2f2;
          color: #dc2626;
          border: 1px solid #fca5a5;
          padding: 12px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        .btn-danger:hover {
          background-color: #fee2e2;
          border-color: #f87171;
        }
        .checkbox-label {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 13px;
          font-weight: 600;
          color: #334155;
          cursor: pointer;
          user-select: none;
        }
      `}</style>

            {/* HEADER SECTION */}
            <div style={{ marginBottom: '24px' }}>
                <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    ⚙️ Pengaturan Aplikasi
                </h1>
                <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
                    Konfigurasi preferensi bisnis, sistem pembukuan, dan otomasisasi data.
                </p>
            </div>

            {/* NOTIFICATION SUCCESS BANNER */}
            {isSaved && (
                <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #86efac', color: '#16a34a', padding: '12px 18px', borderRadius: '12px', fontSize: '13.5px', fontWeight: '700', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>✅</span> Pengaturan berhasil disimpan dan diperbarui!
                </div>
            )}

            {/* TWO COLUMN GRID LAYOUT */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '20px', alignItems: 'start' }}>

                {/* LEFT COLUMN: PREFERENSI FORM */}
                <div className="glass-panel">
                    <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', marginBottom: '18px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        🔧 Preferensi Sistem & OCR
                    </h3>

                    <form onSubmit={handleSaveSettings} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>

                        {/* Nama Usaha / Toko */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                                Nama Usaha / Toko
                            </label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                className="input-stylish"
                                required
                            />
                        </div>

                        {/* Base Currency */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                                Base Currency Bisnis
                            </label>
                            <select
                                value={baseCurrency}
                                onChange={(e) => setBaseCurrency(e.target.value)}
                                className="input-stylish"
                            >
                                <option value="IDR">IDR - Indonesian Rupiah</option>
                                <option value="USD">USD - US Dollar</option>
                                <option value="SGD">SGD - Singapore Dollar</option>
                            </select>
                        </div>

                        {/* Quota Threshold OCR */}
                        <div>
                            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '700', color: '#334155', marginBottom: '6px' }}>
                                Quota Threshold OCR (%)
                            </label>
                            <input
                                type="number"
                                min="1"
                                max="100"
                                value={ocrThreshold}
                                onChange={(e) => setOcrThreshold(Number(e.target.value))}
                                className="input-stylish"
                            />
                            <p style={{ fontSize: '11.5px', color: '#64748b', marginTop: '4px', margin: '4px 0 0 0' }}>
                                Batas persentase batas aman penggunaan OCR sebelum peringatan kuota muncul.
                            </p>
                        </div>

                        {/* Checkbox Real-time Sync */}
                        <div style={{ marginTop: '4px' }}>
                            <label className="checkbox-label">
                                <input
                                    type="checkbox"
                                    checked={enableSseSync}
                                    onChange={(e) => setEnableSseSync(e.target.checked)}
                                    style={{ width: '16px', height: '16px', accentColor: '#0284c7' }}
                                />
                                <span>Aktifkan Real-Time Multi-Device Sync (SSE)</span>
                            </label>
                        </div>

                        {/* Simpan Button */}
                        <div style={{ marginTop: '8px' }}>
                            <button type="submit" className="btn-save">
                                Simpan Pengaturan
                            </button>
                        </div>
                    </form>
                </div>

                {/* RIGHT COLUMN: LICENSE INFO & DANGER ZONE */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

                    {/* LICENSE CARD */}
                    <div className="glass-panel">
                        <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#0f172a', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            📇 Informasi Lisensi Aplikasi
                        </h3>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#64748b', fontWeight: '500' }}>Status Lisensi:</span>
                                <span style={{ fontWeight: '800', color: '#16a34a' }}>PRO / UMKM Enterprise</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#64748b', fontWeight: '500' }}>Versi Aplikasi:</span>
                                <span style={{ fontWeight: '700', color: '#0f172a' }}>v2.4.0 (Next.js App Router)</span>
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <span style={{ color: '#64748b', fontWeight: '500' }}>Penyimpanan Local:</span>
                                <span style={{ fontWeight: '700', color: '#0f172a' }}>Browser LocalStorage Active</span>
                            </div>
                        </div>
                    </div>

                    {/* DANGER ZONE CARD */}
                    <div className="glass-panel" style={{ border: '1px solid #fca5a5', backgroundColor: '#ffffff' }}>
                        <h3 style={{ fontSize: '15.5px', fontWeight: '800', color: '#dc2626', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                            ⚠️ Danger Zone (Reset System)
                        </h3>

                        <p style={{ fontSize: '12.5px', color: '#64748b', margin: '0 0 16px 0', lineHeight: '1.5' }}>
                            Gunakan fitur ini jika ingin menghapus seluruh data uji coba dan memulai pembukuan dari nol.
                        </p>

                        <button type="button" onClick={handleResetData} className="btn-danger">
                            🔥 Reset Semua Data Pembukuan
                        </button>
                    </div>

                </div>

            </div>
        </div>
    );
}