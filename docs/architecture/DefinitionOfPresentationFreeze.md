# Definition of Presentation Freeze

Dokumen ini mendefinisikan persyaratan mutlak (*Golden Rules*) yang harus dipenuhi oleh sebuah modul (*Bounded Context*) agar dapat dinyatakan lulus tahap **Presentation Freeze**.

Pada tahap ini, *Presentation Layer* dilarang keras memuat logika bisnis. Lapisan ini murni diturunkan dari metadata (Manifest) dan dikonstruksi secara *Registry-Driven*.

## Arsitektur Kepatuhan (Presentation Pipeline)
Rantai komposisi yang diizinkan untuk membangun UI adalah murni linier:
`Presentation Plugin ➔ Presentation Registry ➔ Workbench Registry ➔ Zone Renderer ➔ Widget Runtime ➔ Action Runtime ➔ Application API`.

Tidak boleh ada *bypass* atau potong kompas dalam rantai ini.

## Kriteria Kelulusan (Golden Rules)

Agar dapat memperoleh sertifikat *Presentation Freeze*, sebuah modul harus meloloskan pengujian otomatis di *Governance Engine* (Rule-P001 hingga P006), yang mencakup:

1. **Widget ABI Compatibility (Rule-P005)**
   Seluruh deklarasi *Widget* harus mematuhi `WidgetDescriptor` (*zone, capabilities, dependencies, lifecycle, actions, permissions, priority, lazy*).
2. **Action Descriptor Integrity (Rule-P006 & P004)**
   Setiap interaksi pengguna hanya boleh direpresentasikan sebagai `Action ID` (misal `SubmitRegistration`) yang dideskripsikan secara stabil (*idempotent, retryPolicy, telemetry, audit*).
3. **No Direct API Access (Rule-P001)**
   Tidak ada satupun berkas antarmuka (*Widget*) yang diizinkan mengimpor atau mengakses secara langsung `RegistrationApi`, *Facade*, *Repository*, atau *Domain Entity*.
4. **Action Bus Exclusive (Rule-P002)**
   Satu-satunya jembatan antara *Widget* (stateless) dengan dunia luar (*Backend*) adalah melalui `useActionBus().dispatch(ActionID, payload)`.
5. **Workbench Zone Isolation (Rule-P003)**
   *Workbench Manifest* tidak boleh menyebutkan kelas React (*Widget*) apa pun. Ia hanya boleh mendefinisikan batas area struktural (Misal: `Navigation`, `Sidebar`, `Content`, `Inspector`, `Footer`, `Overlay`, `Dialog`). *Widget* disuntikkan secara dinamis oleh *Runtime* berdasar `WidgetDescriptor`.

Apabila seluruh kriteria ini telah lulus validasi `npm run certify:architecture`, barulah *Bounded Context* diizinkan melangkah ke tahapan berikutnya: **Integration Certification**.
