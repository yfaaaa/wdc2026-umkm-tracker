'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function RegisterPage() {
    const router = useRouter();
    const [businessName, setBusinessName] = useState('');
    const [ownerName, setOwnerName] = useState('');
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
            if (!businessName || !ownerName || !email || !password) {
                setErrorMessage('Mohon lengkapi seluruh data pendaftaran.');
                setLoading(false);
                return;
            }

            if (password.length < 6) {
                setErrorMessage('Kata sandi minimal harus 6 karakter.');
                setLoading(false);
                return;
            }

            const userData = {
                businessName: businessName.trim(),
                ownerName: ownerName.trim(),
                email: email.toLowerCase().trim(),
                password: password,
                createdAt: new Date().toISOString(),
            };

            localStorage.setItem('registered_user', JSON.stringify(userData));
            setLoading(false);
            router.push('/login');
        }, 800);
    };

    return (
        <div style={{ width: '100%', maxWidth: '480px', margin: '0 auto' }}>
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
                        ✨ Registrasi Usaha UMKM
                    </span>
                    <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
                        Daftar Bisnis Baru
                    </h2>
                    <p style={{ fontSize: '13.5px', color: '#64748b', marginTop: '4px' }}>
                        Kelola keuangan dan operasional toko secara otomatis.
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
                        marginBottom: '20px'
                    }}>
                        ⚠️ {errorMessage}
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Nama Usaha / Toko
                        </label>
                        <input
                            type="text"
                            value={businessName}
                            onChange={(e) => setBusinessName(e.target.value)}
                            required
                            placeholder="Contoh: Kopi Enak Jaya"
                            className="input-field"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Nama Pemilik
                        </label>
                        <input
                            type="text"
                            value={ownerName}
                            onChange={(e) => setOwnerName(e.target.value)}
                            required
                            placeholder="Contoh: Yahya"
                            className="input-field"
                        />
                    </div>

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
                        {loading ? 'Membuat Akun...' : 'Daftar Sekarang →'}
                    </button>
                </form>

                {/* Link Switch */}
                <div style={{ marginTop: '22px', textAlign: 'center', fontSize: '13.5px', color: '#64748b' }}>
                    Sudah punya akun?{' '}
                    <Link href="/login" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: '700' }}>
                        Masuk di sini
                    </Link>
                </div>
            </div>
        </div>
    );
}