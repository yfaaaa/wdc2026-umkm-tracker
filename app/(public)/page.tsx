'use client';

import Link from 'next/link';

export default function HomePage() {
    return (
        <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'sans-serif' }}>
            <h1 style={{ fontSize: '36px', color: '#0f172a', marginBottom: '16px' }}>
                🏪 Selamat Datang di Toko UMKM
            </h1>
            <p style={{ fontSize: '16px', color: '#64748b', maxWidth: '500px', margin: '0 auto 32px auto' }}>
                Sistem Pengelolaan Keuangan & Katalog Produk Digital UMKM Modern.
            </p>

            <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                <Link
                    href="/catalog"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#0284c7',
                        color: '#fff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    🛍️ Lihat Katalog
                </Link>
                <Link
                    href="/login"
                    style={{
                        padding: '12px 24px',
                        backgroundColor: '#0f172a',
                        color: '#fff',
                        borderRadius: '6px',
                        textDecoration: 'none',
                        fontWeight: 'bold',
                    }}
                >
                    🔑 Login Pengelola
                </Link>
            </div>
        </div>
    );
}