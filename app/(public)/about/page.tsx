'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .public-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(16px);
          background-color: rgba(255, 255, 255, 0.88);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s ease;
        }
        .nav-link {
          color: #475569;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          padding: 8px 12px;
          border-radius: 8px;
          transition: all 0.2s ease;
        }
        .nav-link:hover, .nav-link.active {
          color: #0284c7;
          background-color: #f0f9ff;
        }
        .btn-header-login {
          background-color: #ffffff;
          color: #0284c7;
          border: 1.5px solid #bae6fd;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.2s ease;
        }
        .btn-header-login:hover {
          background-color: #f0f9ff;
          border-color: #38bdf8;
          transform: translateY(-1px);
        }
        .btn-header-cta {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          padding: 8px 18px;
          border-radius: 8px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
          transition: all 0.2s ease;
        }
        .btn-header-cta:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(15, 23, 42, 0.25);
        }
      `}</style>

            {/* TUNGGAL NAVBAR PUBLIK */}
            <header className="public-navbar">
                <div style={{ width: '100%', maxWidth: '1280px', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Logo Brand */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 10px', borderRadius: '10px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🛍️
                        </div>
                        <div>
                            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px', display: 'block', lineHeight: '1.2' }}>
                                UMKM Tracker
                            </span>
                            <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: '600' }}>
                                Financial Ecosystem
                            </span>
                        </div>
                    </Link>

                    {/* Navigasi Tengah */}
                    <nav style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Link href="/" className={`nav-link ${pathname === '/' ? 'active' : ''}`}>Beranda</Link>
                        <a href="#fitur" className="nav-link">Fitur Utama</a>
                        <a href="#cara-kerja" className="nav-link">Cara Kerja</a>
                        <Link href="/catalog" className={`nav-link ${pathname === '/catalog' ? 'active' : ''}`}>Katalog Produk</Link>
                    </nav>

                    {/* Tombol Aksi */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Link href="/login" className="btn-header-login">
                            🔑 Login Pengelola
                        </Link>
                        <Link href="/register" className="btn-header-cta">
                            Daftar Gratis
                        </Link>
                    </div>
                </div>
            </header>

            {/* KONTEN HALAMAN PUBLIK */}
            <main style={{ width: '100%' }}>
                {children}
            </main>

            {/* FOOTER PUBLIK */}
            <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '60px 24px 30px', width: '100%' }}>
                <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '40px' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                            <span style={{ fontSize: '20px' }}>🛍️</span>
                            <span style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>UMKM Tracker</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                            Sistem pencatatan keuangan otomatis, OCR scanner nota belanja, dan etalase toko digital UMKM Indonesia.
                        </p>
                    </div>

                    <div>
                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Menu Aplikasi</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                            <Link href="/catalog" style={{ color: '#64748b', textDecoration: 'none' }}>Katalog Produk</Link>
                            <Link href="/login" style={{ color: '#64748b', textDecoration: 'none' }}>Login Pengelola</Link>
                            <Link href="/register" style={{ color: '#64748b', textDecoration: 'none' }}>Registrasi Usaha</Link>
                        </div>
                    </div>

                    <div>
                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Layanan & Otomasi</h5>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                            <span>AI OCR Struk Scanner</span>
                            <span>Laporan Laba / Rugi PDF</span>
                            <span>Export Pembukuan Excel</span>
                            <span>Multi-Kas & Rekening Bank</span>
                        </div>
                    </div>

                    <div>
                        <h5 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Kontak & Dukungan</h5>
                        <p style={{ fontSize: '13px', color: '#64748b', lineHeight: '1.6' }}>
                            Email: support@umkmtracker.id<br />
                            Jam Operasional: Senin - Jumat<br />
                            08:00 - 17:00 WIB
                        </p>
                    </div>
                </div>

                <div style={{ maxWidth: '1280px', margin: '0 auto', borderTop: '1px solid #f1f5f9', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#94a3b8', flexWrap: 'wrap', gap: '12px' }}>
                    <div>© 2026 Toko UMKM Digital / UMKM Tracker. All rights reserved.</div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <span style={{ cursor: 'pointer' }}>Syarat & Ketentuan</span>
                        <span style={{ cursor: 'pointer' }}>Kebijakan Privasi</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}