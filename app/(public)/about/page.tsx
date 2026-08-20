'use client';

import Link from 'next/link';

export default function AboutPage() {
    return (
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px 0' }}>
            <h1 style={{ fontSize: '28px', color: '#0f172a', marginBottom: '12px' }}>
                Tentang Toko Kami
            </h1>
            <p style={{ fontSize: '15px', color: '#64748b', lineHeight: '1.6', marginBottom: '24px' }}>
                Toko UMKM Digital adalah usaha lokal yang berdedikasi untuk menyajikan produk berkualitas tinggi dengan pelayanan terbaik.
            </p>

            <div style={{ backgroundColor: '#fff', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
                <h3 style={{ margin: '0 0 12px 0', fontSize: '18px', color: '#0f172a' }}>📍 Informasi Toko</h3>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', color: '#334155', fontSize: '14px' }}>
                    <li><strong>Alamat:</strong> Jl. Raya Merdeka No. 45, Indonesia</li>
                    <li><strong>Jam Operasional:</strong> Senin - Sabtu (08.00 - 17.00 WIB)</li>
                    <li><strong>WhatsApp Hotline:</strong> +62 812-3456-7890</li>
                    <li><strong>Email:</strong> info@tokoumkm.com</li>
                </ul>
            </div>

            <Link
                href="/catalog"
                style={{
                    display: 'inline-block',
                    padding: '10px 20px',
                    backgroundColor: '#0f172a',
                    color: '#fff',
                    borderRadius: '6px',
                    textDecoration: 'none',
                    fontWeight: 'bold',
                    fontSize: '14px',
                }}
            >
                ← Kembali ke Katalog
            </Link>
        </div>
    );
}