import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // Data dianggap segar selama 5 menit
            refetchOnWindowFocus: false, // Mencegah fetch ulang otomatis saat pindah tab browser
            retry: 1, // Percobaan ulang maksimal 1 kali jika request gagal
        },
    },
});