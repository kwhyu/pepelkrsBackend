# API Mahasiswa & KRS

Selamat datang di dokumentasi API Mahasiswa & KRS! 🎓

API ini memungkinkan Anda untuk mengakses informasi mahasiswa, KRS (Kartu Rencana Studi), mata kuliah, dan detail terkait lainnya. API ini dibangun menggunakan Express.js dan siap untuk membantu Anda mengelola data akademik.

## Daftar Endpoint

Berikut adalah daftar endpoint yang tersedia di API ini beserta fungsinya masing-masing.

### 1. Root Endpoint
- **`GET /`**
  - **Fungsi:** Menyambut pengguna dengan pesan "Selamat datang!"
  - **Cara Pakai:** Cukup akses endpoint ini, tidak memerlukan parameter tambahan.

### 2. Data Mahasiswa
- **`GET /mahasiswa`**
  - **Fungsi:** Mengambil semua data mahasiswa beserta IPK (Indeks Prestasi Kumulatif) mereka.
  - **Cara Pakai:** Lakukan permintaan GET ke endpoint ini. Tidak memerlukan parameter tambahan.

### 3. KRS Mahasiswa Berdasarkan NIM
- **`GET /mahasiswa/:nim/krs`**
  - **Fungsi:** Mengambil data KRS mahasiswa tertentu berdasarkan NIM yang diberikan. Endpoint ini juga mengembalikan IPS (Indeks Prestasi Semester) dan IPK mahasiswa tersebut.
  - **Parameter:**
    - `:nim` – NIM mahasiswa yang ingin dicari.
  - **Cara Pakai:** Ganti `:nim` dengan NIM mahasiswa yang Anda cari, lalu lakukan permintaan GET ke endpoint ini.

### 4. Mata Kuliah per Semester
Setiap endpoint di bawah ini akan mengembalikan daftar mata kuliah yang diambil pada semester yang spesifik.

- **`GET /matakuliah/semester/1`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 1.
  
- **`GET /matakuliah/semester/2`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 2.

- **`GET /matakuliah/semester/3`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 3.
  
- **`GET /matakuliah/semester/4`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 4.

- **`GET /matakuliah/semester/5`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 5.
  
- **`GET /matakuliah/semester/6`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 6.

- **`GET /matakuliah/semester/7`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 7.

- **`GET /matakuliah/semester/8`**
  - **Fungsi:** Mengambil daftar mata kuliah semester 8.
