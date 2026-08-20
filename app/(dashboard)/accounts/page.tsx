'use client';

import { useState, useEffect } from 'react';

interface Account {
    id: string;
    name: string;
    type: 'CASH' | 'BANK' | 'EWALLET' | 'QRIS' | 'OTHER';
    currency: string;
    balance: number;
    accountNumber?: string;
}

export default function AccountsPage() {
    const [accounts, setAccounts] = useState<Account[]>([]);
    const [searchQuery, setSearchQuery] = useState('');

    // State Form
    const [editingId, setEditingId] = useState<string | null>(null);
    const [name, setName] = useState('');
    const [type, setType] = useState<Account['type']>('CASH');
    const [currency, setCurrency] = useState('IDR');
    const [balance, setBalance] = useState<number | string>('');
    const [accountNumber, setAccountNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Load Data
    useEffect(() => {
        loadAccounts();
    }, []);

    const loadAccounts = () => {
        const saved = localStorage.getItem('financial_accounts');
        if (saved) {
            try {
                setAccounts(JSON.parse(saved));
            } catch (e) {
                console.error('Error loading accounts:', e);
            }
        } else {
            // Data Default jika masih kosong
            const initialAccounts: Account[] = [
                { id: '1', name: 'Kas Utama Toko', type: 'CASH', currency: 'IDR', balance: 1500000 },
                { id: '2', name: 'Bank BCA Business', type: 'BANK', currency: 'IDR', balance: 5250000, accountNumber: '8830129381' },
            ];
            setAccounts(initialAccounts);
            localStorage.setItem('financial_accounts', JSON.stringify(initialAccounts));
        }
    };

    const saveToLocalStorage = (updated: Account[]) => {
        setAccounts(updated);
        localStorage.setItem('financial_accounts', JSON.stringify(updated));
    };

    const resetForm = () => {
        setEditingId(null);
        setName('');
        setType('CASH');
        setCurrency('IDR');
        setBalance('');
        setAccountNumber('');
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name.trim()) return;

        setIsSubmitting(true);
        const numBalance = Number(balance) || 0;

        setTimeout(() => {
            if (editingId) {
                // Edit Mode
                const updated = accounts.map((acc) =>
                    acc.id === editingId
                        ? { ...acc, name, type, currency, balance: numBalance, accountNumber }
                        : acc
                );
                saveToLocalStorage(updated);
            } else {
                // Create Mode
                const newAcc: Account = {
                    id: Date.now().toString(),
                    name,
                    type,
                    currency,
                    balance: numBalance,
                    accountNumber,
                };
                saveToLocalStorage([newAcc, ...accounts]);
            }

            resetForm();
            setIsSubmitting(false);
        }, 300);
    };

    const handleEdit = (acc: Account) => {
        setEditingId(acc.id);
        setName(acc.name);
        setType(acc.type);
        setCurrency(acc.currency);
        setBalance(acc.balance);
        setAccountNumber(acc.accountNumber || '');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleDelete = (id: string) => {
        if (confirm('Apakah Anda yakin ingin menghapus akun keuangan ini?')) {
            const updated = accounts.filter((a) => a.id !== id);
            saveToLocalStorage(updated);
            if (editingId === id) resetForm();
        }
    };

    // Filter Search
    const filteredAccounts = accounts.filter(
        (acc) =>
            acc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            acc.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (acc.accountNumber && acc.accountNumber.includes(searchQuery))
    );

    // Total Kas
    const totalBalance = accounts.reduce((sum, item) => sum + Number(item.balance || 0), 0);

    // Helper Badge Icon
    const getTypeBadge = (typeStr: Account['type']) => {
        switch (typeStr) {
            case 'CASH':
                return { label: 'Kas Tunai', bg: '#f0fdf4', color: '#16a34a', icon: '💵' };
            case 'BANK':
                return { label: 'Rekening Bank', bg: '#eff6ff', color: '#2563eb', icon: '🏦' };
            case 'EWALLET':
                return { label: 'E-Wallet', bg: '#faf5ff', color: '#9333ea', icon: '📱' };
            case 'QRIS':
                return { label: 'QRIS / Merchant', bg: '#fff7ed', color: '#ea580c', icon: '💳' };
            default:
                return { label: 'Lainnya', bg: '#f1f5f9', color: '#475569', icon: '🪙' };
        }
    };

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', paddingBottom: '40px' }}>
            <style>{`
        .glass-panel {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 24px;
          box-shadow: 0 4px 12px -2px rgba(15, 23, 42, 0.03);
          transition: all 0.3s ease;
        }
        .input-stylish {
          width: 100%;
          padding: 10px 14px;
          border-radius: 10px;
          border: 1.5px solid #cbd5e1;
          background-color: #f8fafc;
          color: #0f172a;
          font-size: 13.5px;
          font-weight: 500;
          outline: none;
          box-sizing: border-box;
          transition: all 0.2s ease;
        }
        .input-stylish:focus {
          border-color: #0284c7;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.12);
        }
        .btn-submit {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          color: #ffffff;
          border: none;
          padding: 11px 20px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 13.5px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .btn-submit:hover {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          transform: translateY(-1px);
        }
        .table-row {
          transition: background-color 0.2s ease;
        }
        .table-row:hover {
          background-color: #f8fafc;
        }
        .action-btn {
          padding: 6px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .action-btn.edit {
          background-color: #e0f2fe;
          color: #0284c7;
        }
        .action-btn.edit:hover {
          background-color: #0284c7;
          color: #ffffff;
        }
        .action-btn.delete {
          background-color: #fef2f2;
          color: #dc2626;
        }
        .action-btn.delete:hover {
          background-color: #dc2626;
          color: #ffffff;
        }
      `}</style>

            {/* HEADER SECTION */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px', marginBottom: '24px' }}>
                <div>
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: '#e0f2fe', color: '#0284c7', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', marginBottom: '8px' }}>
                        <span>💳 Financial Vault</span>
                    </div>
                    <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
                        Akun Keuangan
                    </h1>
                    <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
                        Kelola kas tunai, rekening bank, e-wallet, dan sumber dana bisnis Anda secara terpusat.
                    </p>
                </div>

                {/* STATISTIK RINGKAS */}
                <div style={{ backgroundColor: '#0f172a', color: '#ffffff', padding: '16px 24px', borderRadius: '14px', boxShadow: '0 8px 20px rgba(15, 23, 42, 0.15)', minWidth: '240px' }}>
                    <span style={{ fontSize: '12px', color: '#94a3b8', textTransform: 'uppercase', fontWeight: '600', letterSpacing: '0.5px' }}>
                        Total Likuiditas Kas
                    </span>
                    <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#38bdf8', marginTop: '4px' }}>
                        Rp {totalBalance.toLocaleString('id-ID')}
                    </h2>
                    <span style={{ fontSize: '11.5px', color: '#cbd5e1' }}>Tersebar di {accounts.length} Akun Aktif</span>
                </div>
            </div>

            {/* FORM CARD (TAMBAH / EDIT) */}
            <div className="glass-panel" style={{ marginBottom: '28px', borderLeft: editingId ? '4px solid #0284c7' : '4px solid #0f172a' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span>{editingId ? '✏️ Edit Akun Keuangan' : '➕ Tambah Akun Baru'}</span>
                    </h3>
                    {editingId && (
                        <button
                            onClick={resetForm}
                            style={{ backgroundColor: '#f1f5f9', color: '#475569', border: 'none', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}
                        >
                            ✕ Batal Edit
                        </button>
                    )}
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', alignItems: 'end' }}>
                    <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Nama Akun / Dompet
                        </label>
                        <input
                            type="text"
                            placeholder="cth: Bank BCA Utama / Kas Toko"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="input-stylish"
                        />
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Tipe Akun
                        </label>
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value as Account['type'])}
                            className="input-stylish"
                        >
                            <option value="CASH">💵 Kas Tunai (CASH)</option>
                            <option value="BANK">🏦 Rekening Bank (BANK)</option>
                            <option value="EWALLET">📱 E-Wallet (GoPay/OVO/ShopeePay)</option>
                            <option value="QRIS">💳 QRIS / Merchant ID</option>
                            <option value="OTHER">🪙 Lainnya</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Mata Uang
                        </label>
                        <select
                            value={currency}
                            onChange={(e) => setCurrency(e.target.value)}
                            className="input-stylish"
                        >
                            <option value="IDR">IDR (Rupiah)</option>
                            <option value="USD">USD (US Dollar)</option>
                        </select>
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                            Saldo Awal / Saat Ini
                        </label>
                        <input
                            type="number"
                            placeholder="0"
                            value={balance}
                            onChange={(e) => setBalance(e.target.value)}
                            required
                            className="input-stylish"
                        />
                    </div>

                    <div>
                        <button type="submit" disabled={isSubmitting} className="btn-submit" style={{ width: '100%' }}>
                            {isSubmitting ? 'Menyimpan...' : editingId ? 'Update Akun' : 'Simpan Akun Baru'}
                        </button>
                    </div>
                </form>
            </div>

            {/* FILTER & TABLE SECTION */}
            <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>

                {/* Table Top Toolbar */}
                <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #e2e8f0' }}>
                    <div style={{ position: 'relative', minWidth: '260px', flex: '1', maxWidth: '400px' }}>
                        <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
                        <input
                            type="text"
                            placeholder="Cari nama atau tipe akun..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-stylish"
                            style={{ paddingLeft: '36px' }}
                        />
                    </div>

                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
                        Total Terdaftar: <strong style={{ color: '#0f172a' }}>{filteredAccounts.length} Akun</strong>
                    </div>
                </div>

                {/* Data Table */}
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
                        <thead>
                            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', textTransform: 'uppercase', fontSize: '11.5px', letterSpacing: '0.5px' }}>
                                <th style={{ padding: '14px 24px' }}>Nama Akun</th>
                                <th style={{ padding: '14px 20px' }}>Tipe</th>
                                <th style={{ padding: '14px 20px' }}>Mata Uang</th>
                                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Saldo Current</th>
                                <th style={{ padding: '14px 24px', textAlign: 'center' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredAccounts.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                                        <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📂</span>
                                        <p style={{ fontWeight: '600', color: '#475569' }}>Tidak ada akun keuangan yang cocok</p>
                                        <p style={{ fontSize: '12px' }}>Coba ubah kata kunci pencarian Anda</p>
                                    </td>
                                </tr>
                            ) : (
                                filteredAccounts.map((acc) => {
                                    const badge = getTypeBadge(acc.type);
                                    return (
                                        <tr key={acc.id} className="table-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px 24px', fontWeight: '700', color: '#0f172a' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                                    <span style={{ fontSize: '18px', backgroundColor: badge.bg, padding: '6px', borderRadius: '8px' }}>
                                                        {badge.icon}
                                                    </span>
                                                    <div>
                                                        <div>{acc.name}</div>
                                                        {acc.accountNumber && (
                                                            <div style={{ fontSize: '11px', color: '#94a3b8', fontWeight: '500' }}>
                                                                No: {acc.accountNumber}
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px 20px' }}>
                                                <span style={{
                                                    backgroundColor: badge.bg,
                                                    color: badge.color,
                                                    padding: '4px 10px',
                                                    borderRadius: '20px',
                                                    fontSize: '11.5px',
                                                    fontWeight: '700',
                                                    display: 'inline-flex',
                                                    alignItems: 'center',
                                                    gap: '4px'
                                                }}>
                                                    {badge.label}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px 20px', fontWeight: '600', color: '#475569' }}>
                                                {acc.currency}
                                            </td>
                                            <td style={{ padding: '16px 20px', textAlign: 'right', fontWeight: '800', color: '#0f172a', fontSize: '14.5px' }}>
                                                {acc.currency === 'IDR' ? 'Rp ' : '$ '}
                                                {Number(acc.balance).toLocaleString('id-ID')}
                                            </td>
                                            <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                                                <div style={{ display: 'inline-flex', gap: '8px' }}>
                                                    <button
                                                        onClick={() => handleEdit(acc)}
                                                        className="action-btn edit"
                                                        title="Edit Akun"
                                                    >
                                                        Edit
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(acc.id)}
                                                        className="action-btn delete"
                                                        title="Hapus Akun"
                                                    >
                                                        Hapus
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}