'use client';

import Link from 'next/link';

export default function LandingPage() {
    return (
        <div style={{ width: '100%', overflowX: 'hidden' }}>
            <style>{`
        .btn-hero-primary {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          box-shadow: 0 6px 20px rgba(15, 23, 42, 0.2);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .btn-hero-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.3);
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }
        .btn-hero-secondary {
          background-color: #ffffff;
          color: #0284c7;
          border: 1.5px solid #bae6fd;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.08);
          transition: all 0.3s ease;
        }
        .btn-hero-secondary:hover {
          background-color: #f0f9ff;
          border-color: #38bdf8;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(2, 132, 199, 0.15);
        }
        .soft-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 30px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .soft-card:hover {
          transform: translateY(-6px);
          border-color: #38bdf8;
          box-shadow: 0 16px 32px -8px rgba(2, 132, 199, 0.12);
        }
        .floating-badge-1 {
          animation: floatSlow 4s ease-in-out infinite;
        }
        .floating-badge-2 {
          animation: floatSlow 4s ease-in-out infinite 2s;
        }
        @keyframes floatSlow {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

            {/* HERO SECTION FULL WIDTH */}
            <section style={{ width: '100%', padding: '70px 24px 60px', background: 'radial-gradient(circle at 50% 0%, #f0f9ff 0%, #f8fafc 70%)' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>

                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e0f2fe', border: '1px solid #bae6fd', color: '#0369a1', padding: '6px 18px', borderRadius: '30px', fontSize: '13px', fontWeight: '700', marginBottom: '28px' }}>
                        <span>✨</span> Sistem Pembukuan & Operasional UMKM Modern #1 di Indonesia
                    </div>

                    <h1 style={{ fontSize: '52px', fontWeight: '900', lineHeight: '1.15', color: '#0f172a', letterSpacing: '-1.5px', marginBottom: '22px' }}>
                        Kelola Keuangan & Ekosistem Bisnis UMKM Lebih <span style={{ color: '#0284c7', background: 'linear-gradient(135deg, #0284c7 0%, #2563eb 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Cerdas & Otomatis</span>
                    </h1>

                    <p style={{ fontSize: '18px', color: '#64748b', maxWidth: '720px', margin: '0 auto 38px', lineHeight: '1.6' }}>
                        Otomatisasi pencatatan kas, scan struk belanja dengan AI OCR, laporan untung/rugi siap cetak, serta etalase produk digital dalam satu platform terpadu.
                    </p>

                    <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', marginBottom: '60px', flexWrap: 'wrap' }}>
                        <Link
                            href="/register"
                            className="btn-hero-primary"
                            style={{ padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                        >
                            🚀 Mulai Pembukuan Gratis
                        </Link>
                        <Link
                            href="/catalog"
                            className="btn-hero-secondary"
                            style={{ padding: '16px 32px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                        >
                            🏪 Lihat Katalog Toko
                        </Link>
                    </div>

                    {/* MOCKUP & FLOATING BADGES */}
                    <div style={{ position: 'relative', maxWidth: '980px', margin: '0 auto' }}>
                        <div style={{ borderRadius: '20px', padding: '10px', background: 'linear-gradient(180deg, #ffffff 0%, #cbd5e1 100%)', boxShadow: '0 25px 50px -12px rgba(15, 23, 42, 0.18)' }}>
                            <img
                                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1400&q=80"
                                alt="UMKM Tracker Dashboard"
                                style={{ width: '100%', borderRadius: '12px', height: '460px', objectFit: 'cover', display: 'block' }}
                            />
                        </div>

                        {/* Floating Badge Left */}
                        <div className="floating-badge-1" style={{ position: 'absolute', top: '12%', left: '-24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 12px 30px rgba(0,0,0,0.12)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ backgroundColor: '#dcfce7', color: '#16a34a', padding: '10px', borderRadius: '12px', fontSize: '22px' }}>📈</div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>Omset Bulan Ini</div>
                                <div style={{ fontSize: '17px', fontWeight: '800', color: '#16a34a' }}>+ Rp 18.450.000</div>
                            </div>
                        </div>

                        {/* Floating Badge Right */}
                        <div className="floating-badge-2" style={{ position: 'absolute', bottom: '12%', right: '-24px', backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '16px', padding: '16px 20px', boxShadow: '0 12px 30px rgba(0,0,0,0.12)', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ backgroundColor: '#e0f2fe', color: '#0284c7', padding: '10px', borderRadius: '12px', fontSize: '22px' }}>📸</div>
                            <div>
                                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: '700' }}>AI OCR Struk</div>
                                <div style={{ fontSize: '14px', fontWeight: '800', color: '#0f172a' }}>Terbaca Otomatis (99.8%)</div>
                            </div>
                        </div>
                    </div>

                </div>
            </section>

            {/* STATS STRIP */}
            <section style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '36px 24px', width: '100%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', textAlign: 'center' }}>
                    <div>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '2px' }}>12,500+</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>UMKM Terdaftar</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', color: '#0284c7', marginBottom: '2px' }}>Rp 85 M+</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Transaksi Terpembukukan</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', color: '#16a34a', marginBottom: '2px' }}>99.8%</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Akurasi Ekstraksi OCR</p>
                    </div>
                    <div>
                        <h3 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '2px' }}>4.9 / 5.0</h3>
                        <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>Kepuasan Pengguna</p>
                    </div>
                </div>
            </section>

            {/* FITUR UNGGULAN */}
            <section id="fitur" style={{ maxWidth: '1280px', margin: '0 auto', padding: '90px 24px' }}>
                <div style={{ textAlign: 'center', marginBottom: '56px' }}>
                    <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '6px 14px', borderRadius: '20px' }}>
                        FITUR UNGGULAN
                    </span>
                    <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', marginTop: '16px' }}>
                        Segala Hal Yang Dibutuhkan Usaha Anda
                    </h2>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
                    <div className="soft-card">
                        <div style={{ backgroundColor: '#e0f2fe', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                            📸
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
                            Import & Scan AI OCR Struk
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                            Cukup foto nota belanja bahan baku. Sistem AI akan membaca tanggal, nama toko, dan nominal total secara otomatis tanpa perlu diketik manual.
                        </p>
                    </div>

                    <div className="soft-card">
                        <div style={{ backgroundColor: '#dcfce7', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                            📊
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
                            Dashboard Real-Time Kas
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                            Pantau arus uang masuk dan keluar secara langsung. Dilengkapi grafik statistik kondisi finansial harian dan bulanan yang mudah dipahami.
                        </p>
                    </div>

                    <div className="soft-card">
                        <div style={{ backgroundColor: '#fef3c7', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                            📑
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
                            Export Laporan Siap Pakai
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                            Unduh laporan keuangan format PDF dan Excel resmi yang siap digunakan untuk pengajuan KUR bank, laporan pajak, atau evaluasi bisnis.
                        </p>
                    </div>

                    <div className="soft-card">
                        <div style={{ backgroundColor: '#f3e8ff', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                            🛍️
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
                            Katalog Produk Digital
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                            Pajang barang jualan kamu dalam etalase web interaktif yang siap dibagikan ke pelanggan via WhatsApp secara profesional.
                        </p>
                    </div>

                    <div className="soft-card">
                        <div style={{ backgroundColor: '#fee2e2', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                            💳
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
                            Multi Akun & Rekening Bank
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                            Kelola kas tunai, rekening bank, dan e-wallet dalam satu tempat dengan pemisahan saldo otomatis yang rapi dan terukur.
                        </p>
                    </div>

                    <div className="soft-card">
                        <div style={{ backgroundColor: '#ccfbf1', width: '52px', height: '52px', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', marginBottom: '20px' }}>
                            🔒
                        </div>
                        <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px', color: '#0f172a' }}>
                            Keamanan Data Privat
                        </h3>
                        <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                            Seluruh rekam pembukuan tersimpan aman secara privat di penyimpanan perangkat kamu dengan opsi ekspor & reset data kapan saja.
                        </p>
                    </div>
                </div>
            </section>

            {/* CARA KERJA SECTION */}
            <section id="cara-kerja" style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '90px 24px', width: '100%' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '6px 14px', borderRadius: '20px' }}>
                            LANGKAH MUDAH
                        </span>
                        <h2 style={{ fontSize: '36px', fontWeight: '800', color: '#0f172a', marginTop: '16px' }}>
                            3 Langkah Memulai Pembukuan Otomatis
                        </h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
                        <div style={{ textAlign: 'center', padding: '24px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 18px rgba(2, 132, 199, 0.25)' }}>
                                1
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Daftarkan Akun Usaha</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>Buat profil usaha dalam waktu kurang dari 1 menit gratis tanpa perlu registrasi yang rumit.</p>
                        </div>

                        <div style={{ textAlign: 'center', padding: '24px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 18px rgba(2, 132, 199, 0.25)' }}>
                                2
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Catat atau Scan Struk</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>Upload foto nota pembelian atau masukkan transaksi harian secara cepat dan fleksibel.</p>
                        </div>

                        <div style={{ textAlign: 'center', padding: '24px', borderRadius: '16px', backgroundColor: '#f8fafc', border: '1px solid #f1f5f9' }}>
                            <div style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: '#0284c7', color: '#ffffff', fontSize: '24px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', boxShadow: '0 8px 18px rgba(2, 132, 199, 0.25)' }}>
                                3
                            </div>
                            <h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Pantau & Unduh Laporan</h3>
                            <p style={{ fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>Dapatkan gambaran laba bersih instan serta cetak laporan finansial yang siap pakai.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* BANNER CTA BOTTOM */}
            <section style={{ maxWidth: '1280px', margin: '80px auto', padding: '0 24px' }}>
                <div style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)', borderRadius: '24px', padding: '60px 40px', color: '#ffffff', textAlign: 'center', position: 'relative', overflow: 'hidden', boxShadow: '0 20px 40px rgba(15, 23, 42, 0.2)' }}>
                    <h2 style={{ fontSize: '38px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-0.5px' }}>
                        Siap Bawa Bisnis UMKM Kamu Ke Level Berikutnya?
                    </h2>
                    <p style={{ fontSize: '16px', color: '#94a3b8', maxWidth: '620px', margin: '0 auto 32px', lineHeight: '1.6' }}>
                        Bergabunglah dengan puluhan ribu pemilik toko dan UMKM yang telah mempermudah operasional keuangan mereka secara digital.
                    </p>
                    <Link
                        href="/register"
                        className="btn-hero-primary"
                        style={{ backgroundColor: '#0284c7', padding: '16px 36px', borderRadius: '12px', fontWeight: '700', fontSize: '16px', textDecoration: 'none', display: 'inline-block' }}
                    >
                        Mulai Sekarang - Gratis 100%
                    </Link>
                </div>
            </section>
        </div>
    );
}