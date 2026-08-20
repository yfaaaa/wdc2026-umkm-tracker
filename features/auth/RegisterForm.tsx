'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Card from '@/components/ui/Card';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function RegisterForm() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        businessName: '',
        ownerName: '',
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        setTimeout(() => {
            setIsLoading(false);
            router.push('/login');
        }, 1000);
    };

    return (
        <div style={{ maxWidth: '450px', margin: '40px auto' }}>
            <Card title="Pendaftaran UMKM Baru" description="Daftarkan usaha Anda untuk mulai pencatatan digital.">
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                    <Input
                        label="Nama Usaha / Toko"
                        placeholder="Kopi Kenangan UMKM"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        required
                    />
                    <Input
                        label="Nama Pemilik"
                        placeholder="Budi Santoso"
                        value={formData.ownerName}
                        onChange={(e) => setFormData({ ...formData, ownerName: e.target.value })}
                        required
                    />
                    <Input
                        label="Email Usaha"
                        type="email"
                        placeholder="budi@umkm.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <Input
                        label="Kata Sandi"
                        type="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <Button type="submit" isLoading={isLoading} style={{ width: '100%', marginTop: '8px' }}>
                        Daftar Sekarang
                    </Button>
                </form>
            </Card>
        </div>
    );
}