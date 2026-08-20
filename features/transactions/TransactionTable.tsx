import React from 'react';
import StatusBadge from '@/components/ui/StatusBadge';

export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
}

interface TableProps {
    transactions: Transaction[];
}

export default function TransactionTable({ transactions }: TableProps) {
    return (
        <div style={{ overflowX: 'auto', backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
                <thead>
                    <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                        <th style={{ padding: '12px 16px' }}>Tanggal</th>
                        <th style={{ padding: '12px 16px' }}>Keterangan</th>
                        <th style={{ padding: '12px 16px' }}>Kategori</th>
                        <th style={{ padding: '12px 16px' }}>Tipe</th>
                        <th style={{ padding: '12px 16px', textAlign: 'right' }}>Jumlah</th>
                    </tr>
                </thead>
                <tbody>
                    {transactions.length === 0 ? (
                        <tr>
                            <td colSpan={5} style={{ padding: '24px', textAlign: 'center', color: '#64748b' }}>
                                Belum ada data transaksi.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((item) => (
                            <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                <td style={{ padding: '12px 16px', color: '#475569' }}>{item.date}</td>
                                <td style={{ padding: '12px 16px', fontWeight: '500', color: '#0f172a' }}>{item.description}</td>
                                <td style={{ padding: '12px 16px', color: '#64748b' }}>{item.category}</td>
                                <td style={{ padding: '12px 16px' }}>
                                    <StatusBadge
                                        label={item.type === 'INCOME' ? 'Pemasukan' : 'Pengeluaran'}
                                        type={item.type === 'INCOME' ? 'success' : 'danger'}
                                    />
                                </td>
                                <td
                                    style={{
                                        padding: '12px 16px',
                                        textAlign: 'right',
                                        fontWeight: 'bold',
                                        color: item.type === 'INCOME' ? '#16a34a' : '#dc2626',
                                    }}
                                >
                                    {item.type === 'INCOME' ? '+' : '-'} Rp {item.amount.toLocaleString('id-ID')}
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}