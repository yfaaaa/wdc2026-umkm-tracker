# 🧾 UMKM Tracker
> **Turn Paper Receipts into Financial Clarity in Seconds**

![Next.js](https://img.shields.io/badge/Next.js-14%2B-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-Type--Safe-blue?style=for-the-badge&logo=typescript)
![Team](https://img.shields.io/badge/Team-Memori%20Baik'-purple?style=for-the-badge)
![Status](https://img.shields.io/badge/Version-v1.0.0%20(Production%20Ready)-success?style=for-the-badge)

> *"73% pelaku UMKM kehilangan potensi profit bukan karena kurang penjualan, melainkan karena transaksi kecil yang luput dicatat."*

---

## 📌 Ringkasan Produk

**UMKM Tracker** adalah platform pengelolaan keuangan modern yang dikembangkan oleh tim **Memori Baik'** untuk memangkas proses pencatatan transaksi manual melalui integrasi kecerdasan buatan (**AI OCR Scanner**). 

Aplikasi ini mengubah tumpukan struk belanja fisik menjadi data keuangan digital terstruktur secara otomatis. Tanpa *input* manual satu per satu, tanpa baris transaksi yang terlewat, dan langsung tersinkronisasi dengan pembukuan utama (*General Ledger*).

* **Target Pengguna:** Pelaku UMKM, Owner Bisnis Retail/F&B, & Pengelola Keuangan Mandiri.
* **Fokus Solusi:** Automated Financial Accounting & AI Receipt Scanner (OCR).
* **Tim Pengembang:** Memori Baik'

---

## 💡 Mengapa UMKM Tracker?

* **⚡ Zero Manual Typing:** Ambil foto struk, unggah, dan biarkan AI mengekstrak nominal, tanggal, daftar item, hingga nama toko secara presisi.
* **🔗 Auto-Sync Pembukuan:** Sekali klik (*One-Click Sync*) untuk memasukkan hasil *scan* langsung ke laporan kas & arus keuangan toko Anda.
* **🛡️ Validasi Data Transparan:** Dilengkapi indikator *Confidence Score* dan modal peninjauan ulang (*review*) untuk memastikan akurasi data 100%.
* **💻 Modern Glassmorphism UI:** Antarmuka responsif, bersih, dan intuitif yang dirancang untuk kenyamanan operasional harian.

---

## 🚀 Fitur Utama & Kapabilitas

### 1. Instant AI OCR Scanner
* **Format Dukungan:** Upload file JPG, PNG, WEBP, hingga PDF (Maksimal 5MB).
* **Ekstraksi Presisi:** Deteksi otomatis nama merchant, tanggal transaksi, daftar item, dan grand total.
* **Confidence Level:** Transparansi akurasi ekstraksi AI secara *real-time*.

### 2. Automated Ledger Sync
* **One-Click Sync:** Integrasi instan dari data struk ter-scan langsung ke modul pembukuan pengeluaran.
* **Anti-Duplikasi:** Sistem pencegahan pencatatan ganda dengan status penandaan kustom (`isSynced`).

### 3. Dashboard & Transaction Management
* **Real-time Filter:** Pencarian cepat berdasarkan nama toko (*merchant*) atau nama file.
* **Interactive Review Modal:** Verifikasi detail item & nominal sebelum masuk ke buku besar.
* **Digital Receipt Archiving:** Pengelolaan histori struk (*Preview, Sync, & Delete*).

---

## 🛠️ Arsitektur Teknis & Stack

| Layer | Teknologi & Deskripsi |
| :--- | :--- |
| **Frontend Framework** | Next.js (App Router) |
| **Language** | TypeScript (*Type-Safe Architecture*) |
| **UI/UX Design** | Custom CSS-in-JS + Glassmorphic Dashboard Styling |
| **State & Storage** | React Hooks (`useState`, `useEffect`, `useRef`) + LocalStorage Sync |
| **OCR Pipeline** | Client-side Preview & AI Text Extraction Engine Pipeline |

---

## 📂 Struktur Direktori Proyek

```text
wdc2026-umkm-tracker/
├── app/                # Next.js App Router (Pages & Layout)
├── components/         # Reusable UI Components
├── features/           # Feature-specific Modules
├── hooks/              # Custom React Hooks
├── lib/                # Helper Libraries & Configs
├── public/             # Static Assets
├── types/              # TypeScript Interfaces & Definitions
└── utils/              # Utility Functions
