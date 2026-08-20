'use client';

import { useState } from 'react';

interface Transaction {
  id: string;
  type: 'INCOME' | 'EXPENSE' | 'TRANSFER';
  accountName: string;
  amount: number;
  currency: string;
  description: string;
  date: string;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'INCOME', accountName: 'Kas Utama', amount: 250000, currency: 'IDR', description: 'Penjualan produk', date: '2026-08-19' },
    { id: '2', type: 'EXPENSE', accountName: 'BCA Store', amount: 75000, currency: 'IDR', description: 'Beli ATK kantor', date: '2026-08-18' },
  ]);

  const [type, setType] = useState<'INCOME' | 'EXPENSE' | 'TRANSFER'>('EXPENSE');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [accountName, setAccountName] = useState('Kas Utama');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount) return;

    const newTx: Transaction = {
      id: Date.now().toString(),
      type,
      accountName,
      amount: Number(amount),
      currency: 'IDR',
      description: description || '-',
      date: new Date().toISOString().split('T')[0],
    };

    setTransactions([newTx, ...transactions]);
    setAmount('');
    setDescription('');
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '8px', color: '#0f172a' }}>
        💸 Transaksi Keuangan
      </h1>
      <p style={{ color: '#64748b', marginBottom: '24px' }}>
        Catat uang masuk, uang keluar, atau transfer antar rekening.
      </p>

      {/* Form Transaksi */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '20px', marginBottom: '24px' }}>
        <h3 style={{ margin: '0 0 16px 0', fontSize: '16px', color: '#334155' }}>+ Input Transaksi Baru</h3>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '500px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <label>
              <input type="radio" name="txType" checked={type === 'EXPENSE'} onChange={() => setType('EXPENSE')} /> 🔴 Uang Keluar
            </label>
            <label>
              <input type="radio" name="txType" checked={type === 'INCOME'} onChange={() => setType('INCOME')} /> 🟢 Uang Masuk
            </label>
            <label>
              <input type="radio" name="txType" checked={type === 'TRANSFER'} onChange={() => setType('TRANSFER')} /> 🔵 Transfer
            </label>
          </div>

          <input
            type="text"
            placeholder="Sumber / Akun Kas"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            required
          />

          <input
            type="number"
            placeholder="Nominal (IDR)"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
            required
          />

          <input
            type="text"
            placeholder="Keterangan / Catatan (Opsional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
          />

          <button
            type="submit"
            style={{ padding: '10px', backgroundColor: '#0f172a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Simpan Transaksi
          </button>
        </form>
      </div>

      {/* Riwayat */}
      <div style={{ backgroundColor: '#fff', border: '1px solid #e2e8f0', borderRadius: '8px', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f1f5f9', borderBottom: '1px solid #e2e8f0' }}>
              <th style={{ padding: '12px 16px' }}>Tanggal</th>
              <th style={{ padding: '12px 16px' }}>Tipe</th>
              <th style={{ padding: '12px 16px' }}>Akun</th>
              <th style={{ padding: '12px 16px' }}>Keterangan</th>
              <th style={{ padding: '12px 16px', textAlign: 'right' }}>Nominal</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '12px 16px', color: '#64748b' }}>{tx.date}</td>
                <td style={{ padding: '12px 16px', fontWeight: 'bold' }}>
                  {tx.type === 'INCOME' ? '🟢 Masuk' : tx.type === 'EXPENSE' ? '🔴 Keluar' : '🔵 Transfer'}
                </td>
                <td style={{ padding: '12px 16px' }}>{tx.accountName}</td>
                <td style={{ padding: '12px 16px' }}>{tx.description}</td>
                <td style={{ padding: '12px 16px', textAlign: 'right', fontWeight: 'bold' }}>
                  {tx.currency} {tx.amount.toLocaleString('id-ID')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}