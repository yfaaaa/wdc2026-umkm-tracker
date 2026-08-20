export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div
            style={{
                minHeight: '100vh',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle at 50% 0%, #f0f9ff 0%, #f8fafc 60%, #e2e8f0 100%)',
                fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
                padding: '24px 16px',
                boxSizing: 'border-box',
            }}
        >
            {children}
        </div>
    );
}