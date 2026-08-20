================================================================================
                    PRODUCT DOCUMENTATION - MEMORI BAIK
================================================================================
Tim Developer  : Memori Baik
Versi Aplikasi : v1.0.0 (Production Ready)
Fokus Solusi   : Automated Financial Accounting & AI Receipt Scanner (OCR)
Target Pengguna: Pelaku UMKM, Owner Bisnis Retail/F&B, & Pengelola Keuangan Mandiri

--------------------------------------------------------------------------------
1. RINGKASAN PRODUK
--------------------------------------------------------------------------------
Memori Baik adalah platform pengelolaan keuangan modern yang memangkas proses 
pencatatan transaksi manual melalui integrasi kecerdasan buatan (AI OCR Scanner). 
Aplikasi ini memungkinkan pengguna mengunggah foto struk/nota fisik, lalu secara 
otomatis mengonversinya menjadi data transaksi digital yang tersinkronisasi 
dengan pembukuan utama (General Ledger).

--------------------------------------------------------------------------------
2. FITUR UTAMA & KAPABILITAS
--------------------------------------------------------------------------------
[+] Instant AI OCR Scanner:
    - Mendukung upload file JPG, PNG, WEBP, hingga PDF (maks. 5MB).
    - Ekstraksi otomatis nama merchant, tanggal transaksi, daftar item, dan grand total.
    - Tingkat akurasi ekstraksi tinggi dengan indikator Confidence Level.

[+] Automated Ledger Sync:
    - Penggabungan satu klik (One-Click Sync) dari data struk ter-scan langsung ke 
      modul pembukuan transaksi pengeluaran.
    - Pencegahan duplikasi data melalui status penandaan (isSynced).

[+] Dashboard & Transaction Management:
    - Pencarian cepat (real-time filter) berdasarkan nama toko atau nama file.
    - Modal review interaktif untuk verifikasi detail item sebelum pembukuan.
    - Pengelolaan histori struk digital (Preview, Sync, & Delete).

--------------------------------------------------------------------------------
3. ARSITEKTUR TEKNIS & STACK
--------------------------------------------------------------------------------
- Framework          : Next.js (App Router)
- Language           : TypeScript (Type-Safe Architecture)
- Styling            : Custom CSS-in-JS + Glassmorphism UI
- State & Storage    : React Hooks (useState, useEffect, useRef) + LocalStorage Sync
- File Processing    : Client-side Preview & Mock OCR Engine Pipeline
================================================================================

🧾 Memori Baik — Turn Paper Receipts into Financial Clarity in Seconds"73% pelaku UMKM kehilangan potensi profit bukan karena kurang penjualan, melainkan karena transaksi kecil yang luput dicatat."Memori Baik hadir sebagai solusi pembukuan pintar berbasis AI OCR yang mengubah tumpukan struk belanja fisik menjadi data keuangan terstruktur secara otomatis. Tanpa input manual satu per satu, tanpa baris transaksi yang terlewat.💡 Mengapa Memori Baik?⚡ Zero Manual Typing: Ambil foto struk, unggah, dan biarkan AI mengekstrak nominal, tanggal, hingga nama toko secara presisi.🔗 Auto-Sync Pembukuan: Sekali klik untuk memasukkan hasil scan langsung ke laporan kas & arus keuangan toko Anda.🛡️ Validasi Data Transparan: Dilengkapi indikator Confidence Score dan modal peninjauan ulang (review) untuk memastikan akurasi data 100%.💻 Modern Glassmorphism UI: Antarmuka responsif, bersih, dan intuitif yang dirancang untuk kenyamanan operasional harian.🛠️ Teknologi & StackLayerTeknologiFrontend FrameworkNext.js (App Router)LanguageTypeScriptUI/UX DesignGlassmorphism Dashboard StylingOCR Engine PipelineAI Text Extraction EngineData PersistenceSynchronized Browser LocalStorage
