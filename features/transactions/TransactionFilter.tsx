'use client';

import React from 'react';

interface FilterProps {
    search: string;
    onSearchChange: (val: string) => void;
    typeFilter: string;
    onTypeChange: (val: string) => void;
}

export default function TransactionFilter({ search, onSearchChange, typeFilter, onTypeChange }: FilterProps) {
    return (
        <div
            style={{
                display: 'flex',
                gap: '12px',
                marginBottom: '20px',
                flexWrap: 'wrap',
                backgroundColor: '#ffffff',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
            }}
        >
            <input
                type="text"
                placeholder="🔍 Cari catatan transaksi..."
                value={search}
                onChange={(e) => onSearchChange(e.target.value)}
                style={{ flex: 1, minWidth: '200px', padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            />
            <select
                value={typeFilter}
                onChange={(e) => onTypeChange(e.target.value)}
                style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #cbd5e1' }}
            >
                <option value="ALL">Semua Jenis</option>
                <option value="INCOME">Pemasukan</option>
                <option value="EXPENSE">Pengeluaran</option>
            </select>
        </div>
    );
}