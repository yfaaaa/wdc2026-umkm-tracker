'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                setErrorMessage('Akun belum terdaftar! Silakan lakukan pendaftaran terlebih dahulu.');
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

    return (
        <div style={{ width: '100%', maxWidth: '440px', margin: '0 auto' }}>
            <style>{`
        .auth-card {
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow: 
            0 20px 40px -15px rgba(15, 23, 42, 0.08),
            0 0 0 1px rgba(2, 132, 199, 0.08);
          border-radius: 20px;
          padding: 36px 32px;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease;
        }

        .auth-card:hover {
          box-shadow: 
            0 24px 48px -12px rgba(2, 132, 199, 0.14),
            0 0 0 1px rgba(2, 132, 199, 0.2);
        }

        .input-field {
          width: 100%;
          padding: 12px 16px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          color: #0f172a;
          font-size: 14px;
          font-weight: 500;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }

        .input-field:focus {
          border-color: #0284c7;
          background-color: #ffffff;
          box-shadow: 0 0 0 4px rgba(2, 132, 199, 0.12);
        }

        .btn-primary {
          width: 100%;
          padding: 13px;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          border: none;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 8px 16px -4px rgba(15, 23, 42, 0.2);
          margin-top: 8px;
        }

        .btn-primary:hover:not(:disabled) {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          transform: translateY(-2px);
          box-shadow: 0 12px 24px -6px rgba(2, 132, 199, 0.3);
        }

        .btn-primary:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .pw-toggle {
          position: absolute;
          right: 14px;
          top: 38px;
          background: none;
          border: none;
          color: #64748b;
          font-size: 12px;
          font-weight: 600;
          cursor: pointer;
        }

        .pw-toggle:hover {
          color: #0284c7;
        }

        .spinner {
          display: inline-block;
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          border-top-color: #ffffff;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>

            <div className="auth-card">
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '28px' }}>
                    <span style={{
                        display: 'inline-block',
                        backgroundColor: '#e0f2fe',
                        color: '#0284c7',
                        fontSize: '12px',
                        fontWeight: '700',
                        padding: '4px 12px',
                        borderRadius: '20px',
                        marginBottom: '10px'
                    }}>
                        🔑 Portal Pengelola UMKM
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
                        Masuk ke Akun
                    </h2>
                    <p style={{ fontSize: '13.5px', color: '#64748b', marginTop: '4px' }}>
                        Masukkan email dan kata sandi usaha Anda.
                    </p>
                </div>

                {/* Alert Error */}
                {errorMessage && (
                    <div style={{
                        backgroundColor: '#fef2f2',
                        border: '1px solid #fecaca',
                        color: '#dc2626',
                        padding: '10px 14px',
                        borderRadius: '10px',
                        fontSize: '13px',
                        fontWeight: '500',
                        marginBottom: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>⚠️</span> {errorMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Email Usaha
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="yahya@gmail.com"
                            className="input-field"
                        />
                    </div>

                    <div style={{ position: 'relative' }}>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Kata Sandi
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="••••••••"
                            className="input-field"
                        />
                        <button
                            type="button"
                            className="pw-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Sembunyikan' : 'Tampilkan'}
                        </button>
                    </div>

                    <button type="submit" disabled={loading} className="btn-primary">
                        {loading ? (
                            <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                                <span className="spinner"></span> Memvalidasi...
                            </span>
                        ) : (
                            'Masuk ke Dashboard →'
                        )}
                    </button>
                </form>

                {/* Link Switch */}
                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '13.5px', color: '#64748b' }}>
                    Belum punya akun?{' '}
                    <Link href="/register" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '700' }}>
                        Daftar Bisnis Baru
                    </Link>
                </div>
            </div>
        </div>
    );
}