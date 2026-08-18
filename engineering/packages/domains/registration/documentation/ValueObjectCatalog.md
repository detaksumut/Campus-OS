# Registration Value Object Catalog

Dokumen ini mendefinisikan *Value Objects* (objek immutable tanpa identitas unik) yang digunakan di dalam Bounded Context `registration`.

## 1. Value Object: `PersonalData`
Mewakili biodata pendaftar.
- **Attributes**:
  - `fullName` (String)
  - `dateOfBirth` (Date)
  - `gender` (Enum: MALE, FEMALE)
  - `nationality` (String)
  - `nationalIdNumber` (String - NIK)
- **Invariants**:
  - `fullName` tidak boleh kosong.
  - `dateOfBirth` harus menunjukkan umur minimal 16 tahun (*Age Policy*).
  - `nationalIdNumber` harus tervalidasi panjang/formatnya (jika WNI).

## 2. Value Object: `ContactInfo`
Mewakili kontak komunikasi pendaftar.
- **Attributes**:
  - `email` (String)
  - `phoneNumber` (String)
  - `address` (String)
- **Invariants**:
  - `email` harus memenuhi standar regex email valid.
  - `phoneNumber` harus mengandung kode negara (misal: +62).

## 3. Value Object: `AcademicRecord`
Mewakili rekam jejak pendidikan terakhir pendaftar.
- **Attributes**:
  - `previousSchoolName` (String)
  - `graduationYear` (Integer)
  - `major` (String)
  - `gpa` (Float)
- **Invariants**:
  - `graduationYear` tidak boleh lebih besar dari tahun berjalan.
  - `gpa` harus berada pada rentang 0.0 - 4.0 (atau ekuivalen 100).
