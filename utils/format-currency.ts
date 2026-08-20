
/**
 * Mengubah angka menjadi format mata uang Rupiah
 * Contoh: 50000 -> "Rp 50.000"
 */
export function formatCurrency(amount: number): string {
    if (isNaN(amount)) return 'Rp 0';

    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}