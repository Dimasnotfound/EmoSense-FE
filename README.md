# EmoSense: Frontend untuk Diagnosis Tingkat Depresi Mahasiswa Tingkat Akhir

## 🎯 Overview
**EmoSense** adalah aplikasi frontend berbasis **React** yang dirancang untuk membantu mahasiswa tingkat akhir menilai tingkat depresi, gangguan suasana hati, dan kecemasan mereka melalui antarmuka yang interaktif dan modern. Aplikasi ini mengintegrasikan API dari backend sistem pakar untuk memberikan diagnosis berbasis *Certainty Factor* (CF) dan *Forward Chaining*. Frontend ini fokus pada pengalaman pengguna yang intuitif dengan desain responsif menggunakan **Tailwind CSS** dan **TypeScript**.

Frontend ini menampilkan:
- Halaman diagnosis dengan langkah-langkah yang jelas.
- Dashboard untuk melihat riwayat diagnosis.
- Desain modern dengan animasi dan progress bar untuk pengalaman pengguna yang lebih baik.

## ✨ Fitur Utama
- **Antarmuka Pengguna Interaktif**: Halaman diagnosis dengan langkah-langkah yang terstruktur (informasi tes, pertanyaan, hasil).
- **Dashboard Riwayat**: Menampilkan riwayat diagnosis dengan detail yang dapat diakses melalui modal popup.
- **Desain Responsif**: Dibangun dengan Tailwind CSS untuk tampilan yang menarik di berbagai perangkat.
- **Pertanyaan Berbasis Konteks**: Pertanyaan relevan untuk mahasiswa tingkat akhir, fokus pada tekanan akademik dan ketidakpastian karier.
- **Hasil Visual yang Jelas**: Menampilkan hasil diagnosis dengan tingkat keyakinan dalam persentase, dilengkapi saran untuk konsultasi profesional.

## 📸 Tangkapan Layar
Berikut adalah beberapa tangkapan layar dari antarmuka EmoSense:


### Halaman Awal(Home)
![Screenshot_8.png](https://raw.githubusercontent.com/Dimasnotfound/EmoSense-FE/main/images/Screenshot_8.png)

### Halaman Diagnosa
![Screenshot_10.png](https://raw.githubusercontent.com/Dimasnotfound/EmoSense-FE/main/images/Screenshot_10.png)

### Halaman Hasil Diagnosa
![Screenshot_11.png](https://raw.githubusercontent.com/Dimasnotfound/EmoSense-FE/main/images/Screenshot_11.png)

### Dashboard Riwayat Diagnosis
![Screenshot_12.png](https://raw.githubusercontent.com/Dimasnotfound/EmoSense-FE/main/images/Screenshot_12.png)


## 🛠️ Teknologi yang Digunakan
- **Frontend**: React, TypeScript, Tailwind CSS
- **Routing**: React Router untuk navigasi antar halaman
- **API Integration**: Menggunakan `fetch` untuk komunikasi dengan backend
- **Desain**: Tailwind CSS untuk styling responsif dan modern

## 📦 Prasyarat
Sebelum memulai, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (versi 16 atau lebih tinggi)
- [Git](https://git-scm.com/) untuk mengklon repositori
- [npm](https://www.npmjs.com/) atau [yarn](https://yarnpkg.com/) untuk menginstal dependensi

**Catatan**: Anda memerlukan backend EmoSense yang berjalan untuk mengambil data diagnosis. Pastikan backend berjalan di `http://localhost:5000` atau sesuaikan URL API di file `services/api.ts`.

## 📥 Cara Mengklon dan Menjalankan Proyek

### 1. Mengklon Repositori
Ikuti langkah-langkah berikut untuk mengklon proyek EmoSense dari GitHub:

```bash
# Klon repositori ke komputer Anda
git clone https://github.com/Dimasnotfound/Emosense-FE.git

# Masuk ke direktori proyek
cd Emosense-FE
```

### 2. Menginstal Dependensi
Setelah mengklon repositori, instal dependensi frontend:

```bash
# Instal dependensi menggunakan npm
npm install

# Alternatif: Jika menggunakan yarn
yarn install
```

### 3. Menjalankan Aplikasi
Jalankan aplikasi frontend dalam mode pengembangan:

```bash
# Jalankan aplikasi React
npm start

# Alternatif: Jika menggunakan yarn
yarn start
```

Aplikasi akan berjalan di `http://localhost:3000`.

### 4. Integrasi dengan Backend
Pastikan backend EmoSense berjalan di `http://localhost:5000`. Jika backend berjalan di URL yang berbeda, sesuaikan konfigurasi API di file `src/services/api.ts`:

```typescript
const API_URL = 'http://localhost:5000'; // Ganti dengan URL backend Anda
```

## 📝 Struktur Proyek
Berikut adalah struktur direktori utama proyek EmoSense frontend:

```
emosense-frontend/
│
├── src/
│   ├── components/          # Komponen React yang dapat digunakan kembali
│   ├── pages/               # Halaman utama (DiagnosePage.tsx, DashboardPage.tsx)
│   ├── services/            # Fungsi untuk komunikasi API (api.ts)
│   ├── App.tsx              # Komponen utama aplikasi
│   └── index.tsx            # Entry point aplikasi
│
├── public/                  # File statis (favicon, dll.)
├── package.json             # Dependensi Node.js
├── tailwind.config.js       # Konfigurasi Tailwind CSS
└── README.md                # File ini
```

## ⚠️ Catatan Penting
- **Ketergantungan Backend**: Frontend ini memerlukan backend untuk berfungsi penuh. Pastikan backend EmoSense berjalan sebelum menggunakan aplikasi.
- **Hasil Diagnosis**: Hasil diagnosis bukan pengganti diagnosis profesional. Jika Anda merasa membutuhkan bantuan, konsultasikan dengan psikolog atau dokter.
- **Responsivitas**: Aplikasi diuji untuk responsivitas, tetapi pastikan untuk menguji di perangkat Anda sendiri.

## 📧 Kontak
Jika Anda memiliki pertanyaan atau membutuhkan bantuan, silakan hubungi:
- Email: [dp4369344@gmail.com]
- GitHub: [Dimasnotfound](https://github.com/Dimasnotfound)
