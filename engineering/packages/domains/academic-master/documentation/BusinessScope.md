# Academic Master Data Business Scope

| Field | Value |
|-------|-------|
| Domain | Academic Master Data |
| Domain ID | academic-master |
| Version | 1.0.0 |
| Status | Draft |
| Certification Phase | Phase A – Domain Discovery |
| Owner | Academic Platform |
| Depends On | Registration |
| Runtime | Domain Runtime v1 |

---

# 1. Vision

Academic Master Data menyediakan seluruh referensi akademik yang menjadi sumber data tunggal (Single Source of Truth) bagi seluruh proses akademik di dalam SIAKAD.

Domain ini memastikan seluruh unit akademik menggunakan struktur data yang konsisten, tervalidasi, terdokumentasi, dan dapat digunakan kembali oleh seluruh bounded context.

---

# 2. Mission

Menyediakan layanan master data akademik yang:

- Konsisten
- Terstandarisasi
- Versioned
- Auditable
- Reusable
- Immutable terhadap transaksi akademik

---

# 3. Business Objectives

Domain ini bertujuan untuk:

- Menstandarkan struktur organisasi akademik.
- Menyediakan referensi resmi seluruh program studi.
- Menyediakan kalender akademik.
- Menyediakan kurikulum.
- Menyediakan mata kuliah.
- Menyediakan struktur semester.
- Menyediakan kelas referensi.
- Menyediakan ruang referensi.
- Menyediakan gedung.
- Menyediakan jenis pembelajaran.
- Menyediakan data dosen referensi.
- Menyediakan referensi status akademik.

---

# 4. Business Boundary

## Included

Academic Master Data bertanggung jawab terhadap:

- Faculty
- Department
- Study Program
- Curriculum
- Course
- Academic Calendar
- Semester Definition
- Building
- Room
- Academic Class Type
- Learning Method
- Lecturer Master
- Academic Status Reference

---

## Excluded

Domain ini TIDAK menangani:

- PMB Registration
- Student
- Student Status
- Student Transcript
- Course Offering
- Course Schedule
- Enrollment
- Grade
- Attendance
- Finance
- LMS
- Examination
- Graduation

---

# 5. Ubiquitous Language

| Term | Meaning |
|-------|---------|
| Faculty | Fakultas |
| Department | Jurusan |
| Study Program | Program Studi |
| Curriculum | Kurikulum |
| Course | Mata Kuliah |
| Semester | Semester Akademik |
| Academic Calendar | Kalender Akademik |
| Building | Gedung |
| Room | Ruangan |
| Lecturer | Dosen |
| Learning Method | Metode Pembelajaran |
| Class Type | Jenis Kelas |
| Academic Status | Referensi Status Akademik |

---

# 6. Primary Actors

- Academic Administrator
- Curriculum Team
- Faculty Administrator
- Department Administrator
- Registrar
- QA Team

---

# 7. Upstream Dependencies

## Registration

Digunakan untuk validasi Program Studi saat mahasiswa diterima.

---

# 8. Downstream Dependencies

Domain ini akan digunakan oleh:

- Student Lifecycle
- Course Offering
- Scheduling
- Examination
- Assessment
- Graduation
- Academic Reporting
- Finance
- LMS

---

# 9. Business Capabilities

## Organizational Structure

Mengelola struktur akademik institusi.

Capabilities:

- Faculty Management
- Department Management
- Study Program Management

---

## Curriculum Management

Mengelola struktur kurikulum.

Capabilities:

- Curriculum Version
- Curriculum Activation
- Curriculum Mapping

---

## Course Management

Mengelola master mata kuliah.

Capabilities:

- Course Definition
- Credit Definition
- Prerequisite Reference

---

## Academic Calendar Management

Mengelola kalender akademik.

Capabilities:

- Semester Definition
- Academic Period
- Holiday Reference

---

## Facility Management

Mengelola fasilitas akademik.

Capabilities:

- Building
- Room
- Room Capacity

---

## Reference Management

Mengelola referensi akademik.

Capabilities:

- Academic Status
- Learning Method
- Class Type

---

## Lecturer Reference

Mengelola master dosen.

Capabilities:

- Lecturer Identity
- Academic Rank
- Homebase

---

# 10. Business Rules

BR-001
Setiap Study Program harus berada pada tepat satu Department.

BR-002
Setiap Department berada pada tepat satu Faculty.

BR-003
Setiap Curriculum hanya dimiliki satu Study Program.

BR-004
Satu Course dapat digunakan oleh banyak Curriculum.

BR-005
Academic Calendar hanya boleh memiliki satu semester aktif dalam satu periode.

BR-006
Room harus berada pada tepat satu Building.

BR-007
Course tidak boleh dihapus apabila telah digunakan pada Course Offering.

BR-008
Curriculum yang telah digunakan oleh mahasiswa tidak boleh dihapus.

BR-009
Perubahan master harus bersifat auditable.

BR-010
Seluruh master data harus memiliki status Active atau Inactive.

---

# 11. Non Functional Goals

- Immutable ID
- Audit Trail
- Versioning
- High Availability
- Referential Integrity
- Event Driven Ready
- API First
- Multi Campus Ready

---

# 12. Out of Scope

Academic Master Data tidak menangani:

- transaksi KRS
- transaksi nilai
- transaksi jadwal
- transaksi pembayaran
- transaksi absensi
- transaksi ujian
- transaksi kelulusan

Seluruh transaksi tersebut berada pada bounded context masing-masing.

---

# 13. Domain Ownership

Owner: Academic Platform Team

Steward: Registrar Office

Consumers: Seluruh bounded context akademik.
