import React from 'react';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';

interface AccountProps {
    name: string;
    type: 'Kas Tunai' | 'Bank' | 'E-Wallet';
    accountNumber: string;
    balance: number;
}

export default function AccountCard({ name, type, accountNumber, balance }: AccountProps) {
    const formattedBalance = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
    }).format(balance);

    return (
        <Card
            title={name}
            action={<StatusBadge label={type} type={type === 'Kas Tunai' ? 'warning' : 'info'} />}
        >
            <div style={{ marginTop: '8px' }}>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Nomor Rekening / ID</p>
                <p style={{ margin: '2px 0 12px 0', fontSize: '14px', fontWeight: '500' }}>{accountNumber}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Saldo Tersedia</p>
                <h2 style={{ margin: '4px 0 0 0', fontSize: '20px', color: '#0f172a' }}>{formattedBalance}</h2>
            </div>
        </Card>
    );
}