'use client';

import { useState } from 'react';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    image: string;
    stock: number;
}

const INITIAL_PRODUCTS: Product[] = [
    { id: 1, name: 'Kopi Susu Gula Aren 250ml', category: 'Minuman', price: 18000, image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', stock: 45 },
    { id: 2, name: 'Roti Bakar Cokelat Keju', category: 'Makanan', price: 22000, image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?auto=format&fit=crop&w=600&q=80', stock: 12 },
    { id: 3, name: 'Matcha Latte Premium', category: 'Minuman', price: 24000, image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80', stock: 30 },
    { id: 4, name: 'Keripik Singkong Balado 200g', category: 'Camilan', price: 15000, image: 'https://images.unsplash.com/photo-1566478989037-eec170784d0b?auto=format&fit=crop&w=600&q=80', stock: 80 },
];

export default function CatalogPage() {
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('Semua');

    const categories = ['Semua', 'Makanan', 'Minuman', 'Camilan'];

    const filteredProducts = INITIAL_PRODUCTS.filter((p) => {
        const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchCat = selectedCategory === 'Semua' || p.category === selectedCategory;
        return matchSearch && matchCat;
    });

    return (
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 24px 80px' }}>
            <style>{`
        .product-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          overflow: hidden;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .product-card:hover {
          transform: translateY(-6px);
          border-color: #38bdf8;
          box-shadow: 0 16px 32px -8px rgba(2, 132, 199, 0.15);
        }
        .cat-badge {
          padding: 8px 18px;
          border-radius: 30px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          border: 1px solid #e2e8f0;
          background-color: #ffffff;
          color: #64748b;
          transition: all 0.2s ease;
        }
        .cat-badge:hover, .cat-badge.active {
          background-color: #0284c7;
          color: #ffffff;
          border-color: #0284c7;
          box-shadow: 0 4px 12px rgba(2, 132, 199, 0.25);
        }
      `}</style>

            {/* Header Katalog */}
            <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                <span style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1.5px', fontWeight: '800', color: '#0284c7', backgroundColor: '#e0f2fe', padding: '6px 14px', borderRadius: '20px' }}>
                    ETALASE DIGITAL UMKM
                </span>
                <h1 style={{ fontSize: '36px', fontWeight: '900', color: '#0f172a', marginTop: '12px', letterSpacing: '-0.5px' }}>
                    Katalog Produk Usaha
                </h1>
                <p style={{ fontSize: '15px', color: '#64748b', maxWidth: '500px', margin: '8px auto 0' }}>
                    Temukan produk unggulan berkualitas siap pesan langsung melalui integrasi WhatsApp.
                </p>
            </div>

            {/* Filter & Search Bar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px', alignItems: 'center' }}>
                <input
                    type="text"
                    placeholder="🔍 Cari nama produk..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{
                        width: '100%',
                        maxWidth: '480px',
                        padding: '12px 20px',
                        borderRadius: '12px',
                        border: '1px solid #cbd5e1',
                        fontSize: '14px',
                        outline: 'none',
                        backgroundColor: '#ffffff',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                />

                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`cat-badge ${selectedCategory === cat ? 'active' : ''}`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Product Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '28px' }}>
                {filteredProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <div style={{ width: '100%', height: '200px', overflow: 'hidden', position: 'relative' }}>
                            <img
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            <span style={{ position: 'absolute', top: '12px', right: '12px', backgroundColor: 'rgba(255,255,255,0.9)', padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', color: '#0284c7' }}>
                                {product.category}
                            </span>
                        </div>

                        <div style={{ padding: '20px' }}>
                            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#0f172a', marginBottom: '8px' }}>
                                {product.name}
                            </h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                                <div>
                                    <span style={{ fontSize: '11px', color: '#94a3b8', display: 'block' }}>Harga</span>
                                    <span style={{ fontSize: '18px', fontWeight: '800', color: '#16a34a' }}>
                                        Rp {product.price.toLocaleString('id-ID')}
                                    </span>
                                </div>
                                <a
                                    href={`https://wa.me/?text=Halo,%20saya%20ingin%20pesan%20${encodeURIComponent(product.name)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ backgroundColor: '#25D366', color: '#ffffff', padding: '10px 16px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                                >
                                    💬 Pesan
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}