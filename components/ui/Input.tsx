import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export default function Input({ label, error, helperText, style, ...props }: InputProps) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', width: '100%' }}>
            {label && (
                <label style={{ fontSize: '14px', fontWeight: '500', color: '#334155' }}>
                    {label}
                </label>
            )}
            <input
                style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: error ? '1px solid #ef4444' : '1px solid #cbd5e1',
                    fontSize: '14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                    ...style,
                }}
                {...props}
            />
            {error && <span style={{ fontSize: '12px', color: '#ef4444' }}>{error}</span>}
            {!error && helperText && <span style={{ fontSize: '12px', color: '#64748b' }}>{helperText}</span>}
        </div>
    );
}