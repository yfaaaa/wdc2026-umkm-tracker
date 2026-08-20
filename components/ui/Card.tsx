import React from 'react';

interface CardProps {
    title?: string;
    description?: string;
    action?: React.ReactNode;
    children: React.ReactNode;
    style?: React.CSSProperties;
}

export default function Card({ title, description, action, children, style }: CardProps) {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                borderRadius: '8px',
                border: '1px solid #e2e8f0',
                padding: '20px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.05)',
                ...style,
            }}
        >
            {(title || action) && (
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                    <div>
                        {title && <h3 style={{ margin: 0, fontSize: '16px', color: '#0f172a' }}>{title}</h3>}
                        {description && <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>{description}</p>}
                    </div>
                    {action && <div>{action}</div>}
                </div>
            )}
            {children}
        </div>
    );
}