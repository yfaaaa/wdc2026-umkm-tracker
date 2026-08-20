'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [activeSection, setActiveSection] = useState<string>('');

    // Auto-detect section saat scroll di halaman utama
    useEffect(() => {
        if (pathname !== '/') {
            setActiveSection('');
            return;
        }

        const handleScroll = () => {
            const scrollPos = window.scrollY + 180;
            const fiturEl = document.getElementById('fitur');
            const caraKerjaEl = document.getElementById('cara-kerja');

            if (caraKerjaEl && scrollPos >= caraKerjaEl.offsetTop) {
                setActiveSection('cara-kerja');
            } else if (fiturEl && scrollPos >= fiturEl.offsetTop) {
                setActiveSection('fitur');
            } else {
                setActiveSection('beranda');
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [pathname]);

    // Smooth scroll handler
    const handleNavClick = (id: string) => (e: React.MouseEvent) => {
        if (pathname === '/') {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        }
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: "'Inter', sans-serif" }}>
            <style>{`
        html {
          scroll-behavior: smooth;
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        
        .public-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          background-color: rgba(255, 255, 255, 0.88);
          border-bottom: 1px solid rgba(226, 232, 240, 0.8);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .nav-item {
          color: #64748b;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          padding: 8px 16px;
          border-radius: 10px;
          transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
        }
        .nav-item:hover {
          color: #0284c7;
          background-color: #f0f9ff;
          transform: translateY(-1px);
        }
        .nav-item.active {
          color: #0284c7;
          background-color: #e0f2fe;
          font-weight: 700;
        }
        .btn-login {
          background-color: #ffffff;
          color: #0284c7;
          border: 1.5px solid #bae6fd;
          padding: 8px 18px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          transition: all 0.25s ease;
        }
        .btn-login:hover {
          background-color: #f0f9ff;
          border-color: #38bdf8;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.15);
        }
        .btn-register {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          padding: 8px 20px;
          border-radius: 10px;
          font-weight: 600;
          font-size: 14px;
          text-decoration: none;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
          transition: all 0.25s ease;
        }
        .btn-register:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(15, 23, 42, 0.25);
          background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
        }
      `}</style>

            {/* NAVBAR SINGLE WRAPPER */}
            <header className="public-navbar">
                <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ backgroundColor: '#0284c7', color: '#fff', padding: '8px 10px', borderRadius: '10px', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(2, 132, 199, 0.25)' }}>
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

                    {/* Dynamic Nav Items */}
                    <nav style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <Link
                            href="/"
                            className={`nav-item ${pathname === '/' && (activeSection === 'beranda' || activeSection === '') ? 'active' : ''}`}
                        >
                            Beranda
                        </Link>
                        <a
                            href="/#fitur"
                            onClick={handleNavClick('fitur')}
                            className={`nav-item ${pathname === '/' && activeSection === 'fitur' ? 'active' : ''}`}
                        >
                            Fitur Utama
                        </a>
                        <a
                            href="/#cara-kerja"
                            onClick={handleNavClick('cara-kerja')}
                            className={`nav-item ${pathname === '/' && activeSection === 'cara-kerja' ? 'active' : ''}`}
                        >
                            Cara Kerja
                        </a>
                        <Link
                            href="/catalog"
                            className={`nav-item ${pathname === '/catalog' ? 'active' : ''}`}
                        >
                            Katalog Produk
                        </Link>
                    </nav>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <Link href="/login" className="btn-login">
                            🔑 Login Pengelola
                        </Link>
                        <Link href="/register" className="btn-register">
                            Daftar Gratis
                        </Link>
                    </div>

                </div>
            </header>

            {/* MAIN CONTENT CONTAINER */}
            <main style={{ width: '100%', minHeight: 'calc(100vh - 350px)' }}>
                {children}
            </main>

            {/* FOOTER */}
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
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Menu Aplikasi</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                            <Link href="/catalog" style={{ color: '#64748b', textDecoration: 'none' }}>Katalog Produk</Link>
                            <Link href="/login" style={{ color: '#64748b', textDecoration: 'none' }}>Login Pengelola</Link>
                            <Link href="/register" style={{ color: '#64748b', textDecoration: 'none' }}>Registrasi Usaha</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Layanan & Otomasi</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#64748b' }}>
                            <span>AI OCR Struk Scanner</span>
                            <span>Laporan Laba / Rugi PDF</span>
                            <span>Export Pembukuan Excel</span>
                            <span>Multi-Kas & Rekening Bank</span>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '14px', fontWeight: '700', color: '#0f172a', marginBottom: '16px' }}>Kontak & Dukungan</h4>
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