'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
    return (
        <header
            style={{
                backgroundColor: '#ffffff',
                borderBottom: '1px solid #e2e8f0',
                padding: '16px 24px',
                position: 'sticky',
                top: 0,
                zIndex: 50,
            }}
        >
            <div
                style={{
                    maxWidth: '1100px',
                    margin: '0 auto',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <h1 style={{ margin: 0, fontSize: '20px', color: '#0f172a', fontWeight: 'bold' }}>
                        🛍️ Toko UMKM
                    </h1>
                </Link>

                <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <Link href="/catalog" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                        Katalog Produk
                    </Link>
                    <Link href="/about" style={{ color: '#475569', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
                        Tentang Kami
                    </Link>
                    <Link
                        href="/login"
                        style={{
                            padding: '8px 16px',
                            backgroundColor: '#0f172a',
                            color: '#ffffff',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 'bold',
                        }}
                    >
                        Login Pengelola
                    </Link>
                </nav>
            </div>
        </header>
    );
}