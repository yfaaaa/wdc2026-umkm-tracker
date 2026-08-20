'use client';

import { useState, useEffect } from 'react';

interface Account {
  id: string;
  name: string;
  type: string;
  balance: number;
}

interface Transaction {
  id: string;
  type: 'IN' | 'OUT' | 'TRANSFER';
  accountId: string;
  accountName?: string;
  targetAccountId?: string;
  targetAccountName?: string;
  category?: string;
  amount: number;
  description?: string;
  date: string;
}

export default function TransactionsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [type, setType] = useState<'OUT' | 'IN' | 'TRANSFER'>('OUT');
  const [accountId, setAccountId] = useState('');
  const [targetAccountId, setTargetAccountId] = useState('');
  const [category, setCategory] = useState('Bahan Baku');
  const [amount, setAmount] = useState<number | string>('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<'ALL' | 'IN' | 'OUT' | 'TRANSFER'>('ALL');

  // Load Initial Data
  useEffect(() => {
    loadAccounts();
    loadTransactions();
  }, []);

  const loadAccounts = () => {
    const saved = localStorage.getItem('financial_accounts');
    if (saved) {
      try {
        const accs = JSON.parse(saved);
        setAccounts(accs);
        if (accs.length > 0 && !accountId) {
          setAccountId(accs[0].id);
          if (accs.length > 1) setTargetAccountId(accs[1].id);
        }
      } catch (e) {
        console.error('Error loading accounts:', e);
      }
    } else {
      const defaultAccs: Account[] = [
        { id: '1', name: 'Kas Utama Toko', type: 'CASH', balance: 1500000 },
        { id: '2', name: 'Bank BCA Business', type: 'BANK', balance: 5250000 }
      ];
      setAccounts(defaultAccs);
      setAccountId('1');
      setTargetAccountId('2');
      localStorage.setItem('financial_accounts', JSON.stringify(defaultAccs));
    }
  };

  const loadTransactions = () => {
    const saved = localStorage.getItem('financial_transactions');
    if (saved) {
      try {
        setTransactions(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading transactions:', e);
      }
    } else {
      const defaultTx: Transaction[] = [
        {
          id: '101',
          type: 'OUT',
          accountId: '1',
          accountName: 'Kas Utama Toko',
          category: 'Bahan Baku',
          amount: 150000,
          description: 'Beli Kopi Arabika 1kg',
          date: new Date().toISOString().split('T')[0]
        },
        {
          id: '102',
          type: 'IN',
          accountId: '1',
          accountName: 'Kas Utama Toko',
          category: 'Penjualan Produk',
          amount: 450000,
          description: 'Omset Penjualan Harian',
          date: new Date().toISOString().split('T')[0]
        }
      ];
      setTransactions(defaultTx);
      localStorage.setItem('financial_transactions', JSON.stringify(defaultTx));
    }
  };

  const saveTransactions = (updated: Transaction[]) => {
    setTransactions(updated);
    localStorage.setItem('financial_transactions', JSON.stringify(updated));
  };

  // Switch category defaults when transaction type changes
  useEffect(() => {
    if (type === 'IN') {
      setCategory('Penjualan Produk');
    } else if (type === 'OUT') {
      setCategory('Bahan Baku');
    } else {
      setCategory('Transfer Antar Kas');
    }
  }, [type]);

  const resetForm = () => {
    setEditingId(null);
    setType('OUT');
    setAmount('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    setIsSubmitting(true);
    const selectedAcc = accounts.find((a) => a.id === accountId);
    const selectedTargetAcc = accounts.find((a) => a.id === targetAccountId);
    const numAmount = Number(amount);

    setTimeout(() => {
      if (editingId) {
        // Edit Mode
        const updated = transactions.map((tx) =>
          tx.id === editingId
            ? {
                ...tx,
                type,
                accountId,
                accountName: selectedAcc?.name || 'Kas Utama',
                targetAccountId: type === 'TRANSFER' ? targetAccountId : undefined,
                targetAccountName: type === 'TRANSFER' ? selectedTargetAcc?.name : undefined,
                category: category || 'Lainnya',
                amount: numAmount,
                description: description || '',
                date,
              }
            : tx
        );
        saveTransactions(updated);
      } else {
        // New Mode
        const newTx: Transaction = {
          id: Date.now().toString(),
          type,
          accountId,
          accountName: selectedAcc?.name || 'Kas Utama',
          targetAccountId: type === 'TRANSFER' ? targetAccountId : undefined,
          targetAccountName: type === 'TRANSFER' ? selectedTargetAcc?.name : undefined,
          category: category || 'Lainnya',
          amount: numAmount,
          description: description || '',
          date,
        };
        saveTransactions([newTx, ...transactions]);
      }

      resetForm();
      setIsSubmitting(false);
    }, 300);
  };

  const handleEdit = (tx: Transaction) => {
    setEditingId(tx.id);
    setType(tx.type || 'OUT');
    setAccountId(tx.accountId || (accounts[0]?.id ?? ''));
    if (tx.targetAccountId) setTargetAccountId(tx.targetAccountId);
    setCategory(tx.category || 'Bahan Baku');
    setAmount(tx.amount || '');
    setDescription(tx.description || '');
    setDate(tx.date || new Date().toISOString().split('T')[0]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus catatan transaksi ini?')) {
      const updated = transactions.filter((t) => t.id !== id);
      saveTransactions(updated);
      if (editingId === id) resetForm();
    }
  };

  // Safe Filter Logic preventing TypeError undefined
  const filteredTransactions = transactions.filter((tx) => {
    const query = (searchQuery || '').toLowerCase();
    const safeDesc = (tx?.description || '').toLowerCase();
    const safeAccountName = (tx?.accountName || '').toLowerCase();
    const safeCategory = (tx?.category || '').toLowerCase();

    const matchesSearch =
      safeDesc.includes(query) ||
      safeAccountName.includes(query) ||
      safeCategory.includes(query);

    const matchesType = filterType === 'ALL' || tx?.type === filterType;

    return matchesSearch && matchesType;
  });

  // Calculate Aggregates
  const totalIncome = transactions
    .filter((t) => t?.type === 'IN')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

  const totalExpense = transactions
    .filter((t) => t?.type === 'OUT')
    .reduce((sum, t) => sum + Number(t.amount || 0), 0);

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
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .btn-submit:hover {
          background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);
          transform: translateY(-1px);
        }
        .type-toggle-btn {
          flex: 1;
          padding: 10px;
          border-radius: 10px;
          border: 1.5px solid #e2e8f0;
          background-color: #f8fafc;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
        }
        .type-toggle-btn.active-OUT {
          background-color: #fef2f2;
          border-color: #fca5a5;
          color: #dc2626;
          box-shadow: 0 2px 8px rgba(220, 38, 38, 0.12);
        }
        .type-toggle-btn.active-IN {
          background-color: #f0fdf4;
          border-color: #86efac;
          color: #16a34a;
          box-shadow: 0 2px 8px rgba(22, 163, 74, 0.12);
        }
        .type-toggle-btn.active-TRANSFER {
          background-color: #eff6ff;
          border-color: #93c5fd;
          color: #2563eb;
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.12);
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
            <span>💸 Arus Kas Real-time</span>
          </div>
          <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#0f172a', letterSpacing: '-0.5px' }}>
            Transaksi Keuangan
          </h1>
          <p style={{ color: '#64748b', fontSize: '14px', marginTop: '2px' }}>
            Catat dan pantau seluruh transaksi uang masuk, uang keluar, maupun pemindahan dana bisnis.
          </p>
        </div>

        {/* QUICK STATS CARDS */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '12px 18px', borderRadius: '12px', minWidth: '140px' }}>
            <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Pemasukan</span>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#16a34a', marginTop: '2px' }}>
              + Rp {totalIncome.toLocaleString('id-ID')}
            </div>
          </div>
          <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', padding: '12px 18px', borderRadius: '12px', minWidth: '140px' }}>
            <span style={{ fontSize: '11.5px', color: '#64748b', fontWeight: '600', textTransform: 'uppercase' }}>Total Pengeluaran</span>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#dc2626', marginTop: '2px' }}>
              - Rp {totalExpense.toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      </div>

      {/* FORM CARD (INPUT TRANSAKSI) */}
      <div className="glass-panel" style={{ marginBottom: '28px', borderLeft: editingId ? '4px solid #0284c7' : '4px solid #0f172a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '18px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a' }}>
            {editingId ? '✏️ Edit Catatan Transaksi' : '➕ Input Transaksi Baru'}
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

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* SEGMENTED TYPE TOGGLE */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '8px' }}>
              Jenis Transaksi
            </label>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="button"
                className={`type-toggle-btn ${type === 'OUT' ? 'active-OUT' : ''}`}
                onClick={() => setType('OUT')}
              >
                <span>🔴</span> Uang Keluar (Expense)
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${type === 'IN' ? 'active-IN' : ''}`}
                onClick={() => setType('IN')}
              >
                <span>🟢</span> Uang Masuk (Income)
              </button>
              <button
                type="button"
                className={`type-toggle-btn ${type === 'TRANSFER' ? 'active-TRANSFER' : ''}`}
                onClick={() => setType('TRANSFER')}
              >
                <span>🔵</span> Transfer Antar Kas
              </button>
            </div>
          </div>

          {/* INPUT FORM GRID */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
            {/* Akun Sumber */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                {type === 'TRANSFER' ? 'Dari Akun' : 'Sumber / Akun Kas'}
              </label>
              <select
                value={accountId}
                onChange={(e) => setAccountId(e.target.value)}
                className="input-stylish"
                required
              >
                {accounts.map((acc) => (
                  <option key={acc.id} value={acc.id}>
                    {acc.name} (Rp {Number(acc.balance || 0).toLocaleString('id-ID')})
                  </option>
                ))}
              </select>
            </div>

            {/* Akun Tujuan (Khusus Transfer) */}
            {type === 'TRANSFER' && (
              <div>
                <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                  Ke Akun Tujuan
                </label>
                <select
                  value={targetAccountId}
                  onChange={(e) => setTargetAccountId(e.target.value)}
                  className="input-stylish"
                  required
                >
                  {accounts
                    .filter((a) => a.id !== accountId)
                    .map((acc) => (
                      <option key={acc.id} value={acc.id}>
                        {acc.name} (Rp {Number(acc.balance || 0).toLocaleString('id-ID')})
                      </option>
                    ))}
                </select>
              </div>
            )}

            {/* Kategori */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Kategori
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="input-stylish"
              >
                {type === 'IN' && (
                  <>
                    <option value="Penjualan Produk">Penjualan Produk</option>
                    <option value="Jasa / Layanan">Jasa / Layanan</option>
                    <option value="Investasi / Modal">Investasi / Modal</option>
                    <option value="Pendapatan Lainnya">Pendapatan Lainnya</option>
                  </>
                )}
                {type === 'OUT' && (
                  <>
                    <option value="Bahan Baku">Bahan Baku & Material</option>
                    <option value="Operasional & Utilitas">Operasional & Listrik</option>
                    <option value="Gaji Karyawan">Gaji & Honor Karyawan</option>
                    <option value="Sewa & Fasilitas">Sewa Tempat</option>
                    <option value="Pemasaran & Iklan">Pemasaran & Promo</option>
                    <option value="Pengeluaran Lainnya">Pengeluaran Lainnya</option>
                  </>
                )}
                {type === 'TRANSFER' && (
                  <option value="Transfer Antar Kas">Transfer Antar Kas</option>
                )}
              </select>
            </div>

            {/* Nominal */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Nominal (IDR)
              </label>
              <input
                type="number"
                placeholder="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                className="input-stylish"
              />
            </div>

            {/* Tanggal */}
            <div>
              <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
                Tanggal Transaksi
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="input-stylish"
              />
            </div>
          </div>

          {/* Keterangan */}
          <div>
            <label style={{ display: 'block', fontSize: '12.5px', fontWeight: '600', color: '#334155', marginBottom: '6px' }}>
              Keterangan / Catatan Tambahan
            </label>
            <input
              type="text"
              placeholder="cth: Pembelian biji kopi dari supplier Pak Budi"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="input-stylish"
            />
          </div>

          <div>
            <button type="submit" disabled={isSubmitting} className="btn-submit" style={{ width: '100%', marginTop: '4px' }}>
              {isSubmitting ? 'Menyimpan...' : editingId ? 'Update Transaksi' : '💾 Simpan Transaksi'}
            </button>
          </div>
        </form>
      </div>

      {/* FILTER & TABLE SECTION */}
      <div className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
        
        {/* Table Top Toolbar */}
        <div style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '14px', borderBottom: '1px solid #e2e8f0' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center', flex: '1', minWidth: '280px', maxWidth: '500px' }}>
            <div style={{ position: 'relative', flex: '1' }}>
              <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }}>🔍</span>
              <input
                type="text"
                placeholder="Cari transaksi, akun, atau kategori..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-stylish"
                style={{ paddingLeft: '36px' }}
              />
            </div>

            {/* Filter Type Dropdown */}
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as any)}
              className="input-stylish"
              style={{ width: 'auto', minWidth: '130px' }}
            >
              <option value="ALL">Semua Tipe</option>
              <option value="IN">🟢 Uang Masuk</option>
              <option value="OUT">🔴 Uang Keluar</option>
              <option value="TRANSFER">🔵 Transfer</option>
            </select>
          </div>

          <div style={{ fontSize: '13px', fontWeight: '600', color: '#64748b' }}>
            Total Record: <strong style={{ color: '#0f172a' }}>{filteredTransactions.length} Transaksi</strong>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13.5px' }}>
            <thead>
              <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0', color: '#475569', fontWeight: '700', textTransform: 'uppercase', fontSize: '11.5px', letterSpacing: '0.5px' }}>
                <th style={{ padding: '14px 24px' }}>Tanggal</th>
                <th style={{ padding: '14px 16px' }}>Tipe & Kategori</th>
                <th style={{ padding: '14px 16px' }}>Akun Kas</th>
                <th style={{ padding: '14px 20px' }}>Keterangan</th>
                <th style={{ padding: '14px 20px', textAlign: 'right' }}>Nominal</th>
                <th style={{ padding: '14px 24px', textAlign: 'center' }}>Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8' }}>
                    <span style={{ fontSize: '28px', display: 'block', marginBottom: '8px' }}>📑</span>
                    <p style={{ fontWeight: '600', color: '#475569' }}>Belum ada data transaksi yang sesuai</p>
                    <p style={{ fontSize: '12px' }}>Coba tambahkan transaksi baru di atas</p>
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((tx) => {
                  const isIN = tx.type === 'IN';
                  const isOUT = tx.type === 'OUT';

                  return (
                    <tr key={tx.id} className="table-row" style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600', color: '#475569', whiteSpace: 'nowrap' }}>
                        {tx.date || '-'}
                      </td>

                      <td style={{ padding: '16px 16px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'flex-start' }}>
                          <span style={{
                            backgroundColor: isIN ? '#f0fdf4' : isOUT ? '#fef2f2' : '#eff6ff',
                            color: isIN ? '#16a34a' : isOUT ? '#dc2626' : '#2563eb',
                            padding: '3px 8px',
                            borderRadius: '6px',
                            fontSize: '11px',
                            fontWeight: '700',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}>
                            {isIN ? '🟢 Masuk' : isOUT ? '🔴 Keluar' : '🔵 Transfer'}
                          </span>
                          <span style={{ fontSize: '12px', color: '#64748b', fontWeight: '500' }}>
                            {tx.category || 'Umum'}
                          </span>
                        </div>
                      </td>

                      <td style={{ padding: '16px 16px', fontWeight: '700', color: '#0f172a' }}>
                        {tx.type === 'TRANSFER' ? (
                          <div style={{ fontSize: '12.5px' }}>
                            <span style={{ color: '#0f172a' }}>{tx.accountName || 'Kas'}</span>
                            <span style={{ color: '#94a3b8', margin: '0 4px' }}>→</span>
                            <span style={{ color: '#0284c7' }}>{tx.targetAccountName || 'Tujuan'}</span>
                          </div>
                        ) : (
                          tx.accountName || 'Kas Utama'
                        )}
                      </td>

                      <td style={{ padding: '16px 20px', color: '#334155', fontWeight: '500', maxWidth: '260px' }}>
                        {tx.description || '-'}
                      </td>

                      <td style={{
                        padding: '16px 20px',
                        textAlign: 'right',
                        fontWeight: '800',
                        fontSize: '14.5px',
                        color: isIN ? '#16a34a' : isOUT ? '#dc2626' : '#2563eb',
                        whiteSpace: 'nowrap'
                      }}>
                        {isIN ? '+' : isOUT ? '-' : ''} Rp {Number(tx.amount || 0).toLocaleString('id-ID')}
                      </td>

                      <td style={{ padding: '16px 24px', textAlign: 'center' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => handleEdit(tx)}
                            className="action-btn edit"
                            title="Edit Transaksi"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tx.id)}
                            className="action-btn delete"
                            title="Hapus Transaksi"
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