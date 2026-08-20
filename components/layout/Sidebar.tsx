'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();

    const [hoveredHref, setHoveredHref] = useState<string | null>(null);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);

    const menuItems = [
        { label: '📊 Dashboard', href: '/dashboard' },
        { label: '💳 Akun Keuangan', href: '/accounts' },
        { label: '💸 Transaksi', href: '/transactions' },
        { label: '📄 Scan OCR Struk', href: '/imports' },
        { label: '📈 Laporan', href: '/reports' },
        { label: '📥 Export Berkas', href: '/exports' },
        { label: '⚙️ Pengaturan', href: '/settings' },
    ];

    const handleLogout = () => {
        localStorage.removeItem('user_session');
        router.push('/login');
    };

    return (
        <aside
            style={{
                width: '250px',
                minWidth: '250px',
                minHeight: '100vh',
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
            }}
        >
            {/* Brand Title */}
            <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#38bdf8', fontWeight: 'bold' }}>
                    UMKM Tracker
                </h2>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>Pengelola Keuangan</span>
            </div>

            <hr style={{ borderColor: '#1e293b', width: '100%', marginBottom: '20px' }} />

            {/* Navigation List */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {menuItems.map((item) => {
                    const isActive = pathname === item.href;
                    const isHovered = hoveredHref === item.href;

                    let bgColor = 'transparent';
                    let textColor = '#94a3b8';

                    if (isActive) {
                        bgColor = '#0284c7';
                        textColor = '#ffffff';
                    } else if (isHovered) {
                        bgColor = '#1e293b';
                        textColor = '#f8fafc';
                    }

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onMouseEnter={() => setHoveredHref(item.href)}
                            onMouseLeave={() => setHoveredHref(null)}
                            style={{
                                display: 'block',
                                padding: '10px 14px',
                                borderRadius: '6px',
                                fontSize: '14px',
                                fontWeight: isActive ? 'bold' : '500',
                                color: textColor,
                                backgroundColor: bgColor,
                                textDecoration: 'none',
                                transition: 'all 0.2s ease-in-out',
                                cursor: 'pointer',
                            }}
                        >
                            {item.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Logout Button */}
            <div style={{ marginTop: 'auto', paddingTop: '20px' }}>
                <button
                    onClick={handleLogout}
                    onMouseEnter={() => setIsLogoutHovered(true)}
                    onMouseLeave={() => setIsLogoutHovered(false)}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: isLogoutHovered ? '#dc2626' : '#ef4444',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        transition: 'background-color 0.2s ease-in-out',
                    }}
                >
                    🚪 Logout
                </button>
            </div>
        </aside>
    );
}