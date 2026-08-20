'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth, Role } from '@/hooks/use-auth';

interface MenuItem {
    label: string;
    href: string;
    roles: Role[];
}

export default function Sidebar() {
    const pathname = usePathname();
    const router = useRouter();
    const { role, switchRole } = useAuth();

    const [hoveredHref, setHoveredHref] = useState<string | null>(null);
    const [isLogoutHovered, setIsLogoutHovered] = useState(false);

    const menuItems: MenuItem[] = [
        { label: '📊 Dashboard', href: '/dashboard', roles: ['admin'] },
        { label: '💳 Akun Keuangan', href: '/accounts', roles: ['admin'] },
        { label: '💸 Transaksi', href: '/transactions', roles: ['admin', 'staff'] },
        { label: '📄 Scan OCR Struk', href: '/imports', roles: ['admin', 'staff'] },
        { label: '📈 Laporan', href: '/reports', roles: ['admin'] },
        { label: '📥 Export Berkas', href: '/exports', roles: ['admin'] },
        { label: '⚙️ Pengaturan', href: '/settings', roles: ['admin'] },
    ];

    const filteredMenu = menuItems.filter((item) => item.roles.includes(role));

    const handleLogout = () => {
        localStorage.removeItem('user_session');
        router.push('/login');
    };

    return (
        <aside
            style={{
                width: '250px',
                minWidth: '250px',
                height: '100vh',
                position: 'sticky',
                top: 0,
                backgroundColor: '#0f172a',
                color: '#ffffff',
                padding: '24px 16px',
                display: 'flex',
                flexDirection: 'column',
                boxSizing: 'border-box',
                zIndex: 50,
            }}
        >
            {/* Brand Title */}
            <div style={{ marginBottom: '24px', paddingLeft: '8px' }}>
                <h2 style={{ margin: 0, fontSize: '18px', color: '#38bdf8', fontWeight: 'bold' }}>
                    UMKM Tracker
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8' }}>Pengelola Keuangan</span>
                    <span
                        style={{
                            fontSize: '10px',
                            fontWeight: 'bold',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            textTransform: 'uppercase',
                            backgroundColor: role === 'admin' ? 'rgba(245, 158, 11, 0.12)' : 'rgba(16, 185, 129, 0.12)',
                            color: role === 'admin' ? '#fbbf24' : '#34d399',
                            border: `1px solid ${role === 'admin' ? 'rgba(245, 158, 11, 0.25)' : 'rgba(16, 185, 129, 0.25)'}`,
                        }}
                    >
                        {role}
                    </span>
                </div>
            </div>

            <hr style={{ borderColor: '#1e293b', width: '100%', marginBottom: '20px' }} />

            {/* Navigation List */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
                {filteredMenu.map((item) => {
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

            {/* Bottom Area: Role Switcher & Logout */}
            <div style={{ marginTop: 'auto', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Widget Mode Demo Juri */}
                <div
                    style={{
                        backgroundColor: '#1e293b',
                        padding: '12px',
                        borderRadius: '8px',
                        border: '1px solid #334155',
                    }}
                >
                    <span
                        style={{
                            display: 'block',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            color: '#64748b',
                            marginBottom: '8px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px',
                        }}
                    >
                        Switch Mode Demo
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        <button
                            type="button"
                            onClick={() => switchRole('admin')}
                            style={{
                                padding: '6px 8px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: role === 'admin' ? '#0284c7' : '#0f172a',
                                color: role === 'admin' ? '#ffffff' : '#94a3b8',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            👑 Admin
                        </button>
                        <button
                            type="button"
                            onClick={() => switchRole('staff')}
                            style={{
                                padding: '6px 8px',
                                fontSize: '12px',
                                fontWeight: 'bold',
                                borderRadius: '4px',
                                border: 'none',
                                cursor: 'pointer',
                                backgroundColor: role === 'staff' ? '#0284c7' : '#0f172a',
                                color: role === 'staff' ? '#ffffff' : '#94a3b8',
                                transition: 'all 0.2s ease',
                            }}
                        >
                            💼 Staff
                        </button>
                    </div>
                </div>

                {/* Logout Button */}
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