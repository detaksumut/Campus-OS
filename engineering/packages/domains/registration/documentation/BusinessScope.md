# Registration (PMB) Business Scope

## 1. Business Vision
Membangun pintu gerbang utama Campus OS yang mengelola seluruh siklus penerimaan dan pendaftaran mahasiswa baru (Applicant) dari registrasi awal, pengumpulan dokumen, validasi, hingga penetapan kelulusan, dengan tata kelola keamanan dan observabilitas tingkat *Enterprise*.

## 2. Domain Boundary
- **In-Scope**: Registrasi akun pendaftar, pengumpulan biodata, pengumpulan dokumen persyaratan, proses verifikasi, penentuan status kelulusan.
- **Out-of-Scope**: Pembayaran UKT (dikelola oleh *Finance/Billing Domain*), Pembuatan NIM dan Data Induk Mahasiswa (dikelola oleh *Academic Master Data Domain*).

## 3. Ubiquitous Language
- **Applicant**: Calon mahasiswa yang mendaftar ke sistem.
- **RegistrationPeriod**: Rentang waktu tertentu di mana pendaftaran dibuka (Gelombang Pendaftaran).
- **AdmissionStatus**: Status kelulusan dari seorang pendaftar (misal: *ACCEPTED*, *REJECTED*).
- **Submission**: Keseluruhan berkas dan data yang diserahkan oleh Applicant untuk diverifikasi.

## 4. Stakeholders
- Panitia PMB (Admissions Office)
- Calon Mahasiswa (Applicants)
- Auditor Sistem (Compliance Office)

## 5. Actors
- **Guest**: Pengguna anonim yang melihat informasi PMB.
- **Applicant**: Calon mahasiswa terautentikasi.
- **Reviewer / Verifier**: Staf PMB yang memvalidasi dokumen.
- **Admission Admin**: Administrator yang membuka/menutup `RegistrationPeriod`.

## 6. Business Rules
- **Rule 1**: Seorang `Applicant` tidak dapat melakukan `Submit` jika `RegistrationPeriod` tidak aktif.
- **Rule 2**: `Submission` yang sudah disubmit tidak dapat diubah oleh `Applicant` (Immutable Submission Policy).
- **Rule 3**: Validasi kelulusan hanya bisa dilakukan jika seluruh dokumen berstatus *Verified*.

## 7. Domain Dependencies
- **Upstream**: Tidak ada (Root Domain).
- **Downstream**: `kernel.identity` (Autentikasi), `kernel.workflow` (Approval dokumen), `kernel.notification` (Email kelulusan), `kernel.document` (Penyimpanan berkas KTP/Ijazah).
