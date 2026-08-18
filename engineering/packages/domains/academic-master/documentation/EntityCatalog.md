# Academic Master Data - Entity Catalog

## 1. Aggregate Roots

| Aggregate | Identity | Description |
| :--- | :--- | :--- |
| **Faculty** | `facultyId` (UUID) | Entitas tertinggi pengelola jurusan/program studi. |
| **Curriculum** | `curriculumId` (UUID) | Kerangka dasar kurikulum pendidikan. |
| **Course** | `courseId` (UUID) | Katalog master mata kuliah. |
| **AcademicCalendar** | `calendarId` (UUID) | Pengelolaan tahun dan struktur penanggalan akademik institusi. |
| **Building** | `buildingId` (UUID) | Fasilitas infrastruktur gedung. |
| **LecturerMaster** | `lecturerId` (UUID) | Referensi profil dosen pengajar akademik. |
| **AcademicReference** | `referenceId` (UUID) | Pengelolaan dinamis untuk *Learning Method*, *Class Type*, dan *Academic Status*. |

## 2. Entities (Children of Aggregates)

| Entity | Parent Aggregate | Description |
| :--- | :--- | :--- |
| **Department** | `Faculty` | Jurusan di bawah naungan Fakultas (berdasarkan BR-002). |
| **StudyProgram** | `Department` | Program studi tempat kurikulum mengakar (berdasarkan BR-001). |
| **CurriculumVersion** | `Curriculum` | Edisi atau revisi dari kurikulum tertentu (BR-003, BR-008). |
| **CurriculumCourse** | `Curriculum` | Mata kuliah spesifik yang dipetakan ke versi kurikulum. |
| **PrerequisiteRule** | `CurriculumCourse` | Aturan prasyarat mata kuliah (misal: harus lulus Course X). |
| **AcademicYear** | `AcademicCalendar` | Tahun operasi akademik (misal: 2026/2027). |
| **Semester** | `AcademicYear` | Semester aktif di dalam satu kalender (BR-005). |
| **Room** | `Building` | Ruangan spesifik dengan kapasitas di dalam sebuah Gedung (BR-006). |
