import React, { useState } from 'react';
import { 
  Library, Package, UserCheck, Search, BookOpen, CheckCircle2, Download, 
  Plus, UserPlus, Building, Briefcase, GraduationCap, Send, Phone, Mail, Award, Filter
} from 'lucide-react';
import { useTenant } from '@campus-os/shared';

interface AlumniItem {
  id: string;
  nim: string;
  name: string;
  prodi: string;
  gradYear: number;
  employmentStatus: 'BEKERJA' | 'WIRAUSAHA' | 'STUDI_LANJUT' | 'MENCARI_KERJA';
  company: string;
  jobTitle: string;
  waitTimeMonths: number;
  salaryRange: string;
  email: string;
  phone: string;
}

export const PerpustakaanWorkspaceView: React.FC<{ defaultSub?: 'perpustakaan' | 'aset' | 'alumni' }> = ({ defaultSub = 'perpustakaan' }) => {
  const { profile } = useTenant();
  const [subTab, setSubTab] = useState<'perpustakaan' | 'aset' | 'alumni'>(defaultSub);
  
  // Alumni Workspace Sub-view
  const [alumniViewMode, setAlumniViewMode] = useState<'DIREKTORI' | 'FORM_DAFTAR' | 'IKU_STAT'>('DIREKTORI');
  const [alumniSearch, setAlumniSearch] = useState('');
  const [alumniProdiFilter, setAlumniProdiFilter] = useState('ALL');

  // Form State Registrasi Alumni Baru
  const [alumniForm, setAlumniForm] = useState({
    nim: '',
    name: '',
    prodi: 'D4 Usaha Perjalanan Wisata',
    gradYear: 2023,
    employmentStatus: 'BEKERJA' as 'BEKERJA' | 'WIRAUSAHA' | 'STUDI_LANJUT' | 'MENCARI_KERJA',
    company: '',
    jobTitle: '',
    waitTimeMonths: 2,
    salaryRange: '> Rp 8.000.000 (Di Atas UMR)',
    relevance: 'SANGAT_SESUAI',
    email: '',
    phone: ''
  });

  const [alumniSuccess, setAlumniSuccess] = useState(false);

  const [alumniList, setAlumniList] = useState<AlumniItem[]>([
    { id: 'alm-01', nim: '200101012', name: 'Rian Hidayat, S.Tr.Par.', prodi: 'D4 Usaha Perjalanan Wisata', gradYear: 2024, employmentStatus: 'BEKERJA', company: 'Garuda Indonesia Holiday Tour', jobTitle: 'Senior Tour Product Manager', waitTimeMonths: 1.5, salaryRange: 'Rp 8.000.000 - Rp 12.000.000', email: 'rian.hidayat@gmail.com', phone: '081234567801' },
    { id: 'alm-02', nim: '200102025', name: 'Putri Ayu Wandira, S.Tr.Par.', prodi: 'D4 Perhotelan', gradYear: 2024, employmentStatus: 'BEKERJA', company: 'Marriott International (Bali Resort)', jobTitle: 'Assistant Front Office Manager', waitTimeMonths: 1.0, salaryRange: 'Rp 10.000.000 - Rp 15.000.000', email: 'putri.ayu@gmail.com', phone: '081234567802' },
    { id: 'alm-03', nim: '200103008', name: 'Bayu Wicaksono, A.Md.Par.', prodi: 'D3 Kuliner', gradYear: 2023, employmentStatus: 'WIRAUSAHA', company: 'Nusantara Culinary Studio (Owner)', jobTitle: 'Head Chef & Founder', waitTimeMonths: 0.5, salaryRange: '> Rp 15.000.000', email: 'bayu.culinary@gmail.com', phone: '081234567803' },
    { id: 'alm-04', nim: '190104019', name: 'Jessica Tanujaya, S.Tr.Par.', prodi: 'D4 Event & MICE', gradYear: 2023, employmentStatus: 'BEKERJA', company: 'Dyandra Promosindo', jobTitle: 'International Exhibition Specialist', waitTimeMonths: 2.0, salaryRange: 'Rp 9.000.000 - Rp 14.000.000', email: 'jessica.tan@gmail.com', phone: '081234567804' },
    { id: 'alm-05', nim: '190101030', name: 'Muhammad Farhan, S.Tr.Par.', prodi: 'D4 Usaha Perjalanan Wisata', gradYear: 2023, employmentStatus: 'STUDI_LANJUT', company: 'Universitas Indonesia (UI)', jobTitle: 'Mahasiswa Magister (S2) Pariwisata', waitTimeMonths: 0, salaryRange: 'Beasiswa LPDP', email: 'farhan.s2@gmail.com', phone: '081234567805' },
  ]);

  React.useEffect(() => {
    if (defaultSub) {
      setSubTab(defaultSub);
    }
  }, [defaultSub]);

  const handleAlumniSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newAlm: AlumniItem = {
      id: `alm-${Date.now()}`,
      nim: alumniForm.nim.trim(),
      name: alumniForm.name.trim(),
      prodi: alumniForm.prodi,
      gradYear: Number(alumniForm.gradYear),
      employmentStatus: alumniForm.employmentStatus,
      company: alumniForm.company.trim() || 'Perusahaan Mandiri',
      jobTitle: alumniForm.jobTitle.trim() || 'Staff Profesional',
      waitTimeMonths: Number(alumniForm.waitTimeMonths),
      salaryRange: alumniForm.salaryRange,
      email: alumniForm.email.trim(),
      phone: alumniForm.phone.trim()
    };

    setAlumniList(prev => [newAlm, ...prev]);
    setAlumniSuccess(true);
    setTimeout(() => {
      setAlumniSuccess(false);
      setAlumniViewMode('DIREKTORI');
    }, 1500);
  };

  const filteredAlumni = alumniList.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(alumniSearch.toLowerCase()) || a.nim.includes(alumniSearch) || a.company.toLowerCase().includes(alumniSearch.toLowerCase());
    const matchProdi = alumniProdiFilter === 'ALL' || a.prodi === alumniProdiFilter;
    return matchSearch && matchProdi;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            {subTab === 'perpustakaan' && <Library size={22} className="text-blue-400" />}
            {subTab === 'aset' && <Package size={22} className="text-amber-400" />}
            {subTab === 'alumni' && <UserCheck size={22} className="text-emerald-400" />}
            <h2 className="text-xl font-black tracking-tight">
              {subTab === 'perpustakaan' ? 'Perpustakaan Digital & Repositori Ilmiah' :
               subTab === 'aset' ? 'Inventaris & Manajemen Aset Kampus' : 'Portal Alumni & Tracer Study Nasional (IKU 1)'}
            </h2>
            {subTab === 'alumni' && (
              <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-500 rounded-full">
                Standar Dikti IKU-1
              </span>
            )}
          </div>
          <p className="text-xs text-blue-200">
            Layanan Terpadu Fasilitas, Manajemen Aset dan Penelusuran Lulusan ({profile.institutionName})
          </p>
        </div>

        {/* Sub Tabs Switcher */}
        <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-xl border border-slate-700">
          <button
            onClick={() => setSubTab('perpustakaan')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'perpustakaan' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
          >
            Perpustakaan
          </button>
          <button
            onClick={() => setSubTab('aset')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'aset' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
          >
            Inventaris & Aset
          </button>
          <button
            onClick={() => setSubTab('alumni')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${subTab === 'alumni' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-300 hover:text-white'}`}
          >
            Alumni & Tracer
          </button>
        </div>
      </div>

      {/* 1. SUB-VIEW: PERPUSTAKAAN DIGITAL */}
      {subTab === 'perpustakaan' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <BookOpen size={16} className="text-blue-500" />
            <span>Katalog Buku, E-Book & Skripsi Digital Terkini</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Total Judul Buku & Jurnal</p>
              <p className="text-2xl font-black text-blue-600 mt-1">18.450</p>
              <p className="text-[10px] text-slate-400">Termasuk 4.200 E-Book Terlanggan</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Peminjaman Aktif Mahasiswa</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">428 Buku</p>
              <p className="text-[10px] text-emerald-600">Sirkulasi Digital Otomatis</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Repositori Tugas Akhir / Skripsi</p>
              <p className="text-2xl font-black text-purple-600 mt-1">3.120 Karya</p>
              <p className="text-[10px] text-purple-600">Full Text PDF & Cek Plagiasi</p>
            </div>
          </div>
        </div>
      )}

      {/* 2. SUB-VIEW: ASET & INVENTARIS */}
      {subTab === 'aset' && (
        <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
          <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
            <Package size={16} className="text-amber-500" />
            <span>Manajemen Sarana Prasarana & Laboratorium Praktikum</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Laboratorium Praktikum Aktif</p>
              <p className="text-2xl font-black text-amber-600 mt-1">24 Lab</p>
              <p className="text-[10px] text-slate-400">Lab Kitchen, Hotel Mockup, Tour, Lab Komputer</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Nilai Aset Terdaftar (SIMAK-BMN)</p>
              <p className="text-2xl font-black text-emerald-600 mt-1">Rp 48,5 M</p>
              <p className="text-[10px] text-emerald-600">100% Barcode Terinventarisir</p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
              <p className="font-bold text-xs text-slate-900 dark:text-white">Jadwal Pemeliharaan (Maintenance)</p>
              <p className="text-2xl font-black text-blue-600 mt-1">98.5% Prima</p>
              <p className="text-[10px] text-blue-600">Kalibrasi Alat Berkala</p>
            </div>
          </div>
        </div>
      )}

      {/* 3. SUB-VIEW: ALUMNI & TRACER STUDY LENGKAP */}
      {subTab === 'alumni' && (
        <div className="space-y-6">
          {/* Top Alumni Navigation */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800/80 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAlumniViewMode('DIREKTORI')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  alumniViewMode === 'DIREKTORI' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <UserCheck size={14} />
                <span>Direktori Alumni ({alumniList.length})</span>
              </button>

              <button
                onClick={() => setAlumniViewMode('FORM_DAFTAR')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  alumniViewMode === 'FORM_DAFTAR' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <UserPlus size={14} />
                <span>+ Formulir Pendaftaran Alumni & Tracer</span>
              </button>

              <button
                onClick={() => setAlumniViewMode('IKU_STAT')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                  alumniViewMode === 'IKU_STAT' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Award size={14} />
                <span>Capaian IKU 1 Dikti</span>
              </button>
            </div>

            <button
              onClick={() => alert('Mengekspor data tracer study alumni ke format pelaporan PDDIKTI / Belmawa Kemendikbudristek!')}
              className="px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5"
            >
              <Download size={13} />
              <span>Export Data Tracer (Dikti)</span>
            </button>
          </div>

          {/* IKU 1 STAT SUMMARY */}
          {alumniViewMode === 'IKU_STAT' && (
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700 shadow-sm space-y-4">
              <h3 className="text-sm font-black text-slate-900 dark:text-white flex items-center gap-2">
                <Award size={16} className="text-emerald-500" />
                <span>Indikator Kinerja Utama 1 (IKU 1: Kesiapan Kerja Lulusan)</span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-xs text-slate-900 dark:text-white">Rata-rata Waktu Tunggu Kerja</p>
                  <p className="text-2xl font-black text-emerald-600 mt-1">1.8 Bulan</p>
                  <p className="text-[10px] text-emerald-600">Target Dikti: &lt; 6 Bulan (Sangat Cepat)</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-xs text-slate-900 dark:text-white">Kesesuaian Bidang Kerja</p>
                  <p className="text-2xl font-black text-blue-600 mt-1">89.4% Sesuai</p>
                  <p className="text-[10px] text-blue-600">Linearitas Kompetensi Program Studi</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-200 dark:border-slate-700">
                  <p className="font-bold text-xs text-slate-900 dark:text-white">Penghasilan Di Atas UMR</p>
                  <p className="text-2xl font-black text-purple-600 mt-1">94.2%</p>
                  <p className="text-[10px] text-purple-600">Kepuasan Pengguna Lulusan: Sangat Baik</p>
                </div>
              </div>
            </div>
          )}

          {/* FORM PENDAFTARAN ALUMNI BARU */}
          {alumniViewMode === 'FORM_DAFTAR' && (
            <div className="max-w-3xl mx-auto p-6 rounded-2xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xl space-y-6">
              <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                <h3 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
                  <UserPlus size={18} className="text-emerald-500" />
                  <span>Formulir Pendaftaran Data Alumni & Kuesioner Tracer Study</span>
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Lengkapi data karir terkini Anda untuk memperkuat jejaring ikatan alumni dan akreditasi kampus.
                </p>
              </div>

              {alumniSuccess && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-500/30 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>Data Alumni berhasil disimpan ke Pangkalan Data Tracer Study {profile.institutionName}!</span>
                </div>
              )}

              <form onSubmit={handleAlumniSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">NIM Mahasiswa Saat Kuliah: *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: 200101015"
                      value={alumniForm.nim}
                      onChange={(e) => setAlumniForm({ ...alumniForm, nim: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-mono font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Lengkap & Gelar: *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Rian Hidayat, S.Tr.Par."
                      value={alumniForm.name}
                      onChange={(e) => setAlumniForm({ ...alumniForm, name: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Program Studi Lulusan: *</label>
                    <select
                      value={alumniForm.prodi}
                      onChange={(e) => setAlumniForm({ ...alumniForm, prodi: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="D4 Usaha Perjalanan Wisata">D4 Usaha Perjalanan Wisata</option>
                      <option value="D4 Perhotelan">D4 Perhotelan</option>
                      <option value="D3 Kuliner">D3 Kuliner</option>
                      <option value="D4 Event & MICE">D4 Event & MICE</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Tahun Kelulusan (Wisuda): *</label>
                    <input
                      type="number"
                      required
                      min="2000"
                      max="2030"
                      value={alumniForm.gradYear}
                      onChange={(e) => setAlumniForm({ ...alumniForm, gradYear: parseInt(e.target.value) || 2024 })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Status Aktivitas Saat Ini: *</label>
                    <select
                      value={alumniForm.employmentStatus}
                      onChange={(e: any) => setAlumniForm({ ...alumniForm, employmentStatus: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-bold focus:outline-none cursor-pointer"
                    >
                      <option value="BEKERJA">Bekerja (Full-Time / Part-Time)</option>
                      <option value="WIRAUSAHA">Wiraswasta / Pemilik Usaha</option>
                      <option value="STUDI_LANJUT">Melanjutkan Studi (S2 / S3)</option>
                      <option value="MENCARI_KERJA">Sedang Menunggu / Mencari Kerja</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nama Tempat Bekerja / Perusahaan / Usaha: *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: PT Garuda Indonesia / Marriott Hotel"
                      value={alumniForm.company}
                      onChange={(e) => setAlumniForm({ ...alumniForm, company: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Posisi / Jabatan Pekerjaan: *</label>
                    <input
                      type="text"
                      required
                      placeholder="Contoh: Tour Manager / Front Office Supervisor"
                      value={alumniForm.jobTitle}
                      onChange={(e) => setAlumniForm({ ...alumniForm, jobTitle: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Waktu Tunggu Dapat Kerja (Bulan):</label>
                    <input
                      type="number"
                      step="0.5"
                      min="0"
                      max="36"
                      value={alumniForm.waitTimeMonths}
                      onChange={(e) => setAlumniForm({ ...alumniForm, waitTimeMonths: parseFloat(e.target.value) || 0 })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-bold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Nomor WhatsApp Aktif: *</label>
                    <input
                      type="tel"
                      required
                      placeholder="08123456789"
                      value={alumniForm.phone}
                      onChange={(e) => setAlumniForm({ ...alumniForm, phone: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Email Aktif: *</label>
                    <input
                      type="email"
                      required
                      placeholder="email.alumni@domain.com"
                      value={alumniForm.email}
                      onChange={(e) => setAlumniForm({ ...alumniForm, email: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 font-semibold focus:outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setAlumniViewMode('DIREKTORI')}
                    className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold shadow-md flex items-center gap-2"
                  >
                    <Send size={14} />
                    <span>Daftarkan Data Alumni & Tracer</span>
                  </button>
                </div>
              </form>
            </div>
          )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100 dark:border-slate-700/60">
                <div className="flex items-center gap-2">
                  <UserCheck size={18} className="text-emerald-500" />
                  <h4 className="font-black text-sm text-slate-900 dark:text-white">Direktori Database Alumni Terdata</h4>
                  <span className="px-2 py-0.5 text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 rounded-full">
                    {filteredAlumni.length} Lulusan
                  </span>
                </div>

                <button
                  onClick={() => setAlumniViewMode('FORM_DAFTAR')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 flex items-center gap-2 transition-all hover:scale-105"
                >
                  <UserPlus size={14} />
                  <span>+ Daftarkan Alumni Baru (Tracer Form)</span>
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="relative flex-1 max-w-md">
                  <input
                    type="text"
                    value={alumniSearch}
                    onChange={(e) => setAlumniSearch(e.target.value)}
                    placeholder="Cari nama alumni, NIM, tempat kerja, perusahaan..."
                    className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-xs font-semibold focus:outline-none"
                  />
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={alumniProdiFilter}
                    onChange={(e) => setAlumniProdiFilter(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white text-xs font-bold focus:outline-none cursor-pointer"
                  >
                    <option value="ALL">Semua Program Studi</option>
                    <option value="D4 Usaha Perjalanan Wisata">D4 Usaha Perjalanan Wisata</option>
                    <option value="D4 Perhotelan">D4 Perhotelan</option>
                    <option value="D3 Kuliner">D3 Kuliner</option>
                    <option value="D4 Event & MICE">D4 Event & MICE</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 dark:bg-slate-900/60 text-slate-500 border-b border-slate-200 dark:border-slate-700 font-bold">
                    <tr>
                      <th className="p-3">NIM / Nama Alumni</th>
                      <th className="p-3">Program Studi & Lulus</th>
                      <th className="p-3">Status Karir</th>
                      <th className="p-3">Instansi / Perusahaan</th>
                      <th className="p-3">Jabatan / Profesi</th>
                      <th className="p-3 text-center">Waktu Tunggu</th>
                      <th className="p-3">Kontak</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
                    {filteredAlumni.map(alm => (
                      <tr key={alm.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                        <td className="p-3">
                          <span className="font-bold text-slate-900 dark:text-white block">{alm.name}</span>
                          <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">{alm.nim}</span>
                        </td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">
                          <span className="font-medium">{alm.prodi}</span>
                          <span className="block text-[10px] text-slate-400">Wisuda {alm.gradYear}</span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 text-[9px] font-bold rounded-full ${
                            alm.employmentStatus === 'BEKERJA' ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300' :
                            alm.employmentStatus === 'WIRAUSAHA' ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300' :
                            alm.employmentStatus === 'STUDI_LANJUT' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' :
                            'bg-slate-100 text-slate-700 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {alm.employmentStatus}
                          </span>
                        </td>
                        <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">{alm.company}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-300">{alm.jobTitle}</td>
                        <td className="p-3 text-center font-bold text-emerald-600 dark:text-emerald-400">
                          {alm.waitTimeMonths} bln
                        </td>
                        <td className="p-3 text-slate-400 text-[10px]">
                          <div>{alm.phone}</div>
                          <div>{alm.email}</div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
