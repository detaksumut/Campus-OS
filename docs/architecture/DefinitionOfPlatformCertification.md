# Definition of Platform Certification

Dokumen ini memaparkan aturan baku dan kriteria mutlak kelulusan *(Golden Rules)* pada fase **Platform Certification**.

Fase ini menandakan peralihan fokus dari satu *Bounded Context* (Modul) tunggal menuju skala makro (interoperabilitas seluruh ekosistem Modul dalam satu wadah rilis).

## Golden Rule of Platform Certification

> **No Enterprise Release artifact may be generated unless every Bounded Context declared in the Enterprise Release Manifest possesses valid Architecture, Backend, Presentation, and Integration certification, passes all Platform Governance Rules, satisfies every registered Platform Scenario, and is represented in a fully certified Platform Compatibility Matrix.**

## Kriteria Kelulusan Mutlak

Proses peluncuran rilis *Enterprise* akan ditolak oleh sistem apabila salah satu dari syarat berikut tidak terpenuhi:

1. **Determinism (Rule-PL005)**
   Keluaran dari matriks dan laporan harus mutlak identik secara komposisi *hash* pada keadaan sumber kode yang tidak berubah. *Timestamp* hanya boleh ditempelkan di bagian akhir *(metadata)* setelah *scoring* selesai.
2. **Platform Compatibility Matrix as Single Source of Truth**
   Agregasi kelulusan seluruh modul (seperti *Registration*, *Membership*, *PMB*) diukur berdasarkan perhitungan *Scoring Engine* berbobot (Backend 20%, Presentation 20%, Integration 30%, Governance 20%, Telemetry 10%) yang harus mencapai minimum level `Provisionally Certified` (Skor >= 80) tanpa satu pun kegagalan.
3. **End-to-End Dependency & Cycle Checks (Rule-PL004)**
   `PlatformDependencyGraph` tidak boleh mendeteksi satupun konflik rotasi (*Cyclic Dependency*) antar *Bounded Context*.
4. **End-to-End Scenario Compliance**
   Seluruh skenario lintas lapisan mekanis (Misalnya: *Widget* ➔ *Action Runtime* ➔ *Application* ➔ *Repository* ➔ *Database*) harus lulus dari tiruan otomatis (Skenario A-D).

Hanya apabila seluruh kondisi ini tercapai, `EnterpriseReleaseManifest.json` beserta sekumpulan sertifikat rantainya diizinkan disahkan untuk meluncur ke lingkungan *Production*.
