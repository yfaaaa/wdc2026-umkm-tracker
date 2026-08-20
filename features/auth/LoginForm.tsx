'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulasi login delay
        setTimeout(() => {
            setIsLoading(false);
            router.push('/dashboard');
        }, 1000);
    };

    return (
        <div style={{ maxWidth: '400px', margin: '40px auto' }}>
            <Card title="Masuk Akun UMKM" description="Silakan masuk untuk mengelola keuangan usaha Anda.">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    <Input
                        label="Email Usaha"
                        type="email"
                        placeholder="pemilik@umkm.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <Input
                        label="Kata Sandi"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <Button type="submit" isLoading={isLoading} style={{ width: '100%', marginTop: '8px' }}>
                        Masuk ke Dashboard
                    </Button>
                </form>
            </Card>
        </div>
    );
}