'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMessage('');
        setLoading(true);

        setTimeout(() => {
            // 1. Ambil data user yang pernah daftar
            const savedUserData = localStorage.getItem('registered_user');

            if (!savedUserData) {
                setErrorMessage('Akun belum terdaftar! Silakan lakukan Pendaftaran Bisnis terlebih dahulu.');
                setLoading(false);
                return;
            }

            const registeredUser = JSON.parse(savedUserData);

            // 2. Cek apakah email & password sesuai
            const inputEmail = email.toLowerCase().trim();

            if (inputEmail !== registeredUser.email) {
                setErrorMessage('Email tidak terdaftar! Periksa kembali atau daftar akun baru.');
                setLoading(false);
                return;
            }

            if (password !== registeredUser.password) {
                setErrorMessage('Kata sandi salah! Silakan coba lagi.');
                setLoading(false);
                return;
            }

            // 3. Jika cocok, buat sesi login & masuk ke dashboard
            const activeSession = {
                email: registeredUser.email,
                name: registeredUser.ownerName,
                businessName: registeredUser.businessName,
                isLogged: true,
            };

            localStorage.setItem('user_session', JSON.stringify(activeSession));
            setLoading(false);

            router.push('/dashboard');
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
        <div style={{ maxWidth: '400px', margin: '40px auto', padding: '24px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#0f172a' }}>
                Masuk ke Akun Usaha
            </h2>
            <p style={{ fontSize: '14px', color: '#475569', marginBottom: '20px' }}>
                Masukkan email dan kata sandi yang sudah didaftarkan.
            </p>

            {errorMessage && (
                <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', padding: '10px', borderRadius: '6px', fontSize: '13px', marginBottom: '16px' }}>
                    ⚠️ {errorMessage}
                </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                    <label style={{ display: 'block', fontSize: '14px', fontWeight: '500', marginBottom: '6px', color: '#334155' }}>
                        Email Usaha
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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
                    {loading ? 'Memvalidasi...' : 'Masuk ke Dashboard'}
                </button>
            </form>

            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#475569' }}>
                Belum punya akun?{' '}
                <Link href="/register" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 'bold' }}>
                    Daftar Bisnis Baru
                </Link>
            </div>
        </div>
    );
}