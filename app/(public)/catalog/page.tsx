'use client';

import { useState } from 'react';
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    category: string;
    price: number;
    stock: number;
    description: string;
    whatsappNumber: string;
}

// Dummy data produk aman
const DUMMY_PRODUCTS: Product[] = [
    {
        id: 'prod-1',
        name: 'Kopi Susu Gula Aren 250ml',
        category: 'Minuman',
        price: 18000,
        stock: 25,
        description: 'Kopi kenangan racikan spesial dengan gula aren murni.',
        whatsappNumber: '6281234567890',
    },
    {
        id: 'prod-2',
        name: 'Keripik Singkong Balado Premium 100g',
        category: 'Makanan',
        price: 15000,
        stock: 50,
        description: 'Renyah, gurih, dan pedas manis pas untuk cemilan.',
        whatsappNumber: '6281234567890',
    },
    {
        id: 'prod-3',
        name: 'Kaos Polos Cotton Combed 30s',
        category: 'Pakaian',
        price: 45000,
        stock: 12,
        description: 'Bahan adem, nyaman dipakai sehari-hari.',
        whatsappNumber: '6281234567890',
    },
];

export default function CatalogPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('ALL');

    // Filter Produk
    const filteredProducts = DUMMY_PRODUCTS.filter((product) => {
        const matchSearch = product.name.toLowerCase().includes(search.toLowerCase());
        const matchCategory = selectedCategory === 'ALL' || product.category === selectedCategory;
        return matchSearch && matchCategory;
    });

    const categories = ['ALL', 'Makanan', 'Minuman', 'Pakaian'];

    const handleOrderWhatsApp = (product: Product) => {
        const message = `Halo, saya ingin membeli *${product.name}* harga Rp ${product.price.toLocaleString('id-ID')}. Apakah stok masih ada?`;
        const waUrl = `https://wa.me/${product.whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(waUrl, '_blank');
    };

    return (
        <div>
            {/* Banner / Hero Section */}
            <div style={{ backgroundColor: '#0284c7', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
                <h2 style={{ margin: '0 0 8px 0', fontSize: '24px' }}>Selamat Datang di Katalog Kami 👋</h2>
                <p style={{ margin: 0, opacity: 0.9 }}>Temukan produk-produk terbaik dengan harga terjangkau. Pesan langsung via WhatsApp!</p>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="Cari produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ flex: 1, minWidth: '200px', padding: '10px 14px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '14px' }}
                />

                <div style={{ display: 'flex', gap: '6px' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            style={{
                                padding: '8px 14px',
                                borderRadius: '6px',
                                border: 'none',
                                backgroundColor: selectedCategory === cat ? '#0f172a' : '#e2e8f0',
                                color: selectedCategory === cat ? '#fff' : '#334155',
                                cursor: 'pointer',
                                fontSize: '13px',
                                fontWeight: '500',
                            }}
                        >
                            {cat === 'ALL' ? 'Semua' : cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Produk */}
            {filteredProducts.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '40px 0', color: '#64748b' }}>
                    Produk tidak ditemukan.
                </div>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                    {filteredProducts.map((product) => (
                        <div
                            key={product.id}
                            style={{
                                backgroundColor: '#ffffff',
                                borderRadius: '10px',
                                border: '1px solid #e2e8f0',
                                padding: '16px',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                            }}
                        >
                            <div>
                                <div style={{ height: '140px', backgroundColor: '#f1f5f9', borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', marginBottom: '12px' }}>
                                    📦
                                </div>
                                <span style={{ fontSize: '12px', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '2px 8px', borderRadius: '4px', fontWeight: 'bold' }}>
                                    {product.category}
                                </span>
                                <h3 style={{ margin: '8px 0 4px 0', fontSize: '16px', color: '#0f172a' }}>{product.name}</h3>
                                <p style={{ margin: '0 0 12px 0', fontSize: '13px', color: '#64748b', lineHeight: '1.4' }}>{product.description}</p>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                                    <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#16a34a' }}>
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </span>
                                    <span style={{ fontSize: '12px', color: '#64748b' }}>Stok: {product.stock}</span>
                                </div>

                                <div style={{ display: 'flex', gap: '8px' }}>
                                    <Link
                                        href={`/catalog/${product.id}`}
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: '1px solid #cbd5e1',
                                            color: '#334155',
                                            textDecoration: 'none',
                                            fontSize: '13px',
                                            fontWeight: '500',
                                        }}
                                    >
                                        Detail
                                    </Link>
                                    <button
                                        onClick={() => handleOrderWhatsApp(product)}
                                        style={{
                                            flex: 1,
                                            padding: '8px',
                                            borderRadius: '6px',
                                            border: 'none',
                                            backgroundColor: '#16a34a',
                                            color: '#fff',
                                            cursor: 'pointer',
                                            fontSize: '13px',
                                            fontWeight: 'bold',
                                        }}
                                    >
                                        💬 Beli (WA)
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}