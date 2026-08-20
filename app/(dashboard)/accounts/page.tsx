'use client';

import { useState } from 'react';

interface Account {
    id: string;
    name: string;
    type: string;
    currency: string;
    balance: number;
}

const WHITELIST_CURRENCIES = ['IDR', 'USD', 'SGD', 'MYR', 'EUR', 'CNY', 'AUD'];

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([
        { id: '1', name: 'Kas Utama (Tunai)', type: 'CASH', currency: 'IDR', balance: 5000000 },
        { id: '2', name: 'Rekening Bank BCA', type: 'BANK', currency: 'IDR', balance: 12500000 },
    ]);

    const [name, setName] = useState('');
    const [type, setType] = useState('CASH');
    const [currency, setCurrency] = useState('IDR');

    const handleAddAccount = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        const newAccount: Account = {
            id: Date.now().toString(),
            name,
            type,
            currency,
            balance: 0,
        };

        setAccounts([...accounts, newAccount]);
        setName('');
        setType('CASH');
        setCurrency('IDR');
    };

    return (
        <div>
            <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f172a' }}>
                💳 Akun Keuangan
            </h1>
            <p style={{ color: '#64748b', marginBottom: '24px' }}>
                Kelola kas tunai, rekening bank, e-wallet, dan pos piutang/hutang.
            </p>

            {/* Form Tambah Akun */}
            <div
                style={{
                    backgroundColor: '#fff',
                    border: '1px solid #e2e8f0',
                    borderRadius: '8px',
                    padding: '20px',
                    marginBottom: '24px',
                }}
            >
                <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#334155' }}>
                    + Tambah Akun Baru
                </h3>

                <form onSubmit={handleAddAccount} style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <input
                        type="text"
                        placeholder="Nama Akun (misal: Kas Toko)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', flex: 1, minWidth: '200px' }}
                        required
                    />

                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    >
                        <option value="CASH">Kas Tunai (CASH)</option>
                        <option value="BANK">Bank (BANK)</option>
                        <option value="EWALLET">E-Wallet (EWALLET)</option>
                        <option value="RECEIVABLE">Piutang (RECEIVABLE)</option>
                        <option value="PAYABLE">Hutang (PAYABLE)</option>
                    </select>

                    <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    >
                        {WHITELIST_CURRENCIES.map((curr) => (
                            <option key={curr} value={curr}>{curr}</option>
                        ))}
                    </select>

                    <button
                        type="submit"
                        style={{ padding: '8px 16px', backgroundColor: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    >
                        Simpan Akun
                    </button>
                </form>
            </div>

            {/* Tabel Daftar Akun */}
            <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                    <thead>
                        <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
                            <th style={{ padding: '12px 16px' }}>Nama Akun</th>
                            <th style={{ padding: '12px 16px' }}>Tipe</th>
                            <th style={{ padding: '12px 16px' }}>Mata Uang</th>
                            <th style={{ padding: '12px 16px', textAlign: 'right' }}>Saldo</th>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map((acc) => (
                            <tr key={acc.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>{acc.name}</td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{acc.type}</td>
                                <td style={{ padding: '12px 16px' }}>{acc.currency}</td>
                                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                                    {acc.currency} {acc.balance.toLocaleString('id-ID')}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}