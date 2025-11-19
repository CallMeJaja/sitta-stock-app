# 📚 Aplikasi Stok Bahan Ajar SITTA

Sistem Informasi Tracking dan Inventori Bahan Ajar berbasis **Vue.js 2**.

![Vue 2](https://img.shields.io/badge/Vue.js-2.x-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![SweetAlert2](https://img.shields.io/badge/SweetAlert2-11.x-EF2D5E?style=for-the-badge&logo=sweetalert2&logoColor=white)

## 🚀 Deskripsi Proyek

Proyek ini adalah implementasi Sistem Informasi Stok Bahan Ajar yang dibangun menggunakan teknologi web modern dengan spesifikasi berikut:

### ✅ Arsitektur & Teknologi
- **Vue 2**: Menggunakan Vue 2.6.14 sebagai framework utama.
- **Component-Based Architecture**: Struktur kode modular yang terbagi menjadi komponen-komponen terpisah (`StockHeader`, `StockStats`, `StockForm`, `StockList`, dll).
- **Centralized State Management**: Implementasi Store Pattern menggunakan `Vue.observable` untuk pengelolaan data yang terpusat.

### 🎨 Antarmuka Pengguna (UI/UX)
- **Bootstrap 5**: Framework CSS untuk tampilan yang responsif dan konsisten.
- **FontAwesome 6**: Integrasi ikon vektor untuk visualisasi yang lebih baik.
- **SweetAlert2**: Sistem notifikasi dan konfirmasi yang interaktif.
- **Dashboard Statistik**: Visualisasi data stok dalam bentuk kartu dashboard.
- **Input Group Search**: Fitur pencarian dengan desain terintegrasi.

### 🛠️ Fitur Fungsional
- **CRUD Lengkap**: Tambah, Baca, Ubah, dan Hapus data bahan ajar.
- **Validasi Form**: Mencegah input data kosong atau tidak valid.
- **Pencarian & Filter**: Cari berdasarkan nama dan filter berdasarkan kategori/status.
- **Keranjang Peminjaman**: Simulasikan peminjaman dengan fitur keranjang belanja.
- **Persistensi Data**: Data tersimpan otomatis di `localStorage` browser (tidak hilang saat refresh).
- **Pagination**: Fitur pembagian halaman untuk menampilkan daftar data yang panjang dengan lebih rapi.

## 📁 Struktur Proyek

```
sitta-stock-app/
├── public/
│   ├── index.html         # Entry point HTML (Bootstrap & FA CDN)
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── StockHeader.vue    # Header aplikasi
│   │   ├── StockStats.vue     # Dashboard statistik (Modern UI)
│   │   ├── StockForm.vue      # Form input/edit dengan SweetAlert2
│   │   ├── StockFilter.vue    # Filter & Search bar
│   │   ├── StockList.vue      # Tabel data stok
│   │   └── StockCart.vue      # Keranjang peminjaman
│   ├── store/
│   │   └── store.js           # Centralized State (Vue.observable)
│   ├── App.vue                # Root component
│   ├── main.js                # Vue 2 Entry point
│   └── assets/
├── package.json           # Dependencies (Vue 2, etc)
└── README.md              # Dokumentasi ini
```

## 🛠️ Instalasi dan Menjalankan

### Prasyarat
- Node.js (v14 atau lebih baru disarankan)
- npm

### Langkah Instalasi

1.  **Clone atau Download Project**
2.  **Install Dependencies**
    ```bash
    npm install
    ```
3.  **Jalankan Development Server**
    ```bash
    npm run dev
    ```
4.  **Akses Aplikasi**
    Buka browser dan kunjungi: `http://localhost:8080`

## 📖 Panduan Penggunaan

### 1. Manajemen Stok
- **Tambah**: Isi form di sebelah kiri dan klik "Tambah". Notifikasi sukses akan muncul.
- **Edit**: Klik tombol biru (ikon pensil) di tabel. Data akan masuk ke form, ubah, lalu klik "Update".
- **Hapus**: Klik tombol merah (ikon tong sampah). Konfirmasi penghapusan akan muncul dengan SweetAlert2.

### 2. Statistik
- Pantau total item, total stok unit, nilai aset (Rupiah), dan item aktif secara real-time di panel atas.

### 3. Peminjaman (Keranjang)
- Klik tombol "Tambah ke Keranjang" pada item di tabel.
- Item akan masuk ke list keranjang di bawah.
- Anda bisa menghapus item satu per satu atau mengosongkan keranjang sekaligus.

## 🎯 Konsep Vue.js yang Diterapkan

- **Reactivity System**: Data binding dua arah (`v-model`) dan satu arah.
- **Computed Properties**: Untuk kalkulasi statistik dan filter data real-time.
- **Event Handling**: Menggunakan `@click`, `@submit.prevent`, dan custom events.
- **Lifecycle Hooks**: `mounted` untuk inisialisasi data.
- **Watchers**: Untuk memantau perubahan state tertentu.
- **Directives**: `v-if`, `v-for`, `v-bind`, `v-on`.

---
**SITTA Stock App** - *Sistem Informasi Tracking dan Inventori Bahan Ajar*
