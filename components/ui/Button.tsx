import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    isLoading = false,
    disabled,
    style,
    ...props
}: ButtonProps) {
    const variantStyles = {
        primary: { bg: '#0f172a', text: '#ffffff', border: 'none' },
        secondary: { bg: '#cbd5e1', text: '#0f172a', border: 'none' },
        danger: { bg: '#dc2626', text: '#ffffff', border: 'none' },
        success: { bg: '#16a34a', text: '#ffffff', border: 'none' },
        outline: { bg: 'transparent', text: '#0f172a', border: '1px solid #cbd5e1' },
    };

    const sizeStyles = {
        sm: { padding: '6px 12px', fontSize: '12px' },
        md: { padding: '10px 16px', fontSize: '14px' },
        lg: { padding: '14px 22px', fontSize: '16px' },
    };

    const currentVariant = variantStyles[variant];
    const currentSize = sizeStyles[size];

    return (
        <button
            disabled={disabled || isLoading}
            style={{
                padding: currentSize.padding,
                fontSize: currentSize.fontSize,
                backgroundColor: disabled ? '#e2e8f0' : currentVariant.bg,
                color: disabled ? '#94a3b8' : currentVariant.text,
                border: currentVariant.border,
                borderRadius: '6px',
                cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
                fontWeight: 'bold',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                transition: 'opacity 0.2s ease',
                ...style,
            }}
            {...props}
        >
            {isLoading ? 'Memproses...' : children}
        </button>
    );
}