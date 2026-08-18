# CAMPUS OS - STANDAR INGESTION, ADJUSTMENT & DROPSHIP DATA MASTER KAMPUS
**Dokumen Arsitektur & Operasional Administrator (Zero-Duplication & Zero-Data-Chaos Protocol)**  
*Versi:* 2.0.0 | *Status:* Disetujui (Approved) | *Standar:* Kemendikbudristek RI, BAN-PT/LAM & DUKCAPIL

---

## 1. Latar Belakang & Tujuan Arsitektur
Ketika sebuah perguruan tinggi (Universitas, Politeknik, Institut, Sekolah Tinggi, atau Akademi) melakukan migrasi ke **Campus OS**, institusi tersebut membawa data *existing* historis dalam jumlah besar.

Tujuan dari protokol ini adalah:
1. **Memberikan keleluasaan penuh kepada Administrator** untuk menyesuaikan (*adjust*), menambah (+), menghapus (-), atau menyembunyikan kolom sesuai kebutuhan lokal kampus sebelum data di-ingest.
2. **Mencegah Kerusakan & Kekacauan Data (*Zero Data Chaos*)**: Menjamin bahwa seluruh data yang masuk tervalidasi tipe data, format tanggal, relasi program studi (*Foreign Key*), dan aturan integritasnya.
3. **Pencegahan Mutlak Duplikasi Data (*Zero-Duplication Protocol*)**: Menggunakan teknik *Idempotent Upsert* sehingga data yang di-import berulang kali tidak akan pernah menggandakan data di database PostgreSQL.

---

## 2. Struktur 5 Entitas Data Master Standar Nasional

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                      PETA RELASI INTEGRITAS DATA MASTER KAMPUS                         │
└────────────────────────────────────────────────────────────────────────────────────────┘

     ┌───────────────────────┐
     │ 4. PENGURUS YAYASAN   │ ── Mengawasi & Menetapkan Statuta
     │    (foundation_boards)│
     └───────────┬───────────┘
                 │
     ┌───────────▼───────────┐         ┌────────────────────────┐
     │ 2. REKTOR & DOSEN     │ ──────▶ │ 5. KEGIATAN KAMPUS     │
     │    (lecturers)        │         │    (campus_activities) │
     └───────────┬───────────┘         └───────────▲────────────┘
                 │                                 │
     ┌───────────▼───────────┐                     │
     │ 1. DATA MAHASISWA     │ ────────────────────┘
     │    (students)         │
     └───────────────────────┘
                 │
     ┌───────────▼───────────┐
     │ 3. PEGAWAI & TENDIK   │ ── Melayani Administrasi Akademik & Umum
     │    (staff_employees)  │
     └───────────────────────┘
```

---

### 🎓 1. Data Mahasiswa (Tabel: `students`)
Menyimpan database induk seluruh mahasiswa aktif, cuti, lulus, maupun alumni.

| No | Nama Kolom Database | Tipe Data | Status | Keterangan & Standar |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `student_id` | `VARCHAR(50)` | **PRIMARY KEY** | NIM Resmi Mahasiswa (Unik per Tenant) |
| 2 | `tenant_id` | `VARCHAR(50)` | **FOREIGN KEY** | Identitas Kampus Multi-Tenant |
| 3 | `program_id` | `VARCHAR(50)` | **FOREIGN KEY** | Kode Program Studi / Jurusan |
| 4 | `full_name` | `VARCHAR(150)` | **WAJIB** | Nama Lengkap (Sesuai Ijazah SMA/KTP) |
| 5 | `nik` | `VARCHAR(20)` | **WAJIB (WNI)** | 16 Digit Nomor Induk Kependudukan |
| 6 | `nisn` | `VARCHAR(20)` | Opsional | Nomor Induk Siswa Nasional |
| 7 | `email` | `VARCHAR(150)` | **WAJIB** | Email Aktif / Email Institusi |
| 8 | `phone` | `VARCHAR(30)` | **WAJIB** | Nomor WhatsApp Aktif |
| 9 | `admission_year` | `INT` | **WAJIB** | Tahun Angkatan (Contoh: `2023`) |
| 10 | `current_semester`| `INT` | **WAJIB** | Semester Berjalan (Contoh: `1`, `3`, `5`) |
| 11 | `cumulative_gpa` | `DECIMAL(3,2)` | Opsional | Indeks Prestasi Kumulatif (0.00 s/d 4.00) |
| 12 | `academic_status` | `VARCHAR(20)` | **WAJIB** | `ACTIVE`, `LEAVE`, `GRADUATED`, `DROPOUT` |
| 13 | *Kolom Kustom* | *Dinamis* | Fleksibel | Ditambahkan administrator via UI |

---

### 👨‍🏫 2. Data Rektor hingga Dosen Tetap & Tidak Tetap (Tabel: `lecturers`)
Menyimpan seluruh jenjang struktural pimpinan akademik dan tenaga pengajar.

| No | Nama Kolom Database | Tipe Data | Status | Keterangan & Standar |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `lecturer_id` | `VARCHAR(50)` | **PRIMARY KEY** | NIP Dosen / ID Internal Kampus |
| 2 | `tenant_id` | `VARCHAR(50)` | **FOREIGN KEY** | Identitas Kampus Multi-Tenant |
| 3 | `program_id` | `VARCHAR(50)` | **FOREIGN KEY** | Homebase Program Studi |
| 4 | `nidn_nup` | `VARCHAR(30)` | **UNIQUE** | NIDN (Dosen Tetap) / NUP (Dosen Tidak Tetap) |
| 5 | `full_name` | `VARCHAR(150)` | **WAJIB** | Nama Lengkap beserta Gelar Akademik Depan/Belakang |
| 6 | `structural_role` | `VARCHAR(50)` | Opsional | `REKTOR`, `WAKIL_REKTOR`, `DEKAN`, `KAPRODI`, `DOSEN` |
| 7 | `employment_type` | `VARCHAR(30)` | **WAJIB** | `DOSEN_TETAP`, `DOSEN_TIDAK_TETAP`, `DOSEN_LB`, `PRAKTISI` |
| 8 | `academic_rank` | `VARCHAR(50)` | **WAJIB** | `TENAGA_PENGAJAR`, `ASISTEN_AHLI`, `LEKTOR`, `LEKTOR_KEPALA`, `GURU_BESAR` |
| 9 | `highest_education`| `VARCHAR(10)` | **WAJIB** | `S2`, `S3`, `SPESIALIS`, `SUB_SPESIALIS` |
| 10 | `status_bkd` | `VARCHAR(20)` | **WAJIB** | `MEMENUHI` (12-16 SKS), `TIDAK_MEMENUHI` |
| 11 | `email` | `VARCHAR(150)` | **WAJIB** | Email Resmi Kampus |

---

### 💼 3. Data Pegawai & Tenaga Kependidikan / Tendik (Tabel: `staff_employees`)
Menyimpan seluruh staf pendukung operasional kampus.

| No | Nama Kolom Database | Tipe Data | Status | Keterangan & Standar |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `staff_id` | `VARCHAR(50)` | **PRIMARY KEY** | NIP / NIK Pegawai |
| 2 | `tenant_id` | `VARCHAR(50)` | **FOREIGN KEY** | Identitas Kampus Multi-Tenant |
| 3 | `full_name` | `VARCHAR(150)` | **WAJIB** | Nama Lengkap Staf |
| 4 | `nik` | `VARCHAR(20)` | Opsional | 16 Digit NIK KTP |
| 5 | `unit_division` | `VARCHAR(100)` | **WAJIB** | Divisi: `BAAK`, `Keuangan`, `IT`, `Perpustakaan`, `Lab`, `SDM`, `Sarpras` |
| 6 | `job_title` | `VARCHAR(100)` | **WAJIB** | Jabatan: `Kepala Bagian`, `Staf Administrasi`, `Pranata Lab`, `Pustakawan` |
| 7 | `employment_status`| `VARCHAR(50)`| **WAJIB** | `TETAP_YAYASAN`, `KONTRAK`, `PNS_DPK`, `OUTSOURCING` |
| 8 | `join_date` | `DATE` | **WAJIB** | Tanggal Mulai Bekerja (TMT) |
| 9 | `is_active` | `BOOLEAN` | **WAJIB** | Status Keaktifan (`TRUE` / `FALSE`) |

---

### 🏛️ 4. Data Pengurus & Yayasan / Badan Penyelenggara (Tabel: `foundation_boards`)
Menyimpan data legalitas pengurus badan penyelenggara perguruan tinggi.

| No | Nama Kolom Database | Tipe Data | Status | Keterangan & Standar |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `member_id` | `VARCHAR(50)` | **PRIMARY KEY** | ID Pengurus Yayasan |
| 2 | `tenant_id` | `VARCHAR(50)` | **FOREIGN KEY** | Identitas Kampus Multi-Tenant |
| 3 | `full_name` | `VARCHAR(150)` | **WAJIB** | Nama Lengkap Pengurus Yayasan |
| 4 | `position` | `VARCHAR(100)` | **WAJIB** | `Ketua Dewan Pembina`, `Ketua Pengawas`, `Ketua Yayasan`, `Sekretaris`, `Bendahara` |
| 5 | `sk_appointment_number` | `VARCHAR(100)` | Opsional | Nomor SK Kemenkumham / Akta Notaris |
| 6 | `start_period` | `DATE` | **WAJIB** | Awal Masa Bakti Jabatan |
| 7 | `end_period` | `DATE` | **WAJIB** | Akhir Masa Bakti Jabatan |

---

### 📅 5. Data Kegiatan Kampus & Tridharma (Tabel: `campus_activities`)
Menyimpan data agenda akademik, ormawa, seminar, pengabdian, dan kegiatan kampus.

| No | Nama Kolom Database | Tipe Data | Status | Keterangan & Standar |
| :--- | :--- | :--- | :--- | :--- |
| 1 | `activity_id` | `UUID` | **PRIMARY KEY** | ID Kegiatan Unik |
| 2 | `tenant_id` | `VARCHAR(50)` | **FOREIGN KEY** | Identitas Kampus Multi-Tenant |
| 3 | `title` | `VARCHAR(255)` | **WAJIB** | Nama Kegiatan / Agenda |
| 4 | `category` | `VARCHAR(50)` | **WAJIB** | `AKADEMIK`, `KEMAHASISWAAN`, `SEMINAR`, `PENGABDIAN`, `LOMBA` |
| 5 | `organizer` | `VARCHAR(150)` | **WAJIB** | Unit Penyelenggara / BEM / Hima |
| 6 | `start_date` | `DATE` | **WAJIB** | Tanggal Pelaksanaan |
| 7 | `budget_allocated`| `DECIMAL(15,2)`| Opsional | Anggaran Kegiatan (RAB) |
| 8 | `status` | `VARCHAR(20)` | **WAJIB** | `TERJADWAL`, `BERLANGSUNG`, `SELESAI`, `DIBATALKAN` |

---

## 3. Fitur Penyesuaian Kolom Dinamis (+ / - Column Manager)
Sebelum melakukan proses dropship, administrator dapat membuka panel **`⚙️ Sesuaikan (+ / -) Kolom Tabel`**:

1. **`+ Tambah Kolom Kustom`**:
   - Memasukkan nama kolom baru (contoh: *Virtual Account Bank, No HP Orang Tua, Status Asrama, Peminatan Khusus*).
   - Memilih tipe data (*Teks, Angka, Tanggal, Pilihan Dropdown*).
2. **`- Hapus Kolom Kustom`**:
   - Menghapus kolom kustom yang tidak lagi digunakan.
3. **`👁️ / 👁️‍🗨️ Sembunyikan / Tampilkan Kolom`**:
   - Memilih kolom mana saja yang ingin diikutsertakan pada template ekspor/impor Excel.
4. **`📥 Generate Template Excel Kustom`**:
   - Sistem secara dinamis menghasilkan file Excel `.xlsx` yang susunan judul kolomnya 100% identik dengan konfigurasi yang dibuat administrator.

---

## 4. Protokol Anti-Duplikasi & Integritas Data (Zero-Duplication Engine)

Untuk menjamin **tidak ada duplikasi data atau kekacauan relasi (*Zero Chaos*)**, sistem menjalankan 4 pilar pengamanan:

### A. Urutan Eksekusi Ingest (*Dependency Ingestion Hierarchy*)
Ingest data harus dijalankan mengikuti urutan logis agar tidak terjadi error relasi *foreign key*:
$$\mathbf{1.\; Jurusan/Prodi} \longrightarrow \mathbf{2.\; Dosen} \longrightarrow \mathbf{3.\; Mahasiswa} \longrightarrow \mathbf{4.\; Pegawai} \longrightarrow \mathbf{5.\; Yayasan/Kegiatan}$$

### B. Klausa Idempotent PostgreSQL `UPSERT`
Setiap eksekusi import data menggunakan klausa SQL `ON CONFLICT DO UPDATE`:
```sql
INSERT INTO students (
    student_id, tenant_id, program_id, full_name, nik, 
    admission_year, current_semester, cumulative_gpa, academic_status
) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
ON CONFLICT (student_id) 
DO UPDATE SET 
    full_name = EXCLUDED.full_name,
    current_semester = EXCLUDED.current_semester,
    cumulative_gpa = EXCLUDED.cumulative_gpa,
    academic_status = EXCLUDED.academic_status;
```
* **Hasil**: Jika administrator mengunggah file data berkali-kali:
  - Baris data baru $\rightarrow$ otomatis **di-INSERT**.
  - Baris data lama yang NIM/NIDN-nya sudah ada $\rightarrow$ otomatis **di-UPDATE** informasinya tanpa menimbulkan error duplikat.

### C. Normalisasi & Sanitasi Nilai (*Pre-Flight Sanitizer*)
- **Pembersihan NIK**: Menghilangkan tanda petik tunggal (`'1271...` $\rightarrow$ `1271...`) dan spasi liar.
- **Konversi Tanggal**: Mendukung format Indonesia (`DD/MM/YYYY`) dan internasional (`YYYY-MM-DD`) secara otomatis ke tipe `DATE` PostgreSQL.
- **Pemisah Desimal**: Mengubah koma (`3,75`) menjadi titik desimal (`3.75`).

---

## 5. Kesimpulan & Status Kesiapan
Dengan diterapkannya standar ini:
1. Setiap kampus mitra memiliki kebebasan penuh dalam mengelola dan menyesuaikan kolom data internal mereka.
2. Data tersimpan secara rapi, konsisten, dan siap disinkronisasikan langsung ke **PDDIKTI Neo Feeder Kemendikbudristek**.
3. Database PostgreSQL terproteksi 100% dari duplikasi data dan anomali relasional.
