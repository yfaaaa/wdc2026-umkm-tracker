// lib/mock-data.ts

export interface Transaction {
    id: string;
    date: string;
    description: string;
    category: string;
    amount: number;
    type: 'INCOME' | 'EXPENSE';
}

export interface Account {
    id: string;
    name: string;
    type: 'Kas Tunai' | 'Bank' | 'E-Wallet';
    accountNumber: string;
    balance: number;
}

export interface Product {
    id: string;
    title: string;
    price: number;
    category: string;
    stock: number;
}

// 1. Data Dummy Akun Keuangan
export const INITIAL_ACCOUNTS: Account[] = [
    { id: '1', name: 'Kas Kasir Toko', type: 'Kas Tunai', accountNumber: 'CASH-01', balance: 2450000 },
    { id: '2', name: 'Bank BCA Operasional', type: 'Bank', accountNumber: '8830192831', balance: 18500000 },
    { id: '3', name: 'QRIS / GoPay Bisnis', type: 'E-Wallet', accountNumber: '081234567890', balance: 4120000 },
];

// 2. Data Dummy Transaksi
export const INITIAL_TRANSACTIONS: Transaction[] = [
    { id: 'TX-001', date: '2026-08-19', description: 'Penjualan Kopi & Roti (Pagi)', category: 'Penjualan', amount: 450000, type: 'INCOME' },
    { id: 'TX-002', date: '2026-08-18', description: 'Beli Bahan Baku Tepung & Gula', category: 'Bahan Baku', amount: 215000, type: 'EXPENSE' },
    { id: 'TX-003', date: '2026-08-18', description: 'Bayar Tagihan Listrik Toko', category: 'Operasional', amount: 350000, type: 'EXPENSE' },
    { id: 'TX-004', date: '2026-08-17', description: 'Pesanan Catering Kantor Bappeda', category: 'Penjualan', amount: 1800000, type: 'INCOME' },
    { id: 'TX-005', date: '2026-08-16', description: 'Beli Cup Plastik & Sedotan', category: 'Kemasan', amount: 120000, type: 'EXPENSE' },
];

// 3. Data Dummy Produk Katalog
export const INITIAL_PRODUCTS: Product[] = [
    { id: 'P-1', title: 'Kopi Susu Aren 250ml', price: 18000, category: 'Minuman', stock: 45 },
    { id: 'P-2', title: 'Roti Bakar Keju Cokelat', price: 22000, category: 'Makanan', stock: 20 },
    { id: 'P-3', title: 'Keripik Singkong Pedas 250g', price: 15000, category: 'Camilan', stock: 60 },
    { id: 'P-4', title: 'Dimsum Ayam Combo (Isi 10)', price: 32000, category: 'Makanan', stock: 15 },
];

// 4. Data Dummy Profil Usaha
export const MOCK_BUSINESS_PROFILE = {
    name: 'Toko Kopi Enak UMKM',
    owner: 'Yahya',
    email: 'yahya@gmail.com',
    phone: '081234567890',
    address: 'Jl. Merdeka No. 45, Malang',
};