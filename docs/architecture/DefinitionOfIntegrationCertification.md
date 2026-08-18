# Definition of Integration Certification

Dokumen ini memaparkan aturan baku dan kriteria mutlak kelulusan *(Golden Rules)* pada fase **Integration Certification**.

Tahap ini merupakan gerbang verifikasi yang menyatakan bahwa *Presentation Layer* dan *Backend Layer* terintegrasi secara sah, aman, dan patuh arsitektur tanpa adanya akses "potong kompas".

## Arsitektur Kepatuhan Integrasi (Integration Boundary)
Komunikasi melintasi batas *Frontend* ➔ *Backend* diatur secara mutlak melalui **Action Runtime Pipeline**:
`Widget ➔ Action Runtime ➔ (Action Registry ➔ Permission Validator ➔ Payload Validator ➔ Execution Pipeline) ➔ Application API`.

## Kriteria Kelulusan (Golden Rules)

Agar dapat memperoleh **IntegrationCertificate.json**, seluruh persyaratan tata kelola berikut wajib dipenuhi (diuji via *Governance Engine* Rule-I001 s/d I006):

1. **Prasyarat Sertifikasi Ganda**
   Integrasi tidak dapat dimulai kecuali Modul telah memegang *Backend Architecture Certificate* dan *Presentation Certificate* yang berstatus `VALID`.
2. **Runtime Compatibility Verification**
   Sebelum diinisialisasi, seluruh *Presentation Plugin*, *Widget*, *Action*, dan *Workbench* **HARUS** divalidasi silang kompatibilitasnya dengan versi *Kernel* dan *ABI* yang aktif. Modul usang atau tidak sah akan ditolak.
3. **Action Runtime Boundary (Rule-I001)**
   *Action Runtime* adalah satu-satunya entitas yang memiliki otoritas untuk memanggil *Backend API*. Tidak ada satu pun *Widget* atau komponen presentasi lain yang diperbolehkan mem-*bypass* batasan ini.
4. **Runtime Dispatch Integrity (Rule-I006)**
   *Action Runtime* tidak bertindak sebagai proksi pasif; ia **WAJIB** mengeksekusi tahapan *Permission Validation* (memastikan akses) dan *Payload Validation* (memastikan kesesuaian skema) sebelum melanjutkan instruksi ke *Backend API*.

Bila seluruh kriteria ini telah lulus, agen rilis akan merajut hash dari kedua sertifikat hulu menjadi satu kesatuan di dalam `IntegrationCertificate.json`. Dengan sertifikat ini, Modul dinyatakan sah terintegrasi dan siap melaju ke **Platform Certification**.
