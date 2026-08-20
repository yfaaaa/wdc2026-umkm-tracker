/**
 * Mengubah string/Date menjadi format tanggal Indonesia
 * Contoh: "2026-08-19" -> "19 Agustus 2026"
 */
export function formatDate(dateInput: string | Date, includeTime: boolean = false): string {
    if (!dateInput) return '-';

    const date = new Date(dateInput);

    if (isNaN(date.getTime())) return '-';

    const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        ...(includeTime && {
            hour: '2-digit',
            minute: '2-digit',
        }),
    };

    return new Intl.DateTimeFormat('id-ID', options).format(date);
}