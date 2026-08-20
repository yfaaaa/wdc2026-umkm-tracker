'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulasi proses pendaftaran menggunakan data dummy
        setTimeout(() => {
            // 1. Simpan data pendaftaran akun ke localStorage
            const registeredUser = {
                businessName: formData.businessName || 'Toko Baru UMKM',
                ownerName: formData.ownerName || 'Pemilik Usaha',
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
            };

            localStorage.setItem('registered_user', JSON.stringify(registeredUser));
            setLoading(false);

            // 2. Setelah register sukses, langsung diarahkan ke Halaman Login!
            router.push('/login');
        }, 800);
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '10px 12px',
        borderRadius: '6px',
        border: '1px solid #cbd5e1',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        fontSize: '14px',
        boxSizing: 'border-box',
        outline: 'none',
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto', padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>
                Daftar Bisnis Baru
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px' }}>
                Mulai kelola keuangan usaha UMKM kamu secara digital.
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>
                        Nama Usaha / Toko
                    </label>
                    <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                        placeholder="Contoh: Kopi Enak Jaya"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>
                        Nama Pemilik
                    </label>
                    <input
                        type="text"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        required
                        placeholder="Contoh: Yahya"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>
                        Email
                    </label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="yahya@gmail.com"
                        style={inputStyle}
                    />
                </div>

                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>
                        Kata Sandi
                    </label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                        placeholder="••••••••"
                        style={inputStyle}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        width: '100%',
                        padding: '10px',
                        backgroundColor: '#0f172a',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        marginTop: '6px',
                    }}
                >
                    {loading ? 'Mendaftarkan Toko...' : 'Daftar Sekarang'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>
                Sudah punya akun?{' '}
                <Link href="/login" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 'bold' }}>
                    Masuk di sini
                </Link>
            </div>
        </div>
    );
}