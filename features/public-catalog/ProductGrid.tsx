import React from 'react';
import ProductCard from './ProductCard';

export default function ProductGrid() {
    const mockProducts = [
        { title: 'Kopi Susu Gula Aren 250ml', price: 18000, category: 'Minuman' },
        { title: 'Roti Bakar Cokelat Keju', price: 22000, category: 'Makanan' },
        { title: 'Keripik Singkong Pedas 500g', price: 15000, category: 'Camilan' },
        { title: 'Dimsum Ayam Isi 10', price: 30000, category: 'Makanan' },
    ];

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '20px' }}>
            {mockProducts.map((prod, idx) => (
                <ProductCard key={idx} {...prod} />
            ))}
        </div>
    );
}