# Academic Master Data - Value Object Catalog

## Immutable Domain Rules

Semua objek di bawah ini murni *immutable* dan menegakkan *invariant* serta *domain rules* yang ketat (format, batas nilai, dan struktur logika murni).

| Value Object | Properties | Invariants |
| :--- | :--- | :--- |
| **CourseCode** | `code` (String) | Harus sesuai format standar penamaan universitas (misal: "IF401"). |
| **CreditUnit** | `sks` (Integer) | Rentang absolut: 0 - 8 SKS. Tidak boleh negatif. |
| **SemesterNumber** | `number` (Integer) | Rentang absolut: 1 - 14 (untuk jenjang S1/D3/D4). |
| **AcademicPeriod** | `startYear`, `endYear` | `endYear` harus persis `startYear + 1`. |
| **CourseTitle** | `title` (String), `englishTitle` (String) | Tidak boleh kosong, max 100 karakter untuk lokalisasi. |
| **VersionName** | `name` (String) | Penanda revisi (misal: "Kurikulum Merdeka 2024"). |
| **RoomCapacity** | `maxCapacity` (Integer) | Kapasitas ruangan, minimal 1, batas standar 200. |
| **LecturerIdentity** | `nidn` (String), `nip` (String) | ID Nasional Dosen atau ID Pegawai (unik). |
| **StatusFlag** | `isActive` (Boolean) | Merepresentasikan status aktif/inaktif seluruh master data (BR-010). |
