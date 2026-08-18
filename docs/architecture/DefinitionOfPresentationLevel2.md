# Definition of Presentation Level 2 (Runtime Certified)

Untuk mencapai status **Runtime Certified (Level 2)** dan diizinkan beralih fokus ke Form Runtime dan Grid Runtime, Presentation Kernel harus memenuhi kriteria operasional dan arsitektural yang ketat. 

Fase ini menandai peralihan dari sekadar kode fungsional menjadi *Presentation Operating System* yang dapat diaudit dan tahan banting.

## Kriteria Sertifikasi

Sebuah *Bounded Context* atau *Platform Kernel* baru dinyatakan lulus sertifikasi Runtime jika:

1. **Deterministik Runtime**  
   Widget Runtime mematuhi siklus *lifecycle* eksplisit secara kaku: `Discover ➔ Resolve ➔ Authorize ➔ Load ➔ Initialize ➔ Mount ➔ Refresh ➔ Unmount ➔ Dispose` tanpa melompat atau menyimpan state React.
2. **Registry Tervalidasi dan Dibekukan**  
   Skema WidgetDescriptor tidak dapat dimutasi saat runtime berjalan. *Compiler* dan *Registry Builder* memastikan bahwa 100% *entry* mematuhi versi ABI yang dinegosiasikan.
3. **Provider Interchangeability**  
   *Widget Factory* mendelegasikan pemuatan *chunk* kepada implementasi *IWidgetProvider*. Menukar dari `LocalWidgetProvider` ke `RemoteWidgetProvider` tidak boleh menyebabkan sebaris pun perubahan pada logika inti *Runtime*.
4. **Isolasi melalui Error Boundary**  
   Kerusakan kode atau *throw Error* yang disengaja dalam satu widget (misal, *Isolation Test*) **harus** dicegat oleh `WidgetErrorBoundary` dan tidak boleh menjatuhkan zona lain maupun portal utama.
5. **ABI Incompatibility Rejection**  
   Kompilator secara preventif dan eksplisit (melalui *Hard Reject*) harus menolak *Plugin ABI* yang mendeklarasikan versi tak kompatibel dengan kernel, **sebelum** registri sempat tercemar.
6. **Hot Reload Lifecycle**  
   Kemampuan melakukan `RuntimeController.reloadWidget(widgetId)` secara deterministik untuk membongkar (*unmount*) dan memasang kembali (*remount*) tanpa memerlukan *refresh* aplikasi (*hard restart*).
7. **Observer-Driven DevTools**  
   Lapisan diagnosis (DevTools) harus berfungsi sebagai **Observer** pasif yang berlangganan (*subscribe*) pada *Kernel Event Bus*, tanpa men- *trigger*, memodifikasi, atau memberikan dampak sampingan kepada operasi *WidgetRuntime*.
8. **Real-time Health Metrics**  
   DevTools diwajibkan mampu merender:  
   - Jumlah Widget Aktif (Active Widgets)  
   - *Timeline Event* Lifecycle  
   - Resolusi Provider  
   - Metrik Kesehatan Registri  
   Secara deterministik melalui *event queue log*.

*Disetujui Oleh: PMO & Enterprise Architecture Board*
*Target Freeze: Fase PF-4 (Runtime Stabilization)*
