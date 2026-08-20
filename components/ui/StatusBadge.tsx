import React from 'react';

interface StatusBadgeProps {
    label: string;
    type?: 'success' | 'warning' | 'danger' | 'info' | 'default';
}

export default function StatusBadge({ label, type = 'default' }: StatusBadgeProps) {
    const colorMap = {
        success: { bg: '#dcfce7', text: '#15803d' },
        warning: { bg: '#fef9c3', text: '#a16207' },
        danger: { bg: '#fee2e2', text: '#b91c1c' },
        info: { bg: '#e0f2fe', text: '#0369a1' },
        default: { bg: '#f1f5f9', text: '#475569' },
    };

    const selected = colorMap[type] || colorMap.default;

    return (
        <span
            style={{
                display: 'inline-block',
                padding: '4px 10px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
                backgroundColor: selected.bg,
                color: selected.text,
            }}
        >
            {label}
        </span>
    );
}