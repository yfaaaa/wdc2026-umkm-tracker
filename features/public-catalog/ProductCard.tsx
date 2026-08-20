import React from 'react';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';

interface ProductProps {
    title: string;
    price: number;
    category: string;
    imageUrl?: string;
}

export default function ProductCard({ title, price, category }: ProductProps) {
    return (
        <Card>
            <div
                style={{
                    width: '100%',
                    height: '140px',
                    backgroundColor: '#e2e8f0',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                }}
            >
                📦
            </div>
            <div style={{ marginTop: '12px' }}>
                <span style={{ fontSize: '11px', color: '#0284c7', fontWeight: 'bold', textTransform: 'uppercase' }}>
                    {category}
                </span>
                <h4 style={{ margin: '4px 0', fontSize: '16px', color: '#0f172a' }}>{title}</h4>
                <p style={{ margin: '0 0 12px 0', fontWeight: 'bold', color: '#16a34a' }}>
                    Rp {price.toLocaleString('id-ID')}
                </p>
                <Button size="sm" style={{ width: '100%' }}>
                    💬 Pesan via WhatsApp
                </Button>
            </div>
        </Card>
    );
}