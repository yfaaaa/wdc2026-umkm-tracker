import React from 'react';
import Link from 'next/link';

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'sans-serif', backgroundColor: '#f8fafc' }}>
            {/* Header / Navbar */}
            <header style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #e2e8f0', padding: '16px 24px', position: 'sticky', top: 0, zIndex: 10 }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href="/catalog" style={{ textDecoration: 'none' }}>
                        <h1 style={{ margin: 0, fontSize: '20px', color: '#0f172a', fontWeight: 'bold' }}>
                            🛍️ Toko UMKM Digital
                        </h1>
                    </Link>

                    <nav style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <Link href="/catalog" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                            Katalog Produk
                        </Link>
                        <Link href="/login" style={{ padding: '8px 14px', backgroundColor: '#0f172a', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontSize: '14px' }}>
                            Login Pengelola
                        </Link>
                    </nav>
                </div>
            </header>

            {/* Konten Utama */}
            <main style={{ flex: 1, maxWidth: '1100px', width: '100%', margin: '0 auto', padding: '24px 16px', boxSizing: 'border-box' }}>
                {children}
            </main>

            {/* Footer */}
            <footer style={{ backgroundColor: '#ffffff', borderTop: '1px solid #e2e8f0', padding: '20px', textAlign: 'center', color: '#64748b', fontSize: '14px' }}>
                <p style={{ margin: 0 }}>© {new Date().getFullYear()} Toko UMKM Digital. All rights reserved.</p>
            </footer>
        </div>
    );
}